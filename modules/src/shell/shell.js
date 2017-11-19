import include from '~/modules/include.js';
module.exports = include(require.context('./shell', false, /[^\/]+\.js$/), 1, 1);
