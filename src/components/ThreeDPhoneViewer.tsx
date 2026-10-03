import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Smartphone, RotateCw, Flame, Target, Compass, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

interface ThreeDPhoneViewerProps {
  brand: string;
  model: string;
  fireButtonSize: number;
  safeDpi: number;
}

export const ThreeDPhoneViewer: React.FC<ThreeDPhoneViewerProps> = ({
  brand,
  model,
  fireButtonSize,
  safeDpi,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Phone Group
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // 1. Phone Body (Rounded Box)
    const phoneWidth = 1.9;
    const phoneHeight = 3.6;
    const phoneDepth = 0.14;

    const bodyGeom = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(bodyGeom, bodyMat);
    phoneGroup.add(phoneBody);

    // 2. Bezel / Screen
    const screenGeom = new THREE.PlaneGeometry(phoneWidth - 0.08, phoneHeight - 0.12);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x09090b,
    });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.z = phoneDepth / 2 + 0.001;
    phoneGroup.add(screen);

    // 3. Cyber Screen Grid & Hologram Lines
    const gridHelper = new THREE.GridHelper(2, 8, 0xef4444, 0x27272a);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = phoneDepth / 2 + 0.002;
    gridHelper.scale.set(0.85, 1, 1.6);
    phoneGroup.add(gridHelper);

    // 4. Fire Button Indicator in 3D Space (Bottom Right Quadrant)
    const buttonScale = (fireButtonSize / 100) * 0.45;
    const buttonGeom = new THREE.RingGeometry(buttonScale * 0.7, buttonScale, 32);
    const buttonMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
    });
    const fireButton = new THREE.Mesh(buttonGeom, buttonMat);
    fireButton.position.set(0.45, -0.9, phoneDepth / 2 + 0.003);
    phoneGroup.add(fireButton);

    // 5. J-Drag Curved Arrow in 3D Space (Glowing Neon Red Arc)
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.45, -0.9, phoneDepth / 2 + 0.004),
      new THREE.Vector3(0.65, -0.2, phoneDepth / 2 + 0.004),
      new THREE.Vector3(0.1, 1.1, phoneDepth / 2 + 0.004)
    );
    const points = curve.getPoints(24);
    const curveGeom = new THREE.BufferGeometry().setFromPoints(points);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      linewidth: 3,
    });
    const dragLine = new THREE.Line(curveGeom, curveMat);
    phoneGroup.add(dragLine);

    // 6. Camera Punch-Hole
    const camGeom = new THREE.CircleGeometry(0.04, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const camHole = new THREE.Mesh(camGeom, camMat);
    camHole.position.set(0, 1.62, phoneDepth / 2 + 0.002);
    phoneGroup.add(camHole);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xef4444, 1.5, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    // Interaction / Drag Rotation
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;

      phoneGroup.rotation.y += deltaX * 0.01;
      phoneGroup.rotation.x += deltaY * 0.01;

      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerUp = () => {
      isPointerDown = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      if (autoRotate && !isPointerDown) {
        phoneGroup.rotation.y += delta * 0.5;
        phoneGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate, fireButtonSize]);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-black text-white">3D Device Screen Runway</h3>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            setAutoRotate(!autoRotate);
          }}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border flex items-center gap-1 transition-all ${
            autoRotate
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-zinc-900 text-zinc-400 border-zinc-700'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
          <span>{autoRotate ? '3D ROTATING' : 'PAUSED'}</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="relative my-2">
        <div
          ref={mountRef}
          className="w-full h-[300px] cursor-grab active:cursor-grabbing rounded-2xl bg-black/40 border border-zinc-800/80"
        />
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-500 pointer-events-none">
          <span>DRAG 3D MODEL WITH FINGER TO ROTATE</span>
        </div>
      </div>

      {/* Runway Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <div>
            <span className="text-zinc-400 text-[10px] block">Fire Button</span>
            <span className="font-mono font-bold text-white">{fireButtonSize}% Size</span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
          <div>
            <span className="text-zinc-400 text-[10px] block">Safe Runway</span>
            <span className="font-mono font-bold text-red-400">{safeDpi} DPI Arc</span>
          </div>
        </div>
      </div>
    </div>
  );
};
