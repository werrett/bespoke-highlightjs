[![Build Status](https://secure.travis-ci.org/werrett/bespoke-highlightjs.png?branch=master)](https://travis-ci.org/werrett/bespoke-highlightjs) [![Coverage Status](https://coveralls.io/repos/werrett/bespoke-highlightjs/badge.png)](https://coveralls.io/r/werrett/bespoke-highlightjs)

# bespoke-highlightjs

Highlights source code examples in a [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) presentations using [Highlight.js](https://highlightjs.org/)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/werrett/bespoke-highlightjs/master/dist/bespoke-highlightjs.min.js
[max]: https://raw.github.com/werrett/bespoke-highlightjs/master/dist/bespoke-highlightjs.js

## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  highlightjs = require('bespoke-highlightjs');

bespoke.from('#presentation', [
  highlightjs()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.highlightjs()
]);
```

## Package managers

### npm

```bash
$ npm install bespoke-highlightjs
```

### Bower

```bash
$ bower install bespoke-highlightjs
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
