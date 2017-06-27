webpackJsonp([0],Array(48).concat([
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(217),
    now = __webpack_require__(553),
    toNumber = __webpack_require__(554);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchCountries = fetchCountries;
exports.stripeToken = stripeToken;
exports.stripeCharge = stripeCharge;
exports.storeConvertLoop = storeConvertLoop;
exports.storeEventConvertLoop = storeEventConvertLoop;
exports.storeInfusion = storeInfusion;

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoint = "/wp-admin/admin-ajax.php";

function fetchCountries() {
  var data = _qs2.default.stringify({ action: "countries" });

  return _axios2.default.post(endpoint, data).then(function (res) {
    return Array.isArray(res.data) ? res.data : [];
  });
}

function stripeToken(state) {
  var data = _qs2.default.stringify({
    action: "stripe_token",
    data: state.stripe
  });

  return _axios2.default.post(endpoint, data).then(function (res) {
    return res.data;
  });
}

function stripeCharge(state) {
  var contact = state.contact,
      currency = state.currency,
      amount = state.amount,
      donation_type = state.donation_type,
      token = state.stripe.token;


  var data = _extends({}, contact, {
    currency: currency,
    amount: amount,
    donation_type: donation_type,
    stripe_token: token
  });

  var dataAjax = _qs2.default.stringify({ action: "stripe_charge", data: data });

  return _axios2.default.post(endpoint, dataAjax);
}

function storeConvertLoop(state) {
  var data = _qs2.default.stringify({
    data: state.contact,
    action: "convertloop_contact"
  });

  return _axios2.default.post(endpoint, data);
}

function storeEventConvertLoop(state) {
  var _state$contact = state.contact,
      email = _state$contact.email,
      country = _state$contact.country;


  var metadata = {
    amount: state.amount,
    type: state.donation_type
  };

  var event = {
    name: "Donation-" + state.donation_type,
    person: { email: email },
    country: country,
    metadata: metadata
  };

  var data = _qs2.default.stringify({ data: event, action: "convertloop_event" });
  return _axios2.default.post(endpoint, data);
}

function storeInfusion(state) {
  var tags = "";
  if (state.donation_type == "monthly") tags = ["870", "924"];
  if (state.donation_type == "once") tags = ["868", "926"];
  var data = _qs2.default.stringify({
    data: _extends({}, state.contact, { tags: tags }),
    action: "infusion_contact"
  });

  return _axios2.default.post(endpoint, data);
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _this.handleEscKey = function (e) {
      if (e.keyCode == 27) _this.setState({ show: false });
    }, _this.close = function (e) {
      e.preventDefault();
      _this.setState({ show: false });
    }, _this.show = function () {
      _this.setState({ show: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.handleEscKey, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.handleEscKey, false);
    }
  }, {
    key: "render",
    value: function render() {
      var url = this.props.url;


      var iframeStyle = {
        height: window.innerHeight ? window.innerHeight : "100hv"
      };

      return _react2.default.createElement(
        "div",
        { className: this.state.show ? "modal modal--show" : "modal" },
        _react2.default.createElement(
          "a",
          { className: "modal__close", href: "#", onClick: this.close },
          _react2.default.createElement("i", { className: "ion-close" })
        ),
        _react2.default.createElement(
          "div",
          { className: "iframe-container", style: iframeStyle },
          this.state.show ? _react2.default.createElement("iframe", {
            src: url + "?autoplay=1",
            frameBorder: "0",
            height: "315",
            width: "100%",
            allowFullScreen: true
          }) : ""
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

exports.default = Modal;

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.merge = exports.$ = exports.style = exports.presets = exports.keyframes = exports.fontFace = exports.insertGlobal = exports.insertRule = exports.plugins = exports.styleSheet = undefined;
exports.speedy = speedy;
exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.isLikeRule = isLikeRule;
exports.idFor = idFor;
exports.css = css;
exports.rehydrate = rehydrate;
exports.flush = flush;
exports.select = select;
exports.parent = parent;
exports.media = media;
exports.pseudo = pseudo;
exports.active = active;
exports.any = any;
exports.checked = checked;
exports.disabled = disabled;
exports.empty = empty;
exports.enabled = enabled;
exports._default = _default;
exports.first = first;
exports.firstChild = firstChild;
exports.firstOfType = firstOfType;
exports.fullscreen = fullscreen;
exports.focus = focus;
exports.hover = hover;
exports.indeterminate = indeterminate;
exports.inRange = inRange;
exports.invalid = invalid;
exports.lastChild = lastChild;
exports.lastOfType = lastOfType;
exports.left = left;
exports.link = link;
exports.onlyChild = onlyChild;
exports.onlyOfType = onlyOfType;
exports.optional = optional;
exports.outOfRange = outOfRange;
exports.readOnly = readOnly;
exports.readWrite = readWrite;
exports.required = required;
exports.right = right;
exports.root = root;
exports.scope = scope;
exports.target = target;
exports.valid = valid;
exports.visited = visited;
exports.dir = dir;
exports.lang = lang;
exports.not = not;
exports.nthChild = nthChild;
exports.nthLastChild = nthLastChild;
exports.nthLastOfType = nthLastOfType;
exports.nthOfType = nthOfType;
exports.after = after;
exports.before = before;
exports.firstLetter = firstLetter;
exports.firstLine = firstLine;
exports.selection = selection;
exports.backdrop = backdrop;
exports.placeholder = placeholder;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;

var _objectAssign = __webpack_require__(139);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _sheet = __webpack_require__(516);

var _CSSPropertyOperations = __webpack_require__(210);

var _clean = __webpack_require__(512);

var _clean2 = _interopRequireDefault(_clean);

var _plugins = __webpack_require__(515);

var _hash = __webpack_require__(513);

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* stylesheet */


var styleSheet = exports.styleSheet = new _sheet.StyleSheet();
// an isomorphic StyleSheet shim. hides all the nitty gritty.

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// convenience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins
// we include these by default
var plugins = exports.plugins = styleSheet.plugins = new _plugins.PluginSet([_plugins.prefixes, _plugins.fallbacks]);
plugins.media = new _plugins.PluginSet(); // neat! media, font-face, keyframes
plugins.fontFace = new _plugins.PluginSet();
plugins.keyframes = new _plugins.PluginSet([_plugins.prefixes]);

// define some constants

var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
var isTest = process.env.NODE_ENV === 'test';

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes
// defaults to true in dev mode. recommend *not* to
// toggle often.
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called
// in prod / in incorrect order
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases
function simulations() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format
// and matches an existing rule on the element
// eg simulate('nthChild2', ':hover:active') etc
function simulate() {
  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  pseudos = (0, _clean2.default)(pseudos);
  if (!pseudos) return {};
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }
  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels.
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// hashes a string to something 'unique'
// we use this to generate ids for styles


function hashify() {
  var str = '';

  for (var _len2 = arguments.length, objs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objs[_key2] = arguments[_key2];
  }

  for (var i = 0; i < objs.length; i++) {
    str += JSON.stringify(objs[i]);
  }
  return (0, _hash2.default)(str).toString(36);
}

// of shape { 'data-css-<id>': '' }
function isLikeRule(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9]+)/.exec(keys[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object
function idFor(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9]+)/;
  var match = regex.exec(keys[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

function selector(id, path) {

  if (!id) {
    return path.replace(/\&/g, '');
  }
  if (!path) return '.css-' + id + ',[data-css-' + id + ']';

  var x = path.split(',').map(function (x) {
    return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
    : '.css-' + id + x + ',[data-css-' + id + ']' + x;
  }).join(',');

  if (canSimulate && /^\&\:/.exec(path) && !/\s/.exec(path)) {
    x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
  }
  return x;
}

function toCSS(_ref) {
  var selector = _ref.selector,
      style = _ref.style;

  var result = plugins.transform({ selector: selector, style: style });
  return result.selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
}

function deconstruct(style) {
  // we can be sure it's not infinitely nested here 
  var plain = void 0,
      selects = void 0,
      medias = void 0,
      supports = void 0;
  Object.keys(style).forEach(function (key) {
    if (key.indexOf('&') >= 0) {
      selects = selects || {};
      selects[key] = style[key];
    } else if (key.indexOf('@media') === 0) {
      medias = medias || {};
      medias[key] = deconstruct(style[key]);
    } else if (key.indexOf('@supports') === 0) {
      supports = supports || {};
      supports[key] = deconstruct(style[key]);
    } else if (key === 'label') {
      if (style.label.length > 0) {
        plain = plain || {};
        plain.label = hasLabels ? style.label.join('.') : '';
      }
    } else {
      plain = plain || {};
      plain[key] = style[key];
    }
  });
  return { plain: plain, selects: selects, medias: medias, supports: supports };
}

function deconstructedStyleToCSS(id, style) {
  var css = [];

  // plugins here
  var plain = style.plain,
      selects = style.selects,
      medias = style.medias,
      supports = style.supports;

  if (plain) {
    css.push(toCSS({ style: plain, selector: selector(id) }));
  }
  if (selects) {
    Object.keys(selects).forEach(function (key) {
      return css.push(toCSS({ style: selects[key], selector: selector(id, key) }));
    });
  }
  if (medias) {
    Object.keys(medias).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, medias[key]).join('') + '}');
    });
  }
  if (supports) {
    Object.keys(supports).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, supports[key]).join('') + '}');
    });
  }
  return css;
}

// this cache to track which rules have
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    var deconstructed = deconstruct(spec.style);
    deconstructedStyleToCSS(spec.id, deconstructed).map(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

// a simple cache to store generated rules
var registered = styleSheet.registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

function _getRegistered(rule) {
  if (isLikeRule(rule)) {
    var ret = registered[idFor(rule)];
    if (ret == null) {
      throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
    }
    return ret;
  }
  return rule;
}

// todo - perf
var ruleCache = {};
function toRule(spec) {
  register(spec);
  insert(spec);

  if (ruleCache[spec.id]) {
    return ruleCache[spec.id];
  }

  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
  Object.defineProperty(ret, 'toString', {
    enumerable: false, value: function value() {
      return 'css-' + spec.id;
    }
  });
  ruleCache[spec.id] = ret;
  return ret;
}

function log() {
  //eslint-disable-line no-unused-vars
  console.log(this); //eslint-disable-line no-console
  return this;
}

function isSelector(key) {
  var possibles = [':', '.', '[', '>', ' '],
      found = false,
      ch = key.charAt(0);
  for (var i = 0; i < possibles.length; i++) {
    if (ch === possibles[i]) {
      found = true;
      break;
    }
  }
  return found || key.indexOf('&') >= 0;
}

function joinSelectors(a, b) {
  var as = a.split(',').map(function (a) {
    return !(a.indexOf('&') >= 0) ? '&' + a : a;
  });
  var bs = b.split(',').map(function (b) {
    return !(b.indexOf('&') >= 0) ? '&' + b : b;
  });

  return bs.reduce(function (arr, b) {
    return arr.concat(as.map(function (a) {
      return b.replace(/\&/g, a);
    }));
  }, []).join(',');
}

function joinMediaQueries(a, b) {
  return a ? '@media ' + a.substring(6) + ' and ' + b.substring(6) : b;
}

function isMediaQuery(key) {
  return key.indexOf('@media') === 0;
}

function isSupports(key) {
  return key.indexOf('@supports') === 0;
}

function joinSupports(a, b) {
  return a ? '@supports ' + a.substring(9) + ' and ' + b.substring(9) : b;
}

// flatten a nested array
function flatten(inArr) {
  var arr = [];
  for (var i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
  }
  return arr;
}

// mutable! modifies dest.
function build(dest, _ref2) {
  var _ref2$selector = _ref2.selector,
      selector = _ref2$selector === undefined ? '' : _ref2$selector,
      _ref2$mq = _ref2.mq,
      mq = _ref2$mq === undefined ? '' : _ref2$mq,
      _ref2$supp = _ref2.supp,
      supp = _ref2$supp === undefined ? '' : _ref2$supp,
      _ref2$src = _ref2.src,
      src = _ref2$src === undefined ? {} : _ref2$src;


  if (!Array.isArray(src)) {
    src = [src];
  }
  src = flatten(src);

  src.forEach(function (_src) {
    if (isLikeRule(_src)) {
      var reg = _getRegistered(_src);
      if (reg.type !== 'css') {
        throw new Error('cannot merge this rule');
      }
      _src = reg.style;
    }
    _src = (0, _clean2.default)(_src);
    if (_src && _src.composes) {
      build(dest, { selector: selector, mq: mq, supp: supp, src: _src.composes });
    }
    Object.keys(_src || {}).forEach(function (key) {
      if (isSelector(key)) {

        if (key === '::placeholder') {
          build(dest, { selector: joinSelectors(selector, '::-webkit-input-placeholder'), mq: mq, supp: supp, src: _src[key] });
          build(dest, { selector: joinSelectors(selector, '::-moz-placeholder'), mq: mq, supp: supp, src: _src[key] });
          build(dest, { selector: joinSelectors(selector, '::-ms-input-placeholder'), mq: mq, supp: supp, src: _src[key] });
        }

        build(dest, { selector: joinSelectors(selector, key), mq: mq, supp: supp, src: _src[key] });
      } else if (isMediaQuery(key)) {
        build(dest, { selector: selector, mq: joinMediaQueries(mq, key), supp: supp, src: _src[key] });
      } else if (isSupports(key)) {
        build(dest, { selector: selector, mq: mq, supp: joinSupports(supp, key), src: _src[key] });
      } else if (key === 'composes') {
        // ignore, we already dealth with it
      } else {
        var _dest = dest;
        if (supp) {
          _dest[supp] = _dest[supp] || {};
          _dest = _dest[supp];
        }
        if (mq) {
          _dest[mq] = _dest[mq] || {};
          _dest = _dest[mq];
        }
        if (selector) {
          _dest[selector] = _dest[selector] || {};
          _dest = _dest[selector];
        }

        if (key === 'label') {
          if (hasLabels) {
            dest.label = dest.label.concat(_src.label);
          }
        } else {
          _dest[key] = _src[key];
        }
      }
    });
  });
}

function _css(rules) {
  var style = { label: [] };
  build(style, { src: rules }); // mutative! but worth it. 

  var spec = {
    id: hashify(style),
    style: style, label: hasLabels ? style.label.join('.') : '',
    type: 'css'
  };
  return toRule(spec);
}

var nullrule = {
  // 'data-css-nil': ''
};
Object.defineProperty(nullrule, 'toString', {
  enumerable: false, value: function value() {
    return 'css-nil';
  }
});

var inputCaches = typeof WeakMap !== 'undefined' ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()] : [nullrule];

var warnedWeakMapError = false;
function multiIndexCache(fn) {
  return function (args) {
    if (inputCaches[args.length]) {
      var coi = inputCaches[args.length];
      var ctr = 0;
      while (ctr < args.length - 1) {
        if (!coi.has(args[ctr])) {
          coi.set(args[ctr], new WeakMap());
        }
        coi = coi.get(args[ctr]);
        ctr++;
      }
      if (coi.has(args[args.length - 1])) {
        var ret = coi.get(args[ctr]);

        if (registered[ret.toString().substring(4)]) {
          // make sure it hasn't been flushed 
          return ret;
        }
      }
    }
    var value = fn(args);
    if (inputCaches[args.length]) {
      var _ctr = 0,
          _coi = inputCaches[args.length];
      while (_ctr < args.length - 1) {
        _coi = _coi.get(args[_ctr]);
        _ctr++;
      }
      try {
        _coi.set(args[_ctr], value);
      } catch (err) {
        if (isDev && !warnedWeakMapError) {
          var _console;

          warnedWeakMapError = true;
          (_console = console).warn.apply(_console, ['failed setting the WeakMap cache for args:'].concat(_toConsumableArray(args))); // eslint-disable-line no-console
          console.warn('this should NOT happen, please file a bug on the github repo.'); // eslint-disable-line no-console
        }
      }
    }
    return value;
  };
}

var cachedCss = typeof WeakMap !== 'undefined' ? multiIndexCache(_css) : _css;

function css() {
  for (var _len3 = arguments.length, rules = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    rules[_key3] = arguments[_key3];
  }

  if (rules[0] && rules[0].length && rules[0].raw) {
    throw new Error('you forgot to include glamor/babel in your babel plugins.');
  }

  rules = (0, _clean2.default)(rules);
  if (!rules) {
    return nullrule;
  }

  return cachedCss(rules);
}

css.insert = function (css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = true;
  }
};

var insertRule = exports.insertRule = css.insert;

css.global = function (selector, style) {
  return css.insert(toCSS({ selector: selector, style: style }));
};

var insertGlobal = exports.insertGlobal = css.global;

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    (function () {
      var inner = Object.keys(spec.keyframes).map(function (kf) {
        var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
        return result.name + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
      }).join('');

      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
        return styleSheet.insert('@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}');
      });

      inserted[spec.id] = true;
    })();
  }
}
css.keyframes = function (name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  // do not ignore empty keyframe definitions for now.
  kfs = (0, _clean2.default)(kfs) || {};
  var spec = {
    id: hashify(name, kfs),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
};

// we don't go all out for fonts as much, giving a simple font loading strategy
// use a fancier lib if you need moar power
css.fontFace = function (font) {
  font = (0, _clean2.default)(font);
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
};

var fontFace = exports.fontFace = css.fontFace;
var keyframes = exports.keyframes = css.keyframes;

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    styleSheet.insert('@font-face{' + (0, _CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}');
    inserted[spec.id] = true;
  }
}

// rehydrate the insertion cache with ids sent from
// renderStatic / renderStaticOptimized
function rehydrate(ids) {
  // load up ids
  (0, _objectAssign2.default)(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR.

function flush() {
  inserted = styleSheet.inserted = {};
  registered = styleSheet.registered = {};
  ruleCache = {};
  styleSheet.flush();
  styleSheet.inject();
}

function warnAboutPresetsDeprecation() {
  if (isDev) {
    console.warn('[Deprecation] In glamor v3 the `presets` object will be removed. See https://github.com/threepointone/glamor/issues/213 for more information.');
  }
}

var presets = exports.presets = {
  get mobile() {
    warnAboutPresetsDeprecation();
    return '(min-width: 400px)';
  },
  get Mobile() {
    warnAboutPresetsDeprecation();
    return '@media (min-width: 400px)';
  },
  get phablet() {
    warnAboutPresetsDeprecation();
    return '(min-width: 550px)';
  },
  get Phablet() {
    warnAboutPresetsDeprecation();
    return '@media (min-width: 550px)';
  },
  get tablet() {
    warnAboutPresetsDeprecation();
    return '(min-width: 750px)';
  },
  get Tablet() {
    warnAboutPresetsDeprecation();
    return '@media (min-width: 750px)';
  },
  get desktop() {
    warnAboutPresetsDeprecation();
    return '(min-width: 1000px)';
  },
  get Desktop() {
    warnAboutPresetsDeprecation();
    return '@media (min-width: 1000px)';
  },
  get hd() {
    warnAboutPresetsDeprecation();
    return '(min-width: 1200px)';
  },
  get Hd() {
    warnAboutPresetsDeprecation();
    return '@media (min-width: 1200px)';
  }
};

var style = exports.style = css;

function select(selector) {
  for (var _len4 = arguments.length, styles = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    styles[_key4 - 1] = arguments[_key4];
  }

  if (!selector) {
    return style(styles);
  }
  return css(_defineProperty({}, selector, styles));
}
var $ = exports.$ = select;

function parent(selector) {
  for (var _len5 = arguments.length, styles = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    styles[_key5 - 1] = arguments[_key5];
  }

  return css(_defineProperty({}, selector + ' &', styles));
}

var merge = exports.merge = css;
var compose = exports.compose = css;

function media(query) {
  for (var _len6 = arguments.length, rules = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    rules[_key6 - 1] = arguments[_key6];
  }

  return css(_defineProperty({}, '@media ' + query, rules));
}

function pseudo(selector) {
  for (var _len7 = arguments.length, styles = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    styles[_key7 - 1] = arguments[_key7];
  }

  return css(_defineProperty({}, selector, styles));
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return css({ '::placeholder': x });
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len8 = arguments.length, rules = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    rules[_key8] = arguments[_key8];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? rules.map(function (r) {
    var style = { label: [] };
    build(style, { src: r }); // mutative! but worth it.   
    return deconstructedStyleToCSS(hashify(style), deconstruct(style)).join('');
  }).join('') : '';
}

function attribsFor() {
  for (var _len9 = arguments.length, rules = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    rules[_key9] = arguments[_key9];
  }

  rules = (0, _clean2.default)(rules);
  var htmlAttributes = rules ? rules.map(function (rule) {
    idFor(rule); // throwaway check for rule
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ') : '';

  return htmlAttributes;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _camelToDashCase = __webpack_require__(93);

var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

// returns a style object with a single concated prefixed value string

exports['default'] = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return (function () {
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }));
  })();
};

module.exports = exports['default'];

/***/ }),
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _amountBtns = __webpack_require__(297);

var _amountBtns2 = _interopRequireDefault(_amountBtns);

var _clean_inputs = __webpack_require__(176);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var amount = function (_React$Component) {
  _inherits(amount, _React$Component);

  function amount() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, amount);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = amount.__proto__ || Object.getPrototypeOf(amount)).call.apply(_ref, [this].concat(args))), _this), _this.changeAmount = function (amount, e) {
      if (e) e.preventDefault();
      var el = _this.amountInput;
      if (amount == 5) el.focus();
      _this.props.onChange({ amount: amount });
    }, _this.handleAmount = function (e) {
      var val = e.currentTarget.value;
      var amount = (0, _clean_inputs.onlyNum)(val);
      _this.props.onChange({ amount: amount });
    }, _this.changeType = function (donation_type, e) {
      if (e) e.preventDefault();
      _this.props.onChange({ donation_type: donation_type });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(amount, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          texts = _props.texts,
          donation_type = _props.donation_type,
          amount = _props.amount;


      return _react2.default.createElement(
        "div",
        { style: { width: this.props.width, float: "left", padding: "1px" } },
        this.props.show_titles ? _react2.default.createElement(
          "h5",
          { style: { color: "#3C515F", paddingBottom: '20px' } },
          texts.step_amount_text
        ) : '',
        _react2.default.createElement(_amountBtns2.default, {
          amount: amount,
          texts: texts,
          changeAmount: this.changeAmount
        }),
        _react2.default.createElement(
          "div",
          { className: "row" },
          _react2.default.createElement(
            "div",
            { className: "form-group form-group--addon col-7-l" },
            _react2.default.createElement(
              "span",
              { className: "form-group__addon" },
              "USD"
            ),
            _react2.default.createElement("input", {
              ref: function ref(amountInput) {
                return _this2.amountInput = amountInput;
              },
              className: "form-control",
              type: "text",
              onChange: this.handleAmount,
              value: amount
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "form-group col-5-l" },
            _react2.default.createElement(
              "a",
              {
                href: "#",
                onClick: this.changeType.bind(null, "monthly"),
                className: donation_type == "monthly" ? "donate_react__type donate_react__type--active" : "donate_react__type "
              },
              texts.monthly
            ),
            _react2.default.createElement(
              "a",
              {
                href: "#",
                onClick: this.changeType.bind(null, "once"),
                className: donation_type == "once" ? "donate_react__type donate_react__type--active" : "donate_react__type "
              },
              texts.once
            )
          )
        )
      );
    }
  }]);

  return amount;
}(_react2.default.Component);

