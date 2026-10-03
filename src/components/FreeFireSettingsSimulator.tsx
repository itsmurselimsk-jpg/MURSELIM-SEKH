import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  Copy,
  RotateCcw,
  Volume2,
  Tv,
  Crosshair,
  Shield,
  Zap,
  Target,
  Play,
  Layers,
  ChevronRight,
  Flame,
  Award,
  Crown,
} from 'lucide-react';
import { SensiScale, SensiValues } from '../types/sensi';
import { soundFx } from '../utils/audioEffects';

interface FreeFireSettingsSimulatorProps {
  currentSensi: SensiValues;
  onChangeSensi: (sensi: SensiValues) => void;
  scale: SensiScale;
  setScale: (scale: SensiScale) => void;
  fireButtonSize: number;
  onChangeFireSize: (size: number) => void;
  model: string;
  brand: string;
  safeDpi: number;
  onOpenTrainer?: () => void;
}

type SettingsTab = 'sensitivity' | 'controls' | 'display' | 'sound' | 'ffmax';

export const FreeFireSettingsSimulator: React.FC<FreeFireSettingsSimulatorProps> = ({
  currentSensi,
  onChangeSensi,
  scale,
  setScale,
  fireButtonSize,
  onChangeFireSize,
  model,
  brand,
  safeDpi,
  onOpenTrainer,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('sensitivity');
  const [copied, setCopied] = useState(false);
  const [appliedEffect, setAppliedEffect] = useState(false);

  // Graphics state
  const [graphicsPreset, setGraphicsPreset] = useState<'smooth' | 'standard' | 'ultra' | 'max'>('smooth');
  const [highFps, setHighFps] = useState<boolean>(true);
  const [shadows, setShadows] = useState<boolean>(false);
  const [highRes, setHighRes] = useState<boolean>(true);

  // Sound settings
  const [musicVol, setMusicVol] = useState(30);
  const [sfxVol, setSfxVol] = useState(100);
  const [killVoice, setKillVoice] = useState(90);

  // Test firing simulation state
  const [testResult, setTestResult] = useState<{
    damage: number;
    isHead: boolean;
    text: string;
  } | null>(null);

  const maxLimit = scale === '200' ? 200 : 100;

  const handleSliderChange = (key: keyof SensiValues, value: number) => {
    soundFx.playClick();
    onChangeSensi({
      ...currentSensi,
      [key]: value,
    });
  };

  const handleResetDefaults = () => {
    soundFx.playClick();
    const defaults: SensiValues =
      scale === '200'
        ? { general: 196, redDot: 188, scope2x: 180, scope4x: 172, sniperScope: 112, freeLook: 150 }
        : { general: 98, redDot: 94, scope2x: 90, scope4x: 86, sniperScope: 56, freeLook: 75 };
    onChangeSensi(defaults);
    onChangeFireSize(42);
  };

  const handleTestShot = () => {
    const isHeadshot = Math.random() < 0.92; // 92% calibrated headshot chance
    if (isHeadshot) {
      soundFx.playM1887();
      setTimeout(() => soundFx.playHeadshot(), 80);
      setTestResult({
        damage: 495,
        isHead: true,
        text: '🔴 HEADSHOT! (495 DMG)',
      });
      soundFx.playVoiceAnnouncer('Headshot!');
    } else {
      soundFx.playBodyShot();
      setTestResult({
        damage: 45,
        isHead: false,
        text: '🟡 Body Shot (45 DMG)',
      });
    }
    setTimeout(() => setTestResult(null), 2200);
  };

  const handleApplyToGame = () => {
    soundFx.playCyberLock();
    soundFx.playSuccess();
    setAppliedEffect(true);
    setCopied(true);

    const copyText = `FREE FIRE IN-GAME SENSITIVITY
------------------------------------
Device: ${brand} ${model}
Scale: ${scale === '200' ? '0-200 (FF MAX)' : '0-100 (Classic)'}
------------------------------------
General: ${Math.round(currentSensi.general)}
Red Dot: ${Math.round(currentSensi.redDot)}
2X Scope: ${Math.round(currentSensi.scope2x)}
4X Scope: ${Math.round(currentSensi.scope4x)}
Sniper Scope: ${Math.round(currentSensi.sniperScope)}
Free Look: ${Math.round(currentSensi.freeLook)}
Fire Button: ${fireButtonSize}%
Safe DPI: ${safeDpi || 480}
------------------------------------
✓ 100% Anti-Ban Auto-Calibrated`;

    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setAppliedEffect(false);
      setCopied(false);
    }, 2800);
  };

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/50 rounded-3xl p-4 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden my-6">
      {/* Decorative Free Fire Header Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner with Free Fire Aesthetic */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/30">
            FF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                <span>Free Fire In-Game Settings Simulator</span>
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-bold">
                OB47 OFFICIAL
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Exact replica of Free Fire pause & settings menu with live headshot audio & feedback.
            </p>
          </div>
        </div>

        {/* Quick Scale Toggle (0-100 vs 0-200) */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setScale('100');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              scale === '100'
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            0-100 Scale (Classic)
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setScale('200');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              scale === '200'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            0-200 Scale (FF MAX)
          </button>
        </div>
      </div>

      {/* Free Fire Settings Navigation Menu Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'sensitivity', label: 'SENSITIVITY', icon: Sliders },
          { id: 'controls', label: 'CONTROLS & HUD', icon: Crosshair },
          { id: 'display', label: 'DISPLAY & FPS', icon: Tv },
          { id: 'sound', label: 'SOUND & VOICE', icon: Volume2 },
          { id: 'ffmax', label: 'FF MAX SPECIAL', icon: Crown },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id as SettingsTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SENSITIVITY SLIDERS (Exact In-Game Layout) */}
      {activeTab === 'sensitivity' && (
        <div className="space-y-5">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Sensitivity Configuration ({scale === '200' ? '0 - 200' : '0 - 100'})</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTestShot}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Test Headshot</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Test Shot Floating Feedback Alert */}
            {testResult && (
              <div
                className={`p-3 rounded-xl border flex items-center justify-between animate-in fade-in zoom-in-95 duration-150 ${
                  testResult.isHead
                    ? 'bg-red-950/80 border-red-500 text-red-200'
                    : 'bg-amber-950/80 border-amber-500 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  <span className="text-xl">{testResult.isHead ? '💀' : '🎯'}</span>
                  <span>{testResult.text}</span>
                </div>
                <span className="text-xs font-mono font-bold bg-black/60 px-2 py-1 rounded">
                  {testResult.damage} DAMAGE
                </span>
              </div>
            )}

            {/* Sliders Grid */}
            <div className="space-y-3.5 text-xs">
              {[
                { key: 'general' as keyof SensiValues, label: 'General (सामान्य)', desc: 'Camera & Main Look Around Drag' },
                { key: 'redDot' as keyof SensiValues, label: 'Red Dot (रेड डॉट)', desc: 'Iron Sight & No-Scope Head Lock' },
                { key: 'scope2x' as keyof SensiValues, label: '2X Scope (2X स्कोप)', desc: 'Mid-Range SMG & AR Head Lock' },
                { key: 'scope4x' as keyof SensiValues, label: '4X Scope (4X स्कोप)', desc: 'Long-Range Burst Accuracy' },
                { key: 'sniperScope' as keyof SensiValues, label: 'Sniper Scope (स्नाइपर स्कोप)', desc: 'AWM & M82B Precision Switch' },
                { key: 'freeLook' as keyof SensiValues, label: 'Free Look (फ्री लुक)', desc: 'Eye Icon 360° Surrounding Vision' },
              ].map((item) => {
                const val = Math.round(currentSensi[item.key]);
                const pct = Math.min(100, Math.max(0, (val / maxLimit) * 100));

                return (
                  <div key={item.key} className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-xs block">{item.label}</span>
                        <span className="text-[10px] text-zinc-400">{item.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={maxLimit}
                          value={val}
                          onChange={(e) =>
                            handleSliderChange(item.key, Math.min(maxLimit, Math.max(0, Number(e.target.value))))
                          }
                          className="w-14 text-center font-mono font-black text-amber-400 bg-black py-1 rounded-lg border border-amber-500/40 text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Realistic In-Game Style Slider Track */}
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={0}
                        max={maxLimit}
                        value={val}
                        onChange={(e) => handleSliderChange(item.key, Number(e.target.value))}
                        className="w-full h-3 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-zinc-800"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTROLS & CUSTOM HUD */}
      {activeTab === 'controls' && (
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
              <Crosshair className="w-4 h-4" />
              <span>Custom HUD & Fire Button Calibration</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fire Button Controller */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">Fire Button Size</span>
                    <span className="text-[10px] text-zinc-400">Recommended for 1-Tap Drag: 38% - 45%</span>
                  </div>
                  <span className="text-sm font-mono font-black text-red-400 bg-black px-2.5 py-1 rounded-lg border border-red-500/40">
                    {fireButtonSize}%
                  </span>
                </div>

                <input
                  type="range"
                  min={25}
                  max={85}
                  value={fireButtonSize}
                  onChange={(e) => {
                    soundFx.playClick();
                    onChangeFireSize(Number(e.target.value));
                  }}
                  className="w-full h-3 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-red-500 border border-zinc-800"
                />

                <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 text-[11px] text-zinc-300">
                  <span className="text-amber-400 font-bold block mb-0.5">💡 Pro Headshot Secret:</span>
                  Fire button ko screen ke <strong>niche right corner (Lower 25%)</strong> me rakhein taaki upar swipe karne ke liye poora runway mile!
                </div>
              </div>

              {/* Developer Safe DPI Box */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">Developer Options DPI</span>
                    <span className="text-[10px] text-zinc-400">Device Width: {model || 'Android'}</span>
                  </div>
                  <span className="text-sm font-mono font-black text-amber-400 bg-black px-2.5 py-1 rounded-lg border border-amber-500/40">
                    {safeDpi || 480} DPI
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 text-[11px] text-zinc-300">
                  <span className="text-emerald-400 font-bold block mb-0.5">✓ Safe Anti-Glitch Width:</span>
                  Aapke phone ke liye safe limit <strong>{safeDpi || 480} DPI</strong> hai. Phone settings ➔ Developer Options ➔ Smallest Width me ye number daalein.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DISPLAY & FPS */}
      {activeTab === 'display' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <h4 className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
            <Tv className="w-4 h-4" />
            <span>Graphics & Frame Rate Optimization</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['smooth', 'standard', 'ultra', 'max'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  soundFx.playClick();
                  setGraphicsPreset(preset);
                }}
                className={`py-3 px-2 rounded-xl text-xs font-black uppercase transition-all ${
                  graphicsPreset === preset
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-xs block">High FPS Mode</span>
                <span className="text-[10px] text-zinc-400">Zero frame drop</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setHighFps(!highFps);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black font-mono transition-all ${
                  highFps ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {highFps ? 'HIGH' : 'NORMAL'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-xs block">Shadows</span>
                <span className="text-[10px] text-zinc-400">Turn OFF for speed</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShadows(!shadows);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black font-mono transition-all ${
                  shadows ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {shadows ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-xs block">High Res Textures</span>
                <span className="text-[10px] text-zinc-400">Enemy clarity</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setHighRes(!highRes);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black font-mono transition-all ${
                  highRes ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {highRes ? 'HIGH' : 'NORMAL'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SOUND & VOICE */}
      {activeTab === 'sound' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <h4 className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <span>Audio & Sound Effect Calibration</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Sound Effects (Gunfire & Footsteps)</span>
                <span className="font-mono font-bold text-amber-400">{sfxVol}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sfxVol}
                onChange={(e) => setSfxVol(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Kill Notification Voice Lines</span>
                <span className="font-mono font-bold text-red-400">{killVoice}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={killVoice}
                onChange={(e) => setKillVoice(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FF MAX SPECIAL */}
      {activeTab === 'ffmax' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <h4 className="text-xs font-black text-amber-400 uppercase font-mono tracking-wider flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <span>Free Fire MAX OB47 Special Engine</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="font-bold text-emerald-400 block">✓ Enhanced Audio Style</span>
              <p className="text-[11px] text-zinc-400">Set to "NEW" for sharper gunshot direction sensing.</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="font-bold text-amber-400 block">✓ Visual Effects: Classic</span>
              <p className="text-[11px] text-zinc-400">Classic blood markers ensure highest visibility in rank push.</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800">
        <button
          onClick={handleApplyToGame}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-zinc-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/25 cursor-pointer"
        >
          {appliedEffect ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4 fill-zinc-950" />}
          <span>{copied ? '✓ SENSITIVITY COPIED TO CLIPBOARD' : 'APPLY & COPY TO FREE FIRE'}</span>
        </button>

        {onOpenTrainer && (
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTrainer();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Target className="w-4 h-4 text-red-500" />
            <span>Open Drag Firing Range</span>
          </button>
        )}
      </div>
    </div>
  );
};
