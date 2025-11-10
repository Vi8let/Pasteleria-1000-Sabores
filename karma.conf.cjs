// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura y UI en /debug.html
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    //  A) Cargamos un único entry que importa TODOS los *.spec.js
    files: [
      { pattern: 'test/all.spec.js', watched: true },

      //  B) Servir assets estáticos (para evitar 404 del logo y las imágenes)
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true, nocache: true }
    ],

    //  Mapea /assets/img/ (como está en tu index.html) -> carpeta que sirve Karma
    proxies: {
      '/assets/img/': '/base/public/assets/img/'
    },

    preprocessors: {
      'test/all.spec.js': ['webpack']
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
        // evita polyfills de Node en webpack 5
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

    // Acceso desde tu notebook al runner
    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,

    client: {
      jasmine: { random: false },
      clearContext: false   // deja visible la UI de Jasmine
    },

    // Resiliencia si hay microcortes de red en la sala
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
    transports: ['websocket', 'polling'],

    // OPCIÓN A: te conectas desde tu Chrome en el notebook (recomendado para “ver” las pruebas)
    browsers: [],

    // OPCIÓN B: ejecutar headless en la EC2 (solo si decides usar CHROME_BIN)
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },

    autoWatch: true,
    singleRun: false
  });
};
