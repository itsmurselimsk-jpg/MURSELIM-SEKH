import React from 'react';
import {
  Smartphone,
  Zap,
  Crosshair,
  Wrench,
  Play,
  Code2,
  Target,
  Download,
  Users,
  Swords,
  Scale,
  Flame,
  Crown,
  Volume2,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { SensiScale } from '../types/sensi';
import { soundFx } from '../utils/audioEffects';

export type NavTabType =
  | 'calculator'
  | 'ffsettings'
  | 'vippanel'
  | 'headshot90'
  | 'proaim'
  | 'characters'
  | 'customroom'
  | 'crosshair'
  | 'compare'
  | 'fixer'
  | 'code'
  | 'weapons'
  | 'trainer'
  | 'hud'
  | 'pro'
  | 'latency'
  | 'saved';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  scale: SensiScale;
  setScale: (s: SensiScale) => void;
  onDetectDevice: () => void;
  onOpenGameLauncher: () => void;
  onOpenApkModal: () => void;
  onOpenGitHubModal?: () => void;
  isInstalled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  scale,
  setScale,
  onDetectDevice,
  onOpenGameLauncher,
  onOpenApkModal,
  onOpenGitHubModal,
  isInstalled,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-black font-extrabold text-lg">
            FF
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white block leading-none">
              SensiPro A-Z
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mt-1">
              Free Fire Engine
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop scrollable/responsive) */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Calculator
          </button>

          <button
            onClick={() => setActiveTab('ffsettings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ffsettings'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 border border-amber-300 shadow-md shadow-amber-500/30'
                : 'text-amber-400 hover:text-amber-300 hover:bg-zinc-900 border border-amber-500/20'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>FF Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('vippanel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vippanel'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white border border-amber-400 shadow-md shadow-red-500/30'
                : 'text-amber-400 hover:text-amber-300 hover:bg-zinc-900 border border-amber-500/30'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>VIP Panel</span>
          </button>

          <button
            onClick={() => setActiveTab('headshot90')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'headshot90'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white border border-red-500 shadow-md shadow-red-500/30'
                : 'text-red-400 hover:text-red-300 hover:bg-zinc-900 border border-red-500/20'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>90% Headshot Lock</span>
          </button>

          <button
            onClick={() => setActiveTab('proaim')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'proaim'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-amber-400/90 hover:text-amber-300 hover:bg-zinc-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Pro-Aim</span>
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'characters'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Characters</span>
          </button>

          <button
            onClick={() => setActiveTab('customroom')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'customroom'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Room</span>
          </button>

          <button
            onClick={() => setActiveTab('crosshair')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'crosshair'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            <span>Crosshair</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'compare'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => setActiveTab('fixer')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'fixer'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Fixer</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'code'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>HUD Code</span>
          </button>

          <button
            onClick={() => setActiveTab('weapons')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'weapons'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Weapons
          </button>

          <button
            onClick={() => setActiveTab('trainer')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'trainer'
                ? 'bg-zinc-800 text-red-400 border border-red-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Trainer
          </button>

          <button
            onClick={() => setActiveTab('hud')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'hud'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            HUD
          </button>

          <button
            onClick={() => setActiveTab('pro')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'pro'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Pro
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'saved'
                ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Saved
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* SFX Audio Test Button */}
          <button
            onClick={() => {
              soundFx.playHeadshot();
              soundFx.playHologramLaser();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 active:scale-95 transition-all shadow-sm"
            title="Test 3D Laser & Headshot Sound Effects"
          >
            <Volume2 className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline font-mono">SFX</span>
          </button>

          {/* GitHub / Download Code Button */}
          {onOpenGitHubModal && (
            <button
              onClick={onOpenGitHubModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all whitespace-nowrap"
              title="Download Source Code / GitHub Push Guide"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">GitHub / ZIP</span>
              <span className="sm:hidden">ZIP</span>
            </button>
          )}

          {/* Install APK Button */}
          <button
            onClick={() => {
              soundFx.playHeadshot();
              onOpenApkModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 border border-emerald-400 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 whitespace-nowrap"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📥 Install APK</span>
          </button>

          {/* Direct Launch Free Fire Button */}
          <button
            onClick={onOpenGameLauncher}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-500 hover:to-amber-500 active:scale-95 transition-all shadow-md shadow-red-600/20 whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Launch FF</span>
            <span className="sm:hidden">FF</span>
          </button>

          {/* Sensi Scale Switcher */}
          <div className="flex items-center p-0.5 bg-zinc-900 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setScale('200')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                scale === '200'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Modern Free Fire OB Update Sensi (0-200 Scale)"
            >
              OB200
            </button>
            <button
              onClick={() => setScale('100')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                scale === '100'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Classic Free Fire Sensi (0-100 Scale)"
            >
              100
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar for Mobile Devices */}
      <div className="xl:hidden flex items-center justify-between px-3 py-2 border-t border-zinc-900 bg-zinc-950 overflow-x-auto scrollbar-none gap-1">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'calculator'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('ffsettings')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-black flex items-center gap-1 ${
            activeTab === 'ffsettings'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-bold shadow-sm'
              : 'text-amber-400 bg-amber-500/10'
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span>FF Settings</span>
        </button>
        <button
          onClick={() => setActiveTab('vippanel')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-black flex items-center gap-1 ${
            activeTab === 'vippanel'
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-sm'
              : 'text-amber-400 bg-amber-500/10'
          }`}
        >
          <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>VIP Panel</span>
        </button>
        <button
          onClick={() => setActiveTab('headshot90')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-black flex items-center gap-1 ${
            activeTab === 'headshot90'
              ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm'
              : 'text-red-400 bg-red-500/10'
          }`}
        >
          <Flame className="w-3 h-3 text-red-400 fill-red-400" />
          <span>90% Headshot</span>
        </button>
        <button
          onClick={() => setActiveTab('proaim')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'proaim'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-amber-400/90 font-bold'
          }`}
        >
          Pro-Aim
        </button>
        <button
          onClick={() => setActiveTab('characters')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'characters'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab('customroom')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'customroom'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Room
        </button>
        <button
          onClick={() => setActiveTab('crosshair')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'crosshair'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Crosshair
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'compare'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Compare
        </button>
        <button
          onClick={() => setActiveTab('fixer')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'fixer'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Fixer
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'code'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          HUD
        </button>
        <button
          onClick={() => setActiveTab('weapons')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'weapons'
              ? 'bg-amber-500/20 text-amber-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Guns
        </button>
        <button
          onClick={() => setActiveTab('trainer')}
          className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium ${
            activeTab === 'trainer'
              ? 'bg-red-500/20 text-red-400 font-bold'
              : 'text-zinc-400'
          }`}
        >
          Trainer
        </button>
      </div>
    </header>
  );
};