amount.defaultProps = { texts: {}, amount: 30 };
exports.default = amount;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _isEmail = __webpack_require__(252);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isEmpty = __webpack_require__(253);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_React$Component) {
  _inherits(Contact, _React$Component);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.validate = function (field) {
      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var valid = !(0, _isEmpty2.default)(val);
      if (field == "email") valid = (0, _isEmail2.default)(val);
      var contact = _extends({}, _this.props.errors.contact, _defineProperty({}, field, valid));
      return _extends({}, _this.props.errors, { contact: contact });
    }, _this.handleChange = function (field, e) {
      var val = e.currentTarget.value;
      var errors = _this.validate(field, val);

      _this.props.onChange({
        contact: _extends({}, _this.props.contact, _defineProperty({}, field, val)),
        errors: errors
      });
    }, _this.showErr = function (field) {
      return _this.props.errors.contact[field] == false ? "form-group__error" : "hidden";
    }, _this.inputErrStyle = function (field) {
      return _this.props.errors.contact[field] == false ? "form-group--error" : "";
    }, _this.validateAll = function () {
      var _this$props = _this.props,
          contact = _this$props.contact,
          texts = _this$props.texts;

      var name = _this.validate("name", contact.name);
      var email = _this.validate("email", contact.email);
      var country = contact.country || texts.country;
      var countryValidation = _this.validate("country", country);

      var errors = _extends({}, _this.props.errors, {
        contact: _extends({}, name.contact, email.contact, countryValidation.contact)
      });

      _this.props.onChange({ errors: errors });
      return errors;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          texts = _props.texts,
          contact = _props.contact;


      return _react2.default.createElement(
        "div",
        { style: { width: this.props.width, float: "left", padding: "1px" } },
        this.props.show_titles ? _react2.default.createElement(
          "h5",
          { style: { color: "#3C515F", paddingBottom: '20px' } },
          texts.step_contact_text
        ) : '',
        _react2.default.createElement(
          "div",
          { className: "row" },
          _react2.default.createElement(
            "div",
            { className: "form-group col-12-l" },
            _react2.default.createElement("input", {
              type: "text",
              className: "form-control " + this.inputErrStyle("name"),
              placeholder: texts.placeholder_name,
              onChange: this.handleChange.bind(null, "name"),
              value: contact.name
            }),
            _react2.default.createElement(
              "span",
              { className: this.showErr("name") },
              texts.validation_name
            )
          ),
          _react2.default.createElement(
            "div",
            { className: this.props.inline ? "form-group col-6-l" : "form-group col-12-l" },
            _react2.default.createElement("input", {
              type: "text",
              className: "form-control " + this.inputErrStyle("email"),
              placeholder: texts.placeholder_email,
              onChange: this.handleChange.bind(null, "email"),
              value: contact.email
            }),
            _react2.default.createElement(
              "span",
              { className: this.showErr("email") },
              texts.validation_email
            )
          ),
          _react2.default.createElement(
            "div",
            { className: this.props.inline ? "form-group col-6-l" : "form-group col-12-l" },
            _react2.default.createElement(
              "select",
              {
                type: "text",
                className: "form-control",
                placeholder: texts.placeholder_country,
                onChange: this.handleChange.bind(null, "country"),
                value: contact.country || texts.country
              },
              this.props.countries.map(function (country, i) {
                return _react2.default.createElement(
                  "option",
                  { key: i, value: country },
                  country
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Contact;
}(_react2.default.Component);

Contact.defaultProps = {
  contact: {},
  countries: [],
  errors: { contact: {} },
  texts: {},
  inline: false
};
exports.default = Contact;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _cardValidator = __webpack_require__(305);

var _cardValidator2 = _interopRequireDefault(_cardValidator);

var _cards = __webpack_require__(298);

var _cards2 = _interopRequireDefault(_cards);

var _clean_inputs = __webpack_require__(176);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CedritCard = function (_React$Component) {
  _inherits(CedritCard, _React$Component);

  function CedritCard(props) {
    _classCallCheck(this, CedritCard);

    var _this = _possibleConstructorReturn(this, (CedritCard.__proto__ || Object.getPrototypeOf(CedritCard)).call(this, props));

    _this.validateCard = function (card) {
      var number = _cardValidator2.default.number(card).isValid;
      return _this.updateErrors({ number: number });
    };

    _this.validateExpiry = function (month, year) {
      var valid = _cardValidator2.default.expirationDate({ month: month, year: year });
      var exp_month = valid.isValid;
      var exp_year = valid.isValid;
      return _this.updateErrors({ exp_month: exp_month, exp_year: exp_year });
    };

    _this.validateCvc = function (cvc) {
      cvc = cvc.length >= 3;
      return _this.updateErrors({ cvc: cvc });
    };

    _this.getCardType = function (cardNum) {
      return _cardValidator2.default.number(cardNum).card ? _cardValidator2.default.number(cardNum).card.type : null;
    };

    _this.updateErrors = function (field) {
      return _extends({}, _this.props.errors, { stripe: field });
    };

    _this.handleCard = function (e) {
      var val = e.currentTarget.value;
      var number = (0, _clean_inputs.onlyNum)(val);
      number = (0, _clean_inputs.maxLength)(number, 16);
      var errors = _this.validateCard(number);
      var card_type = _this.getCardType(number);
      var stripe = _extends({}, _this.props.stripe, { number: number, card_type: card_type });
      _this.props.onChange({ stripe: stripe, errors: errors });
    };

    _this.handleExpiry = function (type, e) {
      var stripe = _this.props.stripe;

      var val = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
      val = (0, _clean_inputs.maxLength)(val, 2);
      var exp_month = stripe.exp_month;
      var exp_year = stripe.exp_year;
      if (type == "exp_month") exp_month = val;
      if (type == "exp_year") exp_year = val;
      var errors = _this.validateExpiry(exp_month, exp_year);
      stripe = _extends({}, stripe, { exp_month: exp_month, exp_year: exp_year });

      _this.props.onChange({ stripe: stripe, errors: errors });
    };

    _this.handleCvc = function (e) {
      var stripe = _this.props.stripe;

      var cvc = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
      cvc = (0, _clean_inputs.maxLength)(cvc, 4);
      stripe = _extends({}, stripe, { cvc: cvc });
      var errors = _this.validateCvc(cvc);
      _this.props.onChange({ stripe: stripe, errors: errors });
    };

    _this.showErr = function (field) {
      if (_this.props.errors.stripe) {
        return _this.props.errors.stripe[field] == false ? "form-group__error" : "hidden";
      }

      return "";
    };

    _this.inputErrStyle = function (field) {
      if (_this.props.errors.stripe) {
        return _this.props.errors.stripe[field] == false ? "form-group--error" : "";
      }

      return "";
    };

    _this.validateAll = function (e) {
      if (e) e.preventDefault();
      var stripe = _this.props.stripe;

      var number = _this.validateCard(stripe.number);
      var exp_month = _this.validateExpiry(stripe.exp_month, stripe.exp_year);
      var cvc = _this.validateCvc(stripe.cvc);

      var errors = _extends({}, _this.props.errors, {
        stripe: _extends({}, number.stripe, exp_month.stripe, cvc.stripe)
      });

      _this.props.onChange({ errors: errors });

      return errors;
    };

    _this.togglePopover = function () {
      _this.setState({ showPopover: !_this.state.showPopover });
    };

    _this.state = {
      showPopover: false
    };
    return _this;
  }

  _createClass(CedritCard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          texts = _props.texts,
          stripe = _props.stripe,
          errors = _props.errors;


      return _react2.default.createElement(
        "div",
        {
          className: "donate_react__creditcard",
          style: { width: this.props.width, float: "left", padding: "1px" }
        },
        this.props.show_titles ? _react2.default.createElement(
          "h5",
          { style: { color: "#3C515F", paddingBottom: '20px' } },
          texts.step_payment_text
        ) : '',
        _react2.default.createElement(_cards2.default, this.props),
        _react2.default.createElement(
          "div",
          { className: "form-group" },
          _react2.default.createElement("input", {
            type: "text",
            placeholder: texts.placeholder_credit_card,
            className: "form-control " + this.inputErrStyle("number"),
            onChange: this.handleCard,
            value: stripe.number
          }),
          _react2.default.createElement(
            "span",
            { className: this.showErr("number") },
            texts.validation_card
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "row donate_react__creditcard__row" },
          _react2.default.createElement(
            "div",
            { className: "form-group col-4-l col-4" },
            _react2.default.createElement("input", {
              type: "text",
              placeholder: texts.placeholder_month,
              className: "form-control",
              onChange: this.handleExpiry.bind(null, "exp_month"),
              value: stripe.exp_month
            }),
            _react2.default.createElement(
              "span",
              { className: this.showErr("exp_month") },
              texts.validation_month
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "form-group col-4-l col-4" },
            _react2.default.createElement("input", {
              type: "text",
              placeholder: texts.placeholder_year,
              className: "form-control",
              onChange: this.handleExpiry.bind(null, "exp_year"),
              value: stripe.exp_year
            }),
            _react2.default.createElement(
              "span",
              { className: this.showErr("exp_year") },
              texts.validation_year
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "form-group col-4-l col-4" },
            _react2.default.createElement("input", {
              type: "text",
              placeholder: texts.placeholder_cvc,
              className: "form-control",
              onChange: this.handleCvc,
              value: stripe.cvc
            }),
            _react2.default.createElement(
              "span",
              {
                style: {
                  display: "block",
                  background: "#3C515F",
                  width: "20px",
                  height: "20px",
                  borderRadius: "20px",
                  color: "#fff",
                  textAlign: "center",
                  position: "absolute",
                  top: "12px",
                  right: "25px",
                  cursor: "pointer"
                },
                onClick: this.togglePopover
              },
              _react2.default.createElement("i", { className: "ion-help" })
            ),
            _react2.default.createElement(
              "span",
              { className: this.showErr("cvc") },
              texts.validation_cvc
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            style: this.state.showPopover ? {
              background: "#fff",
              boxShadow: "0 1px 3px 0 rgba(0,0,0,0.26)",
              borderRadius: "2px",
              textAlign: "center",
              display: "block",
              margin: "15px 0",
              position: "relative",
              zIndex: "100"
            } : { display: "none" }
          },
          _react2.default.createElement(
            "span",
            {
              style: {
                display: "block",
                position: "absolute",
                top: "2px",
                right: "2px",
                width: "15px",
                height: "15px",
                color: "red",
                cursor: "pointer"
              },
              onClick: this.togglePopover
            },
            _react2.default.createElement("i", { className: "ion-close" })
          ),
          _react2.default.createElement(
            "span",
            {
              style: {
                display: "block",
                color: "#3C515F",
                padding: "10px",
                fontSize: "14px"
              }
            },
            texts.explain_cvc
          ),
          _react2.default.createElement("img", {
            width: "60px",
            src: texts.template_uri + "/public/img/cvc.png",
            alt: ""
          })
        )
      );
    }
  }]);

  return CedritCard;
}(_react2.default.Component);

CedritCard.defaultProps = { texts: {}, stripe: {}, errors: {} };
exports.default = CedritCard;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maxYear = 19;

function verification(isValid, isPotentiallyValid, isCurrentYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isCurrentYear: isCurrentYear || false
  };
}

function expirationYear(value) {
  var currentFirstTwo, currentYear, firstTwo, len, twoDigitYear, valid, isCurrentYear;

  if (typeof value !== 'string') {
    return verification(false, false);
  }
  if (value.replace(/\s/g, '') === '') {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  len = value.length;

  if (len < 2) {
    return verification(false, true);
  }

  currentYear = new Date().getFullYear();

  if (len === 3) {
    // 20x === 20x
    firstTwo = value.slice(0, 2);
    currentFirstTwo = String(currentYear).slice(0, 2);
    return verification(false, firstTwo === currentFirstTwo);
  }

  if (len > 4) {
    return verification(false, false);
  }

  value = parseInt(value, 10);
  twoDigitYear = Number(String(currentYear).substr(2, 2));

  if (len === 2) {
    isCurrentYear = twoDigitYear === value;
    valid = value >= twoDigitYear && value <= twoDigitYear + maxYear;
  } else if (len === 4) {
    isCurrentYear = currentYear === value;
    valid = value >= currentYear && value <= currentYear + maxYear;
  }

  return verification(valid, valid, isCurrentYear);
}

module.exports = expirationYear;


/***/ }),
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (value) {
  if (Array.isArray(value)) value = value.join(',');

  return value.match(/-webkit-|-moz-|-ms-/) !== null;
};

module.exports = exports['default'];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssRuleSetToString;

var _appendPxIfNeeded = __webpack_require__(220);

var _appendPxIfNeeded2 = _interopRequireDefault(_appendPxIfNeeded);

var _camelCasePropsToDashCase = __webpack_require__(559);

var _camelCasePropsToDashCase2 = _interopRequireDefault(_camelCasePropsToDashCase);

var _mapObject = __webpack_require__(225);

var _mapObject2 = _interopRequireDefault(_mapObject);

var _prefixer = __webpack_require__(143);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMarkupForStyles(style) {
  return Object.keys(style).map(function (property) {
    return property + ': ' + style[property] + ';';
  }).join('\n');
}

function cssRuleSetToString(selector, rules, userAgent) {
  if (!rules) {
    return '';
  }

  var rulesWithPx = (0, _mapObject2.default)(rules, function (value, key) {
    return (0, _appendPxIfNeeded2.default)(key, value);
  });
  var prefixedRules = (0, _prefixer.getPrefixedStyle)(rulesWithPx, userAgent);
  var cssPrefixedRules = (0, _camelCasePropsToDashCase2.default)(prefixedRules);
  var serializedRules = createMarkupForStyles(cssPrefixedRules);

  return selector + '{' + serializedRules + '}';
}
module.exports = exports['default'];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enhancer = __webpack_require__(221);

var _enhancer2 = _interopRequireDefault(_enhancer);

var _plugins = __webpack_require__(226);

var _plugins2 = _interopRequireDefault(_plugins);

var _style = __webpack_require__(562);

var _style2 = _interopRequireDefault(_style);

var _styleRoot = __webpack_require__(560);

var _styleRoot2 = _interopRequireDefault(_styleRoot);

var _getState = __webpack_require__(223);

var _getState2 = _interopRequireDefault(_getState);

var _keyframes = __webpack_require__(563);

var _keyframes2 = _interopRequireDefault(_keyframes);

var _resolveStyles = __webpack_require__(227);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Radium(ComposedComponent) {
  return (0, _enhancer2.default)(ComposedComponent);
}

Radium.Plugins = _plugins2.default;
Radium.Style = _style2.default;
Radium.StyleRoot = _styleRoot2.default;
Radium.getState = _getState2.default;
Radium.keyframes = _keyframes2.default;

if (process.env.NODE_ENV !== 'production') {
  Radium.TestMode = {
    clearState: _resolveStyles.__clearStateForTests,
    disable: _resolveStyles.__setTestMode.bind(null, false),
    enable: _resolveStyles.__setTestMode.bind(null, true)
  };
}

exports.default = Radium;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Based on https://github.com/jsstyles/css-vendor, but without having to
                                                                                                                                                                                                                                                   * convert between different cases all the time.
                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                   */

exports.getPrefixedKeyframes = getPrefixedKeyframes;
exports.getPrefixedStyle = getPrefixedStyle;

var _inlineStylePrefixer = __webpack_require__(533);

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformValues(style) {
  return Object.keys(style).reduce(function (newStyle, key) {
    var value = style[key];
    if (Array.isArray(value)) {
      value = value.join(';' + key + ':');
    } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString === 'function') {
      value = value.toString();
    }

    newStyle[key] = value;
    return newStyle;
  }, {});
}

var _hasWarnedAboutUserAgent = false;
var _lastUserAgent = void 0;
var _cachedPrefixer = void 0;

function getPrefixer(userAgent) {
  var actualUserAgent = userAgent || global && global.navigator && global.navigator.userAgent;

  if (process.env.NODE_ENV !== 'production') {
    if (!actualUserAgent && !_hasWarnedAboutUserAgent) {
      /* eslint-disable no-console */
      console.warn('Radium: userAgent should be supplied for server-side rendering. See ' + 'https://github.com/FormidableLabs/radium/tree/master/docs/api#radium ' + 'for more information.');
      /* eslint-enable no-console */
      _hasWarnedAboutUserAgent = true;
    }
  }

  if (!_cachedPrefixer || actualUserAgent !== _lastUserAgent) {
    if (actualUserAgent === 'all') {
      _cachedPrefixer = {
        prefix: _inlineStylePrefixer2.default.prefixAll,
        prefixedKeyframes: 'keyframes'
      };
    } else {
      _cachedPrefixer = new _inlineStylePrefixer2.default({ userAgent: actualUserAgent });
    }
    _lastUserAgent = actualUserAgent;
  }
  return _cachedPrefixer;
}

function getPrefixedKeyframes(userAgent) {
  return getPrefixer(userAgent).prefixedKeyframes;
}

// Returns a new style object with vendor prefixes added to property names
// and values.
function getPrefixedStyle(style, userAgent) {
  var styleWithFallbacks = transformValues(style);
  var prefixer = getPrefixer(userAgent);
  var prefixedStyle = prefixer.prefix(styleWithFallbacks);
  return prefixedStyle;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103), __webpack_require__(1)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleKeeper = function () {
  function StyleKeeper(userAgent) {
    _classCallCheck(this, StyleKeeper);

    this._userAgent = userAgent;
    this._listeners = [];
    this._cssSet = {};
  }

  StyleKeeper.prototype.subscribe = function subscribe(listener) {
    var _this = this;

    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }

    return {
      // Must be fat arrow to capture `this`
      remove: function remove() {
        var listenerIndex = _this._listeners.indexOf(listener);
        if (listenerIndex > -1) {
          _this._listeners.splice(listenerIndex, 1);
        }
      }
    };
  };

  StyleKeeper.prototype.addCSS = function addCSS(css) {
    var _this2 = this;

    if (!this._cssSet[css]) {
      this._cssSet[css] = true;
      this._emitChange();
    }

    return {
      // Must be fat arrow to capture `this`
      remove: function remove() {
        delete _this2._cssSet[css];
        _this2._emitChange();
      }
    };
  };

  StyleKeeper.prototype.getCSS = function getCSS() {
    return Object.keys(this._cssSet).join('\n');
  };

  StyleKeeper.prototype._emitChange = function _emitChange() {
    this._listeners.forEach(function (listener) {
      return listener();
    });
  };

  return StyleKeeper;
}();

exports.default = StyleKeeper;
module.exports = exports['default'];

/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _amount = __webpack_require__(108);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(110);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(109);

var _contact2 = _interopRequireDefault(_contact);

var _four = __webpack_require__(174);

var _four2 = _interopRequireDefault(_four);

var _donate = __webpack_require__(79);

var actions = _interopRequireWildcard(_donate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(errors).every(function (key) {
    return errors[key] == true;
  });
}

var DonateInline = function (_Component) {
  _inherits(DonateInline, _Component);

  function DonateInline() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DonateInline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DonateInline.__proto__ || Object.getPrototypeOf(DonateInline)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: "monthly",
      amount: 30,
      currency: "usd",
      countries: [],
      contact: { name: "", email: "", country: "" },
      stripe: {
        card_type: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        token: ""
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four: false,
      show_titles: false
    }, _this.handleChange = function (field) {
      _this.setState(_extends({}, _this.state, field));
    }, _this.creditCardIsValid = function () {
      return new Promise(function (resolve, reject) {
        var errs = _this.creditCard.validateAll();
        var isValid = isAllValid(errs.stripe);
        return resolve(isValid);
      });
    }, _this.contactIsValid = function () {
      return new Promise(function (resolve, reject) {
        var errs = _this.contact.validateAll();
        var isValid = isAllValid(errs.contact);
        return resolve(isValid);
      });
    }, _this.handleSubmit = function (e) {
      if (e) e.preventDefault();

      _this.contactIsValid().then(function (res) {
        if (!res) return false;
      }).then(_this.creditCardIsValid).then(function (res) {
        if (!res) return false;
        _this.setState({ loading: true });
        actions.stripeToken(_this.state).then(function (res) {
          if (res.id) {
            var stripe = _extends({}, _this.state.stripe, { token: res.id });
            _this.setState({ stripe: stripe });

            actions.stripeCharge(_extends({}, _this.state, { stripe: stripe })).then(function (res) {
              return _this.completeTransaction(res.data);
            });
          }

          if (res.stripeCode) {
            _this.setState({ loading: false, declined: true });
          }
        });
      });
    }, _this.completeTransaction = function () {
      var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state = _this.state,
          amount = _this$state.amount,
          donation_type = _this$state.donation_type,
          contact = _this$state.contact;
      var customer = stripeResponse.customer,
          id = stripeResponse.id;

      var base = _this.props.redirect[donation_type];

      actions.storeConvertLoop(_this.state).then(actions.storeEventConvertLoop.bind(null, _this.state)).then(actions.storeInfusion.bind(null, _this.state)).then(function (res) {
        var url = base + "?customer_id=" + customer + "-" + contact.email + "&order_revenue=" + amount + "&order_id=" + id;
        window.location = url;
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DonateInline, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      actions.fetchCountries().then(function (countries) {
        return _this2.setState({ countries: countries });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.donateForm) {
        this.donateForm.addEventListener("keydown", function (e) {
          if (e.which == 9) {
            e.preventDefault();
            _this3.handleSubmit();
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var sectionWidth = "100%";
      var viewPortStyle = {
        width: "100%",
        left: this.state.left,
        display: "block"
      };

      var donationTypeStyle = {
        display: "inline",
        marginLeft: "15px",
        color: this.props.is_blue ? "#3C515F" : "#fff"
      };

      var backBtnStyle = {
        float: "right",
        background: "transparent",
        border: "none"
      };

      console.log('four', this.state.show_four);

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "form",
          {
            onSubmit: this.handleSubmit,
            className: this.props.is_blue ? "donate_react donate_inline" : "donate_react",
            style: this.state.show_four ? { display: "none" } : { display: "block" },
            ref: function ref(donate) {
              return _this4.donateForm = donate;
            }
          },
          _react2.default.createElement(
            "div",
            { className: "donate_react__viewport", style: viewPortStyle },
            _react2.default.createElement(_contact2.default, _extends({
              ref: function ref(contact) {
                return _this4.contact = contact;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              inline: true,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_amount2.default, _extends({}, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_creditCard2.default, _extends({
              ref: function ref(creditCard) {
                return _this4.creditCard = creditCard;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            }))
          ),
          _react2.default.createElement(
            "div",
            { style: { marginBottom: "10px" } },
            _react2.default.createElement(
              "button",
              {
                className: "donate_react__submit pull-left",
                onClick: this.handleSubmit,
                disabled: this.state.loading
              },
              this.props.texts.donate,
              this.state.loading ? '...' : ''
            ),
            _react2.default.createElement(
              "span",
              { style: donationTypeStyle },
              this.state.amount + " USD " + this.props.texts[this.state.donation_type]
            )
          )
        ),
        _react2.default.createElement(_four2.default, _extends({}, this.props, this.state))
      );
    }
  }]);

  return DonateInline;
}(_react.Component);

DonateInline.defaultProps = { texts: {}, redirect: {} };
exports.default = DonateInline;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__(74);

var _debounce2 = _interopRequireDefault(_debounce);

var _projectsIcons = __webpack_require__(175);

var _projectsIcons2 = _interopRequireDefault(_projectsIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var backgroundColors = {
  1: "#b91325",
  2: "#00355f",
  3: "#6e5785",
  4: "#95a0ad",
  5: "#156734",
  6: "#689038",
  7: "#7a2d04",
  8: "#b27009",
  9: "#E4A70F"
};

var Projects = function (_React$Component) {
  _inherits(Projects, _React$Component);

  function Projects() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Projects);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Projects.__proto__ || Object.getPrototypeOf(Projects)).call.apply(_ref, [this].concat(args))), _this), _this.state = { section: 1, bg: "#B91325", donateColor: "#B91325" }, _this.moveArrow = function (num) {
      var left = _this.el.querySelector(".projects__icons li:nth-child(" + num + ")").offsetLeft;
      _this.el.querySelector(".projects__arrow").style.left = left + "px";
    }, _this.updateUrl = function (hash) {
      history.pushState(null, null, "#" + hash);
    }, _this.changeContent = function (num) {
      var color = backgroundColors[num];
      var ind = num - 1;
      _this.setState({ bg: color, donateColor: color, section: num });
      _this.moveArrow(num);

      if (_this.props.contents.length > 0 && _this.props.contents[ind].hash_url) {
        _this.updateUrl(_this.props.contents[ind].hash_url);
      }

      _this.props.changeSection ? _this.props.changeSection(num) : "";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Projects, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var num = 1;

      this.props.contents.map(function (content, ind) {
        if (content.hash_url == window.location.hash.replace("#", "")) {
          num = ind + 1;
        }
      });

      var patt = new RegExp(/#projects-[1-9]/);
      var hash = window.location.hash;

      window.addEventListener("resize", (0, _debounce2.default)(function (event) {
        _this2.moveArrow(_this2.state.section);
      }, 200));

      setTimeout(function () {
        _this2.moveArrow(num);
        _this2.changeContent(num);
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props$contents = this.props.contents,
          contents = _props$contents === undefined ? [] : _props$contents;

      var content = contents[this.state.section - 1] || {};
      var title = content.title,
          text = content.text,
          imgUrl = content.imgUrl;


      var styleRight = {
        backgroundImage: "url(" + imgUrl + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px"
      };

      var styleLeft = { background: this.state.bg, minHeight: "500px" };

      var donateStyle = {
        background: "#fff",
        borderColor: "#fff",
        textTransform: "uppercase",
        color: this.state.donateColor
      };

      return _react2.default.createElement(
        "div",
        { className: "projects", ref: function ref(el) {
            return _this3.el = el;
          } },
        _react2.default.createElement(_projectsIcons2.default, { ref: "projectIcons", onChange: this.changeContent }),
        _react2.default.createElement(
          "div",
          { className: "projects__content" },
          _react2.default.createElement("div", { className: "projects__arrow" }),
          _react2.default.createElement(
            "div",
            {
              className: "col-4-l projects__content__content-left",
              style: styleLeft
            },
            _react2.default.createElement(
              "h4",
              null,
              title
            ),
            _react2.default.createElement("div", {
              className: "projects__content__content-left__text",
              dangerouslySetInnerHTML: { __html: text }
            }),
            _react2.default.createElement(
              "button",
              { className: "bs-donate", style: donateStyle },
              this.props.donate
            )
          ),
          _react2.default.createElement("div", {
            className: "col-8-l projects__content__content-right",
            style: styleRight
          })
        )
      );
    }
  }]);

  return Projects;
}(_react2.default.Component);

exports.default = Projects;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(80);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionVideo = function (_React$Component) {
  _inherits(SectionVideo, _React$Component);

  function SectionVideo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SectionVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SectionVideo.__proto__ || Object.getPrototypeOf(SectionVideo)).call.apply(_ref, [this].concat(args))), _this), _this.showVideo = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SectionVideo, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var linkStyle = { float: "left", lineHeight: "0" };
      var imageStyle = { width: "100px", margin: "0 auto" };
      imageStyle = _extends({}, imageStyle, this.props.imageStyle);

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }),
        _react2.default.createElement(
          "a",
          {
            href: "#",
            className: "image-video__link",
            style: linkStyle,
            onClick: this.showVideo
          },
          _react2.default.createElement("img", { style: imageStyle, src: this.props.imgUrl, alt: "" })
        )
      );
    }
  }]);

  return SectionVideo;
}(_react2.default.Component);

SectionVideo.defaultProps = {
  imgUrl: "",
  url: "https://www.youtube.com/embed/_lQvw2vSDbs",
  imageStyle: {}
};
exports.default = SectionVideo;

/***/ }),
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _donate = __webpack_require__(79);

var actions = _interopRequireWildcard(_donate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Four = function (_Component) {
	_inherits(Four, _Component);

	function Four(props) {
		_classCallCheck(this, Four);

		var _this = _possibleConstructorReturn(this, (Four.__proto__ || Object.getPrototypeOf(Four)).call(this, props));

		_this.handleYes = function () {

			actions.stripeToken(_this.props).then(function (res) {
				if (res.id) {
					var stripe = _extends({}, _this.props.stripe, { token: res.id });
					_this.setState({ loading: true, stripe: stripe });

					actions.stripeCharge(_extends({}, _this.props, { stripe: stripe, donation_type: "monthly" })).then(function (res) {
						return _this.completeTransaction(res.data);
					});
				}
			});
		};

		_this.handleNo = function (e) {
			e.preventDefault();
			_this.props.changeSection(1);
		};

		_this.completeTransaction = function () {
			var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _this$props = _this.props,
			    amount = _this$props.amount,
			    donation_type = _this$props.donation_type;

			var base = _this.props.redirect["monthly"];
			var customer = stripeResponse.customer,
			    id = stripeResponse.id;


			actions.storeConvertLoop(_this.props).then(actions.storeEventConvertLoop.bind(null, _this.props)).then(actions.storeInfusion.bind(null, _this.props)).then(function (res) {
				var url = base + "?customer_id=" + customer + "-" + id + "&order_revenue=" + amount + "&order_id=" + id;
				window.location = url;
			});
		};

		_this.state = {
			loading: false
		};
		return _this;
	}

	_createClass(Four, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    texts = _props.texts,
			    amount = _props.amount;

			var d = parseInt(amount) / 30;
			d = d.toFixed(2);

			return _react2.default.createElement(
				"div",
				{ style: this.props.show_four ? { display: "block", textAlign: "center" } : { display: "none" } },
				_react2.default.createElement(
					"h5",
					{ style: { fontSize: "18px", color: "#3C515F", marginBottom: "20px" } },
					texts.text_four_step
				),
				_react2.default.createElement(
					"h3",
					{ style: { color: "#3C515F", marginBottom: "20px" } },
					texts.subtext_four_step + " $" + d
				),
				_react2.default.createElement(
					"div",
					{ className: "col-6 col-6-l" },
					_react2.default.createElement(
						"button",
						{
							onClick: this.handleYes,
							style: { background: "#50B45A", width: "100%" }
						},
						texts.yes,
						this.state.loading ? "..." : ""
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "col-6 col-6-l" },
					_react2.default.createElement(
						"button",
						{ onClick: this.handleNo, style: { background: "transparent", border: "1px solid #F1364E", width: "100%", color: "#F1364E" } },
						texts.no
					)
				)
			);
		}
	}]);

	return Four;
}(_react.Component);

