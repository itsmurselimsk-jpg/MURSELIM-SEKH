// Free Fire & Free Fire MAX Deep Link Launcher Utility
export function launchFreeFire(version: 'standard' | 'max' = 'max'): { success: boolean; url: string } {
  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  let targetUrl = '';

  if (version === 'max') {
    if (isAndroid) {
      // Android Intent for Free Fire MAX
      targetUrl = 'intent://#Intent;package=com.dts.freefiremax;scheme=freefiremax;end';
    } else if (isIOS) {
      // iOS URL scheme for Free Fire MAX
      targetUrl = 'freefiremax://';
    } else {
      // Desktop / Web Fallback to Play Store
      targetUrl = 'https://play.google.com/store/apps/details?id=com.dts.freefiremax';
    }
  } else {
    if (isAndroid) {
      // Android Intent for Free Fire Standard
      targetUrl = 'intent://#Intent;package=com.dts.freefireth;scheme=freefire;end';
    } else if (isIOS) {
      // iOS URL scheme for Free Fire Standard
      targetUrl = 'freefire://';
    } else {
      // Web Fallback
      targetUrl = 'https://play.google.com/store/apps/details?id=com.dts.freefireth';
    }
  }

  try {
    if (isAndroid || isIOS) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
    return { success: true, url: targetUrl };
  } catch (err) {
    // Fallback directly to web URL
    const fallback = version === 'max'
      ? 'https://play.google.com/store/apps/details?id=com.dts.freefiremax'
      : 'https://play.google.com/store/apps/details?id=com.dts.freefireth';
    window.open(fallback, '_blank', 'noopener,noreferrer');
    return { success: false, url: fallback };
  }
}
