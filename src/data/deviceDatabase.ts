import { DeviceBrand, DeviceInfo } from '../types/sensi';

export const ALL_DEVICES_DATABASE: DeviceInfo[] = [
  // ==========================================
  // SAMSUNG GALAXY (All Series: S, Z, Note, A, M, F, Tab)
  // ==========================================
  // S Series (Flagships)
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 505, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S24+ / S24', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 425, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S23 Ultra', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 500, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S23+ / S23', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 425, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S23 FE', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 403, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S22 Ultra', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 500, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S22+ / S22', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 425, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S21 Ultra 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 515, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy S21+ / S21 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 421, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy S21 FE 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy S20 Ultra / S20+', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 511, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy S20 FE 5G / 4G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 407, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy S10+ / S10 / S10e', defaultRam: '8GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 522, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy S9+ / S9', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 529, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy S8+ / S8 / S7', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 570, chipsetTier: 'entry' },
  // Note & Fold Series
  { brand: 'Samsung', model: 'Galaxy Note 20 Ultra 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 496, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy Note 10+ / Note 10', defaultRam: '12GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'large', screenDpiBase: 498, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy Note 9 / Note 8', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'large', screenDpiBase: 516, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy Z Fold 6 / Fold 5 / Fold 4', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'tablet', screenDpiBase: 374, chipsetTier: 'flagship' },
  { brand: 'Samsung', model: 'Galaxy Z Flip 6 / Flip 5 / Flip 4', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 426, chipsetTier: 'flagship' },
  // A Series
  { brand: 'Samsung', model: 'Galaxy A55 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 390, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A54 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 403, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A53 5G / A52s 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 407, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A52 / A51 / A50', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 407, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A35 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 390, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A34 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 390, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A33 5G / A32', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 411, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A25 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy A24 / A23 5G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A22 5G / A21s', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A15 5G / 4G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A14 5G / 4G', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A13 / A12 / A11', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 400, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A05s / A05 / A04e', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 393, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy A03 / A02s / A01', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 270, chipsetTier: 'entry' },
  // M & F Series
  { brand: 'Samsung', model: 'Galaxy M55 5G / M54 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 393, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy M53 5G / M52 5G / M51', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 393, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy M35 5G / M34 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 390, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy M33 5G / M32 / M31', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 400, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy M15 5G / M14 5G', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy M13 / M12 / M11', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 400, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy F54 5G / F34 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 390, chipsetTier: 'midrange' },
  { brand: 'Samsung', model: 'Galaxy F23 5G / F14 5G', defaultRam: '4GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 400, chipsetTier: 'entry' },
  { brand: 'Samsung', model: 'Galaxy Tab S9 / S8 / S7 (All)', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'tablet', screenDpiBase: 274, chipsetTier: 'flagship' },

  // ==========================================
  // XIAOMI & REDMI (All Generations)
  // ==========================================
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 14 / 14 Ultra / 14 Pro', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 13 / 13 Pro / 13 Ultra', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 13T / 13T Pro', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 12 / 12 Pro / 12X', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 419, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 11T Pro / 11T 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Xiaomi 11X / 11X Pro 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'Xiaomi / Redmi', model: 'Mi 10 / Mi 10T / Mi 10T Pro', defaultRam: '8GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  // Redmi Note 13 Series
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 13 Pro+ 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 13 Pro 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 13 5G / 4G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  // Redmi Note 12 Series
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 12 Pro+ 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 12 Pro 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 12 5G / 4G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  // Redmi Note 11 Series
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 11 Pro+ 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 11 Pro / 11S', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 11 / 11T 5G', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  // Redmi Note 10 Series
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 10 Pro Max / 10 Pro', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 10 / 10S / 10T', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'entry' },
  // Redmi Note 9, 8, 7 Series
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 9 Pro Max / 9 Pro', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 9 / 9S', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 8 Pro / Note 8', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi Note 7 Pro / Note 7', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'entry' },
  // Redmi Numbered & Budget
  { brand: 'Xiaomi / Redmi', model: 'Redmi 13C 5G / 13C', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 260, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi 12 5G / Redmi 12', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'large', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi 11 Prime 5G / 11 Prime', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi 10 / 10 Prime / 10A / 10C', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi 9 / 9A / 9C / 9 Prime / 9i', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 269, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi 8 / 8A / 7 / 7A / 6 / 6A', defaultRam: '2GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 295, chipsetTier: 'entry' },
  { brand: 'Xiaomi / Redmi', model: 'Redmi A3 / A2+ / A2 / A1', defaultRam: '2GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 268, chipsetTier: 'entry' },

  // ==========================================
  // POCO (F, X, M, C Series)
  // ==========================================
  { brand: 'POCO', model: 'POCO F6 Pro / F6 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'flagship' },
  { brand: 'POCO', model: 'POCO F5 Pro / F5 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'POCO', model: 'POCO F4 GT / F4 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'POCO', model: 'POCO F3 GT / F3', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'POCO', model: 'POCO X6 Pro 5G (Gaming King)', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'flagship' },
  { brand: 'POCO', model: 'POCO X6 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO X5 Pro 5G / X5 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO X4 Pro 5G / X4 GT', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO X3 Pro / X3 NFC', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO X2', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO M6 Pro 5G / M6 5G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 396, chipsetTier: 'midrange' },
  { brand: 'POCO', model: 'POCO M5 / M5s', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'POCO', model: 'POCO M4 Pro 5G / 4G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 399, chipsetTier: 'entry' },
  { brand: 'POCO', model: 'POCO M3 Pro / M3 / M2 Pro', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 405, chipsetTier: 'entry' },
  { brand: 'POCO', model: 'POCO C65 / C55 / C51 / C50', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 260, chipsetTier: 'entry' },

  // ==========================================
  // REALME (GT, Numbered, Narzo, C Series)
  // ==========================================
  { brand: 'Realme', model: 'Realme GT 6 / GT 6T 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 450, chipsetTier: 'flagship' },
  { brand: 'Realme', model: 'Realme GT 5 Pro / GT 5', defaultRam: '16GB+', defaultRefreshRate: '144Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 450, chipsetTier: 'flagship' },
  { brand: 'Realme', model: 'Realme GT 3 / GT 2 Pro / GT 2', defaultRam: '8GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'flagship' },
  { brand: 'Realme', model: 'Realme GT Neo 5 / Neo 3 / Neo 3T', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'flagship' },
  { brand: 'Realme', model: 'Realme 12 Pro+ / 12 Pro / 12+', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme 11 Pro+ / 11 Pro / 11 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme 10 Pro+ / 10 Pro / 10', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme 9 Pro+ / 9 Pro / 9 5G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 411, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme 8 Pro / 8 / 8s 5G / 8i', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme 7 Pro / 7 / 6 Pro / 6', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 405, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme Narzo 70 Pro / 70x 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme Narzo 60 Pro / 60 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme Narzo 50 Pro / 50 5G / 50A', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 400, chipsetTier: 'midrange' },
  { brand: 'Realme', model: 'Realme Narzo 50i Prime', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 270, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme Narzo 50i', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 270, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme Narzo 30 / 20 / 10 (All)', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 405, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme C67 / C65 / C55 / C53', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme C35 / C33 / C31 / C25', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'Realme', model: 'Realme C21 / C15 / C12 / C11 / C3', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 270, chipsetTier: 'entry' },

  // ==========================================
  // VIVO & IQOO (All Series)
  // ==========================================
  { brand: 'Vivo / iQOO', model: 'iQOO 12 / 12 Pro (Snapdragon 8 Gen 3)', defaultRam: '16GB+', defaultRefreshRate: '144Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 452, chipsetTier: 'flagship' },
  { brand: 'Vivo / iQOO', model: 'iQOO 11 / 11 Pro 5G', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'large', screenDpiBase: 518, chipsetTier: 'flagship' },
  { brand: 'Vivo / iQOO', model: 'iQOO Neo 9 Pro 5G (Dual Chip)', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 452, chipsetTier: 'flagship' },
  { brand: 'Vivo / iQOO', model: 'iQOO Neo 7 Pro / Neo 7', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 388, chipsetTier: 'flagship' },
  { brand: 'Vivo / iQOO', model: 'iQOO Neo 6 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 398, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'iQOO Z9s Pro / Z9s 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'iQOO Z9 / Z9x 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'iQOO Z7 Pro / Z7 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 388, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'iQOO Z6 Pro / Z6 5G / Z6 Lite', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'Vivo / iQOO', model: 'Vivo X100 Pro / X100 / X90', defaultRam: '16GB+', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'large', screenDpiBase: 452, chipsetTier: 'flagship' },
  { brand: 'Vivo / iQOO', model: 'Vivo V30 Pro / V30 / V30e', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 452, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo V29 Pro / V29 / V27 Pro / V27', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 452, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo V25 Pro / V23 Pro / V20', defaultRam: '8GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo T3 Pro / T3 / T3x 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo T2 Pro / T2 / T2x 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '300Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo T1 Pro / T1 5G', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo Y200 / Y200e / Y100 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Vivo / iQOO', model: 'Vivo Y56 / Y28 / Y27 5G', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'entry' },
  { brand: 'Vivo / iQOO', model: 'Vivo Y21 / Y20 / Y19 / Y16 / Y15', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 270, chipsetTier: 'entry' },
  { brand: 'Vivo / iQOO', model: 'Vivo Y12 / Y11 / Y03 / Y02 (All Entry)', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 270, chipsetTier: 'entry' },

  // ==========================================
  // ONEPLUS (All Generations)
  // ==========================================
  { brand: 'OnePlus', model: 'OnePlus 12 / 12R', defaultRam: '16GB+', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 450, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus 11 / 11R 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'large', screenDpiBase: 450, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus 10 Pro / 10T / 10R', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus 9 Pro / 9 / 9RT / 9R', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 402, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus 8 Pro / 8 / 8T', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 402, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus 7T Pro / 7T / 7 Pro / 7', defaultRam: '8GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 402, chipsetTier: 'midrange' },
  { brand: 'OnePlus', model: 'OnePlus 6T / 6 / 5T', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 402, chipsetTier: 'entry' },
  { brand: 'OnePlus', model: 'OnePlus Open (Foldable)', defaultRam: '16GB+', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'tablet', screenDpiBase: 426, chipsetTier: 'flagship' },
  { brand: 'OnePlus', model: 'OnePlus Nord 4 / Nord 3 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 450, chipsetTier: 'midrange' },
  { brand: 'OnePlus', model: 'OnePlus Nord 2T / Nord 2 / Nord', defaultRam: '8GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 409, chipsetTier: 'midrange' },
  { brand: 'OnePlus', model: 'OnePlus Nord CE 4 / CE 4 Lite', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'OnePlus', model: 'OnePlus Nord CE 3 / CE 3 Lite', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'midrange' },
  { brand: 'OnePlus', model: 'OnePlus Nord CE 2 / CE 2 Lite', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 401, chipsetTier: 'entry' },

  // ==========================================
  // APPLE IPHONE & IPAD (All Generations)
  // ==========================================
  { brand: 'Apple iPhone', model: 'iPhone 16 Pro Max / 16 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 16 / 16 Plus', defaultRam: '8GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 15 Pro Max / 15 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 15 / 15 Plus', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 14 Pro Max / 14 Pro', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 14 / 14 Plus', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 13 Pro Max / 13 Pro', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 13 / 13 Mini', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 12 Pro Max / 12 Pro', defaultRam: '6GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'large', screenDpiBase: 460, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPhone 12 / 12 Mini', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 460, chipsetTier: 'midrange' },
  { brand: 'Apple iPhone', model: 'iPhone 11 Pro Max / 11 Pro', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 458, chipsetTier: 'midrange' },
  { brand: 'Apple iPhone', model: 'iPhone 11 (Standard)', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'standard', screenDpiBase: 326, chipsetTier: 'midrange' },
  { brand: 'Apple iPhone', model: 'iPhone XR / XS Max / XS', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 326, chipsetTier: 'entry' },
  { brand: 'Apple iPhone', model: 'iPhone X / 8 Plus / 8', defaultRam: '3GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'Apple iPhone', model: 'iPhone 7 Plus / 7 / 6s', defaultRam: '2GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'compact', screenDpiBase: 401, chipsetTier: 'entry' },
  { brand: 'Apple iPhone', model: 'iPad Pro M4 / M2 / M1 (11" / 13")', defaultRam: '16GB+', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'tablet', screenDpiBase: 264, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPad Air M2 / iPad Mini 6', defaultRam: '8GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'tablet', screenDpiBase: 264, chipsetTier: 'flagship' },
  { brand: 'Apple iPhone', model: 'iPad 10th / 9th / 8th Gen', defaultRam: '4GB', defaultRefreshRate: '60Hz', defaultTouchSampling: '120Hz', defaultScreenSize: 'tablet', screenDpiBase: 264, chipsetTier: 'midrange' },

  // ==========================================
  // INFINIX & TECNO
  // ==========================================
  { brand: 'Infinix', model: 'Infinix GT 20 Pro (Esports Flagship)', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 393, chipsetTier: 'flagship' },
  { brand: 'Infinix', model: 'Infinix GT 10 Pro (Cyber Mecha)', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Infinix', model: 'Infinix Note 40 Pro+ / Note 40 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 393, chipsetTier: 'midrange' },
  { brand: 'Infinix', model: 'Infinix Note 30 5G / Note 30 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'midrange' },
  { brand: 'Infinix', model: 'Infinix Zero 30 5G / Zero Ultra', defaultRam: '8GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 388, chipsetTier: 'midrange' },
  { brand: 'Infinix', model: 'Infinix Hot 40 Pro / Hot 40 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Infinix', model: 'Infinix Hot 30 / Hot 30i / Hot 20', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Infinix', model: 'Infinix Hot 12 / Hot 11 / Hot 10', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 260, chipsetTier: 'entry' },
  { brand: 'Infinix', model: 'Infinix Smart 8 / Smart 7 / Smart 6', defaultRam: '3GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 267, chipsetTier: 'entry' },

  { brand: 'Tecno', model: 'Tecno Pova 6 Pro 5G (Gaming)', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'large', screenDpiBase: 393, chipsetTier: 'midrange' },
  { brand: 'Tecno', model: 'Tecno Pova 5 Pro / Pova 5 / Pova 4', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'large', screenDpiBase: 396, chipsetTier: 'midrange' },
  { brand: 'Tecno', model: 'Tecno Camon 30 Premier / Camon 30', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 393, chipsetTier: 'midrange' },
  { brand: 'Tecno', model: 'Tecno Camon 20 Pro 5G / Camon 19', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Tecno', model: 'Tecno Spark 20 Pro+ / Spark 20', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 393, chipsetTier: 'entry' },
  { brand: 'Tecno', model: 'Tecno Spark 10 Pro / Spark 9 / Spark 8', defaultRam: '4GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 396, chipsetTier: 'entry' },
  { brand: 'Tecno', model: 'Tecno Phantom X2 Pro / Phantom V Fold', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'large', screenDpiBase: 387, chipsetTier: 'flagship' },

  // ==========================================
  // MOTOROLA & HARDCORE GAMING
  // ==========================================
  { brand: 'Motorola', model: 'Moto Edge 50 Ultra / Edge 50 Pro', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 446, chipsetTier: 'flagship' },
  { brand: 'Motorola', model: 'Moto Edge 50 Fusion / Edge 40', defaultRam: '8GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '360Hz', defaultScreenSize: 'standard', screenDpiBase: 402, chipsetTier: 'midrange' },
  { brand: 'Motorola', model: 'Moto G85 5G / G84 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Motorola', model: 'Moto G64 5G / G54 5G', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 405, chipsetTier: 'midrange' },
  { brand: 'Motorola', model: 'Moto G34 5G / G24 Power / G14', defaultRam: '4GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 269, chipsetTier: 'entry' },

  { brand: 'ASUS ROG', model: 'ASUS ROG Phone 8 Pro / ROG 8', defaultRam: '16GB+', defaultRefreshRate: '165Hz+', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 388, chipsetTier: 'flagship' },
  { brand: 'ASUS ROG', model: 'ASUS ROG Phone 7 / 7 Ultimate', defaultRam: '16GB+', defaultRefreshRate: '165Hz+', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'ASUS ROG', model: 'ASUS ROG Phone 6 / 6D / 5s', defaultRam: '12GB', defaultRefreshRate: '165Hz+', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 395, chipsetTier: 'flagship' },
  { brand: 'ASUS ROG', model: 'RedMagic 9 Pro / 8 Pro / 7 Pro', defaultRam: '16GB+', defaultRefreshRate: '120Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'large', screenDpiBase: 400, chipsetTier: 'flagship' },
  { brand: 'ASUS ROG', model: 'Black Shark 5 Pro / 4 Pro', defaultRam: '12GB', defaultRefreshRate: '144Hz', defaultTouchSampling: '480Hz+', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'flagship' },

  // ==========================================
  // NOTHING, GOOGLE PIXEL & OPPO
  // ==========================================
  { brand: 'Nothing / Pixel', model: 'Nothing Phone (2) / Phone (2a)', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Nothing / Pixel', model: 'CMF Phone 1 by Nothing', defaultRam: '6GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 395, chipsetTier: 'midrange' },
  { brand: 'Nothing / Pixel', model: 'Google Pixel 8 Pro / Pixel 8', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 489, chipsetTier: 'flagship' },
  { brand: 'Nothing / Pixel', model: 'Google Pixel 7a / Pixel 7 / Pixel 6', defaultRam: '8GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 429, chipsetTier: 'midrange' },

  { brand: 'Oppo', model: 'Oppo Reno 12 Pro / Reno 11 Pro 5G', defaultRam: '12GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Oppo', model: 'Oppo Reno 10 Pro+ / Reno 8 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 450, chipsetTier: 'midrange' },
  { brand: 'Oppo', model: 'Oppo F25 Pro / F23 / F21 Pro', defaultRam: '8GB', defaultRefreshRate: '120Hz', defaultTouchSampling: '240Hz', defaultScreenSize: 'standard', screenDpiBase: 394, chipsetTier: 'midrange' },
  { brand: 'Oppo', model: 'Oppo A79 / A78 / A59 / A58 / A38', defaultRam: '6GB', defaultRefreshRate: '90Hz', defaultTouchSampling: '180Hz', defaultScreenSize: 'standard', screenDpiBase: 392, chipsetTier: 'entry' },
];

export const POPULAR_DEVICES = ALL_DEVICES_DATABASE;

export const BRANDS: DeviceBrand[] = [
  'Samsung',
  'Xiaomi / Redmi',
  'POCO',
  'Realme',
  'Vivo / iQOO',
  'OnePlus',
  'Apple iPhone',
  'Infinix',
  'Tecno',
  'Motorola',
  'ASUS ROG',
  'Nothing / Pixel',
  'Oppo',
  'Other Android',
];
