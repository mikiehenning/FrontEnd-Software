'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

var _animation = require('../animation');

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _theme = require('../theme');

var _chartUtils = require('../utils/chart-utils');

var _polygonSeries = require('../plot/series/polygon-series');

var _polygonSeries2 = _interopRequireDefault(_polygonSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _decorativeAxis = require('../plot/axis/decorative-axis');

var _decorativeAxis2 = _interopRequireDefault(_decorativeAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var predefinedClassName = 'rv-radar-chart';
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 - props.startingAngle {number} the initial angle offset
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  var animation = props.animation,
      domains = props.domains,
      startingAngle = props.startingAngle,
      style = props.style,
      tickFormat = props.tickFormat,
      hideInnerMostValues = props.hideInnerMostValues;

  return domains.map(function (domain, index) {
    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var sortedDomain = domain.domain;

    var domainTickFormat = function domainTickFormat(t) {
      if (hideInnerMostValues && t === sortedDomain[0]) {
        return '';
      }
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };

    return _react2.default.createElement(_decorativeAxis2.default, {
      animation: animation,
      key: index + '-axis',
      axisStart: { x: 0, y: 0 },
      axisEnd: { x: Math.cos(angle), y: Math.sin(angle) },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    });
  });
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
  - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  var domains = props.domains,
      startingAngle = props.startingAngle,
      style = props.style;

  return domains.map(function (domain, index) {
    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var radius = 1.2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      label: domain.name,
      style: style
    };
  });
}

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 * @return {Array} the plotted axis components
 */
function getPolygons(props) {
  var animation = props.animation,
      colorRange = props.colorRange,
      domains = props.domains,
      data = props.data,
      style = props.style,
      startingAngle = props.startingAngle;

  var scales = domains.reduce(function (acc, domain) {
    acc[domain.name] = (0, _d3Scale.scaleLinear)().domain(domain.domain).range([0, 1]);
    return acc;
  }, {});

  return data.map(function (row, rowIndex) {
    var mappedData = domains.map(function (domain, index) {
      var dataPoint = row[domain.name];
      // error handling if point doesn't exist
      var angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      var radius = Math.max(scales[domain.name](dataPoint), 0);
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    });

    return _react2.default.createElement(_polygonSeries2.default, {
      animation: animation,
      className: predefinedClassName + '-polygon',
      key: rowIndex + '-polygon',
      data: mappedData,
      style: _extends({
        stroke: row.color || row.stroke || colorRange[rowIndex % colorRange.length],
        fill: row.color || row.fill || colorRange[rowIndex % colorRange.length]
      }, style.polygons)
    });
  });
}

var RadarChart = function (_Component) {
  _inherits(RadarChart, _Component);

  function RadarChart() {
    _classCallCheck(this, RadarChart);

    return _possibleConstructorReturn(this, (RadarChart.__proto__ || Object.getPrototypeOf(RadarChart)).apply(this, arguments));
  }

  _createClass(RadarChart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          children = _props.children,
          colorRange = _props.colorRange,
          data = _props.data,
          domains = _props.domains,
          height = _props.height,
          hideInnerMostValues = _props.hideInnerMostValues,
          margin = _props.margin,
          onMouseLeave = _props.onMouseLeave,
          onMouseEnter = _props.onMouseEnter,
          startingAngle = _props.startingAngle,
          style = _props.style,
          tickFormat = _props.tickFormat,
          width = _props.width;


      var axes = getAxes({
        domains: domains,
        animation: animation,
        hideInnerMostValues: hideInnerMostValues,
        startingAngle: startingAngle,
        style: style,
        tickFormat: tickFormat
      });

      var polygons = getPolygons({
        animation: animation,
        colorRange: colorRange,
        domains: domains,
        data: data,
        startingAngle: startingAngle,
        style: style
      });
      var labelSeries = _react2.default.createElement(_labelSeries2.default, {
        animation: animation,
        key: className,
        className: predefinedClassName + '-label',
        data: getLabels({ domains: domains, style: style.labels, startingAngle: startingAngle }) });
      return _react2.default.createElement(
        _xyPlot2.default,
        {
          height: height,
          width: width,
          margin: margin,
          dontCheckIfEmpty: true,
          className: className + ' ' + predefinedClassName,
          onMouseLeave: onMouseLeave,
          onMouseEnter: onMouseEnter,
          xDomain: [-1, 1],
          yDomain: [-1, 1] },
        children,
        axes.concat(polygons).concat(labelSeries)
      );
    }
  }]);

  return RadarChart;
}(_react.Component);

RadarChart.displayName = 'RadarChart';
RadarChart.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes2.default.string,
  colorType: _propTypes2.default.string,
  colorRange: _propTypes2.default.arrayOf(_propTypes2.default.string),
  data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  domains: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    domain: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
    tickFormat: _propTypes2.default.func
  })).isRequired,
  height: _propTypes2.default.number.isRequired,
  hideInnerMostValues: _propTypes2.default.bool,
  margin: _chartUtils.MarginPropType,
  startingAngle: _propTypes2.default.number,
  style: _propTypes2.default.shape({
    axes: _propTypes2.default.object,
    labels: _propTypes2.default.object,
    polygons: _propTypes2.default.object
  }),
  tickFormat: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired
};
RadarChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  hideInnerMostValues: true,
  startingAngle: Math.PI / 2,
  style: {
    axes: {
      line: {},
      ticks: {},
      text: {}
    },
    labels: {
      fontSize: 10,
      textAnchor: 'middle'
    },
    polygons: {
      strokeWidth: 0.5,
      strokeOpacity: 1,
      fillOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT
};

exports.default = RadarChart;