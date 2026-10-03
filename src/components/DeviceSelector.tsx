import React, { useState } from 'react';
import {
  DeviceBrand,
  DeviceInfo,
  FingerGrip,
  Playstyle,
  RamTier,
  RefreshRate,
  ScreenSize,
  TouchSamplingRate,
} from '../types/sensi';
import { BRANDS, ALL_DEVICES_DATABASE } from '../data/deviceDatabase';
import { Cpu, Search, Flame, Zap, Check, Smartphone, Plus } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface DeviceSelectorProps {
  brand: DeviceBrand;
  setBrand: (b: DeviceBrand) => void;
  model: string;
  setModel: (m: string) => void;
  ram: RamTier;
  setRam: (r: RamTier) => void;
  refreshRate: RefreshRate;
  setRefreshRate: (rr: RefreshRate) => void;
  touchSampling: TouchSamplingRate;
  setTouchSampling: (ts: TouchSamplingRate) => void;
  screenSize: ScreenSize;
  setScreenSize: (s: ScreenSize) => void;
  playstyle: Playstyle;
  setPlaystyle: (p: Playstyle) => void;
  grip: FingerGrip;
  setGrip: (g: FingerGrip) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  brand,
  setBrand,
  model,
  setModel,
  ram,
  setRam,
  refreshRate,
  setRefreshRate,
  touchSampling,
  setTouchSampling,
  screenSize,
  setScreenSize,
  playstyle,
  setPlaystyle,
  grip,
  setGrip,
}) => {
  const [modelSearch, setModelSearch] = useState('');
  const [showCustomModelInput, setShowCustomModelInput] = useState(false);
  const [customModelName, setCustomModelName] = useState('');

  // Global search across all devices if search input has 2+ characters, otherwise filter by brand
  const matchingModels = modelSearch.trim().length >= 2
    ? ALL_DEVICES_DATABASE.filter((d) =>
        d.model.toLowerCase().includes(modelSearch.toLowerCase()) ||
        d.brand.toLowerCase().includes(modelSearch.toLowerCase())
      )
    : ALL_DEVICES_DATABASE.filter((d) => d.brand === brand);

  const handleSelectModel = (dev: DeviceInfo) => {
    soundFx.playClick();
    setBrand(dev.brand);
    setModel(dev.model);
    setRam(dev.defaultRam);
    setRefreshRate(dev.defaultRefreshRate);
    setTouchSampling(dev.defaultTouchSampling);
    setScreenSize(dev.defaultScreenSize);
  };

  const handleAddCustomModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customModelName.trim()) return;
    soundFx.playClick();
    setModel(customModelName.trim());
    setShowCustomModelInput(false);
    setCustomModelName('');
  };

  const playstyleOptions: {
    id: Playstyle;
    title: string;
    desc: string;
    guns: string;
  }[] = [
    {
      id: 'onetap',
      title: 'One-Tap Headshot',
      desc: 'Maximized initial flick acceleration for single-shot headshot knocks',
      guns: 'M1887, Desert Eagle, Woodpecker, M1014',
    },
    {
      id: 'smg_rusher',
      title: 'SMG Drag Rusher',
      desc: 'Smooth vertical tracking for high-fire-rate spray transfers and close entry',
      guns: 'MP40, UMP, Thompson, Bizon, MP5',
    },
    {
      id: 'allrounder',
      title: 'Balanced All-Rounder',
      desc: 'Default esports tournament calibration for Clash Squad and Battle Royale',
      guns: 'M4A1, SCAR, MP40, Shotguns, DMRs',
    },
    {
      id: 'ar_marksman',
      title: 'AR Marksman / Mid-Range',
      desc: 'Recoil-stabilized tracking for 2X & 4X scope laser sprays across 20-50m',
      guns: 'AK47, SCAR, Woodpecker, Groza, AUG',
    },
    {
      id: 'sniper',
      title: 'Sniper Quick-Switch',
      desc: 'Zero-jitter sniper scope calibration for pinpoint double sniper mechanics',
      guns: 'AWM, M82B, Kar98k, Barrett',
    },
  ];

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
      {/* Step 1: Brand Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Select Device Brand</span>
          </label>
          <span className="text-xs text-zinc-400 font-mono">
            {ALL_DEVICES_DATABASE.length}+ Verified Models
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => {
                soundFx.playClick();
                setBrand(b);
                const first = ALL_DEVICES_DATABASE.find((d) => d.brand === b);
                if (first) {
                  handleSelectModel(first);
                } else {
                  setModel(`${b} Custom Model`);
                }
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all truncate ${
                brand === b
                  ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Model Search & Quick Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Search or Pick Phone Model</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCustomModelInput(!showCustomModelInput)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Custom Phone</span>
            </button>
            <span className="text-xs text-amber-400 font-semibold truncate max-w-[200px]">
              Active: {model}
            </span>
          </div>
        </div>

        {/* Custom Model Input Modal/Form */}
        {showCustomModelInput && (
          <form
            onSubmit={handleAddCustomModel}
            className="mb-3 p-3 bg-zinc-950 border border-amber-500/40 rounded-xl flex gap-2"
          >
            <input
              type="text"
              value={customModelName}
              onChange={(e) => setCustomModelName(e.target.value)}
              placeholder="Type any unlisted phone model (e.g. Lava Blaze, Micromax IN, Honor 90)..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg hover:bg-amber-400"
            >
              Set Device
            </button>
          </form>
        )}

        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              placeholder="Search 200+ models (e.g. S24 Ultra, Redmi Note 13, X6 Pro, iPhone 16, GT 20, Nord)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
            />
            {modelSearch && (
              <button
                onClick={() => setModelSearch('')}
                className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Model Chips Carousel */}
          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1.5 bg-zinc-950/60 rounded-xl border border-zinc-900 scrollbar-thin">
            {matchingModels.slice(0, 24).map((m) => (
              <button
                key={m.model}
                onClick={() => handleSelectModel(m)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all text-left truncate flex items-center gap-1.5 ${
                  model === m.model
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                    : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span>{m.model}</span>
                <span className="text-[10px] font-mono text-zinc-400">({m.defaultRam})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Hardware Specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-zinc-800">
        {/* RAM */}
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Device RAM
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB+'] as RamTier[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  soundFx.playClick();
                  setRam(r);
                }}
                className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                  ram === r
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Screen Refresh Rate */}
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Refresh Rate (Hz)
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['60Hz', '90Hz', '120Hz', '144Hz', '165Hz+'] as RefreshRate[]).map((rr) => (
              <button
                key={rr}
                onClick={() => {
                  soundFx.playClick();
                  setRefreshRate(rr);
                }}
                className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                  refreshRate === rr
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {rr}
              </button>
            ))}
          </div>
        </div>

        {/* Touch Sampling Rate */}
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Touch Sampling
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['120Hz', '180Hz', '240Hz', '300Hz', '360Hz', '480Hz+'] as TouchSamplingRate[]).map((ts) => (
              <button
                key={ts}
                onClick={() => {
                  soundFx.playClick();
                  setTouchSampling(ts);
                }}
                className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                  touchSampling === ts
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>

        {/* Hand Grip / Claw Setup */}
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Finger Grip / Claw
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: '2finger', label: '2-Finger' },
              { id: '3finger', label: '3-Claw' },
              { id: '4finger', label: '4-Claw' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  soundFx.playClick();
                  setGrip(g.id as FingerGrip);
                }}
                className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                  grip === g.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 4: Playstyle Selection */}
      <div className="pt-2 border-t border-zinc-800">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Flame className="w-3.5 h-3.5 text-red-500" />
          <span>3. Select Preferred Combat Playstyle</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {playstyleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundFx.playClick();
                setPlaystyle(opt.id);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                playstyle === opt.id
                  ? 'bg-zinc-800 border-amber-500 text-white ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold ${playstyle === opt.id ? 'text-amber-400' : 'text-zinc-200'}`}>
                    {opt.title}
                  </span>
                  {playstyle === opt.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
              <div className="mt-2.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 truncate">
                {opt.guns}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
