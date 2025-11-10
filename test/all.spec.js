// test/all.spec.js

// src/**/*.spec.js
const srcReq = require.context('../src', true, /\.spec\.js$/);
srcReq.keys().forEach(srcReq);

// test/**/*.spec.js (por si tienes tests adicionales)
const testReq = require.context('.', true, /\.spec\.js$/);
testReq.keys().forEach(testReq);
