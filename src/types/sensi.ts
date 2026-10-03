export type DeviceBrand = 
  | 'Samsung'
  | 'Xiaomi / Redmi'
  | 'POCO'
  | 'Realme'
  | 'Vivo / iQOO'
  | 'Oppo'
  | 'OnePlus'
  | 'Apple iPhone'
  | 'Infinix'
  | 'Tecno'
  | 'Motorola'
  | 'ASUS ROG'
  | 'Nothing / Pixel'
  | 'Other Android';

export type RamTier = '2GB' | '3GB' | '4GB' | '6GB' | '8GB' | '12GB' | '16GB+';
export type RefreshRate = '60Hz' | '90Hz' | '120Hz' | '144Hz' | '165Hz+';
export type TouchSamplingRate = '120Hz' | '180Hz' | '240Hz' | '300Hz' | '360Hz' | '480Hz+';
export type Playstyle = 'onetap' | 'smg_rusher' | 'ar_marksman' | 'sniper' | 'allrounder';
export type FingerGrip = '2finger' | '3finger' | '4finger';
export type ScreenSize = 'compact' | 'standard' | 'large' | 'tablet';
export type SensiScale = '200' | '100'; // Modern OB update (0-200) vs Classic (0-100)

export interface DeviceInfo {
  brand: DeviceBrand;
  model: string;
  defaultRam: RamTier;
  defaultRefreshRate: RefreshRate;
  defaultTouchSampling: TouchSamplingRate;
  defaultScreenSize: ScreenSize;
  screenDpiBase: number;
  chipsetTier: 'entry' | 'midrange' | 'flagship';
}

export interface SensiValues {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
}

export interface InGameControlsSettings {
  aimPrecision: 'Default' | 'Precise on Scope' | 'Full Control';
  leftFireButton: 'Always' | 'Only Scope';
  quickWeaponSwitch: 'ON' | 'OFF';
  quickReload: 'ON' | 'OFF';
  holdFireToScope: 'ON' | 'OFF';
  grenadeSlot: 'Double Slot' | 'Single Slot';
  glooWallSmartThrow: 'ON' | 'OFF';
  autoGunSwitch: 'ON' | 'OFF';
  runMode: 'Classic' | 'Drag' | 'Mixed';
  vehicleControl: 'Two Hands' | 'One Hand';
}

export interface GraphicsDisplaySettings {
  graphics: 'Smooth' | 'Standard' | 'Ultra' | 'MAX';
  highFps: 'Normal' | 'High (60-120FPS)';
  shadow: 'OFF' | 'ON';
  filterStyle: 'Classic' | 'Bright' | 'Vivid' | 'Ocean';
  highRes: 'Normal' | 'High';
  visualEffects: 'Classic' | 'Dark' | 'No Blood';
}

export interface HardwareRecommendations {
  fireButtonSize: number;
  fireButtonPosition: string;
  safeDpi: number;
  defaultDpi: number;
  maxDpiLimit: number;
  pointerSpeed: string;
  touchDelay: string;
  touchSamplingMode: string;
  graphicsSetting: GraphicsDisplaySettings;
  controlsSetting: InGameControlsSettings;
  specialTip: string;
}

export interface WeaponSensiInfo {
  id: string;
  name: string;
  category: 'Shotgun' | 'SMG' | 'AR' | 'Pistol' | 'Sniper' | 'Marksman';
  dragSpeed: 'Fastest (Sharp Flick)' | 'Medium Drag' | 'Smooth Follow' | 'Controlled Snap';
  dragTechnique: 'J-Shape Drag' | 'Straight Vertical' | 'Rotation Drag' | 'White Crosshair Snap' | 'Controlled Snap';
  optimalRange: '0 - 7m (Point Blank)' | '5 - 18m (Close)' | '15 - 45m (Mid)' | '40m+ (Long)';
  recoilDifficulty: 'Low' | 'Medium' | 'High' | 'Extreme';
  recommendedGeneralBoost: number;
  recommendedRedDotBoost: number;
  proTips: string;
}

export interface ProPlayerPreset {
  id: string;
  name: string;
  channel: string;
  role: string;
  signatureGun: string;
  device: string;
  scale: SensiScale;
  sensi: SensiValues;
  fireButtonSize: number;
  dpi: number;
  claw: '2-Finger' | '3-Finger Claw' | '4-Finger Claw';
  bio: string;
}

export interface SavedConfiguration {
  id: string;
  title: string;
  createdAt: number;
  deviceBrand: string;
  deviceModel: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  playstyle: Playstyle;
  scale: SensiScale;
  sensi: SensiValues;
  fireButtonSize: number;
  safeDpi: number;
}

export type HeadshotWeaponKey = 'M1887' | 'Desert Eagle' | 'Woodpecker' | 'MP40' | 'AK47';

export interface HeadshotWeaponConfig {
  name: string;
  category: string;
  dragTechnique: string;
  crosshairPlacement: string;
  dragSpeedMs: number;
  fireButtonGoldenSize: number;
  headshotExpectedRate: number; // 90
  proDragRule: string;
  soundDings: number; // 9 out of 10
}
