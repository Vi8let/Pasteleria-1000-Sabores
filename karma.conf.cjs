// Karma + Jasmine + Webpack + Babel + cobertura
module.exports = function (config) {
  const useHeadless = !!process.env.CHROME_BIN; // si viene de Puppeteer (CI)

  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Tests + assets estáticos
    files: [
      { pattern: 'src/**/*.spec.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true },

      // Sirve /assets/img/* desde public/ (para evitar 404 en logo.png)
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true, nocache: true }
    ],

    // Mapea /assets/img/... => /base/public/assets/img/ que sirve Karma
    proxies: { '/assets/img/': '/base/public/assets/img/' },

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

    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,

    client: {
      jasmine: { random: false },
      clearContext: false
    },

    autoWatch: true,
    singleRun: false,

    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,

    // Si ejecutas con Puppeteer (CI) usamos Headless; si no, conexión manual desde tu Chrome
    browsers: useHeadless ? ['ChromeHeadlessNoSandbox'] : [],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
