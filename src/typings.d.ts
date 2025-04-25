declare module '@paddlejs-models/ocr' {
  // Add basic type information based on usage in ocr.service.ts
  // This is not exhaustive but silences the compiler errors.
  export function load(): Promise<void>;
  export function recognize(input: HTMLImageElement, options?: { det?: any; rec?: boolean }): Promise<{ text: string[] } | any>;
}

declare module '@paddlejs/paddlejs-core' {
  // Add basic type information based on usage in ocr.service.ts
  export class Paddlejs {
    constructor(options: { modelPath: string; feedShape: { fw: number; fh: number }; fill: string });
    load(): Promise<void>;
    // Add other methods if needed
  }
} 