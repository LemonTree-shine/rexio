"use strict";

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ContextTheme = (0, _react.createContext)();

var Provider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Provider, _React$Component);

  _createClass(Provider, [{
    key: "render",
    value: function render() {
      var defaultValue = this.state.defaultValue;
      return _react["default"].createElement(ContextTheme.Provider, {
        value: _objectSpread({}, defaultValue, {
          $dispatch: this.$dispatch
        })
      }, this.props.children);
    }
  }]);

  function Provider(props) {
    var _this;

    _classCallCheck(this, Provider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props));

    _this.$dispatch = function (data) {
      var defaultValue = _this.state.defaultValue;

      _this.setState({
        defaultValue: _objectSpread({}, defaultValue, {}, data)
      });
    };

    _this.state = {
      defaultValue: _this.props.value || {} //默认数据

    };
    return _this;
  } //修改顶层数据


  return Provider;
}(_react["default"].Component);
/**
 * @param dataMap:所要接收的数据
 * @param deDispath：不需要需要传递dispath
 */


var connect = function connect(dataMap, deDispath) {
  return function (Wrap) {
    return (
      /*#__PURE__*/
      function (_React$Component2) {
        _inherits(_class, _React$Component2);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        }

        _createClass(_class, [{
          key: "render",
          value: function render() {
            return _react["default"].createElement(ContextTheme.Consumer, null, function (context) {
              var propsContext = {};

              if (dataMap && dataMap.length) {
                dataMap.forEach(function (key) {
                  propsContext[key] = context[key];
                });
                propsContext.$dispatch = context.$dispatch;
              } else {
                propsContext = context;
              }

              if (deDispath) {
                delete propsContext.$dispatch;
              }

              return _react["default"].createElement(Wrap, {
                $rexioCommonData: propsContext
              });
            });
          }
        }]);

        return _class;
      }(_react["default"].Component)
    );
  };
};

module.exports = {
  ContextTheme: ContextTheme,
  Provider: Provider,
  connect: connect
};