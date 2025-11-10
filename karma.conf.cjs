// Karma + Jasmine + webpack + babel-istanbul (CommonJS) con cobertura
module.exports = function(config){
  config.set({
    // Frameworks
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba
files: [
  { pattern: 'src/**/*.spec.js', watched: true }
],

preprocessors: {
  'src/**/*.spec.js': ['webpack']
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
        extensions: ['.js', '.jsx']
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

    // Para visualizar en navegador desde otra máquina
    hostname: '0.0.0.0',
    listenAddress: '0.0.0.0',
    port: 9876,
    client: {
      jasmine: { random: false },
      clearContext: false   // deja visible la UI de tests
    },

    // Navegador headless vía Puppeteer
    browsers: [],
    customLaunchers: {},

    // Modo presentación en vivo
    autoWatch: true,
    singleRun: false
  })
}
