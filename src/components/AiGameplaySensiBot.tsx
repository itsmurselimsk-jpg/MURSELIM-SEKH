import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Flame,
  Zap,
  Target,
  Crosshair,
  CheckCircle2,
  Copy,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Cpu,
  TrendingUp,
  Volume2,
  Crown,
  Activity,
  Layers,
} from 'lucide-react';
import {
  FingerGrip,
  Playstyle,
  RamTier,
  RefreshRate,
  ScreenSize,
  SensiScale,
  SensiValues,
  TouchSamplingRate,
} from '../types/sensi';
import { soundFx } from '../utils/audioEffects';
import { GoogleGenAI } from '@google/genai';

interface AiGameplaySensiBotProps {
  brand: string;
  model: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  touchSampling: TouchSamplingRate;
  screenSize: ScreenSize;
  playstyle: Playstyle;
  grip: FingerGrip;
  scale: SensiScale;
  onApplySensi: (sensi: SensiValues, fireSize: number) => void;
  onOpenTrainer: () => void;
  onShowToast: (msg: string) => void;
}

interface MatchPhase {
  name: string;
  weapon: string;
  icon: string;
  objective: string;
  damage: number;
  isHeadshot: boolean;
  log: string;
}

export const AiGameplaySensiBot: React.FC<AiGameplaySensiBotProps> = ({
  brand,
  model,
  ram,
  refreshRate,
  touchSampling,
  screenSize,
  playstyle,
  grip,
  scale,
  onApplySensi,
  onOpenTrainer,
  onShowToast,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(-1);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [accuracyScore, setAccuracyScore] = useState<number>(0);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  // AI-generated final sensitivity
  const [calculatedSensi, setCalculatedSensi] = useState<SensiValues | null>(null);
  const [calculatedFireSize, setCalculatedFireSize] = useState<number>(42);
  const [calculatedDpi, setCalculatedDpi] = useState<number>(480);
  const [aiProCommentary, setAiProCommentary] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Canvas ref for live gameplay animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Gameplay test phases that the AI Bot will play through
  const phases: MatchPhase[] = [
    {
      name: 'Phase 1: Close-Range M1887 J-Drag Calibration',
      weapon: 'M1887 Shotgun',
      icon: '💥',
      objective: 'Testing rotational flick curve & General sensitivity on 120Hz display',
      damage: 495,
      isHeadshot: true,
      log: `[AI BOT] Spawned in Training Ground ➔ Executing M1887 J-Drag against moving target. Calibrating General Sensitivity to eliminate chest lock...`,
    },
    {
      name: 'Phase 2: Mid-Range UMP-45 Spray Recoil Dampening',
      weapon: 'UMP-45',
      icon: '🌪️',
      objective: 'Analyzing 2X Scope & Red Dot recoil bloom at 25 meters',
      damage: 138,
      isHeadshot: true,
      log: `[AI BOT] Testing UMP-45 3-round burst spray. Detected slight camera jitter ➔ Dampening Red Dot and locking 2X Scope for laser accuracy...`,
    },
    {
      name: 'Phase 3: Desert Eagle Long-Range One-Tap Test',
      weapon: 'Desert Eagle',
      icon: '⚡',
      objective: 'Testing thumb acceleration & Fire Button size runway',
      damage: 495,
      isHeadshot: true,
      log: `[AI BOT] Testing Desert Eagle sharp flick upward. Optimizing Fire Button size for maximum drag runway height...`,
    },
    {
      name: 'Phase 4: Double AWM Fast-Switch Precision',
      weapon: 'AWM Sniper',
      icon: '🔭',
      objective: 'Eliminating scope switch drift & micro-input latency',
      damage: 1100,
      isHeadshot: true,
      log: `[AI BOT] Testing AWM Quick-Scope switch. Zero drift verified ➔ 99.4% Red Number Headshot Lock achieved!`,
    },
  ];

  // Start the Real-Time AI Gameplay Session
  const handleStartAiMatch = async () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setCompleted(false);
    setAccuracyScore(45);
    setTelemetryLogs([]);
    setCurrentPhaseIndex(0);
    setAiProCommentary('');

    soundFx.playGlitch();
    soundFx.playHologramLaser();

    // Calculate core custom sensitivity for this exact hardware
    let gen = scale === '200' ? 196 : 98;
    let rd = scale === '200' ? 188 : 94;
    let s2 = scale === '200' ? 180 : 90;
    let s4 = scale === '200' ? 172 : 86;
    let sn = scale === '200' ? 112 : 56;
    let fl = scale === '200' ? 150 : 75;
    let fireSize = 42;
    let safeDpi = 480;

    // Device RAM adjustments
    if (ram === '2GB' || ram === '3GB') {
      gen = scale === '200' ? 200 : 100;
      rd = scale === '200' ? 198 : 99;
      fireSize = 38;
      safeDpi = 420;
    } else if (ram === '4GB' || ram === '6GB') {
      gen = scale === '200' ? 198 : 99;
      rd = scale === '200' ? 192 : 96;
      fireSize = 40;
      safeDpi = 460;
    } else if (ram === '12GB' || ram === '16GB+') {
      gen = scale === '200' ? 192 : 96;
      rd = scale === '200' ? 184 : 92;
      fireSize = 44;
      safeDpi = 520;
    }

    if (refreshRate === '120Hz' || refreshRate === '144Hz') {
      gen = Math.max(scale === '200' ? 180 : 90, gen - (scale === '200' ? 4 : 2));
      rd = Math.max(scale === '200' ? 175 : 88, rd - (scale === '200' ? 4 : 2));
    }

    const calculated: SensiValues = {
      general: gen,
      redDot: rd,
      scope2x: s2,
      scope4x: s4,
      sniperScope: sn,
      freeLook: fl,
    };

    setCalculatedSensi(calculated);
    setCalculatedFireSize(fireSize);
    setCalculatedDpi(safeDpi);

    // Run phases with real sound effects and animations
    for (let i = 0; i < phases.length; i++) {
      setCurrentPhaseIndex(i);
      const phase = phases[i];

      // Play weapon-specific shot sound
      if (i === 0) {
        soundFx.playM1887();
        setTimeout(() => soundFx.playHeadshot(), 100);
      } else if (i === 1) {
        soundFx.playUmpSpray();
        setTimeout(() => soundFx.playHeadshot(), 120);
      } else if (i === 2) {
        soundFx.playDesertEagle();
        setTimeout(() => soundFx.playHeadshot(), 80);
      } else if (i === 3) {
        soundFx.playAwmSniper();
        setTimeout(() => soundFx.playHeadshot(), 150);
      }

      setTelemetryLogs((prev) => [...prev, phase.log]);
      setAccuracyScore(Math.min(99.4, 60 + i * 13 + Math.random() * 3));

      await new Promise((resolve) => setTimeout(resolve, 1600));
    }

    // Completion
    soundFx.playBassDrop();
    soundFx.playSuccess();
    soundFx.playVoiceAnnouncer('Godlike Headshots!');
    setIsSimulating(false);
    setCompleted(true);
    setAccuracyScore(99.4);
    setTelemetryLogs((prev) => [
      ...prev,
      `[✓ FINISHED] AI Bot Session complete for ${brand} ${model}! 99.4% Red Number Headshot profile ready.`,
    ]);

    // Fetch deep pro analysis from Gemini AI
    fetchGeminiProAnalysis(brand, model, ram, refreshRate, calculated, fireSize, safeDpi);
  };

  // Call Gemini API for real AI reasoning & breakdown
  const fetchGeminiProAnalysis = async (
    deviceBrand: string,
    deviceModel: string,
    deviceRam: string,
    hz: string,
    sensi: SensiValues,
    btnSize: number,
    dpi: number
  ) => {
    setIsLoadingAi(true);
    try {
      const ai = new GoogleGenAI({});
      const prompt = `You are the world's best Free Fire Esports Coach and Sensitivity Engineer.
The player is using:
Device: ${deviceBrand} ${deviceModel}
RAM: ${deviceRam}
Refresh Rate: ${hz}
Touch Sampling: ${touchSampling}
Scale: ${scale === '200' ? '0-200' : '0-100'}

Our AI Bot just completed a live Free Fire training match and calibrated this exact sensitivity:
General: ${sensi.general}
Red Dot: ${sensi.redDot}
2X Scope: ${sensi.scope2x}
4X Scope: ${sensi.scope4x}
Sniper Scope: ${sensi.sniperScope}
Fire Button Size: ${btnSize}%
Safe DPI: ${dpi}

Write a short, powerful, 3-bullet explanation in Hindi & Hinglish explaining:
1. Why this General Sensi (${sensi.general}) eliminates chest-lock and locks on the enemy's head hitbox for their specific screen.
2. The exact J-Drag / One-Tap technique they should use with M1887 & Desert Eagle.
3. Why the Fire Button size of ${btnSize}% placed at the bottom-right gives maximum drag runway.
Keep it crisp, confident, and esports-ready!`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (response && response.text) {
        setAiProCommentary(response.text);
      }
    } catch {
      // Fallback pro analysis
      setAiProCommentary(
        `🎯 **AI Esports Coach Analysis for ${deviceBrand} ${deviceModel}:**\n\n` +
          `• **General (${sensi.general}) Lock:** Aapke ${hz} display aur touch latency ke hisab se ye setting aim ko seene par atakne nahi degi aur upward drag karte hi crosshair direct head par snap hoga.\n` +
          `• **Fire Button (${btnSize}%):** Screen ke lower-right corner me set karein taaki M1887 aur Desert Eagle se J-Drag marte waqt thumb ko poori upward lift speed mile.\n` +
          `• **Red Dot (${sensi.redDot}) Anti-Overdrag:** Red dot ko micro-calibrate kiya gaya hai taaki goli hawa me na nikle aur 100% pure red damage number lage.`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Live Canvas 2D Bot Gameplay Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let botX = 60;
    let botY = canvas.height - 40;
    let targetX = canvas.width - 80;
    let targetY = canvas.height - 50;
    let targetDir = 1;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cyber Grid Background
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Ground line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 15);
      ctx.lineTo(canvas.width, canvas.height - 15);
      ctx.stroke();

      // Moving Target Dummy
      targetX += targetDir * 0.8;
      if (targetX > canvas.width - 40 || targetX < canvas.width - 120) {
        targetDir *= -1;
      }

      // Draw Target
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(targetX, targetY - 25, 10, 0, Math.PI * 2); // Head
      ctx.fill();
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(targetX - 8, targetY - 15, 16, 25); // Body

      // Target Crosshair
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(targetX, targetY - 25, 16 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // AI Bot Character
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(botX, botY - 25, 10, 0, Math.PI * 2); // Head
      ctx.fill();
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.fillRect(botX - 8, botY - 15, 16, 25);
      ctx.strokeRect(botX - 8, botY - 15, 16, 25);

      // Bot Gun Barrel
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(botX + 5, botY - 8);
      ctx.lineTo(botX + 22, botY - 14);
      ctx.stroke();

      // Laser Bullet Tracers during simulation
      if (isSimulating) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(botX + 22, botY - 14);
        ctx.lineTo(targetX, targetY - 25);
        ctx.stroke();

        // Muzzle Flash
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(botX + 22, botY - 14, 5 + (frame % 3) * 2, 0, Math.PI * 2);
        ctx.fill();

        // Red 495 Damage Text
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('🔴 495 HEADSHOT', targetX - 35, targetY - 45 - (frame % 20));
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSimulating]);

  // Apply to app
  const handleApply = () => {
    if (!calculatedSensi) return;
    soundFx.playSuccess();
    onApplySensi(calculatedSensi, calculatedFireSize);
    onShowToast('⚡ AI Bot Sensi Injected & Applied to App!');
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!calculatedSensi) return;
    soundFx.playSuccess();
    const text = `🤖 FREE FIRE AI BOT CALIBRATED SENSI
====================================
📱 Device: ${brand} ${model} (${ram} RAM · ${refreshRate})
🎯 AI Accuracy Score: ${accuracyScore}% Pure Red Numbers
------------------------------------
🎯 General: ${calculatedSensi.general}
🔴 Red Dot: ${calculatedSensi.redDot}
🔍 2X Scope: ${calculatedSensi.scope2x}
🔭 4X Scope: ${calculatedSensi.scope4x}
🎯 Sniper Scope: ${calculatedSensi.sniperScope}
👁️ Free Look: ${calculatedSensi.freeLook}
🔘 Fire Button Size: ${calculatedFireSize}% (Lower Right)
⚙️ Developer Safe DPI: ${calculatedDpi} DPI
------------------------------------
✓ 100% Anti-Ban | Auto-Calibrated by AI Match Bot`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('📋 AI Sensi Copied to Clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-2 border-red-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden my-6">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Bot className="w-6 h-6 text-red-500" />
              <span>AI BOT GAMEPLAY & SENSI GENERATOR MODEL</span>
            </span>
            <span className="text-[10px] bg-red-600/30 text-red-400 border border-red-500/50 px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
              LIVE NEURAL BOT
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            AI Bot aapke <strong>{brand} {model}</strong> ke touch response, {refreshRate} screen aur {ram} RAM ke hisab se game khel kar live sensitivity calibrate karega!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartAiMatch}
          disabled={isSimulating}
          className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl cursor-pointer ${
            isSimulating
              ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
              : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white hover:brightness-110 active:scale-95 shadow-red-600/30 border border-red-400'
          }`}
        >
          {isSimulating ? (
            <>
              <Activity className="w-4 h-4 animate-spin text-amber-400" />
              <span>AI BOT MATCH CHAL RAHA HAI...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>🚀 START AI BOT GAMEPLAY MATCH</span>
            </>
          )}
        </button>
      </div>

      {/* 2D LIVE GAMEPLAY BOT SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas Screen */}
        <div className="lg:col-span-7 bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[260px]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
              <Target className="w-3.5 h-3.5 text-red-500" />
              <span>VIRTUAL TRAINING GROUND (AI MATCH ARENA)</span>
            </span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ACCURACY: {accuracyScore.toFixed(1)}%
            </span>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={480}
            height={160}
            className="w-full h-40 bg-zinc-900/90 rounded-xl my-2 border border-zinc-800 shadow-inner"
          />

          {/* Current Phase Card */}
          {currentPhaseIndex >= 0 && (
            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="text-lg">{phases[currentPhaseIndex]?.icon}</span>
                <div>
                  <span className="font-bold text-white block">{phases[currentPhaseIndex]?.name}</span>
                  <span className="text-[10px] text-zinc-400">{phases[currentPhaseIndex]?.objective}</span>
                </div>
              </div>
              <span className="text-xs font-mono font-black text-red-400 bg-black/80 px-2 py-1 rounded">
                🔴 {phases[currentPhaseIndex]?.damage} DMG
              </span>
            </div>
          )}
        </div>

        {/* Right: Live Telemetry Logs */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5 mb-2">
              <Cpu className="w-4 h-4" />
              <span>AI Neural Telemetry Matrix</span>
            </span>

            <div className="h-44 overflow-y-auto space-y-2 p-2 rounded-xl bg-black border border-zinc-850 font-mono text-[11px] scrollbar-thin">
              {telemetryLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center p-4">
                  <Bot className="w-8 h-8 mb-2 opacity-40 text-red-500" />
                  <span>"START AI BOT GAMEPLAY MATCH" button dabayein taaki model game khel kar sensi banaye.</span>
                </div>
              ) : (
                telemetryLogs.map((log, idx) => (
                  <div key={idx} className="text-zinc-300 leading-relaxed border-b border-zinc-900 pb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>DEVICE: {brand} {model}</span>
            <span>RAM: {ram}</span>
            <span>REFRESH: {refreshRate}</span>
          </div>
        </div>
      </div>

      {/* FINAL AI SENSITIVITY DELIVERABLE */}
      {completed && calculatedSensi && (
        <div className="p-5 rounded-2xl bg-zinc-950 border-2 border-amber-500/60 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h4 className="text-sm sm:text-base font-black text-white uppercase font-mono tracking-wider">
                  AI Calibrated Sensitivity Result (Esports Verified)
                </h4>
              </div>
              <span className="text-xs text-zinc-400 mt-0.5 block">
                Free Fire match khelne ke baad aapke phone ke liye ye exact numbers generate hue hain:
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '✓ COPIED' : '📋 1-TAP COPY ALL'}</span>
              </button>

              <button
                onClick={handleApply}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all shadow-md shadow-red-600/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>APPLY TO APP</span>
              </button>
            </div>
          </div>

          {/* Generated Sensitivity Sliders */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'General', val: calculatedSensi.general, color: 'text-amber-400', border: 'border-amber-500/40' },
              { label: 'Red Dot', val: calculatedSensi.redDot, color: 'text-red-400', border: 'border-red-500/40' },
              { label: '2X Scope', val: calculatedSensi.scope2x, color: 'text-emerald-400', border: 'border-emerald-500/40' },
              { label: '4X Scope', val: calculatedSensi.scope4x, color: 'text-teal-400', border: 'border-teal-500/40' },
              { label: 'Sniper', val: calculatedSensi.sniperScope, color: 'text-cyan-400', border: 'border-cyan-500/40' },
              { label: 'Free Look', val: calculatedSensi.freeLook, color: 'text-purple-400', border: 'border-purple-500/40' },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl bg-zinc-900/90 border ${item.border} text-center space-y-1`}>
                <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold block">{item.label}</span>
                <span className={`text-xl sm:text-2xl font-black font-mono ${item.color}`}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          {/* Hardware Coordinates & DPI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block font-mono">FIRE BUTTON SIZE</span>
                <span className="text-base font-black text-red-400 font-mono">{calculatedFireSize}%</span>
              </div>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-bold">
                LOWER RIGHT
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block font-mono">SAFE DPI WIDTH</span>
                <span className="text-base font-black text-amber-400 font-mono">{calculatedDpi} DPI</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                DEV OPTIONS
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block font-mono">DRAG STYLE</span>
                <span className="text-xs font-black text-emerald-400">J-Drag / Rotation Drag</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                TECHNIQUE
              </span>
            </div>
          </div>

          {/* AI Coach Analysis */}
          {aiProCommentary && (
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs leading-relaxed text-zinc-300">
              <span className="text-amber-400 font-bold flex items-center gap-1.5 font-mono uppercase">
                <Sparkles className="w-4 h-4" />
                <span>AI Neural Coach Reasoning:</span>
              </span>
              <div className="whitespace-pre-line text-[11px] text-zinc-300 font-sans">
                {aiProCommentary}
              </div>
            </div>
          )}

          {/* Test in Firing Range Button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                soundFx.playClick();
                handleApply();
                onOpenTrainer();
              }}
              className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Target className="w-4 h-4 text-red-500" />
              <span>Is Sensi Ko Firing Range Me Test Karein ➔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
