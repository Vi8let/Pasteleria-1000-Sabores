// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura
module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba y assets estáticos
    files: [
      // Todos los tests
      { pattern: 'src/**/*.spec.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true },

      // Servir assets (favicon/logo que tu index.html intenta leer)
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true, nocache: true }
    ],

    // Mapear /assets/img/... a lo que sirve Karma
    proxies: {
      '/assets/img/': '/base/public/assets/img/'
    },

    // Preprocesar tests con webpack
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'test/**/*.spec.js': ['webpack']
    },

    // Build de test con webpack + babel
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules|\.spec\.[jt]sx?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' }, modules: false }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: ['babel-plugin-istanbul']
              }
            }
          },
          {
            test: /\.spec\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' }, modules: false }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        // Evita polyfills innecesarios en webpack 5
        fallback: { path: false }
      }
    },

    // Reportes
    reporters: ['progress', 'kjhtml', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '.' }
      ]
    },

    // No exponemos el puerto (no necesario en headless)
    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,

    client: {
      jasmine: { random: false },
      clearContext: false
    },

    // Watch en EC2
    autoWatch: true,
    singleRun: false,

    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,

    // Lanzamos Chrome Headless DENTRO de la EC2
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
