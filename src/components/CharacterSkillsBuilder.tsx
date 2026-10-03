import React, { useState } from 'react';
import {
  ALL_CHARACTERS,
  CharacterSkill,
  PRESET_COMBOS,
  CharacterPresetCombo,
} from '../data/characterSkillsDatabase';
import {
  Sparkles,
  Zap,
  Shield,
  Target,
  Copy,
  Check,
  Flame,
  Award,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export const CharacterSkillsBuilder: React.FC = () => {
  const [selectedCombo, setSelectedCombo] = useState<CharacterPresetCombo>(PRESET_COMBOS[0]);
  const [activeChar, setActiveChar] = useState<CharacterSkill>(PRESET_COMBOS[0].activeChar);
  const [passiveChars, setPassiveChars] = useState<CharacterSkill[]>(PRESET_COMBOS[0].passiveChars);
  const [copied, setCopied] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<'active' | number | null>(null);

  const handleSelectPreset = (preset: CharacterPresetCombo) => {
    soundFx.playClick();
    setSelectedCombo(preset);
    setActiveChar(preset.activeChar);
    setPassiveChars(preset.passiveChars);
  };

  const handlePickCharacter = (char: CharacterSkill) => {
    soundFx.playHeadshot();
    if (pickerSlot === 'active' && char.type === 'active') {
      setActiveChar(char);
    } else if (typeof pickerSlot === 'number' && char.type === 'passive') {
      const next = [...passiveChars];
      next[pickerSlot] = char;
      setPassiveChars(next);
    }
    setPickerSlot(null);
  };

  const handleCopyCombo = () => {
    soundFx.playClick();
    const text = `🔥 FREE FIRE HEADSHOT CHARACTER COMBO:
========================================
⚡ Active: ${activeChar.name} (${activeChar.abilityName})
   - ${activeChar.headshotBenefit}
----------------------------------------
🎯 Passive 1: ${passiveChars[0]?.name} (${passiveChars[0]?.abilityName})
🎯 Passive 2: ${passiveChars[1]?.name} (${passiveChars[1]?.abilityName})
🎯 Passive 3: ${passiveChars[2]?.name} (${passiveChars[2]?.abilityName})
========================================
💡 Tactical Advantage: ${selectedCombo.tacticalAdvantage}
Calibrated via FF SensiPro A-Z Engine`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePool = ALL_CHARACTERS.filter((c) => c.type === 'active');
  const passivePool = ALL_CHARACTERS.filter((c) => c.type === 'passive');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            Character Skill Synergies
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            99% Headshot Magnetism
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Pro Headshot Character Combination Builder
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          In high-tier Free Fire, sensitivity alone is not enough—movement velocity, recoil
          suppression, and scoped accuracy buffs come directly from character skills. Select or
          customize your 4-character loadout below.
        </p>
      </div>

      {/* Preset Combo Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESET_COMBOS.map((combo) => (
          <button
            key={combo.id}
            onClick={() => handleSelectPreset(combo)}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedCombo.id === combo.id
                ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold uppercase text-amber-500">
                  {combo.playstyle.toUpperCase()}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {combo.synergyScore}% Synergy
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{combo.title}</h3>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {combo.subtitle}
              </p>
            </div>
            {selectedCombo.id === combo.id && (
              <div className="w-full h-1 bg-amber-500 rounded-full mt-3"></div>
            )}
          </button>
        ))}
      </div>

      {/* Active Loadout Slots Grid */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Active 4-Skill Combination Loadout</h3>
          </div>
          <button
            onClick={handleCopyCombo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/10"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Combo!' : 'Copy Skill Combo'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Slot */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/40 relative flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  Active Ability
                </span>
                <button
                  onClick={() => setPickerSlot('active')}
                  className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Change</span>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{activeChar.icon}</span>
                <div>
                  <h4 className="text-base font-black text-white">{activeChar.name}</h4>
                  <span className="text-xs text-amber-400 font-semibold">
                    {activeChar.abilityName}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                {activeChar.description}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-medium">
              🎯 {activeChar.headshotBenefit}
            </div>
          </div>

          {/* 3 Passive Slots */}
          {passiveChars.map((pChar, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 relative flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    Passive Slot {idx + 1}
                  </span>
                  <button
                    onClick={() => setPickerSlot(idx)}
                    className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Change</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{pChar.icon}</span>
                  <div>
                    <h4 className="text-base font-black text-white">{pChar.name}</h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {pChar.abilityName}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                  {pChar.description}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-medium">
                🎯 {pChar.headshotBenefit}
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Advantage Summary Card */}
        <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-3">
          <Flame className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Tactical Headshot Synergy:</span>
            <p className="text-zinc-400 leading-relaxed">{selectedCombo.tacticalAdvantage}</p>
          </div>
        </div>
      </div>

      {/* Character Picker Modal */}
      {pickerSlot !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-lg w-full space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white">
                Choose {pickerSlot === 'active' ? 'Active Character' : 'Passive Character'}
              </h3>
              <button
                onClick={() => setPickerSlot(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(pickerSlot === 'active' ? activePool : passivePool).map((char) => (
                <button
                  key={char.id}
                  onClick={() => handlePickCharacter(char)}
                  className="p-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-left transition-all flex items-start gap-3"
                >
                  <span className="text-2xl">{char.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{char.name}</h4>
                    <span className="text-[10px] text-amber-400 font-semibold block">
                      {char.abilityName}
                    </span>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 mt-0.5">
                      {char.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
