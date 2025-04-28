declare interface Env {
  readonly NODE_ENV: string;
  NG_APP_POKEMON_TCG_API_KEY?: string;
  NG_APP_AZURE_VISION_AI_REST_URL?: string;
  NG_APP_AZURE_VISION_AI_KEY?: string;
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}
