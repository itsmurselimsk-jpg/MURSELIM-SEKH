import React, { useState } from 'react';
import {
  Swords,
  Copy,
  Check,
  Shield,
  Flame,
  Share2,
  Sliders,
  Settings2,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export const CustomRoomGenerator: React.FC = () => {
  const [roomName, setRoomName] = useState('PRO 1v1 RED ONLY');
  const [roomPassword, setRoomPassword] = useState('1234');
  const [gameMode, setGameMode] = useState<'CS' | 'LoneWolf' | 'BR'>('CS');
  const [weaponRule, setWeaponRule] = useState<'m1887_deagle' | 'shotgun_only' | 'sniper_only' | 'all'>('m1887_deagle');
  const [limitedAmmo, setLimitedAmmo] = useState<'No' | 'Yes'>('No'); // No = Unlimited Gloo Wall
  const [gunAttributes, setGunAttributes] = useState<'No' | 'Yes'>('No'); // No = Fair Play Esports
  const [characterSkill, setCharacterSkill] = useState<'Yes' | 'No'>('Yes');
  const [roundCoin, setRoundCoin] = useState<'1500' | '500'>('1500');
  const [copied, setCopied] = useState(false);

  const weaponLabels = {
    m1887_deagle: 'M1887 (Double Barrel) & Desert Eagle Only (Red Numbers)',
    shotgun_only: 'Shotguns Only (M1887, M1014, MAG-7)',
    sniper_only: 'Double Sniper Only (AWM / M82B / Kar98k)',
    all: 'All Weapons Allowed (Standard Tournament)',
  };

  const handleCopyInvite = () => {
    soundFx.playHeadshot();
    const text = `🏆 FREE FIRE CUSTOM ROOM CHALLENGE 🏆
========================================
⚔️ Room Name: ${roomName}
🔑 Password: ${roomPassword}
🎮 Game Mode: ${gameMode === 'CS' ? 'Clash Squad (7 Rounds)' : gameMode === 'LoneWolf' ? 'Lone Wolf 1v1' : 'Battle Royale'}
🔫 Weapon Rule: ${weaponLabels[weaponRule]}
----------------------------------------
📌 ROOM SETTINGS & RULES:
• Limited Ammo: ${limitedAmmo} (Unlimited Gloo Walls: ${limitedAmmo === 'No' ? 'YES' : 'NO'})
• Gun Attributes: ${gunAttributes} (${gunAttributes === 'No' ? 'Pure Skill / Fair Play' : 'Skins Active'})
• Character Skills: ${characterSkill}
• Round 1 Coins: $${roundCoin}
• Fall Damage: NO | Jump Height: 100%
========================================
⚡ Join fast! Training custom room generated via FF SensiPro Engine.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            Custom Room 1v1 / 4v4 Hub
          </span>
          <span className="text-xs text-red-400 font-mono font-bold">
            Esports Fair-Play Rules
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Custom Room Rules & Invite Generator
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Configure tournament-grade custom room match rules (Unlimited Gloo Wall, M1887 & Desert
          Eagle Red Numbers, Gun Attributes OFF) and copy a ready-to-share WhatsApp/Discord invite
          card.
        </p>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Setup Controls (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-amber-400" />
            <span>Room Specifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                Room Title
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                Room Password
              </label>
              <input
                type="text"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
              Game Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'CS', label: 'Clash Squad 4v4' },
                { id: 'LoneWolf', label: 'Lone Wolf 1v1' },
                { id: 'BR', label: 'Battle Royale' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    soundFx.playClick();
                    setGameMode(m.id as 'CS' | 'LoneWolf' | 'BR');
                  }}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    gameMode === m.id
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weapon Restriction */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
              Weapon Restriction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'm1887_deagle', label: 'M1887 & Deagle (One-Tap Only)' },
                { id: 'shotgun_only', label: 'Shotguns Only (Close Combat)' },
                { id: 'sniper_only', label: 'Double Sniper (AWM/M82B)' },
                { id: 'all', label: 'All Guns (No Restrictions)' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    soundFx.playClick();
                    setWeaponRule(w.id as typeof weaponRule);
                  }}
                  className={`p-2.5 text-xs text-left font-bold rounded-xl border transition-all ${
                    weaponRule === w.id
                      ? 'bg-zinc-800 text-amber-400 border-amber-500/60 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* In-Game Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                Limited Ammo
              </span>
              <button
                onClick={() => setLimitedAmmo(limitedAmmo === 'No' ? 'Yes' : 'No')}
                className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  limitedAmmo === 'No'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {limitedAmmo === 'No' ? 'No (Unlimited)' : 'Yes (Limited)'}
              </button>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                Gun Attributes
              </span>
              <button
                onClick={() => setGunAttributes(gunAttributes === 'No' ? 'Yes' : 'No')}
                className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  gunAttributes === 'No'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {gunAttributes === 'No' ? 'No (Fair Play)' : 'Yes (Skins On)'}
              </button>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                Character Skill
              </span>
              <button
                onClick={() => setCharacterSkill(characterSkill === 'Yes' ? 'No' : 'Yes')}
                className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  characterSkill === 'Yes'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                {characterSkill}
              </button>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                Round 1 Coin
              </span>
              <button
                onClick={() => setRoundCoin(roundCoin === '1500' ? '500' : '1500')}
                className="w-full py-1.5 rounded-lg text-xs font-bold bg-zinc-950 text-amber-400 border border-zinc-800"
              >
                ${roundCoin} Coins
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Share Card Preview (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Invite Card Preview
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                WhatsApp & Discord Ready
              </span>
            </div>

            {/* Visual Invite Card */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs space-y-2 text-zinc-300 leading-relaxed shadow-inner">
              <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                <Swords className="w-4 h-4 text-red-500" />
                <span>{roomName}</span>
              </div>
              <div className="text-zinc-400 text-[11px]">
                Password: <span className="text-white font-bold">{roomPassword}</span> · Mode:{' '}
                <span className="text-white font-bold">{gameMode}</span>
              </div>
              <div className="py-2 border-y border-zinc-900 text-[11px] space-y-1">
                <div>• Weapons: {weaponLabels[weaponRule]}</div>
                <div>• Unlimited Gloo Walls: {limitedAmmo === 'No' ? 'YES' : 'NO'}</div>
                <div>• Gun Attributes: {gunAttributes === 'No' ? 'OFF (Fair Play)' : 'ON'}</div>
                <div>• Character Skills: {characterSkill}</div>
              </div>
              <div className="text-[10px] text-zinc-400">
                100% Red Headshots Only · Sit-up Gloo Wall required
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyInvite}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
            <span>{copied ? 'Copied Room Card!' : 'Copy Room Invite Card'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
