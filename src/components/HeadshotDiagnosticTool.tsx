import React, { useState } from 'react';
import { SensiScale, SensiValues, HardwareRecommendations } from '../types/sensi';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  Target,
  Flame,
  Zap,
  Sparkles,
  Award,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface HeadshotDiagnosticToolProps {
  currentSensi: SensiValues;
  setSensi: React.Dispatch<React.SetStateAction<SensiValues>>;
  hardware: HardwareRecommendations;
  scale: SensiScale;
  onOpenTrainer: () => void;
}

export const HeadshotDiagnosticTool: React.FC<HeadshotDiagnosticToolProps> = ({
  currentSensi,
  setSensi,
  hardware,
  scale,
  onOpenTrainer,
}) => {
  const [selectedIssue, setSelectedIssue] = useState<
    'overshoot' | 'chest_lock' | 'shotgun_miss' | 'recoil_spread' | 'heavy_screen'
  >('chest_lock');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const maxVal = scale === '200' ? 200 : 100;
  const is200 = scale === '200';

  const diagnosticIssues = [
    {
      id: 'chest_lock' as const,
      badge: 'Most Common',
      title: 'Aim Stuck on Chest / Body (Undershoot)',
      problemEn: 'Crosshair turns RED on enemy vest and refuses to lift up into the head.',
      cause: 'Auto-aim magnetized to chest. Fire button is too large or General sensitivity is too low.',
      solutionTitle: 'Chest-Break Auto Calibration',
      sensiDelta: { general: is200 ? +18 : +8, redDot: is200 ? +14 : +6 },
      buttonAdvice: 'Reduce Fire Button size to 42% - 45% and place 15% above screen bottom.',
      crosshairSecret: 'Keep crosshair WHITE at shoulder height before initiating upward flick.',
    },
    {
      id: 'overshoot' as const,
      badge: 'High Sensi Error',
      title: 'Bullets Fly Over Enemy Head (Overshoot)',
      problemEn: 'You drag upward and bullets sail harmlessly into the sky above the enemy.',
      cause: 'General sensitivity or screen DPI is too high for your finger drag acceleration.',
      solutionTitle: 'Recoil Stabilizer Calibration',
      sensiDelta: { general: is200 ? -16 : -7, redDot: is200 ? -12 : -5 },
      buttonAdvice: 'Increase Fire Button size to 48% - 52% to create controlled thumb friction.',
      crosshairSecret: 'Release thumb pressure immediately once crosshair enters the skull zone.',
    },
    {
      id: 'shotgun_miss' as const,
      badge: 'Point-Blank Duels',
      title: 'Close-Range Shotgun (M1887/M1014) Misses',
      problemEn: 'In 1v1 close combat, your shotgun blast completely misses moving enemies.',
      cause: 'Attempting a straight vertical drag instead of following the enemy movement vector.',
      solutionTitle: 'J-Drag & Rotation Flick Calibration',
      sensiDelta: { general: is200 ? +20 : +9, redDot: is200 ? +22 : +10 },
      buttonAdvice: 'Fire button 42%. Use quick weapon switch to reset post-shot spread.',
      crosshairSecret: 'Perform a curved "J" stroke: dip button down 2mm, then whip upward.',
    },
    {
      id: 'recoil_spread' as const,
      badge: 'SMG & AR Laser',
      title: 'Spray Bloom Spreads Wide After 4 Bullets',
      problemEn: 'First 2 bullets hit body, then weapon vibrates violently and spray opens up.',
      cause: 'Continuous spray penalty. In Free Fire, recoil expands exponentially after 0.35s.',
      solutionTitle: 'Burst Drag & 2X Laser Calibration',
      sensiDelta: { scope2x: is200 ? +12 : +5, scope4x: is200 ? +8 : +4 },
      buttonAdvice: 'Tap fire button in 4-round bursts, then touch Gloo Wall or Crouch to reset.',
      crosshairSecret: 'Start drag at chest level so the natural 2nd and 3rd bullet rise into head.',
    },
    {
      id: 'heavy_screen' as const,
      badge: 'Hardware Lag',
      title: 'Screen Feels Heavy, Sluggish, or Sticky',
      problemEn: 'Thumb feels slow moving across glass, drag registration misses frames.',
      cause: 'Low RAM (2GB-4GB), 60Hz display polling lag, or finger friction on touchscreen.',
      solutionTitle: 'Hardware Touch Optimization',
      sensiDelta: { general: is200 ? +25 : +10, redDot: is200 ? +20 : +8 },
      buttonAdvice: 'Set Android Pointer Speed to Maximum Right and safe DPI to base + 45.',
      crosshairSecret: 'Apply a pinch of talcum powder or wear breathable finger sleeves on thumbs.',
    },
  ];

  const currentDiagnostic = diagnosticIssues.find((d) => d.id === selectedIssue)!;

  const handleApplyFix = () => {
    soundFx.playHeadshot();
    setSensi((prev) => {
      const next = { ...prev };
      if (currentDiagnostic.sensiDelta.general) {
        next.general = Math.min(
          maxVal,
          Math.max(30, next.general + currentDiagnostic.sensiDelta.general)
        );
      }
      if (currentDiagnostic.sensiDelta.redDot) {
        next.redDot = Math.min(
          maxVal,
          Math.max(30, next.redDot + currentDiagnostic.sensiDelta.redDot)
        );
      }
      if (currentDiagnostic.sensiDelta.scope2x) {
        next.scope2x = Math.min(
          maxVal,
          Math.max(30, next.scope2x + currentDiagnostic.sensiDelta.scope2x)
        );
      }
      if (currentDiagnostic.sensiDelta.scope4x) {
        next.scope4x = Math.min(
          maxVal,
          Math.max(30, next.scope4x + currentDiagnostic.sensiDelta.scope4x)
        );
      }
      return next;
    });

    setAppliedNotification(
      `Applied ${currentDiagnostic.solutionTitle}! Sensi fine-tuned to fix ${currentDiagnostic.title}.`
    );
    setTimeout(() => setAppliedNotification(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>Real-Game Headshot Problem Solver & Calibrator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Why Aren't Headshots Connecting? Auto-Fix Your Sensi
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          In Free Fire, missing headshots always boils down to one of two mechanical errors:
          <strong> Aim Magnetized to Chest (Undershoot)</strong> or{' '}
          <strong>Bullets Flying Over Head (Overshoot)</strong>. Select your exact in-game symptom
          below to automatically correct your sensitivity and fire button ratio!
        </p>
      </div>

      {/* Issue Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {diagnosticIssues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => {
              soundFx.playClick();
              setSelectedIssue(issue.id);
            }}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedIssue === issue.id
                ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold uppercase font-mono text-amber-500 tracking-wider">
                  {issue.badge}
                </span>
                {selectedIssue === issue.id && (
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                )}
              </div>
              <h3 className="text-xs font-bold text-white mb-1">{issue.title}</h3>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {issue.problemEn}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Diagnostic & Solution Box */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Active Diagnosis
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {currentDiagnostic.title}
            </h3>
            <p className="text-xs text-red-400 mt-0.5">
              Root Cause: {currentDiagnostic.cause}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyFix}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Apply Auto-Tune Fix</span>
            </button>

            <button
              onClick={onOpenTrainer}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-all whitespace-nowrap"
            >
              <span>Test Drag</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {appliedNotification && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{appliedNotification}</span>
          </div>
        )}

        {/* 3 Golden Fix Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Zap className="w-4 h-4" />
              <span>1. Sensitivity Auto-Tune</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Applying this fix will automatically adjust General Sensi by{' '}
              <strong className="text-amber-400 font-mono">
                {currentDiagnostic.sensiDelta.general
                  ? `${currentDiagnostic.sensiDelta.general > 0 ? '+' : ''}${
                      currentDiagnostic.sensiDelta.general
                    }`
                  : '0'}
              </strong>{' '}
              to optimize your finger flick registration.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <Target className="w-4 h-4" />
              <span>2. Fire Button Adjustment</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {currentDiagnostic.buttonAdvice}
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>3. Crosshair Technique</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {currentDiagnostic.crosshairSecret}
            </p>
          </div>
        </div>

        {/* In-Game Physics Reference: Thumb Runway & Flick Window */}
        <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
          <div>
            <span className="text-[10px] uppercase text-zinc-500 font-bold block">
              Physical Thumb Runway
            </span>
            <span className="text-base font-black font-mono text-zinc-200">
              {selectedIssue === 'shotgun_miss' ? '2.8 cm - 3.4 cm' : '1.4 cm - 2.2 cm'}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">
              Swipe distance on screen
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-zinc-500 font-bold block">
              Flick Acceleration Window
            </span>
            <span className="text-base font-black font-mono text-amber-400">
              180ms - 280ms
            </span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">
              Duration of upward stroke
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-zinc-500 font-bold block">
              Gloo Wall Cancel Timing
            </span>
            <span className="text-base font-black font-mono text-emerald-400">
              0.15s Post-Shot
            </span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">
              Sit-up gloo wall reset
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
