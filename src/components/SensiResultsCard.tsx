import React, { useState } from 'react';
import {
  HardwareRecommendations,
  Playstyle,
  RamTier,
  RefreshRate,
  SensiScale,
  SensiValues,
} from '../types/sensi';
import {
  Copy,
  Check,
  BookmarkPlus,
  Play,
  AlertTriangle,
  Flame,
  Target,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface SensiResultsCardProps {
  sensi: SensiValues;
  setSensi: React.Dispatch<React.SetStateAction<SensiValues>>;
  hardware: HardwareRecommendations;
  analysis: string;
  brand: string;
  model: string;
  ram: RamTier;
  refreshRate: RefreshRate;
  playstyle: Playstyle;
  scale: SensiScale;
  onSavePreset: (title: string) => void;
  onOpenTrainer: () => void;
  onOpenDpiGuide?: () => void;
}

export const SensiResultsCard: React.FC<SensiResultsCardProps> = ({
  sensi,
  setSensi,
  hardware,
  analysis,
  brand,
  model,
  ram,
  refreshRate,
  playstyle,
  scale,
  onSavePreset,
  onOpenTrainer,
  onOpenDpiGuide,
}) => {
  const [copied, setCopied] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [customFireSize, setCustomFireSize] = useState(hardware.fireButtonSize);

  const maxScaleVal = scale === '200' ? 200 : 100;

  const sensiItems: {
    key: keyof SensiValues;
    label: string;
    desc: string;
    color: string;
  }[] = [
    {
      key: 'general',
      label: 'General Camera',
      desc: 'Controls 360° screen rotation speed and vertical drag acceleration',
      color: 'from-amber-500 to-orange-500',
    },
    {
      key: 'redDot',
      label: 'Red Dot (Hipfire)',
      desc: 'Controls un-scoped crosshair lock-on and shotgun flick precision',
      color: 'from-red-500 to-rose-600',
    },
    {
      key: 'scope2x',
      label: '2X Scope',
      desc: 'Mid-range spray tracking for UMP, SCAR, M4A1, and AC80',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      key: 'scope4x',
      label: '4X Scope',
      desc: 'Long-range spray tracking for marksman and assault rifles',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      key: 'sniperScope',
      label: 'Sniper Scope',
      desc: 'Micro-aim stability for AWM, M82B, and Kar98k quick-swapping',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'freeLook',
      label: 'Free Look (Eye)',
      desc: 'Peripheral vision eye button sensitivity while sprinting',
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  const handleAdjust = (key: keyof SensiValues, delta: number) => {
    soundFx.playClick();
    setSensi((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(maxScaleVal, prev[key] + delta)),
    }));
  };

  const handleSliderChange = (key: keyof SensiValues, val: number) => {
    setSensi((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const copyToClipboard = () => {
    soundFx.playClick();
    const text = `🔥 FREE FIRE CALIBRATED SENSI (${model} - ${ram} RAM)
Scale: Modern Free Fire OB (${scale === '200' ? '0-200 Scale' : '0-100 Classic Scale'})
Playstyle: ${playstyle.toUpperCase()}
========================================
🎯 General Camera: ${sensi.general}
🔴 Red Dot (Hipfire): ${sensi.redDot}
🔭 2X Scope: ${sensi.scope2x}
🔭 4X Scope: ${sensi.scope4x}
🎯 Sniper Scope: ${sensi.sniperScope}
👀 Free Look: ${sensi.freeLook}
----------------------------------------
🔘 Recommended Fire Button Size: ${customFireSize}%
⚙️ Safe Developer Smallest Width (DPI): ${hardware.safeDpi} (Base: ${hardware.defaultDpi} | Max Limit: ${hardware.maxDpiLimit})
🚀 Pointer Speed: ${hardware.pointerSpeed}
⚡ Touch & Hold Delay: ${hardware.touchDelay}
🎮 In-Game Graphics: ${hardware.graphicsSetting.graphics} | FPS: ${hardware.graphicsSetting.highFps}
🎯 Aim Precision: ${hardware.controlsSetting.aimPrecision} | Gloo Wall Smart Throw: ${hardware.controlsSetting.glooWallSmartThrow}
========================================
Calibrated via FF SensiPro A-Z Engine`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    const title = saveTitle.trim() || `${model} (${playstyle.toUpperCase()} - ${scale})`;
    onSavePreset(title);
    setShowSaveModal(false);
    setSaveTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Calibration Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-zinc-400">
              <span className="font-extrabold text-amber-400 uppercase tracking-wider">
                Real-Time Calibration
              </span>
              <span>·</span>
              <span className="text-zinc-300 font-semibold">{brand}</span>
              <span>·</span>
              <span className="font-mono text-zinc-300">{ram} RAM</span>
              <span>·</span>
              <span className="font-mono text-amber-400 font-bold">
                {scale === '200' ? 'OB 0-200 Scale' : 'Classic 0-100'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {model}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {analysis}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>Copy Sensi</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-all whitespace-nowrap"
            >
              <BookmarkPlus className="w-4 h-4 text-amber-400" />
              <span>Save</span>
            </button>

            <button
              onClick={onOpenTrainer}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500 active:scale-95 transition-all shadow-lg shadow-red-600/20 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Drag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensi Values Grid with Real-Time Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensiItems.map((item) => {
          const val = sensi[item.key];
          const pct = Math.round((val / maxScaleVal) * 100);

          return (
            <div
              key={item.key}
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">{item.label}</h3>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-mono tracking-tight">
                    {val}
                  </span>
                </div>
              </div>

              {/* Real-time Slider */}
              <div className="space-y-2 my-2">
                <input
                  type="range"
                  min="0"
                  max={maxScaleVal}
                  value={val}
                  onChange={(e) => handleSliderChange(item.key, Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-950 rounded-lg"
                />

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>0</span>
                  <span className="text-amber-400 font-semibold">{pct}% Power</span>
                  <span>{maxScaleVal}</span>
                </div>
              </div>

              {/* Fine adjustment stepper buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/70 text-xs">
                <span className="text-[10px] uppercase font-mono text-zinc-400">
                  {pct >= 90 ? 'Ultra Flick' : pct >= 75 ? 'Fast Drag' : pct >= 50 ? 'Balanced' : 'Precision'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAdjust(item.key, -1)}
                    className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold font-mono transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleAdjust(item.key, 1)}
                    className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold font-mono transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hardware & Fire Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fire Button Simulator */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
                Fire Button Size & HUD Placement
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Optimal Fire Button:{' '}
                <span className="text-amber-400 font-mono text-lg">{customFireSize}%</span>
              </h3>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-[11px] text-zinc-400 mb-3 text-center">
              Real-time size simulator for your thumb travel:
            </div>

            {/* Fire Button Graphic */}
            <div className="relative flex items-center justify-center my-3">
              <div
                className="rounded-full border-2 border-red-500 bg-red-600/20 flex items-center justify-center shadow-lg shadow-red-600/30 transition-all duration-150"
                style={{
                  width: `${customFireSize * 1.5}px`,
                  height: `${customFireSize * 1.5}px`,
                }}
              >
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
              </div>

              {/* Upward drag indicator */}
              <div className="absolute -top-7 flex flex-col items-center animate-bounce">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter">
                  Drag Runway
                </span>
                <span className="text-amber-400 text-xs">▲</span>
              </div>
            </div>

            {/* Slider */}
            <div className="w-full max-w-xs mt-3 flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-500">35%</span>
              <input
                type="range"
                min="35"
                max="75"
                value={customFireSize}
                onChange={(e) => setCustomFireSize(Number(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-500">75%</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            💡 <strong className="text-zinc-200">Pro Recommendation:</strong> Place the fire button
            in the lower right quadrant. Positioning it too high restricts your vertical thumb
            swipe, causing shots to magnetize onto the enemy's chest.
          </p>
        </div>

        {/* Developer Options & Safe DPI Table */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
                Developer Options & Safe DPI
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Smallest Width (DPI) Calibration
              </h3>
            </div>
            {onOpenDpiGuide && (
              <button
                onClick={onOpenDpiGuide}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 active:scale-95 transition-all"
              >
                <span>How to Set DPI</span>
              </button>
            )}
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Default DPI</span>
                <span className="text-base font-bold font-mono text-zinc-300">
                  {hardware.defaultDpi}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-amber-400 block uppercase font-bold">
                  Safe Target
                </span>
                <span className="text-xl font-black font-mono text-emerald-400">
                  {hardware.safeDpi}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-red-400 block uppercase font-bold">
                  Danger Limit
                </span>
                <span className="text-base font-bold font-mono text-red-500">
                  {hardware.maxDpiLimit}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Safety Rule: Never exceed {hardware.maxDpiLimit} DPI! Exceeding hardware thresholds
                may trigger Android System UI crash or reboot loop.
              </span>
            </div>
          </div>

          {/* Device Tweaks Checklist */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-400">Pointer Speed (Android Settings):</span>
              <span className="font-semibold font-mono text-zinc-200">
                {hardware.pointerSpeed}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-400">Touch & Hold Delay:</span>
              <span className="font-semibold font-mono text-zinc-200">
                {hardware.touchDelay}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-400">Display Graphics & FPS:</span>
              <span className="font-semibold font-mono text-amber-400">
                {hardware.graphicsSetting.graphics} · {hardware.graphicsSetting.highFps}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Save Sensi Setup</h3>
            <p className="text-xs text-zinc-400">
              Enter a name for this custom setup to save to your local library:
            </p>
            <input
              type="text"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              placeholder={`e.g. ${model} Ranked Setup`}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400"
              >
                Save Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
