/*var Buffer = global.Buffer = require("../../../src/buffer");*/

var Test = require("./lib/test"),
    Route = require("../route/"),
    pkg = require("../../../package.json"),
    test = new Test("HAL"),
    util;

test.example();

if (!process.browser) util = require("util");

global.Buffer = Buffer;
global.process = process;
global.Test = Test;

exports.route = new Route("GET:/");
