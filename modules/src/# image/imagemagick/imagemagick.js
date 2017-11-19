import include from '~/modules/include.js';
module.exports = include(require.context('./src/', false, /[^\/]+\.js$/), 1, 1);