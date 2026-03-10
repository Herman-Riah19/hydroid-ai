import { ISkill, ISkillExecutor, ISkillConfig } from "./SkillbaseType.js";

export type ImageGenerationProvider =
  | "stable-diffusion"
  | "dall-e"
  | "midjourney"
  | "flux";

export type ImageStyle =
  | "realistic"
  | "anime"
  | "abstract"
  | "digital-art"
  | "photographic"
  | "illustration"
  | "3d-render"
  | "pixel-art";

export type ImageQuality = "standard" | "hd" | "ultra-hd";

export interface ImageGenerationOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  style?: ImageStyle;
  quality?: ImageQuality;
  numImages?: number;
  seed?: number;
  steps?: number;
  guidanceScale?: number;
}

export interface ImageGenerationConfig extends ISkillConfig {
  provider: ImageGenerationProvider;
  baseUrl?: string;
  apiKey?: string;
  defaultStyle?: ImageStyle;
  defaultQuality?: ImageQuality;
}

export interface GeneratedImage {
  url: string;
  seed?: number;
  width: number;
  height: number;
  provider: ImageGenerationProvider;
  metadata?: Record<string, unknown>;
}

export interface ImageGenerationResult {
  images: GeneratedImage[];
  generationTime: number;
  provider: ImageGenerationProvider;
  prompt: string;
}

export interface ImageToImageOptions extends ImageGenerationOptions {
  imageUrl: string;
  strength?: number;
}

export interface ImageInpaintingOptions extends ImageGenerationOptions {
  imageUrl: string;
  maskUrl?: string;
  maskPrompt?: string;
}

export interface IOSINTImageSkill extends ISkill, ISkillExecutor<ImageGenerationOptions, ImageGenerationResult> {
  generate(options: ImageGenerationOptions): Promise<ImageGenerationResult>;
  generateImageToImage(
    options: ImageToImageOptions,
  ): Promise<ImageGenerationResult>;
  generateInpainting(
    options: ImageInpaintingOptions,
  ): Promise<ImageGenerationResult>;
  upscale(imageUrl: string, scale: 2 | 4): Promise<GeneratedImage>;
  removeBackground(imageUrl: string): Promise<GeneratedImage>;
}

export const IMAGE_STYLE_PRESETS: Record<ImageStyle, string> = {
  realistic: "photorealistic, realistic, detailed, high quality",
  anime: "anime style, manga, Japanese animation, vibrant colors",
  abstract: "abstract art, abstract composition, modern art",
  "digital-art": "digital art, concept art, illustration",
  photographic: "photograph, photo realistic, professional photography",
  illustration: "illustration, hand drawn, artistic",
  "3d-render": "3d render, cgi, unreal engine, octane render",
  "pixel-art": "pixel art, 8-bit, retro gaming, pixelated",
};

export const IMAGE_QUALITY_PRESETS: Record<
  ImageQuality,
  { steps: number; guidanceScale: number }
> = {
  standard: { steps: 20, guidanceScale: 7.5 },
  hd: { steps: 30, guidanceScale: 8 },
  "ultra-hd": { steps: 50, guidanceScale: 9 },
};
