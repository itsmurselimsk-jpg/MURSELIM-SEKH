import {
  DeviceInfo,
  FingerGrip,
  HardwareRecommendations,
  Playstyle,
  RamTier,
  RefreshRate,
  ScreenSize,
  SensiScale,
  SensiValues,
  TouchSamplingRate,
} from '../types/sensi';

interface CalcParams {
  device?: DeviceInfo;
  brand: string;
  model: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  touchSampling: TouchSamplingRate;
  screenSize: ScreenSize;
  playstyle: Playstyle;
  grip: FingerGrip;
  scale: SensiScale;
}

export function calculateSensitivity(params: CalcParams): {
  sensi: SensiValues;
  hardware: HardwareRecommendations;
  analysis: string;
} {
  const {
    brand,
    ram,
    refreshRate,
    touchSampling,
    screenSize,
    playstyle,
    grip,
    scale,
  } = params;

  // Base sensitivity on classic 100 scale
  let general = 95;
  let redDot = 90;
  let scope2x = 85;
  let scope4x = 80;
  let sniperScope = 55;
  let freeLook = 70;

  // 1. RAM Factor (Lower RAM has input lag / micro-stutter, requiring higher sensitivity to compensate)
  if (ram === '2GB' || ram === '3GB') {
    general += 5;
    redDot += 6;
    scope2x += 5;
    scope4x += 4;
  } else if (ram === '4GB') {
    general += 3;
    redDot += 3;
    scope2x += 2;
  } else if (ram === '12GB' || ram === '16GB+') {
    general -= 3;
    redDot -= 2;
    scope2x -= 2;
  }

  // 2. Refresh Rate & Touch Sampling adjustments
  if (refreshRate === '60Hz') {
    general += 2;
    redDot += 1;
  } else if (refreshRate === '120Hz') {
    general -= 2;
    scope2x -= 1;
  } else if (refreshRate === '144Hz' || refreshRate === '165Hz+') {
    general -= 4;
    redDot -= 2;
    scope2x -= 2;
  }

  // Touch sampling factor
  if (touchSampling === '360Hz' || touchSampling === '480Hz+') {
    // Ultra fast touch response; slight reduction to avoid camera over-drag
    general -= 1;
  }

  // 3. Apple iOS / iPadOS vs Android
  const isApple = brand.toLowerCase().includes('apple') || brand.toLowerCase().includes('iphone');
  const isTablet = screenSize === 'tablet';

  if (isApple) {
    general = Math.min(100, general + 1);
    redDot = Math.min(100, redDot + 2);
  }

  if (isTablet) {
    // Tablets have huge screen travel distance; lower general needed
    general = Math.max(75, general - 8);
    redDot = Math.max(70, redDot - 6);
  }

  // 4. Playstyle adjustments
  switch (playstyle) {
    case 'onetap':
      general += 4;
      redDot += 5;
      scope2x += 2;
      sniperScope -= 6;
      break;
    case 'smg_rusher':
      general += 2;
      redDot += 3;
      scope2x += 4;
      scope4x += 2;
      break;
    case 'ar_marksman':
      general -= 2;
      redDot -= 1;
      scope2x += 2;
      scope4x += 4;
      break;
    case 'sniper':
      general -= 4;
      redDot -= 4;
      sniperScope = 42;
      scope4x -= 3;
      break;
    case 'allrounder':
    default:
      break;
  }

  // Scale Conversion for Modern Free Fire OB update (0-200 Scale)
  const isModernScale = scale === '200';
  const scaleMultiplier = isModernScale ? 1.85 : 1.0;
  const maxLimit = isModernScale ? 200 : 100;
  const minLimit = isModernScale ? 50 : 25;

  const clamp = (v: number) => {
    const scaled = isModernScale ? v * scaleMultiplier : v;
    return Math.max(minLimit, Math.min(maxLimit, Math.round(scaled)));
  };

  const finalSensi: SensiValues = {
    general: clamp(general),
    redDot: clamp(redDot),
    scope2x: clamp(scope2x),
    scope4x: clamp(scope4x),
    sniperScope: clamp(sniperScope),
    freeLook: clamp(freeLook),
  };

  // Hardware calculations: Fire Button Size
  let buttonSize = 48;
  if (screenSize === 'compact') {
    buttonSize = 43;
  } else if (screenSize === 'large') {
    buttonSize = 52;
  } else if (screenSize === 'tablet') {
    buttonSize = 58;
  }

  if (playstyle === 'onetap') {
    buttonSize -= 4;
  } else if (playstyle === 'smg_rusher') {
    buttonSize += 2;
  }

  if (grip === '3finger' || grip === '4finger') {
    buttonSize -= 3;
  }

  // Safe Developer Options DPI Calculation
  let defaultDpi = 392;
  if (isApple) {
    defaultDpi = isTablet ? 264 : 460;
  } else if (brand.includes('Samsung')) {
    defaultDpi = 411;
  } else if (brand.includes('POCO') || brand.includes('Xiaomi')) {
    defaultDpi = 395;
  } else if (brand.includes('ASUS') || brand.includes('OnePlus')) {
    defaultDpi = 402;
  }

  let safeDpi = defaultDpi;
  let maxDpiLimit = defaultDpi + 100;

  if (!isApple) {
    if (ram === '2GB' || ram === '3GB') {
      safeDpi = defaultDpi + 30;
      maxDpiLimit = defaultDpi + 60;
    } else if (ram === '4GB' || ram === '6GB') {
      safeDpi = defaultDpi + 48;
      maxDpiLimit = defaultDpi + 90;
    } else {
      safeDpi = defaultDpi + 65;
      maxDpiLimit = defaultDpi + 110;
    }
  }

  // Graphics and In-Game Settings Presets
  const isLowEnd = ram === '2GB' || ram === '3GB';
  const isMid = ram === '4GB' || ram === '6GB';

  const graphicsSetting = {
    graphics: isLowEnd ? ('Smooth' as const) : isMid ? ('Standard' as const) : ('Ultra' as const),
    highFps: 'High (60-120FPS)' as const,
    shadow: isLowEnd ? ('OFF' as const) : isMid ? ('OFF' as const) : ('ON' as const),
    filterStyle: 'Vivid' as const,
    highRes: isLowEnd ? ('Normal' as const) : ('High' as const),
    visualEffects: 'Dark' as const,
  };

  const controlsSetting = {
    aimPrecision: 'Default' as const,
    leftFireButton: 'Always' as const,
    quickWeaponSwitch: 'ON' as const,
    quickReload: 'ON' as const,
    holdFireToScope: 'ON' as const,
    grenadeSlot: 'Double Slot' as const,
    glooWallSmartThrow: 'ON' as const,
    autoGunSwitch: 'ON' as const,
    runMode: 'Classic' as const,
    vehicleControl: 'Two Hands' as const,
  };

  // Analysis description
  let analysis = '';
  if (isLowEnd) {
    analysis = `Calibrated for ${brand} (${ram} RAM). Boosted General to ${finalSensi.general} with compact ${buttonSize}% fire button to overcome lower touch polling latency. Graphics set to Smooth with High FPS.`;
  } else if (ram === '12GB' || ram === '16GB+') {
    analysis = `Flagship calibration for ${brand} (${refreshRate} / ${touchSampling} touch response). Calibrated at General ${finalSensi.general} to prevent over-drag recoil bloom where bullets overshoot the skull.`;
  } else {
    analysis = `Balanced competitive setup for ${brand} (${ram} RAM, ${refreshRate}). Calibrated for consistent drag acceleration and instant gloo wall deployment.`;
  }

  return {
    sensi: finalSensi,
    hardware: {
      fireButtonSize: buttonSize,
      fireButtonPosition: 'Bottom Right corner, ~12% above bottom margin for thumb travel runway',
      safeDpi,
      defaultDpi,
      maxDpiLimit,
      pointerSpeed: isLowEnd ? 'Fastest (Full Right)' : '+2 notches above Center',
      touchDelay: 'Very Short (0.5s)',
      touchSamplingMode: 'Game Turbo / Ultra Touch Response ON',
      graphicsSetting,
      controlsSetting,
      specialTip: isLowEnd
        ? 'Disable screen recording and keep graphics on Smooth to lock 60FPS without frame drops.'
        : 'Enable 240Hz/360Hz touch sampling rate in your device Game Space app.',
    },
    analysis,
  };
}
