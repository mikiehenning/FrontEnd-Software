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

var _d3Shape = require('d3-shape');

var _animation = require('../animation');

var _arcSeries = require('../plot/series/arc-series');

var _arcSeries2 = _interopRequireDefault(_arcSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _theme = require('../theme');

var _chartUtils = require('../utils/chart-utils');

var _seriesUtils = require('../utils/series-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var predefinedClassName = 'rv-radial-chart';

var DEFAULT_RADIUS_MARGIN = 15;

/**
 * Create the list of wedges to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
 * @returns {Array} Array of nodes.
 */
function getWedgesToRender(_ref) {
  var data = _ref.data;

  var pie = (0, _d3Shape.pie)().sort(null).value(function (d) {
    return d.angle;
  });
  var pieData = pie(data).reverse();
  return pieData.map(function (row, index) {
    return _extends({}, row.data, {
      angle0: row.startAngle,
      angle: row.endAngle,
      radius0: row.data.innerRadius || 0,
      radius: row.data.radius || 1,
      color: row.data.color || index
    });
  });
}

function generateLabels(mappedData) {
  return mappedData.reduce(function (res, row) {
    var angle = row.angle,
        angle0 = row.angle0,
        radius = row.radius,
        label = row.label,
        subLabel = row.subLabel;

    var centeredAngle = (angle + angle0) / 2;

    // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!
    var updatedAngle = -1 * centeredAngle + Math.PI / 2;
    var newLabels = [];
    if (row.label) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * 1.1,
        label: label,
        style: { fontSize: '12px' }
      });
    }

    if (subLabel) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * 1.1,
        label: subLabel,
        yOffset: 12,
        style: { fontSize: '10px' }
      });
    }
    return res.concat(newLabels);
  }, []);
  // could add force direction here to make sure the labels dont overlap
}

/**
 * Get the max radius so the chart can extend to the margin.
 * @param  {Number} width - container width
 * @param  {Number} height - container height
 * @return {Number} radius
 */
function getMaxRadius(width, height) {
  return Math.min(width, height) / 2 - DEFAULT_RADIUS_MARGIN;
}

var RadialChart = function (_Component) {
  _inherits(RadialChart, _Component);

  function RadialChart() {
    _classCallCheck(this, RadialChart);

    return _possibleConstructorReturn(this, (RadialChart.__proto__ || Object.getPrototypeOf(RadialChart)).apply(this, arguments));
  }

  _createClass(RadialChart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          children = _props.children,
          data = _props.data,
          height = _props.height,
          hideRootNode = _props.hideRootNode,
          width = _props.width,
          colorType = _props.colorType,
          radius = _props.radius,
          innerRadius = _props.innerRadius,
          showLabels = _props.showLabels,
          margin = _props.margin,
          onMouseLeave = _props.onMouseLeave,
          onMouseEnter = _props.onMouseEnter,
          labelsAboveChildren = _props.labelsAboveChildren;

      var mappedData = getWedgesToRender({ data: data, height: height, hideRootNode: hideRootNode, width: width });
      var radialDomain = (0, _seriesUtils.getRadialDomain)(mappedData);
      var arcProps = _extends({
        colorType: colorType
      }, this.props, {
        animation: animation,
        radiusDomain: [0, radialDomain],
        data: mappedData,
        radiusNoFallBack: true,
        arcClassName: 'rv-radial-chart__series--pie__slice'
      });
      if (radius) {
        arcProps.radiusDomain = [0, 1];
        arcProps.radiusRange = [innerRadius || 0, radius];
        arcProps.radiusType = 'linear';
      }
      var maxRadius = radius ? radius : getMaxRadius(width, height);
      var defaultMargin = (0, _chartUtils.getRadialLayoutMargin)(width, height, maxRadius);
      return _react2.default.createElement(
        _xyPlot2.default,
        {
          height: height,
          width: width,
          margin: _extends({}, margin, defaultMargin),
          className: className + ' ' + predefinedClassName,
          onMouseLeave: onMouseLeave,
          onMouseEnter: onMouseEnter,
          xDomain: [-radialDomain, radialDomain],
          yDomain: [-radialDomain, radialDomain] },
        _react2.default.createElement(_arcSeries2.default, arcProps),
        showLabels && !labelsAboveChildren && _react2.default.createElement(_labelSeries2.default, { data: generateLabels(mappedData) }),
        children,
        showLabels && labelsAboveChildren && _react2.default.createElement(_labelSeries2.default, { data: generateLabels(mappedData) })
      );
    }
  }]);

  return RadialChart;
}(_react.Component);

RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes2.default.string,
  colorType: _propTypes2.default.string,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    angle: _propTypes2.default.number,
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    radius: _propTypes2.default.number,
    style: _propTypes2.default.object
  })).isRequired,
  height: _propTypes2.default.number.isRequired,
  labelsAboveChildren: _propTypes2.default.bool,
  margin: _chartUtils.MarginPropType,
  onValueClick: _propTypes2.default.func,
  onValueMouseOver: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired,
  showLabels: _propTypes2.default.bool
};
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE
};

exports.default = RadialChart;