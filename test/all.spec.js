// Cargar automáticamente todos los .spec.js de src
const tests = import.meta.glob('../src/**/*.spec.js', { eager: true });