exports.default = Four;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectsIcons = function (_React$Component) {
  _inherits(ProjectsIcons, _React$Component);

  function ProjectsIcons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProjectsIcons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProjectsIcons.__proto__ || Object.getPrototypeOf(ProjectsIcons)).call.apply(_ref, [this].concat(args))), _this), _this.changeContent = function (num, e) {
      e.preventDefault();
      _this.props.onChange(num);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProjectsIcons, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "ul",
        { className: "projects__icons" },
        _react2.default.createElement(
          "li",
          { id: "projects-1" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 1), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "68px", height: "67px", viewBox: "0 0 68 67", version: "1.1" },
              _react2.default.createElement("path", { d: "M67.3673112,32.026012 C67.2600797,30.6734635 66.0912564,29.6302188 64.6758007,29.6302188 L3.22679192,29.6302188 C1.81669775,29.6302188 0.647874444,30.6734635 0.540642948,32.026012 C0.513835074,32.3667703 -0.043768705,40.471576 6.54560672,47.2972274 C11.8750121,52.8227547 20.2015377,55.7952158 31.2517434,56.2146107 L31.2517434,61.006197 L21.5365699,61.006197 C20.0460521,61.006197 18.8396977,62.1647753 18.8396977,63.5959602 C18.8396977,65.0271452 20.0460521,66.1857235 21.5365699,66.1857235 L45.9102889,66.1857235 C47.4008067,66.1857235 48.6125226,65.0271452 48.6125226,63.5959602 C48.6125226,62.1647753 47.4008067,61.006197 45.9102889,61.006197 L36.6454876,61.006197 L36.6454876,56.2146107 C47.6956933,55.7952158 56.0275805,52.8227547 61.3569859,47.2972274 C67.9463613,40.471576 67.3941191,32.3667703 67.3673112,32.026012 L67.3673112,32.026012 Z M61.8395276,34.8097454 C61.5017484,37.0797201 60.4669644,40.5973945 57.4055052,43.7743106 C52.7034041,48.6445334 44.811166,51.1137206 33.9539771,51.1137206 C23.1450423,51.1137206 15.2796121,48.6655031 10.5667878,43.8424622 C7.45171286,40.6498188 6.40620578,37.0954474 6.06306499,34.8097454 L61.8395276,34.8097454 Z M46.6501862,13.3734255 C46.6501862,6.44292538 40.7846234,0.80206448 33.5679437,0.80206448 C26.351264,0.80206448 20.4803396,6.44292538 20.4803396,13.3734255 C20.4803396,20.3039256 26.351264,25.9447865 33.5679437,25.9447865 C40.7846234,25.9447865 46.6501862,20.3039256 46.6501862,13.3734255 L46.6501862,13.3734255 Z M41.256442,13.3734255 C41.256442,17.4467981 37.8089494,20.7600175 33.5679437,20.7600175 C29.326938,20.7600175 25.8740839,17.4467981 25.8740839,13.3734255 C25.8740839,9.30005288 29.326938,5.98683346 33.5679437,5.98683346 C37.8089494,5.98683346 41.256442,9.30005288 41.256442,13.3734255 L41.256442,13.3734255 Z", id: "Fill-7", stroke: "none", fill: "#B91325", fillRule: "evenodd" })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-2" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 2), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "115 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M167.517255,38.9955022 C167.707985,38.6134211 167.824284,38.3996377 167.828936,38.3905405 C168.359259,37.4034978 168.070837,36.1844773 167.14975,35.5294812 L159.00883,29.7436824 C158.338948,29.2660811 157.450425,29.1842065 156.692156,29.5208018 C156.231613,29.7300366 154.556909,30.6352048 152.663564,33.4416812 C150.146856,33.1323774 147.244037,32.9322397 144.201658,32.9322397 C141.131368,32.9322397 138.25646,33.1323774 135.749057,33.4416812 C133.855711,30.6352048 132.181008,29.7300366 131.720464,29.5208018 C130.962195,29.179658 130.073672,29.2615325 129.403791,29.7436824 L121.267522,35.5294812 C120.341783,36.1844773 120.053362,37.4034978 120.583685,38.3905405 C120.588337,38.3996377 120.695332,38.5997754 120.876758,38.9545649 C117.83438,41.3016343 115.196721,44.672135 115.196721,49.2798506 C115.196721,57.6674395 121.704806,57.6674395 127.654656,57.6674395 L160.962651,57.6674395 C164.135284,57.6674395 166.879937,57.6674395 169.098919,56.6940425 C171.834269,55.4886677 173.215899,52.9914951 173.215899,49.2798506 C173.215899,44.7039751 170.564285,41.3425715 167.517255,38.9955022 L167.517255,38.9955022 Z M124.979782,53.0551753 C120.47669,52.9187178 119.890544,52.2227844 119.890544,49.2798506 C119.890544,47.2056963 120.69068,44.9950845 122.728236,43.0573877 C123.109696,43.994396 123.50046,45.0269246 123.863313,46.1185847 C124.654145,48.488397 124.910003,51.1948044 124.979782,53.0551753 L124.979782,53.0551753 Z M136.921349,53.1779871 L129.594521,53.1779871 C129.524741,51.0174097 129.23632,47.7151377 128.240802,44.726718 C127.319715,41.9702761 126.263721,39.5777209 125.533364,38.0493967 L130.683078,34.3877866 C131.678596,35.4294124 133.283521,37.6263784 134.716323,41.8974988 C136.344507,46.7690322 136.80505,50.8491121 136.921349,53.1779871 L136.921349,53.1779871 Z M150.356194,37.7764817 C150.002646,38.604324 149.658401,39.5049436 149.32346,40.5056321 C147.504546,45.9366414 147.006787,50.4533853 146.885836,53.0870154 L141.526784,53.0870154 C141.410485,50.4533853 140.908074,45.9366414 139.08916,40.5056321 C138.754219,39.5049436 138.409975,38.604324 138.056426,37.7764817 C139.926512,37.6081841 141.964068,37.5126638 144.201658,37.5126638 C146.4439,37.5126638 148.481456,37.6081841 150.356194,37.7764817 L150.356194,37.7764817 Z M162.879256,38.0493967 C162.148899,39.5777209 161.092905,41.9702761 160.171818,44.726718 C159.1763,47.7151377 158.892531,51.0174097 158.822752,53.1779871 L151.491271,53.1779871 C151.60757,50.8491121 152.068113,46.7690322 153.696298,41.8974988 C155.138404,37.6036355 156.74798,35.411218 157.72489,34.3877866 L162.879256,38.0493967 Z M168.526729,49.2798506 C168.526729,51.9180293 167.642858,52.3046589 167.168358,52.5184424 C166.307747,52.8959749 164.967984,53.0187866 163.432839,53.0642725 C163.502618,51.2039016 163.753823,48.5020427 164.549308,46.1185847 C164.91216,45.0269246 165.302924,43.994396 165.684385,43.0573877 C167.726593,44.9996331 168.526729,47.2056963 168.526729,49.2798506 L168.526729,49.2798506 Z M158.725061,15.1973108 C158.725061,7.33280908 152.170456,0.9375 144.108619,0.9375 C136.051434,0.9375 129.492178,7.33280908 129.492178,15.1973108 C129.492178,23.0572639 136.051434,29.452573 144.108619,29.452573 C152.170456,29.452573 158.725061,23.0572639 158.725061,15.1973108 L158.725061,15.1973108 Z M154.026586,15.1973108 C154.026586,20.5327998 149.579318,24.8721489 144.108619,24.8721489 C138.637921,24.8721489 134.186,20.5327998 134.186,15.1973108 C134.186,9.85727319 138.637921,5.51792407 144.108619,5.51792407 C149.579318,5.51792407 154.026586,9.85727319 154.026586,15.1973108 L154.026586,15.1973108 Z",
                id: "Fill-10",
                stroke: "none",
                fill: "#00355F",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-3" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 3), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "226 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M284.41262,48.4019739 C284.398665,47.8243037 283.975337,34.0284485 276.662464,18.376771 C272.261715,8.97029932 266.483987,4.6582417 262.241405,2.6705105 C260.836515,1.91999414 259.282762,1.40600415 257.645274,1.14218628 C257.021912,1.02847168 256.61254,0.992083008 256.533456,0.987534424 L256.533456,1.00118018 C256.114781,0.964791504 255.700757,0.9375 255.272777,0.9375 C251.593081,0.9375 248.229718,2.28842944 245.661839,4.49449268 C241.986794,6.96892236 237.818643,11.1900083 234.459932,18.376771 C228.831067,30.4168728 227.286618,41.3334744 226.86329,46.0048701 C226.560913,47.0192043 226.393443,48.1108645 226.393443,49.2843992 C226.393443,57.671988 232.892223,57.671988 238.837421,57.671988 L272.108201,57.671988 C275.280834,57.671988 278.020835,57.671988 280.239817,56.6940425 C282.970515,55.4886677 284.352145,52.9960437 284.352145,49.2843992 C284.352145,48.979644 284.310277,48.6976318 284.287018,48.4065225 L284.41262,48.4019739 Z M265.186092,15.1973108 C265.186092,20.5327998 260.738823,24.8766975 255.272777,24.8766975 C249.80673,24.8766975 245.364113,20.5327998 245.364113,15.1973108 C245.364113,12.067885 246.917866,9.30689453 249.285711,7.53749536 C251.151145,6.43673804 252.742113,5.90910229 253.746936,5.67257593 C254.249347,5.59525 254.751758,5.51792407 255.272777,5.51792407 C260.738823,5.51792407 265.186092,9.86182178 265.186092,15.1973108 L265.186092,15.1973108 Z M238.642039,20.2416904 C239.311921,18.8088865 240.014366,17.5443801 240.735419,16.375394 C241.354129,23.6895171 247.634267,29.4571216 255.272777,29.4571216 C263.213663,29.4571216 269.67988,23.2301101 269.856654,15.5157117 C270.763786,16.8939326 271.643005,18.4586455 272.480357,20.2416904 C275.727421,27.1919268 277.527728,33.8101165 278.541854,38.9090791 C275.39248,36.5119753 271.866299,35.1883374 270.428845,34.733479 C267.591153,33.8283108 261.780861,32.9322397 255.370468,32.9322397 C248.969378,32.9322397 243.400989,33.7919221 240.316743,34.733479 C238.851377,35.1792402 235.622921,36.3891636 232.64567,38.5360952 C233.6691,33.4962642 235.464754,27.0372749 238.642039,20.2416904 L238.642039,20.2416904 Z M278.309256,52.5184424 C277.011361,53.091564 274.634212,53.091564 272.108201,53.091564 L238.637387,53.091564 C231.859489,53.091564 231.077961,52.7003857 231.077961,49.2843992 C231.077961,49.0296785 231.101221,48.7704092 231.129132,48.5065913 L231.301255,48.5111399 C231.301255,48.488397 231.319863,47.9880527 231.389642,47.0965303 C232.752665,42.2977742 238.967676,37.5126638 255.370468,37.5126638 C274.280663,37.5126638 279.667627,43.8670356 279.667627,49.2843992 C279.667627,51.9225779 278.783755,52.3092075 278.309256,52.5184424 L278.309256,52.5184424 Z",
                id: "Fill-5",
                stroke: "none",
                fill: "#6E5785",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-4" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 4), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "337 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M395.609342,49.2843992 C395.609342,39.9279619 384.51443,35.6386472 381.672086,34.733479 C378.829741,33.8283108 373.014798,32.9322397 366.595101,32.9322397 C360.189359,32.9322397 354.616318,33.7964707 351.52742,34.733479 C348.443174,35.6704873 337.590164,39.9279619 337.590164,49.2843992 C337.590164,57.671988 344.098248,57.671988 350.048098,57.671988 L383.351441,57.671988 C386.528726,57.671988 389.27338,57.671988 391.492362,56.6940425 C394.227711,55.4886677 395.609342,52.9960437 395.609342,49.2843992 M390.91552,49.2843992 C390.91552,51.9225779 390.031648,52.3092075 389.561801,52.5184424 C388.263905,53.091564 385.877453,53.091564 383.351441,53.091564 L349.843412,53.091564 C343.060863,53.091564 342.279334,52.7003857 342.279334,49.2843992 C342.279334,43.8670356 347.666298,37.5126638 366.595101,37.5126638 C385.523904,37.5126638 390.91552,43.8670356 390.91552,49.2843992 M381.113851,15.1973108 C381.113851,7.33280908 374.559247,0.9375 366.502062,0.9375 C358.444876,0.9375 351.88562,7.33280908 351.88562,15.1973108 C351.88562,23.0618125 358.444876,29.4571216 366.502062,29.4571216 C374.559247,29.4571216 381.113851,23.0618125 381.113851,15.1973108 M376.420029,15.1973108 C376.420029,20.5327998 371.968108,24.8766975 366.502062,24.8766975 C361.026711,24.8766975 356.579443,20.5327998 356.579443,15.1973108 C356.579443,9.86182178 361.026711,5.51792407 366.502062,5.51792407 C371.968108,5.51792407 376.420029,9.86182178 376.420029,15.1973108",
                id: "Fill-3",
                stroke: "none",
                fill: "#8B97A6",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-5" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 5), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "448 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M487.667922,57.6674395 L455.457788,57.6674395 C452.140945,57.6674395 448.786885,55.2475928 448.786885,50.6262314 C448.786885,49.3480793 449.066003,48.247322 449.526546,47.3194109 C454.108721,33.9283796 462.789269,8.46540649 463.380067,6.28663477 C464.370933,2.58863599 467.631953,0.9375 470.418474,0.9375 L495.42273,0.9375 C497.176517,0.9375 498.851221,1.79718237 499.92117,3.24363208 C501.107419,4.85383081 501.39584,6.94617944 500.702699,8.98849365 C499.772308,11.7267412 492.743204,37.6946072 491.738382,41.5427092 C490.691692,45.5409146 487.556275,47.9243726 483.35556,47.9243726 L455.760165,47.9243726 C455.746209,47.9243726 454.471574,48.0153442 453.8203,49.0979072 C453.769129,49.220719 453.713305,49.3389822 453.648178,49.4526968 C453.522575,49.7710977 453.443492,50.1577273 453.443492,50.6262314 C453.443492,52.9369121 454.983289,53.1188555 455.457788,53.1188555 L487.667922,53.1188555 C489.705478,53.1188555 492.031455,52.2910132 492.626905,50.4397395 C493.054885,49.1524902 499.70718,25.5134993 502.233192,16.5164001 C502.572784,15.3064768 503.838116,14.583252 505.094144,14.9243958 C506.336216,15.2564424 507.066573,16.5118516 506.72698,17.7217749 C506.350172,19.0454128 497.599845,50.1895674 497.060218,51.822509 C495.915837,55.3704045 492.222185,57.6674395 487.667922,57.6674395 M455.783425,43.3757886 L483.35556,43.3757886 C485.411724,43.3757886 486.714271,42.3751001 487.230638,40.4101118 C488.174985,36.7939875 495.287823,10.4986235 496.283342,7.55114111 C496.506636,6.90524219 496.455464,6.32302344 496.148435,5.90455371 C495.953053,5.64528442 495.678588,5.48608398 495.42273,5.48608398 L470.418474,5.48608398 C470.083533,5.48608398 468.380918,5.58160425 467.883159,7.44652368 C467.278405,9.67987842 459.495685,32.5092214 455.783425,43.3757886",
                id: "Fill-1",
                stroke: "none",
                fill: "#005921",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-6" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 6), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "558 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M616.051965,55.2748843 C616.051965,53.9512463 615.028535,52.8777805 613.763203,52.8777805 L589.331137,52.8777805 L589.331137,46.5552488 C597.458102,45.5409146 605.436204,39.2092856 605.436204,29.4889617 L605.436204,21.6335571 C605.436204,20.3099192 604.408122,19.241002 603.147443,19.241002 C601.882111,19.241002 600.858681,20.3099192 600.858681,21.6335571 L600.858681,29.4889617 C600.858681,37.1624229 593.690019,41.9156931 587.042376,41.9156931 C580.394733,41.9156931 573.226071,37.1624229 573.226071,29.4889617 L573.226071,21.6335571 C573.226071,20.3099192 572.202641,19.241002 570.937309,19.241002 C569.676629,19.241002 568.648547,20.3099192 568.648547,21.6335571 L568.648547,29.4889617 C568.648547,39.2092856 576.626649,45.5409146 584.753614,46.5552488 L584.753614,52.8777805 L560.316897,52.8777805 C559.056217,52.8777805 558.032787,53.9512463 558.032787,55.2748843 C558.032787,56.5985222 559.056217,57.6674395 560.316897,57.6674395 L613.763203,57.6674395 C615.028535,57.6674395 616.051965,56.5985222 616.051965,55.2748843 L616.051965,55.2748843 Z M597.146421,27.3010928 L597.146421,11.5948323 C597.146421,5.71806177 592.615417,0.9375 587.042376,0.9375 C581.469334,0.9375 576.93833,5.71806177 576.93833,11.5948323 L576.93833,27.3010928 C576.93833,33.1778633 581.469334,37.958425 587.042376,37.958425 C592.615417,37.958425 597.146421,33.1778633 597.146421,27.3010928 L597.146421,27.3010928 Z M592.57355,27.3010928 C592.57355,30.5396846 590.089406,33.1687661 587.042376,33.1687661 C583.995346,33.1687661 581.515854,30.5396846 581.515854,27.3010928 L581.515854,11.5948323 C581.515854,8.36078906 583.995346,5.72715894 587.042376,5.72715894 C590.089406,5.72715894 592.57355,8.36078906 592.57355,11.5948323 L592.57355,27.3010928 Z",
                id: "Fill-19",
                stroke: "none",
                fill: "#689038",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-7" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 7), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "671 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M729.204158,29.3024697 C729.204158,13.8099927 719.351318,1.1922207 707.172501,0.96024292 L707.172501,0.9375 L693.55623,0.9375 C681.219246,0.9375 671.180328,13.664438 671.180328,29.3024697 C671.180328,44.9405015 681.219246,57.6674395 693.55623,57.6674395 L706.8143,57.6674395 L706.832908,57.6674395 C719.169892,57.6674395 729.204158,44.9405015 729.204158,29.3024697 L729.204158,29.3024697 Z M694.812257,5.42240381 C688.597246,10.4667834 684.461658,19.272842 684.461658,29.3024697 C684.461658,39.3275488 688.597246,48.138156 694.807605,53.1825356 L693.55623,53.1825356 C683.726649,53.1825356 675.734591,42.4706204 675.734591,29.3024697 C675.734591,16.1343191 683.726649,5.42240381 693.55623,5.42240381 L694.812257,5.42240381 Z M724.649894,29.3024697 C724.649894,42.4706204 716.657836,53.1870842 706.832908,53.1870842 L706.832908,53.1825356 L706.8143,53.1825356 C696.998676,53.1734385 689.015922,42.4660718 689.015922,29.3024697 C689.015922,16.1343191 697.00798,5.42240381 706.832908,5.42240381 C716.657836,5.42240381 724.649894,16.1343191 724.649894,29.3024697 L724.649894,29.3024697 Z M721.072541,29.3024697 C721.072541,19.1818704 715.341333,11.2491399 708.02846,11.2491399 C700.715588,11.2491399 694.989032,19.1818704 694.989032,29.3024697 C694.989032,39.4276177 700.715588,47.3557996 708.02846,47.3557996 C715.341333,47.3557996 721.072541,39.4276177 721.072541,29.3024697 L721.072541,29.3024697 Z M716.518277,29.3024697 C716.518277,36.65753 712.629243,42.8708958 708.02846,42.8708958 C703.427677,42.8708958 699.543295,36.65753 699.543295,29.3024697 C699.543295,21.9474094 703.427677,15.7340437 708.02846,15.7340437 C712.629243,15.7340437 716.518277,21.9474094 716.518277,29.3024697 L716.518277,29.3024697 Z",
                id: "Fill-12-Copy",
                stroke: "none",
                fill: "#7A2D04",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-8" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 8), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "784 0 59 58", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", {
                d: "M842.347047,44.1308535 L842.347047,43.020999 L841.458523,42.3296143 C834.196822,36.7166616 830.033323,27.801437 830.033323,17.8809753 C830.033323,11.2536885 824.734747,6.08194849 819.319871,5.00393408 C819.115185,2.23839502 815.356406,0.9375 813.337458,0.9375 C811.323161,0.9375 807.94119,2.23839502 807.596946,4.86747656 C801.702919,6.28208618 796.646245,11.2536885 796.646245,17.8809753 C796.646245,27.801437 792.478093,36.712113 785.21174,42.3296143 L784.327869,43.020999 L784.327869,44.1308535 C784.327869,47.460417 787.212081,50.1668245 790.75687,50.1668245 L803.089202,50.1668245 C804.201019,54.4697849 808.378474,57.6674395 813.337458,57.6674395 C818.301093,57.6674395 822.469245,54.4697849 823.581062,50.1668245 L835.913393,50.1668245 C839.462835,50.1668245 842.347047,47.460417 842.347047,44.1308535 M837.374107,44.9495986 C837.043818,45.3316797 836.49954,45.590949 835.913393,45.590949 L819.22218,45.590949 L819.22218,47.8834353 C819.22218,50.7535918 816.57987,53.091564 813.337458,53.091564 C810.090393,53.091564 807.452735,50.7535918 807.452735,47.8834353 L807.452735,45.590949 L790.75687,45.590949 C790.170724,45.590949 789.631097,45.3316797 789.300808,44.9495986 C796.948622,38.4314778 801.298199,28.6565708 801.298199,17.8809753 C801.298199,11.2491399 808.085401,9.56616382 811.006828,9.14314551 C811.016132,8.94300781 811.239426,5.5088269 813.421193,5.5088269 C815.60296,5.5088269 815.668087,8.94300781 815.668087,9.14314551 C818.584863,9.56616382 825.376716,11.2491399 825.376716,17.8809753 C825.376716,28.6565708 829.726294,38.4314778 837.374107,44.9495986",
                id: "Fill-17",
                stroke: "none",
                fill: "#B27008",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2.default.createElement(
          "li",
          { id: "projects-9" },
          _react2.default.createElement(
            "a",
            { onClick: this.changeContent.bind(null, 9), href: "#" },
            _react2.default.createElement(
              "svg",
              { width: "59px", height: "57px", viewBox: "1087 230 59 57", version: "1.1" },
              _react2.default.createElement("defs", null),
              _react2.default.createElement("path", { d: "M1118.82862,280.5659 L1105.40362,258.2959 L1125.27162,236.1169 L1139.72962,258.2369 L1118.82862,280.5659 Z M1144.70762,257.4459 L1127.81162,231.1589 C1127.44362,230.5319 1126.79762,230.1089 1126.06662,230.0179 C1125.33162,229.9309 1124.60162,230.1719 1124.08562,230.6909 L1100.78362,256.2989 C1100.55562,256.5309 1100.40262,256.8039 1100.29062,257.0859 C1100.27162,257.1229 1100.23962,257.1449 1100.22062,257.1819 L1087.20462,283.4729 C1086.67462,284.6369 1087.20962,286.0109 1088.40062,286.5289 C1088.71162,286.6659 1089.03762,286.7289 1089.35862,286.7289 C1090.26062,286.7289 1091.12162,286.2199 1091.51662,285.3559 L1102.72862,263.0399 L1116.28862,285.5329 C1116.65662,286.1649 1117.30262,286.5879 1118.03762,286.6789 C1118.13562,286.6929 1118.23762,286.7019 1118.33562,286.7019 C1118.96862,286.7019 1119.57762,286.4519 1120.02462,286.0019 L1144.34962,260.2159 C1145.08862,259.4739 1145.23262,258.3419 1144.70762,257.4459 L1144.70762,257.4459 Z", id: "Page-1", stroke: "none", fill: "#DFAB26", fillRule: "evenodd" })
            )
          )
        )
      );
    }
  }]);

  return ProjectsIcons;
}(_react2.default.Component);

exports.default = ProjectsIcons;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxLength = maxLength;
exports.onlyNum = onlyNum;
function maxLength() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var length = arguments[1];

  return val.substring(0, length);
}

function onlyNum() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (typeof val == 'string') {
    return val.replace(/[^0-9]+/, '');
  }

  if (typeof val == 'number') {
    return val.toString().replace(/[^0-9]+/, '');
  }

  console.error('onlyNum val is not a string or number: ', val);
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar [Burma]", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Guinea Conakry", "Jordan", "Lithuania", "Micronesia", "Moldova"].sort();

exports.default = countries;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function verification(isValid, isPotentiallyValid, isValidForThisYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isValidForThisYear: isValidForThisYear || false
  };
}

function expirationMonth(value) {
  var month, result;
  var currentMonth = new Date().getMonth() + 1;

  if (typeof value !== 'string') {
    return verification(false, false);
  }
  if (value.replace(/\s/g, '') === '' || value === '0') {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  month = parseInt(value, 10);

  if (isNaN(value)) {
    return verification(false, false);
  }

  result = month > 0 && month < 13;

  return verification(result, result, result && month >= currentMonth);
}

module.exports = expirationMonth;


/***/ }),
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processStyleName = undefined;
exports.createMarkupForStyles = createMarkupForStyles;

var _camelizeStyleName = __webpack_require__(518);

var _camelizeStyleName2 = _interopRequireDefault(_camelizeStyleName);

var _dangerousStyleValue = __webpack_require__(511);

var _dangerousStyleValue2 = _interopRequireDefault(_dangerousStyleValue);

var _hyphenateStyleName = __webpack_require__(521);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _memoizeStringOnly = __webpack_require__(522);

var _memoizeStringOnly2 = _interopRequireDefault(_memoizeStringOnly);

var _warning = __webpack_require__(211);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processStyleName = exports.processStyleName = (0, _memoizeStringOnly2.default)(_hyphenateStyleName2.default); /**
                                                                                                                   * Copyright 2013-present, Facebook, Inc.
                                                                                                                   * All rights reserved.
                                                                                                                   *
                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                   *
                                                                                                                   * @providesModule CSSPropertyOperations
                                                                                                                   */

if (process.env.NODE_ENV !== 'production') {
  var warnValidStyle;

  (function () {
    // 'msTransform' is correct, but the other prefixes should be capitalized
    var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

    // style values shouldn't contain a semicolon
    var badStyleValueWithSemicolonPattern = /;\s*$/;

    var warnedStyleNames = {};
    var warnedStyleValues = {};
    var warnedForNaNValue = false;

    var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported style property %s. Did you mean %s?%s', name, (0, _camelizeStyleName2.default)(name), checkRenderMessage(owner)) : void 0;
    };

    var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
    };

    var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
        return;
      }

      warnedStyleValues[value] = true;
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
    };

    var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
      if (warnedForNaNValue) {
        return;
      }

      warnedForNaNValue = true;
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
    };

    var checkRenderMessage = function checkRenderMessage(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    };

    /**
     * @param {string} name
     * @param {*} value
     * @param {ReactDOMComponent} component
     */

    warnValidStyle = function warnValidStyle(name, value, component) {
      //eslint-disable-line no-var
      var owner = void 0;
      if (component) {
        owner = component._currentElement._owner;
      }
      if (name.indexOf('-') > -1) {
        warnHyphenatedStyleName(name, owner);
      } else if (badVendoredStyleNamePattern.test(name)) {
        warnBadVendoredStyleName(name, owner);
      } else if (badStyleValueWithSemicolonPattern.test(value)) {
        warnStyleValueWithSemicolon(name, value, owner);
      }

      if (typeof value === 'number' && isNaN(value)) {
        warnStyleValueIsNaN(name, value, owner);
      }
    };
  })();
}

/**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */

function createMarkupForStyles(styles, component) {
  var serialized = '';
  for (var styleName in styles) {
    var isCustomProp = styleName.indexOf('--') === 0;
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var styleValue = styles[styleName];
    if (process.env.NODE_ENV !== 'production' && !isCustomProp) {
      warnValidStyle(styleName, styleValue, component);
    }
    if (styleValue != null) {
      if (isCustomProp) {
        serialized += styleName + ':' + styleValue + ';';
      } else {
        serialized += processStyleName(styleName) + ':';
        serialized += (0, _dangerousStyleValue2.default)(styleName, styleValue, component) + ';';
      }
    }
  }
  return serialized || null;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(519);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// helper to capitalize strings


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// helper to capitalize strings


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(216);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(548);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 217 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 218 */,
/* 219 */,
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendPxIfNeeded;


// Copied from https://github.com/facebook/react/blob/
// 102cd291899f9942a76c40a0e78920a6fe544dc1/
// src/renderers/dom/shared/CSSProperty.js
var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

function appendPxIfNeeded(propertyName, value) {
  var needsPxSuffix = !isUnitlessNumber[propertyName] && typeof value === 'number' && value !== 0;
  return needsPxSuffix ? value + 'px' : value;
}
module.exports = exports['default'];

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = enhanceWithRadium;

var _react = __webpack_require__(4);

var _styleKeeper = __webpack_require__(144);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

var _resolveStyles = __webpack_require__(227);

var _resolveStyles2 = _interopRequireDefault(_resolveStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  });
}

function isStateless(component) {
  return !component.render && !(component.prototype && component.prototype.render);
}

function enhanceWithRadium(configOrComposedComponent) {
  var _class, _temp;

  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (typeof configOrComposedComponent !== 'function') {
    var _ret = function () {
      var newConfig = _extends({}, config, configOrComposedComponent);
      return {
        v: function v(configOrComponent) {
          return enhanceWithRadium(configOrComponent, newConfig);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  var component = configOrComposedComponent;
  var ComposedComponent = component;

  // Handle stateless components
  if (isStateless(ComposedComponent)) {
    ComposedComponent = function (_Component) {
      _inherits(ComposedComponent, _Component);

      function ComposedComponent() {
        _classCallCheck(this, ComposedComponent);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ComposedComponent.prototype.render = function render() {
        return component(this.props, this.context);
      };

      return ComposedComponent;
    }(_react.Component);
    ComposedComponent.displayName = component.displayName || component.name;
  }

  var RadiumEnhancer = (_temp = _class = function (_ComposedComponent) {
    _inherits(RadiumEnhancer, _ComposedComponent);

    function RadiumEnhancer() {
      _classCallCheck(this, RadiumEnhancer);

      var _this2 = _possibleConstructorReturn(this, _ComposedComponent.apply(this, arguments));

      _this2.state = _this2.state || {};
      _this2.state._radiumStyleState = {};
      _this2._radiumIsMounted = true;
      return _this2;
    }

    RadiumEnhancer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (_ComposedComponent.prototype.componentWillUnmount) {
        _ComposedComponent.prototype.componentWillUnmount.call(this);
      }

      this._radiumIsMounted = false;

      if (this._radiumMouseUpListener) {
        this._radiumMouseUpListener.remove();
      }

      if (this._radiumMediaQueryListenersByQuery) {
        Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
          this._radiumMediaQueryListenersByQuery[query].remove();
        }, this);
      }
    };

    RadiumEnhancer.prototype.getChildContext = function getChildContext() {
      var superChildContext = _ComposedComponent.prototype.getChildContext ? _ComposedComponent.prototype.getChildContext.call(this) : {};

      if (!this.props.radiumConfig) {
        return superChildContext;
      }

      var newContext = _extends({}, superChildContext);

      if (this.props.radiumConfig) {
        newContext._radiumConfig = this.props.radiumConfig;
      }

      return newContext;
    };

    RadiumEnhancer.prototype.render = function render() {
      var renderedElement = _ComposedComponent.prototype.render.call(this);
      var currentConfig = this.props.radiumConfig || this.context._radiumConfig || config;

      if (config && currentConfig !== config) {
        currentConfig = _extends({}, config, currentConfig);
      }

      return (0, _resolveStyles2.default)(this, renderedElement, currentConfig);
    };

    return RadiumEnhancer;
  }(ComposedComponent), _class._isRadiumEnhanced = true, _temp);

  // Class inheritance uses Object.create and because of __proto__ issues
  // with IE <10 any static properties of the superclass aren't inherited and
  // so need to be manually populated.
  // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-

  copyProperties(component, RadiumEnhancer);

  if (process.env.NODE_ENV !== 'production') {
    // This also fixes React Hot Loader by exposing the original components top
    // level prototype methods on the Radium enhanced prototype as discussed in
    // https://github.com/FormidableLabs/radium/issues/219.
    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
  }

  if (RadiumEnhancer.propTypes && RadiumEnhancer.propTypes.style) {
    RadiumEnhancer.propTypes = _extends({}, RadiumEnhancer.propTypes, {
      style: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
    });
  }

  RadiumEnhancer.displayName = component.displayName || component.name || 'Component';

  RadiumEnhancer.contextTypes = _extends({}, RadiumEnhancer.contextTypes, {
    _radiumConfig: _react.PropTypes.object,
    _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
  });

  RadiumEnhancer.childContextTypes = _extends({}, RadiumEnhancer.childContextTypes, {
    _radiumConfig: _react.PropTypes.object,
    _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
  });

  return RadiumEnhancer;
}
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var getStateKey = function getStateKey(elementKey) {
  return elementKey === null || elementKey === undefined ? 'main' : elementKey.toString();
};

exports.default = getStateKey;
module.exports = exports['default'];

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getStateKey = __webpack_require__(222);

var _getStateKey2 = _interopRequireDefault(_getStateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getState = function getState(state, elementKey, value) {
  var key = (0, _getStateKey2.default)(elementKey);

  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
};

exports.default = getState;
module.exports = exports['default'];

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hash;


// a simple djb2 hash based on hash-string:
// https://github.com/MatthewBarker/hash-string/blob/master/source/hash-string.js
// returns a hex-encoded hash
function hash(text) {
  if (!text) {
    return '';
  }

  var hashValue = 5381;
  var index = text.length - 1;

  while (index) {
    hashValue = hashValue * 33 ^ text.charCodeAt(index);
    index -= 1;
  }

  return (hashValue >>> 0).toString(16);
}
module.exports = exports['default'];

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;
function mapObject(object, mapper) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapper(object[key], key);
    return result;
  }, {});
}
module.exports = exports["default"];

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkPropsPlugin = __webpack_require__(565);

var _checkPropsPlugin2 = _interopRequireDefault(_checkPropsPlugin);

var _keyframesPlugin = __webpack_require__(566);

var _keyframesPlugin2 = _interopRequireDefault(_keyframesPlugin);

var _mergeStyleArrayPlugin = __webpack_require__(567);

var _mergeStyleArrayPlugin2 = _interopRequireDefault(_mergeStyleArrayPlugin);

