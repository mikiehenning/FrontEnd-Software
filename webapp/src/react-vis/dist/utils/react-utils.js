'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDOMNode = exports.isReactDOMSupported = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

exports.warning = warning;
exports.warnOnce = warnOnce;
exports.checkIfStyleSheetIsImported = checkIfStyleSheetIsImported;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _React$version$split = _react2.default.version.split('.'),
    _React$version$split2 = _slicedToArray(_React$version$split, 2),
    major = _React$version$split2[0],
    minor = _React$version$split2[1];

var versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;

var isReactDOMSupported = exports.isReactDOMSupported = function isReactDOMSupported() {
  return versionHigherThanThirteen;
};

/**
 * Support React 0.13 and greater where refs are React components, not DOM
 * nodes.
 * @param {*} ref React's ref.
 * @returns {Element} DOM element.
 */
var getDOMNode = exports.getDOMNode = function getDOMNode(ref) {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }
  return ref;
};

var USED_MESSAGES = {};
var HIDDEN_PROCESSES = {
  test: true,
  production: true
};

/**
 * Warn the user about something
 * @param {String} message - the message to be shown
 * @param {Boolean} onlyShowMessageOnce - whether or not we allow the
 - message to be show multiple times
 */
function warning(message) {
  var onlyShowMessageOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  /* eslint-disable no-undef, no-process-env */
  if (process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */
  if (!onlyShowMessageOnce || !USED_MESSAGES[message]) {
    /* eslint-disable no-console */
    console.warn(message);
    /* eslint-enable no-console */
    USED_MESSAGES[message] = true;
  }
}

/**
 * Convience wrapper for warning
 * @param {String} message - the message to be shown
 */
function warnOnce(message) {
  warning(message, true);
}

// special tag for using to check if the style file has been imported
// represented the md5 hash of the phrase "react-vis is cool"
var MAGIC_CSS_RULE = '.react-vis-magic-css-import-rule';
function checkIfStyleSheetIsImported() {
  /* eslint-disable no-undef, no-process-env */
  if (process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */

  var foundImportTag = [].concat(_toConsumableArray(new Array(document.styleSheets.length))).some(function (e, i) {
    var styleSheet = document.styleSheets[i];
    var CSSRulesList = styleSheet.rules || styleSheet.cssRules;
    return [].concat(_toConsumableArray(new Array(CSSRulesList ? CSSRulesList.length : 0))).some(function (el, j) {
      var selector = CSSRulesList[j];
      return selector.selectorText === MAGIC_CSS_RULE;
    });
  });

  if (!foundImportTag) {
    /* eslint-disable max-len */
    warnOnce('REACT-VIS: The style sheet for react-vis has not been imported, checkout https://uber.github.io/react-vis/documentation/general-principles/style for more details.');
    /* eslint-enable max-len */
  }
}