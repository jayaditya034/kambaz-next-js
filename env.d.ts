// env.d.ts
interface ImportMetaEnv {
  readonly VITE_HTTP_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
