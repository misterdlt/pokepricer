declare interface Env {
  readonly NODE_ENV: string;
  POKEMON_TCG_API_KEY?: string;
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}
