// Carga todos los archivos *.spec.js dentro de src/ recursivamente
const req = require.context('../src', true, /\.spec\.js$/)
req.keys().forEach(req)


