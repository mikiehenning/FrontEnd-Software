var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

import React from 'react';

import PropTypes from 'prop-types';

import Animation, { AnimationPropType } from '../animation';
import { getFontColorFromBackground } from '../utils/scales-utils';

var ANIMATED_PROPS = ['colorRange', 'colorDomain', 'color', 'opacityRange', 'opacityDomain', 'opacity', 'x0', 'x1', 'y0', 'y1', 'r'];

var TreemapLeaf = function (_React$Component) {
  _inherits(TreemapLeaf, _React$Component);

  function TreemapLeaf() {
    _classCallCheck(this, TreemapLeaf);

    return _possibleConstructorReturn(this, (TreemapLeaf.__proto__ || Object.getPrototypeOf(TreemapLeaf)).apply(this, arguments));
  }

  _createClass(TreemapLeaf, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          mode = _props.mode,
          node = _props.node,
          onLeafClick = _props.onLeafClick,
          onLeafMouseOver = _props.onLeafMouseOver,
          onLeafMouseOut = _props.onLeafMouseOut,
          r = _props.r,
          scales = _props.scales,
          x0 = _props.x0,
          x1 = _props.x1,
          y0 = _props.y0,
          y1 = _props.y1,
          style = _props.style;


      if (animation) {
        return React.createElement(
          Animation,
          _extends({}, this.props, { animatedProps: ANIMATED_PROPS }),
          React.createElement(TreemapLeaf, _extends({}, this.props, { animation: null }))
        );
      }
      var useCirclePacking = mode === 'circlePack';
      var background = scales.color(node);
      var opacity = scales.opacity(node);
      var color = getFontColorFromBackground(background);
      var title = node.data.title;

      var leafStyle = _extends({
        top: useCirclePacking ? y0 - r : y0,
        left: useCirclePacking ? x0 - r : x0,
        width: useCirclePacking ? r * 2 : x1 - x0,
        height: useCirclePacking ? r * 2 : y1 - y0,
        background: background,
        opacity: opacity,
        color: color
      }, style, node.data.style);

      return React.createElement(
        'div',
        {
          className: 'rv-treemap__leaf ' + (useCirclePacking ? 'rv-treemap__leaf--circle' : ''),
          onMouseEnter: function onMouseEnter(event) {
            return onLeafMouseOver(node, event);
          },
          onMouseLeave: function onMouseLeave(event) {
            return onLeafMouseOut(node, event);
          },
          onClick: function onClick(event) {
            return onLeafClick(node, event);
          },
          style: leafStyle },
        React.createElement(
          'div',
          { className: 'rv-treemap__leaf__content' },
          title
        )
      );
    }
  }]);

  return TreemapLeaf;
}(React.Component);

TreemapLeaf.propTypes = {
  animation: AnimationPropType,
  height: PropTypes.number.isRequired,
  mode: PropTypes.string,
  node: PropTypes.object.isRequired,
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  scales: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  x0: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y0: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired
};
export default TreemapLeaf;