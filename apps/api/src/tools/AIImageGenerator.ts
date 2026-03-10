import {
  IOSINTImageSkill,
  ImageGenerationOptions,
  ImageGenerationConfig,
  ImageGenerationResult,
  GeneratedImage,
  ImageToImageOptions,
  ImageInpaintingOptions,
  IMAGE_STYLE_PRESETS,
  IMAGE_QUALITY_PRESETS,
} from "src/types/imageGenerationType.js";

export class ImageGenerationSkill implements IOSINTImageSkill {
  readonly name = "ImageGenerationSkill";
  readonly version = "1.0.0";

  private config: ImageGenerationConfig;
  private initialized = false;

  constructor(config: ImageGenerationConfig) {
    this.config = {
      defaultStyle: "digital-art",
      defaultQuality: "standard",
      ...config,
    };
  }

  async initialize(): Promise<void> {
    if (this.config.enabled === false) {
      throw new Error("Image generation skill is disabled");
    }

    if (!this.config.apiKey && this.config.provider !== "stable-diffusion") {
      throw new Error(`API key required for ${this.config.provider}`);
    }

    this.initialized = true;
  }

  async dispose(): Promise<void> {
    this.initialized = false;
  }

  async execute(
    options: ImageGenerationOptions,
  ): Promise<ImageGenerationResult> {
    return this.generate(options);
  }

  async generate(
    options: ImageGenerationOptions,
  ): Promise<ImageGenerationResult> {
    this.ensureInitialized();

    const startTime = Date.now();
    const enhancedPrompt = this.enhancePrompt(options);
    const generationParams = this.buildGenerationParams(options);

    let result: ImageGenerationResult;

    switch (this.config.provider) {
      case "stable-diffusion":
        result = await this.generateWithStableDiffusion(
          enhancedPrompt,
          generationParams,
        );
        break;
      case "dall-e":
        result = await this.generateWithDalle(enhancedPrompt, generationParams);
        break;
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }

    result.generationTime = Date.now() - startTime;
    return result;
  }

  async generateImageToImage(
    options: ImageToImageOptions,
  ): Promise<ImageGenerationResult> {
    this.ensureInitialized();

    if (this.config.provider !== "stable-diffusion") {
      throw new Error("Image-to-image only supported with Stable Diffusion");
    }

    const enhancedPrompt = this.enhancePrompt(options);
    const generationParams = this.buildGenerationParams(options);

    const result = await this.callStableDiffusionAPI({
      ...generationParams,
      init_images: [options.imageUrl],
      denoising_strength: options.strength ?? 0.75,
      prompt: enhancedPrompt,
    });

    return {
      images: this.parseStableDiffusionResponse(result),
      generationTime: 0,
      provider: this.config.provider,
      prompt: options.prompt,
    };
  }

  async generateInpainting(
    options: ImageInpaintingOptions,
  ): Promise<ImageGenerationResult> {
    this.ensureInitialized();

    if (this.config.provider !== "stable-diffusion") {
      throw new Error("Inpainting only supported with Stable Diffusion");
    }

    const enhancedPrompt = this.enhancePrompt(options);
    const generationParams = this.buildGenerationParams(options);

    const result = await this.callStableDiffusionAPI({
      ...generationParams,
      init_images: [options.imageUrl],
      inpainting_fill: 0,
      inpaint_full_res: true,
      prompt: enhancedPrompt,
    });

    return {
      images: this.parseStableDiffusionResponse(result),
      generationTime: 0,
      provider: this.config.provider,
      prompt: options.prompt,
    };
  }

  async upscale(imageUrl: string, scale: 2 | 4): Promise<GeneratedImage> {
    this.ensureInitialized();

    if (this.config.provider !== "stable-diffusion") {
      throw new Error("Upscaling only supported with Stable Diffusion");
    }

    const result = await this.callStableDiffusionAPI({
      upscaling_resize: scale,
      upscaling_crop_gaps: true,
      init_images: [imageUrl],
    });

    const images = this.parseStableDiffusionResponse(result);
    if (!images[0]) {
      throw new Error("Failed to upscale image");
    }
    return images[0];
  }

