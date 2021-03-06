'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Voronoi = require('d3-voronoi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOOP = function NOOP(f) {
  return f;
};

function Voronoi(_ref) {
  var className = _ref.className,
      extent = _ref.extent,
      nodes = _ref.nodes,
      onBlur = _ref.onBlur,
      _onClick = _ref.onClick,
      _onMouseUp = _ref.onMouseUp,
      _onMouseDown = _ref.onMouseDown,
      onHover = _ref.onHover,
      polygonStyle = _ref.polygonStyle,
      style = _ref.style,
      x = _ref.x,
      y = _ref.y;

  // Create a voronoi with each node center points
  var voronoiInstance = (0, _d3Voronoi.voronoi)().x(x).y(y).extent(extent);

  return _react2.default.createElement(
    'g',
    { className: className + ' rv-voronoi', style: style },
    voronoiInstance.polygons(nodes).map(function (d, i) {
      return _react2.default.createElement('path', {
        className: 'rv-voronoi__cell',
        d: 'M' + d.join('L') + 'Z',
        onClick: function onClick() {
          return _onClick(d.data);
        },
        onMouseUp: function onMouseUp() {
          return _onMouseUp(d.data);
        },
        onMouseDown: function onMouseDown() {
          return _onMouseDown(d.data);
        },
        onMouseOver: function onMouseOver() {
          return onHover(d.data);
        },
        onMouseOut: function onMouseOut() {
          return onBlur(d.data);
        },
        fill: 'none',
        style: _extends({
          pointerEvents: 'all'
        }, polygonStyle),
        key: i });
    })
  );
}

Voronoi.requiresSVG = true;

Voronoi.defaultProps = {
  className: '',
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP,
  onMouseDown: NOOP,
  onMouseUp: NOOP,
  x: function x(d) {
    return d.x;
  },
  y: function y(d) {
    return d.y;
  }
};

Voronoi.propTypes = {
  className: _propTypes2.default.string,
  extent: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)).isRequired,
  nodes: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  x: _propTypes2.default.func,
  y: _propTypes2.default.func
};

exports.default = Voronoi;