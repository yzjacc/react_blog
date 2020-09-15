"use strict";

var md = require('markdown-it')();

var fs = require('fs');

var path = require('path'); // const { isArray } = require('core-js/fn/array');


var dirname = path.join(__dirname, '../../_posts');
var files = fs.readdirSync(dirname);
var dataJsonList = [];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var value = _step.value;
    if (!value.includes('md')) continue;
    dataJson = {};
    dataJson['path'] = dirname + '/' + value;
    dataJson['tag'] = [];
    dataJson['year'] = value.split("-")[0];
    dataJson['month'] = value.split("-")[1];
    dataJson['day'] = value.split("-")[2];
    var content = fs.readFileSync(dirname + '/' + value).toString();
    if (content) continue;
    var data = content.split("---")[1].split("\n");
    data.pop();
    data.shift();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _value = _step2.value;
        if (_value.split(":")[0] == 'title') dataJson['title'] = _value.split(":")[1].split('\"')[1];

        if (_value.split(":")[0].indexOf('-') == 0) {
          dataJson['tag'].push(_value.split(":")[0].split('-')[1]);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    dataJsonList.push(dataJson);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function getContent(path) {
  var content = fs.readFileSync(path).toString();
  return content.split("---")[2];
}

module.exports = {
  dataJsonList: dataJsonList,
  getContent: getContent
};
//# sourceMappingURL=source-handler.dev.js.map
