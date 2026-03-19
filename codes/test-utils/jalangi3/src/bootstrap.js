// bootstrap.js
acorn = require("acorn");
escodegen = require("escodegen");

require('./headers').headerSources.forEach(function (header) {
    require('./../' + header);
});
J$.initParams = {};
