import React from 'react';
import { PRO_PLAYERS } from '../data/proPlayers';
import { ProPlayerPreset, SensiScale } from '../types/sensi';
import { User, Zap, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface ProPresetsTabProps {
  onApplyPreset: (preset: ProPlayerPreset) => void;
  scale: SensiScale;
}

export const ProPresetsTab: React.FC<ProPresetsTabProps> = ({ onApplyPreset, scale }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
          Verified Esports Codex
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Pro Players & Content Creators Sensitivity
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Inspect authentic in-game sensitivities, fire button ratios, developer DPI, and finger
          claw mechanics used by global Free Fire legends. Click any profile to instantly load and
          fine-tune their setup.
        </p>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRO_PLAYERS.map((player) => {
          const mult = scale === '200' ? 1.85 : 1;
          const displayGeneral = Math.min(scale === '200' ? 200 : 100, Math.round(player.sensi.general * mult));
          const displayRedDot = Math.min(scale === '200' ? 200 : 100, Math.round(player.sensi.redDot * mult));

          return (
            <div
              key={player.id}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {player.name}
                    </h3>
                    <span className="text-xs font-semibold text-amber-500 block">
                      {player.role}
                    </span>
                    <span className="text-[10px] text-zinc-500">{player.channel}</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {player.claw}
                  </span>
                </div>

                {/* Gun & Device tags */}
                <div className="space-y-1.5 mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Zap className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-zinc-300 font-medium">{player.signatureGun}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{player.device}</span>
                  </div>
                </div>

                {/* Sensi Breakdown Grid */}
                <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 mb-3 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">General</span>
                    <span className="text-base font-extrabold font-mono text-amber-400">
                      {displayGeneral}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Red Dot</span>
                    <span className="text-base font-extrabold font-mono text-red-400">
                      {displayRedDot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Button</span>
                    <span className="text-base font-extrabold font-mono text-purple-400">
                      {player.fireButtonSize}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">2X Scope</span>
                    <span className="text-sm font-bold font-mono text-yellow-400">
                      {Math.round(player.sensi.scope2x * mult)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">4X Scope</span>
                    <span className="text-sm font-bold font-mono text-blue-400">
                      {Math.round(player.sensi.scope4x * mult)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">DPI</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {player.dpi}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed italic mb-4">
                  "{player.bio}"
                </p>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onApplyPreset(player);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-white transition-all active:scale-95 shadow-sm"
              >
                <span>Load Profile into Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
