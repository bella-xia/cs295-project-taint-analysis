// bootstrap.js
acorn = require("acorn");
esotope = require('esotope');

require('./headers').headerSources.forEach(function (header) {
    require('./../../' + header);
});
J$.initParams = {};
