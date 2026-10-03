export interface HudButtonPosition {
  id: string;
  name: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  size: number; // percentage size (30 - 100)
  opacity: number; // percentage (20 - 100)
  finger: 'Right Thumb' | 'Left Thumb' | 'Left Index' | 'Right Index';
}

export interface DecodedHudLayout {
  code: string;
  clawType: '2-Finger' | '3-Finger Claw' | '4-Finger Claw';
  buttons: HudButtonPosition[];
  scores: {
    dragRunway: number; // 0 - 100
    glooWallSpeed: number; // 0 - 100
    thumbErgonomics: number; // 0 - 100
    overallRating: number; // 0 - 100
  };
  flawsDetected: string[];
  optimizationsApplied: string[];
}
