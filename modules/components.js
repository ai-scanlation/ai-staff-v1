import include from './include.js';
module.exports = include(require.context('./src/# components', true, /[^/]+\.js$/), 2, 3, 'js');
