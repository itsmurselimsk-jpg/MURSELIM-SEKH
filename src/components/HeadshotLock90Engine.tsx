import React, { useState, useEffect } from 'react';
import {
  Flame,
  Target,
  Zap,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Crosshair,
  Volume2,
  Sparkles,
  Smartphone,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  HeadshotWeaponKey,
  RamTier,
  RefreshRate,
  SensiScale,
  SensiValues,
} from '../types/sensi';
import {
  calculateHeadshotLockSensi,
  HEADSHOT_WEAPONS_DATABASE,
} from '../data/headshotLockData';
import { soundFx } from '../utils/audioEffects';

interface HeadshotLock90EngineProps {
  ram: RamTier;
  refreshRate: RefreshRate;
  scale: SensiScale;
  model: string;
  brand: string;
  onApplySensi: (sensi: SensiValues, fireSize: number) => void;
}

export const HeadshotLock90Engine: React.FC<HeadshotLock90EngineProps> = ({
  ram,
  refreshRate,
  scale,
  model,
  brand,
  onApplySensi,
}) => {
  const [selectedWeapon, setSelectedWeapon] = useState<HeadshotWeaponKey>('M1887');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentShotIndex, setCurrentShotIndex] = useState<number | null>(null);
  const [shotHistory, setShotHistory] = useState<('head' | 'body')[]>([]);
  const [applied, setApplied] = useState(false);

  const weaponKeys: HeadshotWeaponKey[] = ['M1887', 'Desert Eagle', 'Woodpecker', 'MP40', 'AK47'];
  const activeWeaponData = HEADSHOT_WEAPONS_DATABASE[selectedWeapon];

  const calibrated = calculateHeadshotLockSensi(
    ram,
    refreshRate,
    scale,
    selectedWeapon
  );

  // Run the 10-shot simulation test
  const startTenShotTest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setShotHistory([]);
    setCurrentShotIndex(0);

    let count = 0;
    const interval = setInterval(() => {
      if (count < 10) {
        // First 9 shots are Headshots, 10th shot is body hit to simulate real 90% headshot accuracy
        const isHeadshot = count < 9;
        if (isHeadshot) {
          soundFx.playHeadshot();
        } else {
          soundFx.playGunshot();
        }

        setShotHistory((prev) => [...prev, isHeadshot ? 'head' : 'body']);
        setCurrentShotIndex(count);
        count++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setCurrentShotIndex(null);
      }
    }, 280);
  };

  const handleApplyToApp = () => {
    soundFx.playSuccess();
    onApplySensi(calibrated.sensi, calibrated.fireButtonSize);
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-2 border-red-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden my-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-black tracking-wider uppercase mb-2 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>10 Goli Me 9 Head Lock Formula</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <span>🎯 90% Headshot Lock Engine</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              Esports Ratio
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Aapke <span className="text-white font-bold">{brand} {model}</span> ({refreshRate}, {ram} RAM) ke screen touch delay ke hisab se calibrated — body par goli phasegi nahi aur sar ke upar hawa me nahi jayegi!
          </p>
        </div>

        <button
          onClick={handleApplyToApp}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          {applied ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Sensi Applied to App!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Apply 90% Headshot Sensi</span>
            </>
          )}
        </button>
      </div>

      {/* Gun Selector Tabs */}
      <div className="py-5 relative z-10">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Crosshair className="w-4 h-4 text-red-400" />
          <span>Select Signature Gun For 90% Lock:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {weaponKeys.map((gunKey) => {
            const isSelected = selectedWeapon === gunKey;
            return (
              <button
                key={gunKey}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedWeapon(gunKey);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-950/70 to-zinc-900 border-red-500 text-white shadow-lg shadow-red-500/20 scale-[1.02]'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className="text-sm font-black tracking-tight">{gunKey}</span>
                <span className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                  9/10 Headshots
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive 10-Shot Bullet Hit Tracker */}
      <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 mb-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40">
              <Target className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">
                10-Shot Firing Rate Diagnostic
              </h4>
              <p className="text-xs text-zinc-400">
                Live simulation test for {activeWeaponData.name}
              </p>
            </div>
          </div>

          <button
            onClick={startTenShotTest}
            disabled={isSimulating}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 active:scale-95 transition-all disabled:opacity-50"
          >
            <Volume2 className="w-4 h-4 text-red-400" />
            <span>{isSimulating ? 'Firing 10 Shots...' : '🔥 Test 10-Shot Fire Simulation'}</span>
          </button>
        </div>

        {/* 10 Bullets Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-3">
          {Array.from({ length: 10 }).map((_, index) => {
            const hasFired = shotHistory.length > index;
            const result = hasFired ? shotHistory[index] : null;
            const isCurrentlyFiring = currentShotIndex === index;

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  isCurrentlyFiring
                    ? 'border-amber-400 bg-amber-500/30 scale-110 shadow-lg shadow-amber-500/50'
                    : hasFired && result === 'head'
                    ? 'border-red-500 bg-red-950/70 text-red-200'
                    : hasFired && result === 'body'
                    ? 'border-yellow-600/70 bg-yellow-950/40 text-yellow-300'
                    : index < 9
                    ? 'border-zinc-800 bg-zinc-900/50 text-zinc-500'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-500'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-zinc-400 mb-1">
                  #{index + 1}
                </div>
                <div className="text-base sm:text-lg">
                  {hasFired ? (
                    result === 'head' ? (
                      <span className="text-red-500 font-black animate-bounce">🔴</span>
                    ) : (
                      <span className="text-yellow-400 font-bold">⚪</span>
                    )
                  ) : index < 9 ? (
                    <span className="opacity-40">🔴</span>
                  ) : (
                    <span className="opacity-40">⚪</span>
                  )}
                </div>
                <div className="text-[9px] font-bold mt-1 text-center truncate">
                  {hasFired
                    ? result === 'head'
                      ? 'HEAD'
                      : 'BODY'
                    : index < 9
                    ? 'HEAD'
                    : 'BODY'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Accuracy Bar */}
        <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t border-zinc-800/80">
          <span className="text-red-400 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
            9 Red Number Headshots (360+ Damage)
          </span>
          <span className="text-amber-300 font-black">
            90% Headshot Accuracy Calibrated
          </span>
          <span className="text-zinc-400 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-500 inline-block"></span>
            1 Body Follow-up Hit
          </span>
        </div>
      </div>

      {/* Grid of Results: Calibrated Values & Weapon Drag Secrets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        {/* Left Card: Calibrated Golden Numbers */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-black text-white">
                Golden Sensi Values ({scale === '200' ? 'OB 0-200' : 'Classic 0-100'})
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Zero Sky-Recoil
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block">General (Camera)</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {calibrated.sensi.general}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Smooth drag lift</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-red-900/40">
              <span className="text-[11px] text-red-300 block font-semibold">Red Dot (Headshot)</span>
              <span className="text-2xl font-black text-red-400 font-mono">
                {calibrated.sensi.redDot}
              </span>
              <span className="text-[10px] text-red-300/70 block mt-0.5">Locks on forehead</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block">2X Scope</span>
              <span className="text-xl font-black text-zinc-200 font-mono">
                {calibrated.sensi.scope2x}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">UMP / AC80 spray</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block">4X Scope</span>
              <span className="text-xl font-black text-zinc-200 font-mono">
                {calibrated.sensi.scope4x}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Long range lock</span>
            </div>
          </div>

          {/* Fire button & DPI */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-gradient-to-r from-red-950/40 to-zinc-950 p-3 rounded-xl border border-red-800/40">
              <span className="text-[11px] text-zinc-400 block">Fire Button Size</span>
              <span className="text-2xl font-black text-white font-mono">
                {calibrated.fireButtonSize}%
              </span>
              <span className="text-[10px] text-amber-400 block mt-0.5">Leaves 80% drag runway</span>
            </div>

            <div className="bg-gradient-to-r from-amber-950/40 to-zinc-950 p-3 rounded-xl border border-amber-800/40">
              <span className="text-[11px] text-zinc-400 block">Safe DPI</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {calibrated.dpiRecommended}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Max pixel touch response</span>
            </div>
          </div>
        </div>

        {/* Right Card: Secret Drag Technique & Crosshair Placement */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red-400" />
              <span className="text-sm font-black text-white">
                {selectedWeapon} Drag Secret
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              {activeWeaponData.dragSpeedMs}ms Drag Speed
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Drag Technique:
              </span>
              <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                {activeWeaponData.dragTechnique}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                Crosshair Placement (Sabse Bada Secret):
              </span>
              <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                {activeWeaponData.crosshairPlacement}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/60 to-zinc-950 border border-red-700/40">
              <span className="text-[11px] font-black text-white uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                <span>10 Shot Me 9 Headshot Ka Pro Rule:</span>
              </span>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                {activeWeaponData.proDragRule}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Android Device Secret System Settings */}
      <div className="mt-5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Android System Hidden Settings (Zero Input Lag For 9/10 Headshots):
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">1. Pointer Speed</span>
            <span className="text-white font-bold block mt-0.5">Full Right (Fastest 100%)</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Eliminates micro-stutter</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">2. Touch & Hold Delay</span>
            <span className="text-white font-bold block mt-0.5">Short (0.5 seconds)</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Instant tap registration</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">3. Fire Button Position</span>
            <span className="text-white font-bold block mt-0.5">Bottom 15% (Right Side)</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Maximizes upward runway</span>
          </div>
        </div>
      </div>
    </div>
  );
};
