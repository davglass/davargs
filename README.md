davargs
=======

This is the arguments processor that I use in my CLI tools. It is a very small wrapper around `nopt` to help
with setting up defaults and sanatizing a little logic.


usage
-----

```javascript
var davargs = require('davargs');

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

var options = davargs.parse(process.argv);
console.log(options);

```

```{ foo: true, help: false, version: false, baz: false }```



options
-------

The `init` function allows for this config

  * `known` - The `known` object to use with `nopt`
  * `shorts` - The `shorts` object to use with `nopt`
  * `on` - An array of keys for the `known` object to set to `true` by default
  * `off` - An array of keys for the `known` object to set to `false` by default

There is also a provided `has` method to check to see if an argument has been passed on the cli
reguardless of whether it's true or false. Useful when passing arguments down a layer to a subprocess.

build status
------------

[![Build Status](https://secure.travis-ci.org/davglass/davargs.png?branch=master)](http://travis-ci.org/davglass/davargs)

node badge
----------

[![NPM](https://nodei.co/npm/davargs.png)](https://nodei.co/npm/davargs/)
----
