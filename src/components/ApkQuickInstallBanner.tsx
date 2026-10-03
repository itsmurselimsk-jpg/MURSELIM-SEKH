import React from 'react';
import { Smartphone, Download, Sparkles, ShieldCheck, Zap, ArrowRight, X } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface ApkQuickInstallBannerProps {
  onOpenModal: () => void;
  onDirectInstall: () => void;
  isInstalled: boolean;
}

export const ApkQuickInstallBanner: React.FC<ApkQuickInstallBannerProps> = ({
  onOpenModal,
  onDirectInstall,
  isInstalled,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed || isInstalled) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border-2 border-emerald-500/50 p-4 shadow-xl shadow-emerald-950/40">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/30">
            <Smartphone className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL ANDROID APP (v4.9 VIP)</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                100% SAFE
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-black text-white tracking-tight mt-0.5">
              Install FF SensiPro VIP App on your Android Phone
            </h3>

            <p className="text-xs text-zinc-400 mt-0.5">
              Direct home screen icon, instant Free Fire launcher, offline mode, zero lag & real haptic buzz!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              soundFx.playHeadshot();
              onDirectInstall();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/30"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>📲 INSTALL APK NOW</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenModal();
            }}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 active:scale-95 transition-all"
          >
            Options
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
