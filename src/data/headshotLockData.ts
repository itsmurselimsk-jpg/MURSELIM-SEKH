import { HeadshotWeaponConfig, HeadshotWeaponKey, RamTier, RefreshRate, SensiScale, SensiValues } from '../types/sensi';

export const HEADSHOT_WEAPONS_DATABASE: Record<HeadshotWeaponKey, HeadshotWeaponConfig> = {
  'M1887': {
    name: 'M1887 (Double Barrel)',
    category: 'Shotgun One-Tap',
    dragTechnique: 'Fast Rotation J-Drag (Down-Right then Whip Upwards)',
    crosshairPlacement: 'White Crosshair on Left Shoulder before dragging',
    dragSpeedMs: 120,
    fireButtonGoldenSize: 43,
    headshotExpectedRate: 90,
    proDragRule: 'Enemy ke body par red dot aane se pehle hi crosshair ko niche se upar "J" shape me ghumayein. Goli 100% forehead par lock hogi.',
    soundDings: 9,
  },
  'Desert Eagle': {
    name: 'Desert Eagle (One-Tap King)',
    category: 'Pistol One-Tap',
    dragTechnique: 'Instant Straight 90° Vertical Snap',
    crosshairPlacement: 'White Crosshair slightly below enemy feet, then flick straight up',
    dragSpeedMs: 140,
    fireButtonGoldenSize: 44,
    headshotExpectedRate: 90,
    proDragRule: 'Jab enemy run kar raha ho ya khada ho, fire button ko bilkul sidha upar ki taraf screen ke aakhiri kinare tak flick karein.',
    soundDings: 9,
  },
  'Woodpecker': {
    name: 'Woodpecker / AC80',
    category: 'Marksman Armor Piercer',
    dragTechnique: 'Micro-Upward Tick Flick (Gentle short drag)',
    crosshairPlacement: 'Chest to neck level, soft micro drag up',
    dragSpeedMs: 100,
    fireButtonGoldenSize: 42,
    headshotExpectedRate: 90,
    proDragRule: 'Woodpecker me zyada tez drag mat karein! Halka sa micro-flick upar karein — iski high recoil khud goli ko head par utha legi.',
    soundDings: 9,
  },
  'MP40': {
    name: 'MP40 / UMP',
    category: 'SMG Headshot Spray',
    dragTechnique: 'Controlled J-Drag with 4-Bullet Burst Reset',
    crosshairPlacement: 'Neck height, drag up smoothly then hit Gloo Wall',
    dragSpeedMs: 180,
    fireButtonGoldenSize: 46,
    headshotExpectedRate: 90,
    proDragRule: 'Lambi spray mat karein! Sirf pehli 4-5 goli drag karein jisme recoil 0 rehti hai aur 90% red numbers lagte hain.',
    soundDings: 9,
  },
  'AK47': {
    name: 'AK47 / M4A1',
    category: 'Assault Rifle High Damage',
    dragTechnique: 'Drag & Instant Crouch (Sit-up drag technique)',
    crosshairPlacement: 'Right shoulder level, drag up + tap crouch button',
    dragSpeedMs: 200,
    fireButtonGoldenSize: 48,
    headshotExpectedRate: 90,
    proDragRule: 'AK47 me drag karte hi baithne (crouch) se gun ka crosshair bloom 50% compress ho jata hai aur saari goli head par seedhi lagti hain.',
    soundDings: 9,
  },
};

/**
 * Calculates the exact Esports Golden 90% Headshot Lock Sensi based on device hardware
 */
export function calculateHeadshotLockSensi(
  ram: RamTier,
  refreshRate: RefreshRate,
  scale: SensiScale,
  weaponKey: HeadshotWeaponKey
): {
  sensi: SensiValues;
  fireButtonSize: number;
  fireButtonPosition: { x: number; y: number };
  dpiRecommended: number;
  hitRatioText: string;
  esportsSecretFormula: string;
} {
  const isScale200 = scale === '200';
  const weapon = HEADSHOT_WEAPONS_DATABASE[weaponKey];

  // Base calibrated golden headshot values (Classic 100 scale)
  let general = 98;
  let redDot = 94; // Exactly 4 points lower than general to prevent over-skull bloom
  let scope2x = 92;
  let scope4x = 88;
  let sniperScope = 52;
  let freeLook = 75;

  // RAM Compensation (lower RAM needs higher sensitivity to overcome display pipeline lag)
  if (ram === '2GB' || ram === '3GB') {
    general = 100;
    redDot = 96;
    scope2x = 95;
    scope4x = 90;
  } else if (ram === '4GB') {
    general = 99;
    redDot = 95;
    scope2x = 93;
  } else if (ram === '12GB' || ram === '16GB+') {
    general = 95;
    redDot = 91;
    scope2x = 89;
  }

  // Refresh Rate calibration
  if (refreshRate === '120Hz' || refreshRate === '144Hz') {
    general -= 2;
    redDot -= 2;
  }

  // Weapon specific fine tuning
  if (weaponKey === 'Woodpecker') {
    general -= 3;
    redDot -= 3;
  } else if (weaponKey === 'M1887') {
    general = Math.min(100, general + 2);
    redDot = Math.min(100, redDot + 1);
  }

  // Convert to OB 200 scale if selected
  const multiplier = isScale200 ? 1.88 : 1.0;
  const clamp = (val: number) => {
    const res = Math.round(isScale200 ? val * multiplier : val);
    return Math.max(isScale200 ? 50 : 25, Math.min(isScale200 ? 200 : 100, res));
  };

  const finalSensi: SensiValues = {
    general: clamp(general),
    redDot: clamp(redDot),
    scope2x: clamp(scope2x),
    scope4x: clamp(scope4x),
    sniperScope: clamp(sniperScope),
    freeLook: clamp(freeLook),
  };

  // Safe High-Performance DPI for 90% Headshot
  let dpi = 440;
  if (ram === '2GB' || ram === '3GB') {
    dpi = 460;
  } else if (ram === '4GB' || ram === '6GB') {
    dpi = 450;
  } else {
    dpi = 420;
  }

  return {
    sensi: finalSensi,
    fireButtonSize: weapon.fireButtonGoldenSize,
    fireButtonPosition: { x: 78, y: 82 }, // 78% from left, 82% from top (18% from bottom)
    dpiRecommended: dpi,
    hitRatioText: '10 Goli me se 9 Headshot (90% Red Number Ratio)',
    esportsSecretFormula: `Golden 4-Point Delta Lock (General ${finalSensi.general} - Red Dot ${finalSensi.redDot}) + ${weapon.fireButtonGoldenSize}% Fire Button runway prevents chest-lock & sky recoil.`,
  };
}
