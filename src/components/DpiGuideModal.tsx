import React, { useState } from 'react';
import {
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  X,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface DpiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  model: string;
  safeDpi: number;
}

export const DpiGuideModal: React.FC<DpiGuideModalProps> = ({
  isOpen,
  onClose,
  brand,
  model,
  safeDpi,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(
    brand.includes('Samsung')
      ? 'Samsung'
      : brand.includes('POCO') || brand.includes('Xiaomi')
      ? 'Xiaomi / POCO'
      : brand.includes('Realme') || brand.includes('Oppo')
      ? 'Realme / Oppo'
      : brand.includes('Vivo') || brand.includes('iQOO')
      ? 'Vivo / iQOO'
      : brand.includes('OnePlus')
      ? 'OnePlus'
      : brand.includes('Apple')
      ? 'iPhone / iOS'
      : 'General Android'
  );

  if (!isOpen) return null;

  const brandGuides: Record<
    string,
    {
      unlockSteps: string[];
      dpiLocation: string[];
      pointerSpeedLocation: string;
      stockDpi: number;
      safeDpiRange: string;
      dangerThreshold: number;
    }
  > = {
    'Xiaomi / POCO': {
      unlockSteps: [
        'Open Phone Settings -> About phone',
        'Tap "MIUI version" or "OS version" 7 times continuously until it says "You are now a developer!".',
      ],
      dpiLocation: [
        'Go back to Settings -> Additional Settings',
        'Scroll down and tap "Developer Options"',
        'Scroll down to the "Drawing" section and tap "Smallest width"',
        `Set to ${safeDpi} (Stock is typically 392).`,
      ],
      pointerSpeedLocation: 'Settings -> Additional Settings -> Languages & Input -> Pointer Speed',
      stockDpi: 392,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 65,
    },
    Samsung: {
      unlockSteps: [
        'Open Phone Settings -> About phone -> Software information',
        'Tap "Build number" 7 times continuously and enter your lock-screen PIN.',
      ],
      dpiLocation: [
        'Go back to Main Settings (scroll to the very bottom)',
        'Tap "Developer options"',
        'Scroll down to the "Drawing" section and tap "Minimum width"',
        `Set to ${safeDpi} (Stock is typically 411).`,
      ],
      pointerSpeedLocation: 'Settings -> General Management -> Mouse and trackpad -> Pointer speed',
      stockDpi: 411,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 70,
    },
    'Realme / Oppo': {
      unlockSteps: [
        'Open Phone Settings -> About device -> Version',
        'Tap "Version No." or "Build number" 7 times continuously.',
      ],
      dpiLocation: [
        'Go back to Settings -> System settings (or Additional settings)',
        'Tap "Developer options"',
        'Scroll down to "Drawing" section and tap "Smallest width"',
        `Enter ${safeDpi}.`,
      ],
      pointerSpeedLocation: 'Settings -> System settings -> Keyboard & input method -> Pointer speed',
      stockDpi: 392,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 65,
    },
    'Vivo / iQOO': {
      unlockSteps: [
        'Open Phone Settings -> System management (or About phone) -> Software version',
        'Tap "Software version" 7 times continuously.',
      ],
      dpiLocation: [
        'Go back to Settings -> System -> Developer options',
        'Scroll to "Drawing" category and tap "Smallest width"',
        `Set to ${safeDpi}.`,
      ],
      pointerSpeedLocation: 'Settings -> System -> Languages & input -> Pointer speed',
      stockDpi: 392,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 65,
    },
    OnePlus: {
      unlockSteps: [
        'Open Phone Settings -> About device -> Version',
        'Tap "Build number" 7 times continuously.',
      ],
      dpiLocation: [
        'Go back to Settings -> Additional settings -> Developer options',
        'Scroll down to "Drawing" -> "Smallest width"',
        `Set to ${safeDpi}.`,
      ],
      pointerSpeedLocation: 'Settings -> Additional settings -> Keyboard & input method -> Pointer speed',
      stockDpi: 411,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 70,
    },
    'iPhone / iOS': {
      unlockSteps: [
        'iOS does not use Android DPI numbers. Instead, optimize Touch Accommodations:',
      ],
      dpiLocation: [
        'Open Settings -> Accessibility -> Touch',
        'Tap "Haptic Touch" and set to "Fast"',
        'Tap "Touch Accommodations" and enable "Ignore Repeat" at 0.10s',
        'Open "Display & Text Size" -> Set "Text Size" to normal standard',
      ],
      pointerSpeedLocation: 'Settings -> Accessibility -> Pointer Control -> Scrolling Speed (Set to 80%)',
      stockDpi: 460,
      safeDpiRange: 'Standard Scaling',
      dangerThreshold: 600,
    },
    'General Android': {
      unlockSteps: [
        'Open Settings -> About phone -> Build number (tap 7 times)',
      ],
      dpiLocation: [
        'Go to Settings -> System -> Developer options',
        'Find "Smallest width" under Drawing section',
        `Set to ${safeDpi}.`,
      ],
      pointerSpeedLocation: 'Settings -> System -> Languages & input -> Pointer speed',
      stockDpi: 400,
      safeDpiRange: `${safeDpi - 10} - ${safeDpi + 10}`,
      dangerThreshold: safeDpi + 60,
    },
  };

  const currentGuide = brandGuides[selectedBrand] || brandGuides['General Android'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Developer Options & Safe DPI Guide</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Phone DPI & Pointer Speed Setup
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Increasing your phone's DPI unlocks faster touch polling and smoother upward drag
            momentum without screen jitter. Follow your phone brand steps below.
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
          {Object.keys(brandGuides).map((b) => (
            <button
              key={b}
              onClick={() => {
                soundFx.playClick();
                setSelectedBrand(b);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedBrand === b
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Safe DPI Meter Card */}
        <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Calculated Safe DPI for {model}
              </span>
              <span className="text-2xl font-black font-mono text-amber-400">
                {safeDpi} DPI
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Safe Range
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentGuide.safeDpiRange}
              </span>
            </div>
          </div>

          {/* Danger Warning Alert */}
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Anti-Blackout Danger Limit: Do NOT exceed {currentGuide.dangerThreshold} DPI!</span>
            </div>
            <p className="text-[11px] text-zinc-400 pl-5 leading-relaxed">
              Setting DPI higher than +80 above stock can cause the phone UI to shrink into a
              blank screen requiring a factory reset. Stick to our verified safe value of{' '}
              <strong className="text-amber-400">{safeDpi}</strong>.
            </p>
          </div>
        </div>

        {/* Step-by-Step Navigation Guide */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="font-bold text-zinc-200 block mb-1">
              Step 1: Unlock Developer Options
            </span>
            <div className="space-y-1.5 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-zinc-300">
              {currentGuide.unlockSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-bold">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-zinc-200 block mb-1">
              Step 2: Enter Safe DPI (Smallest Width)
            </span>
            <div className="space-y-1.5 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-zinc-300">
              {currentGuide.dpiLocation.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-zinc-200 block mb-1">
              Step 3: Android Pointer Speed Calibration
            </span>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-zinc-300 space-y-1">
              <p>{currentGuide.pointerSpeedLocation}</p>
              <p className="text-[11px] text-amber-400 font-semibold">
                👉 Recommended: Move slider to 80% (Center + 3 notches to the right).
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-all"
        >
          Got it, Close Guide
        </button>
      </div>
    </div>
  );
};
