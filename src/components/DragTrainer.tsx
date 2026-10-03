import React, { useState, useRef, useEffect } from 'react';
import {
  Target,
  RefreshCw,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  Award,
  Shield,
  Crosshair,
  Zap,
  Sparkles,
  Crown,
} from 'lucide-react';
import { SensiScale, SensiValues } from '../types/sensi';
import { soundFx } from '../utils/audioEffects';

interface DragTrainerProps {
  currentSensi: SensiValues;
  scale: SensiScale;
}

type DragTechnique = 'straight' | 'j_drag' | 'rotation';

interface WeaponInfo {
  id: string;
  name: string;
  type: string;
  headDamage: number;
  bodyDamage: number;
  icon: string;
  color: string;
  soundType: 'm1887' | 'deagle' | 'ump' | 'awm';
}

interface DamagePopup {
  id: number;
  damage: number;
  isHeadshot: boolean;
  x: number;
  y: number;
}

export const DragTrainer: React.FC<DragTrainerProps> = ({ currentSensi, scale }) => {
  const [technique, setTechnique] = useState<DragTechnique>('straight');
  const [selectedWeapon, setSelectedWeapon] = useState<string>('m1887');
  const [shotsFired, setShotsFired] = useState(0);
  const [headshots, setHeadshots] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [announcerText, setAnnouncerText] = useState<string | null>(null);

  // Floating damage popups
  const [popups, setPopups] = useState<DamagePopup[]>([]);

  const [lastFeedback, setLastFeedback] = useState<{
    type: 'headshot' | 'overdrag' | 'bodyshot' | 'idle';
    damage: number;
    speedMs: number;
    angleDeg: number;
    message: string;
  }>({
    type: 'idle',
    damage: 0,
    speedMs: 0,
    angleDeg: 0,
    message: 'Touch the Fire Button and drag upward in a sharp flick motion!',
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragTrajectory, setDragTrajectory] = useState<{ x: number; y: number }[]>([]);
  const startPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchAreaRef = useRef<HTMLDivElement>(null);

  // Target dummy movement simulation
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });

  const weapons: WeaponInfo[] = [
    {
      id: 'm1887',
      name: 'M1887 Shotgun',
      type: '1-Tap King',
      headDamage: 495,
      bodyDamage: 120,
      icon: '💥',
      color: 'from-amber-600 to-red-600',
      soundType: 'm1887',
    },
    {
      id: 'deagle',
      name: 'Desert Eagle',
      type: 'Pistol .50 Cal',
      headDamage: 495,
      bodyDamage: 90,
      icon: '⚡',
      color: 'from-yellow-500 to-amber-600',
      soundType: 'deagle',
    },
    {
      id: 'ump',
      name: 'UMP-45',
      type: 'SMG Laser',
      headDamage: 138,
      bodyDamage: 32,
      icon: '🌪️',
      color: 'from-emerald-500 to-teal-600',
      soundType: 'ump',
    },
    {
      id: 'woodpecker',
      name: 'Woodpecker',
      type: 'Marksman',
      headDamage: 330,
      bodyDamage: 72,
      icon: '🎯',
      color: 'from-orange-500 to-red-600',
      soundType: 'deagle',
    },
    {
      id: 'awm',
      name: 'AWM Sniper',
      type: 'Quick-Scope',
      headDamage: 1100,
      bodyDamage: 150,
      icon: '🔭',
      color: 'from-cyan-500 to-blue-600',
      soundType: 'awm',
    },
    {
      id: 'mp40',
      name: 'MP40 Cobra',
      type: 'Rapid SMG',
      headDamage: 148,
      bodyDamage: 35,
      icon: '🐍',
      color: 'from-rose-500 to-purple-600',
      soundType: 'ump',
    },
  ];

  const activeWeapon = weapons.find((w) => w.id === selectedWeapon) || weapons[0];

  const resetTarget = () => {
    const randomX = (Math.random() - 0.5) * 60;
    setTargetOffset({ x: randomX, y: 0 });
  };

  const playWeaponSound = (isHead: boolean) => {
    if (!soundEnabled) return;
    if (activeWeapon.soundType === 'm1887') {
      soundFx.playM1887();
    } else if (activeWeapon.soundType === 'deagle') {
      soundFx.playDesertEagle();
    } else if (activeWeapon.soundType === 'ump') {
      soundFx.playUmpSpray();
    } else if (activeWeapon.soundType === 'awm') {
      soundFx.playAwmSniper();
    }

    if (isHead) {
      setTimeout(() => soundFx.playHeadshot(), 60);
    }
  };

  const addDamagePopup = (dmg: number, isHead: boolean) => {
    const newPopup: DamagePopup = {
      id: Date.now() + Math.random(),
      damage: dmg,
      isHeadshot: isHead,
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 30,
    };
    setPopups((prev) => [...prev.slice(-4), newPopup]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== newPopup.id));
    }, 1200);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = 'touches' in e ? e.touches[0] : e;
    if (!touchAreaRef.current) return;
    const rect = touchAreaRef.current.getBoundingClientRect();
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    startPosRef.current = { x, y, time: performance.now() };
    setIsDragging(true);
    setDragTrajectory([{ x, y }]);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !startPosRef.current || !touchAreaRef.current) return;
    const point = 'touches' in e ? e.touches[0] : e;
    const rect = touchAreaRef.current.getBoundingClientRect();
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    setDragTrajectory((prev) => [...prev.slice(-25), { x, y }]);
  };

  const handleDragEnd = () => {
    if (!isDragging || !startPosRef.current) return;
    const endTime = performance.now();
    const duration = endTime - startPosRef.current.time;
    const lastPoint = dragTrajectory[dragTrajectory.length - 1] || startPosRef.current;

    const deltaX = lastPoint.x - startPosRef.current.x;
    const deltaY = -(lastPoint.y - startPosRef.current.y); // upward is positive
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / Math.max(1, duration); // px per ms

    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = (angleRad * 180) / Math.PI;

    evaluateShot(deltaY, deltaX, speed, duration, angleDeg);

    setIsDragging(false);
    startPosRef.current = null;
  };

  const evaluateShot = (
    deltaY: number,
    deltaX: number,
    speed: number,
    duration: number,
    angleDeg: number
  ) => {
    setShotsFired((prev) => prev + 1);

    // Calculate effective multiplier from user's current General sensitivity
    const baseVal = scale === '200' ? currentSensi.general / 185 : currentSensi.general / 95;
    const adjustedSpeed = speed * baseVal;

    if (deltaY < 35) {
      // Body shot
      playWeaponSound(false);
      setStreak(0);
      addDamagePopup(activeWeapon.bodyDamage, false);
      setLastFeedback({
        type: 'bodyshot',
        damage: activeWeapon.bodyDamage,
        speedMs: Math.round(duration),
        angleDeg: Math.round(angleDeg),
        message: `Body Shot (${activeWeapon.bodyDamage} Dmg) - Drag was too short or started late. Aim locked onto chest.`,
      });
    } else if (deltaY > 185 || adjustedSpeed > 2.3) {
      // Over drag
      if (soundEnabled) soundFx.playClick();
      setStreak(0);
      setLastFeedback({
        type: 'overdrag',
        damage: 0,
        speedMs: Math.round(duration),
        angleDeg: Math.round(angleDeg),
        message: 'Over-Drag Recoil Miss! - Drag flick was too violent, bullet sailed over enemy skull into sky.',
      });
    } else {
      let isTechniqueValid = true;
      if (technique === 'j_drag' && Math.abs(deltaX) < 10) {
        isTechniqueValid = false;
      }

      if (isTechniqueValid && angleDeg > 35 && angleDeg < 145) {
        // Red Headshot!
        playWeaponSound(true);
        setHeadshots((prev) => prev + 1);
        const newStreak = streak + 1;
        setStreak(newStreak);
        addDamagePopup(activeWeapon.headDamage, true);

        // Voice Announcer check
        if (newStreak === 1) {
          setAnnouncerText('HEADSHOT!');
          soundFx.playVoiceAnnouncer('Headshot!');
        } else if (newStreak === 2) {
          setAnnouncerText('DOUBLE KILL!');
          soundFx.playVoiceAnnouncer('Double Kill!');
        } else if (newStreak === 3) {
          setAnnouncerText('TRIPLE KILL!');
          soundFx.playVoiceAnnouncer('Triple Kill!');
        } else if (newStreak >= 4) {
          setAnnouncerText('GODLIKE HEADSHOTS!');
          soundFx.playVoiceAnnouncer('Godlike!');
        }

        setTimeout(() => setAnnouncerText(null), 2000);

        setLastFeedback({
          type: 'headshot',
          damage: activeWeapon.headDamage,
          speedMs: Math.round(duration),
          angleDeg: Math.round(angleDeg),
          message: `🎯 PERFECT RED HEADSHOT! (${activeWeapon.headDamage} Dmg) - Flawless upward acceleration and release!`,
        });
        resetTarget();
      } else {
        playWeaponSound(false);
        setStreak(0);
        addDamagePopup(activeWeapon.bodyDamage, false);
        setLastFeedback({
          type: 'bodyshot',
          damage: activeWeapon.bodyDamage,
          speedMs: Math.round(duration),
          angleDeg: Math.round(angleDeg),
          message: 'Off-Angle Drag - Thumb drifted sideways, missing headshot hitbox.',
        });
      }
    }
  };

  const headshotRate = shotsFired > 0 ? Math.round((headshots / shotsFired) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/80 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold text-red-500 tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-red-500" />
            <span>Real-Time Free Fire Drag Firing Range</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Free Fire Muscle Memory Practice
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Real weapon recoil physics, authentic gunshot sounds, red damage numbers, and voice announcements.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-zinc-800 border-zinc-700 text-amber-400'
                : 'bg-zinc-950 border-zinc-800 text-zinc-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Audio ON' : 'Mute'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setShotsFired(0);
              setHeadshots(0);
              setStreak(0);
              setPopups([]);
            }}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Stats</span>
          </button>
        </div>
      </div>

      {/* WEAPON SELECTOR BAR */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider flex items-center justify-between">
          <span>🔫 Select Weapon for Firing Range:</span>
          <span className="text-[10px] text-amber-400">Headshot: {activeWeapon.headDamage} DMG</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {weapons.map((w) => {
            const isSelected = selectedWeapon === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedWeapon(w.id);
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{w.icon}</span>
                  <span className="text-[9px] font-mono font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                    {w.headDamage}
                  </span>
                </div>
                <h4 className="text-xs font-black text-white mt-1 truncate">{w.name}</h4>
                <p className="text-[9px] text-zinc-400 truncate">{w.type}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block font-mono">TOTAL SHOTS</span>
            <span className="text-lg font-black text-white font-mono">{shotsFired}</span>
          </div>
          <Crosshair className="w-5 h-5 text-zinc-600" />
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block font-mono">HEADSHOTS</span>
            <span className="text-lg font-black text-red-400 font-mono">{headshots}</span>
          </div>
          <Flame className="w-5 h-5 text-red-500 fill-red-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block font-mono">HEADSHOT RATE</span>
            <span className="text-lg font-black text-amber-400 font-mono">{headshotRate}%</span>
          </div>
          <Trophy className="w-5 h-5 text-amber-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block font-mono">KILL STREAK</span>
            <span className="text-lg font-black text-emerald-400 font-mono">{streak}x</span>
          </div>
          <Crown className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      {/* FIRING RANGE ARENA & TARGET DUMMY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Target Dummy & Damage Area */}
        <div className="lg:col-span-6 bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
          {/* Firing Range Grid Floor */}
          <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Announcer Banner */}
          {announcerText && (
            <div className="absolute top-4 z-20 px-4 py-1.5 rounded-full bg-red-600 text-white font-black text-xs tracking-wider uppercase animate-bounce shadow-xl shadow-red-600/50">
              {announcerText}
            </div>
          )}

          {/* Target Dummy Model */}
          <div
            style={{ transform: `translateX(${targetOffset.x}px)` }}
            className="relative flex flex-col items-center transition-transform duration-200"
          >
            {/* Floating Damage Popups */}
            <div className="absolute -top-12 z-30 pointer-events-none flex flex-col items-center">
              {popups.map((p) => (
                <div
                  key={p.id}
                  style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
                  className={`font-black text-2xl sm:text-3xl font-mono tracking-tight animate-out fade-out slide-out-to-top-8 duration-1000 ${
                    p.isHeadshot
                      ? 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110'
                      : 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                  }`}
                >
                  {p.isHeadshot ? `🔴 ${p.damage}` : `🟡 ${p.damage}`}
                </div>
              ))}
            </div>

            {/* Head Hitbox */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-red-600 to-rose-700 border-2 border-red-400 flex items-center justify-center shadow-lg shadow-red-600/30 relative">
              <span className="text-xl">💀</span>
              <span className="absolute -top-4 text-[9px] font-mono font-black text-red-400 bg-black/80 px-1.5 py-0.5 rounded">
                HEAD (495)
              </span>
            </div>

            {/* Neck & Torso */}
            <div className="w-24 h-28 mt-2 rounded-2xl bg-zinc-800 border-2 border-zinc-700 flex flex-col items-center justify-center relative shadow-inner">
              <div className="w-10 h-10 rounded-full border border-dashed border-zinc-500 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-zinc-400" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 mt-1">BODY (45)</span>
            </div>

            {/* Legs */}
            <div className="flex gap-2 mt-1">
              <div className="w-8 h-16 bg-zinc-800 rounded-b-xl border border-zinc-700" />
              <div className="w-8 h-16 bg-zinc-800 rounded-b-xl border border-zinc-700" />
            </div>
          </div>
        </div>

        {/* Right: Drag Touch Area & Fire Button */}
        <div className="lg:col-span-6 bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-6 flex flex-col justify-between min-h-[360px] relative">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Drag Flick Touch Zone</span>
              </span>
              <span className="text-[10px] text-zinc-400">Technique: {technique.toUpperCase()}</span>
            </div>

            {/* Technique Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
              {(['straight', 'j_drag', 'rotation'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    soundFx.playClick();
                    setTechnique(t);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    technique === t
                      ? 'bg-amber-500 text-zinc-950 shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Drag Canvas */}
          <div
            ref={touchAreaRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className="w-full h-44 rounded-2xl bg-zinc-900/90 border-2 border-dashed border-red-500/40 relative flex items-center justify-center select-none touch-none cursor-crosshair overflow-hidden"
          >
            {/* Trajectory Stroke Visualizer */}
            {dragTrajectory.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={dragTrajectory.map((p) => `${p.x},${p.y}`).join(' ')}
                />
              </svg>
            )}

            {/* Fire Button Disc in Center Bottom */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex flex-col items-center justify-center text-white shadow-xl shadow-red-600/40 border-2 border-amber-300 pointer-events-none active:scale-95 transition-transform animate-pulse">
              <Crosshair className="w-6 h-6 stroke-[2.5]" />
              <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">DRAG UP</span>
            </div>

            <span className="absolute bottom-2 text-[10px] text-zinc-500 font-mono">
              Touch & Flick Upward Sharp
            </span>
          </div>

          {/* Feedback Output Box */}
          <div className="mt-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <span
              className={`font-black block mb-0.5 ${
                lastFeedback.type === 'headshot'
                  ? 'text-red-400'
                  : lastFeedback.type === 'overdrag'
                  ? 'text-amber-400'
                  : 'text-zinc-400'
              }`}
            >
              {lastFeedback.message}
            </span>
            {lastFeedback.speedMs > 0 && (
              <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono mt-1">
                <span>Speed: {lastFeedback.speedMs}ms</span>
                <span>Angle: {lastFeedback.angleDeg}°</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
