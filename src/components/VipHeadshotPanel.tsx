import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  Target,
  ShieldCheck,
  Smartphone,
  Play,
  Crosshair,
  Crown,
  Activity,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  CheckCircle2,
  Sliders,
  Radio,
  Eye,
  Settings2,
} from 'lucide-react';
import {
  Playstyle,
  RamTier,
  RefreshRate,
  SensiScale,
  SensiValues,
  TouchSamplingRate,
} from '../types/sensi';
import { soundFx } from '../utils/audioEffects';
import { launchFreeFire } from '../utils/freeFireLauncher';
import { pipOverlayEngine } from '../utils/pipOverlayEngine';
import { ThreeHologramTarget } from './ThreeHologramTarget';
import { ThreeDPhoneViewer } from './ThreeDPhoneViewer';

interface VipHeadshotPanelProps {
  sensi: SensiValues;
  setSensi: React.Dispatch<React.SetStateAction<SensiValues>>;
  brand: string;
  model: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  touchSampling: TouchSamplingRate;
  safeDpi: number;
  fireButtonSize: number;
  scale: SensiScale;
  onOpenFloatingWidget: () => void;
  onApplyPreset: (newSensi: SensiValues) => void;
}

export const VipHeadshotPanel: React.FC<VipHeadshotPanelProps> = ({
  sensi,
  setSensi,
  brand,
  model,
  ram,
  refreshRate,
  touchSampling,
  safeDpi,
  fireButtonSize,
  scale,
  onOpenFloatingWidget,
  onApplyPreset,
}) => {
  // VIP Feature Toggles
  const [autoHeadshotLock, setAutoHeadshotLock] = useState(true);
  const [dragMacroCurve, setDragMacroCurve] = useState(true);
  const [zeroRecoilBloom, setZeroRecoilBloom] = useState(true);
  const [touchBoost480, setTouchBoost480] = useState(true);
  const [glooWallFast, setGlooWallFast] = useState(true);
  const [fpsBooster120, setFpsBooster120] = useState(true);
  const [pingStabilizer, setPingStabilizer] = useState(true);

  // VIP Injection Console State
  const [isInjecting, setIsInjecting] = useState(false);
  const [injectionProgress, setInjectionProgress] = useState(0);
  const [injectionLogs, setInjectionLogs] = useState<string[]>([]);
  const [injectedSuccess, setInjectedSuccess] = useState(false);

  // Custom Reticle State
  const [reticleType, setReticleType] = useState<'dot' | 'circle' | 'cross' | 'hybrid'>('dot');
  const [reticleColor, setReticleColor] = useState<string>('#ef4444');
  const [reticleSize, setReticleSize] = useState<number>(14);

  // Handle Injection Animation
  const handleInjectVipProfile = () => {
    if (isInjecting) return;
    setIsInjecting(true);
    setInjectionProgress(0);
    setInjectionLogs([]);
    setInjectedSuccess(false);

    soundFx.playGlitch();
    soundFx.playHologramLaser();

    const steps = [
      `[INIT] Connecting to ${brand} ${model} touch matrix...`,
      `[HARDWARE] Detected ${refreshRate} display · ${touchSampling} polling rate...`,
      `[CALIBRATE] Optimizing General Sensi (${sensi.general}) for zero chest-stick...`,
      `[LOCK] Red Dot Lock applied at ${sensi.redDot} (Esports 4-Point Delta)...`,
      `[DPI] Developer Safe Width verified: ${safeDpi} DPI...`,
      `[RUNWAY] Fire Button Size: ${fireButtonSize}% allocated for upward runway...`,
      `[MACRO] Anti-Recoil Bloom Stabilizer & J-Drag curve engaged...`,
      `[✓] SUCCESS: SensiPro VIP Panel Profile Active!`,
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        soundFx.playCyberLock();
        setInjectionLogs((prev) => [...prev, steps[currentStep]]);
        setInjectionProgress(Math.round(((currentStep + 1) / steps.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsInjecting(false);
        setInjectedSuccess(true);
        soundFx.playBassDrop();
        soundFx.playSuccess();
      }
    }, 240);
  };

  const handleLaunchGame = () => {
    soundFx.playHeadshot();
    launchFreeFire('max');
  };

  return (
    <div className="space-y-6">
      {/* Top Cyberpunk VIP Banner */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-zinc-900 border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black tracking-wider uppercase animate-pulse">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>VIP PANEL INJECTOR v4.9</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono">
                100% ANTI-BAN SAFE
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
                NO ROOT NEEDED
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Free Fire VIP Sensi Panel</span>
              <span className="text-xs sm:text-sm px-2.5 py-1 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold">
                PRO EDITION
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Real hardware-level touch delay calibration, safe DPI generator, and screen overlay simulation customized for{' '}
              <span className="text-white font-bold">{brand} {model}</span> ({ram} RAM, {refreshRate}).
            </p>
          </div>

          {/* Quick Floating Overlay Toggle Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                soundFx.playHologramLaser();
                pipOverlayEngine.startPictureInPicture(sensi, model, fireButtonSize).catch(() => {});
                onOpenFloatingWidget();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-zinc-950 border border-emerald-400 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
              <span>🪟 Float Outside (Over Game)</span>
            </button>

            <button
              onClick={onOpenFloatingWidget}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-zinc-900 border border-red-500/40 text-white hover:bg-zinc-800 active:scale-95 transition-all"
            >
              <span>📱 Inside Widget</span>
            </button>

            <button
              onClick={handleLaunchGame}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Free Fire</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIP Hardware Matrix Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block font-mono uppercase">Aim Lock Status</span>
            <span className="text-sm font-black text-white">99% Red Number</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block font-mono uppercase">Smallest Width (DPI)</span>
            <span className="text-sm font-black text-amber-400 font-mono">{safeDpi} DPI</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block font-mono uppercase">FPS Optimization</span>
            <span className="text-sm font-black text-emerald-400">{refreshRate} / 120 FPS</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block font-mono uppercase">Touch Latency</span>
            <span className="text-sm font-black text-purple-300">1.2ms Ultra-Fast</span>
          </div>
        </div>
      </div>

      {/* 3D WebGL Holographic Aim Matrix */}
      <ThreeHologramTarget brand={brand} model={model} />

      {/* Main Panel Controls: VIP Switchboard & Interactive Injector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: VIP Switchboard (Like authentic Sensi Panels) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-black text-white">
                  VIP Calibration Switchboard
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Click any switch to toggle
              </span>
            </div>

            {/* Switch Grid */}
            <div className="space-y-3">
              {/* Switch 1 */}
              <div
                onClick={() => {
                  soundFx.playClick();
                  setAutoHeadshotLock(!autoHeadshotLock);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  autoHeadshotLock
                    ? 'bg-red-950/40 border-red-500/60 shadow-lg shadow-red-500/10'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-2">
                      <span>Auto Headshot Lock (99% Red Numbers)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">
                        VIP
                      </span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Locks drag curve acceleration directly on enemy forehead to eliminate body-shots
                    </p>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    autoHeadshotLock ? 'bg-red-600' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      autoHeadshotLock ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Switch 2 */}
              <div
                onClick={() => {
                  soundFx.playClick();
                  setDragMacroCurve(!dragMacroCurve);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  dragMacroCurve
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-2">
                      <span>One-Tap J-Drag Macro Calibration</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                        M1887 & D-Eagle
                      </span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Tunes fire button runway speed so flick drag doesn't overshoot into the sky
                    </p>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    dragMacroCurve ? 'bg-amber-500' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      dragMacroCurve ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Switch 3 */}
              <div
                onClick={() => {
                  soundFx.playClick();
                  setZeroRecoilBloom(!zeroRecoilBloom);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  zeroRecoilBloom
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Crosshair className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-2">
                      <span>Zero Recoil Crosshair Bloom Stabilizer</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                        MP40 / UMP / AK
                      </span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Compresses bullet spread during continuous spray so 4-bullet bursts stay pinpoint
                    </p>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    zeroRecoilBloom ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      zeroRecoilBloom ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Switch 4 */}
              <div
                onClick={() => {
                  soundFx.playClick();
                  setTouchBoost480(!touchBoost480);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  touchBoost480
                    ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-2">
                      <span>Ultra Touch Polling (360Hz / 480Hz Turbo)</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Removes digitizer sampling lag for instantaneous flick response
                    </p>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    touchBoost480 ? 'bg-blue-500' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      touchBoost480 ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Switch 5 */}
              <div
                onClick={() => {
                  soundFx.playClick();
                  setGlooWallFast(!glooWallFast);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  glooWallFast
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-2">
                      <span>Instant 360° Sit-Up Gloo Wall Protocol</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Synchronizes crouch + gloo wall button macro position for instant shield drop
                    </p>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    glooWallFast ? 'bg-purple-500' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      glooWallFast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: VIP Sensi Injector Console */}
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-red-400" />
                <h3 className="text-base font-black text-white">VIP Injector Console</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {/* Big Inject Button */}
            <button
              onClick={handleInjectVipProfile}
              disabled={isInjecting}
              className="w-full py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/60 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isInjecting ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  <span>INJECTING VIP SENSI ({injectionProgress}%)...</span>
                </>
              ) : injectedSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>VIP PROFILE INJECTED!</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>⚡ INJECT VIP SENSI PROFILE</span>
                </>
              )}
            </button>

            {/* Terminal Window */}
            <div className="bg-black/90 rounded-2xl p-4 border border-zinc-800/80 font-mono text-[11px] min-h-[220px] max-h-[260px] overflow-y-auto space-y-1.5 scrollbar-thin">
              <div className="text-zinc-500 flex items-center justify-between pb-2 border-b border-zinc-800/50">
                <span>ROOT@VIP-PANEL-AZ:~#</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>

              {injectionLogs.length === 0 ? (
                <div className="text-zinc-600 pt-6 text-center italic">
                  Press "INJECT VIP SENSI PROFILE" to calibrate hardware registers and touch sensitivity matrix for {model}.
                </div>
              ) : (
                injectionLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('SUCCESS')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('INIT')
                        ? 'text-amber-400'
                        : 'text-zinc-300'
                    } animate-in fade-in duration-150`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Launch Free Fire direct shortcut */}
            <button
              onClick={handleLaunchGame}
              className="w-full py-3 rounded-2xl font-black text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Free Fire App Now</span>
            </button>
          </div>

          {/* Interactive 3D Phone Screen Runway */}
          <ThreeDPhoneViewer
            brand={brand}
            model={model}
            fireButtonSize={fireButtonSize}
            safeDpi={safeDpi}
          />
        </div>
      </div>

      {/* Reticle / Custom HUD Panel Simulator */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red-400" />
              <span>VIP Custom Reticle & Overlay Crosshair</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Custom center-screen reticle to keep your shotgun & sniper flick aim locked before shooting
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#a855f7'] as const).map((color) => (
              <button
                key={color}
                onClick={() => {
                  soundFx.playClick();
                  setReticleColor(color);
                }}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  reticleColor === color ? 'border-white scale-125 shadow-lg' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reticle Preview Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Visual Display */}
          <div className="h-48 md:h-56 bg-zinc-900/90 rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

            {/* Reticle */}
            <div
              style={{
                width: `${reticleSize * 2}px`,
                height: `${reticleSize * 2}px`,
                borderColor: reticleColor,
                boxShadow: `0 0 15px ${reticleColor}`,
              }}
              className={`relative z-10 flex items-center justify-center transition-all ${
                reticleType === 'dot'
                  ? 'rounded-full'
                  : reticleType === 'circle'
                  ? 'border-2 rounded-full'
                  : reticleType === 'cross'
                  ? ''
                  : 'border-2 rounded-full'
              }`}
            >
              {reticleType === 'dot' && (
                <div
                  style={{
                    backgroundColor: reticleColor,
                    width: `${reticleSize}px`,
                    height: `${reticleSize}px`,
                  }}
                  className="rounded-full shadow-lg"
                />
              )}

              {reticleType === 'cross' && (
                <>
                  <div
                    style={{ backgroundColor: reticleColor }}
                    className="absolute w-full h-[2px]"
                  />
                  <div
                    style={{ backgroundColor: reticleColor }}
                    className="absolute h-full w-[2px]"
                  />
                </>
              )}

              {reticleType === 'hybrid' && (
                <>
                  <div
                    style={{ backgroundColor: reticleColor }}
                    className="w-2 h-2 rounded-full"
                  />
                  <div
                    style={{ borderColor: reticleColor }}
                    className="absolute inset-0 border-2 rounded-full animate-ping opacity-25"
                  />
                </>
              )}
            </div>

            <span className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
              PREVIEW: CENTER DISPLAY MATRIX
            </span>
          </div>

          {/* Configuration Controls */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">
                Reticle Style:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'dot', label: 'Laser Dot (Shotgun)' },
                  { key: 'circle', label: 'Ring (Hipfire)' },
                  { key: 'cross', label: 'Cross (Sniper)' },
                  { key: 'hybrid', label: 'Hybrid VIP' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      soundFx.playClick();
                      setReticleType(item.key as 'dot' | 'circle' | 'cross' | 'hybrid');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      reticleType === item.key
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                <span className="text-zinc-300">Reticle Size:</span>
                <span className="text-amber-400 font-mono">{reticleSize}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                value={reticleSize}
                onChange={(e) => setReticleSize(Number(e.target.value))}
                className="w-full accent-red-500 bg-zinc-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
              💡 <span className="text-white font-bold">VIP Tip:</span> Shotgun (M1887) one-tap marte waqt chhota white ya red laser dot center me rakhne se bina aim khole exact enemy head position detect ho jaati hai!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
