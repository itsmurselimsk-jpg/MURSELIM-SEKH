import React, { useState } from 'react';
import { SensiScale, SensiValues, ProPlayerPreset } from '../types/sensi';
import { PRO_PLAYERS } from '../data/proPlayers';
import { Scale, Users, Check, ArrowRight, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface ProSensiCompareProps {
  currentSensi: SensiValues;
  scale: SensiScale;
  onApplyProPreset: (preset: ProPlayerPreset) => void;
}

export const ProSensiCompare: React.FC<ProSensiCompareProps> = ({
  currentSensi,
  scale,
  onApplyProPreset,
}) => {
  const [selectedProId, setSelectedProId] = useState<string>(PRO_PLAYERS[0].id);

  const selectedPro = PRO_PLAYERS.find((p) => p.id === selectedProId) || PRO_PLAYERS[0];

  const maxVal = scale === '200' ? 200 : 100;
  const is200 = scale === '200';

  // Pro values adapted to scale
  const proGeneral = is200 ? selectedPro.sensi.general * 2 : selectedPro.sensi.general;
  const proRedDot = is200 ? selectedPro.sensi.redDot * 2 : selectedPro.sensi.redDot;
  const pro2x = is200 ? selectedPro.sensi.scope2x * 2 : selectedPro.sensi.scope2x;
  const pro4x = is200 ? selectedPro.sensi.scope4x * 2 : selectedPro.sensi.scope4x;
  const proSniper = is200 ? selectedPro.sensi.sniperScope * 2 : selectedPro.sensi.sniperScope;

  const metrics = [
    { label: 'General Camera', myVal: currentSensi.general, proVal: proGeneral },
    { label: 'Red Dot / Hipfire', myVal: currentSensi.redDot, proVal: proRedDot },
    { label: '2X Scope Drag', myVal: currentSensi.scope2x, proVal: pro2x },
    { label: '4X Scope Laser', myVal: currentSensi.scope4x, proVal: pro4x },
    { label: 'Sniper Precision', myVal: currentSensi.sniperScope, proVal: proSniper },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            Side-by-Side Sensi Benchmark
          </span>
          <span className="text-xs text-amber-400 font-mono font-bold">
            Esports Verified Values
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Compare Your Sensi vs Pro Legends
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          See how your current touch calibration stacks up against top tournament players like
          Raistar, White444, and AjjuBhai. Analyze differences in general flick speed and scope
          stability.
        </p>
      </div>

      {/* Pro Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRO_PLAYERS.map((pro) => (
          <button
            key={pro.id}
            onClick={() => {
              soundFx.playClick();
              setSelectedProId(pro.id);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedProId === pro.id
                ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50 shadow-md'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <span className="text-xs font-bold text-white block mb-0.5">{pro.name}</span>
            <span className="text-[10px] text-amber-400 block truncate">{pro.role}</span>
            <span className="text-[10px] text-zinc-400 block mt-1">{pro.device}</span>
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <span className="text-xs text-zinc-400 block">Comparing with:</span>
            <h3 className="text-lg font-black text-white">{selectedPro.name}’s Setup</h3>
            <span className="text-xs text-amber-400 font-mono font-semibold">
              Fire Button: {selectedPro.fireButtonSize}% · Safe DPI: {selectedPro.dpi}
            </span>
          </div>

          <button
            onClick={() => onApplyProPreset(selectedPro)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Adopt {selectedPro.name}’s Sensi</span>
          </button>
        </div>

        {/* Metrics Delta List */}
        <div className="space-y-3">
          {metrics.map((m) => {
            const diff = m.myVal - m.proVal;
            return (
              <div
                key={m.label}
                className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between gap-4"
              >
                <div className="w-40 sm:w-48">
                  <span className="text-xs font-bold text-white block">{m.label}</span>
                  <span className="text-[10px] text-zinc-500">
                    {diff === 0
                      ? 'Exact Match'
                      : diff > 0
                      ? `${Math.abs(diff)} points faster`
                      : `${Math.abs(diff)} points slower`}
                  </span>
                </div>

                {/* Comparative Visual Bars */}
                <div className="flex-1 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-400 block">Your Sensi</span>
                    <span className="text-base font-black font-mono text-white">{m.myVal}</span>
                  </div>

                  <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-amber-400 block">{selectedPro.name}</span>
                    <span className="text-base font-black font-mono text-amber-400">{m.proVal}</span>
                  </div>
                </div>

                <div className="w-20 text-right font-mono text-xs font-bold">
                  {diff > 0 ? (
                    <span className="text-emerald-400 flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{diff}
                    </span>
                  ) : diff < 0 ? (
                    <span className="text-red-400 flex items-center justify-end gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {diff}
                    </span>
                  ) : (
                    <span className="text-zinc-400">= 0</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Combat Advice */}
        <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
          <span className="font-bold text-amber-400 block mb-1">
            {selectedPro.name}’s Combat Philosophy:
          </span>
          <p className="text-zinc-400 leading-relaxed">{selectedPro.bio}</p>
        </div>
      </div>
    </div>
  );
};
