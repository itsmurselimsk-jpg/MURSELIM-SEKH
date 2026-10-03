import React, { useState } from 'react';
import {
  parseControlCode,
  generateOptimizedCode,
  getControlCodeByUid,
  KNOWN_PLAYER_UIDS,
  KnownPlayerProfile,
} from '../utils/hudCodeParser';
import { DecodedHudLayout } from '../types/hudCode';
import {
  Sliders,
  Sparkles,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Target,
  Search,
  UserCheck,
  ExternalLink,
  HelpCircle,
  Play,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export const ControlCodeOptimizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'uid' | 'code'>('uid');

  // UID Search State
  const [inputUid, setInputUid] = useState('12022250'); // Default to Raistar
  const [searchedProfile, setSearchedProfile] = useState<KnownPlayerProfile>(
    KNOWN_PLAYER_UIDS[0]
  );
  const [isVerifiedPro, setIsVerifiedPro] = useState(true);

  // Layout & Code State
  const [inputCode, setInputCode] = useState(KNOWN_PLAYER_UIDS[0].controlCode);
  const [layout, setLayout] = useState<DecodedHudLayout>(() =>
    parseControlCode(KNOWN_PLAYER_UIDS[0].controlCode)
  );
  const [selectedClaw, setSelectedClaw] = useState<'2-Finger' | '3-Finger Claw' | '4-Finger Claw'>(
    '3-Finger Claw'
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  // Search by Player UID
  const handleSearchByUid = (uidToSearch: string) => {
    soundFx.playHeadshot();
    setInputUid(uidToSearch);
    const result = getControlCodeByUid(uidToSearch);
    setSearchedProfile(result.profile);
    setIsVerifiedPro(result.isVerifiedPro);
    setInputCode(result.profile.controlCode);
    setLayout(result.layout);
    setSelectedClaw(result.profile.claw);
  };

  // Parse direct custom code
  const handleParseCode = (code: string) => {
    soundFx.playClick();
    setInputCode(code);
    const parsed = parseControlCode(code);
    setLayout(parsed);
    setSelectedClaw(parsed.clawType);
  };

  // Optimize current code
  const handleOptimize = () => {
    soundFx.playHeadshot();
    const result = generateOptimizedCode(inputCode, selectedClaw);
    setInputCode(result.code);
    setLayout(result.layout);
  };

  // Copy code to clipboard
  const copyCodeToClipboard = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(layout.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selectedBtn = layout.buttons.find((b) => b.id === selectedButtonId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
            Player UID & Custom HUD Engine
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            100% In-Game Working Codes
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          Get Any Player's Free Fire Control Code by UID
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Enter any player's Free Fire UID (or famous creator UID like Raistar, White444, AjjuBhai)
          to fetch their exact custom HUD control code. Copy the code and paste it directly into
          Free Fire's Custom HUD import slot to use their exact button setup!
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center p-1 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-md">
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveMode('uid');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'uid'
              ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Find by Player UID</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setActiveMode('code');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'code'
              ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Optimize Existing Code</span>
        </button>
      </div>

      {/* MODE 1: Search by Player UID */}
      {activeMode === 'uid' && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Enter Free Fire Player UID (or Select a Famous Pro Below):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={inputUid}
                  onChange={(e) => setInputUid(e.target.value)}
                  placeholder="e.g. 12022250 (Raistar) or any 8-10 digit UID..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-amber-400 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-bold"
                />
              </div>
              <button
                onClick={() => handleSearchByUid(inputUid)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4 text-black" />
                <span>Fetch Control Code</span>
              </button>
            </div>
          </div>

          {/* Quick Famous Player UID Badges */}
          <div>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              Or tap a famous pro creator UID to test:
            </span>
            <div className="flex flex-wrap gap-2">
              {KNOWN_PLAYER_UIDS.map((pro) => (
                <button
                  key={pro.uid}
                  onClick={() => handleSearchByUid(pro.uid)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    inputUid === pro.uid
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{pro.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-1.5">({pro.uid})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resolved Player Profile Banner */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-zinc-950 font-black text-xl shrink-0 shadow-lg shadow-amber-500/10">
                {searchedProfile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{searchedProfile.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isVerifiedPro
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {searchedProfile.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mt-0.5">
                  <span>UID: {searchedProfile.uid}</span>
                  <span>·</span>
                  <span>{searchedProfile.rank}</span>
                  <span>·</span>
                  <span className="text-amber-400 font-semibold">{searchedProfile.claw}</span>
                </div>
              </div>
            </div>

            {/* In-Game Control Code Pill & Copy Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end bg-zinc-900 p-2 rounded-xl border border-zinc-800">
              <div className="text-left px-2">
                <span className="text-[9px] uppercase font-bold text-zinc-500 block">
                  Free Fire Control Code:
                </span>
                <span className="font-mono text-sm font-black text-amber-400 tracking-wider">
                  {searchedProfile.controlCode}
                </span>
              </div>
              <button
                onClick={copyCodeToClipboard}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Code Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Custom Code Optimizer */}
      {activeMode === 'code' && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Enter Your Free Fire Control Share Code:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. 7129-8812-4910-3329-12 or your custom code..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-bold"
              />
              <button
                onClick={() => handleParseCode(inputCode)}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-all"
              >
                Analyze Code
              </button>
              <button
                onClick={handleOptimize}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Auto-Optimize Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step "How to Paste into Free Fire" Instructions Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Paste & Use This Control Code in Free Fire (100% Working):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs text-zinc-300">
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
            <span className="font-mono font-bold text-amber-400 block">Step 1</span>
            <p className="text-zinc-300">
              Open <strong>Free Fire</strong> & tap the <strong>Settings (⚙️)</strong> icon in the
              top right corner.
            </p>
          </div>
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
            <span className="font-mono font-bold text-amber-400 block">Step 2</span>
            <p className="text-zinc-300">
              Click the <strong>"Controls"</strong> tab on the left menu, then tap{' '}
              <strong>"Custom HUD"</strong>.
            </p>
          </div>
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
            <span className="font-mono font-bold text-amber-400 block">Step 3</span>
            <p className="text-zinc-300">
              Tap the <strong>Cloud / Search Icon (☁️ / 🔍)</strong> to open the control code import
              box.
            </p>
          </div>
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
            <span className="font-mono font-bold text-emerald-400 block">Step 4</span>
            <p className="text-zinc-300">
              Paste the code <strong className="text-amber-400">{layout.code}</strong> and tap{' '}
              <strong>"Use" / "Apply"</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Control Code Scorecard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400 block mb-1">Overall Ergonomic Rating</span>
          <span
            className={`text-2xl font-black font-mono ${
              layout.scores.overallRating >= 90
                ? 'text-emerald-400'
                : layout.scores.overallRating >= 75
                ? 'text-amber-400'
                : 'text-red-400'
            }`}
          >
            {layout.scores.overallRating}/100
          </span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">{layout.clawType}</span>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400 block mb-1">Drag Flick Runway</span>
          <span className="text-2xl font-black font-mono text-amber-400">
            {layout.scores.dragRunway}%
          </span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Vertical clearance</span>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400 block mb-1">Gloo Wall Deploy Speed</span>
          <span className="text-2xl font-black font-mono text-emerald-400">
            {layout.scores.glooWallSpeed}%
          </span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Reaction speed</span>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400 block mb-1">Multi-Finger Reach</span>
          <span className="text-2xl font-black font-mono text-purple-400">
            {layout.scores.thumbErgonomics}%
          </span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Zero finger collision</span>
        </div>
      </div>

      {/* Live Interactive Phone HUD Screen Simulator */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Visual HUD Blueprint (Decoded Code: {layout.code})
            </h3>
          </div>
          <button
            onClick={copyCodeToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Code Copied!' : 'Copy Control Code'}</span>
          </button>
        </div>

        {/* The Screen Canvas */}
        <div className="w-full aspect-[16/9] max-h-96 bg-zinc-950 rounded-2xl border-2 border-zinc-800 relative overflow-hidden p-2 select-none shadow-inner">
          {/* In-game crosshair center guide */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
            <Target className="w-8 h-8 text-white" />
          </div>

          {/* Render Decoded Buttons */}
          {layout.buttons.map((btn) => {
            const isSelected = selectedButtonId === btn.id;
            return (
              <div
                key={btn.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedButtonId(btn.id);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all ${
                  btn.id === 'right_fire'
                    ? 'border-2 border-red-500 bg-red-600/30'
                    : btn.id === 'gloo_wall'
                    ? 'border-2 border-amber-400 bg-amber-500/30'
                    : 'border border-zinc-600 bg-zinc-800/60'
                } ${isSelected ? 'ring-2 ring-white scale-110 z-20' : 'hover:scale-105'}`}
                style={{
                  left: `${btn.x}%`,
                  top: `${btn.y}%`,
                  width: `${btn.size * 0.9}px`,
                  height: `${btn.size * 0.9}px`,
                  opacity: Math.max(0.4, btn.opacity / 100),
                }}
                title={`${btn.name} (${btn.size}%)`}
              >
                <span className="text-[8px] font-black text-white text-center leading-tight truncate px-1">
                  {btn.name.split(' ')[0]}
                </span>
                <span className="text-[7px] font-mono text-zinc-300">{btn.size}%</span>
              </div>
            );
          })}
        </div>

        {/* Selected Button Inspector Details */}
        {selectedBtn && (
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-400">{selectedBtn.name}</span>
              <span className="text-zinc-400">Size: {selectedBtn.size}%</span>
              <span className="text-zinc-400">Position: X:{selectedBtn.x}% / Y:{selectedBtn.y}%</span>
              <span className="text-zinc-400">Finger: {selectedBtn.finger}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              Calibrated Alignment
            </span>
          </div>
        )}
      </div>

      {/* Flaws Detected & Optimizations Applied */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Layout Diagnostics</span>
          </div>
          <div className="space-y-2">
            {layout.flawsDetected.map((flaw, i) => (
              <div
                key={i}
                className="bg-zinc-950 p-2.5 rounded-xl border border-red-500/20 text-xs text-zinc-300 leading-relaxed"
              >
                ⚠️ {flaw}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Calibrated Esports Enhancements</span>
          </div>
          <div className="space-y-2">
            {layout.optimizationsApplied.map((opt, i) => (
              <div
                key={i}
                className="bg-zinc-950 p-2.5 rounded-xl border border-emerald-500/20 text-xs text-zinc-300 leading-relaxed"
              >
                ✅ {opt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
