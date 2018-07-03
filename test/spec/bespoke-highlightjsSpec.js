Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke'),
    highlightjs = require('../../test-tmp/bespoke-highlightjs.js');

describe("bespoke-highlightjs", function() {

  var deck,
    createDeck = function() {
      var parent = document.createElement('article'),
        sectionOne = document.createElement('section');

      sectionOne.innerHTML = [
        '<pre><code class="javascript">',
        '/**',
        '* @author John Smith',
        '*/',
        'function foobar(text) {',
        '  console.log(text);',
        '}',
        '</code></pre>'
      ].join('\n');

      parent.appendChild(sectionOne);
      document.body.appendChild(parent);

      deck = bespoke.from({ parent: 'article', slides: 'section' }, [
        highlightjs()
      ]);
    };

  beforeEach(createDeck);

  it('should inject HighlightJS styles', function() {
    var firstStyleElement = document.head.querySelector('style');
    expect(firstStyleElement.innerHTML).toContain('hljs');
  });

  it('should insert <span>s with HighlightJS', function() {
    var section = deck.parent.querySelectorAll('section')[0];
    expect(section.innerHTML).toBe([
      '<pre><code class="javascript hljs">',
      '<span class="hljs-comment">/**',
      '* @author John Smith',
      '*/</span>',
      '<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foobar</span>(<span class="hljs-params">text</span>) </span>{',
      '  <span class="hljs-built_in">console</span>.log(text);',
      '}',
      '</code></pre>'
    ].join('\n'));
  });

});
