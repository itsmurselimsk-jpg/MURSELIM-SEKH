import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Zap,
  X,
  Minimize2,
  Maximize2,
  Play,
  RotateCcw,
  Target,
  Sparkles,
  ShieldCheck,
  Crosshair,
  Volume2,
  Layers,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { SensiValues } from '../types/sensi';
import { soundFx } from '../utils/audioEffects';
import { launchFreeFire } from '../utils/freeFireLauncher';
import { pipOverlayEngine } from '../utils/pipOverlayEngine';
import { FloatingWindowGuideModal } from './FloatingWindowGuideModal';

interface FloatingVipWidgetProps {
  sensi: SensiValues;
  setSensi: React.Dispatch<React.SetStateAction<SensiValues>>;
  fireButtonSize: number;
  model: string;
  onClose: () => void;
}

export const FloatingVipWidget: React.FC<FloatingVipWidgetProps> = ({
  sensi,
  setSensi,
  fireButtonSize,
  model,
  onClose,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? Math.max(10, window.innerWidth - 320) : 20,
    y: 90,
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  const [fps, setFps] = useState(120);
  const [ping, setPing] = useState(18);
  const [boosted, setBoosted] = useState(false);
  const [headshotLock, setHeadshotLock] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [pipActive, setPipActive] = useState(false);

  // Touch and mouse drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const deltaX = clientX - dragRef.current.startX;
      const deltaY = clientY - dragRef.current.startY;

      const newX = Math.max(5, Math.min(window.innerWidth - 70, dragRef.current.posX + deltaX));
      const newY = Math.max(5, Math.min(window.innerHeight - 70, dragRef.current.posY + deltaY));
      setPosition({ x: newX, y: newY });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const handleBoost = () => {
    soundFx.playSuccess();
    setBoosted(true);
    setFps(120);
    setPing(14);
    setTimeout(() => setBoosted(false), 3000);
  };

  const handleLaunch = () => {
    soundFx.playHeadshot();
    // Also trigger PiP so it floats outside when game opens
    pipOverlayEngine.startPictureInPicture(sensi, model, fireButtonSize).catch(() => {});
    launchFreeFire('max');
  };

  const handlePopOutPip = async () => {
    soundFx.playHeadshot();
    soundFx.playHologramLaser();
    const success = await pipOverlayEngine.startPictureInPicture(sensi, model, fireButtonSize);
    if (success) {
      setPipActive(true);
    } else {
      // Show Redmi Floating Window guide
      setIsGuideOpen(true);
    }
  };

  if (minimized) {
    return (
      <div
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className="fixed z-50 flex items-center gap-1.5 p-2 rounded-2xl bg-zinc-950/95 border-2 border-red-500 shadow-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
      >
        <button
          onClick={() => {
            soundFx.playClick();
            setMinimized(false);
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-red-600/30 text-red-400 font-bold text-xs"
        >
          <Flame className="w-3.5 h-3.5 fill-red-400" />
          <span>VIP PANEL</span>
        </button>
        <button
          onClick={handlePopOutPip}
          className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-950/40"
          title="Float Outside (PiP)"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="p-1 rounded-lg text-zinc-500 hover:text-white"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className="fixed z-50 w-72 sm:w-80 bg-zinc-950/95 border-2 border-red-500/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden select-none"
      >
        {/* Draggable Titlebar */}
        <div
          onTouchStart={handleTouchStart}
          onMouseDown={handleTouchStart}
          className="bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 px-3.5 py-2.5 flex items-center justify-between border-b border-red-500/40 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-xs font-black text-white tracking-wider uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>VIP PANEL v4.9</span>
            </span>
            <span className="text-[9px] bg-red-600/30 text-red-300 px-1.5 py-0.5 rounded border border-red-500/40 font-mono">
              OVERLAY
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePopOutPip}
              className="p-1 rounded text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40"
              title="Pop Out Floating Window (Over Game)"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="p-1 rounded text-amber-400 hover:text-amber-300 hover:bg-zinc-800"
              title="How to Float Outside"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMinimized(true);
              }}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
              title="Minimize"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Widget Body */}
        <div className="p-3.5 space-y-3">
          {/* Device & Diagnostics Bar */}
          <div className="flex items-center justify-between bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800 text-[11px] font-mono">
            <span className="text-zinc-400 truncate max-w-[120px]">{model}</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{fps} FPS</span>
              <span className="text-amber-400 font-bold">{ping}ms</span>
            </div>
          </div>

          {/* Quick Headshot Lock & Macro Switch */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                soundFx.playClick();
                setHeadshotLock(!headshotLock);
              }}
              className={`p-2 rounded-xl border flex items-center justify-between font-bold transition-all ${
                headshotLock
                  ? 'bg-red-950/70 border-red-500 text-red-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-red-400" />
                <span>99% Auto-Head</span>
              </div>
              <span className="text-[10px] font-mono">
                {headshotLock ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={handleBoost}
              className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                boosted
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{boosted ? 'Cleaned!' : 'RAM Boost'}</span>
            </button>
          </div>

          {/* Quick Sensi Adjusters */}
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">General Sensi:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSensi((prev) => ({ ...prev, general: Math.max(0, prev.general - 2) }));
                  }}
                  className="w-6 h-6 rounded bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-black text-amber-400">
                  {sensi.general}
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSensi((prev) => ({ ...prev, general: Math.min(200, prev.general + 2) }));
                  }}
                  className="w-6 h-6 rounded bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Red Dot Lock:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSensi((prev) => ({ ...prev, redDot: Math.max(0, prev.redDot - 2) }));
                  }}
                  className="w-6 h-6 rounded bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-black text-red-400">
                  {sensi.redDot}
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSensi((prev) => ({ ...prev, redDot: Math.min(200, prev.redDot + 2) }));
                  }}
                  className="w-6 h-6 rounded bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* POP OUT / FLOAT OUTSIDE BUTTON */}
          <button
            onClick={handlePopOutPip}
            className="w-full py-2.5 px-3 rounded-xl font-black text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>🪟 BAHAR FLOAT KAREIN (Har Phone Ke Liye)</span>
          </button>

          <button
            onClick={() => setIsGuideOpen(true)}
            className="w-full py-1.5 px-3 rounded-xl text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Samsung, Realme, Vivo, Poco, Moto Guide</span>
          </button>

          {/* Launch FF Button */}
          <button
            onClick={handleLaunch}
            className="w-full py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>LAUNCH FREE FIRE NOW</span>
          </button>
        </div>
      </div>

      {/* Guide Modal */}
      <FloatingWindowGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onLaunchPip={handlePopOutPip}
        deviceModel={model}
      />
    </>
  );
};
