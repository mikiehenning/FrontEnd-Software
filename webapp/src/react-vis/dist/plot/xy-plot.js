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

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _scalesUtils = require('../utils/scales-utils');

var _seriesUtils = require('../utils/series-utils');

var _chartUtils = require('../utils/chart-utils');

var _reactUtils = require('../utils/react-utils');

var _animation = require('../animation');

var _theme = require('../theme');

var _canvasWrapper = require('./series/canvas-wrapper');

var _canvasWrapper2 = _interopRequireDefault(_canvasWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['x', 'y', 'radius', 'angle', 'color', 'fill', 'stroke', 'opacity', 'size'];

var OPTIONAL_SCALE_PROPS = ['Padding'];

var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

/**
 * Remove parents from tree formatted data. deep-equal doesnt play nice with data
 * that has circular structures, so we make every node single directional by pruning the parents.
 * @param {Array} data - the data object to have circular deps resolved in
 * @returns {Array} the sanitized data
 */
function cleanseData(data) {
  return data.map(function (series) {
    if (!Array.isArray(series)) {
      return series;
    }
    return series.map(function (row) {
      return _extends({}, row, { parent: null });
    });
  });
}

/**
 * Wrapper on the deep-equal method for checking equality of next props vs current props
 * @param {Object} scaleMixins - Scale object.
 * @param {Object} nextScaleMixins - Scale object.
 * @param {Boolean} hasTreeStructure - Whether or not to cleanse the data of possible cyclic structures
 * @returns {Boolean} whether or not the two mixins objects are equal
 */
function checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, hasTreeStructure) {
  var newMixins = _extends({}, nextScaleMixins, {
    _allData: hasTreeStructure ? cleanseData(nextScaleMixins._allData) : nextScaleMixins._allData
  });
  var oldMixins = _extends({}, scaleMixins, {
    _allData: hasTreeStructure ? cleanseData(scaleMixins._allData) : scaleMixins._allData
  });
  // it's hard to say if this function is reasonable?
  return (0, _deepEqual2.default)(newMixins, oldMixins);
}

