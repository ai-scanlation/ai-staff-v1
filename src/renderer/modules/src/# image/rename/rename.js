// phamhongphuc
import include from 'include';
module.exports = include(require.context('./src/', false, /[^/]+\.js$/), 1, 1);
