import React, { useState, useEffect } from 'react';
import { Target, Zap, RotateCcw, Crosshair, Sparkles, Volume2 } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

type ReticleStyle = 'classic' | 'dot' | 'circle' | 'pro_cyan' | 'red_hot';
type Stance = 'standing' | 'crouching' | 'sprinting';

export const CrosshairBloomSimulator: React.FC = () => {
  const [reticle, setReticle] = useState<ReticleStyle>('pro_cyan');
  const [stance, setStance] = useState<Stance>('standing');
  const [bloom, setBloom] = useState(20);
  const [isFiring, setIsFiring] = useState(false);
  const [shotsFired, setShotsFired] = useState(0);
  const [headshotCount, setHeadshotCount] = useState(0);

  // Stance multipliers
  const stanceMultiplier = stance === 'crouching' ? 0.6 : stance === 'sprinting' ? 1.8 : 1.0;
  const baseBloom = 18 * stanceMultiplier;

  // Natural bloom recovery
  useEffect(() => {
    if (!isFiring) {
      const interval = setInterval(() => {
        setBloom((b) => Math.max(baseBloom, b - 4));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isFiring, baseBloom]);

  // Firing action
  const handleFireShot = () => {
    soundFx.playHeadshot();
    setIsFiring(true);
    setShotsFired((prev) => prev + 1);

    // If bloom is tight, higher chance of headshot!
    const isHeadshot = bloom < 32 || Math.random() < 0.4;
    if (isHeadshot) {
      setHeadshotCount((prev) => prev + 1);
    }

    setBloom((prev) => Math.min(75, prev + 9 * stanceMultiplier));

    setTimeout(() => {
      setIsFiring(false);
    }, 120);
  };

  const reticleColors: Record<ReticleStyle, string> = {
    classic: '#ffffff',
    dot: '#ef4444',
    circle: '#f59e0b',
    pro_cyan: '#06b6d4',
    red_hot: '#ef4444',
  };

  const activeColor = reticleColors[reticle];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            Interactive Crosshair & Bloom Engine
          </span>
          <span className="text-xs text-amber-400 font-mono font-bold">
            Real-Game Physics Simulator
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Crosshair Reticle Customizer & Recoil Bloom Simulator
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          In Free Fire, continuous spraying expands your crosshair bloom, causing bullets to fly
          wildly around the enemy. Test how crouching, stopping, and reticle styles affect headshot
          magnetism in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reticle Controls & Stance (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
          {/* Stance Selector */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              1. Combat Stance & Movement
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'crouching', label: 'Crouched (-40% Recoil)', badge: 'Laser' },
                { id: 'standing', label: 'Standing Still', badge: 'Normal' },
                { id: 'sprinting', label: 'Sprinting (+80% Bloom)', badge: 'Wide' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    soundFx.playClick();
                    setStance(s.id as Stance);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    stance === s.id
                      ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="block text-xs font-bold">{s.label.split(' ')[0]}</span>
                  <span className="text-[9px] block text-zinc-400 mt-0.5">{s.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reticle Style Selector */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              2. Custom Crosshair Overlay
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pro_cyan', name: 'Cyber Cyan (Esports)', color: '#06b6d4' },
                { id: 'red_hot', name: 'Red Hot Dot (One-Tap)', color: '#ef4444' },
                { id: 'circle', name: 'Tactical Amber Circle', color: '#f59e0b' },
                { id: 'classic', name: 'Classic Crosshair', color: '#ffffff' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    soundFx.playClick();
                    setReticle(r.id as ReticleStyle);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                    reticle === r.id
                      ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: r.color }}
                  ></span>
                  <span className="text-xs font-bold truncate">{r.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Readout */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 grid grid-cols-2 gap-2 text-center text-xs">
            <div>
              <span className="text-zinc-500 text-[10px] block">Current Bloom Diameter</span>
              <span className="text-lg font-black font-mono text-amber-400">
                {Math.round(bloom)}px
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Headshot Hit Ratio</span>
              <span className="text-lg font-black font-mono text-red-500">
                {shotsFired > 0 ? Math.round((headshotCount / shotsFired) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Tap to Fire Trigger */}
          <button
            onClick={handleFireShot}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-sm active:scale-95 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>TAP FIRE (TEST SPRAY BLOOM)</span>
          </button>
        </div>

        {/* Right: Live Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border-2 border-zinc-800 p-6 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden select-none shadow-2xl">
          {/* Target Silhouette */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-40">
            <div className="w-16 h-16 rounded-full border border-red-500/60 bg-red-500/10 flex items-center justify-center">
              <span className="text-[9px] font-mono text-red-400 font-bold">HEADBOX</span>
            </div>
            <div className="w-24 h-32 rounded-2xl border border-zinc-700 bg-zinc-800/40 mt-1"></div>
          </div>

          {/* Interactive Dynamic Reticle & Bloom Lines */}
          <div
            className="relative flex items-center justify-center transition-all duration-75"
            style={{ width: `${bloom * 2}px`, height: `${bloom * 2}px` }}
          >
            {/* Center dot */}
            <div
              className="w-2 h-2 rounded-full absolute shadow-md z-10"
              style={{ backgroundColor: activeColor }}
            ></div>

            {/* Bloom Circle */}
            <div
              className="absolute inset-0 rounded-full border transition-all duration-75"
              style={{
                borderColor: isFiring ? '#ef4444' : activeColor,
                borderWidth: isFiring ? '2.5px' : '1.5px',
                opacity: isFiring ? 1 : 0.6,
              }}
            ></div>

            {/* Crosshair ticks */}
            <div
              className="absolute top-0 w-0.5 h-3 -translate-y-1"
              style={{ backgroundColor: activeColor }}
            ></div>
            <div
              className="absolute bottom-0 w-0.5 h-3 translate-y-1"
              style={{ backgroundColor: activeColor }}
            ></div>
            <div
              className="absolute left-0 h-0.5 w-3 -translate-x-1"
              style={{ backgroundColor: activeColor }}
            ></div>
            <div
              className="absolute right-0 h-0.5 w-3 translate-x-1"
              style={{ backgroundColor: activeColor }}
            ></div>
          </div>

          {/* Dynamic Stance Tip at Bottom */}
          <div className="absolute bottom-4 text-center px-4">
            <span className="text-xs text-zinc-400 bg-zinc-900/90 px-3 py-1.5 rounded-full border border-zinc-800">
              {stance === 'crouching'
                ? '⚡ Crouched: Bloom recovers 2.5x faster. Best for 4-shot MP40 bursts.'
                : stance === 'sprinting'
                ? '⚠️ Sprinting: Recoil bloom spreads wide. Stop moving 0.1s before flicking.'
                : '🎯 Standing: Stable base accuracy for one-tap shotgun and marksman flicks.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
