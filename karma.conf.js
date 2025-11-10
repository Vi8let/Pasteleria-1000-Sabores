// Karma + Jasmine + esbuild para proyectos Vite/ESM
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export default function(config){
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.{js,jsx}', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.{js,jsx}': ['esbuild']
    },
    esbuild: {
      format: 'esm',
      target: 'es2020',
      sourcemap: true,
      jsx: 'automatic',
      jsxImportSource: 'react',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    singleRun: false,
    autoWatch: true,
    client: {
      jasmine: {
        random: false
      },
      clearContext: false
    }
  })
}


