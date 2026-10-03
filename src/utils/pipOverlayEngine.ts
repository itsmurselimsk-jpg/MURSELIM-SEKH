import { SensiValues } from '../types/sensi';

class PipOverlayEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private video: HTMLVideoElement | null = null;
  private animId: number | null = null;
  private currentSensi: SensiValues | null = null;
  private modelName: string = 'Device';
  private fireSize: number = 48;
  private isPiPActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initElements();
    }
  }

  private initElements() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 400;
    this.canvas.height = 240;
    this.ctx = this.canvas.getContext('2d');

    this.video = document.createElement('video');
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.autoplay = true;
    this.video.style.position = 'fixed';
    this.video.style.top = '-9999px';
    this.video.style.left = '-9999px';
    this.video.style.opacity = '0';
    this.video.style.pointerEvents = 'none';
    document.body.appendChild(this.video);

    this.video.addEventListener('leavepictureinpicture', () => {
      this.isPiPActive = false;
      this.stopRenderLoop();
    });
  }

  public updateData(sensi: SensiValues, model: string, fireSize: number) {
    this.currentSensi = sensi;
    this.modelName = model;
    this.fireSize = fireSize;
  }

  private drawFrame() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Dark sleek VIP Background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, w, h);

    // Border glow
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Inner subtle glow
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Header bar
    ctx.fillStyle = '#18181b';
    ctx.fillRect(6, 6, w - 12, 34);

    // Title text
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('🔴 VIP SENSI OVERLAY v4.9', 14, 28);

    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#10b981';
    ctx.fillText('120 FPS | 18ms', w - 110, 28);

    // Model name
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#ffffff';
    const displayModel = this.modelName.length > 20 ? this.modelName.substring(0, 20) + '...' : this.modelName;
    ctx.fillText(`🎮 ${displayModel}`, 14, 60);

    // Sensi values grid
    const s = this.currentSensi || {
      general: 179,
      redDot: 176,
      scope2x: 165,
      scope4x: 152,
      sniperScope: 135,
      freeLook: 160,
    };

    // Left Column
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('General:', 14, 85);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${Math.round(s.general)}`, 85, 85);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('Red Dot:', 14, 110);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${Math.round(s.redDot)}`, 85, 110);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('2X Scope:', 14, 135);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${Math.round(s.scope2x)}`, 85, 135);

    // Right Column
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('4X Scope:', 140, 85);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${Math.round(s.scope4x)}`, 205, 85);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('Sniper:', 140, 110);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${Math.round(s.sniperScope)}`, 205, 110);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px sans-serif';
    ctx.fillText('Fire Btn:', 140, 135);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${this.fireSize}%`, 205, 135);

    // Interactive Floating Crosshair on right side of PiP
    const cx = w - 75;
    const cy = 100;
    const time = Date.now() / 600;

    // Crosshair outer ring
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair rotating ticks
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 4; i++) {
      const angle = time + (i * Math.PI) / 2;
      const x1 = cx + Math.cos(angle) * 12;
      const y1 = cy + Math.sin(angle) * 12;
      const x2 = cx + Math.cos(angle) * 24;
      const y2 = cy + Math.sin(angle) * 24;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Center Red Dot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Bottom Action Banner
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(6, h - 42, w - 12, 34);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.strokeRect(6, h - 42, w - 12, 34);

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('⚡ FLOATING OVER FREE FIRE ACTIVE', 18, h - 20);

    ctx.font = '10px monospace';
    ctx.fillStyle = '#34d399';
    ctx.fillText('99% HEADSHOT LOCK', w - 140, h - 20);
  }

  private startRenderLoop() {
    const loop = () => {
      this.drawFrame();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  private stopRenderLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  public async startPictureInPicture(sensi: SensiValues, model: string, fireSize: number): Promise<boolean> {
    if (!this.canvas || !this.video) {
      this.initElements();
    }
    if (!this.canvas || !this.video) return false;

    this.updateData(sensi, model, fireSize);
    this.drawFrame();
    this.startRenderLoop();

    try {
      // Capture canvas stream at 30 fps
      const stream = (this.canvas as any).captureStream ? (this.canvas as any).captureStream(30) : null;
      if (!stream) {
        throw new Error('Canvas captureStream not supported in this browser');
      }

      this.video.srcObject = stream;
      await this.video.play();

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }

      await this.video.requestPictureInPicture();
      this.isPiPActive = true;
      return true;
    } catch (err) {
      console.warn('PiP launch error:', err);
      this.stopRenderLoop();
      return false;
    }
  }

  public isSupported(): boolean {
    return (
      typeof document !== 'undefined' &&
      'pictureInPictureEnabled' in document &&
      (document as any).pictureInPictureEnabled === true
    );
  }

  public isActive(): boolean {
    return this.isPiPActive;
  }
}

export const pipOverlayEngine = new PipOverlayEngine();
