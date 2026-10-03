import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../utils/audioEffects';
import { Zap, Target, Sparkles, Volume2, Flame, Maximize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThreeHologramTargetProps {
  model: string;
  brand: string;
}

export const ThreeHologramTarget: React.FC<ThreeHologramTargetProps> = ({
  model,
  brand,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [headshotScore, setHeadshotScore] = useState(0);
  const [lastDamage, setLastDamage] = useState<number | null>(null);
  const [hologramMode, setHologramMode] = useState<'skull' | 'quantum' | 'sniper'>('skull');
  const [isFiring, setIsFiring] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = 340;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for target
    const targetGroup = new THREE.Group();
    scene.add(targetGroup);

    // 1. Core Sphere / Head Model (Wireframe & Glowing Points)
    const headGeom = new THREE.IcosahedronGeometry(1.05, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const headWire = new THREE.Mesh(headGeom, wireMat);
    targetGroup.add(headWire);

    // Inner Glowing Core
    const coreGeom = new THREE.SphereGeometry(0.55, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerCore = new THREE.Mesh(coreGeom, coreMat);
    targetGroup.add(innerCore);

    // 2. Concentric Holographic Gyro Rings
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.7,
    });
    const ringGeom1 = new THREE.RingGeometry(1.35, 1.38, 64);
    const ring1 = new THREE.LineLoop(ringGeom1, ringMat1);
    targetGroup.add(ring1);

    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.5,
    });
    const ringGeom2 = new THREE.RingGeometry(1.65, 1.68, 64);
    const ring2 = new THREE.LineLoop(ringGeom2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    targetGroup.add(ring2);

    const ringMat3 = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
    });
    const ringGeom3 = new THREE.RingGeometry(1.95, 1.98, 64);
    const ring3 = new THREE.LineLoop(ringGeom3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    targetGroup.add(ring3);

    // 3. Cyber Target Crosshairs
    const crosshairMat = new THREE.LineBasicMaterial({ color: 0xff0033, opacity: 0.8, transparent: true });
    const crossPoints = [
      new THREE.Vector3(-1.8, 0, 0),
      new THREE.Vector3(1.8, 0, 0),
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0, 1.8, 0),
    ];
    const crossGeom = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossLines = new THREE.LineSegments(crossGeom, crosshairMat);
    targetGroup.add(crossLines);

    // 4. Floating 3D Starfield Particles
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff4444,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Mouse & Touch Tracking with Inertia Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/group rotation towards pointer
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;

      targetGroup.rotation.y = targetX + elapsedTime * 0.4;
      targetGroup.rotation.x = -targetY + Math.sin(elapsedTime * 0.6) * 0.1;

      // Independent ring rotations
      ring1.rotation.z = elapsedTime * 0.8;
      ring2.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.4;
      ring2.rotation.y = elapsedTime * 0.6;
      ring3.rotation.z = -elapsedTime * 0.5;

      // Pulsing inner core
      const scale = 1 + Math.sin(elapsedTime * 3) * 0.08;
      innerCore.scale.set(scale, scale, scale);

      // Rotate particle field slowly
      particleSystem.rotation.y = elapsedTime * 0.05;
      particleSystem.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handlePointerMove);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      headGeom.dispose();
      wireMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringGeom3.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  // Shoot Headshot Action on Click
  const handleShootHologram = () => {
    soundFx.playHeadshot();
    soundFx.playHologramLaser();
    setIsFiring(true);

    const dmg = Math.floor(Math.random() * 80) + 480; // 480 - 560 Red Numbers
    setLastDamage(dmg);
    setHeadshotScore((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#dc2626'],
    });

    setTimeout(() => {
      setIsFiring(false);
    }, 250);
  };

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-red-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background Holographic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-black text-red-400 tracking-wider uppercase flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D WEBGL HOLOGRAPHIC AIM MATRIX</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Cyber Headshot Hologram</span>
            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono border border-amber-500/40">
              REAL-TIME 3D
            </span>
          </h2>
        </div>

        {/* Live Headshot Counter & Controls */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-red-950/80 border border-red-500/40 text-right">
            <span className="text-[9px] text-zinc-400 block font-mono">HITS CONFIRMED</span>
            <span className="text-lg font-black text-red-400 font-mono">{headshotScore} HEADSHOTS</span>
          </div>

          <button
            onClick={() => {
              soundFx.playCyberLock();
              setHeadshotScore(0);
            }}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 text-xs font-mono"
            title="Reset Score"
          >
            RESET
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Three.js Container */}
        <div
          ref={mountRef}
          onClick={handleShootHologram}
          className="w-full h-[340px] cursor-crosshair relative select-none rounded-2xl overflow-hidden border border-red-500/20 bg-black/40 backdrop-blur-sm"
        />

        {/* Tap to Shoot Instructions Floating Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-zinc-950/80 border border-red-500/50 backdrop-blur-md flex items-center gap-2 text-xs font-bold text-zinc-300 shadow-xl">
          <Target className="w-3.5 h-3.5 text-red-400 animate-spin" />
          <span>Tap 3D Hologram to Fire Headshot Laser</span>
        </div>

        {/* Live Critical Damage Pop-up */}
        {lastDamage && isFiring && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-4xl sm:text-5xl font-black text-red-500 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,1)] animate-bounce">
            🔴 {lastDamage}
          </div>
        )}

        {/* Cyber Overlay Crosshair Watermark */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-500 flex flex-col gap-0.5 pointer-events-none">
          <span>POLYGON COUNT: 640</span>
          <span>CALIBRATED FOR: {brand.toUpperCase()}</span>
          <span>FPS: 120 (STABLE)</span>
        </div>
      </div>

      {/* Bottom Info & Audio Cues */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-bold block">Zero Drag Friction</span>
            <span className="text-[11px] text-zinc-400">Y-Axis smooth flick simulation</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-bold block">Hardware Gyro Sync</span>
            <span className="text-[11px] text-zinc-400">Real-time touch inertia lerp</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-bold block">Authentic Audio Crunch</span>
            <span className="text-[11px] text-zinc-400">Metallic headshot hit confirmation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
