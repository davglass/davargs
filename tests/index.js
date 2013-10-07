var vows = require('vows'),
    assert = require('assert'),
    davargs = require('../lib');

var tests = {
    'is loaded': {
        topic: function() {
            return davargs;
        },
        'should have functions exported': function(a) {
            assert.isFunction(a.init);
            assert.isFunction(a.defaults);
            assert.isFunction(a.has);
            assert.isFunction(a.raw);
            assert.isFunction(a.parse);
        }
    },
    'should init with no config': {
        topic: function() {
            davargs.init();

            return davargs.parse(['', '', '--b', 'This is a test']);
        },
        'defaults should be sane': function(a) {
            assert.isTrue(a.b);
            assert.isFalse(a.version);
            assert.isFalse(a.help);
        }
    },
    'should init and set defaults': {
        topic: function() {
            davargs.init({
                known: {
                    foo: Boolean,
                    baz: Boolean,
                    bar: String
                },
                shorts: {
                    b: ['--bar']
                },
                on: ['foo'],
                off: ['baz']
            });

            return davargs.parse(['', '', '--b', 'This is a test']);
        },
        'defaults should be sane': function(a) {
            assert.isTrue(a.foo);
            assert.isFalse(a.version);
            assert.isFalse(a.help);
            assert.isFalse(a.baz);
            assert.equal('This is a test', a.bar);
        }
    },
    'should init and set defaults -- opposite': {
        topic: function() {
            davargs.init({
                known: {
                    foo: Boolean,
                    baz: Boolean,
                    bar: String
                },
                shorts: {
                    b: ['--bar']
                },
                on: ['foo'],
                off: ['baz']
            });

            return davargs.parse(['', '', '--b', 'This is a test', '--no-foo', '--baz']);
        },
        'defaults should be sane': function(a) {
            assert.isFalse(a.foo);
            assert.isFalse(a.version);
            assert.isFalse(a.help);
            assert.isTrue(a.baz);
            assert.equal('This is a test', a.bar);
        }
    },
    'raw with no args': {
        topic: function() {
            process.argv = ['node', '/path/to.js', '--no-foo'];
            return davargs.raw();
        },
        'results should be sane': function(a) {
            assert.isFalse(a.foo);
            assert.ok(a.argv);
        }
    },
    'has item --foo': {
        topic: function() {
            return davargs.has('foo');
        },
        'results should be sane': function(a) {
            assert.isTrue(a);
        }
    },
    'has item --bar': {
        topic: function() {
            return davargs.has('bar');
        },
        'results should be sane': function(a) {
            assert.isFalse(a);
        }
    },
    'defaults with no args': {
        topic: function() {
            return davargs.defaults();
        },
        'results should be sane': function(a) {
            assert.isFalse(a.foo);
            assert.isFalse(a.baz);
            assert.isFalse(a.help);
            assert.isFalse(a.version);
        }
    }
};

vows.describe('davargs').addBatch(tests)['export'](module);
