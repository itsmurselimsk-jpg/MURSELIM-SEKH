import React, { useState } from 'react';
import { SavedConfiguration } from '../types/sensi';
import { Trash2, Copy, Check, ArrowRight, Bookmark } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface SavedConfigsProps {
  configs: SavedConfiguration[];
  onLoadConfig: (config: SavedConfiguration) => void;
  onDeleteConfig: (id: string) => void;
}

export const SavedConfigs: React.FC<SavedConfigsProps> = ({
  configs,
  onLoadConfig,
  onDeleteConfig,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (config: SavedConfiguration) => {
    soundFx.playClick();
    const text = `🔥 FREE FIRE SAVED SENSI: ${config.title}
Device: ${config.deviceModel} (${config.ram} RAM)
Playstyle: ${config.playstyle.toUpperCase()}
Scale: ${config.scale === '200' ? 'Modern OB 0-200' : 'Classic 0-100'}
----------------------------------------
General Camera: ${config.sensi.general}
Red Dot: ${config.sensi.redDot}
2X Scope: ${config.sensi.scope2x}
4X Scope: ${config.sensi.scope4x}
Sniper Scope: ${config.sensi.sniperScope}
Free Look: ${config.sensi.freeLook}
Fire Button Size: ${config.fireButtonSize}%
Safe Smallest Width (DPI): ${config.safeDpi}
----------------------------------------
Calibrated via FF SensiPro A-Z Engine`;

    navigator.clipboard.writeText(text);
    setCopiedId(config.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
          Custom Preset Library
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Your Saved Configurations
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Access and reload custom room sensitivity setups, weapon-specific profiles, and squad
          calibrations saved directly to your browser's local storage.
        </p>
      </div>

      {configs.length === 0 ? (
        <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-zinc-300">No Saved Configurations Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Calculate your device's sensitivity in the Sensi Calculator tab and tap "Save" to build
            your personal library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {configs.map((cfg) => (
            <div
              key={cfg.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white truncate max-w-[200px]">
                      {cfg.title}
                    </h3>
                    <span className="text-xs text-amber-400 font-semibold">
                      {cfg.deviceModel} · {cfg.ram}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      Scale: {cfg.scale === '200' ? 'OB 0-200' : '0-100'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onDeleteConfig(cfg.id);
                    }}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80 my-3 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">General</span>
                    <span className="font-bold font-mono text-amber-400">
                      {cfg.sensi.general}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Red Dot</span>
                    <span className="font-bold font-mono text-red-400">
                      {cfg.sensi.redDot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Button</span>
                    <span className="font-bold font-mono text-purple-400">
                      {cfg.fireButtonSize}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => handleCopy(cfg)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  {copiedId === cfg.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onLoadConfig(cfg);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors"
                >
                  <span>Load Setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