var _prefixPlugin = __webpack_require__(569);

var _prefixPlugin2 = _interopRequireDefault(_prefixPlugin);

var _removeNestedStylesPlugin = __webpack_require__(570);

var _removeNestedStylesPlugin2 = _interopRequireDefault(_removeNestedStylesPlugin);

var _resolveInteractionStylesPlugin = __webpack_require__(571);

var _resolveInteractionStylesPlugin2 = _interopRequireDefault(_resolveInteractionStylesPlugin);

var _resolveMediaQueriesPlugin = __webpack_require__(572);

var _resolveMediaQueriesPlugin2 = _interopRequireDefault(_resolveMediaQueriesPlugin);

var _visitedPlugin = __webpack_require__(573);

var _visitedPlugin2 = _interopRequireDefault(_visitedPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  checkProps: _checkPropsPlugin2.default,
  keyframes: _keyframesPlugin2.default,
  mergeStyleArray: _mergeStyleArrayPlugin2.default,
  prefix: _prefixPlugin2.default,
  removeNestedStyles: _removeNestedStylesPlugin2.default,
  resolveInteractionStyles: _resolveInteractionStylesPlugin2.default,
  resolveMediaQueries: _resolveMediaQueriesPlugin2.default,
  visited: _visitedPlugin2.default
};
/* eslint-disable block-scoped-const */

module.exports = exports['default'];

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _appendImportantToEachValue = __webpack_require__(558);

var _appendImportantToEachValue2 = _interopRequireDefault(_appendImportantToEachValue);

var _cssRuleSetToString = __webpack_require__(141);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _getState = __webpack_require__(223);

var _getState2 = _interopRequireDefault(_getState);

var _getStateKey = __webpack_require__(222);

var _getStateKey2 = _interopRequireDefault(_getStateKey);

var _hash = __webpack_require__(224);

var _hash2 = _interopRequireDefault(_hash);

var _mergeStyles = __webpack_require__(564);

var _plugins = __webpack_require__(226);

var _plugins2 = _interopRequireDefault(_plugins);

var _exenv = __webpack_require__(495);

var _exenv2 = _interopRequireDefault(_exenv);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
  plugins: [_plugins2.default.mergeStyleArray, _plugins2.default.checkProps, _plugins2.default.resolveMediaQueries, _plugins2.default.resolveInteractionStyles, _plugins2.default.keyframes, _plugins2.default.visited, _plugins2.default.removeNestedStyles, _plugins2.default.prefix, _plugins2.default.checkProps]
};

// Gross
var globalState = {};

// Declare early for recursive helpers.
var resolveStyles = null;

var _shouldResolveStyles = function _shouldResolveStyles(component) {
  return component.type && !component.type._isRadiumEnhanced;
};

var _resolveChildren = function _resolveChildren(_ref) {
  var children = _ref.children;
  var component = _ref.component;
  var config = _ref.config;
  var existingKeyMap = _ref.existingKeyMap;

  if (!children) {
    return children;
  }

  var childrenType = typeof children === 'undefined' ? 'undefined' : _typeof(children);

  if (childrenType === 'string' || childrenType === 'number') {
    // Don't do anything with a single primitive child
    return children;
  }

  if (childrenType === 'function') {
    // Wrap the function, resolving styles on the result
    return function () {
      var result = children.apply(this, arguments);
      if (_react2.default.isValidElement(result)) {
        return resolveStyles(component, result, config, existingKeyMap, true);
      }
      return result;
    };
  }

  if (_react2.default.Children.count(children) === 1 && children.type) {
    // If a React Element is an only child, don't wrap it in an array for
    // React.Children.map() for React.Children.only() compatibility.
    var onlyChild = _react2.default.Children.only(children);
    return resolveStyles(component, onlyChild, config, existingKeyMap, true);
  }

  return _react2.default.Children.map(children, function (child) {
    if (_react2.default.isValidElement(child)) {
      return resolveStyles(component, child, config, existingKeyMap, true);
    }

    return child;
  });
};

// Recurse over props, just like children
var _resolveProps = function _resolveProps(_ref2) {
  var component = _ref2.component;
  var config = _ref2.config;
  var existingKeyMap = _ref2.existingKeyMap;
  var props = _ref2.props;

  var newProps = props;

  Object.keys(props).forEach(function (prop) {
    // We already recurse over children above
    if (prop === 'children') {
      return;
    }

    var propValue = props[prop];
    if (_react2.default.isValidElement(propValue)) {
      newProps = _extends({}, newProps);
      newProps[prop] = resolveStyles(component, propValue, config, existingKeyMap, true);
    }
  });

  return newProps;
};

var _buildGetKey = function _buildGetKey(_ref3) {
  var componentName = _ref3.componentName;
  var existingKeyMap = _ref3.existingKeyMap;
  var renderedElement = _ref3.renderedElement;

  // We need a unique key to correlate state changes due to user interaction
  // with the rendered element, so we know to apply the proper interactive
  // styles.
  var originalKey = typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
  var key = (0, _getStateKey2.default)(originalKey);

  var alreadyGotKey = false;
  var getKey = function getKey() {
    if (alreadyGotKey) {
      return key;
    }

    alreadyGotKey = true;

    if (existingKeyMap[key]) {
      var elementName = void 0;
      if (typeof renderedElement.type === 'string') {
        elementName = renderedElement.type;
      } else if (renderedElement.type.constructor) {
        elementName = renderedElement.type.constructor.displayName || renderedElement.type.constructor.name;
      }

      throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.') + ' ' + 'Component: "' + componentName + '". ' + (elementName ? 'Element: "' + elementName + '".' : ''));
    }

    existingKeyMap[key] = true;

    return key;
  };

  return getKey;
};

var _setStyleState = function _setStyleState(component, key, stateKey, value) {
  if (!component._radiumIsMounted) {
    return;
  }

  var existing = component._lastRadiumState || component.state && component.state._radiumStyleState || {};

  var state = { _radiumStyleState: _extends({}, existing) };
  state._radiumStyleState[key] = _extends({}, state._radiumStyleState[key]);
  state._radiumStyleState[key][stateKey] = value;

  component._lastRadiumState = state._radiumStyleState;
  component.setState(state);
};

var _runPlugins = function _runPlugins(_ref4) {
  var component = _ref4.component;
  var config = _ref4.config;
  var existingKeyMap = _ref4.existingKeyMap;
  var props = _ref4.props;
  var renderedElement = _ref4.renderedElement;

  // Don't run plugins if renderedElement is not a simple ReactDOMElement or has
  // no style.
  if (!_react2.default.isValidElement(renderedElement) || typeof renderedElement.type !== 'string' || !props.style) {
    return props;
  }

  var newProps = props;

  var plugins = config.plugins || DEFAULT_CONFIG.plugins;

  var componentName = component.constructor.displayName || component.constructor.name;
  var getKey = _buildGetKey({ renderedElement: renderedElement, existingKeyMap: existingKeyMap, componentName: componentName });
  var getComponentField = function getComponentField(key) {
    return component[key];
  };
  var getGlobalState = function getGlobalState(key) {
    return globalState[key];
  };
  var componentGetState = function componentGetState(stateKey, elementKey) {
    return (0, _getState2.default)(component.state, elementKey || getKey(), stateKey);
  };
  var setState = function setState(stateKey, value, elementKey) {
    return _setStyleState(component, elementKey || getKey(), stateKey, value);
  };

  var addCSS = function addCSS(css) {
    var styleKeeper = component._radiumStyleKeeper || component.context._radiumStyleKeeper;
    if (!styleKeeper) {
      if (__isTestModeEnabled) {
        return {
          remove: function remove() {}
        };
      }

      throw new Error('To use plugins requiring `addCSS` (e.g. keyframes, media queries), ' + 'please wrap your application in the StyleRoot component. Component ' + 'name: `' + componentName + '`.');
    }

    return styleKeeper.addCSS(css);
  };

  var newStyle = props.style;

  plugins.forEach(function (plugin) {
    var result = plugin({
      ExecutionEnvironment: _exenv2.default,
      addCSS: addCSS,
      appendImportantToEachValue: _appendImportantToEachValue2.default,
      componentName: componentName,
      config: config,
      cssRuleSetToString: _cssRuleSetToString2.default,
      getComponentField: getComponentField,
      getGlobalState: getGlobalState,
      getState: componentGetState,
      hash: _hash2.default,
      mergeStyles: _mergeStyles.mergeStyles,
      props: newProps,
      setState: setState,
      isNestedStyle: _mergeStyles.isNestedStyle,
      style: newStyle
    }) || {};

    newStyle = result.style || newStyle;

    newProps = result.props && Object.keys(result.props).length ? _extends({}, newProps, result.props) : newProps;

    var newComponentFields = result.componentFields || {};
    Object.keys(newComponentFields).forEach(function (fieldName) {
      component[fieldName] = newComponentFields[fieldName];
    });

    var newGlobalState = result.globalState || {};
    Object.keys(newGlobalState).forEach(function (key) {
      globalState[key] = newGlobalState[key];
    });
  });

  if (newStyle !== props.style) {
    newProps = _extends({}, newProps, { style: newStyle });
  }

  return newProps;
};

// Wrapper around React.cloneElement. To avoid processing the same element
// twice, whenever we clone an element add a special prop to make sure we don't
// process this element again.
var _cloneElement = function _cloneElement(renderedElement, newProps, newChildren) {
  // Only add flag if this is a normal DOM element
  if (typeof renderedElement.type === 'string') {
    newProps = _extends({}, newProps, { 'data-radium': true });
  }

  return _react2.default.cloneElement(renderedElement, newProps, newChildren);
};

//
// The nucleus of Radium. resolveStyles is called on the rendered elements
// before they are returned in render. It iterates over the elements and
// children, rewriting props to add event handlers required to capture user
// interactions (e.g. mouse over). It also replaces the style prop because it
// adds in the various interaction styles (e.g. :hover).
//
resolveStyles = function resolveStyles(component, // ReactComponent, flow+eslint complaining
renderedElement) {
  var config = arguments.length <= 2 || arguments[2] === undefined ? DEFAULT_CONFIG : arguments[2];
  var existingKeyMap = arguments[3];
  var shouldCheckBeforeResolve = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
  // ReactElement
  existingKeyMap = existingKeyMap || {};
  if (!renderedElement ||
  // Bail if we've already processed this element. This ensures that only the
  // owner of an element processes that element, since the owner's render
  // function will be called first (which will always be the case, since you
  // can't know what else to render until you render the parent component).
  renderedElement.props && renderedElement.props['data-radium'] ||

  // Bail if this element is a radium enhanced element, because if it is,
  // then it will take care of resolving its own styles.
  shouldCheckBeforeResolve && !_shouldResolveStyles(renderedElement)) {
    return renderedElement;
  }

  var newChildren = _resolveChildren({
    children: renderedElement.props.children,
    component: component,
    config: config,
    existingKeyMap: existingKeyMap
  });

  var newProps = _resolveProps({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: renderedElement.props
  });

  newProps = _runPlugins({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: newProps,
    renderedElement: renderedElement
  });

  // If nothing changed, don't bother cloning the element. Might be a bit
  // wasteful, as we add the sentinal to stop double-processing when we clone.
  // Assume benign double-processing is better than unneeded cloning.
  if (newChildren === renderedElement.props.children && newProps === renderedElement.props) {
    return renderedElement;
  }

  return _cloneElement(renderedElement, newProps !== renderedElement.props ? newProps : {}, newChildren);
};

// Only for use by tests
var __isTestModeEnabled = false;
if (process.env.NODE_ENV !== 'production') {
  resolveStyles.__clearStateForTests = function () {
    globalState = {};
  };
  resolveStyles.__setTestMode = function (isEnabled) {
    __isTestModeEnabled = isEnabled;
  };
}

exports.default = resolveStyles;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = __webpack_require__(102);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(254);

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__(657);

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__(658);

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _assertString = __webpack_require__(102);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(str) {
  (0, _assertString2.default)(str);
  return str.length === 0;
}
module.exports = exports['default'];

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Accordion = function (_React$Component) {
  _inherits(Accordion, _React$Component);

  function Accordion() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _this.toggle = function () {
      _this.setState({ show: !_this.state.show });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Accordion, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      return { content: "", btnTitle: "Toggle" };
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          content = _props.content,
          btnTitle = _props.btnTitle,
          background = _props.background,
          titleColor = _props.titleColor;


      var btnStyle = {
        width: "100%",
        height: "60px",
        border: "none",
        borderRadius: "0",
        fontSize: "18px",
        fontWeight: "normal",
        color: titleColor,
        background: background
      };

      return _react2.default.createElement(
        "div",
        { className: "accordion" },
        _react2.default.createElement(
          "button",
          {
            className: "accordion__btn",
            style: btnStyle,
            onClick: this.toggle
          },
          btnTitle,
          " ",
          _react2.default.createElement("i", {
            className: this.state.show ? "ion-chevron-up" : "ion-chevron-down"
          })
        ),
        _react2.default.createElement(
          "div",
          {
            className: "accordion__content",
            style: this.state.show ? { display: "block" } : { display: "none" }
          },
          _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: content } })
        )
      );
    }
  }]);

  return Accordion;
}(_react2.default.Component);

Accordion.defaultProps = {
  background: "#687f87",
  titleColor: ""
};
exports.default = Accordion;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _sectionVideo = __webpack_require__(167);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CampaignsSlider = function (_React$Component) {
  _inherits(CampaignsSlider, _React$Component);

  function CampaignsSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CampaignsSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CampaignsSlider.__proto__ || Object.getPrototypeOf(CampaignsSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { currentSlide: 0, left: "0" }, _this.nextSlide = function () {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (clear) clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;
      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _this.prevSlide = function () {
      clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CampaignsSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.nextSlide(false);
      }, this.props.interval);
    }
  }, {
    key: "render",
    value: function render() {
      var slides = this.props.slides;

      var viewportWidth = 100 * slides.length + "%";
      var slideWidth = 100 / slides.length + "%";
      var viewportStyle = { width: viewportWidth, left: this.state.left };

      return _react2.default.createElement(
        "div",
        { className: "campaigns-slider" },
        _react2.default.createElement(
          "div",
          { className: "campaigns-slider__viewport", style: viewportStyle },
          slides.map(function (slide, i) {
            return _react2.default.createElement(
              "div",
              {
                key: i,
                className: "campaigns-slider__slide",
                style: { width: slideWidth }
              },
              _react2.default.createElement(_sectionVideo2.default, {
                imgUrl: slide.image,
                url: slide.url,
                imageStyle: { width: "100%" }
              }),
              _react2.default.createElement(
                "div",
                {
                  className: "campaigns-slider__slide__content",
                  style: { background: slide.bg }
                },
                _react2.default.createElement(
                  "h4",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: slide.url ? slide.url : "#" },
                    slide.title
                  )
                ),
                _react2.default.createElement(
                  "p",
                  null,
                  slide.content
                )
              )
            );
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "campaigns-slider__btns" },
          _react2.default.createElement(
            "button",
            {
              className: "campaigns-slider__btns__prev",
              onClick: this.prevSlide
            },
            _react2.default.createElement("i", { className: "ion-chevron-left" })
          ),
          _react2.default.createElement(
            "button",
            {
              className: "campaigns-slider__btns__next",
              onClick: this.nextSlide
            },
            _react2.default.createElement("i", { className: "ion-chevron-right" })
          )
        )
      );
    }
  }]);

  return CampaignsSlider;
}(_react2.default.Component);

CampaignsSlider.defaultProps = { slides: [], interval: 0 };
exports.default = CampaignsSlider;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentSlide: 0,
      left: "0",
      viewportWidth: "100%"
    }, _this.nextSlide = function () {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // if (clear) clearInterval(this.interval);
      var total = $(".bs-carousel-item").length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;

      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _this.prevSlide = function () {
      // clearInterval(this.interval);
      var total = $(".bs-carousel-item").length - 1;
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Carousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var num = $(".bs-carousel-item").length;
      $(".bs-carousel-item").css({ width: 100 / num + "%", float: "left" });
      this.setState({ viewportWidth: num * 100 + "%" });
    }
  }, {
    key: "render",
    value: function render() {
      var _btnStyle;

      var viewportStyle = {
        width: this.state.viewportWidth,
        transition: "left 300ms",
        left: this.state.left,
        position: "relative"
      };

      var btnStyle = (_btnStyle = {
        display: "block",
        background: "rgba(0,0,0, .5)",
        fontSize: "20px",
        color: "#fff",
        textAlign: "center",
        width: "40px",
        height: "40px",
        borderRadius: "40px",
        position: "absolute",
        top: "45%"
      }, _defineProperty(_btnStyle, "display", "flex"), _defineProperty(_btnStyle, "alignItems", "center"), _defineProperty(_btnStyle, "justifyContent", "center"), _defineProperty(_btnStyle, "padding", 0), _btnStyle);

      var btnLeft = _extends({}, btnStyle, { left: "20px" });
      var btnRight = _extends({}, btnStyle, { right: "20px" });

      return _react2.default.createElement(
        "div",
        { style: { width: "100%", overflow: "hidden" } },
        _react2.default.createElement(
          "div",
          { style: viewportStyle },
          _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.content } })
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "button",
            { onClick: this.prevSlide, style: btnLeft },
            _react2.default.createElement("i", { className: "ion-chevron-left" })
          ),
          _react2.default.createElement(
            "button",
            { onClick: this.nextSlide, style: btnRight },
            _react2.default.createElement("i", { className: "ion-chevron-right" })
          )
        )
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

exports.default = Carousel;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _isEmpty = __webpack_require__(253);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _obj_to_formdata = __webpack_require__(303);

var _obj_to_formdata2 = _interopRequireDefault(_obj_to_formdata);

var _getCountries = __webpack_require__(177);

var _getCountries2 = _interopRequireDefault(_getCountries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

var contactForm = function (_React$Component) {
  _inherits(contactForm, _React$Component);

  function contactForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, contactForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = contactForm.__proto__ || Object.getPrototypeOf(contactForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      contact: {
        name: "",
        lastname: "",
        email: "",
        country: ""
      },
      errors: { name: false, lastname: false, email: false },
      countries: _getCountries2.default,
      officeCountries: [],
      inOffice: false,
      loading: false,
      showMemberExists: false
    }, _this.checkEmpty = function (field) {
      return (0, _isEmpty2.default)(_this.state.contact[field]);
    }, _this.validate = function () {
      var errors = {};
      var validations = Object.keys(_this.state.errors).map(function (field) {
        var val = _this.checkEmpty(field);
        errors = _extends({}, errors, _defineProperty({}, field, val));
        return val;
      });

      _this.setState({ errors: errors });

      return Promise.all(validations);
    }, _this.isValid = function () {
      return _this.validate().then(function (arr) {
        return arr.every(function (item) {
          return item == false;
        });
      }).catch(function (err) {
        return console.error(err);
      });
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      var data = (0, _obj_to_formdata2.default)(_this.state.contact);
      _this.isValid().then(_this.storeContact).catch(function (err) {
        return console.error(err);
      });
    }, _this.storeConvertLoop = function () {
      var add_tags = typeof _this.props.cl.tags == "string" ? _this.props.cl.tags.trim().split(",") : [];
      var data = _qs2.default.stringify({
        data: _extends({}, _this.state.contact, { add_tags: add_tags }),
        action: "convertloop_contact"
      });
      return _axios2.default.post(endpoint, data);
    }, _this.storeEventConvertLoop = function () {
      var _this$state$contact = _this.state.contact,
          email = _this$state$contact.email,
          country = _this$state$contact.country;


      var event = { name: _this.props.cl.event, country: country, person: { email: email } };
      var data = _qs2.default.stringify({ data: event, action: "convertloop_event" });
      return _axios2.default.post(endpoint, data);
    }, _this.storeInfusion = function () {
      var data = _qs2.default.stringify({
        data: _this.state.contact,
        action: "infusion_contact"
      });
      return _axios2.default.post(endpoint, data);
    }, _this.storeContact = function (isValid) {
      if (isValid) {
        _this.setState({ loading: true });
        if (_this.state.inOffice) {
          _this.storeConvertLoop().then(_this.storeEventConvertLoop).then(function (res) {
            if (res.data.person.email) window.location = _this.props.redirect;
          });
        } else {
          _this.storeConvertLoop().then(_this.storeEventConvertLoop).then(_this.storeInfusion).then(function (res) {
            if (res.data.success) window.location = _this.props.redirect;
          });
        }
      }
    }, _this.handleChange = function (field, e) {
      var contact = _extends({}, _this.state.contact, _defineProperty({}, field, e.target.value));
      _this.setState({ contact: contact });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(contactForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var data = _qs2.default.stringify({ action: "office_countries" });

      var req = _axios2.default.post(endpoint, data).then(function (cons) {
        _this2.setState({
          contact: _extends({}, _this2.state.contact, {
            country: _this2.props.country
          }),
          officeCountries: cons.data,
          inOffice: cons.data.indexOf(_this2.props.country) !== -1
        });
      });

      return req;
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          contact = _state.contact,
          errors = _state.errors;
      var _props = this.props,
          placeholders = _props.placeholders,
          validationMessages = _props.validationMessages,
          texts = _props.texts;


      var inputContainerStyle = {
        width: this.props.vertical == "true" ? "100%" : "20%",
        "@media (maxWidth: 767px)": {
          width: "100%"
        }
      };

      var inputStyle = {
        borderRadius: this.props.vertical == "true" ? "0" : ""
      };

      return _react2.default.createElement(
        "form",
        {
          style: { textAlign: "center" },
          className: "form-inline contact-form",
          onSubmit: this.handleSubmit
        },
        _react2.default.createElement(
          "div",
          { style: inputContainerStyle, className: "input-container" },
          _react2.default.createElement("input", {
            type: "text",
            placeholder: placeholders.name,
            onChange: this.handleChange.bind(null, "name"),
            value: contact.name,
            style: inputStyle
          }),
          _react2.default.createElement(
            "div",
            { className: errors.name ? "input-error" : "hidden" },
            errors.name,
            " ",
            validationMessages.name
          )
        ),
        _react2.default.createElement(
          "div",
          { style: inputContainerStyle, className: "input-container" },
          _react2.default.createElement("input", {
            type: "text",
            placeholder: placeholders.lastname,
            onChange: this.handleChange.bind(null, "lastname"),
            value: contact.lastname,
            style: inputStyle
          }),
          _react2.default.createElement(
            "div",
            { className: errors.lastname ? "input-error" : "hidden" },
            validationMessages.lastname
          )
        ),
        _react2.default.createElement(
          "div",
          { style: inputContainerStyle, className: "input-container" },
          _react2.default.createElement("input", {
            type: "text",
            placeholder: placeholders.email,
            onChange: this.handleChange.bind(null, "email"),
            value: contact.email,
            style: inputStyle
          }),
          _react2.default.createElement(
            "div",
            { className: errors.email ? "input-error" : "hidden" },
            validationMessages.email
          )
        ),
        _react2.default.createElement(
          "div",
          { style: inputContainerStyle, className: "input-container" },
          _react2.default.createElement(
            "select",
            {
              onChange: this.handleChange.bind(null, "country"),
              value: contact.country
            },
            _react2.default.createElement(
              "option",
              { value: "" },
              texts.select_country
            ),
            this.state.countries.map(function (country, i) {
              return _react2.default.createElement(
                "option",
                { key: i, value: country },
                country
              );
            })
          )
        ),
        _react2.default.createElement(
          "button",
          {
            style: {
              marginLeft: "-2px",
              background: this.props.btnBg,
              color: "#fff"
            },
            onClick: this.handleSubmit,
            disabled: this.state.loading
          },
          texts.button,
          this.state.loading ? "..." : ""
        ),
        _react2.default.createElement(
          "span",
          {
            style: this.state.showMemberExists ? _defineProperty({
              color: "#fff",
              display: "inline-block",
              width: "90%",
              padding: "10px",
              margin: "5px auto",
              background: "#f4334a"
            }, "color", "#fff") : { display: "none" }
          },
          "you are already praying"
        )
      );
    }
  }]);

  return contactForm;
}(_react2.default.Component);

contactForm.defaultProps = {
  validationMessages: {},
  placeholders: {},
  texts: {},
  redirect: "",
  btnBg: "",
  cl: {
    event: "Subscription",
    tags: ""
  },
  vertical: false
};
exports.default = contactForm;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _inline = __webpack_require__(165);

var _inline2 = _interopRequireDefault(_inline);

var _glamor = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonateInlineSection = function (_Component) {
  _inherits(DonateInlineSection, _Component);

  function DonateInlineSection(props) {
    _classCallCheck(this, DonateInlineSection);

    var _this = _possibleConstructorReturn(this, (DonateInlineSection.__proto__ || Object.getPrototypeOf(DonateInlineSection)).call(this, props));

    _this.changeSection = function (section) {
      _this.setState({ section: section });
      console.log("hi section", section);
    };

    _this.state = {
      section: 0
    };
    return _this;
  }

  _createClass(DonateInlineSection, [{
    key: "render",
    value: function render() {
      var texts = this.props.texts;

      var containerStyle = (0, _glamor.css)({
        display: "flex",
        flexWrap: "wrap"
      });

      return _react2.default.createElement(
        "div",
        { className: containerStyle },
        _react2.default.createElement(
          "div",
          { className: "col-12-l", style: { margin: "40px 0" } },
          _react2.default.createElement(
            "h2",
            {
              style: {
                color: "#fff",
                textAlign: "center",
                textShadow: "0 2px 20px rgba(0,0,0,0.47)"
              }
            },
            this.state.section == 0 ? texts.title : texts.success_title
          ),
          _react2.default.createElement(
            "h3",
            {
              style: {
                color: "#fff",
                textAlign: "center",
                textShadow: "0 2px 20px rgba(0,0,0,0.47)",
                fontWeight: "300"
              }
            },
            this.state.section == 0 ? texts.subtitle : texts.success_subtitle
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: "col-12 col-4-l",
            style: this.state.section == 0 ? { display: "block", background: "RGBA(43, 58, 68, .9)", padding: "20px" } : { display: "none" }
          },
          _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.content } })
        ),
        _react2.default.createElement(
          "div",
          {
            className: this.state.section == 0 ? "col-12 col-8-l" : "col-12 col-12-l",
            style: { background: "#fff", padding: "40px" }
          },
          _react2.default.createElement(_inline2.default, _extends({ changeSection: this.changeSection }, this.props))
        )
      );
    }
  }]);

  return DonateInlineSection;
}(_react.Component);

DonateInlineSection.defaultProps = {
  content: ""
};
exports.default = DonateInlineSection;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(299);

var _index2 = _interopRequireDefault(_index);

var _glamor = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonateSection = function (_Component) {
  _inherits(DonateSection, _Component);

  function DonateSection(props) {
    _classCallCheck(this, DonateSection);

    var _this = _possibleConstructorReturn(this, (DonateSection.__proto__ || Object.getPrototypeOf(DonateSection)).call(this, props));

    _this.changeSection = function (section) {
      _this.setState({ section: section });
    };

    _this.state = {
      section: 0
    };
    return _this;
  }

  _createClass(DonateSection, [{
    key: "render",
    value: function render() {
      var containerStyle = (0, _glamor.css)({
        display: "flex",
        flexWrap: "wrap"
      });

      var texts = this.props.texts;


      return _react2.default.createElement(
        "div",
        { className: containerStyle },
        _react2.default.createElement(
          "div",
          { className: "col-12-l", style: { margin: "40px 0" } },
          _react2.default.createElement(
            "h2",
            {
              style: {
                color: "#fff",
                textAlign: "center",
                textShadow: "0 2px 20px rgba(0,0,0,0.47)"
              }
            },
            this.state.section == 0 ? texts.title : texts.success_title
          ),
          _react2.default.createElement(
            "h3",
            {
              style: {
                color: "#fff",
                textAlign: "center",
                textShadow: "0 2px 20px rgba(0,0,0,0.47)",
                fontWeight: "300"
              }
            },
            this.state.section == 0 ? texts.subtitle : texts.success_subtitle
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: "col-12 col-4-l",
            style: this.state.section == 0 ? { display: "block", background: "RGBA(43, 58, 68, .9)", padding: "20px" } : { display: "none" }
          },
          _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.content } })
        ),
        _react2.default.createElement(
          "div",
          {
            className: this.state.section == 0 ? "col-12 col-8-l" : "col-12 col-12-l",
            style: { background: "#fff", padding: "40px" }
          },
          _react2.default.createElement(_index2.default, _extends({}, this.props, { changeSection: this.changeSection }))
        )
      );
    }
  }]);

  return DonateSection;
}(_react.Component);

DonateSection.defaultProps = {
  content: "",
  titles: []
};
exports.default = DonateSection;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _amount = __webpack_require__(108);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(110);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(109);

var _contact2 = _interopRequireDefault(_contact);

var _donate = __webpack_require__(79);

var actions = _interopRequireWildcard(_donate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(errors).every(function (key) {
    return errors[key] == true;
  });
}

