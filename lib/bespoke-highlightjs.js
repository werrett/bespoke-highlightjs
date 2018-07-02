var insertCss = require('insert-css'),
    hljsTheme = require('../node_modules/highlightjs/styles/solarized-dark.css');

module.exports = function() {

  var HLJS = require('highlightjs');
  insertCss(hljsTheme, { prepend: true });

  return function() {
    HLJS.initHighlightingOnLoad();
  };
};
