// Karma + Jasmine + esbuild para proyectos Vite/ESM
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const istanbul = require('esbuild-plugin-istanbul')

export default function(config){
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.js': ['esbuild']
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
      },
      plugins: [
        istanbul({
          include: ['src/**/*.js', 'src/**/*.jsx'],
          exclude: ['src/**/*.spec.js'],
        })
      ]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
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