var Donate = function (_Component) {
  _inherits(Donate, _Component);

  function Donate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Donate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Donate.__proto__ || Object.getPrototypeOf(Donate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: "monthly",
      amount: 30,
      currency: "usd",
      countries: [],
      contact: { name: "", email: "", country: "" },
      stripe: {
        card_type: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        token: ""
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four_step: false,
      show_titles: false
    }, _this.handleChange = function (field) {
      _this.setState(_extends({}, _this.state, field));
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.nextSection();
    }, _this.completeTransaction = function () {
      var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state = _this.state,
          amount = _this$state.amount,
          donation_type = _this$state.donation_type,
          contact = _this$state.contact;
      var customer = stripeResponse.customer,
          id = stripeResponse.id;

      var base = _this.props.redirect[donation_type];

      actions.storeConvertLoop(_this.state).then(actions.storeEventConvertLoop.bind(null, _this.state)).then(actions.storeInfusion.bind(null, _this.state)).then(function (res) {
        var url = base + "?customer_id=" + customer + "-" + contact.email + "&order_revenue=" + amount + "&order_id=" + id;
        window.location = url;
      });
    }, _this.creditCardIsValid = function () {
      var errs = _this.creditCard.validateAll();
      return isAllValid(errs.stripe);
    }, _this.contactIsValid = function () {
      var errs = _this.contact.validateAll();
      return isAllValid(errs.contact);
    }, _this.nextSection = function () {
      var section = _this.state.section < 2 ? _this.state.section + 1 : 2;

      if (_this.state.section == 1) {
        if (!_this.creditCardIsValid()) return false;

        actions.stripeToken(_this.state).then(function (res) {
          if (res.id) {
            var stripe = _extends({}, _this.state.stripe, { token: res.id });
            _this.setState(_extends({}, _this.state, { stripe: stripe }));
            return stripe;
          }

          if (res.stripeCode) {
            _this.setState(_extends({}, _this.state, { loading: false, declined: true }));
            section = 1;
            return false;
          }
        });
      }

      if (_this.state.section == 2) {
        if (!_this.contactIsValid()) return false;
        actions.stripeCharge(_this.state).then(function (res) {
          return _this.completeTransaction(res.data);
        });
      }

      var left = "-" + section * 100 + "%";

      if (_this.state.section == 0) {
        _this.setState({ section: section, left: left, loading: false });
      } else {
        _this.setState({ section: section, left: left });
      }
    }, _this.prevSection = function (e) {
      e.preventDefault();
      var section = _this.state.section >= 0 ? _this.state.section - 1 : 0;
      var left = "-" + section * 100 + "%";
      _this.setState({ section: section, left: left });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Donate, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      actions.fetchCountries().then(function (countries) {
        return _this2.setState({ countries: countries });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.donateForm) {
        this.donateForm.addEventListener("keydown", function (e) {
          if (e.which == 9) {
            e.preventDefault();
            _this3.nextSection();
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var sectionWidth = 100 / 3 + "%";
      var viewPortStyle = { width: "300%", left: this.state.left };
      var donationTypeStyle = {
        display: "inline",
        marginLeft: "15px",
        color: this.props.is_blue ? "rgb(60, 81, 95)" : "#fff"
      };

      var backBtnStyle = {
        float: "right",
        background: "transparent",
        border: "none",
        padding: "0 20px",
        color: this.props.is_blue ? "rgb(60, 81, 95)" : "#fff"
      };

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "form",
          {
            onSubmit: this.handleSubmit,
            className: this.props.is_blue ? "donate_react donate_inline" : "donate_react",
            ref: function ref(donate) {
              return _this4.donateForm = donate;
            }
          },
          _react2.default.createElement(
            "div",
            { className: "donate_react__viewport", style: viewPortStyle },
            _react2.default.createElement(_amount2.default, _extends({}, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_creditCard2.default, _extends({
              ref: function ref(creditCard) {
                return _this4.creditCard = creditCard;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_contact2.default, _extends({
              ref: function ref(contact) {
                return _this4.contact = contact;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "form-group" },
            _react2.default.createElement(
              "button",
              {
                className: "donate_react__submit pull-left",
                onClick: this.handleSubmit,
                disabled: this.state.loading
              },
              this.state.section == 1 ? this.props.texts.next : this.props.texts.donate,
              " ",
              this.state.loading ? "..." : ""
            ),
            _react2.default.createElement(
              "span",
              { style: donationTypeStyle },
              this.state.amount + " USD " + this.props.texts[this.state.donation_type]
            ),
            this.state.section > 0 ? _react2.default.createElement(
              "button",
              { style: backBtnStyle, onClick: this.prevSection },
              this.props.texts.back
            ) : ""
          ),
          _react2.default.createElement(
            "div",
            {
              style: this.state.declined ? {
                display: "block",
                background: "red",
                color: "#fff",
                float: "left",
                width: "100%",
                padding: "10px"
              } : { display: "none" }
            },
            this.props.texts.validation_declined
          )
        )
      );
    }
  }]);

  return Donate;
}(_react.Component);

Donate.defaultProps = { texts: {}, redirect: {} };
exports.default = Donate;

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _isEmail = __webpack_require__(252);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _getCountries = __webpack_require__(177);

var _getCountries2 = _interopRequireDefault(_getCountries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

var DownloadPdf = function (_React$Component) {
  _inherits(DownloadPdf, _React$Component);

  function DownloadPdf(props) {
    _classCallCheck(this, DownloadPdf);

    var _this = _possibleConstructorReturn(this, (DownloadPdf.__proto__ || Object.getPrototypeOf(DownloadPdf)).call(this, props));

    _initialiseProps.call(_this);

    var country = props.country;


    _this.state = {
      email: "",
      errors: {
        email: false
      },
      country: country
    };
    return _this;
  }

  _createClass(DownloadPdf, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          countries = _props.countries,
          btn = _props.btn,
          texts = _props.texts;
      var errors = this.state.errors;


      var btnStyle = {
        borderColor: btn.background,
        background: btn.background
      };

      return _react2.default.createElement(
        "form",
        { onSubmit: this.handlepdf, className: "form-inline download-pdf" },
        _react2.default.createElement(
          "div",
          { className: "input-container" },
          _react2.default.createElement("input", {
            type: "text",
            placeholder: texts.email,
            onChange: this.handleChange.bind(null, "email"),
            value: this.state.email
          }),
          _react2.default.createElement(
            "div",
            { className: errors.email ? "input-error" : "hidden" },
            errors.email,
            " ",
            texts.validation_email
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "input-container" },
          _react2.default.createElement(
            "select",
            {
              onChange: this.handleChange.bind(null, "country"),
              value: this.state.country || this.props.country
            },
            countries.map(function (country, i) {
              return _react2.default.createElement(
                "option",
                { key: i, value: country },
                country
              );
            })
          )
        ),
        _react2.default.createElement(
          "button",
          { onClick: this.handlepdf, style: btnStyle },
          btn.text
        )
      );
    }
  }]);

  return DownloadPdf;
}(_react2.default.Component);

DownloadPdf.defaultProps = {
  btn: {
    text: "",
    background: ""
  },
  texts: {},
  countries: _getCountries2.default,
  pdf_url: ""
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.validate = function () {
    var errors = {};

    var validations = Object.keys(_this2.state.errors).map(function (field) {
      var val = !(0, _isEmail2.default)(_this2.state[field]);
      errors = _extends({}, errors, _defineProperty({}, field, val));
      return val;
    });

    _this2.setState({ errors: errors });

    return Promise.all(validations);
  };

  this.isValid = function () {
    return _this2.validate().then(function (arr) {
      return arr.every(function (item) {
        return item == false;
      });
    }).catch(function (err) {
      return console.error(err);
    });
  };

  this.handlepdf = function (e) {
    e.preventDefault();
    _this2.isValid().then(_this2.storeContact);
  };

  this.storeContact = function (isValid) {
    var _state = _this2.state,
        email = _state.email,
        country = _state.country;

    var mc_data = {
      email_address: email,
      status: "subscribed",
      merge_fields: { NAME: "", COUNTRY: country },
      update_existing: true
    };

    var data = _qs2.default.stringify({ action: "mailchimp_subscribe", data: mc_data });

    if (isValid) {
      _axios2.default.post(endpoint, data).then(function (res) {
        if (res.data.id) window.location = _this2.props.pdf_url;
      });
    }
  };

  this.handleChange = function (field, e) {
    _this2.setState(_extends({}, _this2.state, _defineProperty({}, field, e.target.value)));
  };
};

exports.default = DownloadPdf;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _glamor = __webpack_require__(92);

var _radium = __webpack_require__(142);

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryHeader = function (_React$Component) {
  _inherits(GalleryHeader, _React$Component);

  function GalleryHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GalleryHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GalleryHeader.__proto__ || Object.getPrototypeOf(GalleryHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      imageStyle: {
        maxWidth: "100%",
        display: "block",
        maxHeight: "500px",
        margin: "0 auto"
      }
    }, _this.changeSection = function (type, e) {
      if (e) e.preventDefault();
      var section = _this.state.section;
      if (type == "next") section = _this.state.section < _this.props.images.length - 1 ? _this.state.section + 1 : 0;
      if (type == "prev") section = _this.state.section > 0 ? _this.state.section - 1 : 0;
      _this.setState({ section: section });
    }, _this.getImage = function (e) {
      var imageStyle = void 0;
      if (e.target.height > e.target.width) {
        imageStyle = _extends({}, _this.state.imageStyle, { maxWidth: "45%" });
        _this.setState({ imageStyle: imageStyle });
      } else {
        imageStyle = _extends({}, _this.state.imageStyle, { maxWidth: "100%" });
        _this.setState({ imageStyle: imageStyle });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GalleryHeader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //side effect, but necessary
      var nav = document.querySelector(".nav");
      nav.style.background = "rgb(34, 34, 34)";
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          images = _props.images,
          excerpts = _props.excerpts;

      var h = window.innerHeight - 100;
      var w = window.innerHeight;

      var btnsStyle = (0, _glamor.css)({
        float: "right",
        marginTop: "7px"
      });

      var btnStyle = (0, _glamor.css)({
        border: "1px solid #fff",
        background: "transparent",
        width: "40px",
        height: "40px",
        borderRadius: "0",
        padding: "0",
        ":hover": {
          background: "rgba(255, 255, 255, .2)"
        }
      });

      var linkLeft = (0, _glamor.css)({
        position: "absolute",
        height: "100%",
        top: "0",
        bottom: "auto",
        left: 0,
        width: "50%"
      });

      var linkRight = (0, _glamor.css)(_extends({}, linkLeft, { left: "auto", right: 0 }));

      var mainStyle = (0, _glamor.css)({
        height: h + "px",
        background: "#222",
        position: "relative",
        overflow: "hidden",
        "@media(max-width: 767px)": { margin: "0 -20px" }
      });

      var viewportStyle = (0, _glamor.css)({
        height: h + "px"
      });

      var excerptStyle = (0, _glamor.css)({
        color: "#fff",
        marginTop: "20px",
        display: "block",
        textShadow: "2px 2px 2px #222"
      });

      var shareBtn = (0, _glamor.css)({
        color: "#fff",
        width: "30px",
        height: "30px",
        borderRadius: "30px",
        textAlign: "center",
        display: "block",
        border: "1px solid #fff",
        padding: "5px",
        fontSize: "12px",
        ":hover": {
          background: "rgba(255, 255, 255, .2)"
        }
      });

      var liStyle = (0, _glamor.css)({
        marginLeft: "5px",
        display: "none",
        "@media(max-width: 767px)": {
          display: "inline-block"
        }
      });

      return _react2.default.createElement(
        "div",
        { className: mainStyle },
        _react2.default.createElement(
          "div",
          { className: viewportStyle },
          _react2.default.createElement(
            "div",
            { style: { maxWidth: w, margin: "0 auto", padding: "0 20px" } },
            _react2.default.createElement(
              "h5",
              { style: { color: "#fff", marginBottom: "20px" } },
              this.props.texts.gallery,
              " ",
              _react2.default.createElement("i", { className: "ion-camera" })
            ),
            _react2.default.createElement(
              "div",
              {
                className: "gallery-header__item",
                style: { position: "relative" }
              },
              _react2.default.createElement("img", {
                onLoad: this.getImage,
                src: images[this.state.section],
                className: (0, _glamor.css)(this.state.imageStyle)
              }),
              _react2.default.createElement(
                "div",
                { style: { width: "100%", float: "left" } },
                _react2.default.createElement(
                  "span",
                  { className: excerptStyle },
                  excerpts[this.state.section]
                )
              ),
              _react2.default.createElement(
                "div",
                {
                  style: { width: "100%", float: "left", marginTop: "10px" }
                },
                _react2.default.createElement(
                  "ul",
                  {
                    style: { listStyle: "none", padding: "0", float: "left" }
                  },
                  _react2.default.createElement(
                    "li",
                    { className: liStyle },
                    _react2.default.createElement(
                      "a",
                      {
                        key: 1,
                        className: shareBtn,
                        href: "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href
                      },
                      _react2.default.createElement("i", { className: "ion-social-facebook" })
                    )
                  ),
                  _react2.default.createElement(
                    "li",
                    { className: liStyle },
                    _react2.default.createElement(
                      "a",
                      {
                        key: 2,
                        className: shareBtn,
                        href: "https://twitter.com/intent/tweet?text=" + window.location.href
                      },
                      _react2.default.createElement("i", { className: "ion-social-twitter" })
                    )
                  ),
                  _react2.default.createElement(
                    "li",
                    { className: liStyle },
                    _react2.default.createElement(
                      "a",
                      {
                        key: 3,
                        className: shareBtn,
                        href: "https://www.linkedin.com/shareArticle?mini=true&url=" + window.location.href
                      },
                      _react2.default.createElement("i", { className: "ion-social-linkedin" })
                    )
                  ),
                  _react2.default.createElement(
                    "li",
                    {
                      className: liStyle
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        key: 4,
                        className: shareBtn,
                        href: "whatsapp://send?text=" + window.location.href
                      },
                      _react2.default.createElement("i", { className: "ion-social-whatsapp-outline" })
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { style: { float: "right", marginTop: "7px" } },
                  _react2.default.createElement(
                    "span",
                    { style: { color: "#fff", paddingRight: "10px" } },
                    this.state.section + 1,
                    " ",
                    this.props.texts.of,
                    " ",
                    images.length
                  ),
                  _react2.default.createElement(
                    "button",
                    {
                      key: "btn-1",
                      onClick: this.changeSection.bind(null, "prev"),
                      className: btnStyle
                    },
                    _react2.default.createElement("i", { className: "ion-chevron-left" })
                  ),
                  _react2.default.createElement(
                    "button",
                    {
                      key: "btn-2",
                      onClick: this.changeSection.bind(null, "next"),
                      className: btnStyle
                    },
                    _react2.default.createElement("i", { className: "ion-chevron-right" })
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                textAlign: "center",
                bottom: "10px",
                left: "0",
                right: "0"
              }
            },
            _react2.default.createElement(
              "a",
              { href: "#post-content" },
              _react2.default.createElement("img", {
                onLoad: this.getImage,
                src: "/wp-content/themes/acn_int/public/images/down.png"
              })
            )
          )
        )
      );
    }
  }]);

  return GalleryHeader;
}(_react2.default.Component);

GalleryHeader.defaultProps = { images: [], excerpts: [], texts: {} };
exports.default = GalleryHeader;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _headerSlide = __webpack_require__(300);

var _headerSlide2 = _interopRequireDefault(_headerSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headerSlider = function (_React$Component) {
  _inherits(headerSlider, _React$Component);

  function headerSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, headerSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = headerSlider.__proto__ || Object.getPrototypeOf(headerSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { currentSlide: 0, left: "0" }, _this.nextSlide = function () {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (clear) clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;

      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _this.prevSlide = function () {
      clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(headerSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.nextSlide(false);
      }, this.props.interval);
    }
  }, {
    key: "render",
    value: function render() {
      var slides = this.props.slides;

      var viewportWidth = 100 * slides.length + "%";
      var slideWidth = 100 / slides.length + "%";
      var windowHeight = window.innerHeight;
      var headerBannerHeight = document.querySelector(".header-banner") ? document.querySelector(".header-banner").offsetHeight : 0;
      var navHeight = document.querySelector(".nav") ? document.querySelector(".nav").offsetHeight : 0;
      var sliderHeight = windowHeight && navHeight && headerBannerHeight ? windowHeight - navHeight - headerBannerHeight : "auto";

      var viewportStyle = {
        width: viewportWidth,
        left: this.state.left,
        height: sliderHeight
      };

      return _react2.default.createElement(
        "div",
        { className: "slider", style: { height: sliderHeight } },
        _react2.default.createElement(
          "div",
          { className: "slider__viewport", style: viewportStyle },
          slides.map(function (slide, i) {
            slide = _extends({}, slide, { width: slideWidth, height: sliderHeight });
            return _react2.default.createElement(_headerSlide2.default, _extends({ key: i }, slide));
          })
        ),
        slides.length > 1 ? _react2.default.createElement(
          "div",
          { className: "slider__btns" },
          _react2.default.createElement(
            "button",
            { className: "slider__btns__prev", onClick: this.prevSlide },
            _react2.default.createElement("i", { className: "ion-chevron-left" })
          ),
          _react2.default.createElement(
            "button",
            { className: "slider__btns__next", onClick: this.nextSlide },
            _react2.default.createElement("i", { className: "ion-chevron-right" })
          )
        ) : ""
      );
    }
  }]);

  return headerSlider;
}(_react2.default.Component);

headerSlider.defaultProps = { slides: [], interval: 5000, anchor: "#" };
exports.default = headerSlider;

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _minigrid = __webpack_require__(555);

var _minigrid2 = _interopRequireDefault(_minigrid);

var _debounce = __webpack_require__(74);

var _debounce2 = _interopRequireDefault(_debounce);

var _post = __webpack_require__(301);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

var Posts = function (_React$Component) {
  _inherits(Posts, _React$Component);

  function Posts() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Posts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Posts.__proto__ || Object.getPrototypeOf(Posts)).call.apply(_ref, [this].concat(args))), _this), _this.state = { posts: [], paged: 1, seeMore: true }, _this.initGrid = function () {
      if (_this.state.posts && _this.state.posts.length > 0) {
        var container = _this.grid;
        var grid = new _minigrid2.default({ container: container, item: ".grid-item" });

        grid.mount();
      }
    }, _this.goToPosts = function () {
      window.location = _this.props.see_more_link;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Posts, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var data = _qs2.default.stringify({ action: "get_posts" });

      _axios2.default.post(endpoint, data).then(function (_ref2) {
        var data = _ref2.data;

        var posts = data ? data : [];
        _this2.setState({ posts: posts });
      }).catch(function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.initGrid();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", (0, _debounce2.default)(this.initGrid, 300));
      this.initGrid();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var posts = this.state.posts;


      var postMain = posts.map(function (post, i) {
        if (i == 0) {
          return _react2.default.createElement(_post2.default, _extends({
            key: i,
            onImageLoaded: _this3.initGrid
          }, _this3.props, {
            type: "main",
            post: post
          }));
        }
      });

      var postsNodes = posts.map(function (post, i) {
        if (i !== 0) {
          return _react2.default.createElement(_post2.default, _extends({
            key: i,
            onImageLoaded: _this3.initGrid
          }, _this3.props, {
            type: "item",
            post: post
          }));
        }
      });

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { ref: function ref(grid) {
              return _this3.grid = grid;
            } },
          postMain,
          _react2.default.createElement(
            "div",
            { className: "grid-items" },
            postsNodes
          )
        ),
        _react2.default.createElement(
          "button",
          {
            style: { display: "block" },
            onClick: this.goToPosts,
            className: this.state.seeMore ? "bs-see-more" : "hidden"
          },
          this.props.see_more
        )
      );
    }
  }]);

  return Posts;
}(_react2.default.Component);

exports.default = Posts;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _radium = __webpack_require__(142);

var _radium2 = _interopRequireDefault(_radium);

var _projects = __webpack_require__(166);

var _projects2 = _interopRequireDefault(_projects);

var _postsAbout = __webpack_require__(302);

var _postsAbout2 = _interopRequireDefault(_postsAbout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = {
	1: "#b91325",
	2: "#00355f",
	3: "#6e5785",
	4: "#95a0ad",
	5: "#156734",
	6: "#689038",
	7: "#7a2d04",
	8: "#b27009",
	9: "#E4A70F"
};

var ProjectsAbout = function (_React$Component) {
	_inherits(ProjectsAbout, _React$Component);

	function ProjectsAbout() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ProjectsAbout);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProjectsAbout.__proto__ || Object.getPrototypeOf(ProjectsAbout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			section: 0
		}, _this.handleSection = function (i) {
			var section = i - 1;
			_this.setState({ section: section });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ProjectsAbout, [{
		key: "render",
		value: function render() {
			var section = this.state.section;


			var aboutNumStyle = {
				width: "50%",
				textAlign: "right",
				paddingTop: "40px",
				float: "left",
				height: "150px",
				background: "#fff",
				color: colors[this.state.section + 1],
				"@media (max-width: 767px)": {
					width: "100%",
					height: "auto",
					textAlign: "center"
				}
			};

			var aboutNumTextStyle = {
				textAlign: "left",
				width: "50%",
				float: "left",
				height: "150px",
				padding: "60px",
				fontSize: "1.5em",
				color: "#A0A0A0",
				"@media (max-width: 767px)": {
					width: "100%",
					height: "auto",
					textAlign: "center",
					padding: "0 0 60px 0"
				}
			};

			return _react2.default.createElement(
				_radium.StyleRoot,
				null,
				_react2.default.createElement(_projects2.default, {
					contents: this.props.projects.map(function (project) {
						project["text"] = project.content;
						return project;
					}),
					donate: this.props.donate,
					changeSection: this.handleSection
				}),
				_react2.default.createElement(
					"div",
					{ className: "projects-about-num" },
					_react2.default.createElement(
						"div",
						{
							className: "projects-about-num__num",
							style: aboutNumStyle
						},
						_react2.default.createElement(
							"h2",
							null,
							this.props.projects[section] ? this.props.projects[section].number : ""
						)
					),
					_react2.default.createElement(
						"div",
						{
							className: "projects-about-num__text",
							style: aboutNumTextStyle
						},
						this.props.projects[section] ? this.props.projects[section].number_text : ""
					),
					_react2.default.createElement(
						"div",
						{ style: { background: "#F8F6F8", padding: "80px 0", float: "left", width: "100%", "@media (max-width: 767px)": { padding: "20px 0 0 0" } } },
						_react2.default.createElement(
							"div",
							{ className: "l-wrap" },
							_react2.default.createElement(
								"h4",
								{ style: {
										color: "#324049",
										textTransform: "uppercase",
										marginBottom: "20px",
										marginLeft: "15px",
										fontWeight: "normal"
									}
								},
								this.props.texts.stories
							),
							_react2.default.createElement(_postsAbout2.default, {
								category: this.props.projects[section] ? this.props.projects[section].post_category : ""
							})
						)
					)
				)
			);
		}
	}]);

	return ProjectsAbout;
}(_react2.default.Component);

exports.default = ProjectsAbout;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _glamor = __webpack_require__(92);

var _debounce = __webpack_require__(74);

var _debounce2 = _interopRequireDefault(_debounce);

var _projectsIcons = __webpack_require__(175);

var _projectsIcons2 = _interopRequireDefault(_projectsIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = {
	1: "#b91325",
	2: "#00355f",
	3: "#6e5785",
	4: "#95a0ad",
	5: "#156734",
	6: "#689038",
	7: "#7a2d04",
	8: "#b27009",
	9: "#E4A70F"
};

var ProjectsInfo = function (_Component) {
	_inherits(ProjectsInfo, _Component);

	function ProjectsInfo(props) {
		_classCallCheck(this, ProjectsInfo);

		var _this = _possibleConstructorReturn(this, (ProjectsInfo.__proto__ || Object.getPrototypeOf(ProjectsInfo)).call(this, props));

		_this.handleSection = function (section, e) {
			_this.setState({ section: section });
			_this.moveArrow(section);
		};

		_this.moveArrow = function (num) {
			var left = _this.el.querySelector('.projects__icons li:nth-child(' + num + ')').offsetLeft;
			_this.el.querySelector(".projects__arrow").style.left = left + 'px';
		};

		_this.state = {
			section: 1,
			projects: []
		};
		return _this;
	}

	_createClass(ProjectsInfo, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var num = this.state.section;

			window.addEventListener("resize", (0, _debounce2.default)(function (event) {
				_this2.moveArrow(_this2.state.section);
			}, 200));

			setTimeout(function () {
				_this2.moveArrow(num);
			}, 1000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var infoSectionStyle = (0, _glamor.css)({
				background: colors[this.state.section],
				padding: '40px',
				textAlign: 'center',
				color: '#fff',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
				'@media (max-width: 767px)': {
					display: 'block'
				}
			});

			var numTextStyle = (0, _glamor.css)({
				fontSize: 60 / 15 * 1 + 'em',
				marginRight: '60px',
				'@media (max-width: 767px)': {
					margin: '0',
					display: 'block'
				}
			});

			var section = this.state.section - 1;

			return _react2.default.createElement(
				'div',
				{ ref: function ref(el) {
						return _this3.el = el;
					} },
				_react2.default.createElement(_projectsIcons2.default, { onChange: this.handleSection }),
				_react2.default.createElement(
					'div',
					{ className: infoSectionStyle },
					_react2.default.createElement('div', { className: 'projects__arrow' }),
					_react2.default.createElement(
						'span',
						{ className: numTextStyle },
						this.props.projects[section] ? this.props.projects[section].number : ""
					),
					_react2.default.createElement(
						'span',
						{ style: { fontSize: '30px' } },
						this.props.projects[section] ? this.props.projects[section].number_text : ""
					)
				)
			);
		}
	}]);

	return ProjectsInfo;
}(_react.Component);

exports.default = ProjectsInfo;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(80);

var _videoModal2 = _interopRequireDefault(_videoModal);

var _radium = __webpack_require__(142);

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionVideoContent = function (_React$Component) {
  _inherits(SectionVideoContent, _React$Component);

  function SectionVideoContent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SectionVideoContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SectionVideoContent.__proto__ || Object.getPrototypeOf(SectionVideoContent)).call.apply(_ref, [this].concat(args))), _this), _this.showVideo = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SectionVideoContent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = window.innerHeight - 100;
      var linkStyle = {
        left: "0",
        right: "0",
        bottom: "0",
        top: "0",
        width: "100%",
        position: "absolute"
      };

      var bgStyle = {
        float: "left",
        lineHeight: "0",
        background: "url(" + this.props.imgUrl + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: this.props.fullHeight ? h : "900px",
        "@media (max-width: 767px)": {
          height: "auto"
        }
      };

      var imageStyle = { width: "100px", margin: "0 auto" };
      imageStyle = _extends({}, imageStyle, this.props.imageStyle);

      return _react2.default.createElement(
        _radium.StyleRoot,
        null,
        _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }),
        _react2.default.createElement(
          "div",
          { style: bgStyle },
          _react2.default.createElement("a", {
            href: "#",
            className: "image-video__link",
            style: linkStyle,
            onClick: this.showVideo
          }),
          _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.content } })
        )
      );
    }
  }]);

  return SectionVideoContent;
}(_react2.default.Component);

SectionVideoContent.defaultProps = {
  imgUrl: "",
  url: "https://www.youtube.com/embed/_lQvw2vSDbs",
  imageStyle: {},
  content: "",
  fullHeight: false
};
exports.default = SectionVideoContent;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(80);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoHeader = function (_React$Component) {
  _inherits(VideoHeader, _React$Component);

  function VideoHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoHeader.__proto__ || Object.getPrototypeOf(VideoHeader)).call.apply(_ref, [this].concat(args))), _this), _this.openModal = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoHeader, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          videoUrl = _props.videoUrl,
          imageUrl = _props.imageUrl;

      var height = window.innerHeight < 700 ? window.innerHeight / 2 - 100 + "px" : window.innerHeight - 100 + "px";

      var style = {
        backgroundImage: "url(" + imageUrl + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        position: "relative",
        cursor: "pointer",
        height: height
      };

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: videoUrl }),
        _react2.default.createElement(
          "div",
          { style: style, onClick: this.openModal },
          _react2.default.createElement(
            "div",
            {
              style: {
                background: "rgba(60,81,90, .5)",
                width: "100%",
                padding: "10px 10px"
              }
            },
            _react2.default.createElement(
              "div",
              { className: "l-wrap", style: { color: "#fff", fontSize: "18px" } },
              "Video ",
              _react2.default.createElement("i", { className: "ion-ios-videocam" })
            )
          )
        )
      );
    }
  }]);

  return VideoHeader;
}(_react2.default.Component);

VideoHeader.defaultProps = {
  videoUrl: "",
  imageUrl: ""
};
exports.default = VideoHeader;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  $('.bs-donate a').text(bs.donate);
  $('.bs-donate').on('click', function (e) {
    e.preventDefault();
    if (ga) ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);

    var data = _qs2.default.stringify({ action: 'donate_redirect' });

    _axios2.default.post('/wp-admin/admin-ajax.php', data).then(function (res) {
      return window.location = res.data;
    });
  });
};

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollViaCrucisNav;

