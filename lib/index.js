/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var nopt = require('nopt'),
    known = {
        help: Boolean,
        version: Boolean,
        debug: Boolean,
        quiet: Boolean,
        silent: Boolean
    },
    shorts = {
        h: ['--help'],
        v: ['--version']
    },
    on = [],
    off = ['help', 'version'];

var mix = function(o, items) {
    if (o && items) {
        Object.keys(items).forEach(function(k) {
            o[k] = items[k];
        });
    }
};

var init = function(config) {
    config = config || {};
    mix(known, config.known);
    mix(shorts, config.shorts);

    if (config.on) {
        on = [].concat(on, config.on);
    }
    if (config.off) {
        off = [].concat(off, config.off);
    }
};

var raw = function (args) {
    var parsed = nopt(known, shorts, (args || process.argv));
    return parsed;
};

var has = function (a) {
    var cooked = raw().argv.cooked,
        ret = false;

    cooked.forEach(function (o) {
        if ((o === '--' + a) || (o === '--no-' + a)) {
            ret = true;
        }
    });

    return ret;
};

var clean = function(args) {
    var parsed = raw(args);
    delete parsed.argv;
    return parsed;
};

var setDefaults = function(parsed) {
    if (parsed === undefined) {
        parsed = clean();
    }
    //Default true
    on.forEach(function(k) {
        parsed[k] = (parsed[k] === undefined || parsed[k]) ? true : false;
    });

    //Default false
    off.forEach(function(k) {
        parsed[k] = (parsed[k] === undefined || parsed[k] === false) ? false : true;
    });

    return parsed;
};

var parse = function (args) {
    var parsed = clean(args);
    return setDefaults(parsed);
};

exports.init = init;
exports.defaults = setDefaults;
exports.has = has;
exports.raw = raw;
exports.parse = parse;
exports.shorts = shorts;
exports.known = known;
