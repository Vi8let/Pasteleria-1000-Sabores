// Karma + Jasmine + esbuild para proyectos Vite/ESM
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export default function(config){
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.js': ['babel'],
      'src/**/*.js': ['babel'],
      'src/**/*.jsx': ['babel']
    },
    babelPreprocessor: {
      options: {
        sourceMaps: 'inline',
        presets: [
          ['@babel/preset-env', { targets: { chrome: '100' } }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        plugins: [
          ['babel-plugin-istanbul', { exclude: ['**/*.spec.js'] }]
        ]
      }
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


