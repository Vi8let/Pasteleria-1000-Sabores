// Karma + Jasmine + esbuild (CommonJS) para máxima compatibilidad
module.exports = function(config){
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.js': ['esbuild'],
      'src/**/*.spec.jsx': ['esbuild']
    },
    esbuild: {
      format: 'iife',
      target: 'es2020',
      sourcemap: true,
      jsx: 'automatic',
      jsxImportSource: 'react',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      },
      define: {
        'process.env.NODE_ENV': '"test"'
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


