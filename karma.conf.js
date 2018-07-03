module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      'test/spec/bespoke-highlightjsSpec.js'
    ],

    exclude: [],

    preprocessors: {
      'test/**/*.js': 'browserify'
    },

    browserify: {
      transform: [
        ['stringify', { extensions: ['.css'], global: true }],
        'browserify-istanbul'
      ],
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir : 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'json' }
      ]
    },

    port: 8080,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS']
  });
};
