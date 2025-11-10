// Karma + Jasmine + webpack + cobertura + sirve logo correctamente
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    files: [
      // Test files
      { pattern: 'src/**/*.spec.js', watched: true },
      { pattern: 'test/**/*.spec.js', watched: true },

      // Servir logo e imágenes (pero sin inyectarlas en el runner)
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true }
    ],

    // Esto es lo que elimina el 404 del logo
    proxies: {
      '/assets/img/': '/base/public/assets/img/'
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
        { type: 'text-summary' }
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

    // Nos conectamos desde tu navegador → por eso vacío
    browsers: [],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
