export interface BrowserEnvInfo {
  isAndroid: boolean;
  isChrome: boolean;
  isInAppBrowser: boolean;
  isStandalone: boolean;
}

export const detectBrowserEnv = (): BrowserEnvInfo => {
  const ua = (navigator.userAgent || navigator.vendor || (window as any).opera || '').toLowerCase();
  
  const isAndroid = /android/i.test(ua);
  const isChrome = /chrome|crios/i.test(ua) && !/edge|edg|opr|opera|brave/i.test(ua);
  
  // Detect if user opened the link inside WhatsApp, Telegram, Instagram, FB, etc.
  const isInAppBrowser =
    /fbav|instagram|fban|line|micromessenger|snapchat|musical_ly|tiktok|whatsapp|gsa|wv/i.test(ua) ||
    (isAndroid && /version\/[0-9.]+/i.test(ua) && !/chrome\/[0-9.]+/i.test(ua));

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  return {
    isAndroid,
    isChrome,
    isInAppBrowser,
    isStandalone,
  };
};