var _debounce = __webpack_require__(74);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollViaCrucisNav() {
  var onScroll = (0, _debounce2.default)(function () {

    var $nav = $('.nav');
    var $viaCrucisNav = $('.via-crucis-nav__container');
    var $navToggle = $('.via-crucis-toggle');
    var navTop = $nav ? $nav.offset().top : 0;
    var viaCrucisToggleTop = $navToggle ? $navToggle.offset().top : 0;
    var viaCrucisLeft = $('.via-crucis__left') ? $('.via-crucis__left').offset().top : 0;

    if (navTop > viaCrucisLeft) {
      $navToggle.addClass('via-crucis-toggle--fixed');
      $viaCrucisNav.addClass('via-crucis-nav__container--fixed');
    } else {
      $navToggle.removeClass('via-crucis-toggle--fixed');
      $viaCrucisNav.removeClass('via-crucis-nav__container--fixed');
    }
  }, 200);

  if ($('.via-crucis-toggle').length > 0 && $('.nav').length > 0 && window.outerHeight <= 767) {
    window.addEventListener('scroll', onScroll);
  }
}

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMenu = function setMenu() {
  var $menu = $('.menu');
  var currentLang = $('.menu .current-lang > a');
  $('.menu .current-lang').addClass('dropdown');
  $('.menu .current-lang').append('<div class="dropdown-content"></div>');
  var langs = $('.menu .lang-item').not($('.current-lang'));

  $('.menu').addClass('menu--show');

  currentLang.on('click', function (e) {
    e.preventDefault();
    var $dropdown = $menu.find('.dropdown-content');

    if ($dropdown.hasClass('dropdown-content--show')) {
      $dropdown.removeClass('dropdown-content--show');
      return;
    }

    $dropdown.addClass('dropdown-content--show');
  });

  langs.each(function () {
    $menu.find('.dropdown-content').append($(this).html());
    $(this).remove();
  });

  var newText = currentLang.text() + ' <i class="ion-chevron-down"></i>';
  currentLang.html(newText);
};

exports.default = setMenu;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMenuMobile = function setMenuMobile() {
  $('.open-menu').on('click', function () {
    if ($('.menu--mobile').hasClass('menu--mobile--open')) {
      $(document.body).removeClass('menu-open');
      $('.menu--mobile').removeClass('menu--mobile--open');
    } else {
      $(document.body).addClass('menu-open');
      $('.menu--mobile').addClass('menu--mobile--open');
    }
  });

  $('.close-menu').on('click', function (e) {
    $(document.body).removeClass('menu-open');
    $('.menu--mobile').removeClass('menu--mobile--open');
  });
};

exports.default = setMenuMobile;

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = smoothScroll;

var _debounce = __webpack_require__(74);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smoothScroll() {

  $(".bs-donate, .bs-anchor").on('click', function (event) {

    console.log(this.hash, event);

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      var less = $('.nav') ? $('.nav').height() + 20 : 0;

      var scrollTop = $(hash) ? $(hash).offset().top - less : 0;
      $('html, body').animate({ scrollTop: scrollTop }, 800, function () {});
    }
  });

  window.addEventListener('scroll', (0, _debounce2.default)(function () {
    if ($('.nav').offset().top > 0) {
      $('#return-to-top').css({ display: 'block' });
    } else {
      $('#return-to-top').css({ display: 'none' });
    }
  }, 200));

  $('#return-to-top').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({ scrollTop: 0 }, 800, function () {});
  });
}

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stickyMenu;
function stickMenu(e) {
  var $nav = $('.nav');
  var $stickyMenu = $('.sticky-menu');
  var $parentSticky = $stickyMenu ? $stickyMenu.parent().offset().top : 0;
  var stickyMenuTop = $stickyMenu ? $stickyMenu.offset().top : 0;
  var navTop = $nav ? $nav.offset().top : 0;
  var $container = $('.sticky-menu__container') ? $('.sticky-menu__container') : $('.grant-right');
  var containerHeight = $container.height();
  var maxTop = containerHeight - $('.sticky-menu').innerHeight();
  var top = navTop;
  var br = document.querySelector('.sticky-menu__container') ? document.querySelector('.sticky-menu__container').getBoundingClientRect() : document.querySelector('.grant-right').getBoundingClientRect();
  var h = $('.sticky-menu').innerHeight() + 40;

  if (br.top - 110 < 0 && br.bottom - h > 0) {
    $stickyMenu.css({
      position: 'relative',
      top: top
    });
  }
}

function stickyMenu() {
  if ($('.sticky-menu').length > 0) {
    window.addEventListener('scroll', stickMenu);
  }
}

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleMenu;
function toggleMenu() {
  if (window.innerWidth < 701) {
    $('.grant-menu__list') ? $('.grant-menu__list').removeClass('dropdown-list--show') : '';
  }

  $('.grant-menu__open').on('click', function (e) {
    e.preventDefault();
    var $list = $('.grant-menu__list');

    if ($list.hasClass('dropdown-list--show')) {
      $list.removeClass('dropdown-list--show');
    } else {
      $list.addClass('dropdown-list--show');
    }
  });

  $('.dropdown-trigger').on('click', function (e) {
    e.preventDefault();
    var $list = $(this).parent().find('.dropdown-list');
    if ($list.hasClass('dropdown-list--show')) {
      $list.removeClass('dropdown-list--show');
    } else {
      $list.addClass('dropdown-list--show');
    }
  });
}

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleViaCrucisNav;
function toggleViaCrucisNav() {
  if ($('.via-crucis-toggle')) {
    $('.via-crucis-toggle').on('click', function (e) {
      e.preventDefault();
      $('.via-crucis-toggle i').toggleClass('ion-chevron-up');
      $('.via-crucis-nav__container').toggleClass("via-crucis-nav__container--open");
    });
  }
}

/***/ }),
/* 278 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//get sass file and compiled to css

__webpack_require__(278);

__webpack_require__(104);

var _webfontloader = __webpack_require__(106);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _reactMultipleRender = __webpack_require__(105);

var _reactMultipleRender2 = _interopRequireDefault(_reactMultipleRender);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _contactForm = __webpack_require__(258);

var _contactForm2 = _interopRequireDefault(_contactForm);

var _headerSlider = __webpack_require__(264);

var _headerSlider2 = _interopRequireDefault(_headerSlider);

var _sectionVideo = __webpack_require__(167);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

var _sectionVideoContent = __webpack_require__(268);

var _sectionVideoContent2 = _interopRequireDefault(_sectionVideoContent);

var _projects = __webpack_require__(166);

var _projects2 = _interopRequireDefault(_projects);

var _projectsInfo = __webpack_require__(267);

var _projectsInfo2 = _interopRequireDefault(_projectsInfo);

var _accordion = __webpack_require__(255);

var _accordion2 = _interopRequireDefault(_accordion);

var _posts = __webpack_require__(265);

var _posts2 = _interopRequireDefault(_posts);

var _single = __webpack_require__(261);

var _single2 = _interopRequireDefault(_single);

var _inline = __webpack_require__(165);

var _inline2 = _interopRequireDefault(_inline);

var _inline_section = __webpack_require__(259);

var _inline_section2 = _interopRequireDefault(_inline_section);

var _section = __webpack_require__(260);

var _section2 = _interopRequireDefault(_section);

var _campaignsSlider = __webpack_require__(256);

var _campaignsSlider2 = _interopRequireDefault(_campaignsSlider);

var _downloadPdf = __webpack_require__(262);

var _downloadPdf2 = _interopRequireDefault(_downloadPdf);

var _galleryHeader = __webpack_require__(263);

var _galleryHeader2 = _interopRequireDefault(_galleryHeader);

var _projectsAbout = __webpack_require__(266);

var _projectsAbout2 = _interopRequireDefault(_projectsAbout);

var _videoHeader = __webpack_require__(269);

var _videoHeader2 = _interopRequireDefault(_videoHeader);

var _carousel = __webpack_require__(257);

var _carousel2 = _interopRequireDefault(_carousel);

var _set_menu = __webpack_require__(272);

var _set_menu2 = _interopRequireDefault(_set_menu);

var _set_menu_mobile = __webpack_require__(273);

var _set_menu_mobile2 = _interopRequireDefault(_set_menu_mobile);

var _donate_redirect = __webpack_require__(270);

var _donate_redirect2 = _interopRequireDefault(_donate_redirect);

var _smoothScroll = __webpack_require__(274);

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _scrollViaCrucisNav = __webpack_require__(271);

var _scrollViaCrucisNav2 = _interopRequireDefault(_scrollViaCrucisNav);

var _toggleViaCrucisNav = __webpack_require__(277);

var _toggleViaCrucisNav2 = _interopRequireDefault(_toggleViaCrucisNav);

var _toggleMenu = __webpack_require__(276);

var _toggleMenu2 = _interopRequireDefault(_toggleMenu);

var _stickMenu = __webpack_require__(275);

var _stickMenu2 = _interopRequireDefault(_stickMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//jquery stuff :(


//React components :)
_webfontloader2.default.load({
  google: { families: ["Source Sans Pro:400,600,700"] },
  custom: { families: ["Ionicons"], testStrings: { Ionicons: "\uF10C\uF109" } },
  fontinactive: function fontinactive(familyName, fvd) {
    console.error(familyName + " failed to load");
  }
});

//react renders
(0, _reactMultipleRender2.default)(_headerSlider2.default, ".header-slider");
(0, _reactMultipleRender2.default)(_contactForm2.default, ".contact-form");
(0, _reactMultipleRender2.default)(_posts2.default, ".bs-posts");
(0, _reactMultipleRender2.default)(_single2.default, ".bs-donate-react");
(0, _reactMultipleRender2.default)(_inline2.default, ".bs-donate-inline");
(0, _reactMultipleRender2.default)(_inline_section2.default, ".bs-donate-inline-section");
(0, _reactMultipleRender2.default)(_section2.default, ".bs-donate-section");
(0, _reactMultipleRender2.default)(_projects2.default, ".projects-container");
(0, _reactMultipleRender2.default)(_projectsInfo2.default, ".bs-projects-info");
(0, _reactMultipleRender2.default)(_accordion2.default, ".bs-accordion");
(0, _reactMultipleRender2.default)(_sectionVideo2.default, ".section-video");
(0, _reactMultipleRender2.default)(_sectionVideoContent2.default, ".section-video-content");
(0, _reactMultipleRender2.default)(_campaignsSlider2.default, ".bs-campaings-slider");
(0, _reactMultipleRender2.default)(_downloadPdf2.default, ".bs-download-pdf");
(0, _reactMultipleRender2.default)(_galleryHeader2.default, ".bs-gallery-header");
(0, _reactMultipleRender2.default)(_projectsAbout2.default, ".bs-projects-about");
(0, _reactMultipleRender2.default)(_videoHeader2.default, ".bs-video-header");
(0, _reactMultipleRender2.default)(_carousel2.default, ".bs-carousel");

//jquery calls
(0, _set_menu2.default)();
(0, _set_menu_mobile2.default)();
(0, _donate_redirect2.default)();
(0, _smoothScroll2.default)();
(0, _toggleViaCrucisNav2.default)();
(0, _scrollViaCrucisNav2.default)();
(0, _stickMenu2.default)();
(0, _toggleMenu2.default)();
var cookies = {};

document.cookie.split(";").forEach(function (l) {
  cookies[l.split("=")[0].trim()] = l.split("=")[1];
});

if (document.querySelector(".bs-donate")) {
  document.querySelector(".bs-donate").addEventListener("click", function () {
    _dp("track", "donate_click");
    console.log("click", _dp);
  });
}

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AmountBtns = function (_React$Component) {
  _inherits(AmountBtns, _React$Component);

  function AmountBtns() {
    _classCallCheck(this, AmountBtns);

    return _possibleConstructorReturn(this, (AmountBtns.__proto__ || Object.getPrototypeOf(AmountBtns)).apply(this, arguments));
  }

  _createClass(AmountBtns, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          changeAmount = _props.changeAmount,
          texts = _props.texts,
          amount = _props.amount;


      return _react2.default.createElement(
        "ul",
        { className: "change-amount", style: { padding: 0 } },
        _react2.default.createElement(
          "li",
          { className: "col-1-4" },
          _react2.default.createElement(
            "a",
            { href: "#", className: amount == 10 ? "active" : "", onClick: changeAmount.bind(null, 10) },
            "$10"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "col-1-4" },
          _react2.default.createElement(
            "a",
            { href: "#", className: amount == 30 ? "active" : "", onClick: changeAmount.bind(null, 30) },
            "$30"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "col-1-4" },
          _react2.default.createElement(
            "a",
            { href: "#", className: amount == 50 ? "active" : "", onClick: changeAmount.bind(null, 50) },
            "$50"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "col-1-4" },
          _react2.default.createElement(
            "a",
            { href: "#", className: amount == 100 ? "active" : "", onClick: changeAmount.bind(null, 100) },
            "$100"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "col-1-4" },
          _react2.default.createElement(
            "a",
            { href: "#", onClick: changeAmount.bind(null, 5) },
            texts.other
          )
        )
      );
    }
  }]);

  return AmountBtns;
}(_react2.default.Component);

exports.default = AmountBtns;

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cards = function (_React$Component) {
  _inherits(Cards, _React$Component);

  function Cards() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cards);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cards.__proto__ || Object.getPrototypeOf(Cards)).call.apply(_ref, [this].concat(args))), _this), _this.cardType = function (type) {
      return _this.props.stripe.card_type == type ? "card-type card-type--active" : "card-type";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cards, [{
    key: "render",
    value: function render() {
      var texts = this.props.texts;


      return _react2.default.createElement(
        "div",
        { className: "form-group donate_landing__cards" },
        _react2.default.createElement("img", {
          className: this.cardType("visa"),
          src: texts.template_uri + "/public/img/cards/Visa.png"
        }),
        _react2.default.createElement("img", {
          className: this.cardType("master-card"),
          src: texts.template_uri + "/public/img/cards/MasterCard.png"
        }),
        _react2.default.createElement("img", {
          className: this.cardType("diners-club"),
          src: texts.template_uri + "/public/img/cards/DinersClub.png"
        }),
        _react2.default.createElement("img", {
          className: this.cardType("american-express"),
          src: texts.template_uri + "/public/img/cards/AmericanExpress.png"
        }),
        _react2.default.createElement("img", {
          className: this.cardType("discover"),
          src: texts.template_uri + "/public/img/cards/Discover.png"
        })
      );
    }
  }]);

  return Cards;
}(_react2.default.Component);

exports.default = Cards;

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

var _amount = __webpack_require__(108);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(110);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(109);

var _contact2 = _interopRequireDefault(_contact);

var _four = __webpack_require__(174);

var _four2 = _interopRequireDefault(_four);

var _donate = __webpack_require__(79);

var actions = _interopRequireWildcard(_donate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(errors).every(function (key) {
    return errors[key] == true;
  });
}

var Donate = function (_Component) {
  _inherits(Donate, _Component);

  function Donate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Donate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Donate.__proto__ || Object.getPrototypeOf(Donate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: "monthly",
      amount: 30,
      currency: "usd",
      countries: [],
      contact: { name: "", email: "", country: "" },
      stripe: {
        card_type: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        token: ""
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four_step: false,
      show_titles: true
    }, _this.handleChange = function (field) {
      _this.setState(_extends({}, _this.state, field));
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.nextSection();
    }, _this.completeTransaction = function () {
      var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state = _this.state,
          amount = _this$state.amount,
          donation_type = _this$state.donation_type;

      var base = _this.props.redirect[donation_type];
      var customer = stripeResponse.customer,
          id = stripeResponse.id;


      actions.storeConvertLoop(_this.state).then(actions.storeEventConvertLoop.bind(null, _this.state)).then(actions.storeInfusion.bind(null, _this.state)).then(function (res) {
        if (donation_type == "monthly") {
          var url = base + "?customer_id=" + customer + "-" + id + "&order_revenue=" + amount + "&order_id=" + id;
          window.location = url;
        } else {
          _this.setState({ show_four: true });
          _this.props.changeSection(1);
        }
      });
    }, _this.creditCardIsValid = function () {
      var errs = _this.creditCard.validateAll();
      return isAllValid(errs.stripe);
    }, _this.contactIsValid = function () {
      var errs = _this.contact.validateAll();
      return isAllValid(errs.contact);
    }, _this.nextSection = function () {
      var section = _this.state.section < 2 ? _this.state.section + 1 : 2;

      if (_this.state.section == 1) {
        if (!_this.creditCardIsValid()) return false;

        actions.stripeToken(_this.state).then(function (res) {
          if (res.id) {
            var stripe = _extends({}, _this.state.stripe, { token: res.id });
            _this.setState(_extends({}, _this.state, { stripe: stripe }));
            return stripe;
          }

          if (res.stripeCode) {
            _this.setState(_extends({}, _this.state, { loading: false, declined: true }));
          }
        });
      }

      if (_this.state.section == 2) {
        if (!_this.contactIsValid()) return false;
        actions.stripeCharge(_this.state).then(function (res) {
          return _this.completeTransaction(res.data);
        });
      }

      var left = "-" + section * 100 + "%";

      if (_this.state.section == 0) {
        _this.setState({ section: section, left: left, loading: false });
      } else {
        _this.setState({ section: section, left: left });
      }
    }, _this.prevSection = function (e) {
      e.preventDefault();
      var section = _this.state.section >= 0 ? _this.state.section - 1 : 0;
      var left = "-" + section * 100 + "%";
      _this.setState({ section: section, left: left });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Donate, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      actions.fetchCountries().then(function (countries) {
        return _this2.setState({ countries: countries });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.donateForm.addEventListener("keydown", function (e) {
        if (e.which == 9) {
          e.preventDefault();
          _this3.nextSection();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var sectionWidth = 100 / 3 + "%";
      var viewPortStyle = { width: "300%", left: this.state.left };
      var donationTypeStyle = {
        display: "inline",
        marginLeft: "15px",
        color: this.props.is_blue ? "rgb(60, 81, 95)" : "#fff"
      };

      var backBtnStyle = {
        float: "right",
        background: "transparent",
        border: "none",
        padding: "0 20px",
        color: this.props.is_blue ? "rgb(60, 81, 95)" : "#fff"
      };

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "form",
          {
            onSubmit: this.handleSubmit,
            className: this.props.is_blue ? "donate_react donate_inline" : "donate_react",
            style: this.state.show_four ? { display: "none" } : { display: "block" },
            ref: function ref(donate) {
              return _this4.donateForm = donate;
            }
          },
          _react2.default.createElement(
            "div",
            { className: "donate_react__viewport", style: viewPortStyle },
            _react2.default.createElement(_amount2.default, _extends({}, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_creditCard2.default, _extends({
              ref: function ref(creditCard) {
                return _this4.creditCard = creditCard;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2.default.createElement(_contact2.default, _extends({
              ref: function ref(contact) {
                return _this4.contact = contact;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "form-group" },
            _react2.default.createElement(
              "button",
              {
                className: "donate_react__submit pull-left",
                onClick: this.handleSubmit,
                disabled: this.state.loading
              },
              this.state.section == 1 ? this.props.texts.next : this.props.texts.donate
            ),
            _react2.default.createElement(
              "span",
              { style: donationTypeStyle },
              this.state.amount + " USD " + this.props.texts[this.state.donation_type]
            ),
            this.state.section > 0 ? _react2.default.createElement(
              "button",
              { style: backBtnStyle, onClick: this.prevSection },
              this.props.texts.back
            ) : ""
          ),
          _react2.default.createElement(
            "div",
            {
              style: this.state.declined ? {
                display: "block",
                background: "red",
                color: "#fff",
                float: "left",
                width: "100%",
                padding: "10px"
              } : { display: "none" }
            },
            this.props.texts.validation_declined
          )
        ),
        _react2.default.createElement(_four2.default, _extends({}, this.props, this.state))
      );
    }
  }]);

  return Donate;
}(_react.Component);

Donate.defaultProps = { texts: {}, redirect: {} };
exports.default = Donate;

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(80);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headerSlide = function (_React$Component) {
  _inherits(headerSlide, _React$Component);

  function headerSlide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, headerSlide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = headerSlide.__proto__ || Object.getPrototypeOf(headerSlide)).call.apply(_ref, [this].concat(args))), _this), _this.handleLink = function (e) {
      e.preventDefault();
      if (_this.props.is_video) return _this.modal.show();
      window.location.href = _this.props.url;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(headerSlide, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          image = _props.image,
          image_position = _props.image_position,
          title = _props.title,
          subtitle = _props.subtitle,
          url = _props.url,
          width = _props.width,
          height = _props.height;


      var bg = "url(" + image + ")";

      var style = {
        backgroundImage: bg,
        backgroundPosition: image_position,
        width: width,
        height: height
      };

      return _react2.default.createElement(
        "div",
        null,
        this.props.is_video ? _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }) : "",
        _react2.default.createElement(
          "div",
          { className: "slider__slide", style: style },
          _react2.default.createElement("a", { href: "#", className: "slider__slide__link-zone", onClick: this.handleLink }),
          _react2.default.createElement(
            "a",
            { href: this.props.anchor, className: "slider__slide__anchor" },
            _react2.default.createElement(
              "svg",
              { width: "50px", height: "57px", viewBox: "178 602 20 27", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
              _react2.default.createElement(
                "defs",
                null,
                _react2.default.createElement("polyline", { id: "path-1", points: "16.9743561 9.37612525 16.9743561 23.0775777 2.91233907 23.0775777" }),
                _react2.default.createElement(
                  "mask",
                  { id: "mask-2", maskContentUnits: "userSpaceOnUse", maskUnits: "objectBoundingBox", x: "0", y: "0", width: "14.062017", height: "13.7014524", fill: "white" },
                  _react2.default.createElement("use", { xlinkHref: "#path-1" })
                ),
                _react2.default.createElement("polyline", { id: "path-3", points: "16.9743561 3.23766371 16.9743561 16.9391162 2.91233907 16.9391162" }),
                _react2.default.createElement(
                  "mask",
                  { id: "mask-4", maskContentUnits: "userSpaceOnUse", maskUnits: "objectBoundingBox", x: "0", y: "0", width: "14.062017", height: "13.7014524", fill: "white" },
                  _react2.default.createElement("use", { xlinkHref: "#path-3" })
                )
              ),
              _react2.default.createElement(
                "g",
                { id: "Group-12", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", transform: "translate(178.000000, 602.000000)" },
                _react2.default.createElement("use", { id: "Rectangle", stroke: "#F1364E", mask: "url(#mask-2)", strokeWidth: "4", transform: "translate(9.943348, 16.226851) rotate(-315.000000) translate(-9.943348, -16.226851) ", xlinkHref: "#path-1" }),
                _react2.default.createElement("use", { id: "Rectangle-Copy", stroke: "#F1364E", mask: "url(#mask-4)", strokeWidth: "4", transform: "translate(9.943348, 10.088390) rotate(-315.000000) translate(-9.943348, -10.088390) ", xlinkHref: "#path-3" })
              )
            )
          )
        )
      );
    }
  }]);

  return headerSlide;
}(_react2.default.Component);

exports.default = headerSlide;

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cleanEmpty = function cleanEmpty(arrArg) {
  return arrArg.filter(function (item) {
    return item.length > 0;
  });
};

var Post = function (_React$Component) {
  _inherits(Post, _React$Component);

  function Post() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Post);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Post.__proto__ || Object.getPrototypeOf(Post)).call.apply(_ref, [this].concat(args))), _this), _this.handleImageLoaded = function () {
      _this.props.onImageLoaded();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Post, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          post = _props.post,
          type = _props.type,
          read_more = _props.read_more;
      var _post$post_image = post.post_image,
          post_image = _post$post_image === undefined ? '' : _post$post_image,
          _post$post_title = post.post_title,
          post_title = _post$post_title === undefined ? '' : _post$post_title;

      var imgUrl = Array.isArray(post_image) && post_image.length > 1 ? cleanEmpty(post_image) : post_image;
      var title = post_title;

      if (window.innerWidth <= "767") {
        title = post_title.substring(0, 70) + "...";
      }

      return _react2.default.createElement(
        "div",
        {
          className: type == "main" ? "grid-item grid-item--main" : "grid-item"
        },
        _react2.default.createElement(
          "div",
          {
            className: type == "main" ? "grid-item__content grid-item--main__content" : "grid-item__content"
          },
          _react2.default.createElement(
            "a",
            { href: post.post_permalink },
            imgUrl.length > 0 ? _react2.default.createElement("img", { src: imgUrl, onLoad: this.handleImageLoaded }) : _react2.default.createElement("div", null)
          ),
          _react2.default.createElement(
            "div",
            {
              className: type == "main" ? "grid-item__content__texts grid-item--main__content__texts" : "grid-item__content__texts",
              style: !imgUrl.length > 0 ? { width: "100%" } : {}
            },
            _react2.default.createElement(
              "h5",
              null,
              _react2.default.createElement(
                "a",
                { href: post.post_permalink },
                title
              )
            ),
            _react2.default.createElement(
              "p",
              null,
              post.post_short.substring(0, 220) + "..."
            ),
            _react2.default.createElement(
              "a",
              {
                href: post.post_permalink,
                className: "grid-item__content__texts__readmore"
              },
              read_more,
              "..."
            )
          )
        )
      );
    }
  }]);

  return Post;
}(_react2.default.Component);

Post.defaultProps = {
  post: {
    post_title: ""
  }
};
exports.default = Post;

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(34);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(25);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "/wp-admin/admin-ajax.php";

var PostsAbout = function (_React$Component) {
  _inherits(PostsAbout, _React$Component);

  function PostsAbout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PostsAbout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostsAbout.__proto__ || Object.getPrototypeOf(PostsAbout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      posts: [],
      loading: false
    }, _this.fetchPosts = function (props) {
      var data = _qs2.default.stringify({
        action: "get_posts",
        post_perpage: 4,
        post_category: props.category
      });
      _this.setState({ loading: true });

      _axios2.default.post(endpoint, data).then(function (res) {
        _this.setState({ loading: false, posts: res.data ? res.data : [] });
      }).catch(function (err) {
        return console.error(err);
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PostsAbout, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.fetchPosts(props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchPosts(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var posts = this.state.posts;

      return _react2.default.createElement(
        "div",
        {
          style: this.state.loading ? { transition: "300 ms", opacity: 0 } : { transition: "300 ms", opacity: 1 }
        },
        posts.map(function (post, i) {
          return _react2.default.createElement(
            "div",
            { key: i, className: "col-12 col-3-l" },
            _react2.default.createElement(
              "a",
              { href: post.post_permalink, style: { background: "#fff" } },
              _react2.default.createElement("img", { src: post.post_image, alt: "", style: { width: "100%" } })
            ),
            _react2.default.createElement(
              "div",
              {
                className: "post-about__title",
                style: {
                  background: "#fff",
                  padding: "20px",
                  marginBottom: "20px"
                }
              },
              _react2.default.createElement(
                "h5",
                null,
                _react2.default.createElement(
                  "a",
                  { style: { color: "#324049" }, href: post.post_permalink },
                  post.post_title
                )
              )
            )
          );
        })
      );
    }
  }]);

  return PostsAbout;
}(_react2.default.Component);

exports.default = PostsAbout;

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isObject(obj) {
  return obj === Object(obj);
}

var appendValues = function appendValues(obj, formData, arrName) {
  Object.keys(obj).forEach(function (key) {
    if (isObject(obj[key])) {
      return appendValues(obj[key], formData, key);
    } else if (typeof arrName == 'string') {
      formData.append(arrName + '[' + key + ']', obj[key]);
    } else {
      formData.append(key, obj[key]);
    }
  });

  return formData;
};

var objToFormData = function objToFormData(ob) {
  var data = new FormData();

  data = appendValues(ob, data);

  // Object.keys(ob).forEach(key => {
  // 	if(typeof ob[key] == 'object') {
  // 		Object.keys(ob[key]).forEach(subkey => {
  // 			data.append(`${key}[subkey]`, ob[key][subkey]);
  // 		});
  // 	}
  // 	data.append(key, ob[key]);
  // });
  return data;
};

exports.default = objToFormData;

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (true) __webpack_require__(659)(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  number: __webpack_require__(306),
  expirationDate: __webpack_require__(308),
  expirationMonth: __webpack_require__(178),
  expirationYear: __webpack_require__(111),
  cvv: __webpack_require__(307),
  postalCode: __webpack_require__(312)
};


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var luhn10 = __webpack_require__(310);
var getCardTypes = __webpack_require__(494);

function verification(card, isPotentiallyValid, isValid) {
  return {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid};
}

function cardNumber(value) {
  var potentialTypes, cardType, isPotentiallyValid, isValid, i, maxLength;

  if (typeof value === 'number') {
    value = String(value);
  }

  if (typeof value !== 'string') { return verification(null, false, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  potentialTypes = getCardTypes(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  cardType = potentialTypes[0];

  if (cardType.type === 'unionpay') {  // UnionPay is not Luhn 10 compliant
    isValid = true;
  } else {
    isValid = luhn10(value);
  }

  maxLength = Math.max.apply(null, cardType.lengths);

  for (i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      isPotentiallyValid = value.length !== maxLength || isValid;
      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, value.length < maxLength, false);
}

module.exports = cardNumber;


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DEFAULT_LENGTH = 3;

function includes(array, thing) {
  var i = 0;

  for (; i < array.length; i++) {
    if (thing === array[i]) { return true; }
  }

  return false;
}

function max(array) {
  var maximum = DEFAULT_LENGTH;
  var i = 0;

  for (; i < array.length; i++) {
    maximum = array[i] > maximum ? array[i] : maximum;
  }

  return maximum;
}

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function cvv(value, maxLength) {
  maxLength = maxLength || DEFAULT_LENGTH;
  maxLength = maxLength instanceof Array ? maxLength : [maxLength];

  if (typeof value !== 'string') { return verification(false, false); }
  if (!/^\d*$/.test(value)) { return verification(false, false); }
  if (includes(maxLength, value.length)) { return verification(true, true); }
  if (value.length < Math.min.apply(null, maxLength)) { return verification(false, true); }
  if (value.length > max(maxLength)) { return verification(false, false); }

  return verification(true, true);
}

module.exports = cvv;


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseDate = __webpack_require__(311);
var expirationMonth = __webpack_require__(178);
var expirationYear = __webpack_require__(111);

function verification(isValid, isPotentiallyValid, month, year) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year
  };
}

function expirationDate(value) {
  var date, monthValid, yearValid, isValidForThisYear;

  if (typeof value === 'string') {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
    date = parseDate(value);
  } else if (value !== null && typeof value === 'object') {
    date = {
      month: String(value.month),
      year: String(value.year)
    };
  } else {
    return verification(false, false, null, null);
  }

  monthValid = expirationMonth(date.month);
  yearValid = expirationYear(date.year);

  if (monthValid.isValid) {
    if (yearValid.isCurrentYear) {
      isValidForThisYear = monthValid.isValidForThisYear;
      return verification(isValidForThisYear, isValidForThisYear, date.month, date.year);
    }

    if (yearValid.isValid) {
      return verification(true, true, date.month, date.year);
    }
  }

  if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
    return verification(false, true, null, null);
  }

  return verification(false, false, null, null);
}

module.exports = expirationDate;


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.

module.exports = Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Luhn algorithm implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


function luhn10(identifier) {
  var sum = 0;
  var alt = false;
  var i = identifier.length - 1;
  var num;

  while (i >= 0) {
    num = parseInt(identifier.charAt(i), 10);

    if (alt) {
      num *= 2;
      if (num > 9) {
        num = (num % 10) + 1; // eslint-disable-line no-extra-parens
      }
    }

    alt = !alt;

    sum += num;

    i--;
  }

  return sum % 10 === 0;
}

module.exports = luhn10;


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var expirationYear = __webpack_require__(111);
var isArray = __webpack_require__(309);

function parseDate(value) {
  var month, len, year, yearValid;

  if (/\//.test(value)) {
    value = value.split(/\s*\/\s*/g);
  } else if (/\s/.test(value)) {
    value = value.split(/ +/g);
  }

  if (isArray(value)) {
    return {
      month: value[0],
      year: value.slice(1).join()
    };
  }

  len = value[0] === '0' || value.length > 5 ? 2 : 1;

  if (value[0] === '1') {
    year = value.substr(1);
    yearValid = expirationYear(year);
    if (!yearValid.isPotentiallyValid) {
      len = 2;
    }
  }

  month = value.substr(0, len);

  return {
    month: month,
    year: value.substr(month.length)
  };
}

