import React, { useState } from 'react';
import {
  HardwareRecommendations,
  FingerGrip,
  InGameControlsSettings,
  GraphicsDisplaySettings,
} from '../types/sensi';
import { Sliders, Shield, Monitor, Layers, Check, Copy } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface HudAndControlsTabProps {
  hardware: HardwareRecommendations;
  grip: FingerGrip;
}

export const HudAndControlsTab: React.FC<HudAndControlsTabProps> = ({ hardware, grip }) => {
  const [selectedClaw, setSelectedClaw] = useState<'2finger' | '3finger' | '4finger'>(grip);
  const [copiedSettings, setCopiedSettings] = useState(false);

  const hudBlueprints = {
    '2finger': {
      title: '2-Finger Classic Mobile HUD',
      desc: 'Simple and ergonomic for casual and ranked players using purely two thumbs.',
      elements: [
        { name: 'Right Fire Button', size: '48%', opacity: '85%', pos: 'Bottom Right (X: 82%, Y: 84%)' },
        { name: 'Jump Button', size: '65%', opacity: '70%', pos: 'Right Middle (X: 88%, Y: 60%)' },
        { name: 'Crouch Button', size: '60%', opacity: '70%', pos: 'Right Bottom (X: 74%, Y: 85%)' },
        { name: 'Gloo Wall Button', size: '85%', opacity: '90%', pos: 'Bottom Left (X: 18%, Y: 75%)' },
        { name: 'Analog Joystick', size: '40%', opacity: '40%', pos: 'Bottom Left (X: 15%, Y: 80%)' },
        { name: 'Scope Button', size: '65%', opacity: '80%', pos: 'Right Side (X: 86%, Y: 45%)' },
        { name: 'Quick Switch', size: '70%', opacity: '85%', pos: 'Bottom Center (X: 52%, Y: 85%)' },
      ],
    },
    '3finger': {
      title: '3-Finger Claw (Pro Rusher HUD)',
      desc: 'Left index finger controls Gloo Wall or Jump, freeing left thumb for non-stop sprint movement.',
      elements: [
        { name: 'Left Top Gloo Wall', size: '95%', opacity: '90%', pos: 'Top Left (X: 12%, Y: 18%)' },
        { name: 'Right Fire Button', size: '45%', opacity: '85%', pos: 'Bottom Right (X: 84%, Y: 85%)' },
        { name: 'Quick Weapon Switch', size: '78%', opacity: '90%', pos: 'Top Left / Mid (X: 25%, Y: 22%)' },
        { name: 'Jump Button', size: '68%', opacity: '75%', pos: 'Right Middle (X: 86%, Y: 58%)' },
        { name: 'Crouch Button', size: '65%', opacity: '75%', pos: 'Right Bottom (X: 72%, Y: 86%)' },
        { name: 'Left Fire Button', size: '75%', opacity: '80%', pos: 'Top Left (X: 18%, Y: 25%)' },
        { name: 'Sprint Button', size: '65%', opacity: '70%', pos: 'Center Left (X: 28%, Y: 55%)' },
      ],
    },
    '4finger': {
      title: '4-Finger Full Claw (Esports Tournament HUD)',
      desc: 'Both index fingers control triggers & gloo walls while thumbs maintain continuous aim drag and 360° movement.',
      elements: [
        { name: 'Left Trigger (Left Fire)', size: '85%', opacity: '90%', pos: 'Top Left (X: 14%, Y: 15%)' },
        { name: 'Right Trigger (Jump & Scope)', size: '80%', opacity: '85%', pos: 'Top Right (X: 86%, Y: 15%)' },
        { name: 'Gloo Wall Button', size: '100%', opacity: '95%', pos: 'Mid Left (X: 20%, Y: 60%)' },
        { name: 'Right Drag Fire Button', size: '42%', opacity: '85%', pos: 'Bottom Right (X: 85%, Y: 84%)' },
        { name: 'Crouch / Sit-Up Button', size: '70%', opacity: '80%', pos: 'Right Bottom (X: 72%, Y: 85%)' },
        { name: 'Quick Weapon Switch', size: '82%', opacity: '90%', pos: 'Center Bottom (X: 50%, Y: 86%)' },
        { name: 'Reload Button', size: '60%', opacity: '60%', pos: 'Top Center (X: 52%, Y: 18%)' },
      ],
    },
  };

  const currentHud = hudBlueprints[selectedClaw];

  const copyInGameSettings = () => {
    soundFx.playClick();
    const text = `🔥 FREE FIRE A-TO-Z IN-GAME SETTINGS
========================================
[ CONTROLS SETTINGS ]
• Aim Precision: Default
• Left Fire Button: Always
• Quick Weapon Switch: ON
• Quick Reload: ON
• Hold Fire to Scope: ON
• Grenade Slot: Double Slot
• Gloo Wall Smart Throw: ON
• Auto Gun Switch: ON
• Run Mode: Classic
• Vehicle Control: Two Hands

[ DISPLAY & GRAPHICS SETTINGS ]
• Graphics: ${hardware.graphicsSetting.graphics}
• High FPS: High (Mandatory for 60-120FPS drag registration)
• Shadow: ${hardware.graphicsSetting.shadow}
• Visual Style: Vivid
• High Resolution: ${hardware.graphicsSetting.highRes}
• Visual Effects: Dark / Classic

[ CUSTOM HUD BLUEPRINT: ${currentHud.title} ]
${currentHud.elements.map((e) => `• ${e.name} -> Size: ${e.size}, Opacity: ${e.opacity}, Position: ${e.pos}`).join('\n')}
========================================
Calibrated via FF SensiPro A-Z Engine`;

    navigator.clipboard.writeText(text);
    setCopiedSettings(true);
    setTimeout(() => setCopiedSettings(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            A to Z In-Game Configuration
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Controls, Custom HUD & Display Settings
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Sensitivity alone won't secure victories without optimal HUD button coordinates and
            esports-tested controls. Copy full in-game configurations below.
          </p>
        </div>

        <button
          onClick={copyInGameSettings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap self-start sm:self-auto"
        >
          {copiedSettings ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>Copied All Settings!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-black" />
              <span>Copy A-Z Settings</span>
            </>
          )}
        </button>
      </div>

      {/* In-Game Controls Grid */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">Recommended In-Game Controls Matrix</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Aim Precision:</span>
            <span className="font-bold text-emerald-400">Default (For Auto-Aim Drag)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Left Fire Button:</span>
            <span className="font-bold text-amber-400">Always (Crucial for Fast Gloo Wall)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Quick Weapon Switch:</span>
            <span className="font-bold text-emerald-400">ON (Shotgun flick reset)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Quick Reload:</span>
            <span className="font-bold text-emerald-400">ON</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Hold Fire to Scope:</span>
            <span className="font-bold text-emerald-400">ON (For Sniper Quick-Scope)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Grenade Slot:</span>
            <span className="font-bold text-amber-400">Double Slot (Separates Gloo & Grenade)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Gloo Wall Smart Throw:</span>
            <span className="font-bold text-emerald-400">ON (Instant wall deployment)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Auto Gun Switch:</span>
            <span className="font-bold text-emerald-400">ON (Empty mag auto-swap)</span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400">Run Mode:</span>
            <span className="font-bold text-zinc-300">Classic (Prevents accidental walking)</span>
          </div>
        </div>
      </div>

      {/* Custom HUD Blueprint Hub */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">Custom HUD Blueprints</h3>
          </div>

          {/* Claw Switcher */}
          <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setSelectedClaw('2finger')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedClaw === '2finger'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              2-Finger Thumb
            </button>
            <button
              onClick={() => setSelectedClaw('3finger')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedClaw === '3finger'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              3-Finger Claw
            </button>
            <button
              onClick={() => setSelectedClaw('4finger')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedClaw === '4finger'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              4-Finger Claw
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">{currentHud.desc}</p>

        {/* HUD Elements Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentHud.elements.map((el, i) => (
            <div
              key={i}
              className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white">{el.name}</span>
                <span className="text-xs font-mono font-bold text-amber-400">{el.size} Size</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>Opacity: {el.opacity}</span>
                <span className="font-mono text-zinc-400">{el.pos}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphics & Display Settings */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">Display & Graphics Optimization</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block mb-1">Graphics Quality</span>
            <span className="text-base font-black text-amber-400">
              {hardware.graphicsSetting.graphics}
            </span>
            <p className="text-[10px] text-zinc-400 mt-1">
              {hardware.graphicsSetting.graphics === 'Smooth'
                ? 'Locks framerate, prevents thermal throttling'
                : 'Balanced visual fidelity and frame pacing'}
            </p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block mb-1">High FPS Setting</span>
            <span className="text-base font-black text-emerald-400">HIGH (Mandatory)</span>
            <p className="text-[10px] text-zinc-400 mt-1">
              Enables 60-120FPS touch polling registration
            </p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block mb-1">Shadows</span>
            <span className="text-base font-black text-red-400">
              {hardware.graphicsSetting.shadow}
            </span>
            <p className="text-[10px] text-zinc-400 mt-1">
              Shadows cause micro-stutter during drag flicks
            </p>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <span className="text-zinc-400 block mb-1">Visual Filter</span>
            <span className="text-base font-black text-blue-400">VIVID</span>
            <p className="text-[10px] text-zinc-400 mt-1">
              Enhances player silhouettes against grass and terrain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
