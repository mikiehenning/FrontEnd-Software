var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { voronoi } from 'd3-voronoi';

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
  var voronoiInstance = voronoi().x(x).y(y).extent(extent);

  return React.createElement(
    'g',
    { className: className + ' rv-voronoi', style: style },
    voronoiInstance.polygons(nodes).map(function (d, i) {
      return React.createElement('path', {
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
  className: PropTypes.string,
  extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onHover: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};

export default Voronoi;