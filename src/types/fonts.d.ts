/**
 * Font files are inlined as base64 strings at build time (see rollup.config.ts).
 */
declare module '*.woff2' {
  const base64: string
  export default base64
}
