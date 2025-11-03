// ¡SIN IMPORTS AQUÍ ARRIBA!

// Paso 1: Usar 'export default' (Esto está bien)
export default (config) => {
  config.set({
    frameworks: ['jasmine'],

    // (Esto está bien)
    files: [
      'src/**/*.spec.{js,jsx}'
    ],

    // (Esto está bien)
    preprocessors: {
      'src/**/*.spec.{js,jsx}': ['esbuild']
    },

    // (Esto está bien, con la corrección del loader)
    esbuild: {
      target: 'es2020',
      jsx: 'automatic',
      sourcemap: 'inline',
      loader: { '.js': 'js', '.jsx': 'jsx' }, // .js es 'js', .jsx es 'jsx'
      define: { 'process.env.NODE_ENV': '"test"' }
    },

    // (Esto está bien)
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }]
    },

    // (Esto está bien)
    browsers: ['ChromeHeadless'],
    singleRun: true,

    // ¡¡ESTE ES EL CAMBIO CLAVE!!
    // Forzamos la carga de plugins con 'require' (CJS)
    // en lugar de 'import' (ESM).
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-esbuild')
    ]
  });
};