module.exports = parseDate;


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MIN_POSTAL_CODE_LENGTH = 3;

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function postalCode(value) {
  if (typeof value !== 'string') {
    return verification(false, false);
  } else if (value.length < MIN_POSTAL_CODE_LENGTH) {
    return verification(false, true);
  }

  return verification(true, true);
}

module.exports = postalCode;


/***/ }),
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var testOrder = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(x) {
  var prefixPattern, exactPattern, dupe;

  if (!x) { return null; }

  prefixPattern = x.prefixPattern.source;
  exactPattern = x.exactPattern.source;
  dupe = JSON.parse(JSON.stringify(x));
  dupe.prefixPattern = prefixPattern;
  dupe.exactPattern = exactPattern;

  return dupe;
}

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'MasterCard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27[0-1]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^(6|62)$/,
  exactPattern: /^62\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^5[06-9]\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = types[type];

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(types[type]);
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

module.exports = creditCardType;


/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

exports.default = CSSProperty;

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CSSProperty = __webpack_require__(510);

var _CSSProperty2 = _interopRequireDefault(_CSSProperty);

var _warning = __webpack_require__(211);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */

var isUnitlessNumber = _CSSProperty2.default.isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

exports.default = dangerousStyleValue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = clean;
// Returns true for null, false, undefined and {}
function isFalsy(value) {
  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
}

function cleanObject(object) {
  if (isFalsy(object)) return null;
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

  var acc = {},
      keys = Object.keys(object),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = object[keys[i]];
    var filteredValue = clean(value);
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true;
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue;
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}

function cleanArray(rules) {
  var hasFalsy = false;
  var filtered = [];
  rules.forEach(function (rule) {
    var filteredRule = clean(rule);
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true;
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule);
    }
  });
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
}

// Takes style array or object provided by user and clears all the falsy data 
// If there is no styles left after filtration returns null
function clean(input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.InlineStylePrefixAll = factory();
})(undefined, function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers;

  function __commonjs(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var prefixProps = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };

  // helper to capitalize strings
  var capitalizeString = function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  var isPrefixedProperty = function isPrefixedProperty(property) {
    return property.match(/^(Webkit|Moz|O|ms)/) !== null;
  };

  function sortPrefixedStyle(style) {
    return Object.keys(style).sort(function (left, right) {
      if (isPrefixedProperty(left) && !isPrefixedProperty(right)) {
        return -1;
      } else if (!isPrefixedProperty(left) && isPrefixedProperty(right)) {
        return 1;
      }
      return 0;
    }).reduce(function (sortedStyle, prop) {
      sortedStyle[prop] = style[prop];
      return sortedStyle;
    }, {});
  }

  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return { position: ['-webkit-sticky', 'sticky'] };
    }
  }

  // returns a style object with a single concated prefixed value string
  var joinPrefixedValue = function joinPrefixedValue(property, value) {
    var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (prefix, value) {
      return prefix + value;
    };
    return babelHelpers.defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }));
  };

  var isPrefixedValue = function isPrefixedValue(value) {
    if (Array.isArray(value)) value = value.join(',');

    return value.match(/-webkit-|-moz-|-ms-/) !== null;
  };

  function calc(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('calc(') > -1) {
      return joinPrefixedValue(property, value, function (prefix, value) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return joinPrefixedValue(property, value);
    }
  }

  var values$1 = { flex: true, 'inline-flex': true };

  function flex(property, value) {
    if (property === 'display' && values$1[value]) {
      return {
        display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
      };
    }
  }

  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values$2 = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  function sizing(property, value) {
    if (properties[property] && values$2[value]) {
      return joinPrefixedValue(property, value);
    }
  }

  var values$3 = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.match(values$3) !== null) {
      return joinPrefixedValue(property, value);
    }
  }

  var index = __commonjs(function (module) {
    'use strict';

    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;
    var cache = {};

    function hyphenateStyleName(string) {
      return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
    }

    module.exports = hyphenateStyleName;
  });

  var hyphenateStyleName = index && (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

  var properties$1 = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true
  };

  function transition(property, value) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties$1[property]) {
      var _ref2;

      var outputValue = prefixValue(value);
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
        return value.match(/-moz-|-ms-/) === null;
      }).join(',');

      // if the property is already prefixed
      if (property.indexOf('Webkit') > -1) {
        return babelHelpers.defineProperty({}, property, webkitOutput);
      }

      return _ref2 = {}, babelHelpers.defineProperty(_ref2, 'Webkit' + capitalizeString(property), webkitOutput), babelHelpers.defineProperty(_ref2, property, outputValue), _ref2;
    }
  }

  function prefixValue(value) {
    if (isPrefixedValue(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    // iterate each single value and check for transitioned properties
    // that need to be prefixed as well
    multipleValues.forEach(function (val, index) {
      multipleValues[index] = Object.keys(prefixProps).reduce(function (out, prefix) {
        var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

        Object.keys(prefixProps[prefix]).forEach(function (prop) {
          var dashCaseProperty = hyphenateStyleName(prop);

          if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
            // join all prefixes and create a new value
            out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
          }
        });
        return out;
      }, val);
    });

    return multipleValues.join(',');
  }

  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };

  function flexboxIE(property, value) {
    if (alternativeProps[property]) {
      return babelHelpers.defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }

  var alternativeValues$1 = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps$1 = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  function flexboxOld(property, value) {
    if (property === 'flexDirection' && typeof value === 'string') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (alternativeProps$1[property]) {
      return babelHelpers.defineProperty({}, alternativeProps$1[property], alternativeValues$1[value] || value);
    }
  }

  var plugins = [position, calc, cursor, sizing, gradient, transition, flexboxIE, flexboxOld, flex];

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  function prefixAll(styles) {
    Object.keys(styles).forEach(function (property) {
      var value = styles[property];
      if (value instanceof Object && !Array.isArray(value)) {
        // recurse through nested style objects
        styles[property] = prefixAll(value);
      } else {
        Object.keys(prefixProps).forEach(function (prefix) {
          var properties = prefixProps[prefix];
          // add prefixes if needed
          if (properties[property]) {
            styles[prefix + capitalizeString(property)] = value;
          }
        });
      }
    });

    Object.keys(styles).forEach(function (property) {
      [].concat(styles[property]).forEach(function (value, index) {
        // resolve every special plugins
        plugins.forEach(function (plugin) {
          return assignStyles(styles, plugin(property, value));
        });
      });
    });

    return sortPrefixedStyle(styles);
  }

  function assignStyles(base) {
    var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Object.keys(extend).forEach(function (property) {
      var baseValue = base[property];
      if (Array.isArray(baseValue)) {
        [].concat(extend[property]).forEach(function (value) {
          var valueIndex = baseValue.indexOf(value);
          if (valueIndex > -1) {
            base[property].splice(valueIndex, 1);
          }
          base[property].push(value);
        });
      } else {
        base[property] = extend[property];
      }
    });
  }

  return prefixAll;
});

/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.PluginSet = PluginSet;
exports.fallbacks = fallbacks;
exports.prefixes = prefixes;

var _objectAssign = __webpack_require__(139);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _CSSPropertyOperations = __webpack_require__(210);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = function (x) {
  return x === 'development' || !x;
}(process.env.NODE_ENV);

function PluginSet(initial) {
  this.fns = initial || [];
}

(0, _objectAssign2.default)(PluginSet.prototype, {
  add: function add() {
    var _this = this;

    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    fns.forEach(function (fn) {
      if (_this.fns.indexOf(fn) >= 0) {
        if (isDev) {
          console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
        }
      } else {
        _this.fns = [fn].concat(_this.fns);
      }
    });
  },
  remove: function remove(fn) {
    this.fns = this.fns.filter(function (x) {
      return x !== fn;
    });
  },
  clear: function clear() {
    this.fns = [];
  },
  transform: function transform(o) {
    return this.fns.reduce(function (o, fn) {
      return fn(o);
    }, o);
  }
});

function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var _ret = function () {
      var style = node.style;

      var flattened = Object.keys(style).reduce(function (o, key) {
        o[key] = Array.isArray(style[key]) ? style[key].join('; ' + (0, _CSSPropertyOperations.processStyleName)(key) + ': ') : style[key];
        return o;
      }, {});
      // todo - 
      // flatten arrays which haven't been flattened yet 
      return {
        v: (0, _objectAssign2.default)({}, node, { style: flattened })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return node;
}

var prefixAll = __webpack_require__(514);

function prefixes(node) {
  return (0, _objectAssign2.default)({}, node, { style: prefixAll(node.style) });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSheet = StyleSheet;

var _objectAssign = __webpack_require__(139);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* 

high performance StyleSheet for css-in-js systems 

- uses multiple style tags behind the scenes for millions of rules 
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side 


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject() 
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }') 
- appends a css rule into the stylesheet 

styleSheet.flush() 
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }

  // this weirdness brought to you by firefox 
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof window !== 'undefined';
var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
var isTest = process.env.NODE_ENV === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.setAttribute('data-glamor', '');
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

function StyleSheet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$speedy = _ref.speedy,
      speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

  this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
  this.sheet = undefined;
  this.tags = [];
  this.maxLength = maxLength;
  this.ctr = 0;
}

(0, _objectAssign2.default)(StyleSheet.prototype, {
  getSheet: function getSheet() {
    return sheetForTag(last(this.tags));
  },
  inject: function inject() {
    var _this = this;

    if (this.injected) {
      throw new Error('already injected stylesheet!');
    }
    if (isBrowser) {
      this.tags[0] = makeStyleTag();
    } else {
      // server side 'polyfill'. just enough behavior to be useful.
      this.sheet = {
        cssRules: [],
        insertRule: function insertRule(rule) {
          // enough 'spec compliance' to be able to extract the rules later  
          // in other words, just the cssText field 
          _this.sheet.cssRules.push({ cssText: rule });
        }
      };
    }
    this.injected = true;
  },
  speedy: function speedy(bool) {
    if (this.ctr !== 0) {
      throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
    }
    this.isSpeedy = !!bool;
  },
  _insert: function _insert(rule) {
    // this weirdness for perf, and chrome's weird bug 
    // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
    try {
      var sheet = this.getSheet();
      sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length);
    } catch (e) {
      if (isDev) {
        // might need beter dx for this 
        console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
      }
    }
  },
  insert: function insert(rule) {

    if (isBrowser) {
      // this is the ultrafast version, works across browsers 
      if (this.isSpeedy && this.getSheet().insertRule) {
        this._insert(rule);
      }
      // more browser weirdness. I don't even know    
      // else if(this.tags.length > 0 && this.tags::last().styleSheet) {      
      //   this.tags::last().styleSheet.cssText+= rule
      // }
      else {
          if (rule.indexOf('@import') !== -1) {
            var tag = last(this.tags);
            tag.insertBefore(document.createTextNode(rule), tag.firstChild);
          } else {
            last(this.tags).appendChild(document.createTextNode(rule));
          }
        }
    } else {
      // server side is pretty simple         
      this.sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : this.sheet.cssRules.length);
    }

    this.ctr++;
    if (isBrowser && this.ctr % this.maxLength === 0) {
      this.tags.push(makeStyleTag());
    }
    return this.ctr - 1;
  },

  // commenting this out till we decide on v3's decision 
  // _replace(index, rule) {
  //   // this weirdness for perf, and chrome's weird bug 
  //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
  //   try {  
  //     let sheet = this.getSheet()        
  //     sheet.deleteRule(index) // todo - correct index here     
  //     sheet.insertRule(rule, index)
  //   }
  //   catch(e) {
  //     if(isDev) {
  //       // might need beter dx for this 
  //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
  //     }          
  //   }          

  // }
  // replace(index, rule) {
  //   if(isBrowser) {
  //     if(this.isSpeedy && this.getSheet().insertRule) {
  //       this._replace(index, rule)
  //     }
  //     else {
  //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1        
  //       let _index = (index % this.maxLength) + 1
  //       let tag = this.tags[_slot]
  //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
  //     }
  //   }
  //   else {
  //     let rules = this.sheet.cssRules
  //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
  //   }
  // }
  delete: function _delete(index) {
    // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    return this.replace(index, '');
  },
  flush: function flush() {
    if (isBrowser) {
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.sheet = null;
      this.ctr = 0;
      // todo - look for remnants in document.styleSheets
    } else {
      // simpler on server 
      this.sheet.cssRules = [];
    }
    this.injected = false;
  },
  rules: function rules() {
    if (!isBrowser) {
      return this.sheet.cssRules;
    }
    var arr = [];
    this.tags.forEach(function (tag) {
      return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
    });
    return arr;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var camelize = __webpack_require__(517);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(520);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */



/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(94);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var _utilsIsPrefixedValue = __webpack_require__(140);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

function calc(property, value) {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

    return (0, _utilsJoinPrefixedRules2['default'])(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}

module.exports = exports['default'];

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(94);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(93);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = { flex: true, 'inline-flex': true };

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(93);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(94);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var _utilsIsPrefixedValue = __webpack_require__(140);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && value.match(values) !== null) {
    if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsJoinPrefixedRules = __webpack_require__(94);

var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}

module.exports = exports['default'];

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(93);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = __webpack_require__(213);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsIsPrefixedValue = __webpack_require__(140);

var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

var _prefixProps = __webpack_require__(212);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
};

function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    var _ref2;

    var outputValue = prefixValue(value);
    var webkitOutput = outputValue.split(',').filter(function (value) {
      return value.match(/-moz-|-ms-/) === null;
    }).join(',');

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return _defineProperty({}, property, webkitOutput);
    }

    return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _utilsCapitalizeString2['default'])(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
  }
}

function prefixValue(value) {
  if ((0, _utilsIsPrefixedValue2['default'])(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach(function (val, index) {
    multipleValues[index] = Object.keys(_prefixProps2['default']).reduce(function (out, prefix) {
      var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

      Object.keys(_prefixProps2['default'][prefix]).forEach(function (prop) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(prop);

        if (val.indexOf(dashCaseProperty) > -1) {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
        }
      });
      return out;
    }, val);
  });

  return multipleValues.join(',');
}
module.exports = exports['default'];

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = prefixAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _prefixProps = __webpack_require__(212);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _utilsCapitalizeString = __webpack_require__(213);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = __webpack_require__(532);

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _pluginsCalc = __webpack_require__(523);

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = __webpack_require__(524);

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = __webpack_require__(525);

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = __webpack_require__(529);

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = __webpack_require__(528);

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = __webpack_require__(530);

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = __webpack_require__(526);

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = __webpack_require__(527);

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'], _pluginsFlex2['default']];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */

function prefixAll(styles) {
  return Object.keys(styles).reduce(function (prefixedStyles, property) {
    var value = styles[property];
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      prefixedStyles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2['default']).forEach(function (prefix) {
        var properties = _prefixProps2['default'][prefix];
        // add prefixes if needed
        if (properties[property]) {
          prefixedStyles[prefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
        }
      });

      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return (0, _utilsAssign2['default'])(prefixedStyles, plugin(property, value));
      });
    }

    return prefixedStyles;
  }, styles);
}

module.exports = exports['default'];

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// leight polyfill for Object.assign


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return Object.keys(extend).reduce(function (out, key) {
    base[key] = extend[key];
    return out;
  }, {});
};

module.exports = exports["default"];

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _inlineStylePrefixAll = __webpack_require__(531);

var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);

var _utilsGetBrowserInformation = __webpack_require__(544);

var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);

var _utilsGetPrefixedKeyframes = __webpack_require__(545);

var _utilsGetPrefixedKeyframes2 = _interopRequireDefault(_utilsGetPrefixedKeyframes);

var _utilsCapitalizeString = __webpack_require__(214);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = __webpack_require__(543);

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _prefixProps = __webpack_require__(542);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _pluginsCalc = __webpack_require__(534);

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = __webpack_require__(535);

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = __webpack_require__(536);

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = __webpack_require__(540);

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = __webpack_require__(539);

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = __webpack_require__(541);

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = __webpack_require__(537);

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = __webpack_require__(538);

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'],
// this must be run AFTER the flexbox specs
_pluginsFlex2['default']];

var Prefixer = (function () {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */

  function Prefixer() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Prefixer);

    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;

    this._browserInfo = (0, _utilsGetBrowserInformation2['default'])(this._userAgent);

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.prefix) {
      // set additional prefix information
      this.cssPrefix = this._browserInfo.prefix.css;
      this.jsPrefix = this._browserInfo.prefix.inline;
      this.prefixedKeyframes = (0, _utilsGetPrefixedKeyframes2['default'])(this._browserInfo);
    } else {
      this._usePrefixAllFallback = true;
      return false;
    }

    var data = this._browserInfo.browser && _prefixProps2['default'][this._browserInfo.browser];
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(function (key) {
        return data[key] >= _this._browserInfo.version;
      }).reduce(function (result, name) {
        result[name] = true;
        return result;
      }, {});
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      this._usePrefixAllFallback = true;
    }
  }

  /**
   * Returns a prefixed version of the style object
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */

  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      var _this2 = this;

      // use prefixAll as fallback if userAgent can not be resolved
      if (this._usePrefixAllFallback) {
        return (0, _inlineStylePrefixAll2['default'])(styles);
      }

      // only add prefixes if needed
      if (!this._hasPropsRequiringPrefix) {
        return styles;
      }

      styles = (0, _utilsAssign2['default'])({}, styles);

      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (value instanceof Object) {
          // recurse through nested style objects
          styles[property] = _this2.prefix(value);
        } else {
          // add prefixes if needed
          if (_this2._requiresPrefix[property]) {
            styles[_this2.jsPrefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
            if (!_this2._keepUnprefixed) {
              delete styles[property];
            }
          }

          // resolve plugins
          plugins.forEach(function (plugin) {
            // generates a new plugin interface with current data
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: _this2._browserInfo,
              prefix: {
                js: _this2.jsPrefix,
                css: _this2.cssPrefix,
                keyframes: _this2.prefixedKeyframes
              },
              keepUnprefixed: _this2._keepUnprefixed,
              requiresPrefix: _this2._requiresPrefix
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });

      return styles;
    }

    /**
     * Returns a prefixed version of the style object using all vendor prefixes
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
     */
  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      return (0, _inlineStylePrefixAll2['default'])(styles);
    }
  }]);

  return Prefixer;
})();

exports['default'] = Prefixer;
module.exports = exports['default'];

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

function calc(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
    return _defineProperty({}, property, value.replace(/calc\(/g, css + 'calc(') + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};

function cursor(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return {
      cursor: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = {
  'flex': true,
  'inline-flex': true
};

function flex(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
    return {
      display: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
    };
  }
}

module.exports = exports['default'];

/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxIE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: 'flexbox',
  'inline-flex': 'inline-flexbox'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

var properties = Object.keys(alternativeProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxIE(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];

var properties = Object.keys(alternativeProps).concat(otherProps).reduce(function (result, prop) {
  result[prop] = true;
  return result;
}, {});

function flexboxOld(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var styles = _ref2.styles;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: css + alternativeValues[value] + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
}

module.exports = exports['default'];

/***/ }),
/* 539 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var _ref2$browserInfo = _ref2.browserInfo;
  var browser = _ref2$browserInfo.browser;
  var version = _ref2$browserInfo.version;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  if (typeof value === 'string' && value.match(values) !== null && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties[property] && values[value]) {
    return _defineProperty({}, property, css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : ''));
  }
}

module.exports = exports['default'];

/***/ }),
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = transition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = __webpack_require__(48);

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = __webpack_require__(214);

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsUnprefixProperty = __webpack_require__(546);

var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);

var properties = { transition: true, transitionProperty: true };

function transition(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var requiresPrefix = _ref2.requiresPrefix;
  var keepUnprefixed = _ref2.keepUnprefixed;

  // also check for already prefixed transitions
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ret = (function () {
      var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _utilsCamelToDashCase2['default'])(prop);
      });

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (property) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(property) > -1) {
            multipleValues[index] = val.replace(property, css + property) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });

      return {
        v: _defineProperty({}, property, multipleValues.join(','))
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

module.exports = exports['default'];

/***/ }),
/* 542 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 52, "userSelect": 52, "fontKerning": 32, "textEmphasisPosition": 52, "textEmphasis": 52, "textEmphasisStyle": 52, "textEmphasisColor": 52, "boxDecorationBreak": 52, "clipPath": 52, "maskImage": 52, "maskMode": 52, "maskRepeat": 52, "maskPosition": 52, "maskClip": 52, "maskOrigin": 52, "maskSize": 52, "maskComposite": 52, "mask": 52, "maskBorderSource": 52, "maskBorderMode": 52, "maskBorderSlice": 52, "maskBorderWidth": 52, "maskBorderOutset": 52, "maskBorderRepeat": 52, "maskBorder": 52, "maskType": 52, "textDecorationStyle": 52, "textDecorationSkip": 52, "textDecorationLine": 52, "textDecorationColor": 52, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 52, "breakBefore": 52, "breakInside": 52, "columnCount": 52, "columnFill": 52, "columnGap": 52, "columnRule": 52, "columnRuleColor": 52, "columnRuleStyle": 52, "columnRuleWidth": 52, "columns": 52, "columnSpan": 52, "columnWidth": 52 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 9.1, "userSelect": 9.1, "backdropFilter": 9.1, "fontKerning": 9.1, "scrollSnapType": 9.1, "scrollSnapPointsX": 9.1, "scrollSnapPointsY": 9.1, "scrollSnapDestination": 9.1, "scrollSnapCoordinate": 9.1, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 9.1, "clipPath": 9.1, "maskImage": 9.1, "maskMode": 9.1, "maskRepeat": 9.1, "maskPosition": 9.1, "maskClip": 9.1, "maskOrigin": 9.1, "maskSize": 9.1, "maskComposite": 9.1, "mask": 9.1, "maskBorderSource": 9.1, "maskBorderMode": 9.1, "maskBorderSlice": 9.1, "maskBorderWidth": 9.1, "maskBorderOutset": 9.1, "maskBorderRepeat": 9.1, "maskBorder": 9.1, "maskType": 9.1, "textDecorationStyle": 9.1, "textDecorationSkip": 9.1, "textDecorationLine": 9.1, "textDecorationColor": 9.1, "shapeImageThreshold": 9.1, "shapeImageMargin": 9.1, "shapeImageOutside": 9.1, "filter": 9, "hyphens": 9.1, "flowInto": 9.1, "flowFrom": 9.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 9.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 47, "userSelect": 47, "boxSizing": 28, "textAlignLast": 47, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 47, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 37, "userSelect": 37, "fontKerning": 19, "textEmphasisPosition": 37, "textEmphasis": 37, "textEmphasisStyle": 37, "textEmphasisColor": 37, "boxDecorationBreak": 37, "clipPath": 37, "maskImage": 37, "maskMode": 37, "maskRepeat": 37, "maskPosition": 37, "maskClip": 37, "maskOrigin": 37, "maskSize": 37, "maskComposite": 37, "mask": 37, "maskBorderSource": 37, "maskBorderMode": 37, "maskBorderSlice": 37, "maskBorderWidth": 37, "maskBorderOutset": 37, "maskBorderRepeat": 37, "maskBorder": 37, "maskType": 37, "filter": 37, "fontFeatureSettings": 37, "breakAfter": 37, "breakBefore": 37, "breakInside": 37, "columnCount": 37, "columnFill": 37, "columnGap": 37, "columnRule": 37, "columnRuleColor": 37, "columnRuleStyle": 37, "columnRuleWidth": 37, "columns": 37, "columnSpan": 37, "columnWidth": 37 }, "ie": { "gridTemplateRows": 11, "breakInside": 11, "transformOriginY": 9, "gridRowStart": 11, "gridColumn": 11, "regionFragment": 11, "breakBefore": 11, "userSelect": 11, "gridColumnEnd": 11, "gridRowEnd": 11, "gridTemplateColumns": 11, "gridColumnStart": 11, "gridArea": 11, "flexDirection": 10, "gridRowGap": 11, "gridTemplateAreas": 11, "gridAutoRows": 11, "gridRow": 11, "scrollSnapDestination": 11, "scrollSnapPointsY": 11, "touchAction": 10, "gridGap": 11, "gridColumnGap": 11, "wrapFlow": 11, "scrollSnapPointsX": 11, "flowFrom": 11, "transform": 9, "breakAfter": 11, "wrapMargin": 11, "scrollSnapCoordinate": 11, "flexWrap": 10, "scrollSnapType": 11, "flex": 10, "wrapThrough": 11, "gridAutoColumns": 11, "flexFlow": 10, "gridTemplate": 11, "hyphens": 11, "grid": 11, "transformOriginX": 9, "flowInto": 11, "transformOrigin": 9, "gridAutoFlow": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 14, "wrapFlow": 14, "wrapThrough": 14, "wrapMargin": 14, "scrollSnapType": 14, "scrollSnapPointsX": 14, "scrollSnapPointsY": 14, "scrollSnapDestination": 14, "scrollSnapCoordinate": 14, "hyphens": 14, "flowInto": 14, "flowFrom": 14, "breakBefore": 14, "breakAfter": 14, "breakInside": 14, "regionFragment": 14, "gridTemplateColumns": 14, "gridTemplateRows": 14, "gridTemplateAreas": 14, "gridTemplate": 14, "gridAutoColumns": 14, "gridAutoRows": 14, "gridAutoFlow": 14, "grid": 14, "gridRowStart": 14, "gridColumnStart": 14, "gridRowEnd": 14, "gridRow": 14, "gridColumn": 14, "gridColumnEnd": 14, "gridColumnGap": 14, "gridRowGap": 14, "gridArea": 14, "gridGap": 14 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9.3, "userSelect": 9.3, "backdropFilter": 9.3, "fontKerning": 9.3, "scrollSnapType": 9.3, "scrollSnapPointsX": 9.3, "scrollSnapPointsY": 9.3, "scrollSnapDestination": 9.3, "scrollSnapCoordinate": 9.3, "boxDecorationBreak": 9.3, "clipPath": 9.3, "maskImage": 9.3, "maskMode": 9.3, "maskRepeat": 9.3, "maskPosition": 9.3, "maskClip": 9.3, "maskOrigin": 9.3, "maskSize": 9.3, "maskComposite": 9.3, "mask": 9.3, "maskBorderSource": 9.3, "maskBorderMode": 9.3, "maskBorderSlice": 9.3, "maskBorderWidth": 9.3, "maskBorderOutset": 9.3, "maskBorderRepeat": 9.3, "maskBorder": 9.3, "maskType": 9.3, "textSizeAdjust": 9.3, "textDecorationStyle": 9.3, "textDecorationSkip": 9.3, "textDecorationLine": 9.3, "textDecorationColor": 9.3, "shapeImageThreshold": 9.3, "shapeImageMargin": 9.3, "shapeImageOutside": 9.3, "filter": 9, "hyphens": 9.3, "flowInto": 9.3, "flowFrom": 9.3, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9.3, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 47, "userSelect": 47, "fontKerning": 4.4, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_chr": { "appearance": 47, "userSelect": 47, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 47, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "textDecorationStyle": 47, "textDecorationSkip": 47, "textDecorationLine": 47, "textDecorationColor": 47, "filter": 47, "fontFeatureSettings": 47, "breakAfter": 47, "breakBefore": 47, "breakInside": 47, "columnCount": 47, "columnFill": 47, "columnGap": 47, "columnRule": 47, "columnRuleColor": 47, "columnRuleStyle": 47, "columnRuleWidth": 47, "columns": 47, "columnSpan": 47, "columnWidth": 47 }, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "flexWrap": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transformStyle": 9.9, "transformOriginZ": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "animationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };
module.exports = exports["default"];

/***/ }),
/* 543 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// leight polyfill for Object.assign


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (key) {
    return base[key] = extend[key];
  });
  return base;
};

module.exports = exports["default"];

/***/ }),
/* 544 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bowser = __webpack_require__(304);

var _bowser2 = _interopRequireDefault(_bowser);

var vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
};

var browsers = {
  chrome: [['chrome']],
  safari: [['safari']],
  firefox: [['firefox']],
  ie: [['msie']],
  edge: [['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'tablet']],
  android: [['android', 'mobile'], ['android', 'tablet']]
};

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */

