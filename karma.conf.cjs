// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura
module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba y assets estáticos
    files: [
      // Todos los tests (src/ y test/)
      { pattern: 'src/**/*.spec.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true },

      // Servir assets (no inyectar en el runner)
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true, nocache: true }
    ],

    // Mapear /assets/img/... a lo que sirve Karma (evita 404 de favicon/logo)
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

    // Reportes (UI en navegador + cobertura + progreso)
    reporters: ['kjhtml', 'progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '.' }
      ]
    },

    // Acceso externo desde tu PC
    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,

    client: {
      jasmine: { random: false },
      clearContext: false // mantiene visible la UI después de correr
    },

    // Modo presentación en vivo
    autoWatch: true,
    singleRun: false,

    // Más tolerante a latencias y recargas
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
    transports: ['websocket', 'polling'],

    // 👇 IMPORTANTE: no lanzar browsers en la EC2; te conectarás desde tu Chrome
    browsers: [],

    // Si en algún momento quieres headless en la EC2, habilita este launcher
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
