// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura
module.exports = function(config){
  config.set({
    frameworks: ['jasmine', 'webpack'],

    files: [
      { pattern: 'test/all.spec.js', watched: true }
    ],

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
        fallback: { "path": false } // Necesario para import.meta.glob
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

    // 🚀 Presentación en directo: el navegador se conecta desde tu PC
    browsers: [],
    customLaunchers: {},

    autoWatch: true,
    singleRun: false
  })
}
