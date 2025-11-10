// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'webpack'],

    // Tests y assets estáticos
    files: [
      { pattern: 'src/**/*.spec.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true },

      // Sirve TODO public/assets/** (no se inyecta en el runner)
      { pattern: 'public/assets/**/*', watched: false, included: false, served: true, nocache: true }
    ],

    // /assets/... (lo que pide index.html) -> /base/public/assets/...
    proxies: {
      '/assets/': '/base/public/assets/'
    },

    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'test/**/*.spec.js': ['webpack']
    },

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
        fallback: { path: false }
      }
    },

    reporters: ['progress', 'kjhtml', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '.' }
      ]
    },

    // Exponer Karma fuera de la EC2
    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,

    client: {
      jasmine: { random: false },
      clearContext: false
    },

    autoWatch: true,
    singleRun: false,

    // Tolerancia a desconexiones desde tu navegador
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,

    // Opción A: conectar tu navegador manualmente (deja vacío)
    browsers: [],

    // Opción B: lanzar Chrome Headless en EC2 si usas CHROME_BIN
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
