import include from './include.js';
module.exports = include(require.context('./src/', true, /[^/]+\.js$/), 2, 9, 'js', /src/);
module.exports.include = include;
