'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _seriesUtils = require('../../utils/series-utils');

var _theme = require('../../theme');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';
var DEFAULT_STROKE_WIDTH = 1;

var MarkSeries = function (_AbstractSeries) {
  _inherits(MarkSeries, _AbstractSeries);

  function MarkSeries() {
    _classCallCheck(this, MarkSeries);

    return _possibleConstructorReturn(this, (MarkSeries.__proto__ || Object.getPrototypeOf(MarkSeries)).apply(this, arguments));
  }

  _createClass(MarkSeries, [{
    key: '_renderCircle',
    value: function _renderCircle(d, i, strokeWidth, style) {
      var _this2 = this;

      var sizeFunctor = this._getAttributeFunctor('size');
      var opacityFunctor = this._getAttributeFunctor('opacity');
      var fillFunctor = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
      var strokeFunctor = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
      var xFunctor = this._getAttributeFunctor('x');
      var yFunctor = this._getAttributeFunctor('y');

      var attrs = {
        r: sizeFunctor ? sizeFunctor(d) : _theme.DEFAULT_SIZE,
        cx: xFunctor(d),
        cy: yFunctor(d),
        style: _extends({
          opacity: opacityFunctor ? opacityFunctor(d) : _theme.DEFAULT_OPACITY,
          stroke: strokeFunctor && strokeFunctor(d),
          fill: fillFunctor && fillFunctor(d),
          strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
        }, style),
        key: i,
        onClick: function onClick(e) {
          return _this2._valueClickHandler(d, e);
        },
        onContextMenu: function onContextMenu(e) {
          return _this2._valueRightClickHandler(d, e);
        },
        onMouseOver: function onMouseOver(e) {
          return _this2._valueMouseOverHandler(d, e);
        },
        onMouseOut: function onMouseOut(e) {
          return _this2._valueMouseOutHandler(d, e);
        }
      };
      return _react2.default.createElement('circle', attrs);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          data = _props.data,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          nullAccessor = _props.nullAccessor,
          strokeWidth = _props.strokeWidth,
          style = _props.style;

      if (!data) {
        return null;
      }
      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(MarkSeries, _extends({}, this.props, { animation: null }))
        );
      }

      return _react2.default.createElement(
        'g',
        { className: predefinedClassName + ' ' + className,
          ref: 'container',
          transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return nullAccessor(d) && _this3._renderCircle(d, i, strokeWidth, style);
        })
      );
    }
  }]);

  return MarkSeries;
}(_abstractSeries2.default);

MarkSeries.displayName = 'MarkSeries';
MarkSeries.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  nullAccessor: _propTypes2.default.func,
  strokeWidth: _propTypes2.default.number
});
MarkSeries.defaultProps = {
  nullAccessor: function nullAccessor() {
    return true;
  }
};

exports.default = MarkSeries;