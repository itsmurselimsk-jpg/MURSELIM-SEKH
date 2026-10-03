import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  Zap,
  Info,
  Layers,
  Cpu,
  FolderArchive,
  Terminal,
  HelpCircle,
  ArrowRight,
  Flame,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';
import { downloadProjectZip } from '../utils/projectZipExporter';
import {
  triggerApkDownload,
  GITHUB_ACTIONS_URL,
  DIRECT_APK_RELEASE_URL,
} from '../utils/apkDownloader';
import { detectBrowserEnv } from '../utils/browserDetect';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface ApkInstallerModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
}

export const ApkInstallerModal: React.FC<ApkInstallerModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  isInstalled,
}) => {
  const [installStatus, setInstallStatus] = useState<string | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [envInfo, setEnvInfo] = useState({
    isAndroid: true,
    isChrome: true,
    isInAppBrowser: false,
    isStandalone: false,
  });

  useEffect(() => {
    if (isOpen) {
      setEnvInfo(detectBrowserEnv());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1-Tap Native Install Handler
  const handleNativeInstall = async () => {
    soundFx.playHeadshot();

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          soundFx.playSuccess();
          setInstallStatus('✓ Installation accepted! App icon phone home screen par add ho raha hai.');
          setTimeout(() => onClose(), 2500);
          return;
        }
      } catch (err) {
        // Fallback to instructions
      }
    }

    // If deferredPrompt is null (very common on Android if already visited or not prompted yet)
    setInstallStatus('Niche diye gaye 3 Steps follow karein: Chrome 3 Dots (⋮) → "Install app"!');
  };

  // Direct APK File Download Handler
  const handleDownloadApkFile = () => {
    soundFx.playHeadshot();
    soundFx.playBassDrop();
    setInstallStatus('📥 APK download link khul raha hai... Notification bar check karein!');
    triggerApkDownload('release');
  };

  const handleDownloadZip = async () => {
    soundFx.playHeadshot();
    setDownloadingZip(true);
    try {
      await downloadProjectZip();
      soundFx.playSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-emerald-500/50 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8 text-zinc-100">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute right-4 top-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-zinc-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 flex items-center justify-center text-zinc-950 font-black text-2xl shadow-xl shadow-emerald-500/30 shrink-0">
            VIP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">
                FF SensiPro VIP App
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
                100% WORKING
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Package:{' '}
              <span className="font-mono text-zinc-300">com.ffsensipro.headshotengine</span>
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono mt-1.5">
              <span className="text-emerald-400 font-bold">Anti-Ban Safe</span>
              <span>·</span>
              <span className="text-amber-400 font-bold">Direct Install</span>
              <span>·</span>
              <span>No Root Needed</span>
            </div>
          </div>
        </div>

        {/* Warning if inside In-App Browser (WhatsApp, Instagram, Telegram) */}
        {envInfo.isInAppBrowser && (
          <div className="p-3.5 bg-amber-500/20 border border-amber-500/50 rounded-2xl text-xs space-y-1.5 text-amber-200">
            <div className="font-bold flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Aap WhatsApp / Instagram ke browser me hain!</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              In-app browser me app direct install nahi hota. Upar <strong>3 Dots (⋮)</strong> par tap karke <strong>"Open in Chrome"</strong> select karein.
            </p>
          </div>
        )}

        {/* Status notification */}
        {installStatus && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="font-medium">{installStatus}</span>
          </div>
        )}

        {/* METHOD 1: Guaranteed Chrome 3-Dots Install (Official Google Way) */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Tareeqa 1: Mobile Me Direct Install (100% Guaranteed)</span>
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
              OFFICIAL
            </span>
          </div>

          <div className="space-y-2 text-xs text-zinc-300 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                1
              </span>
              <span>
                Chrome browser ke bilkul upar right side me <strong>3 Dots (⋮)</strong> par tap karein.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                2
              </span>
              <span>
                List me se <strong>"Install app"</strong> (ya <strong>"Add to Home screen"</strong>) par click karein.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0">
                3
              </span>
              <span>
                Popup me <strong>"Install"</strong> dabayein — aapke mobile ke app drawer me real app aa jayega!
              </span>
            </div>
          </div>

          <button
            onClick={handleNativeInstall}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-zinc-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isInstalled
                ? '✓ App Already Installed on Device'
                : '📲 CLICK HERE TO TRIGGER INSTALL POPUP'}
            </span>
          </button>
        </div>

        {/* METHOD 2: Direct Raw .APK File Download */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Tareeqa 2: Raw .APK File Download Karein</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
              FILE DOWNLOAD
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Agar aapke phone me Chrome popup na aaye, toh direct compiled <strong>FF_SensiPro_v4.9_VIP.apk</strong> download karein.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDownloadApkFile}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black text-xs active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>📥 Download .APK</span>
            </button>

            <a
              href={GITHUB_ACTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs active:scale-95 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub APK Runner</span>
            </a>
          </div>
        </div>

        {/* METHOD 3: Source Code ZIP */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
            <FolderArchive className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Android Studio Project (.ZIP Source)</span>
          </div>
          <button
            onClick={handleDownloadZip}
            disabled={downloadingZip}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold border border-zinc-700 transition-all disabled:opacity-50"
          >
            {downloadingZip ? 'Packaging...' : 'Download .ZIP'}
          </button>
        </div>
      </div>
    </div>
  );
};
