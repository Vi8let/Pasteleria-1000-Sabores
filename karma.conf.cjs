// Karma + Jasmine + esbuild + babel-istanbul (CommonJS) con cobertura
module.exports = function(config){
  config.set({
    frameworks: ['jasmine'],
    files: [
      // Código fuente (no se inyecta en la página, solo para instrumentación)
      { pattern: 'src/**/*.js', included: false, watched: false },
      { pattern: 'src/**/*.jsx', included: false, watched: false },
      // Especificaciones
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false }
    ],
    preprocessors: {
      // Instrumentar el código fuente con Babel + Istanbul (excluye *.spec.*)
      'src/**/!(*.spec).js': ['babel', 'coverage'],
      'src/**/!(*.spec).jsx': ['babel', 'coverage'],
      // Compilar ESM/JSX de los specs con esbuild
      'src/**/*.spec.js': ['esbuild'],
      'src/**/*.spec.jsx': ['esbuild']
    },
    babelPreprocessor: {
      options: {
        presets: [
          ['@babel/preset-env', { modules: 'commonjs' }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        plugins: ['babel-plugin-istanbul'],
        sourceMap: 'inline'
      }
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
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '.' }
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