exports['default'] = function (userAgent) {
  if (!userAgent) {
    return false;
  }

  var info = _bowser2['default']._detect(userAgent);

  Object.keys(vendorPrefixes).forEach(function (prefix) {
    vendorPrefixes[prefix].forEach(function (browser) {
      if (info[browser]) {
        info.prefix = {
          inline: prefix,
          css: '-' + prefix.toLowerCase() + '-'
        };
      }
    });
  });

  var name = '';
  Object.keys(browsers).forEach(function (browser) {
    browsers[browser].forEach(function (condition) {
      var match = 0;
      condition.forEach(function (single) {
        if (info[single]) {
          match += 1;
        }
      });
      if (condition.length === match) {
        name = browser;
      }
    });
  });

  info.browser = name;
  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  info.version = info.version ? parseFloat(info.version) : parseInt(parseFloat(info.osversion), 10);

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (info.browser === 'android' && info.chrome && info.version > 37) {
    info.browser = 'and_chr';
  }
  info.version = parseFloat(info.version);
  info.osversion = parseFloat(info.osversion);
  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (info.browser === 'android' && info.osversion < 5) {
    info.version = info.osversion;
  }

  return info;
};

module.exports = exports['default'];

/***/ }),
/* 545 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (_ref) {
  var browser = _ref.browser;
  var version = _ref.version;
  var prefix = _ref.prefix;

  var prefixedKeyframes = 'keyframes';

  if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
    prefixedKeyframes = prefix.css + prefixedKeyframes;
  }
  return prefixedKeyframes;
};

module.exports = exports['default'];

/***/ }),
/* 546 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (property) {
  var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
};

module.exports = exports['default'];

/***/ }),
/* 547 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(215),
    getRawTag = __webpack_require__(549),
    objectToString = __webpack_require__(550);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 548 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ }),
/* 549 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(215);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 550 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 551 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 552 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(547),
    isObjectLike = __webpack_require__(551);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 553 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(216);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 554 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(217),
    isSymbol = __webpack_require__(552);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 555 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license Minigrid v3.1.1 – minimal cascading grid layout http://alves.im/minigrid */
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Minigrid = factory();
  }

}(this, function(exports){
  'use strict';

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  var Minigrid = function(props) {
    var containerEle = props.container instanceof Node ? (
      props.container
    ) : (
      document.querySelector(props.container)
    );

    var itemsNodeList = props.item instanceof NodeList ?
      props.item : containerEle.querySelectorAll(props.item);

    this.props = extend(props, {
      container: containerEle,
      nodeList: itemsNodeList
    });

  }

  Minigrid.prototype.mount = function() {
    if (!this.props.container) {
      return false;
    }
    if (!this.props.nodeList || this.props.nodeList.length === 0) {
      return false;
    }
    var gutter = (
      typeof this.props.gutter === 'number' &&
      isFinite(this.props.gutter) &&
      Math.floor(this.props.gutter) === this.props.gutter
    ) ? this.props.gutter : 0;

    var done = this.props.done;
    var containerEle = this.props.container;
    var itemsNodeList = this.props.nodeList;

    containerEle.style.width = '';

    var forEach = Array.prototype.forEach;
    var containerWidth = containerEle.getBoundingClientRect().width;
    var firstChildWidth = itemsNodeList[0].getBoundingClientRect().width + gutter;
    var cols = Math.max(Math.floor((containerWidth - gutter) / firstChildWidth), 1);
    var count = 0;

    containerWidth = (firstChildWidth * cols + gutter) + 'px';
    containerEle.style.width = containerWidth;
    containerEle.style.position = 'relative';

    var itemsGutter = [];
    var itemsPosX = [];

    for ( var g = 0 ; g < cols ; ++g ) {
      itemsPosX.push(g * firstChildWidth + gutter);
      itemsGutter.push(gutter);
    }

    // RTL support
    if (this.props.rtl) {
      itemsPosX.reverse();
    }

    forEach.call(itemsNodeList, function (item) {
      var itemIndex = itemsGutter
        .slice(0)
        .sort(function (a, b) {
          return a - b;
        })
        .shift();
      itemIndex = itemsGutter.indexOf(itemIndex);

      var posX = parseInt(itemsPosX[itemIndex]);
      var posY = parseInt(itemsGutter[itemIndex]);

      item.style.position = 'absolute';
      item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
      item.style.transformStyle = 'preserve-3d';
      item.style.transform = 'translate3D(' + posX + 'px,' + posY + 'px, 0)';

      itemsGutter[itemIndex] += item.getBoundingClientRect().height + gutter;
      count = count + 1;

    });

		containerEle.style.display = '';

    var containerHeight = itemsGutter
      .slice(0)
      .sort(function (a, b) {
        return a - b;
      })
      .pop();

    containerEle.style.height = containerHeight + 'px';

    if (typeof done === 'function') {
      done(itemsNodeList);
    }
  }

  return Minigrid;

}));


/***/ }),
/* 556 */,
/* 557 */,
/* 558 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendImportantToEachValue;

var _appendPxIfNeeded = __webpack_require__(220);

var _appendPxIfNeeded2 = _interopRequireDefault(_appendPxIfNeeded);

var _mapObject = __webpack_require__(225);

var _mapObject2 = _interopRequireDefault(_mapObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendImportantToEachValue(style) {
  return (0, _mapObject2.default)(style, function (result, key) {
    return (0, _appendPxIfNeeded2.default)(key, style[key]) + ' !important';
  });
}
module.exports = exports['default'];

/***/ }),
/* 559 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var _camelCaseRegex = /([a-z])?([A-Z])/g;

var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
  return (p1 || '') + '-' + p2.toLowerCase();
};

var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
  return s.replace(_camelCaseRegex, _camelCaseReplacer);
};

var camelCasePropsToDashCase = function camelCasePropsToDashCase(prefixedStyle) {
  // Since prefix is expected to work on inline style objects, we must
  // translate the keys to dash case for rendering to CSS.
  return Object.keys(prefixedStyle).reduce(function (result, key) {
    var dashCaseKey = _camelCaseToDashCase(key);

    // Fix IE vendor prefix
    if (/^ms-/.test(dashCaseKey)) {
      dashCaseKey = '-' + dashCaseKey;
    }

    result[dashCaseKey] = prefixedStyle[key];
    return result;
  }, {});
};

exports.default = camelCasePropsToDashCase;
module.exports = exports['default'];

/***/ }),
/* 560 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _enhancer = __webpack_require__(221);

var _enhancer2 = _interopRequireDefault(_enhancer);

var _styleKeeper = __webpack_require__(144);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

var _styleSheet = __webpack_require__(561);

var _styleSheet2 = _interopRequireDefault(_styleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _getStyleKeeper(instance) {
  if (!instance._radiumStyleKeeper) {
    var userAgent = instance.props.radiumConfig && instance.props.radiumConfig.userAgent || instance.context._radiumConfig && instance.context._radiumConfig.userAgent;
    instance._radiumStyleKeeper = new _styleKeeper2.default(userAgent);
  }

  return instance._radiumStyleKeeper;
}

var StyleRoot = function (_Component) {
  _inherits(StyleRoot, _Component);

  function StyleRoot() {
    _classCallCheck(this, StyleRoot);

    var _this = _possibleConstructorReturn(this, _Component.apply(this, arguments));

    _getStyleKeeper(_this);
    return _this;
  }

  StyleRoot.prototype.getChildContext = function getChildContext() {
    return { _radiumStyleKeeper: _getStyleKeeper(this) };
  };

  StyleRoot.prototype.render = function render() {
    /* eslint-disable no-unused-vars */
    // Pass down all props except config to the rendered div.
    var _props = this.props;
    var radiumConfig = _props.radiumConfig;

    var otherProps = _objectWithoutProperties(_props, ['radiumConfig']);
    /* eslint-enable no-unused-vars */

    return _react2.default.createElement(
      'div',
      otherProps,
      this.props.children,
      _react2.default.createElement(_styleSheet2.default, null)
    );
  };

  return StyleRoot;
}(_react.Component);

StyleRoot.contextTypes = {
  _radiumConfig: _react.PropTypes.object,
  _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
};

StyleRoot.childContextTypes = {
  _radiumStyleKeeper: _react.PropTypes.instanceOf(_styleKeeper2.default)
};

StyleRoot = (0, _enhancer2.default)(StyleRoot);

exports.default = StyleRoot;
module.exports = exports['default'];

/***/ }),
/* 561 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _styleKeeper = __webpack_require__(144);

var _styleKeeper2 = _interopRequireDefault(_styleKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleSheet = (_temp = _class = function (_Component) {
  _inherits(StyleSheet, _Component);

  function StyleSheet() {
    _classCallCheck(this, StyleSheet);

    var _this = _possibleConstructorReturn(this, _Component.apply(this, arguments));

    _this.state = _this._getCSSState();

    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  StyleSheet.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this._subscription = this.context._radiumStyleKeeper.subscribe(this._onChange);
    this._onChange();
  };

  StyleSheet.prototype.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;
    if (this._subscription) {
      this._subscription.remove();
    }
  };

  StyleSheet.prototype._getCSSState = function _getCSSState() {
    return { css: this.context._radiumStyleKeeper.getCSS() };
  };

  StyleSheet.prototype._onChange = function _onChange() {
    var _this2 = this;

    setTimeout(function () {
      _this2._isMounted && _this2.setState(_this2._getCSSState());
    }, 0);
  };

  StyleSheet.prototype.render = function render() {
    return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: this.state.css } });
  };

  return StyleSheet;
}(_react.Component), _class.contextTypes = {
  _radiumStyleKeeper: _react2.default.PropTypes.instanceOf(_styleKeeper2.default)
}, _temp);
exports.default = StyleSheet;
module.exports = exports['default'];

/***/ }),
/* 562 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _cssRuleSetToString = __webpack_require__(141);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = _react2.default.createClass({
  displayName: 'Style',

  propTypes: {
    radiumConfig: _react.PropTypes.object,
    rules: _react.PropTypes.object,
    scopeSelector: _react.PropTypes.string
  },

  contextTypes: {
    _radiumConfig: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      scopeSelector: ''
    };
  },
  _buildStyles: function _buildStyles(styles) {
    var _this = this;

    var userAgent = this.props.radiumConfig && this.props.radiumConfig.userAgent || this.context && this.context._radiumConfig && this.context._radiumConfig.userAgent;

    var scopeSelector = this.props.scopeSelector;

    var rootRules = Object.keys(styles).reduce(function (accumulator, selector) {
      if (_typeof(styles[selector]) !== 'object') {
        accumulator[selector] = styles[selector];
      }

      return accumulator;
    }, {});
    var rootStyles = Object.keys(rootRules).length ? (0, _cssRuleSetToString2.default)(scopeSelector || '', rootRules, userAgent) : '';

    return rootStyles + Object.keys(styles).reduce(function (accumulator, selector) {
      var rules = styles[selector];

      if (selector === 'mediaQueries') {
        accumulator += _this._buildMediaQueryString(rules);
      } else if (_typeof(styles[selector]) === 'object') {
        var completeSelector = scopeSelector ? selector.split(',').map(function (part) {
          return scopeSelector + ' ' + part.trim();
        }).join(',') : selector;

        accumulator += (0, _cssRuleSetToString2.default)(completeSelector, rules, userAgent);
      }

      return accumulator;
    }, '');
  },
  _buildMediaQueryString: function _buildMediaQueryString(stylesByMediaQuery) {
    var _this2 = this;

    var mediaQueryString = '';

    Object.keys(stylesByMediaQuery).forEach(function (query) {
      mediaQueryString += '@media ' + query + '{' + _this2._buildStyles(stylesByMediaQuery[query]) + '}';
    });

    return mediaQueryString;
  },
  render: function render() {
    if (!this.props.rules) {
      return null;
    }

    var styles = this._buildStyles(this.props.rules);

    return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
  }
});

exports.default = Style;
module.exports = exports['default'];

/***/ }),
/* 563 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyframes;

var _cssRuleSetToString = __webpack_require__(141);

var _cssRuleSetToString2 = _interopRequireDefault(_cssRuleSetToString);

var _hash = __webpack_require__(224);

var _hash2 = _interopRequireDefault(_hash);

var _prefixer = __webpack_require__(143);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyframes(keyframeRules, name) {
  return {
    __radiumKeyframes: true,
    __process: function __process(userAgent) {
      var keyframesPrefixed = (0, _prefixer.getPrefixedKeyframes)(userAgent);
      var rules = Object.keys(keyframeRules).map(function (percentage) {
        return (0, _cssRuleSetToString2.default)(percentage, keyframeRules[percentage], userAgent);
      }).join('\n');
      var animationName = (name ? name + '-' : '') + 'radium-animation-' + (0, _hash2.default)(rules);
      var css = '@' + keyframesPrefixed + ' ' + animationName + ' {\n' + rules + '\n}\n';
      return { css: css, animationName: animationName };
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 564 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isNestedStyle = isNestedStyle;
exports.mergeStyles = mergeStyles;
function isNestedStyle(value) {
  // Don't merge objects overriding toString, since they should be converted
  // to string values.
  return value && value.constructor === Object && value.toString === Object.prototype.toString;
}

// Merge style objects. Deep merge plain object values.
function mergeStyles(styles) {
  var result = {};

  styles.forEach(function (style) {
    if (!style || (typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') {
      return;
    }

    if (Array.isArray(style)) {
      style = mergeStyles(style);
    }

    Object.keys(style).forEach(function (key) {
      // Simple case, nothing nested
      if (!isNestedStyle(style[key]) || !isNestedStyle(result[key])) {
        result[key] = style[key];
        return;
      }

      // If nested media, don't merge the nested styles, append a space to the
      // end (benign when converted to CSS). This way we don't end up merging
      // media queries that appear later in the chain with those that appear
      // earlier.
      if (key.indexOf('@media') === 0) {
        var newKey = key;
        while (true) {
          // eslint-disable-line no-constant-condition
          newKey += ' ';
          if (!result[newKey]) {
            result[newKey] = style[key];
            return;
          }
        }
      }

      // Merge all other nested styles recursively
      result[key] = mergeStyles([result[key], style[key]]);
    });
  });

  return result;
}

/***/ }),
/* 565 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  (function () {
    // Warn if you use longhand and shorthand properties in the same style
    // object.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

    var shorthandPropertyExpansions = {
      'background': ['backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundPositionX', 'backgroundPositionY', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'backgroundSize'],
      'border': ['borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth'],
      'borderImage': ['borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth'],
      'borderRadius': ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
      'font': ['fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontWeight', 'lineHeight'],
      'listStyle': ['listStyleImage', 'listStylePosition', 'listStyleType'],
      'margin': ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
      'padding': ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
      'transition': ['transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction']
    };

    _checkProps = function checkProps(config) {
      var componentName = config.componentName;
      var style = config.style;

      if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object' || !style) {
        return;
      }

      var styleKeys = Object.keys(style);
      styleKeys.forEach(function (styleKey) {
        if (Array.isArray(shorthandPropertyExpansions[styleKey]) && shorthandPropertyExpansions[styleKey].some(function (sp) {
          return styleKeys.indexOf(sp) !== -1;
        })) {
          if (process.env.NODE_ENV !== 'production') {
            /* eslint-disable no-console */
            console.warn('Radium: property "' + styleKey + '" in style object', style, ': do not mix longhand and ' + 'shorthand properties in the same style object. Check the render ' + 'method of ' + componentName + '.', 'See https://github.com/FormidableLabs/radium/issues/95 for more ' + 'information.');
            /* eslint-enable no-console */
          }
        }
      });

      styleKeys.forEach(function (k) {
        return _checkProps(_extends({}, config, { style: style[k] }));
      });
      return;
    };
  })();
}

exports.default = _checkProps;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 566 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyframesPlugin;
function keyframesPlugin(_ref // eslint-disable-line no-shadow
) {
  var addCSS = _ref.addCSS;
  var config = _ref.config;
  var style = _ref.style;

  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (key === 'animationName' && value && value.__radiumKeyframes) {
      var keyframesValue = value;

      var _keyframesValue$__pro = keyframesValue.__process(config.userAgent);

      var animationName = _keyframesValue$__pro.animationName;
      var css = _keyframesValue$__pro.css;

      addCSS(css);
      value = animationName;
    }

    newStyleInProgress[key] = value;
    return newStyleInProgress;
  }, {});
  return { style: newStyle };
}
module.exports = exports['default'];

/***/ }),
/* 567 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


// Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
// Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
var mergeStyleArrayPlugin = function mergeStyleArrayPlugin(_ref) {
  var style = _ref.style;
  var mergeStyles = _ref.mergeStyles;
  // eslint-disable-line no-shadow
  var newStyle = Array.isArray(style) ? mergeStyles(style) : style;
  return { style: newStyle };
};

exports.default = mergeStyleArrayPlugin;
module.exports = exports['default'];

/***/ }),
/* 568 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var _callbacks = [];
var _mouseUpListenerIsActive = false;

function _handleMouseUp() {
  _callbacks.forEach(function (callback) {
    callback();
  });
}

var subscribe = function subscribe(callback) {
  if (_callbacks.indexOf(callback) === -1) {
    _callbacks.push(callback);
  }

  if (!_mouseUpListenerIsActive) {
    window.addEventListener('mouseup', _handleMouseUp);
    _mouseUpListenerIsActive = true;
  }

  return {
    remove: function remove() {
      var index = _callbacks.indexOf(callback);
      _callbacks.splice(index, 1);

      if (_callbacks.length === 0 && _mouseUpListenerIsActive) {
        window.removeEventListener('mouseup', _handleMouseUp);
        _mouseUpListenerIsActive = false;
      }
    }
  };
};

exports.default = {
  subscribe: subscribe,
  __triggerForTests: _handleMouseUp
};
module.exports = exports['default'];

/***/ }),
/* 569 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixPlugin;

var _prefixer = __webpack_require__(143);

function prefixPlugin(_ref // eslint-disable-line no-shadow
) {
  var config = _ref.config;
  var style = _ref.style;

  var newStyle = (0, _prefixer.getPrefixedStyle)(style, config.userAgent);
  return { style: newStyle };
}
module.exports = exports['default'];

/***/ }),
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeNestedStyles;
function removeNestedStyles(_ref) {
  var isNestedStyle = _ref.isNestedStyle;
  var style = _ref.style;
  // eslint-disable-line no-shadow
  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (!isNestedStyle(value)) {
      newStyleInProgress[key] = value;
    }
    return newStyleInProgress;
  }, {});

  return {
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mouseUpListener = __webpack_require__(568);

var _mouseUpListener2 = _interopRequireDefault(_mouseUpListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isInteractiveStyleField = function _isInteractiveStyleField(styleFieldName) {
  return styleFieldName === ':hover' || styleFieldName === ':active' || styleFieldName === ':focus';
};

var resolveInteractionStyles = function resolveInteractionStyles(config) {
  var ExecutionEnvironment = config.ExecutionEnvironment;
  var getComponentField = config.getComponentField;
  var getState = config.getState;
  var mergeStyles = config.mergeStyles;
  var props = config.props;
  var setState = config.setState;
  var style = config.style;


  var newComponentFields = {};
  var newProps = {};

  // Only add handlers if necessary
  if (style[':hover']) {
    (function () {
      // Always call the existing handler if one is already defined.
      // This code, and the very similar ones below, could be abstracted a bit
      // more, but it hurts readability IMO.
      var existingOnMouseEnter = props.onMouseEnter;
      newProps.onMouseEnter = function (e) {
        existingOnMouseEnter && existingOnMouseEnter(e);
        setState(':hover', true);
      };

      var existingOnMouseLeave = props.onMouseLeave;
      newProps.onMouseLeave = function (e) {
        existingOnMouseLeave && existingOnMouseLeave(e);
        setState(':hover', false);
      };
    })();
  }

  if (style[':active']) {
    (function () {
      var existingOnMouseDown = props.onMouseDown;
      newProps.onMouseDown = function (e) {
        existingOnMouseDown && existingOnMouseDown(e);
        newComponentFields._lastMouseDown = Date.now();
        setState(':active', 'viamousedown');
      };

      var existingOnKeyDown = props.onKeyDown;
      newProps.onKeyDown = function (e) {
        existingOnKeyDown && existingOnKeyDown(e);
        if (e.key === ' ' || e.key === 'Enter') {
          setState(':active', 'viakeydown');
        }
      };

      var existingOnKeyUp = props.onKeyUp;
      newProps.onKeyUp = function (e) {
        existingOnKeyUp && existingOnKeyUp(e);
        if (e.key === ' ' || e.key === 'Enter') {
          setState(':active', false);
        }
      };
    })();
  }

  if (style[':focus']) {
    (function () {
      var existingOnFocus = props.onFocus;
      newProps.onFocus = function (e) {
        existingOnFocus && existingOnFocus(e);
        setState(':focus', true);
      };

      var existingOnBlur = props.onBlur;
      newProps.onBlur = function (e) {
        existingOnBlur && existingOnBlur(e);
        setState(':focus', false);
      };
    })();
  }

  if (style[':active'] && !getComponentField('_radiumMouseUpListener') && ExecutionEnvironment.canUseEventListeners) {
    newComponentFields._radiumMouseUpListener = _mouseUpListener2.default.subscribe(function () {
      Object.keys(getComponentField('state')._radiumStyleState).forEach(function (key) {
        if (getState(':active', key) === 'viamousedown') {
          setState(':active', false, key);
        }
      });
    });
  }

  // Merge the styles in the order they were defined
  var interactionStyles = props.disabled ? [style[':disabled']] : Object.keys(style).filter(function (name) {
    return _isInteractiveStyleField(name) && getState(name);
  }).map(function (name) {
    return style[name];
  });

  var newStyle = mergeStyles([style].concat(interactionStyles));

  // Remove interactive styles
  newStyle = Object.keys(newStyle).reduce(function (styleWithoutInteractions, name) {
    if (!_isInteractiveStyleField(name) && name !== ':disabled') {
      styleWithoutInteractions[name] = newStyle[name];
    }
    return styleWithoutInteractions;
  }, {});

  return {
    componentFields: newComponentFields,
    props: newProps,
    style: newStyle
  };
};

exports.default = resolveInteractionStyles;
module.exports = exports['default'];

/***/ }),
/* 572 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = resolveMediaQueries;


var _windowMatchMedia = void 0;
function _getWindowMatchMedia(ExecutionEnvironment) {
  if (_windowMatchMedia === undefined) {
    _windowMatchMedia = !!ExecutionEnvironment.canUseDOM && !!window && !!window.matchMedia && function (mediaQueryString) {
      return window.matchMedia(mediaQueryString);
    } || null;
  }
  return _windowMatchMedia;
}

function _filterObject(obj, predicate) {
  return Object.keys(obj).filter(function (key) {
    return predicate(obj[key], key);
  }).reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

function _removeMediaQueries(style) {
  return Object.keys(style).reduce(function (styleWithoutMedia, key) {
    if (key.indexOf('@media') !== 0) {
      styleWithoutMedia[key] = style[key];
    }
    return styleWithoutMedia;
  }, {});
}

function _topLevelRulesToCSS(_ref) {
  var addCSS = _ref.addCSS;
  var appendImportantToEachValue = _ref.appendImportantToEachValue;
  var cssRuleSetToString = _ref.cssRuleSetToString;
  var hash = _ref.hash;
  var isNestedStyle = _ref.isNestedStyle;
  var style = _ref.style;
  var userAgent = _ref.userAgent;

  var className = '';
  Object.keys(style).filter(function (name) {
    return name.indexOf('@media') === 0;
  }).map(function (query) {
    var topLevelRules = appendImportantToEachValue(_filterObject(style[query], function (value) {
      return !isNestedStyle(value);
    }));

    if (!Object.keys(topLevelRules).length) {
      return;
    }

    var ruleCSS = cssRuleSetToString('', topLevelRules, userAgent);

    // CSS classes cannot start with a number
    var mediaQueryClassName = 'rmq-' + hash(query + ruleCSS);
    var css = query + '{ .' + mediaQueryClassName + ruleCSS + '}';

    addCSS(css);

    className += (className ? ' ' : '') + mediaQueryClassName;
  });
  return className;
}

function _subscribeToMediaQuery(_ref2) {
  var listener = _ref2.listener;
  var listenersByQuery = _ref2.listenersByQuery;
  var matchMedia = _ref2.matchMedia;
  var mediaQueryListsByQuery = _ref2.mediaQueryListsByQuery;
  var query = _ref2.query;

  query = query.replace('@media ', '');

  var mql = mediaQueryListsByQuery[query];
  if (!mql && matchMedia) {
    mediaQueryListsByQuery[query] = mql = matchMedia(query);
  }

  if (!listenersByQuery || !listenersByQuery[query]) {
    mql.addListener(listener);

    listenersByQuery[query] = {
      remove: function remove() {
        mql.removeListener(listener);
      }
    };
  }
  return mql;
}

function resolveMediaQueries(_ref3) {
  var ExecutionEnvironment = _ref3.ExecutionEnvironment;
  var addCSS = _ref3.addCSS;
  var appendImportantToEachValue = _ref3.appendImportantToEachValue;
  var config = _ref3.config;
  var cssRuleSetToString = _ref3.cssRuleSetToString;
  var getComponentField = _ref3.getComponentField;
  var getGlobalState = _ref3.getGlobalState;
  var hash = _ref3.hash;
  var isNestedStyle = _ref3.isNestedStyle;
  var mergeStyles = _ref3.mergeStyles;
  var props = _ref3.props;
  var setState = _ref3.setState;
  var style = _ref3.style;
  // eslint-disable-line no-shadow
  var newStyle = _removeMediaQueries(style);
  var mediaQueryClassNames = _topLevelRulesToCSS({
    addCSS: addCSS,
    appendImportantToEachValue: appendImportantToEachValue,
    cssRuleSetToString: cssRuleSetToString,
    hash: hash,
    isNestedStyle: isNestedStyle,
    style: style,
    userAgent: config.userAgent
  });

  var newProps = mediaQueryClassNames ? {
    className: mediaQueryClassNames + (props.className ? ' ' + props.className : '')
  } : null;

  var matchMedia = config.matchMedia || _getWindowMatchMedia(ExecutionEnvironment);

  if (!matchMedia) {
    return {
      props: newProps,
      style: newStyle
    };
  }

  var listenersByQuery = _extends({}, getComponentField('_radiumMediaQueryListenersByQuery'));
  var mediaQueryListsByQuery = getGlobalState('mediaQueryListsByQuery') || {};

  Object.keys(style).filter(function (name) {
    return name.indexOf('@media') === 0;
  }).map(function (query) {
    var nestedRules = _filterObject(style[query], isNestedStyle);

    if (!Object.keys(nestedRules).length) {
      return;
    }

    var mql = _subscribeToMediaQuery({
      listener: function listener() {
        return setState(query, mql.matches, '_all');
      },
      listenersByQuery: listenersByQuery,
      matchMedia: matchMedia,
      mediaQueryListsByQuery: mediaQueryListsByQuery,
      query: query
    });

    // Apply media query states
    if (mql.matches) {
      newStyle = mergeStyles([newStyle, nestedRules]);
    }
  });

  return {
    componentFields: {
      _radiumMediaQueryListenersByQuery: listenersByQuery
    },
    globalState: { mediaQueryListsByQuery: mediaQueryListsByQuery },
    props: newProps,
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = visited;
function visited(_ref) {
  var addCSS = _ref.addCSS;
  var appendImportantToEachValue = _ref.appendImportantToEachValue;
  var config = _ref.config;
  var cssRuleSetToString = _ref.cssRuleSetToString;
  var hash = _ref.hash;
  var props = _ref.props;
  var style = _ref.style;
  // eslint-disable-line no-shadow
  var className = props.className;

  var newStyle = Object.keys(style).reduce(function (newStyleInProgress, key) {
    var value = style[key];
    if (key === ':visited') {
      value = appendImportantToEachValue(value);
      var ruleCSS = cssRuleSetToString('', value, config.userAgent);
      var visitedClassName = 'rad-' + hash(ruleCSS);
      var css = '.' + visitedClassName + ':visited' + ruleCSS;

      addCSS(css);
      className = (className ? className + ' ' : '') + visitedClassName;
    } else {
      newStyleInProgress[key] = value;
    }

    return newStyleInProgress;
  }, {});

  return {
    props: className === props.className ? null : { className: className },
    style: newStyle
  };
}
module.exports = exports['default'];

/***/ }),
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = __webpack_require__(102);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];

/***/ }),
/* 658 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;

var _assertString = __webpack_require__(102);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(254);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),
/* 659 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ })
]),[296]);