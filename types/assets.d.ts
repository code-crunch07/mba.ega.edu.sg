/**
 * TypeScript 5.6+ with `moduleResolution: "bundler"` needs an explicit
 * declaration for side-effect stylesheet imports (e.g. `import './globals.css'`).
 * Next's webpack pipeline handles the actual loading.
 */
declare module '*.css';
declare module '*.scss';
