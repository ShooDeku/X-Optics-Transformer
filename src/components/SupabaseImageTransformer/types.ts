export interface ColorAdjustments {
  exposure?: number;
  contrast?: number;
  highlights?: number;
  shadows?: number;
  temperature?: number;
  tint?: number;
  vibrance?: number;
  saturation?: number;
  hdr?: number;
}

export interface DetailAdjustments {
  sharpness?: number;
  noise?: number;
  clarity?: number;
  texture?: number;
  lensCorrection?: boolean;
  chromatic?: boolean;
}

export interface CreativeEffects {
  grain?: number;
  grainSize?: number;
  vignette?: number;
  lightLeak?: 'none' | 'warm' | 'cool' | 'vintage';
  filmType?: 'none' | 'kodak' | 'fuji' | 'ilford';
}

export interface PortraitEnhancements {
  skinTone?: number;
  skinSmoothing?: number;
  eyeBrightness?: number;
  catchLight?: boolean;
  facialStructure?: number;
  portraitLighting?: 'natural' | 'studio' | 'butterfly' | 'rembrandt';
}

export interface StyleTransfer {
  style?: 'none' | 'cinematic' | 'vintage' | 'noir' | 'futuristic';
  intensity?: number;
  preserveColor?: boolean;
  preserveDetail?: boolean;
}

export interface ImageTransformations {
  width?: number;
  height?: number;
  resize?: 'cover' | 'contain' | 'fill';
  quality?: number;
  format?: 'webp' | 'jpeg' | 'jpg' | 'png';
  color?: ColorAdjustments;
  detail?: DetailAdjustments;
  effects?: CreativeEffects;
  portrait?: PortraitEnhancements;
  style?: StyleTransfer;
  metadata?: {
    preserve?: boolean;
    copyright?: string;
    author?: string;
  };
}

export interface ResponsiveBreakpoint {
  width: number;
  transformations: ImageTransformations;
}

export interface SupabaseImageTransformerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
  transformations?: ImageTransformations;
  responsive?: ResponsiveBreakpoint[];
  fallbackImage?: string;
  alt?: string;
  blurHash?: string;
  lazy?: boolean;
  preload?: boolean;
  onTransformationComplete?: (url: string) => void;
  onError?: (error: Error) => void;
}