  async removeBackground(imageUrl: string): Promise<GeneratedImage> {
    this.ensureInitialized();

    const result = await this.callStableDiffusionAPI({
      init_images: [imageUrl],
      remove_background: true,
    });

    const images = this.parseStableDiffusionResponse(result);
    if (!images[0]) {
      throw new Error("Failed to remove background from image");
    }
    return images[0];
  }

  private enhancePrompt(options: ImageGenerationOptions): string {
    const stylePreset =
      options.style ?? this.config.defaultStyle ?? "digital-art";
    const styleText = IMAGE_STYLE_PRESETS[stylePreset] ?? "";

    return `${options.prompt}, ${styleText}${options.negativePrompt ? `, NOT ${options.negativePrompt}` : ""}`;
  }

  private buildGenerationParams(
    options: ImageGenerationOptions,
  ): Record<string, unknown> {
    const qualityPreset =
      options.quality ?? this.config.defaultQuality ?? "standard";
    const preset = IMAGE_QUALITY_PRESETS[qualityPreset];

    return {
      width: options.width ?? 512,
      height: options.height ?? 512,
      steps: options.steps ?? preset.steps,
      guidance_scale: options.guidanceScale ?? preset.guidanceScale,
      seed: options.seed ?? Math.floor(Math.random() * 4294967295),
      batch_size: options.numImages ?? 1,
      sampler_name: "Euler a",
    };
  }

  private async generateWithStableDiffusion(
    prompt: string,
    params: Record<string, unknown>,
  ): Promise<ImageGenerationResult> {
    const result = await this.callStableDiffusionAPI({
      ...params,
      prompt,
    });

    return {
      images: this.parseStableDiffusionResponse(result),
      generationTime: 0,
      provider: this.config.provider,
      prompt,
    };
  }

  private async generateWithDalle(
    prompt: string,
    params: Record<string, unknown>,
  ): Promise<ImageGenerationResult> {
    const baseUrl = this.config.baseUrl ?? "https://api.openai.com/v1";
    const quality = this.config.defaultQuality === "hd" ? "hd" : "standard";
    const size = `${params.width}x${params.height}`;

    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        quality,
        size,
        n: params.batch_size ?? 1,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `DALL-E API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as {
      data: Array<{ url: string; revised_prompt: string }>;
    };

    return {
      images: data.data.map((img) => ({
        url: img.url,
        width: params.width as number,
        height: params.height as number,
        provider: this.config.provider,
        metadata: { revisedPrompt: img.revised_prompt },
      })),
      generationTime: 0,
      provider: this.config.provider,
      prompt,
    };
  }

  private async callStableDiffusionAPI(
    body: Record<string, unknown>,
  ): Promise<unknown> {
    const baseUrl = this.config.baseUrl ?? "http://localhost:7860";

    const response = await fetch(`${baseUrl}/sdapi/v1/img2img`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API error: ${response.status}`);
    }

    return response.json();
  }

  private parseStableDiffusionResponse(response: unknown): GeneratedImage[] {
    const data = response as { images?: string[]; seed?: number };

    if (!data.images) {
      return [];
    }

    return data.images.map((base64, index) => ({
      url: `data:image/png;base64,${base64}`,
      seed: data.seed ?? index,
      width: 512,
      height: 512,
      provider: this.config.provider,
    }));
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("Skill not initialized. Call initialize() first.");
    }
  }
}

export function createImageGenerationSkill(
  config: ImageGenerationConfig,
): ImageGenerationSkill {
  return new ImageGenerationSkill(config);
}

export function createStableDiffusionSkill(
  baseUrl?: string,
): ImageGenerationSkill {
  return new ImageGenerationSkill({
    provider: "stable-diffusion",
    baseUrl: baseUrl ?? "http://localhost:7860",
    enabled: true,
  });
}

export function createDalleSkill(
  apiKey: string,
  baseUrl?: string,
): ImageGenerationSkill {
  return new ImageGenerationSkill({
    provider: "dall-e",
    apiKey,
    baseUrl: baseUrl ?? "https://api.openai.com/v1",
    enabled: true,
  });
}
