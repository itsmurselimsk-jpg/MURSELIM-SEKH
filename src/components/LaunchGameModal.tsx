import React, { useState } from 'react';
import { Play, Copy, Check, ExternalLink, X, Smartphone, ShieldCheck } from 'lucide-react';
import { launchFreeFire } from '../utils/freeFireLauncher';
import { SensiValues } from '../types/sensi';
import { soundFx } from '../utils/audioEffects';

interface LaunchGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  sensi: SensiValues;
  model: string;
}

export const LaunchGameModal: React.FC<LaunchGameModalProps> = ({
  isOpen,
  onClose,
  sensi,
  model,
}) => {
  const [copied, setCopied] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySensiBrief = () => {
    soundFx.playClick();
    const text = `🔥 FREE FIRE CALIBRATED SENSI (${model})
General: ${sensi.general} | Red Dot: ${sensi.redDot}
2X: ${sensi.scope2x} | 4X: ${sensi.scope4x} | Sniper: ${sensi.sniperScope} | Free Look: ${sensi.freeLook}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunch = (version: 'max' | 'standard') => {
    soundFx.playHeadshot();
    copySensiBrief();
    setLaunchStatus(`Launching Free Fire ${version === 'max' ? 'MAX' : 'Standard'}...`);
    setTimeout(() => {
      launchFreeFire(version);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-wider mb-1">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Direct Free Fire Launcher</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Launch Game & Apply Calibration
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Your calibrated sensitivity will be copied to your clipboard automatically so you can
            paste or enter it directly into the in-game settings tab.
          </p>
        </div>

        {/* Current Sensi Pill */}
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block font-bold">
              Ready to Apply ({model})
            </span>
            <span className="font-mono text-zinc-200 font-bold">
              General: <span className="text-amber-400">{sensi.general}</span> · Red Dot:{' '}
              <span className="text-red-400">{sensi.redDot}</span>
            </span>
          </div>
          <button
            onClick={copySensiBrief}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {launchStatus && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs text-center font-bold animate-pulse">
            {launchStatus}
          </div>
        )}

        {/* Dual Launch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => handleLaunch('max')}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-black text-xs hover:from-amber-400 hover:to-orange-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Free Fire MAX</span>
          </button>

          <button
            onClick={() => handleLaunch('standard')}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs active:scale-95 transition-all border border-zinc-700"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Free Fire Standard</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/80">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Opens official Garena Free Fire client via device OS intent.</span>
        </div>
      </div>
    </div>
  );
};
