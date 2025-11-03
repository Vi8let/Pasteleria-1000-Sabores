// karma.conf.cjs
const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/services/**/*.js', included: false, served: true },  // ← Sources para coverage
      { pattern: 'src/**/*.spec.js', watched: false }  // ← Tests
    ],
    preprocessors: {
      'src/services/**/*.js': ['esbuild', 'coverage'],  // ← esbuild + coverage
      'src/**/*.spec.js': ['esbuild']  // ← Tests
    },
    esbuild: {
      target: 'es2020',
      jsx: 'automatic',
      loader: { '.js': 'jsx' },
      define: { 'process.env.NODE_ENV': '"test"' }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ],
      instrumenterOptions: { esModules: true }  // ← Para ES modules
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-esbuild')
    ]
  });
};