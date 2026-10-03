import React, { useState } from 'react';
import { ALL_FREE_FIRE_WEAPONS } from '../data/allGunsDatabase';
import { SensiScale, SensiValues, WeaponSensiInfo } from '../types/sensi';
import { Crosshair, Target, Zap, Shield, Flame, Search, Copy, Check } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface WeaponSensiMatrixProps {
  currentSensi: SensiValues;
  scale: SensiScale;
}

export const WeaponSensiMatrix: React.FC<WeaponSensiMatrixProps> = ({ currentSensi, scale }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedWeaponId, setCopiedWeaponId] = useState<string | null>(null);

  const categories = ['All', 'Shotgun', 'SMG', 'AR', 'Marksman', 'Sniper', 'Pistol'];

  const filteredWeapons = ALL_FREE_FIRE_WEAPONS.filter((w) => {
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const maxVal = scale === '200' ? 200 : 100;
  const boostMult = scale === '200' ? 2 : 1;

  const handleCopyWeaponSensi = (weapon: WeaponSensiInfo) => {
    soundFx.playClick();
    const gunGeneral = Math.min(
      maxVal,
      Math.max(20, currentSensi.general + weapon.recommendedGeneralBoost * boostMult)
    );
    const gunRedDot = Math.min(
      maxVal,
      Math.max(20, currentSensi.redDot + weapon.recommendedRedDotBoost * boostMult)
    );

    const text = `🔥 FREE FIRE WEAPON SENSI: ${weapon.name.toUpperCase()}
Category: ${weapon.category} | Recoil: ${weapon.recoilDifficulty}
----------------------------------------
General Camera: ${gunGeneral}
Red Dot (Hipfire): ${gunRedDot}
2X Scope: ${currentSensi.scope2x}
4X Scope: ${currentSensi.scope4x}
Sniper Scope: ${currentSensi.sniperScope}
----------------------------------------
Drag Speed: ${weapon.dragSpeed}
Recommended Stroke: ${weapon.dragTechnique}
Range: ${weapon.optimalRange}
💡 Pro Tip: ${weapon.proTips}
----------------------------------------
Calibrated via FF SensiPro A-Z Engine`;

    navigator.clipboard.writeText(text);
    setCopiedWeaponId(weapon.id);
    setTimeout(() => setCopiedWeaponId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            All Free Fire Weapons Encyclopedia
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {ALL_FREE_FIRE_WEAPONS.length} Weapons Calibrated
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Weapon-Specific Drag Speeds & Recoil Controls
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Every gun archetype in Free Fire possesses distinct bullet spread bloom, drag velocity
          thresholds, and headshot magnetism. Select any weapon to view its exact drag stroke and
          calibrated sensitivity offset.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all guns (e.g. M1887, Deagle, MP40, Woodpecker, AK, Groza)..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Weapon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWeapons.map((weapon) => {
          // Dynamic calculation: Base general + weapon boost
          const gunGeneral = Math.min(
            maxVal,
            Math.max(20, currentSensi.general + weapon.recommendedGeneralBoost * boostMult)
          );
          const gunRedDot = Math.min(
            maxVal,
            Math.max(20, currentSensi.redDot + weapon.recommendedRedDotBoost * boostMult)
          );

          const isCopied = copiedWeaponId === weapon.id;

          return (
            <div
              key={weapon.id}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider">
                      {weapon.category}
                    </span>
                    <h3 className="text-base font-bold text-white">{weapon.name}</h3>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      weapon.recoilDifficulty === 'Extreme'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : weapon.recoilDifficulty === 'High'
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {weapon.recoilDifficulty} Recoil
                  </span>
                </div>

                {/* Sensi Badges */}
                <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80 mb-3 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">General Offset</span>
                    <span className="text-lg font-black font-mono text-amber-400">
                      {gunGeneral}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Red Dot Offset</span>
                    <span className="text-lg font-black font-mono text-red-400">
                      {gunRedDot}
                    </span>
                  </div>
                </div>

                {/* Specs list */}
                <div className="space-y-1.5 text-xs text-zinc-300 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Drag Speed:</span>
                    <span className="font-semibold text-zinc-200">{weapon.dragSpeed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Recommended Stroke:</span>
                    <span className="font-semibold text-amber-400">{weapon.dragTechnique}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Effective Range:</span>
                    <span className="font-mono text-zinc-300">{weapon.optimalRange}</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-900 mb-3">
                  {weapon.proTips}
                </p>
              </div>

              {/* 1-Click Copy Weapon Sensi Button */}
              <button
                onClick={() => handleCopyWeaponSensi(weapon)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 transition-all active:scale-95"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied {weapon.name.split(' ')[0]} Sensi!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {weapon.name.split(' ')[0]} Sensi</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
