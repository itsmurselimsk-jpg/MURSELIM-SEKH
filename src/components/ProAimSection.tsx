import React, { useState, useEffect } from 'react';
import {
  FingerGrip,
  Playstyle,
  RamTier,
  RefreshRate,
  SensiScale,
  SensiValues,
  TouchSamplingRate,
  WeaponSensiInfo,
} from '../types/sensi';
import { ALL_FREE_FIRE_WEAPONS } from '../data/allGunsDatabase';
import {
  Crosshair,
  Target,
  ArrowUp,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  Zap,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface ProAimSectionProps {
  currentSensi: SensiValues;
  scale: SensiScale;
  brand: string;
  model: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  touchSampling: TouchSamplingRate;
  playstyle: Playstyle;
  fireButtonSize: number;
  onOpenTrainer: () => void;
}

type TechniqueType = 'straight' | 'j_drag' | 'rotation' | 'white_snap';

export const ProAimSection: React.FC<ProAimSectionProps> = ({
  currentSensi,
  scale,
  brand,
  model,
  ram,
  refreshRate,
  touchSampling,
  playstyle,
  fireButtonSize,
  onOpenTrainer,
}) => {
  // Select active technique
  const [activeTechnique, setActiveTechnique] = useState<TechniqueType>(
    playstyle === 'onetap' ? 'j_drag' : playstyle === 'sniper' ? 'straight' : 'straight'
  );

  // Selected weapon for dynamic advice
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>(
    playstyle === 'onetap' ? 'm1887' : playstyle === 'smg_rusher' ? 'mp40' : playstyle === 'sniper' ? 'awm' : 'woodpecker'
  );

  // Animation cycle for the visual diagram
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimProgress((prev) => (prev >= 100 ? 0 : prev + 4));
    }, 70);
    return () => clearInterval(timer);
  }, []);

  const selectedGun =
    ALL_FREE_FIRE_WEAPONS.find((w) => w.id === selectedWeaponId) || ALL_FREE_FIRE_WEAPONS[0];

  // Dynamic calculations tailored to device hardware
  const isHighRefresh = refreshRate === '120Hz' || refreshRate === '144Hz' || refreshRate === '165Hz+';
  const isHighTouchSampling = touchSampling === '360Hz' || touchSampling === '480Hz+';
  const isLowEndDevice = ram === '2GB' || ram === '3GB' || ram === '4GB';

  // Physical runway recommendation in centimeters
  const recommendedRunwayCm = isLowEndDevice ? '2.8 cm - 3.4 cm' : isHighTouchSampling ? '1.4 cm - 2.0 cm' : '2.0 cm - 2.6 cm';

  // Flick acceleration duration
  const optimalFlickMs = isHighRefresh ? '190ms - 240ms' : '250ms - 320ms';

  // Required thumb pressure
  const pressureProfile = isHighTouchSampling
    ? 'Feather-Light (360Hz touch sampling registers micro-swipes instantly)'
    : isLowEndDevice
    ? 'Firm & Continuous (Overcomes 60Hz touch polling delay)'
    : 'Moderate Smooth Acceleration';

  // Sensi multiplier for scale
  const boostMult = scale === '200' ? 2 : 1;
  const maxVal = scale === '200' ? 200 : 100;
  const gunCalibratedGeneral = Math.min(
    maxVal,
    Math.max(25, currentSensi.general + selectedGun.recommendedGeneralBoost * boostMult)
  );

  const techniques = [
    {
      id: 'straight' as const,
      name: 'Straight Vertical Drag',
      badge: 'Mid & Long Range',
      suitableFor: 'ARs (SCAR, M4A1, AK47) & SMGs',
      summary: 'Direct upward flick along the vertical axis without lateral deviation.',
      steps: [
        'Place white crosshair near the opponent collarbone level.',
        'Tap fire button and flick vertically straight upward in one continuous motion.',
        'Release thumb pressure the instant the crosshair intersects the head.',
      ],
    },
    {
      id: 'j_drag' as const,
      name: 'J-Shape Curved Drag',
      badge: 'Shotgun & Rushing',
      suitableFor: 'M1887, Desert Eagle, UMP (Sideways targets)',
      summary: 'Dip the button down slightly, then whip upward in an arc matching enemy movement.',
      steps: [
        'Notice enemy sprinting direction (Left or Right).',
        'Pull fire button down 2mm to break body auto-aim lock.',
        'Whip the button upward in a curved "J" stroke toward the enemy head.',
      ],
    },
    {
      id: 'rotation' as const,
      name: 'Circular Rotation Drag',
      badge: 'Point-Blank <5m',
      suitableFor: 'M1014, SPAS-12, MAG-7 Jump-shots',
      summary: 'Circular sweeping flick timed at the apex of your jump in close-quarters duels.',
      steps: [
        'Keep crosshair off the enemy body (completely white).',
        'Jump forward or side-step.',
        'At the peak of the jump, rotate fire button clockwise or counter-clockwise straight into the head.',
      ],
    },
    {
      id: 'white_snap' as const,
      name: 'White Crosshair Shoulder Snap',
      badge: 'One-Tap Precision',
      suitableFor: 'Woodpecker, SVD, AC80, Desert Eagle',
      summary: 'Never let crosshair turn red before firing. Snap from white into the head.',
      steps: [
        'Position crosshair in the empty air near the enemy ear/shoulder.',
        'Do NOT let the crosshair turn red while stationary (avoids chest magnetism).',
        'Flick sharply toward the skull—auto-aim magnetizes directly to the head on bullet exit.',
      ],
    },
  ];

  const currentTech = techniques.find((t) => t.id === activeTechnique)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Weapon-Specific Pro-Aim Engine</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Dynamic Drag Mechanics & Visual Aim Guides
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Calibrated specifically for your <strong className="text-zinc-200">{model}</strong> (
          {ram} RAM, {refreshRate}) and active <strong className="text-amber-400">{playstyle.toUpperCase()}</strong>{' '}
          playstyle. Master the exact physical thumb stroke, angle, and timing for every weapon in
          Free Fire.
        </p>
      </div>

      {/* Technique Selector Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {techniques.map((tech) => (
          <button
            key={tech.id}
            onClick={() => {
              soundFx.playClick();
              setActiveTechnique(tech.id);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              activeTechnique === tech.id
                ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block mb-1">
                {tech.badge}
              </span>
              <h3 className="text-xs font-bold text-white mb-1">{tech.name}</h3>
              <p className="text-[11px] text-zinc-400 line-clamp-1">{tech.suitableFor}</p>
            </div>
            {activeTechnique === tech.id && (
              <div className="w-full h-1 bg-amber-500 rounded-full mt-2"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Pro-Aim Interactive Stage: Visual Diagram + Weapon Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Animated Drag Technique Visualizer (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block">
                Visual Drag Blueprint
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{currentTech.name}</h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
              Runway: {recommendedRunwayCm}
            </span>
          </div>

          {/* Animated SVG HUD Diagram Canvas */}
          <div className="w-full aspect-[16/10] bg-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-4 select-none">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Simulated Enemy Target Hitbox */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  animProgress >= 65
                    ? 'border-red-500 bg-red-600/30 shadow-lg shadow-red-600/50 scale-110'
                    : 'border-zinc-600 bg-zinc-800/40'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    animProgress >= 65 ? 'bg-red-500 animate-ping' : 'bg-zinc-500'
                  }`}
                ></div>
                {animProgress >= 65 && (
                  <span className="text-[8px] font-black text-red-300 absolute">HEAD</span>
                )}
              </div>
              <div className="w-16 h-18 rounded-xl border border-zinc-800 bg-zinc-900/40 mt-1"></div>
            </div>

            {/* Dynamic Animated Trajectory Path depending on Active Technique */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="dragGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Straight Drag SVG */}
              {activeTechnique === 'straight' && (
                <>
                  <line
                    x1="50%"
                    y1="82%"
                    x2="50%"
                    y2="28%"
                    stroke="#3f3f46"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <line
                    x1="50%"
                    y1="82%"
                    x2="50%"
                    y2={`${82 - (animProgress / 100) * 54}%`}
                    stroke="url(#dragGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  {/* Moving Thumb Indicator */}
                  <circle
                    cx="50%"
                    cy={`${82 - (animProgress / 100) * 54}%`}
                    r="9"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </>
              )}

              {/* J-Shape Drag SVG */}
              {activeTechnique === 'j_drag' && (
                <>
                  {/* Guide Path */}
                  <path
                    d="M 50 200 C 50 230, 40 240, 30 220 C 25 180, 45 100, 50 70"
                    fill="none"
                    stroke="#3f3f46"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Animated Path */}
                  <path
                    d={`M ${50 - Math.sin((animProgress / 100) * Math.PI) * 12} ${
                      84 - (animProgress / 100) * 56
                    } Q ${42} ${82} 50 26`}
                    fill="none"
                    stroke="url(#dragGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  <circle
                    cx={`${50 + Math.sin((animProgress / 100) * Math.PI * 1.5) * 8}%`}
                    cy={`${84 - (animProgress / 100) * 56}%`}
                    r="9"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </>
              )}

              {/* Rotation Drag SVG */}
              {activeTechnique === 'rotation' && (
                <>
                  <path
                    d="M 120 210 A 60 60 0 0 1 200 80"
                    fill="none"
                    stroke="#3f3f46"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={`${45 + Math.cos(((animProgress * 1.8) / 180) * Math.PI) * 16}%`}
                    cy={`${82 - (animProgress / 100) * 56}%`}
                    r="9"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </>
              )}

              {/* White Crosshair Snap SVG */}
              {activeTechnique === 'white_snap' && (
                <>
                  <line
                    x1="40%"
                    y1="32%"
                    x2="50%"
                    y2="24%"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                  />
                  <circle
                    cx={`${40 + (animProgress / 100) * 10}%`}
                    cy={`${32 - (animProgress / 100) * 8}%`}
                    r="8"
                    fill={animProgress >= 80 ? '#ef4444' : '#ffffff'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>

            {/* Fire Button Position at Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div
                className="rounded-full border-2 border-red-500 bg-red-600/30 flex items-center justify-center shadow-lg shadow-red-600/20"
                style={{ width: `${fireButtonSize * 0.9}px`, height: `${fireButtonSize * 0.9}px` }}
              >
                <Target className="w-5 h-5 text-white/80" />
              </div>
              <span className="text-[8px] font-mono text-zinc-400 mt-0.5">
                Fire Button ({fireButtonSize}%)
              </span>
            </div>

            {/* Hit Confirmation Banner in Diagram */}
            {animProgress >= 70 && (
              <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg animate-bounce font-mono shadow-lg">
                HEADSHOT 495
              </div>
            )}
          </div>

          {/* Step-by-Step Execution Rules */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Step-by-Step Drag Execution:
            </span>
            <div className="space-y-1.5">
              {currentTech.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                >
                  <span className="w-5 h-5 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Weapon-Specific Aim Calibrator (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Select Weapon to Calibrate:
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {selectedGun.category}
              </span>
            </div>

            {/* Quick Weapon Selector Carousel */}
            <div className="flex flex-wrap gap-1.5 mb-4 max-h-36 overflow-y-auto p-1 bg-zinc-950 rounded-xl border border-zinc-800/80 scrollbar-thin">
              {ALL_FREE_FIRE_WEAPONS.slice(0, 15).map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedWeaponId(w.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all truncate ${
                    selectedWeaponId === w.id
                      ? 'bg-amber-500 text-zinc-950 shadow-sm'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {w.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected Weapon Diagnostic Card */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-white">{selectedGun.name}</h4>
                  <span className="text-xs text-amber-400 font-semibold block">
                    Recommended Technique: {selectedGun.dragTechnique}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {selectedGun.recoilDifficulty} Recoil
                </span>
              </div>

              {/* Calibrated Gun Offset */}
              <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-zinc-900">
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block">Tuned General Sensi</span>
                  <span className="text-lg font-black font-mono text-amber-400">
                    {gunCalibratedGeneral}
                  </span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block">Drag Velocity</span>
                  <span className="text-xs font-bold text-emerald-400 block mt-1">
                    {selectedGun.dragSpeed}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                {selectedGun.proTips}
              </p>
            </div>
          </div>

          {/* Hardware Physics Metrics Table */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block">
              Device Physics Tailoring ({model}):
            </span>

            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-400">Physical Swipe Runway:</span>
              <span className="font-mono font-bold text-amber-400">{recommendedRunwayCm}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-400">Flick Acceleration Timing:</span>
              <span className="font-mono font-bold text-emerald-400">{optimalFlickMs}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-400">Thumb Pressure:</span>
              <span className="font-medium text-zinc-300 text-right truncate max-w-[180px]">
                {pressureProfile}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-400">Fire Button HUD Height:</span>
              <span className="font-mono font-bold text-purple-400">
                12% - 15% from bottom bezel
              </span>
            </div>
          </div>

          {/* Test in Live Trainer CTA */}
          <button
            onClick={onOpenTrainer}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-xs hover:from-red-500 hover:to-amber-500 active:scale-95 transition-all shadow-lg shadow-red-600/20"
          >
            <span>Practice This Aim Technique in Live Trainer</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
