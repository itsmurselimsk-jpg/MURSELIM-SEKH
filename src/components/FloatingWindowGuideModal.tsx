import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  Flame,
  ExternalLink,
  HelpCircle,
  Laptop,
  Apple,
} from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface FloatingWindowGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchPip: () => void;
  deviceModel: string;
}

type BrandCategory =
  | 'universal'
  | 'samsung'
  | 'xiaomi'
  | 'realme_oppo'
  | 'vivo_iqoo'
  | 'oneplus'
  | 'infinix_tecno'
  | 'pixel_moto'
  | 'iphone'
  | 'pc';

export const FloatingWindowGuideModal: React.FC<FloatingWindowGuideModalProps> = ({
  isOpen,
  onClose,
  onLaunchPip,
  deviceModel,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandCategory>('universal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-red-500/60 rounded-3xl p-5 sm:p-6 max-w-xl w-full space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-6 text-zinc-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute right-4 top-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pb-3 border-b border-zinc-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-red-500/30 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              Sabhi Phone Me Bahar Float Kaise Karein? (Over Free Fire)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Current Model:{' '}
              <span className="font-mono text-amber-400 font-bold">{deviceModel || 'All Android Devices'}</span>
            </p>
          </div>
        </div>

        {/* UNIVERSAL 1-CLICK PIP FLOATING WINDOW (WORKS ON ALL PHONES) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-950 border-2 border-emerald-500/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4" />
              <span>⚡ 1-Tap Universal Floating Overlay (Har Phone Ke Liye)</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
              UNIVERSAL
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Samsung, Redmi, Realme, Vivo, OnePlus, Oppo, Infinix, Tecno, Poco, Moto — kisi bhi mobile me ye button dabate hi panel <strong>phone screen par bahar nikal kar Free Fire ke upar float karne lagega!</strong>
          </p>

          <button
            onClick={() => {
              soundFx.playHeadshot();
              onLaunchPip();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-zinc-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <Layers className="w-4 h-4 stroke-[2.5]" />
            <span>📺 POP OUT FLOATING OVERLAY NOW (Sabhi Mobile Ke Liye)</span>
          </button>
        </div>

        {/* BRAND SELECTION TABS */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-zinc-400 block uppercase font-mono tracking-wider">
            👉 Apne Phone Ka Brand Chunein (Company Ke Direct Floating Features):
          </label>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {[
              { id: 'universal', label: '🌟 All Brands' },
              { id: 'samsung', label: 'Samsung (One UI)' },
              { id: 'xiaomi', label: 'Redmi / POCO / Xiaomi' },
              { id: 'realme_oppo', label: 'Realme & Oppo' },
              { id: 'vivo_iqoo', label: 'Vivo & iQOO' },
              { id: 'oneplus', label: 'OnePlus' },
              { id: 'infinix_tecno', label: 'Infinix & Tecno' },
              { id: 'pixel_moto', label: 'Moto & Pixel' },
              { id: 'iphone', label: 'iPhone / iOS' },
              { id: 'pc', label: 'PC / BlueStacks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedBrand(tab.id as BrandCategory);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedBrand === tab.id
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* BRAND SPECIFIC DETAILED GUIDES */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          {selectedBrand === 'universal' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-amber-400 font-mono uppercase">
                Sabhi Android Phones Ke Liye 2 Asaan Tareeqe:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="font-bold text-emerald-400 block mb-1">Tareeqa A: 1-Tap PiP Button</span>
                  <span>Upar diye gaye <strong>"POP OUT FLOATING OVERLAY"</strong> button par tap karein. Ye automatic phone screen par mini player bankar float karega.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="font-bold text-amber-400 block mb-1">Tareeqa B: Android Split Screen / Pop-Up</span>
                  <span>Recent Apps screen kholein → App icon par tap karein → <strong>"Open in Pop-up view"</strong> ya <strong>"Split screen"</strong> select karein. Ek taraf Free Fire chalega, doosri taraf Sensi Panel!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'samsung' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-blue-400 font-mono uppercase">
                Samsung Galaxy (One UI) - Pop-Up View Guide:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Recent Apps kholein (niche se 3 lines ya swipe up).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>Upar Chrome / Sensi app ke round icon par tap karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span><strong>"Open in pop-up view"</strong> select karein — app ek transparent floating window ban jayega!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                  <span>Free Fire start karein, ye window game ke upar rahegi aur aap iska size aur transparency bhi adjust kar sakte hain!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'xiaomi' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-orange-400 font-mono uppercase">
                Redmi, POCO & Xiaomi (HyperOS / MIUI) - Floating Windows:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Niche se swipe up karke hold karein (Recent Apps screen kholein).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>App window par <strong>Long press (dabaye rakhein)</strong> aur <strong>Floating Window icon (do chote dabbe)</strong> dabayein, ya top-left me <strong>"Floating windows"</strong> par tap karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>Yeh floating bubble ban jayega jo Free Fire ke upar permanently rehta hai!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'realme_oppo' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-yellow-400 font-mono uppercase">
                Realme & Oppo (Realme UI / ColorOS) - Flexible / Mini Window:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Recent Apps kholein → Top right me <strong>2 Dots (:)</strong> par tap karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span><strong>"Floating Window"</strong> ya <strong>"Mini Window"</strong> par click karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>Aap side me se <strong>"Smart Sidebar"</strong> kholkar bhi direct floating window on kar sakte hain!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'vivo_iqoo' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-cyan-400 font-mono uppercase">
                Vivo & iQOO (Funtouch OS) - Small Window & Game Mode:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Recent Apps me jayein → App ke naam ke side me arrow ya icon par tap karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span><strong>"Small Window"</strong> chunein. App screen par chhota box ban jayega.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>Vivo Ultra Game Mode ke sidebar me bhi floating apps add kar sakte hain!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'oneplus' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-red-400 font-mono uppercase">
                OnePlus (OxygenOS) - Flexible Windows:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Recent Apps me jayein aur Chrome / SensiApp card ke upar <strong>3 Dots</strong> dabayein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span><strong>"Floating Window"</strong> select karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>Ab Free Fire open karein, panel side me mini icon ban jayega jise tap karke kabhi bhi bada kar sakte hain!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'infinix_tecno' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-green-400 font-mono uppercase">
                Infinix & Tecno (XOS / HiOS) - Lightning Multi-Window:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Side se <strong>Smart Panel</strong> swipe karein ya Recent Apps me app icon par click karein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span><strong>"Floating Window"</strong> par tap karein. Free Fire ke sath easily multitasking karein!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'pixel_moto' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-purple-400 font-mono uppercase">
                Motorola, Google Pixel & Stock Android:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Upar diye gaye <strong>"POP OUT FLOATING OVERLAY"</strong> button par tap karein. Android PiP mode automatic enable ho jayega!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>Ya Recent Apps me jakar App icon par tap karein aur <strong>"Split top"</strong> karein!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'iphone' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-zinc-300 font-mono uppercase">
                iPhone & iPad (iOS) - Picture-in-Picture:
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Safari me <strong>"POP OUT FLOATING OVERLAY"</strong> button dabayein.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-700 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>Niche se swipe up karke Free Fire kholein — floating panel iOS screen par overlay rahega!</span>
                </div>
              </div>
            </div>
          )}

          {selectedBrand === 'pc' && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-emerald-400 font-mono uppercase">
                PC & Emulators (BlueStacks, LDPlayer, MSI App Player):
              </h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span><strong>"POP OUT FLOATING OVERLAY"</strong> dabayein. Windows/Mac par PiP mini window ban jayegi.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>Ye window <strong>Always on Top</strong> rehti hai, toh BlueStacks / Free Fire ke bilkul upar float karti rahegi!</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-all"
        >
          Samajh Gaya, Shuru Karein! (Close)
        </button>
      </div>
    </div>
  );
};
