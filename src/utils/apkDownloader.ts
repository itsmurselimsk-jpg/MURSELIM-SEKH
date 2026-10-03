import { soundFx } from './audioEffects';

export const GITHUB_REPO_URL = 'https://github.com/itsmurselimsk-jpg/MURSELIM-SEKH';
export const DIRECT_APK_RELEASE_URL = `${GITHUB_REPO_URL}/releases/download/v4.9.0/FF_SensiPro_v4.9_VIP.apk`;
export const GITHUB_ACTIONS_URL = `${GITHUB_REPO_URL}/actions`;

/**
 * Triggers the download of the real Android APK file
 */
export const triggerApkDownload = (source: 'release' | 'local' = 'release') => {
  soundFx.playHeadshot();
  soundFx.playHologramLaser();

  const url =
    source === 'release'
      ? DIRECT_APK_RELEASE_URL
      : `${import.meta.env.BASE_URL}FF_SensiPro_v4.9_VIP.apk`;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'FF_SensiPro_v4.9_VIP.apk');
  link.setAttribute('target', '_blank');
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
