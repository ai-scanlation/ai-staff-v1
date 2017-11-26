import include from 'include';
module.exports = include(require.context('./shell', false, /[^\/]+\.js$/), 1, 1);