var XYPlot = function (_React$Component) {
  _inherits(XYPlot, _React$Component);

  _createClass(XYPlot, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        animation: _animation.AnimationPropType,
        className: _propTypes2.default.string,
        dontCheckIfEmpty: _propTypes2.default.bool,
        height: _propTypes2.default.number.isRequired,
        margin: _chartUtils.MarginPropType,
        onClick: _propTypes2.default.func,
        onDoubleClick: _propTypes2.default.func,
        onMouseDown: _propTypes2.default.func,
        onMouseEnter: _propTypes2.default.func,
        onMouseLeave: _propTypes2.default.func,
        onMouseMove: _propTypes2.default.func,
        onWheel: _propTypes2.default.func,
        stackBy: _propTypes2.default.oneOf(ATTRIBUTES),
        style: _propTypes2.default.object,
        width: _propTypes2.default.number.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        className: ''
      };
    }
  }]);

  function XYPlot(props) {
    _classCallCheck(this, XYPlot);

    var _this = _possibleConstructorReturn(this, (XYPlot.__proto__ || Object.getPrototypeOf(XYPlot)).call(this, props));

    _this._clickHandler = _this._clickHandler.bind(_this);
    _this._doubleClickHandler = _this._doubleClickHandler.bind(_this);
    _this._mouseDownHandler = _this._mouseDownHandler.bind(_this);
    _this._mouseLeaveHandler = _this._mouseLeaveHandler.bind(_this);
    _this._mouseEnterHandler = _this._mouseEnterHandler.bind(_this);
    _this._mouseMoveHandler = _this._mouseMoveHandler.bind(_this);
    _this._wheelHandler = _this._wheelHandler.bind(_this);
    var stackBy = props.stackBy;

    var children = (0, _seriesUtils.getSeriesChildren)(props.children);
    var data = (0, _seriesUtils.getStackedData)(children, stackBy);
    _this.state = {
      scaleMixins: _this._getScaleMixins(data, props),
      data: data
    };
    return _this;
  }

  _createClass(XYPlot, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _reactUtils.checkIfStyleSheetIsImported)();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var children = (0, _seriesUtils.getSeriesChildren)(nextProps.children);
      var nextData = (0, _seriesUtils.getStackedData)(children, nextProps.stackBy);
      var scaleMixins = this.state.scaleMixins;

      var nextScaleMixins = this._getScaleMixins(nextData, nextProps);
      if (!checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, nextProps.hasTreeStructure)) {
        this.setState({
          scaleMixins: nextScaleMixins,
          data: nextData
        });
      }
    }

    /**
     * Trigger click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Click event.
     * @private
     */

  }, {
    key: '_clickHandler',
    value: function _clickHandler(event) {
      var onClick = this.props.onClick;

      if (onClick) {
        onClick(event);
      }
    }

    /**
     * Trigger doule-click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Double-click event.
     * @private
     */

  }, {
    key: '_doubleClickHandler',
    value: function _doubleClickHandler(event) {
      var onDoubleClick = this.props.onDoubleClick;

      if (onDoubleClick) {
        onDoubleClick(event);
      }
    }

    /**
     * Trigger mouse-down related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse down event.
     * @private
     */

  }, {
    key: '_mouseDownHandler',
    value: function _mouseDownHandler(event) {
      var _this2 = this;

      var _props = this.props,
          onMouseDown = _props.onMouseDown,
          children = _props.children;

      if (onMouseDown) {
        onMouseDown(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this2.refs['series' + index];
        if (component && component.onParentMouseDown) {
          component.onParentMouseDown(event);
        }
      });
    }

    /**
     * Trigger movement-related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse move event.
     * @private
     */

  }, {
    key: '_mouseMoveHandler',
    value: function _mouseMoveHandler(event) {
      var _this3 = this;

      var _props2 = this.props,
          onMouseMove = _props2.onMouseMove,
          children = _props2.children;

      if (onMouseMove) {
        onMouseMove(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this3.refs['series' + index];
        if (component && component.onParentMouseMove) {
          component.onParentMouseMove(event);
        }
      });
    }

    /**
     * Trigger onMouseLeave handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseLeaveHandler',
    value: function _mouseLeaveHandler(event) {
      var onMouseLeave = this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave({ event: event });
      }
    }

    /**
     * Trigger onMouseEnter handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseEnterHandler',
    value: function _mouseEnterHandler(event) {
      var onMouseEnter = this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter({ event: event });
      }
    }

    /**
     * Trigger doule-click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Double-click event.
     * @private
     */

  }, {
    key: '_wheelHandler',
    value: function _wheelHandler(event) {
      var onWheel = this.props.onWheel;

      if (onWheel) {
        onWheel(event);
      }
    }

    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */

  }, {
    key: '_getDefaultScaleProps',
    value: function _getDefaultScaleProps(props) {
      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(props, DEFAULT_MARGINS),
          innerWidth = _getInnerDimensions.innerWidth,
          innerHeight = _getInnerDimensions.innerHeight;

      var colorRanges = ['color', 'fill', 'stroke'].reduce(function (acc, attr) {
        var range = props[attr + 'Type'] === 'category' ? _theme.EXTENDED_DISCRETE_COLOR_RANGE : _theme.CONTINUOUS_COLOR_RANGE;
        return _extends({}, acc, _defineProperty({}, attr + 'Range', range));
      }, {});

      return _extends({
        xRange: [0, innerWidth],
        yRange: [innerHeight, 0]
      }, colorRanges, {
        opacityType: _theme.OPACITY_TYPE,
        sizeRange: _theme.SIZE_RANGE
      });
    }

    /**
     * Get the list of optional scale-related settings
     * @param {Object} props Object of props.
     * @returns {Object} Optional Props.
     * @private
     */

  }, {
    key: '_getOptionalScaleProps',
    value: function _getOptionalScaleProps(props) {
      return Object.keys(props).filter(function (prop) {
        return OPTIONAL_SCALE_PROPS.map(function (option) {
          return prop.endsWith(option);
        }).every(function (x) {
          return x;
        });
      }).reduce(function (obj, key) {
        obj[key] = props[key];
        return obj;
      }, {});
    }

    /**
     * Get the map of scales from the props, apply defaults to them and then pass
     * them further.
     * @param {Object} data Array of all data.
     * @param {Object} props Props of the component.
     * @returns {Object} Map of scale-related props.
     * @private
     */

  }, {
    key: '_getScaleMixins',
    value: function _getScaleMixins(data, props) {
      var _ref;

      var filteredData = data.filter(function (d) {
        return d;
      });
      var allData = (_ref = []).concat.apply(_ref, _toConsumableArray(filteredData));

      var defaultScaleProps = this._getDefaultScaleProps(props);
      var optionalScaleProps = this._getOptionalScaleProps(props);
      var userScaleProps = (0, _scalesUtils.extractScalePropsFromProps)(props, ATTRIBUTES);
      var missingScaleProps = (0, _scalesUtils.getMissingScaleProps)(_extends({}, defaultScaleProps, optionalScaleProps, userScaleProps), allData, ATTRIBUTES);
      var children = (0, _seriesUtils.getSeriesChildren)(props.children);
      var zeroBaseProps = {};
      var adjustBy = new Set();
      var adjustWhat = new Set();
      children.forEach(function (child, index) {
        if (!child || !data[index]) {
          return;
        }
        ATTRIBUTES.forEach(function (attr) {
          var _child$type$getParent = child.type.getParentConfig(attr, child.props),
              isDomainAdjustmentNeeded = _child$type$getParent.isDomainAdjustmentNeeded,
              zeroBaseValue = _child$type$getParent.zeroBaseValue;

          if (isDomainAdjustmentNeeded) {
            adjustBy.add(attr);
            adjustWhat.add(index);
          }
          if (zeroBaseValue) {
            var specifiedDomain = props[attr + 'Domain'];
            zeroBaseProps[attr + 'BaseValue'] = specifiedDomain ? specifiedDomain[0] : 0;
          }
        });
      });
      return _extends({}, defaultScaleProps, zeroBaseProps, userScaleProps, missingScaleProps, {
        _allData: data,
        _adjustBy: Array.from(adjustBy),
        _adjustWhat: Array.from(adjustWhat),
        _stackBy: props.stackBy
      });
    }

    /**
     * Checks if the plot is empty or not.
     * Currently checks the data only.
     * @returns {boolean} True for empty.
     * @private
     */

  }, {
    key: '_isPlotEmpty',
    value: function _isPlotEmpty() {
      var data = this.state.data;

      return !data || !data.length || !data.some(function (series) {
        return series && series.some(function (d) {
          return d;
        });
      });
    }

    /**
     * Prepare the child components (including series) for rendering.
     * @returns {Array} Array of child components.
     * @private
     */

  }, {
    key: '_getClonedChildComponents',
    value: function _getClonedChildComponents() {
      var props = this.props;
      var animation = this.props.animation;
      var _state = this.state,
          scaleMixins = _state.scaleMixins,
          data = _state.data;

      var dimensions = (0, _chartUtils.getInnerDimensions)(this.props, DEFAULT_MARGINS);
      var children = _react2.default.Children.toArray(this.props.children);
      var seriesProps = (0, _seriesUtils.getSeriesPropsFromChildren)(children);
      var XYPlotValues = (0, _scalesUtils.getXYPlotValues)(props, children);
      return children.map(function (child, index) {
        var dataProps = null;
        if (seriesProps[index]) {
          // Get the index of the series in the list of props and retrieve
          // the data property from it.
          var seriesIndex = seriesProps[index].seriesIndex;

          dataProps = { data: data[seriesIndex] };
        }

        return _react2.default.cloneElement(child, _extends({}, dimensions, {
          animation: animation
        }, seriesProps[index], scaleMixins, child.props, XYPlotValues[index], dataProps));
      });
    }
  }, {
    key: 'renderCanvasComponents',
    value: function renderCanvasComponents(components, props) {
      var componentsToRender = components.filter(function (c) {
        return c && !c.type.requiresSVG && c.type.isCanvas;
      });

      if (componentsToRender.length === 0) {
        return null;
      }
      var _componentsToRender$ = componentsToRender[0].props,
          marginLeft = _componentsToRender$.marginLeft,
          marginTop = _componentsToRender$.marginTop,
          marginBottom = _componentsToRender$.marginBottom,
          marginRight = _componentsToRender$.marginRight,
          innerHeight = _componentsToRender$.innerHeight,
          innerWidth = _componentsToRender$.innerWidth;

      return _react2.default.createElement(
        _canvasWrapper2.default,
        {
          innerHeight: innerHeight,
          innerWidth: innerWidth,
          marginLeft: marginLeft,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginRight: marginRight
        },
        componentsToRender
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          dontCheckIfEmpty = _props3.dontCheckIfEmpty,
          style = _props3.style,
          width = _props3.width,
          height = _props3.height;


      if (!dontCheckIfEmpty && this._isPlotEmpty()) {
        return _react2.default.createElement('div', {
          className: 'rv-xy-plot ' + className,
          style: _extends({
            width: width + 'px',
            height: height + 'px'
          }, this.props.style) });
      }
      var components = this._getClonedChildComponents();

      return _react2.default.createElement(
        'div',
        {
          style: {
            width: width + 'px',
            height: height + 'px'
          },
          className: 'rv-xy-plot ' + className },
        _react2.default.createElement(
          'svg',
          {
            className: 'rv-xy-plot__inner',
            width: width,
            height: height,
            style: style,
            onClick: this._clickHandler,
            onDoubleClick: this._doubleClickHandler,
            onMouseDown: this._mouseDownHandler,
            onMouseMove: this._mouseMoveHandler,
            onMouseLeave: this._mouseLeaveHandler,
            onMouseEnter: this._mouseEnterHandler,
            onWheel: this._wheelHandler },
          components.filter(function (c) {
            return c && c.type.requiresSVG;
          })
        ),
        this.renderCanvasComponents(components, this.props),
        components.filter(function (c) {
          return c && !c.type.requiresSVG && !c.type.isCanvas;
        })
      );
    }
  }]);

  return XYPlot;
}(_react2.default.Component);

XYPlot.displayName = 'XYPlot';

exports.default = XYPlot;