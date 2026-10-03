import React from 'react';
import { Target, Flame, Cpu, CheckCircle, Crosshair, ArrowUp, AlertCircle } from 'lucide-react';

interface TechniqueGuideProps {
  lang: 'hi' | 'en';
}

export const TechniqueGuide: React.FC<TechniqueGuideProps> = ({ lang }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5">
        <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">
          {lang === 'hi' ? 'सीक्रेट हेडशॉट ट्रिक्स और गाइड' : 'Pro Headshot Secrets & Lag Fix'}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
          {lang === 'hi' ? 'ड्रैग हेडशॉट कैसे मारें? (हर गन के साथ)' : 'Master Free Fire Drag Mechanics'}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          {lang === 'hi'
            ? 'सिर्फ सेन्सी रखने से हेडशॉट नहीं लगता—अंगूठे का ड्रैग एंगल, क्रॉसहेयर पोजीशन और गन रीलोड टाइमिंग का सही तालमेल होना जरूरी है। नीचे दिए गए रूल्स को फॉलो करें:'
            : 'Sensitivity is only 50% of the game. Thumb drag geometry, crosshair placement, and recoil timing form the other 50%.'}
        </p>
      </div>

      {/* 3 Core Drag Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Technique 1: Straight Drag */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
            <ArrowUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? '1. सीधा ड्रैग (Straight Drag)' : '1. Straight Drag'}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === 'hi'
              ? 'जब दुश्मन 15 से 40 मीटर की दूरी पर सीधा खड़ा हो या आपकी दिशा में आ रहा हो। फायर बटन को बिना मुड़े एकदम सीधी लाइन में ऊपर स्वाइप करें।'
              : 'Ideal for mid & long ranges. When the enemy is standing still or running straight toward you, drag the fire button straight up in a single fast stroke.'}
          </p>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300">
            <strong className="text-amber-400">{lang === 'hi' ? 'बेस्ट गन्स:' : 'Best Weapons:'}</strong>{' '}
            Woodpecker, SVD, Desert Eagle, AK47, SCAR.
          </div>
        </div>

        {/* Technique 2: J-Drag */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 font-black">
            <span className="text-xl font-black font-mono">J</span>
          </div>
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? '2. J-शेप ड्रैग (J-Drag)' : '2. J-Shape Drag'}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === 'hi'
              ? 'जब दुश्मन दाएं या बाएं दिशा में स्प्रिंट कर रहा हो। फायर बटन को पहले थोड़ा सा नीचे लाएं और फिर बिजली की तेजी से दुश्मन की दिशा में अंग्रेजी के "J" की तरह घुमाएं।'
              : 'Used when the opponent is sprinting sideways across your screen. Whip the button slightly down then curve it upward in a "J" arc following their vector.'}
          </p>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300">
            <strong className="text-red-400">{lang === 'hi' ? 'बेस्ट गन्स:' : 'Best Weapons:'}</strong>{' '}
            M1887, UMP, MP40, MAG-7, Thompson.
          </div>
        </div>

        {/* Technique 3: Rotation Drag */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black">
            <Crosshair className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? '3. रोटेशन ड्रैग (Rotation Drag)' : '3. Rotation Drag'}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === 'hi'
              ? 'क्लोज-रेंज में जब दुश्मन आपके बिल्कुल सिर पर आ जाए। क्रॉसहेयर को सफेद रखें (शरीर पर लाल लॉक न होने दें) और जंप करते ही फायर बटन को सर्कुलर मोशन में ड्रैग करें।'
              : 'Vital for point-blank shotgun battles. Keep the crosshair white beside the enemy, jump, and rotate the fire button sharply into the skull.'}
          </p>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300">
            <strong className="text-blue-400">{lang === 'hi' ? 'बेस्ट गन्स:' : 'Best Weapons:'}</strong>{' '}
            M1014, M1887, Charge Buster, Desert Eagle.
          </div>
        </div>
      </div>

      {/* Crosshair Secret: White vs Red */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          {lang === 'hi'
            ? 'सबसे बड़ा सीक्रेट: व्हाइट क्रॉसहेयर vs रेड लॉक'
            : 'The Ultimate Secret: White Crosshair vs Red Aim Lock'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <span className="text-red-400 font-bold block mb-1">
              ❌ {lang === 'hi' ? 'आम गलती (Red Lock Drag):' : 'Common Mistake (Red Lock):'}
            </span>
            <p className="text-zinc-400 leading-relaxed">
              {lang === 'hi'
                ? 'अगर आप क्रॉसहेयर को सीधे दुश्मन की छाती पर ले जाकर रेड कर लेते हैं, तो फ्री फायर का डिफॉल्ट एम-असिस्ट गोली को छाती पर चिपका देता है। वहां से ड्रैग करने पर बॉडी शॉट ही लगता है।'
                : 'If your crosshair turns RED on the chest before dragging, Free Fire auto-aim magnetizes to the torso. Dragging from here results in body shots.'}
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-1">
              ✅ {lang === 'hi' ? 'प्रो तरीका (White Crosshair Placement):' : 'Pro Technique (White Crosshair):'}
            </span>
            <p className="text-zinc-400 leading-relaxed">
              {lang === 'hi'
                ? 'क्रॉसहेयर को दुश्मन के कंधे या सिर के पास सफेद (WHITE) रखें। जैसे ही आप ड्रैग शुरू करेंगे, सफेद क्रॉसहेयर सीधे सिर पर जाकर रेड होगा और प्योर 100% हेडशॉट लगेगा!'
                : 'Keep the crosshair near the head/shoulder while still WHITE. As you initiate the drag flick, it snaps straight into the head without getting magnetized to the chest.'}
            </p>
          </div>
        </div>
      </div>

      {/* Low-RAM FPS & Lag-Free Fix */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'hi'
              ? '2GB, 3GB & 4GB फोन के लिए लैग फिक्स और स्मूथ एफपीएस'
              : 'FPS Boost & Lag Fix for 2GB/3GB/4GB Phones'}
          </h3>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {lang === 'hi'
            ? 'अगर आपका फोन लैग करेगा या स्क्रीन फ्रीज होगी, तो आपकी सेन्सी चाहे कितनी भी अच्छी हो, हेडशॉट नहीं लगेगा। इन सेटिंग्स को तुरंत लागू करें:'
            : 'Input lag ruins headshot connection. Follow these optimizations to keep frames high and response instant:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-bold text-zinc-200 block">Graphics: Smooth</span>
            <span className="text-[11px] text-zinc-400">
              {lang === 'hi' ? 'शैडोज़ बंद रखें और ग्राफिक्स स्मूथ रखें' : 'Disable Shadows & High Res'}
            </span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-bold text-zinc-200 block">High FPS: Normal/High</span>
            <span className="text-[11px] text-zinc-400">
              {lang === 'hi' ? 'हमेशा High FPS ऑन रखें (60 FPS)' : 'Always turn High FPS ON'}
            </span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-bold text-zinc-200 block">Clear Cache</span>
            <span className="text-[11px] text-zinc-400">
              {lang === 'hi' ? 'गेम की सेटिंग्स में जाकर कैश डिलीट करें' : 'Clear Game Cache before ranked'}
            </span>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-bold text-zinc-200 block">Clean Screen</span>
            <span className="text-[11px] text-zinc-400">
              {lang === 'hi' ? 'स्क्रीन पर थोड़ा सा पाउडर या फिंगर स्लीव लगाएं' : 'Use finger sleeves or talcum'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
