webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(239), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(236);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(240);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(519);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(522);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(240);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(524)


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(487);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(159)('wks')
  , uid        = __webpack_require__(110)
  , Symbol     = __webpack_require__(29).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(29)
  , core      = __webpack_require__(15)
  , ctx       = __webpack_require__(54)
  , hide      = __webpack_require__(55)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushEvent = exports.eventConvertloopAsync = exports.eventConvertloop = exports.eventFacebook = exports.eventGoogleAnalytics = exports.eventGoogleEcommerce = exports.storeEvent = exports.runEvents = undefined;

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(493);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(89);

var _promise2 = _interopRequireDefault(_promise);

var _cookies = __webpack_require__(167);

var _cookies2 = _interopRequireDefault(_cookies);

var _fetch_wp = __webpack_require__(115);

var _fetch_wp2 = _interopRequireDefault(_fetch_wp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var runEvents = exports.runEvents = function runEvents() {
  var events = ['ga_event', 'ga_ecm_event', 'fb_event', 'cl_event'];

  events.forEach(function (eventName) {
    var dataStr = localStorage && localStorage.getItem(eventName);

    if (dataStr !== null) {
      var data = JSON.parse(dataStr);
      (0, _fetch_wp2['default'])('store_event', { title: eventName, data: data }).then(function () {
        return runEvent(eventName, data);
      }).then(function () {
        return flushEvent(eventName);
      });
    }
  });
};

var storeEvent = exports.storeEvent = function storeEvent(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var p = new _promise2['default'](function (resolve) {
    localStorage && localStorage.setItem(name, (0, _stringify2['default'])(options));
    return resolve({ name: name, options: options });
  });

  return p;
};

var eventGoogleEcommerce = exports.eventGoogleEcommerce = function eventGoogleEcommerce(_ref) {
  var customerId = _ref.customerId,
      revenue = _ref.revenue;

  var p = new _promise2['default'](function (resolve) {
    if (typeof ga === 'function') {
      ga('ecommerce:addTransaction', {
        revenue: revenue,
        id: customerId,
        currency: 'USD'
      });

      ga('ecommerce:send');

      return resolve();
    }
  });

  return p;
};

var eventGoogleAnalytics = exports.eventGoogleAnalytics = function eventGoogleAnalytics(data) {
  var category = data.category,
      action = data.action,
      label = data.label,
      _data$value = data.value,
      value = _data$value === undefined ? 0 : _data$value;


  var p = new _promise2['default'](function (resolve) {
    typeof ga === 'function' ? ga('send', 'event', category, action, label, value, {
      hitCallback: function hitCallback() {
        return resolve();
      }
    }) : console.log('ga error');
  });

  return p;
};

var eventFacebook = exports.eventFacebook = function eventFacebook(_ref2) {
  var _ref2$eventName = _ref2.eventName,
      eventName = _ref2$eventName === undefined ? 'Lead' : _ref2$eventName,
      _ref2$content = _ref2.content,
      content = _ref2$content === undefined ? {} : _ref2$content;

  var p = new _promise2['default'](function (resolve) {
    typeof fbq === 'function' ? fbq('track', eventName, content) : console.log('fb error');

    return resolve();
  });

  return p;
};

var eventConvertloop = exports.eventConvertloop = function eventConvertloop(_ref3) {
  var name = _ref3.name,
      _ref3$person = _ref3.person,
      person = _ref3$person === undefined ? {} : _ref3$person,
      _ref3$metadata = _ref3.metadata,
      metadata = _ref3$metadata === undefined ? {} : _ref3$metadata;

  var data = { name: name, country: person.country, person: (0, _extends3['default'])({}, person, { pid: _cookies2['default'].dp_pid }), metadata: metadata };
  var p = (0, _fetch_wp2['default'])('store_event', { title: 'cl_event', content: data }).then(function () {
    return (0, _fetch_wp2['default'])('convertloop_event', data);
  });
  return p;
};

var eventConvertloopAsync = exports.eventConvertloopAsync = function eventConvertloopAsync(_ref4) {
  var name = _ref4.name,
      _ref4$person = _ref4.person,
      person = _ref4$person === undefined ? {} : _ref4$person,
      _ref4$metadata = _ref4.metadata,
      metadata = _ref4$metadata === undefined ? {} : _ref4$metadata;

  var personWithPid = (0, _extends3['default'])({}, person, { pid: _cookies2['default'].dp_pid });
  var data = { name: name, metadata: metadata, person: personWithPid };

  var p = (0, _fetch_wp2['default'])('store_event', { title: 'cl_event', content: data }).then(function () {
    return (0, _fetch_wp2['default'])('convertloop_event', data);
  });

  return p;
};

var runEvent = function runEvent(eventName, data) {
  switch (eventName) {
    case 'ga_event':
      return eventGoogleAnalytics(data);
      break;
    case 'ga_ecm_event':
      return eventGoogleEcommerce(data);
      break;
    case 'fb_event':
      return eventFacebook(data);
      break;
    case 'cl_event':
      return eventConvertloop(data);
      break;
    default:
      return _promise2['default'].resolve();
  }
};

var flushEvent = exports.flushEvent = function flushEvent(name) {
  localStorage && localStorage.removeItem(name);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(48)
  , IE8_DOM_DEFINE = __webpack_require__(225)
  , toPrimitive    = __webpack_require__(155)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(41) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(69)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(507);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(89);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(49);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(153);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(37)
  , createDesc = __webpack_require__(86);
module.exports = __webpack_require__(41) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(156)
  , defined = __webpack_require__(108);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
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
/* 69 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(226)
  , enumBugKeys = __webpack_require__(160);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(236);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
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

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(508), __esModule: true };

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(108);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(496)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(163)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(495), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(37).f
  , has = __webpack_require__(71)
  , TAG = __webpack_require__(20)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(499);
var global        = __webpack_require__(29)
  , hide          = __webpack_require__(55)
  , Iterators     = __webpack_require__(81)
  , TO_STRING_TAG = __webpack_require__(20)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = __webpack_require__(117);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(250);

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__(556);

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__(557);

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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(254),
    now = __webpack_require__(561),
    toNumber = __webpack_require__(563);

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
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(157)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 110 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(48)
  , dPs         = __webpack_require__(498)
  , enumBugKeys = __webpack_require__(160)
  , IE_PROTO    = __webpack_require__(158)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(154)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(228).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(87)
  , TAG = __webpack_require__(20)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(54)
  , call        = __webpack_require__(231)
  , isArrayIter = __webpack_require__(232)
  , anObject    = __webpack_require__(48)
  , toLength    = __webpack_require__(109)
  , getIterFn   = __webpack_require__(165)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = fetchwp;

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fetchwp() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var endpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/wp-admin/admin-ajax.php';

  var reqData = _qs2['default'].stringify({ action: action, data: data });
  return _axios2['default'].post(endpoint, reqData);
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _assertString = __webpack_require__(117);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(str) {
  (0, _assertString2.default)(str);
  return str.length === 0;
}
module.exports = exports['default'];

/***/ }),
/* 117 */
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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeEventConvertLoop = exports.storeConvertLoop = undefined;

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _fetch_wp = __webpack_require__(115);

var _fetch_wp2 = _interopRequireDefault(_fetch_wp);

var _cookies = __webpack_require__(167);

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var storeConvertLoop = exports.storeConvertLoop = function storeConvertLoop(tags, contact) {
  var add_tags = typeof tags === 'string' ? tags.trim().split(',') : [];

  add_tags = add_tags.filter(function (tag) {
    return tag !== '';
  });
  var pid = _cookies2['default'].dp_pid;
  var data = (0, _extends3['default'])({}, contact, { add_tags: add_tags, pid: pid });
  var p = (0, _fetch_wp2['default'])('store_event', { title: 'cl_person', content: data }).then(function () {
    return (0, _fetch_wp2['default'])('convertloop_contact', data);
  });

  return p;
};

var storeEventConvertLoop = exports.storeEventConvertLoop = function storeEventConvertLoop(props, state) {
  var _state$contact = state.contact,
      email = _state$contact.email,
      country = _state$contact.country;

  var pid = _cookies2['default'].dp_pid;
  var data = { name: props.cl.event, country: country, person: { email: email, pid: pid } };
  return (0, _fetch_wp2['default'])('convertloop_event', data);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Modal = function (_React$Component) {
  (0, _inherits3['default'])(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Modal.__proto__ || (0, _getPrototypeOf2['default'])(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _this.handleEscKey = function (e) {
      if (e.keyCode == 27) _this.setState({ show: false });
    }, _this.close = function (e) {
      e.preventDefault();
      _this.setState({ show: false });
    }, _this.show = function () {
      _this.setState({ show: true });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var url = this.props.url;


      var iframeStyle = {
        height: window.innerHeight ? window.innerHeight : '100hv'
      };

      return _react2['default'].createElement(
        'div',
        { className: this.state.show ? 'modal modal--show' : 'modal' },
        _react2['default'].createElement(
          'a',
          { className: 'modal__close', href: '#', onClick: this.close },
          _react2['default'].createElement('i', { className: 'ion-close' })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'iframe-container', style: iframeStyle },
          this.state.show ? _react2['default'].createElement('iframe', {
            src: url + '?autoplay=1',
            frameBorder: '0',
            height: '315',
            width: '100%',
            allowFullScreen: true
          }) : ''
        )
      );
    }
  }]);
  return Modal;
}(_react2['default'].Component);

Modal.displayName = 'Modal';
exports['default'] = Modal;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

exports.fetchCountries = fetchCountries;
exports.stripeToken = stripeToken;
exports.stripeCharge = stripeCharge;
exports.storeConvertLoop = storeConvertLoop;
exports.storeEventConvertLoop = storeEventConvertLoop;
exports.storeInfusion = storeInfusion;

var _fetch_wp = __webpack_require__(115);

var _fetch_wp2 = _interopRequireDefault(_fetch_wp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fetchCountries() {
  return (0, _fetch_wp2['default'])('countries').then(function (res) {
    return Array.isArray(res.data) ? res.data : [];
  });
}

function stripeToken(state) {
  return (0, _fetch_wp2['default'])('stripe_token', state.stripe).then(function (res) {
    return res.data;
  });
}

function stripeCharge(state) {
  var contact = state.contact,
      currency = state.currency,
      amount = state.amount,
      donation_type = state.donation_type,
      _state$trial_period_d = state.trial_period_days,
      trial_period_days = _state$trial_period_d === undefined ? 0 : _state$trial_period_d,
      token = state.stripe.token;


  var data = (0, _extends3['default'])({}, contact, {
    currency: currency,
    amount: amount,
    donation_type: donation_type,
    trial_period_days: trial_period_days,
    stripe_token: token
  });

  return (0, _fetch_wp2['default'])('stripe_charge', data);
}

function storeConvertLoop(tags, contact) {
  var add_tags = typeof tags === 'string' ? tags.trim().split(',') : [];

  var data = (0, _extends3['default'])({}, contact, { add_tags: add_tags });
  var p = (0, _fetch_wp2['default'])('store_event', { title: 'cl_person', content: data }).then(function () {
    return (0, _fetch_wp2['default'])('convertloop_contact', data);
  });

  return p;
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
    name: 'Donation-' + state.donation_type,
    person: { email: email },
    country: country,
    metadata: metadata
  };

  return (0, _fetch_wp2['default'])('convertloop_event', event);
}

function storeInfusion(state) {
  var tags = '';
  if (state.donation_type === 'monthly') tags = ['870', '924'];
  if (state.donation_type === 'once') tags = ['868', '926'];
  var data = (0, _extends3['default'])({}, state.contact, { tags: tags });
  return (0, _fetch_wp2['default'])('infusion_contact', data);
}

/***/ }),
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
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(49)
  , document = __webpack_require__(29).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(49);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(87);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 157 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(159)('keys')
  , uid    = __webpack_require__(110);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(29)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 160 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 161 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 162 */
/***/ (function(module, exports) {



/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(111)
  , $export        = __webpack_require__(28)
  , redefine       = __webpack_require__(227)
  , hide           = __webpack_require__(55)
  , has            = __webpack_require__(71)
  , Iterators      = __webpack_require__(81)
  , $iterCreate    = __webpack_require__(497)
  , setToStringTag = __webpack_require__(90)
  , getPrototypeOf = __webpack_require__(229)
  , ITERATOR       = __webpack_require__(20)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(113)
  , ITERATOR  = __webpack_require__(20)('iterator')
  , Iterators = __webpack_require__(81);
module.exports = __webpack_require__(15).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(55);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var getCookies = function getCookies() {
  var cookies = {};

  document.cookie.split(';').forEach(function (l) {
    cookies[l.split('=')[0].trim()] = l.split('=')[1];
  });

  return cookies;
};

exports['default'] = getCookies();

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(20);

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(110)('meta')
  , isObject = __webpack_require__(49)
  , has      = __webpack_require__(71)
  , setDesc  = __webpack_require__(37).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(69)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(29)
  , core           = __webpack_require__(15)
  , LIBRARY        = __webpack_require__(111)
  , wksExt         = __webpack_require__(168)
  , defineProperty = __webpack_require__(37).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(525), __esModule: true };

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _amountBtns = __webpack_require__(575);

var _amountBtns2 = _interopRequireDefault(_amountBtns);

var _clean_inputs = __webpack_require__(258);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Amount = function (_Component) {
  (0, _inherits3['default'])(Amount, _Component);

  function Amount() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Amount);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Amount.__proto__ || (0, _getPrototypeOf2['default'])(Amount)).call.apply(_ref, [this].concat(args))), _this), _this.changeAmount = function (e, amount) {
      if (e) e.preventDefault();
      var el = _this.amountInput;
      if (amount === 5) el.focus();
      _this.props.onChange({ amount: amount });
    }, _this.handleAmount = function (e) {
      var val = e.currentTarget.value;
      var amount = (0, _clean_inputs.onlyNum)(val);
      _this.props.onChange({ amount: amount });
    }, _this.changeType = function (e, donation_type) {
      if (e) e.preventDefault();
      _this.props.onChange({ donation_type: donation_type });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Amount, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          texts = _props.texts,
          donation_type = _props.donation_type,
          amount = _props.amount,
          width = _props.width,
          show_titles = _props.show_titles;


      return _react2['default'].createElement(
        'div',
        { style: { width: width, float: 'left', padding: '1px' }, 'data-jsx': 589279508
        },
        show_titles && _react2['default'].createElement(
          'h5',
          {
            'data-jsx': 589279508
          },
          texts.step_amount_text
        ),
        _react2['default'].createElement(_amountBtns2['default'], {
          amount: amount,
          texts: texts,
          changeAmount: this.changeAmount
        }),
        _react2['default'].createElement(
          'div',
          { className: 'row', 'data-jsx': 589279508
          },
          _react2['default'].createElement(
            'div',
            { className: 'form-group form-group--addon col-5-l', 'data-jsx': 589279508
            },
            _react2['default'].createElement(
              'span',
              { className: 'form-group__addon', 'data-jsx': 589279508
              },
              'US$'
            ),
            _react2['default'].createElement('input', {
              ref: function ref(amountInput) {
                return _this2.amountInput = amountInput;
              },
              className: 'form-control',
              type: 'text',
              onChange: this.handleAmount,
              value: amount,
              'data-jsx': 589279508
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'form-group col-7-l', 'data-jsx': 589279508
            },
            _react2['default'].createElement(
              'a',
              {
                href: '#',
                onClick: function onClick(e) {
                  return _this2.changeType(e, 'monthly');
                },
                className: donation_type === 'monthly' ? 'donate_react__type donate_react__type--active' : 'donate_react__type ',
                'data-jsx': 589279508
              },
              texts.monthly
            ),
            _react2['default'].createElement(
              'a',
              {
                href: '#',
                onClick: function onClick(e) {
                  return _this2.changeType(e, 'once');
                },
                className: donation_type === 'once' ? 'donate_react__type donate_react__type--active' : 'donate_react__type ',
                'data-jsx': 589279508
              },
              texts.once
            )
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 589279508,
          css: 'h5[data-jsx="589279508"]{color:#3C515F;padding-bottom:20px}'
        })
      );
    }
  }]);
  return Amount;
}(_react.Component);

Amount.displayName = 'Amount';
Amount.defaultProps = {
  texts: {},
  amount: 30,
  show_titles: false,
  donation_type: 'monthly'
};


Amount.propTypes = {
  onChange: _propTypes2['default'].func.isRequired,
  width: _propTypes2['default'].string.isRequired,
  texts: _propTypes2['default'].object,
  donation_type: _propTypes2['default'].string,
  amount: _propTypes2['default'].number,
  show_titles: _propTypes2['default'].bool
};

exports['default'] = Amount;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _cardValidator = __webpack_require__(221);

var _cardValidator2 = _interopRequireDefault(_cardValidator);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cards = __webpack_require__(576);

var _cards2 = _interopRequireDefault(_cards);

var _clean_inputs = __webpack_require__(258);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CredritCard = function (_React$Component) {
  (0, _inherits3['default'])(CredritCard, _React$Component);

  function CredritCard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, CredritCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = CredritCard.__proto__ || (0, _getPrototypeOf2['default'])(CredritCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showPopover: false
    }, _this.getCardType = function (cardNum) {
      var isValid = _cardValidator2['default'].number(cardNum).card ? _cardValidator2['default'].number(cardNum).card.type : null;
      return isValid;
    }, _this.validateCard = function (card) {
      var number = _cardValidator2['default'].number(card).isValid;
      return _this.updateErrors({ number: number });
    }, _this.validateCvc = function (cvc) {
      var isValid = cvc.length >= 3;
      return _this.updateErrors({ cvc: isValid });
    }, _this.updateErrors = function (field) {
      return (0, _extends3['default'])({}, _this.props.errors, { stripe: field });
    }, _this.handleCard = function (e) {
      var val = e.currentTarget.value;
      var number = (0, _clean_inputs.onlyNum)(val);
      number = (0, _clean_inputs.maxLength)(number, 16);
      var errors = _this.validateCard(number);
      var card_type = _this.getCardType(number);
      var stripe = (0, _extends3['default'])({}, _this.props.stripe, { number: number, card_type: card_type });
      _this.props.onChange({ stripe: stripe, errors: errors });
    }, _this.handleExpiry = function (type, e) {
      var stripe = _this.props.stripe;

      var val = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
      val = (0, _clean_inputs.maxLength)(val, 2);
      var exp_month = stripe.exp_month;
      var exp_year = stripe.exp_year;
      if (type === 'exp_month') exp_month = val;
      if (type === 'exp_year') exp_year = val;
      var errors = _this.validateExpiry(exp_month, exp_year);
      stripe = (0, _extends3['default'])({}, stripe, { exp_month: exp_month, exp_year: exp_year });

      _this.props.onChange({ stripe: stripe, errors: errors });
    }, _this.validateExpiry = function (month, year) {
      var valid = _cardValidator2['default'].expirationDate({ month: month, year: year });
      var exp_month = valid.isValid;
      var exp_year = valid.isValid;
      return _this.updateErrors({ exp_month: exp_month, exp_year: exp_year });
    }, _this.handleCvc = function (e) {
      var stripe = _this.props.stripe;

      var cvc = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
      cvc = (0, _clean_inputs.maxLength)(cvc, 4);
      stripe = (0, _extends3['default'])({}, stripe, { cvc: cvc });
      var errors = _this.validateCvc(cvc);
      _this.props.onChange({ stripe: stripe, errors: errors });
    }, _this.showErr = function (field) {
      if (_this.props.errors.stripe) {
        return _this.props.errors.stripe[field] === false ? 'form-group__error' : 'hidden';
      }

      return '';
    }, _this.inputErrStyle = function (field) {
      if (_this.props.errors.stripe) {
        return _this.props.errors.stripe[field] === false ? 'form-group--error' : '';
      }

      return '';
    }, _this.validateAll = function (e) {
      if (e) e.preventDefault();
      var stripe = _this.props.stripe;

      var number = _this.validateCard(stripe.number);
      var exp_month = _this.validateExpiry(stripe.exp_month, stripe.exp_year);
      var cvc = _this.validateCvc(stripe.cvc);

      var errors = (0, _extends3['default'])({}, _this.props.errors, {
        stripe: (0, _extends3['default'])({}, number.stripe, exp_month.stripe, cvc.stripe)
      });

      _this.props.onChange({ errors: errors });

      return errors;
    }, _this.togglePopover = function () {
      _this.setState({ showPopover: !_this.state.showPopover });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(CredritCard, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          texts = _props.texts,
          stripe = _props.stripe;


      return _react2['default'].createElement(
        'div',
        {
          className: 'donate_react__creditcard',
          style: { width: this.props.width, float: 'left', padding: '1px' },
          'data-jsx': 2335406473
        },
        this.props.show_titles && _react2['default'].createElement(
          'h5',
          {
            'data-jsx': 2335406473
          },
          texts.step_payment_text
        ),
        _react2['default'].createElement(_cards2['default'], this.props),
        _react2['default'].createElement(
          'div',
          { className: 'form-group', 'data-jsx': 2335406473
          },
          _react2['default'].createElement('input', {
            type: 'text',
            placeholder: texts.placeholder_credit_card,
            className: 'form-control ' + this.inputErrStyle('number'),
            onChange: this.handleCard,
            value: stripe.number,
            'data-jsx': 2335406473
          }),
          _react2['default'].createElement(
            'span',
            { className: this.showErr('number'), 'data-jsx': 2335406473
            },
            texts.validation_card
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row donate_react__creditcard__row', 'data-jsx': 2335406473
          },
          _react2['default'].createElement(
            'div',
            { className: 'form-group col-4-l col-4', 'data-jsx': 2335406473
            },
            _react2['default'].createElement('input', {
              type: 'text',
              placeholder: texts.placeholder_month,
              className: 'form-control',
              onChange: function onChange(e) {
                return _this2.handleExpiry('exp_month', e);
              },
              value: stripe.exp_month,
              'data-jsx': 2335406473
            }),
            _react2['default'].createElement(
              'span',
              { className: this.showErr('exp_month'), 'data-jsx': 2335406473
              },
              texts.validation_month
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'form-group col-4-l col-4', 'data-jsx': 2335406473
            },
            _react2['default'].createElement('input', {
              type: 'text',
              placeholder: texts.placeholder_year,
              className: 'form-control',
              onChange: function onChange(e) {
                return _this2.handleExpiry('exp_year', e);
              },
              value: stripe.exp_year,
              'data-jsx': 2335406473
            }),
            _react2['default'].createElement(
              'span',
              { className: this.showErr('exp_year'), 'data-jsx': 2335406473
              },
              texts.validation_year
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'form-group col-4-l col-4', 'data-jsx': 2335406473
            },
            _react2['default'].createElement('input', {
              type: 'text',
              placeholder: texts.placeholder_cvc,
              className: 'form-control',
              onChange: this.handleCvc,
              value: stripe.cvc,
              'data-jsx': 2335406473
            }),
            _react2['default'].createElement(
              'span',
              {
                className: 'cvc-help',
                onClick: this.togglePopover,
                'data-jsx': 2335406473
              },
              _react2['default'].createElement('i', { className: 'ion-help', 'data-jsx': 2335406473
              })
            ),
            _react2['default'].createElement(
              'span',
              { className: this.showErr('cvc'), 'data-jsx': 2335406473
              },
              texts.validation_cvc
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            style: this.state.showPopover ? {
              background: '#fff',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.26)',
              borderRadius: '2px',
              textAlign: 'center',
              display: 'block',
              margin: '15px 0',
              position: 'relative',
              zIndex: '100'
            } : { display: 'none' },
            'data-jsx': 2335406473
          },
          _react2['default'].createElement(
            'a',
            {
              href: '#',
              className: 'cvc-close',
              onClick: this.togglePopover,
              'data-jsx': 2335406473
            },
            _react2['default'].createElement('i', { className: 'ion-close', 'data-jsx': 2335406473
            })
          ),
          _react2['default'].createElement(
            'span',
            {
              className: 'cvc-explain',
              'data-jsx': 2335406473
            },
            texts.explain_cvc
          ),
          _react2['default'].createElement('img', {
            width: '60px',
            src: texts.template_uri + '/public/img/cvc.png',
            alt: '',
            'data-jsx': 2335406473
          })
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 2335406473,
          css: 'h5[data-jsx="2335406473"]{color:#3C515F;padding-bottom:20px}.cvc-help[data-jsx="2335406473"]{display:block;background:#3C515F;width:20px;height:20px;borderRadius:20px;color:#fff;-webkit-textAlign:center;textAlign:center;position:absolute;top:12px;right:25px;cursor:pointer}.cvc-explain[data-jsx="2335406473"]{display:block;color:#3C515F;padding:10px;fontSize:14px}.cvc-close[data-jsx="2335406473"]{display:block;position:absolute;top:2px;right:2px;width:15px;height:15px;color:red;cursor:pointer}'
        })
      );
    }
  }]);
  return CredritCard;
}(_react2['default'].Component);

CredritCard.displayName = 'CredritCard';
CredritCard.defaultProps = {
  texts: {},
  stripe: {},
  errors: {}
};


CredritCard.propTypes = {
  stripe: _propTypes2['default'].object.isRequired,
  errors: _propTypes2['default'].object.isRequired,
  texts: _propTypes2['default'].object.isRequired,
  onChange: _propTypes2['default'].func.isRequired,
  show_titles: _propTypes2['default'].string.isRequired,
  width: _propTypes2['default'].string.isRequired
};

exports['default'] = CredritCard;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(18);

var _extends5 = _interopRequireDefault(_extends4);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmail = __webpack_require__(92);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isEmpty = __webpack_require__(116);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Contact = function (_Component) {
  (0, _inherits3['default'])(Contact, _Component);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Contact.__proto__ || (0, _getPrototypeOf2['default'])(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.validate = function (field) {
      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var valid = !(0, _isEmpty2['default'])(val);
      if (field === 'email') valid = (0, _isEmail2['default'])(val);
      var contact = (0, _extends5['default'])({}, _this.props.errors.contact, (0, _defineProperty3['default'])({}, field, valid));
      return (0, _extends5['default'])({}, _this.props.errors, { contact: contact });
    }, _this.handleChange = function (field, e) {
      var val = e.currentTarget.value;
      var errors = _this.validate(field, val);

      _this.props.onChange({
        contact: (0, _extends5['default'])({}, _this.props.contact, (0, _defineProperty3['default'])({}, field, val)),
        errors: errors
      });
    }, _this.showErr = function (field) {
      var err = _this.props.errors.contact[field] === false ? 'form-group__error' : 'hidden';

      return err;
    }, _this.inputErrStyle = function (field) {
      var err = _this.props.errors.contact[field] === false ? 'form-group--error' : '';
      return err;
    }, _this.validateAll = function () {
      var _this$props = _this.props,
          contact = _this$props.contact,
          texts = _this$props.texts;

      var name = _this.validate('name', contact.name);
      var email = _this.validate('email', contact.email);
      var country = contact.country || texts.country;
      var countryValidation = _this.validate('country', country);

      var errors = (0, _extends5['default'])({}, _this.props.errors, {
        contact: (0, _extends5['default'])({}, name.contact, email.contact, countryValidation.contact)
      });

      _this.props.onChange({ errors: errors });
      return errors;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Contact, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          texts = _props.texts,
          contact = _props.contact;


      return _react2['default'].createElement(
        'div',
        { style: { width: this.props.width, float: 'left', padding: '1px' } },
        this.props.show_titles ? _react2['default'].createElement(
          'h5',
          { style: { color: '#3C515F', paddingBottom: '20px' } },
          texts.step_contact_text
        ) : '',
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'form-group col-12-l' },
            _react2['default'].createElement('input', {
              type: 'text',
              className: 'form-control ' + this.inputErrStyle('name'),
              placeholder: texts.placeholder_name,
              onChange: this.handleChange.bind(null, 'name'),
              value: contact.name
            }),
            _react2['default'].createElement(
              'span',
              { className: this.showErr('name') },
              texts.validation_name
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: this.props.inline ? 'form-group col-6-l' : 'form-group col-12-l' },
            _react2['default'].createElement('input', {
              type: 'text',
              className: 'form-control ' + this.inputErrStyle('email'),
              placeholder: texts.placeholder_email,
              onChange: this.handleChange.bind(null, 'email'),
              value: contact.email
            }),
            _react2['default'].createElement(
              'span',
              { className: this.showErr('email') },
              texts.validation_email
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: this.props.inline ? 'form-group col-6-l' : 'form-group col-12-l' },
            _react2['default'].createElement(
              'select',
              {
                type: 'text',
                className: 'form-control',
                placeholder: texts.placeholder_country,
                onChange: this.handleChange.bind(null, 'country'),
                value: contact.country || texts.country
              },
              this.props.countries.map(function (country, i) {
                return _react2['default'].createElement(
                  'option',
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
}(_react.Component);

Contact.displayName = 'Contact';
Contact.defaultProps = {
  contact: {},
  countries: [],
  errors: { contact: {} },
  texts: {},
  inline: false
};


Contact.propTypes = {
  countries: _propTypes2['default'].array,
  errors: _propTypes2['default'].object,
  texts: _propTypes2['default'].object,
  contact: _propTypes2['default'].object,
  width: _propTypes2['default'].string,
  show_titles: _propTypes2['default'].string,
  inline: _propTypes2['default'].bool,
  onChange: _propTypes2['default'].func.isRequired
};

exports['default'] = Contact;

/***/ }),
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
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
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(41) && !__webpack_require__(69)(function(){
  return Object.defineProperty(__webpack_require__(154)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(71)
  , toIObject    = __webpack_require__(56)
  , arrayIndexOf = __webpack_require__(491)(false)
  , IE_PROTO     = __webpack_require__(158)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(55);

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29).document && document.documentElement;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(71)
  , toObject    = __webpack_require__(79)
  , IE_PROTO    = __webpack_require__(158)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(48);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(81)
  , ITERATOR   = __webpack_require__(20)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(54)
  , invoke             = __webpack_require__(503)
  , html               = __webpack_require__(228)
  , cel                = __webpack_require__(154)
  , global             = __webpack_require__(29)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(87)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(29)
  , core        = __webpack_require__(15)
  , dP          = __webpack_require__(37)
  , DESCRIPTORS = __webpack_require__(41)
  , SPECIES     = __webpack_require__(20)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(20)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(237), __esModule: true };

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(506);
var $Object = __webpack_require__(15).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(28)
  , core    = __webpack_require__(15)
  , fails   = __webpack_require__(69);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(510);
module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(511);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(512);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
__webpack_require__(91);
module.exports = __webpack_require__(168).f('iterator');

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(513);
__webpack_require__(162);
__webpack_require__(517);
__webpack_require__(518);
module.exports = __webpack_require__(15).Symbol;

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(87);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(226)
  , hiddenKeys = __webpack_require__(160).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(88)
  , createDesc     = __webpack_require__(86)
  , toIObject      = __webpack_require__(56)
  , toPrimitive    = __webpack_require__(155)
  , has            = __webpack_require__(71)
  , IE8_DOM_DEFINE = __webpack_require__(225)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(41) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(520);
module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(523);
var $Object = __webpack_require__(15).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(527), __esModule: true };

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(542);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(543);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 250 */
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
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar [Burma]', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Korea', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe', 'Guinea Conakry', 'Jordan', 'Lithuania', 'Micronesia', 'Moldova'].sort();

exports['default'] = countries;

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _videoModal = __webpack_require__(119);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SectionVideo = function (_React$Component) {
  (0, _inherits3['default'])(SectionVideo, _React$Component);

  function SectionVideo() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, SectionVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = SectionVideo.__proto__ || (0, _getPrototypeOf2['default'])(SectionVideo)).call.apply(_ref, [this].concat(args))), _this), _this.showVideo = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(SectionVideo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var linkStyle = { float: 'left', lineHeight: '0' };
      var imageStyle = { width: '100px', margin: '0 auto' };
      imageStyle = (0, _extends3['default'])({}, imageStyle, this.props.imageStyle);

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_videoModal2['default'], { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }),
        _react2['default'].createElement(
          'a',
          {
            href: '#',
            className: 'image-video__link',
            style: linkStyle,
            onClick: this.showVideo
          },
          _react2['default'].createElement('img', { style: imageStyle, 'data-src': this.props.imgUrl, className: 'lazyload' })
        )
      );
    }
  }]);
  return SectionVideo;
}(_react2['default'].Component);

SectionVideo.displayName = 'SectionVideo';
SectionVideo.defaultProps = {
  imgUrl: '',
  url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
  imageStyle: {}
};


SectionVideo.propTypes = {
  imageStyle: _propTypes2['default'].object,
  url: _propTypes2['default'].string,
  imgUrl: _propTypes2['default'].string
};

exports['default'] = SectionVideo;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__(93);

var _debounce2 = _interopRequireDefault(_debounce);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _projectsIcons = __webpack_require__(257);

var _projectsIcons2 = _interopRequireDefault(_projectsIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var backgroundColors = {
  1: '#b91325',
  2: '#00355f',
  3: '#6e5785',
  4: '#95a0ad',
  5: '#156734',
  6: '#689038',
  7: '#7a2d04',
  8: '#b27009',
  9: '#E4A70F'
};

var Projects = function (_React$Component) {
  (0, _inherits3['default'])(Projects, _React$Component);

  function Projects() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Projects);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Projects.__proto__ || (0, _getPrototypeOf2['default'])(Projects)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 9,
      bg: '#B91325',
      donateColor: '#B91325'
    }, _this.setArrowAndContent = function () {
      var num = 9;

      _this.props.contents.map(function (content, ind) {
        if (content.hash_url === window.location.hash.replace('#', '')) {
          num = ind + 1;
        }
      });

      window.addEventListener('resize', (0, _debounce2['default'])(function () {
        _this.moveArrow(_this.state.section);
      }, 200));

      setTimeout(function () {
        _this.moveArrow(num);
        _this.changeContent(num);
      }, 1000);
    }, _this.moveArrow = function (num) {
      var left = _this.el.querySelector('.projects__icons li:nth-child(' + num + ')').offsetLeft;
      _this.el.querySelector('.projects__arrow').style.left = left + 'px';
    }, _this.updateUrl = function (hash) {
      history.pushState(null, null, '#' + hash);
    }, _this.changeContent = function (num) {
      var color = backgroundColors[num];
      var ind = num - 1;
      _this.setState({ bg: color, donateColor: color, section: num });
      _this.moveArrow(num);

      if (_this.props.contents.length > 0 && _this.props.contents[ind].hash_url) {
        _this.updateUrl(_this.props.contents[ind].hash_url);
      }

      if (typeof _this.props.changeSection === 'function') {
        _this.props.changeSection(num);
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Projects, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$contents = this.props.contents,
          contents = _props$contents === undefined ? [] : _props$contents;

      var content = contents[this.state.section - 1] || {};
      var title = content.title,
          text = content.text,
          imgUrl = content.imgUrl;


      return _react2['default'].createElement(
        'div',
        { className: 'projects', ref: function ref(el) {
            return _this2.el = el;
          }, 'data-jsx': 1717503319
        },
        _react2['default'].createElement(_projectsIcons2['default'], { onChange: this.changeContent }),
        _react2['default'].createElement(
          'div',
          { className: 'projects__content', 'data-jsx': 1717503319
          },
          _react2['default'].createElement('div', { className: 'projects__arrow', 'data-jsx': 1717503319
          }),
          _react2['default'].createElement(
            'div',
            {
              className: 'col-4-l projects__content__left',
              style: { background: this.state.bg },
              'data-jsx': 1717503319
            },
            _react2['default'].createElement(
              'h4',
              {
                'data-jsx': 1717503319
              },
              title
            ),
            _react2['default'].createElement('div', {
              className: 'projects__content__left__text',
              dangerouslySetInnerHTML: { __html: text },
              'data-jsx': 1717503319
            }),
            _react2['default'].createElement(
              'button',
              { className: 'bs-donate', style: { color: this.state.donateColor }, 'data-jsx': 1717503319
              },
              this.props.donate
            )
          ),
          _react2['default'].createElement('div', {
            className: 'col-8-l projects__content__right',
            style: { backgroundImage: 'url(' + imgUrl + ')' },
            'data-jsx': 1717503319
          })
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1717503319,
          css: '.projects__content__left[data-jsx="1717503319"]{min-height:500px;padding:40px}.projects__content__left[data-jsx="1717503319"] h4[data-jsx="1717503319"]{color:#fff;margin-bottom:20px}.projects__content__left__text[data-jsx="1717503319"]{color:#fff;margin-bottom:20px}.projects__content__right[data-jsx="1717503319"]{background-size:cover;background-position:center;min-height:500px}@media (max-width:767px){.projects__content__right[data-jsx="1717503319"]{min-height:200px}}.bs-donate[data-jsx="1717503319"]{background:#fff;border-color:#fff;-webkit-text-transform:uppercase;text-transform:uppercase}'
        })
      );
    }
  }]);
  return Projects;
}(_react2['default'].Component);

Projects.displayName = 'Projects';


Projects.propTypes = {
  contents: _propTypes2['default'].array,
  changeSection: _propTypes2['default'].func,
  donate: _propTypes2['default'].string
};

exports['default'] = Projects;

/***/ }),
/* 254 */
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
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(562);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(255);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProjectsIcons = function (_React$Component) {
  (0, _inherits3["default"])(ProjectsIcons, _React$Component);

  function ProjectsIcons() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ProjectsIcons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, (_ref = ProjectsIcons.__proto__ || (0, _getPrototypeOf2["default"])(ProjectsIcons)).call.apply(_ref, [this].concat(args))), _this), _this.changeContent = function (num, e) {
      e.preventDefault();
      _this.props.onChange(num);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  (0, _createClass3["default"])(ProjectsIcons, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "ul",
        { className: "projects__icons" },
        _react2["default"].createElement(
          "li",
          { id: "projects-1" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 1), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "68px", height: "67px", viewBox: "0 0 68 67", version: "1.1" },
              _react2["default"].createElement("path", { d: "M67.3673112,32.026012 C67.2600797,30.6734635 66.0912564,29.6302188 64.6758007,29.6302188 L3.22679192,29.6302188 C1.81669775,29.6302188 0.647874444,30.6734635 0.540642948,32.026012 C0.513835074,32.3667703 -0.043768705,40.471576 6.54560672,47.2972274 C11.8750121,52.8227547 20.2015377,55.7952158 31.2517434,56.2146107 L31.2517434,61.006197 L21.5365699,61.006197 C20.0460521,61.006197 18.8396977,62.1647753 18.8396977,63.5959602 C18.8396977,65.0271452 20.0460521,66.1857235 21.5365699,66.1857235 L45.9102889,66.1857235 C47.4008067,66.1857235 48.6125226,65.0271452 48.6125226,63.5959602 C48.6125226,62.1647753 47.4008067,61.006197 45.9102889,61.006197 L36.6454876,61.006197 L36.6454876,56.2146107 C47.6956933,55.7952158 56.0275805,52.8227547 61.3569859,47.2972274 C67.9463613,40.471576 67.3941191,32.3667703 67.3673112,32.026012 L67.3673112,32.026012 Z M61.8395276,34.8097454 C61.5017484,37.0797201 60.4669644,40.5973945 57.4055052,43.7743106 C52.7034041,48.6445334 44.811166,51.1137206 33.9539771,51.1137206 C23.1450423,51.1137206 15.2796121,48.6655031 10.5667878,43.8424622 C7.45171286,40.6498188 6.40620578,37.0954474 6.06306499,34.8097454 L61.8395276,34.8097454 Z M46.6501862,13.3734255 C46.6501862,6.44292538 40.7846234,0.80206448 33.5679437,0.80206448 C26.351264,0.80206448 20.4803396,6.44292538 20.4803396,13.3734255 C20.4803396,20.3039256 26.351264,25.9447865 33.5679437,25.9447865 C40.7846234,25.9447865 46.6501862,20.3039256 46.6501862,13.3734255 L46.6501862,13.3734255 Z M41.256442,13.3734255 C41.256442,17.4467981 37.8089494,20.7600175 33.5679437,20.7600175 C29.326938,20.7600175 25.8740839,17.4467981 25.8740839,13.3734255 C25.8740839,9.30005288 29.326938,5.98683346 33.5679437,5.98683346 C37.8089494,5.98683346 41.256442,9.30005288 41.256442,13.3734255 L41.256442,13.3734255 Z", id: "Fill-7", stroke: "none", fill: "#B91325", fillRule: "evenodd" })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-2" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 2), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "115 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M167.517255,38.9955022 C167.707985,38.6134211 167.824284,38.3996377 167.828936,38.3905405 C168.359259,37.4034978 168.070837,36.1844773 167.14975,35.5294812 L159.00883,29.7436824 C158.338948,29.2660811 157.450425,29.1842065 156.692156,29.5208018 C156.231613,29.7300366 154.556909,30.6352048 152.663564,33.4416812 C150.146856,33.1323774 147.244037,32.9322397 144.201658,32.9322397 C141.131368,32.9322397 138.25646,33.1323774 135.749057,33.4416812 C133.855711,30.6352048 132.181008,29.7300366 131.720464,29.5208018 C130.962195,29.179658 130.073672,29.2615325 129.403791,29.7436824 L121.267522,35.5294812 C120.341783,36.1844773 120.053362,37.4034978 120.583685,38.3905405 C120.588337,38.3996377 120.695332,38.5997754 120.876758,38.9545649 C117.83438,41.3016343 115.196721,44.672135 115.196721,49.2798506 C115.196721,57.6674395 121.704806,57.6674395 127.654656,57.6674395 L160.962651,57.6674395 C164.135284,57.6674395 166.879937,57.6674395 169.098919,56.6940425 C171.834269,55.4886677 173.215899,52.9914951 173.215899,49.2798506 C173.215899,44.7039751 170.564285,41.3425715 167.517255,38.9955022 L167.517255,38.9955022 Z M124.979782,53.0551753 C120.47669,52.9187178 119.890544,52.2227844 119.890544,49.2798506 C119.890544,47.2056963 120.69068,44.9950845 122.728236,43.0573877 C123.109696,43.994396 123.50046,45.0269246 123.863313,46.1185847 C124.654145,48.488397 124.910003,51.1948044 124.979782,53.0551753 L124.979782,53.0551753 Z M136.921349,53.1779871 L129.594521,53.1779871 C129.524741,51.0174097 129.23632,47.7151377 128.240802,44.726718 C127.319715,41.9702761 126.263721,39.5777209 125.533364,38.0493967 L130.683078,34.3877866 C131.678596,35.4294124 133.283521,37.6263784 134.716323,41.8974988 C136.344507,46.7690322 136.80505,50.8491121 136.921349,53.1779871 L136.921349,53.1779871 Z M150.356194,37.7764817 C150.002646,38.604324 149.658401,39.5049436 149.32346,40.5056321 C147.504546,45.9366414 147.006787,50.4533853 146.885836,53.0870154 L141.526784,53.0870154 C141.410485,50.4533853 140.908074,45.9366414 139.08916,40.5056321 C138.754219,39.5049436 138.409975,38.604324 138.056426,37.7764817 C139.926512,37.6081841 141.964068,37.5126638 144.201658,37.5126638 C146.4439,37.5126638 148.481456,37.6081841 150.356194,37.7764817 L150.356194,37.7764817 Z M162.879256,38.0493967 C162.148899,39.5777209 161.092905,41.9702761 160.171818,44.726718 C159.1763,47.7151377 158.892531,51.0174097 158.822752,53.1779871 L151.491271,53.1779871 C151.60757,50.8491121 152.068113,46.7690322 153.696298,41.8974988 C155.138404,37.6036355 156.74798,35.411218 157.72489,34.3877866 L162.879256,38.0493967 Z M168.526729,49.2798506 C168.526729,51.9180293 167.642858,52.3046589 167.168358,52.5184424 C166.307747,52.8959749 164.967984,53.0187866 163.432839,53.0642725 C163.502618,51.2039016 163.753823,48.5020427 164.549308,46.1185847 C164.91216,45.0269246 165.302924,43.994396 165.684385,43.0573877 C167.726593,44.9996331 168.526729,47.2056963 168.526729,49.2798506 L168.526729,49.2798506 Z M158.725061,15.1973108 C158.725061,7.33280908 152.170456,0.9375 144.108619,0.9375 C136.051434,0.9375 129.492178,7.33280908 129.492178,15.1973108 C129.492178,23.0572639 136.051434,29.452573 144.108619,29.452573 C152.170456,29.452573 158.725061,23.0572639 158.725061,15.1973108 L158.725061,15.1973108 Z M154.026586,15.1973108 C154.026586,20.5327998 149.579318,24.8721489 144.108619,24.8721489 C138.637921,24.8721489 134.186,20.5327998 134.186,15.1973108 C134.186,9.85727319 138.637921,5.51792407 144.108619,5.51792407 C149.579318,5.51792407 154.026586,9.85727319 154.026586,15.1973108 L154.026586,15.1973108 Z",
                id: "Fill-10",
                stroke: "none",
                fill: "#00355F",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-3" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 3), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "226 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M284.41262,48.4019739 C284.398665,47.8243037 283.975337,34.0284485 276.662464,18.376771 C272.261715,8.97029932 266.483987,4.6582417 262.241405,2.6705105 C260.836515,1.91999414 259.282762,1.40600415 257.645274,1.14218628 C257.021912,1.02847168 256.61254,0.992083008 256.533456,0.987534424 L256.533456,1.00118018 C256.114781,0.964791504 255.700757,0.9375 255.272777,0.9375 C251.593081,0.9375 248.229718,2.28842944 245.661839,4.49449268 C241.986794,6.96892236 237.818643,11.1900083 234.459932,18.376771 C228.831067,30.4168728 227.286618,41.3334744 226.86329,46.0048701 C226.560913,47.0192043 226.393443,48.1108645 226.393443,49.2843992 C226.393443,57.671988 232.892223,57.671988 238.837421,57.671988 L272.108201,57.671988 C275.280834,57.671988 278.020835,57.671988 280.239817,56.6940425 C282.970515,55.4886677 284.352145,52.9960437 284.352145,49.2843992 C284.352145,48.979644 284.310277,48.6976318 284.287018,48.4065225 L284.41262,48.4019739 Z M265.186092,15.1973108 C265.186092,20.5327998 260.738823,24.8766975 255.272777,24.8766975 C249.80673,24.8766975 245.364113,20.5327998 245.364113,15.1973108 C245.364113,12.067885 246.917866,9.30689453 249.285711,7.53749536 C251.151145,6.43673804 252.742113,5.90910229 253.746936,5.67257593 C254.249347,5.59525 254.751758,5.51792407 255.272777,5.51792407 C260.738823,5.51792407 265.186092,9.86182178 265.186092,15.1973108 L265.186092,15.1973108 Z M238.642039,20.2416904 C239.311921,18.8088865 240.014366,17.5443801 240.735419,16.375394 C241.354129,23.6895171 247.634267,29.4571216 255.272777,29.4571216 C263.213663,29.4571216 269.67988,23.2301101 269.856654,15.5157117 C270.763786,16.8939326 271.643005,18.4586455 272.480357,20.2416904 C275.727421,27.1919268 277.527728,33.8101165 278.541854,38.9090791 C275.39248,36.5119753 271.866299,35.1883374 270.428845,34.733479 C267.591153,33.8283108 261.780861,32.9322397 255.370468,32.9322397 C248.969378,32.9322397 243.400989,33.7919221 240.316743,34.733479 C238.851377,35.1792402 235.622921,36.3891636 232.64567,38.5360952 C233.6691,33.4962642 235.464754,27.0372749 238.642039,20.2416904 L238.642039,20.2416904 Z M278.309256,52.5184424 C277.011361,53.091564 274.634212,53.091564 272.108201,53.091564 L238.637387,53.091564 C231.859489,53.091564 231.077961,52.7003857 231.077961,49.2843992 C231.077961,49.0296785 231.101221,48.7704092 231.129132,48.5065913 L231.301255,48.5111399 C231.301255,48.488397 231.319863,47.9880527 231.389642,47.0965303 C232.752665,42.2977742 238.967676,37.5126638 255.370468,37.5126638 C274.280663,37.5126638 279.667627,43.8670356 279.667627,49.2843992 C279.667627,51.9225779 278.783755,52.3092075 278.309256,52.5184424 L278.309256,52.5184424 Z",
                id: "Fill-5",
                stroke: "none",
                fill: "#6E5785",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-4" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 4), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "337 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M395.609342,49.2843992 C395.609342,39.9279619 384.51443,35.6386472 381.672086,34.733479 C378.829741,33.8283108 373.014798,32.9322397 366.595101,32.9322397 C360.189359,32.9322397 354.616318,33.7964707 351.52742,34.733479 C348.443174,35.6704873 337.590164,39.9279619 337.590164,49.2843992 C337.590164,57.671988 344.098248,57.671988 350.048098,57.671988 L383.351441,57.671988 C386.528726,57.671988 389.27338,57.671988 391.492362,56.6940425 C394.227711,55.4886677 395.609342,52.9960437 395.609342,49.2843992 M390.91552,49.2843992 C390.91552,51.9225779 390.031648,52.3092075 389.561801,52.5184424 C388.263905,53.091564 385.877453,53.091564 383.351441,53.091564 L349.843412,53.091564 C343.060863,53.091564 342.279334,52.7003857 342.279334,49.2843992 C342.279334,43.8670356 347.666298,37.5126638 366.595101,37.5126638 C385.523904,37.5126638 390.91552,43.8670356 390.91552,49.2843992 M381.113851,15.1973108 C381.113851,7.33280908 374.559247,0.9375 366.502062,0.9375 C358.444876,0.9375 351.88562,7.33280908 351.88562,15.1973108 C351.88562,23.0618125 358.444876,29.4571216 366.502062,29.4571216 C374.559247,29.4571216 381.113851,23.0618125 381.113851,15.1973108 M376.420029,15.1973108 C376.420029,20.5327998 371.968108,24.8766975 366.502062,24.8766975 C361.026711,24.8766975 356.579443,20.5327998 356.579443,15.1973108 C356.579443,9.86182178 361.026711,5.51792407 366.502062,5.51792407 C371.968108,5.51792407 376.420029,9.86182178 376.420029,15.1973108",
                id: "Fill-3",
                stroke: "none",
                fill: "#8B97A6",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-5" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 5), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "448 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M487.667922,57.6674395 L455.457788,57.6674395 C452.140945,57.6674395 448.786885,55.2475928 448.786885,50.6262314 C448.786885,49.3480793 449.066003,48.247322 449.526546,47.3194109 C454.108721,33.9283796 462.789269,8.46540649 463.380067,6.28663477 C464.370933,2.58863599 467.631953,0.9375 470.418474,0.9375 L495.42273,0.9375 C497.176517,0.9375 498.851221,1.79718237 499.92117,3.24363208 C501.107419,4.85383081 501.39584,6.94617944 500.702699,8.98849365 C499.772308,11.7267412 492.743204,37.6946072 491.738382,41.5427092 C490.691692,45.5409146 487.556275,47.9243726 483.35556,47.9243726 L455.760165,47.9243726 C455.746209,47.9243726 454.471574,48.0153442 453.8203,49.0979072 C453.769129,49.220719 453.713305,49.3389822 453.648178,49.4526968 C453.522575,49.7710977 453.443492,50.1577273 453.443492,50.6262314 C453.443492,52.9369121 454.983289,53.1188555 455.457788,53.1188555 L487.667922,53.1188555 C489.705478,53.1188555 492.031455,52.2910132 492.626905,50.4397395 C493.054885,49.1524902 499.70718,25.5134993 502.233192,16.5164001 C502.572784,15.3064768 503.838116,14.583252 505.094144,14.9243958 C506.336216,15.2564424 507.066573,16.5118516 506.72698,17.7217749 C506.350172,19.0454128 497.599845,50.1895674 497.060218,51.822509 C495.915837,55.3704045 492.222185,57.6674395 487.667922,57.6674395 M455.783425,43.3757886 L483.35556,43.3757886 C485.411724,43.3757886 486.714271,42.3751001 487.230638,40.4101118 C488.174985,36.7939875 495.287823,10.4986235 496.283342,7.55114111 C496.506636,6.90524219 496.455464,6.32302344 496.148435,5.90455371 C495.953053,5.64528442 495.678588,5.48608398 495.42273,5.48608398 L470.418474,5.48608398 C470.083533,5.48608398 468.380918,5.58160425 467.883159,7.44652368 C467.278405,9.67987842 459.495685,32.5092214 455.783425,43.3757886",
                id: "Fill-1",
                stroke: "none",
                fill: "#005921",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-6" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 6), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "558 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M616.051965,55.2748843 C616.051965,53.9512463 615.028535,52.8777805 613.763203,52.8777805 L589.331137,52.8777805 L589.331137,46.5552488 C597.458102,45.5409146 605.436204,39.2092856 605.436204,29.4889617 L605.436204,21.6335571 C605.436204,20.3099192 604.408122,19.241002 603.147443,19.241002 C601.882111,19.241002 600.858681,20.3099192 600.858681,21.6335571 L600.858681,29.4889617 C600.858681,37.1624229 593.690019,41.9156931 587.042376,41.9156931 C580.394733,41.9156931 573.226071,37.1624229 573.226071,29.4889617 L573.226071,21.6335571 C573.226071,20.3099192 572.202641,19.241002 570.937309,19.241002 C569.676629,19.241002 568.648547,20.3099192 568.648547,21.6335571 L568.648547,29.4889617 C568.648547,39.2092856 576.626649,45.5409146 584.753614,46.5552488 L584.753614,52.8777805 L560.316897,52.8777805 C559.056217,52.8777805 558.032787,53.9512463 558.032787,55.2748843 C558.032787,56.5985222 559.056217,57.6674395 560.316897,57.6674395 L613.763203,57.6674395 C615.028535,57.6674395 616.051965,56.5985222 616.051965,55.2748843 L616.051965,55.2748843 Z M597.146421,27.3010928 L597.146421,11.5948323 C597.146421,5.71806177 592.615417,0.9375 587.042376,0.9375 C581.469334,0.9375 576.93833,5.71806177 576.93833,11.5948323 L576.93833,27.3010928 C576.93833,33.1778633 581.469334,37.958425 587.042376,37.958425 C592.615417,37.958425 597.146421,33.1778633 597.146421,27.3010928 L597.146421,27.3010928 Z M592.57355,27.3010928 C592.57355,30.5396846 590.089406,33.1687661 587.042376,33.1687661 C583.995346,33.1687661 581.515854,30.5396846 581.515854,27.3010928 L581.515854,11.5948323 C581.515854,8.36078906 583.995346,5.72715894 587.042376,5.72715894 C590.089406,5.72715894 592.57355,8.36078906 592.57355,11.5948323 L592.57355,27.3010928 Z",
                id: "Fill-19",
                stroke: "none",
                fill: "#689038",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-7" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 7), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "671 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M729.204158,29.3024697 C729.204158,13.8099927 719.351318,1.1922207 707.172501,0.96024292 L707.172501,0.9375 L693.55623,0.9375 C681.219246,0.9375 671.180328,13.664438 671.180328,29.3024697 C671.180328,44.9405015 681.219246,57.6674395 693.55623,57.6674395 L706.8143,57.6674395 L706.832908,57.6674395 C719.169892,57.6674395 729.204158,44.9405015 729.204158,29.3024697 L729.204158,29.3024697 Z M694.812257,5.42240381 C688.597246,10.4667834 684.461658,19.272842 684.461658,29.3024697 C684.461658,39.3275488 688.597246,48.138156 694.807605,53.1825356 L693.55623,53.1825356 C683.726649,53.1825356 675.734591,42.4706204 675.734591,29.3024697 C675.734591,16.1343191 683.726649,5.42240381 693.55623,5.42240381 L694.812257,5.42240381 Z M724.649894,29.3024697 C724.649894,42.4706204 716.657836,53.1870842 706.832908,53.1870842 L706.832908,53.1825356 L706.8143,53.1825356 C696.998676,53.1734385 689.015922,42.4660718 689.015922,29.3024697 C689.015922,16.1343191 697.00798,5.42240381 706.832908,5.42240381 C716.657836,5.42240381 724.649894,16.1343191 724.649894,29.3024697 L724.649894,29.3024697 Z M721.072541,29.3024697 C721.072541,19.1818704 715.341333,11.2491399 708.02846,11.2491399 C700.715588,11.2491399 694.989032,19.1818704 694.989032,29.3024697 C694.989032,39.4276177 700.715588,47.3557996 708.02846,47.3557996 C715.341333,47.3557996 721.072541,39.4276177 721.072541,29.3024697 L721.072541,29.3024697 Z M716.518277,29.3024697 C716.518277,36.65753 712.629243,42.8708958 708.02846,42.8708958 C703.427677,42.8708958 699.543295,36.65753 699.543295,29.3024697 C699.543295,21.9474094 703.427677,15.7340437 708.02846,15.7340437 C712.629243,15.7340437 716.518277,21.9474094 716.518277,29.3024697 L716.518277,29.3024697 Z",
                id: "Fill-12-Copy",
                stroke: "none",
                fill: "#7A2D04",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-8" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 8), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "58px", viewBox: "784 0 59 58", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", {
                d: "M842.347047,44.1308535 L842.347047,43.020999 L841.458523,42.3296143 C834.196822,36.7166616 830.033323,27.801437 830.033323,17.8809753 C830.033323,11.2536885 824.734747,6.08194849 819.319871,5.00393408 C819.115185,2.23839502 815.356406,0.9375 813.337458,0.9375 C811.323161,0.9375 807.94119,2.23839502 807.596946,4.86747656 C801.702919,6.28208618 796.646245,11.2536885 796.646245,17.8809753 C796.646245,27.801437 792.478093,36.712113 785.21174,42.3296143 L784.327869,43.020999 L784.327869,44.1308535 C784.327869,47.460417 787.212081,50.1668245 790.75687,50.1668245 L803.089202,50.1668245 C804.201019,54.4697849 808.378474,57.6674395 813.337458,57.6674395 C818.301093,57.6674395 822.469245,54.4697849 823.581062,50.1668245 L835.913393,50.1668245 C839.462835,50.1668245 842.347047,47.460417 842.347047,44.1308535 M837.374107,44.9495986 C837.043818,45.3316797 836.49954,45.590949 835.913393,45.590949 L819.22218,45.590949 L819.22218,47.8834353 C819.22218,50.7535918 816.57987,53.091564 813.337458,53.091564 C810.090393,53.091564 807.452735,50.7535918 807.452735,47.8834353 L807.452735,45.590949 L790.75687,45.590949 C790.170724,45.590949 789.631097,45.3316797 789.300808,44.9495986 C796.948622,38.4314778 801.298199,28.6565708 801.298199,17.8809753 C801.298199,11.2491399 808.085401,9.56616382 811.006828,9.14314551 C811.016132,8.94300781 811.239426,5.5088269 813.421193,5.5088269 C815.60296,5.5088269 815.668087,8.94300781 815.668087,9.14314551 C818.584863,9.56616382 825.376716,11.2491399 825.376716,17.8809753 C825.376716,28.6565708 829.726294,38.4314778 837.374107,44.9495986",
                id: "Fill-17",
                stroke: "none",
                fill: "#B27008",
                fillRule: "evenodd"
              })
            )
          )
        ),
        _react2["default"].createElement(
          "li",
          { id: "projects-9" },
          _react2["default"].createElement(
            "a",
            { onClick: this.changeContent.bind(null, 9), href: "#" },
            _react2["default"].createElement(
              "svg",
              { width: "59px", height: "57px", viewBox: "1087 230 59 57", version: "1.1" },
              _react2["default"].createElement("defs", null),
              _react2["default"].createElement("path", { d: "M1118.82862,280.5659 L1105.40362,258.2959 L1125.27162,236.1169 L1139.72962,258.2369 L1118.82862,280.5659 Z M1144.70762,257.4459 L1127.81162,231.1589 C1127.44362,230.5319 1126.79762,230.1089 1126.06662,230.0179 C1125.33162,229.9309 1124.60162,230.1719 1124.08562,230.6909 L1100.78362,256.2989 C1100.55562,256.5309 1100.40262,256.8039 1100.29062,257.0859 C1100.27162,257.1229 1100.23962,257.1449 1100.22062,257.1819 L1087.20462,283.4729 C1086.67462,284.6369 1087.20962,286.0109 1088.40062,286.5289 C1088.71162,286.6659 1089.03762,286.7289 1089.35862,286.7289 C1090.26062,286.7289 1091.12162,286.2199 1091.51662,285.3559 L1102.72862,263.0399 L1116.28862,285.5329 C1116.65662,286.1649 1117.30262,286.5879 1118.03762,286.6789 C1118.13562,286.6929 1118.23762,286.7019 1118.33562,286.7019 C1118.96862,286.7019 1119.57762,286.4519 1120.02462,286.0019 L1144.34962,260.2159 C1145.08862,259.4739 1145.23262,258.3419 1144.70762,257.4459 L1144.70762,257.4459 Z", id: "Page-1", stroke: "none", fill: "#DFAB26", fillRule: "evenodd" })
            )
          )
        )
      );
    }
  }]);
  return ProjectsIcons;
}(_react2["default"].Component);

ProjectsIcons.displayName = "ProjectsIcons";
exports["default"] = ProjectsIcons;

/***/ }),
/* 258 */
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

  if (typeof val === 'string') {
    return val.replace(/[^0-9]+/, '');
  }

  if (typeof val === 'number') {
    return val.toString().replace(/[^0-9]+/, '');
  }

  console.log('onlyNum val is not a string or number: ', val);
  return '';
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(89);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _amount = __webpack_require__(172);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(173);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(174);

var _contact2 = _interopRequireDefault(_contact);

var _four = __webpack_require__(260);

var _four2 = _interopRequireDefault(_four);

var _donate = __webpack_require__(120);

var actions = _interopRequireWildcard(_donate);

var _events = __webpack_require__(36);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _keys2['default'])(errors).every(function (key) {
    return errors[key] == true;
  });
}

var DonateInline = function (_Component) {
  (0, _inherits3['default'])(DonateInline, _Component);

  function DonateInline() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DonateInline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DonateInline.__proto__ || (0, _getPrototypeOf2['default'])(DonateInline)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: 'monthly',
      amount: 30,
      currency: 'usd',
      contact: { name: '', email: '', country: '' },
      stripe: {
        card_type: '',
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        token: ''
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four: false,
      show_titles: false
    }, _this.handleChange = function (field) {
      _this.setState((0, _extends3['default'])({}, _this.state, field));
    }, _this.creditCardIsValid = function () {
      return new _promise2['default'](function (resolve, reject) {
        var errs = _this.creditCard.validateAll();
        var isValid = isAllValid(errs.stripe);
        return resolve(isValid);
      });
    }, _this.contactIsValid = function () {
      return new _promise2['default'](function (resolve, reject) {
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
            var stripe = (0, _extends3['default'])({}, _this.state.stripe, { token: res.id });
            _this.setState({ stripe: stripe });

            actions.stripeCharge((0, _extends3['default'])({}, _this.state, { stripe: stripe })).then(function (res) {
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

      actions.storeConvertLoop(_this.props.tags, _this.state.contact).then(function () {
        var event = {
          category: 'DONATION',
          action: 'DONATION_MONTHLY',
          label: 'DONATION_EN',
          value: amount
        };
        console.log('ga', event);
        (0, _events.storeEvent)('ga_event');
      }).then(function () {
        var event = {
          name: 'Donation ' + donation_type,
          person: contact,
          metadata: {
            amount: amount,
            type: donation_type,
            url: window.location.href
          }
        };
        console.log('cl', event);
        return (0, _events.storeEvent)('cl_event', event);
      }).then(function () {
        var event = {
          eventName: 'Purchase',
          content: { value: amount, currency: 'USD' }
        };
        console.log('fb', event);
        return (0, _events.storeEvent)('fb_event');
      }).then(function () {
        var event = {
          customerId: contact.email + '-' + id,
          revenue: amount
        };
        console.log('ga_ecm_event', event);
        return (0, _events.storeEvent)('ga_ecm_event', event);
      }).then(function (res) {
        // const url = `${base}?customer_id=${contact.email}-${id}&order_revenue=${amount}&order_id=${id}`;
        window.location = base;
      });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DonateInline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.donateForm) {
        this.donateForm.addEventListener('keydown', function (e) {
          if (e.which == 9) {
            e.preventDefault();
            _this2.handleSubmit();
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var sectionWidth = '100%';
      var viewPortStyle = {
        width: '100%',
        left: this.state.left,
        display: 'block'
      };

      var donationTypeStyle = {
        display: 'inline',
        marginLeft: '15px',
        color: this.props.is_blue ? '#3C515F' : '#fff'
      };

      var backBtnStyle = {
        float: 'right',
        background: 'transparent',
        border: 'none'
      };

      console.log('four', this.state.show_four);

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'form',
          {
            onSubmit: this.handleSubmit,
            className: this.props.is_blue ? 'donate_react donate_inline' : 'donate_react',
            style: this.state.show_four ? { display: 'none' } : { display: 'block' },
            ref: function ref(donate) {
              return _this3.donateForm = donate;
            }
          },
          _react2['default'].createElement(
            'div',
            { className: 'donate_react__viewport', style: viewPortStyle },
            _react2['default'].createElement(_contact2['default'], (0, _extends3['default'])({
              ref: function ref(contact) {
                return _this3.contact = contact;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              inline: true,
              onChange: this.handleChange
            })),
            _react2['default'].createElement(_amount2['default'], (0, _extends3['default'])({}, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2['default'].createElement(_creditCard2['default'], (0, _extends3['default'])({
              ref: function ref(creditCard) {
                return _this3.creditCard = creditCard;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            }))
          ),
          _react2['default'].createElement(
            'div',
            { style: { marginBottom: '10px' } },
            _react2['default'].createElement(
              'button',
              {
                className: 'donate_react__submit pull-left',
                onClick: this.handleSubmit,
                disabled: this.state.loading
              },
              this.props.texts.donate,
              this.state.loading ? '...' : ''
            ),
            _react2['default'].createElement(
              'span',
              { style: donationTypeStyle },
              this.state.amount + ' USD ' + this.props.texts[this.state.donation_type]
            )
          )
        ),
        _react2['default'].createElement(_four2['default'], (0, _extends3['default'])({}, this.props, this.state))
      );
    }
  }]);
  return DonateInline;
}(_react.Component);

DonateInline.displayName = 'DonateInline';
DonateInline.defaultProps = { texts: {}, redirect: {} };
exports['default'] = DonateInline;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _donate = __webpack_require__(120);

var actions = _interopRequireWildcard(_donate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FourStep = function (_Component) {
  (0, _inherits3['default'])(FourStep, _Component);

  function FourStep() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, FourStep);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = FourStep.__proto__ || (0, _getPrototypeOf2['default'])(FourStep)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: false
    }, _this.handleYes = function () {
      _this.setState({ loading: true });

      actions.stripeToken(_this.props).then(function (res) {
        if (res.id) {
          var stripe = (0, _extends3['default'])({}, _this.props.stripe, { token: res.id });
          _this.setState({ loading: true, stripe: stripe });

          actions.stripeCharge((0, _extends3['default'])({}, _this.props, { stripe: stripe, donation_type: 'monthly', trial_period_days: 30 })).then(function (res) {
            return _this.completeTransaction(res.data);
          });
        }
      });
    }, _this.handleNo = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          amount = _this$props.amount,
          donation_type = _this$props.donation_type,
          contact = _this$props.contact;

      var base = _this.props.redirect.monthly;
      var url = base + '?customer_id=' + contact.email + '&order_revenue=' + amount + '&amount=' + amount + '&personname=' + contact.name + '&donation_type=' + donation_type;
      window.location = url;
    }, _this.completeTransaction = function () {
      var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props2 = _this.props,
          amount = _this$props2.amount,
          contact = _this$props2.contact;

      var base = _this.props.redirect.monthly;
      var id = stripeResponse.id;


      actions.storeConvertLoop(_this.props, _this.state).then(actions.storeEventConvertLoop.bind(null, _this.props)).then(function () {
        var url = base + '?customer_id=' + contact.email + '-' + id + '&order_revenue=' + amount + '&amount=' + amount + '&personname=' + contact.name + '&donation_type=monthly';
        window.location = url;
      });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(FourStep, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          texts = _props.texts,
          amount = _props.amount;

      var d = parseInt(amount) / 30;
      d = d.toFixed(2);

      return _react2['default'].createElement(
        'div',
        { style: this.props.show_four ? { display: 'block', textAlign: 'center' } : { display: 'none' }, 'data-jsx': 3813005928
        },
        _react2['default'].createElement(
          'h5',
          { className: 'step-four__text', 'data-jsx': 3813005928
          },
          texts.text_four_step
        ),
        _react2['default'].createElement(
          'h3',
          { className: 'step-four__subtext', 'data-jsx': 3813005928
          },
          texts.subtext_four_step + ' ' + d + ' ?'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-6 col-6-l', 'data-jsx': 3813005928
          },
          _react2['default'].createElement(
            'button',
            {
              onClick: this.handleYes,
              className: 'step-four__handle-yes',
              'data-jsx': 3813005928
            },
            this.state.loading ? _react2['default'].createElement('img', { src: texts.preload, width: '40px', 'data-jsx': 3813005928
            }) : texts.yes
          ),
          _react2['default'].createElement(
            'h5',
            { className: 'step-four__text-footer', 'data-jsx': 3813005928
            },
            texts.text_footer
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-6 col-6-l', 'data-jsx': 3813005928
          },
          _react2['default'].createElement(
            'button',
            { className: 'step-four__handle-no', onClick: this.handleNo, 'data-jsx': 3813005928
            },
            texts.no
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 3813005928,
          css: '.step-four__text[data-jsx="3813005928"]{font-size:18px;color:#3C515F;marginBottom:20px}.step-four__subtext[data-jsx="3813005928"]{color:#3C515F;margin-bottom:20px}.step-four__text-footer[data-jsx="3813005928"]{font-size:12px;line-height:1.1;-webkit-text-align:center;text-align:center;margin-top:10px;color:#333}.step-four__handle-yes[data-jsx="3813005928"]{background:#50B45A;width:100%}.step-four__handle-no[data-jsx="3813005928"]{background:transparent;border:1px solid #F1364E;width:100%;color:#F1364E}'
        })
      );
    }
  }]);
  return FourStep;
}(_react.Component);

FourStep.displayName = 'FourStep';


FourStep.propTypes = {
  amount: _propTypes2['default'].string.isRequired,
  donation_type: _propTypes2['default'].string.isRequired,
  show_four: _propTypes2['default'].string.isRequired,
  contact: _propTypes2['default'].object.isRequired,
  redirect: _propTypes2['default'].object.isRequired,
  texts: _propTypes2['default'].object.isRequired,
  stripe: _propTypes2['default'].object.isRequired
};

exports['default'] = FourStep;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(596), __esModule: true };

/***/ }),
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
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
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
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
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(175);

var _webfontloader = __webpack_require__(218);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _reactMultipleRender = __webpack_require__(219);

var _reactMultipleRender2 = _interopRequireDefault(_reactMultipleRender);

__webpack_require__(152);

__webpack_require__(223);

var _mitt = __webpack_require__(486);

var _mitt2 = _interopRequireDefault(_mitt);

var _events = __webpack_require__(36);

var _contactPray = __webpack_require__(505);

var _contactPray2 = _interopRequireDefault(_contactPray);

var _headerSlider = __webpack_require__(558);

var _headerSlider2 = _interopRequireDefault(_headerSlider);

var _sectionVideo = __webpack_require__(252);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

var _sectionVideoContent = __webpack_require__(560);

var _sectionVideoContent2 = _interopRequireDefault(_sectionVideoContent);

var _projects = __webpack_require__(253);

var _projects2 = _interopRequireDefault(_projects);

var _projectsInfo = __webpack_require__(569);

var _projectsInfo2 = _interopRequireDefault(_projectsInfo);

var _accordion = __webpack_require__(570);

var _accordion2 = _interopRequireDefault(_accordion);

var _posts = __webpack_require__(572);

var _posts2 = _interopRequireDefault(_posts);

var _single = __webpack_require__(574);

var _single2 = _interopRequireDefault(_single);

var _inline = __webpack_require__(259);

var _inline2 = _interopRequireDefault(_inline);

var _inline_section = __webpack_require__(577);

var _inline_section2 = _interopRequireDefault(_inline_section);

var _section = __webpack_require__(578);

var _section2 = _interopRequireDefault(_section);

var _campaignsSlider = __webpack_require__(580);

var _campaignsSlider2 = _interopRequireDefault(_campaignsSlider);

var _downloadPdf = __webpack_require__(581);

var _downloadPdf2 = _interopRequireDefault(_downloadPdf);

var _galleryHeader = __webpack_require__(582);

var _galleryHeader2 = _interopRequireDefault(_galleryHeader);

var _projectsAbout = __webpack_require__(583);

var _projectsAbout2 = _interopRequireDefault(_projectsAbout);

var _videoHeader = __webpack_require__(585);

var _videoHeader2 = _interopRequireDefault(_videoHeader);

var _carousel = __webpack_require__(586);

var _carousel2 = _interopRequireDefault(_carousel);

var _counter = __webpack_require__(587);

var _counter2 = _interopRequireDefault(_counter);

var _postShare = __webpack_require__(588);

var _postShare2 = _interopRequireDefault(_postShare);

var _contactsGrantGuidelines = __webpack_require__(589);

var _contactsGrantGuidelines2 = _interopRequireDefault(_contactsGrantGuidelines);

var _contactUsForm = __webpack_require__(595);

var _contactUsForm2 = _interopRequireDefault(_contactUsForm);

var _contactCall = __webpack_require__(599);

var _contactCall2 = _interopRequireDefault(_contactCall);

var _contactSpain = __webpack_require__(600);

var _contactSpain2 = _interopRequireDefault(_contactSpain);

var _lmForm = __webpack_require__(603);

var _lmForm2 = _interopRequireDefault(_lmForm);

var _set_menu_mobile = __webpack_require__(604);

var _set_menu_mobile2 = _interopRequireDefault(_set_menu_mobile);

var _set_menu = __webpack_require__(605);

var _set_menu2 = _interopRequireDefault(_set_menu);

var _donate_redirect = __webpack_require__(606);

var _donate_redirect2 = _interopRequireDefault(_donate_redirect);

var _smoothScroll = __webpack_require__(607);

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _scrollViaCrucisNav = __webpack_require__(608);

var _scrollViaCrucisNav2 = _interopRequireDefault(_scrollViaCrucisNav);

var _toggleViaCrucisNav = __webpack_require__(609);

var _toggleViaCrucisNav2 = _interopRequireDefault(_toggleViaCrucisNav);

var _toggleMenu = __webpack_require__(610);

var _toggleMenu2 = _interopRequireDefault(_toggleMenu);

var _stickMenu = __webpack_require__(611);

var _stickMenu2 = _interopRequireDefault(_stickMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// jquery
window.mitt = (0, _mitt2['default'])();

//  React components :)


window.mitt.on('run:events', function () {
  (0, _events.runEvents)();
});

_webfontloader2['default'].load({
  google: { families: ['Source Sans Pro:400,600,700'] },
  custom: {
    families: ['Ionicons'],
    testStrings: { Ionicons: '\uF10C\uF109' } }
});

// react renders
(0, _reactMultipleRender2['default'])(_headerSlider2['default'], '.header-slider', true);
(0, _reactMultipleRender2['default'])(_contactPray2['default'], '.contact-form', true);
(0, _reactMultipleRender2['default'])(_posts2['default'], '.bs-posts', true);
(0, _reactMultipleRender2['default'])(_single2['default'], '.bs-donate-react', true);
(0, _reactMultipleRender2['default'])(_inline2['default'], '.bs-donate-inline', true);
(0, _reactMultipleRender2['default'])(_inline_section2['default'], '.bs-donate-inline-section', true);
(0, _reactMultipleRender2['default'])(_section2['default'], '.bs-donate-section', true);
(0, _reactMultipleRender2['default'])(_projects2['default'], '.projects-container', true);
(0, _reactMultipleRender2['default'])(_projectsInfo2['default'], '.bs-projects-info', true);
(0, _reactMultipleRender2['default'])(_accordion2['default'], '.bs-accordion', true);
(0, _reactMultipleRender2['default'])(_sectionVideo2['default'], '.section-video', true);
(0, _reactMultipleRender2['default'])(_sectionVideoContent2['default'], '.section-video-content', true);
(0, _reactMultipleRender2['default'])(_campaignsSlider2['default'], '.bs-campaings-slider', true);
(0, _reactMultipleRender2['default'])(_downloadPdf2['default'], '.bs-download-pdf', true);
(0, _reactMultipleRender2['default'])(_galleryHeader2['default'], '.bs-gallery-header', true);
(0, _reactMultipleRender2['default'])(_projectsAbout2['default'], '.bs-projects-about', true);
(0, _reactMultipleRender2['default'])(_videoHeader2['default'], '.bs-video-header', true);
(0, _reactMultipleRender2['default'])(_carousel2['default'], '.bs-carousel', true);
(0, _reactMultipleRender2['default'])(_counter2['default'], '.bs-counter', true);
(0, _reactMultipleRender2['default'])(_postShare2['default'], '.bs-post-share', true);
(0, _reactMultipleRender2['default'])(_contactsGrantGuidelines2['default'], '.bs-contacts-gg', true);
(0, _reactMultipleRender2['default'])(_contactUsForm2['default'], '.bs-contact-form-us', true);
(0, _reactMultipleRender2['default'])(_contactCall2['default'], '.bs-contact-call', true);
(0, _reactMultipleRender2['default'])(_lmForm2['default'], '.bs-lm-form', true);
(0, _reactMultipleRender2['default'])(_contactSpain2['default'], '.bs-contact-spain', true);

// jquery calls
(0, _set_menu2['default'])();
(0, _set_menu_mobile2['default'])();
(0, _donate_redirect2['default'])();
(0, _smoothScroll2['default'])();
(0, _toggleViaCrucisNav2['default'])();
(0, _scrollViaCrucisNav2['default'])();
(0, _stickMenu2['default'])();
(0, _toggleMenu2['default'])();

Raven.config('https://c1adcd5efa4f4e82b327c1780b0f7119@sentry.io/251903').install();

/***/ }),
/* 486 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(488), __esModule: true };

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(489);
module.exports = __webpack_require__(15).Object.assign;

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(28);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(490)});

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(70)
  , gOPS     = __webpack_require__(161)
  , pIE      = __webpack_require__(88)
  , toObject = __webpack_require__(79)
  , IObject  = __webpack_require__(156)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(69)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(56)
  , toLength  = __webpack_require__(109)
  , toIndex   = __webpack_require__(492);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(157)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(494), __esModule: true };

/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(15)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
__webpack_require__(80);
__webpack_require__(91);
__webpack_require__(501);
module.exports = __webpack_require__(15).Promise;

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(157)
  , defined   = __webpack_require__(108);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(112)
  , descriptor     = __webpack_require__(86)
  , setToStringTag = __webpack_require__(90)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(55)(IteratorPrototype, __webpack_require__(20)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(37)
  , anObject = __webpack_require__(48)
  , getKeys  = __webpack_require__(70);

module.exports = __webpack_require__(41) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(500)
  , step             = __webpack_require__(230)
  , Iterators        = __webpack_require__(81)
  , toIObject        = __webpack_require__(56);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(163)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 500 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(111)
  , global             = __webpack_require__(29)
  , ctx                = __webpack_require__(54)
  , classof            = __webpack_require__(113)
  , $export            = __webpack_require__(28)
  , isObject           = __webpack_require__(49)
  , aFunction          = __webpack_require__(153)
  , anInstance         = __webpack_require__(164)
  , forOf              = __webpack_require__(114)
  , speciesConstructor = __webpack_require__(502)
  , task               = __webpack_require__(233).set
  , microtask          = __webpack_require__(504)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(20)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(166)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(90)($Promise, PROMISE);
__webpack_require__(234)(PROMISE);
Wrapper = __webpack_require__(15)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(235)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(48)
  , aFunction = __webpack_require__(153)
  , SPECIES   = __webpack_require__(20)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 503 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(29)
  , macrotask = __webpack_require__(233).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(87)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(89);

var _promise2 = _interopRequireDefault(_promise);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _extends3 = __webpack_require__(18);

var _extends4 = _interopRequireDefault(_extends3);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _isEmpty = __webpack_require__(116);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isEmail = __webpack_require__(92);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getCountries = __webpack_require__(251);

var _getCountries2 = _interopRequireDefault(_getCountries);

var _events = __webpack_require__(36);

var _contact = __webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var contactForm = function (_Component) {
  (0, _inherits3['default'])(contactForm, _Component);

  function contactForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, contactForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = contactForm.__proto__ || (0, _getPrototypeOf2['default'])(contactForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      contact: {
        name: '',
        lastname: '',
        email: '',
        country: ''
      },
      errors: {
        name: false,
        lastname: false,
        email: false
      },
      countries: _getCountries2['default'],
      officeCountries: [],
      inOffice: false,
      loading: false,
      showMemberExists: false,
      terms: true
    }, _this.setCountry = function () {
      var countries = _this.props.countries;
      _this.setState({
        contact: (0, _extends4['default'])({}, _this.state.contact, {
          country: _this.props.country
        }),
        officeCountries: countries,
        inOffice: countries.indexOf(_this.props.country) !== -1
      });
    }, _this.checkEmpty = function (field) {
      var hasField = _this.state.contact.hasOwnProperty(field) ? (0, _isEmpty2['default'])(_this.state.contact[field]) : false;
      return hasField;
    }, _this.validate = function () {
      var contact = _this.state.contact;

      var errors = {};
      var name = (0, _isEmpty2['default'])(contact.name);
      var lastname = (0, _isEmpty2['default'])(contact.lastname);
      var email = !(0, _isEmail2['default'])(contact.email);

      errors = (0, _extends4['default'])({}, errors, { name: name, lastname: lastname, email: email });

      var validations = (0, _keys2['default'])(errors).map(function (key) {
        return errors[key];
      });

      if (_this.props.terms === 'true') {
        if (_this.state.terms === false) {
          errors = (0, _extends4['default'])({}, errors, { terms: true });
          validations = validations.concat(true);
        }
      }

      _this.setState({ errors: errors });

      return _promise2['default'].all(validations);
    }, _this.isValid = function () {
      var valid = _this.validate().then(function (arr) {
        return arr.every(function (item) {
          return item === false;
        });
      })['catch'](function (err) {
        return console.log(err);
      });
      return valid;
    }, _this.handleSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
        var isValid;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                _context.prev = 1;
                _context.next = 4;
                return _this.isValid();

              case 4:
                isValid = _context.sent;

                _this.storeContact(isValid);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);

                console.log(_context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 8]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.storeContact = function () {
      var _ref3 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2(isValid) {
        var _this$props, cl, redirect, contact, language, gaEventData, clEventData, fbEventData;

        return _regenerator2['default'].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, cl = _this$props.cl, redirect = _this$props.redirect;
                contact = _this.state.contact;

                if (!(isValid === true)) {
                  _context2.next = 23;
                  break;
                }

                _this.setState({ loading: true });
                _context2.prev = 4;
                _context2.next = 7;
                return (0, _contact.storeConvertLoop)(cl.tags, contact);

              case 7:
                language = window.bs.currentPageLang === 'Español' ? 'SP' : 'EN';
                gaEventData = { category: 'SUBSCRIBE', action: 'SUBSCRIBE_PRAY', label: 'PRAY_' + language };
                _context2.next = 11;
                return (0, _events.storeEvent)('ga_event', gaEventData);

              case 11:
                clEventData = { name: cl.event, person: contact };
                _context2.next = 14;
                return (0, _events.storeEvent)('cl_event', clEventData);

              case 14:
                fbEventData = { eventName: 'Lead' };
                _context2.next = 17;
                return (0, _events.storeEvent)('fb_event', fbEventData);

              case 17:

                setTimeout(function () {
                  return window.location = redirect;
                }, 0);
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](4);

                console.log(_context2.t0);

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[4, 20]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.handleChange = function (e, field) {
      var contact = (0, _extends4['default'])({}, _this.state.contact, (0, _defineProperty3['default'])({}, field, e.target.value));
      _this.setState({ contact: contact });
    }, _this.handleCheckbox = function () {
      _this.setState({ terms: !_this.state.terms });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(contactForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setCountry();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          contact = _state.contact,
          errors = _state.errors;
      var _props = this.props,
          placeholders = _props.placeholders,
          validationMessages = _props.validationMessages,
          texts = _props.texts;


      var inputContainerStyle = {
        width: this.props.vertical === 'true' ? '100%' : '20%'
      };

      var inputStyle = {
        borderRadius: this.props.vertical === 'true' ? '0' : ''
      };

      return _react2['default'].createElement(
        'form',
        {
          style: { textAlign: 'center' },
          className: 'form-inline contact-form',
          onSubmit: this.handleSubmit,
          'data-jsx': 4209863211
        },
        _react2['default'].createElement(
          'div',
          { style: inputContainerStyle, className: 'input-container', 'data-jsx': 4209863211
          },
          _react2['default'].createElement('input', {
            type: 'text',
            placeholder: placeholders.name,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'name');
            },
            value: contact.name,
            style: inputStyle,
            'data-jsx': 4209863211
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.name ? 'input-error' : 'hidden', 'data-jsx': 4209863211
            },
            errors.name,
            ' ',
            validationMessages.name
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: inputContainerStyle, className: 'input-container', 'data-jsx': 4209863211
          },
          _react2['default'].createElement('input', {
            type: 'text',
            placeholder: placeholders.lastname,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'lastname');
            },
            value: contact.lastname,
            style: inputStyle,
            'data-jsx': 4209863211
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.lastname ? 'input-error' : 'hidden', 'data-jsx': 4209863211
            },
            validationMessages.lastname
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: inputContainerStyle, className: 'input-container', 'data-jsx': 4209863211
          },
          _react2['default'].createElement('input', {
            type: 'text',
            placeholder: placeholders.email,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'email');
            },
            value: contact.email,
            style: inputStyle,
            'data-jsx': 4209863211
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.email ? 'input-error' : 'hidden', 'data-jsx': 4209863211
            },
            validationMessages.email
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: inputContainerStyle, className: 'input-container', 'data-jsx': 4209863211
          },
          _react2['default'].createElement(
            'select',
            {
              onChange: function onChange(e) {
                return _this3.handleChange(e, 'country');
              },
              value: contact.country,
              'data-jsx': 4209863211
            },
            _react2['default'].createElement(
              'option',
              { value: '', 'data-jsx': 4209863211
              },
              texts.select_country
            ),
            this.state.countries.map(function (country) {
              return _react2['default'].createElement(
                'option',
                { key: country, value: country, 'data-jsx': 4209863211
                },
                country
              );
            })
          )
        ),
        _react2['default'].createElement(
          'button',
          {
            style: {
              marginLeft: '-2px',
              background: this.props.btnBg,
              color: '#fff'
            },
            className: 'btn',
            onClick: this.handleSubmit,
            disabled: this.state.loading,
            'data-jsx': 4209863211
          },
          texts.button,
          ' ',
          this.state.loading ? '...' : ''
        ),
        this.props.terms === 'true' && _react2['default'].createElement(
          'div',
          { className: 'checkbox', 'data-jsx': 4209863211
          },
          _react2['default'].createElement(
            'label',
            { htmlFor: 'terms', 'data-jsx': 4209863211
            },
            _react2['default'].createElement('input', {
              id: 'terms',
              type: 'checkbox',
              onChange: this.handleCheckbox,
              checked: this.state.terms, 'data-jsx': 4209863211
            }),
            ' ',
            this.props.texts.terms
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container', 'data-jsx': 4209863211
          },
          _react2['default'].createElement(
            'div',
            { className: errors.terms ? 'input-error' : 'hidden', 'data-jsx': 4209863211
            },
            validationMessages.terms
          )
        ),
        _react2['default'].createElement(
          'span',
          {
            className: 'message',
            style: this.state.showMemberExists ? { display: 'inline-block' } : { display: 'none' },
            'data-jsx': 4209863211
          },
          "you're already praying"
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 4209863211,
          css: '.message[data-jsx="4209863211"]{color:#fff;width:90%;padding:10px;margin:5px auto;background:#f4334a}'
        })
      );
    }
  }]);
  return contactForm;
}(_react.Component);

contactForm.displayName = 'contactForm';
contactForm.defaultProps = {
  validationMessages: {},
  placeholders: {},
  texts: {},
  redirect: '',
  btnBg: '',
  cl: {
    event: 'Subscription',
    tags: ''
  },
  vertical: false,
  terms: ''
};


contactForm.propTypes = {
  countries: _propTypes2['default'].array.isRequired,
  country: _propTypes2['default'].string.isRequired,
  placeholders: _propTypes2['default'].object,
  validationMessages: _propTypes2['default'].object,
  cl: _propTypes2['default'].object,
  texts: _propTypes2['default'].object,
  terms: _propTypes2['default'].bool,
  btnBg: _propTypes2['default'].string,
  redirect: _propTypes2['default'].string,
  vertical: _propTypes2['default'].bool
};

exports['default'] = contactForm;

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(28);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(41), 'Object', {defineProperty: __webpack_require__(37).f});

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(204);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(509);
module.exports = __webpack_require__(15).Object.keys;

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(79)
  , $keys    = __webpack_require__(70);

__webpack_require__(238)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(79)
  , $getPrototypeOf = __webpack_require__(229);

__webpack_require__(238)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(241), __esModule: true };

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(242), __esModule: true };

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(29)
  , has            = __webpack_require__(71)
  , DESCRIPTORS    = __webpack_require__(41)
  , $export        = __webpack_require__(28)
  , redefine       = __webpack_require__(227)
  , META           = __webpack_require__(169).KEY
  , $fails         = __webpack_require__(69)
  , shared         = __webpack_require__(159)
  , setToStringTag = __webpack_require__(90)
  , uid            = __webpack_require__(110)
  , wks            = __webpack_require__(20)
  , wksExt         = __webpack_require__(168)
  , wksDefine      = __webpack_require__(170)
  , keyOf          = __webpack_require__(514)
  , enumKeys       = __webpack_require__(515)
  , isArray        = __webpack_require__(243)
  , anObject       = __webpack_require__(48)
  , toIObject      = __webpack_require__(56)
  , toPrimitive    = __webpack_require__(155)
  , createDesc     = __webpack_require__(86)
  , _create        = __webpack_require__(112)
  , gOPNExt        = __webpack_require__(516)
  , $GOPD          = __webpack_require__(245)
  , $DP            = __webpack_require__(37)
  , $keys          = __webpack_require__(70)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(244).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(88).f  = $propertyIsEnumerable;
  __webpack_require__(161).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(111)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(55)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(70)
  , toIObject = __webpack_require__(56);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(70)
  , gOPS    = __webpack_require__(161)
  , pIE     = __webpack_require__(88);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(56)
  , gOPN      = __webpack_require__(244).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170)('asyncIterator');

/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170)('observable');

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(246), __esModule: true };

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(28);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(521).set});

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(49)
  , anObject = __webpack_require__(48);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(54)(Function.call, __webpack_require__(245).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(247), __esModule: true };

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(28)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(112)});

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(171);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(248);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(537);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(538);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(539);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(541);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(544);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.flush = flush;

var _react = __webpack_require__(1);

var _render = __webpack_require__(547);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [];

var _class = function (_Component) {
  (0, _inherits3.default)(_class, _Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      mount(this);
    }

    // To avoid FOUC, we process new changes
    // on `componentWillUpdate` rather than `componentDidUpdate`.

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      update({
        instance: this,
        styleId: nextProps.styleId,
        css: nextProps.css
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      unmount(this);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return _class;
}(_react.Component);

exports.default = _class;


function stylesMap(updated) {
  var ret = new _map2.default();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(components), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      if (updated && c === updated.instance) {
        // On `componentWillUpdate`
        // we use `styleId` and `css` from updated component rather than reading `props`
        // from the component since they haven't been updated yet.
        ret.set(updated.styleId, updated.css);
      } else {
        ret.set(c.props.styleId, c.props.css);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

function flush() {
  var ret = stylesMap();
  components = [];
  return ret;
}

function mount(component) {
  components.push(component);
  update();
}

function unmount(component) {
  var i = components.indexOf(component);
  if (i < 0) {
    return;
  }

  components.splice(i, 1);
  update();
}

function update(updates) {
  (0, _render2.default)(stylesMap(updates));
}

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
__webpack_require__(80);
module.exports = __webpack_require__(526);

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(48)
  , get      = __webpack_require__(165);
module.exports = __webpack_require__(15).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
__webpack_require__(80);
__webpack_require__(91);
__webpack_require__(528);
__webpack_require__(534);
module.exports = __webpack_require__(15).Map;

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(529);

// 23.1 Map Objects
module.exports = __webpack_require__(530)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(37).f
  , create      = __webpack_require__(112)
  , redefineAll = __webpack_require__(166)
  , ctx         = __webpack_require__(54)
  , anInstance  = __webpack_require__(164)
  , defined     = __webpack_require__(108)
  , forOf       = __webpack_require__(114)
  , $iterDefine = __webpack_require__(163)
  , step        = __webpack_require__(230)
  , setSpecies  = __webpack_require__(234)
  , DESCRIPTORS = __webpack_require__(41)
  , fastKey     = __webpack_require__(169).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(29)
  , $export        = __webpack_require__(28)
  , meta           = __webpack_require__(169)
  , fails          = __webpack_require__(69)
  , hide           = __webpack_require__(55)
  , redefineAll    = __webpack_require__(166)
  , forOf          = __webpack_require__(114)
  , anInstance     = __webpack_require__(164)
  , isObject       = __webpack_require__(49)
  , setToStringTag = __webpack_require__(90)
  , dP             = __webpack_require__(37).f
  , each           = __webpack_require__(531)(0)
  , DESCRIPTORS    = __webpack_require__(41);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(54)
  , IObject  = __webpack_require__(156)
  , toObject = __webpack_require__(79)
  , toLength = __webpack_require__(109)
  , asc      = __webpack_require__(532);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(533);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(49)
  , isArray  = __webpack_require__(243)
  , SPECIES  = __webpack_require__(20)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(28);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(535)('Map')});

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(113)
  , from    = __webpack_require__(536);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(114);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(239), __esModule: true };

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 539 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(540);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(237), __esModule: true };

/***/ }),
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(249);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 542 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(241), __esModule: true };

/***/ }),
/* 543 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(242), __esModule: true };

/***/ }),
/* 544 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(545);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(546);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(249);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 545 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(246), __esModule: true };

/***/ }),
/* 546 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(247), __esModule: true };

/***/ }),
/* 547 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(171);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(548);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = __webpack_require__(552);

var _from2 = _interopRequireDefault(_from);

var _map = __webpack_require__(248);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = new _map2.default();
var prevStyles = new _map2.default();

exports.default = typeof window === 'undefined' ? renderOnServer : renderOnClient;


function renderOnServer() {}

function renderOnClient(styles) {
  patch(diff(prevStyles, styles));
  prevStyles = styles;
}

function diff(a, b) {
  var added = (0, _from2.default)(b.entries()).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
        k = _ref2[0];

    return !a.has(k);
  });
  var removed = (0, _from2.default)(a.entries()).filter(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
        k = _ref4[0];

    return !b.has(k);
  });
  return [added, removed];
}

var fromServer = new _map2.default();

function patch(_ref5) {
  var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
      added = _ref6[0],
      removed = _ref6[1];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(added), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          id = _step$value[0],
          css = _step$value[1];

      // Avoid duplicates from server-rendered markup
      if (!fromServer.has(id)) {
        fromServer.set(id, document.getElementById('__jsx-style-' + id));
      }

      var tag = fromServer.get(id) || makeStyleTag(css);
      tags.set(id, tag);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(removed), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray3.default)(_step2.value, 1),
          id = _step2$value[0];

      var t = tags.get(id);
      tags.delete(id);
      t.parentNode.removeChild(t);
      // Avoid checking the DOM later on
      fromServer.delete(id);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function makeStyleTag(str) {
  // Based on implementation by glamor
  var tag = document.createElement('style');
  tag.appendChild(document.createTextNode(str));

  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(tag);

  return tag;
}

/***/ }),
/* 548 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(549);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(171);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 549 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(550), __esModule: true };

/***/ }),
/* 550 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
__webpack_require__(80);
module.exports = __webpack_require__(551);

/***/ }),
/* 551 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(113)
  , ITERATOR  = __webpack_require__(20)('iterator')
  , Iterators = __webpack_require__(81);
module.exports = __webpack_require__(15).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 552 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(553), __esModule: true };

/***/ }),
/* 553 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
__webpack_require__(554);
module.exports = __webpack_require__(15).Array.from;

/***/ }),
/* 554 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(54)
  , $export        = __webpack_require__(28)
  , toObject       = __webpack_require__(79)
  , call           = __webpack_require__(231)
  , isArrayIter    = __webpack_require__(232)
  , toLength       = __webpack_require__(109)
  , createProperty = __webpack_require__(555)
  , getIterFn      = __webpack_require__(165);

$export($export.S + $export.F * !__webpack_require__(235)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 555 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(37)
  , createDesc      = __webpack_require__(86);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 556 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = __webpack_require__(117);

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
/* 557 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;

var _assertString = __webpack_require__(117);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(250);

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
/* 558 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _headerSlide = __webpack_require__(559);

var _headerSlide2 = _interopRequireDefault(_headerSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var headerSlider = function (_Component) {
  (0, _inherits3['default'])(headerSlider, _Component);

  function headerSlider() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, headerSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = headerSlider.__proto__ || (0, _getPrototypeOf2['default'])(headerSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { currentSlide: 0, left: '0' }, _this.getSizes = function () {
      var slides = _this.props.slides;

      var viewportWidth = 100 * slides.length + '%';
      var slideWidth = 100 / slides.length + '%';
      var windowHeight = window.innerHeight;

      var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;

      var sliderHeight = windowHeight && navHeight ? windowHeight - navHeight : 'auto';

      return {
        viewportWidth: viewportWidth,
        sliderHeight: sliderHeight,
        slideWidth: slideWidth
      };
    }, _this.nextSlide = function () {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (clear) clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;

      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _this.prevSlide = function () {
      clearInterval(_this.interval);
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(headerSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.nextSlide(false);
      }, this.props.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _getSizes = this.getSizes(),
          viewportWidth = _getSizes.viewportWidth,
          sliderHeight = _getSizes.sliderHeight,
          slideWidth = _getSizes.slideWidth;

      var slides = this.props.slides;

      var viewportStyle = {
        width: viewportWidth,
        height: sliderHeight,
        left: this.state.left
      };

      var sliderStyle = { height: sliderHeight };

      return _react2['default'].createElement(
        'div',
        { className: 'slider', style: sliderStyle, 'data-jsx': 1296177145
        },
        _react2['default'].createElement(
          'div',
          { className: 'slider__viewport', style: viewportStyle, 'data-jsx': 1296177145
          },
          slides.map(function (slide, i) {
            var slideProp = (0, _extends3['default'])({}, slide, { width: slideWidth, height: sliderHeight });
            return _react2['default'].createElement(_headerSlide2['default'], (0, _extends3['default'])({ key: i }, slideProp));
          })
        ),
        slides.length > 1 && _react2['default'].createElement(
          'div',
          { className: 'slider__btns', 'data-jsx': 1296177145
          },
          _react2['default'].createElement(
            'button',
            { className: 'slider__btns__prev', onClick: this.prevSlide, 'data-jsx': 1296177145
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-left', 'data-jsx': 1296177145
            })
          ),
          _react2['default'].createElement(
            'button',
            { className: 'slider__btns__next', onClick: this.nextSlide, 'data-jsx': 1296177145
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-right', 'data-jsx': 1296177145
            })
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1296177145,
          css: '.slider[data-jsx="1296177145"]{height:100%}.slider__viewport[data-jsx="1296177145"]{width:100%;height:100vh;left:0}'
        })
      );
    }
  }]);
  return headerSlider;
}(_react.Component);

headerSlider.displayName = 'headerSlider';
headerSlider.defaultProps = { slides: [], interval: 5000, anchor: '#' };


headerSlider.propTypes = {
  slides: _propTypes2['default'].array.isRequired,
  interval: _propTypes2['default'].number
};

exports['default'] = headerSlider;

/***/ }),
/* 559 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _videoModal = __webpack_require__(119);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var headerSlide = function (_React$Component) {
  (0, _inherits3['default'])(headerSlide, _React$Component);

  function headerSlide() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, headerSlide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = headerSlide.__proto__ || (0, _getPrototypeOf2['default'])(headerSlide)).call.apply(_ref, [this].concat(args))), _this), _this.handleLink = function (e) {
      e.preventDefault();
      if (_this.props.is_video) return _this.modal.show();
      return setTimeout(function () {
        return window.location.href = _this.props.url;
      }, 0);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(headerSlide, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          image = _props.image,
          image_position = _props.image_position,
          width = _props.width,
          height = _props.height,
          anchor = _props.anchor;

      var style = {
        backgroundPosition: image_position,
        width: width,
        height: height
      };

      return _react2['default'].createElement(
        'div',
        null,
        this.props.is_video && _react2['default'].createElement(_videoModal2['default'], { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }),
        _react2['default'].createElement(
          'div',
          { className: 'slider__slide lazyload', style: style, 'data-bgset': image },
          _react2['default'].createElement('a', { href: '#', className: 'slider__slide__link-zone', onClick: this.handleLink }),
          _react2['default'].createElement(
            'a',
            { href: anchor, className: 'slider__slide__anchor' },
            _react2['default'].createElement(
              'svg',
              { width: '50px', height: '57px', viewBox: '178 602 20 27', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
              _react2['default'].createElement(
                'defs',
                null,
                _react2['default'].createElement('polyline', { id: 'path-1', points: '16.9743561 9.37612525 16.9743561 23.0775777 2.91233907 23.0775777' }),
                _react2['default'].createElement(
                  'mask',
                  { id: 'mask-2', maskContentUnits: 'userSpaceOnUse', maskUnits: 'objectBoundingBox', x: '0', y: '0', width: '14.062017', height: '13.7014524', fill: 'white' },
                  _react2['default'].createElement('use', { xlinkHref: '#path-1' })
                ),
                _react2['default'].createElement('polyline', { id: 'path-3', points: '16.9743561 3.23766371 16.9743561 16.9391162 2.91233907 16.9391162' }),
                _react2['default'].createElement(
                  'mask',
                  { id: 'mask-4', maskContentUnits: 'userSpaceOnUse', maskUnits: 'objectBoundingBox', x: '0', y: '0', width: '14.062017', height: '13.7014524', fill: 'white' },
                  _react2['default'].createElement('use', { xlinkHref: '#path-3' })
                )
              ),
              _react2['default'].createElement(
                'g',
                { id: 'Group-12', stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd', transform: 'translate(178.000000, 602.000000)' },
                _react2['default'].createElement('use', { id: 'Rectangle', stroke: '#F1364E', mask: 'url(#mask-2)', strokeWidth: '4', transform: 'translate(9.943348, 16.226851) rotate(-315.000000) translate(-9.943348, -16.226851) ', xlinkHref: '#path-1' }),
                _react2['default'].createElement('use', { id: 'Rectangle-Copy', stroke: '#F1364E', mask: 'url(#mask-4)', strokeWidth: '4', transform: 'translate(9.943348, 10.088390) rotate(-315.000000) translate(-9.943348, -10.088390) ', xlinkHref: '#path-3' })
              )
            )
          )
        )
      );
    }
  }]);
  return headerSlide;
}(_react2['default'].Component);

headerSlide.displayName = 'headerSlide';


headerSlide.propTypes = {
  image: _propTypes2['default'].string.isRequired,
  image_position: _propTypes2['default'].string.isRequired,
  anchor: _propTypes2['default'].string.isRequired,
  url: _propTypes2['default'].string.isRequired,
  width: _propTypes2['default'].string.isRequired,
  height: _propTypes2['default'].string.isRequired,
  is_video: _propTypes2['default'].string.isRequired
};

exports['default'] = headerSlide;

/***/ }),
/* 560 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(119);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SectionVideoContent = function (_React$Component) {
  (0, _inherits3['default'])(SectionVideoContent, _React$Component);

  function SectionVideoContent() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, SectionVideoContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = SectionVideoContent.__proto__ || (0, _getPrototypeOf2['default'])(SectionVideoContent)).call.apply(_ref, [this].concat(args))), _this), _this.showVideo = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(SectionVideoContent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var h = window.innerHeight - 100;

      return _react2['default'].createElement(
        'div',
        {
          'data-jsx': 3417082546
        },
        _react2['default'].createElement(_videoModal2['default'], { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: this.props.url }),
        _react2['default'].createElement(
          'div',
          {
            className: 'video-content__bg-container',
            style: { background: 'url(' + this.props.imgUrl + ')', height: this.props.fullHeight ? h : '900px' },
            'data-jsx': 3417082546
          },
          _react2['default'].createElement('a', {
            href: '#',
            className: 'image-video__link',
            onClick: this.showVideo,
            'data-jsx': 3417082546
          }),
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content }, 'data-jsx': 3417082546
          })
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 3417082546,
          css: '.video-content__bg-container[data-jsx="3417082546"]{float:left;line-height:0;background-size:cover;background-position:center;width:100%}.image-video__link[data-jsx="3417082546"]{left:0;right:0;bottom:0;top:0;width:100%;position:absolute}@media (max-width:767px){.video-content__bg-container[data-jsx="3417082546"]{height:auto}}'
        })
      );
    }
  }]);
  return SectionVideoContent;
}(_react2['default'].Component);

SectionVideoContent.displayName = 'SectionVideoContent';
SectionVideoContent.defaultProps = {
  imgUrl: '',
  url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
  content: '',
  fullHeight: false
};
exports['default'] = SectionVideoContent;

/***/ }),
/* 561 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(255);

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
/* 562 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ }),
/* 563 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(254),
    isSymbol = __webpack_require__(564);

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
/* 564 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(565),
    isObjectLike = __webpack_require__(568);

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
/* 565 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(256),
    getRawTag = __webpack_require__(566),
    objectToString = __webpack_require__(567);

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
/* 566 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(256);

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
/* 567 */
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
/* 568 */
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
/* 569 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__(93);

var _debounce2 = _interopRequireDefault(_debounce);

var _projectsIcons = __webpack_require__(257);

var _projectsIcons2 = _interopRequireDefault(_projectsIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  (0, _inherits3["default"])(ProjectsInfo, _Component);

  function ProjectsInfo(props) {
    (0, _classCallCheck3["default"])(this, ProjectsInfo);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (ProjectsInfo.__proto__ || (0, _getPrototypeOf2["default"])(ProjectsInfo)).call(this, props));

    _this.handleSection = function (section, e) {
      _this.setState({ section: section });
      _this.moveArrow(section);
    };

    _this.moveArrow = function (num) {
      var left = _this.el.querySelector(".projects__icons li:nth-child(" + num + ")").offsetLeft;
      _this.el.querySelector(".projects__arrow").style.left = left + "px";
    };

    _this.state = {
      section: 9,
      projects: []
    };
    return _this;
  }

  (0, _createClass3["default"])(ProjectsInfo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var num = this.state.section;

      window.addEventListener("resize", (0, _debounce2["default"])(function (event) {
        _this2.moveArrow(_this2.state.section);
      }, 200));

      setTimeout(function () {
        _this2.moveArrow(num);
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var section = this.state.section - 1;

      return _react2["default"].createElement(
        "div",
        { ref: function ref(el) {
            return _this3.el = el;
          }, "data-jsx": 3673750837
        },
        _react2["default"].createElement(_projectsIcons2["default"], { onChange: this.handleSection }),
        _react2["default"].createElement(
          "div",
          { className: "project-info__section", style: { background: colors[this.state.section] }, "data-jsx": 3673750837
          },
          _react2["default"].createElement("div", { className: "projects__arrow", "data-jsx": 3673750837
          }),
          _react2["default"].createElement(
            "span",
            { className: "project-info__num", "data-jsx": 3673750837
            },
            this.props.projects[section] ? this.props.projects[section].number : ""
          ),
          _react2["default"].createElement(
            "span",
            { style: { fontSize: "30px" }, "data-jsx": 3673750837
            },
            this.props.projects[section] ? this.props.projects[section].number_text : ""
          )
        ),
        _react2["default"].createElement(_style2["default"], {
          styleId: 3673750837,
          css: ".project-info__section[data-jsx=\"3673750837\"]{padding:40px;-webkit-text-align:center;text-align:center;color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative}.project-info__num[data-jsx=\"3673750837\"]{font-size:4em;margin-right:60px}@media (max-width:767px){.project-info__section[data-jsx=\"3673750837\"]{display:'block'}.project-info__num[data-jsx=\"3673750837\"]{margin:0;display:block}}"
        })
      );
    }
  }]);
  return ProjectsInfo;
}(_react.Component);

ProjectsInfo.displayName = "ProjectsInfo";
exports["default"] = ProjectsInfo;

/***/ }),
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dompurify = __webpack_require__(571);

var _dompurify2 = _interopRequireDefault(_dompurify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Accordion = function (_Component) {
  (0, _inherits3['default'])(Accordion, _Component);

  function Accordion() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Accordion.__proto__ || (0, _getPrototypeOf2['default'])(Accordion)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _this.toggle = function () {
      _this.setState({ show: !_this.state.show });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Accordion, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      return { content: '', btnTitle: 'Toggle' };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          content = _props.content,
          btnTitle = _props.btnTitle,
          background = _props.background,
          titleColor = _props.titleColor;

      var cleanContent = _dompurify2['default'].sanitize(content);
      var btnStyle = {
        color: titleColor,
        background: background
      };

      return _react2['default'].createElement(
        'div',
        { className: 'accordion', 'data-jsx': 1708357476
        },
        _react2['default'].createElement(
          'button',
          {
            className: 'accordion__btn',
            style: btnStyle,
            onClick: this.toggle,
            'data-jsx': 1708357476
          },
          btnTitle,
          ' ',
          _react2['default'].createElement('i', {
            className: this.state.show ? 'ion-chevron-up' : 'ion-chevron-down',
            'data-jsx': 1708357476
          })
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'accordion__content',
            style: this.state.show ? { display: 'block' } : { display: 'none' },
            'data-jsx': 1708357476
          },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: cleanContent }, 'data-jsx': 1708357476
          })
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1708357476,
          css: '.accordion__btn[data-jsx="1708357476"]{width:100%;height:60px;border:none;border-radius:0;font-size:18px;font-weight:normal}.accordion__content[data-jsx="1708357476"]{background:rgba(180, 191, 194, 0.9)}.accordion__content[data-jsx="1708357476"] p[data-jsx="1708357476"]{margin:0}'
        })
      );
    }
  }]);
  return Accordion;
}(_react.Component);

Accordion.displayName = 'Accordion';
Accordion.defaultProps = {
  background: '#687f87',
  titleColor: '',
  content: '',
  btnTitle: ''
};


Accordion.propTypes = {
  content: _propTypes2['default'].string,
  btnTitle: _propTypes2['default'].string,
  background: _propTypes2['default'].string,
  titleColor: _propTypes2['default'].string
};

exports['default'] = Accordion;

/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DOMPurify = factory());
}(this, (function () { 'use strict';

var html = ['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];

// SVG
var svg = ['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern'];

var svgFilters = ['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence'];

var mathMl = ['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmuliscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mpspace', 'msqrt', 'mystyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover'];

var text = ['#text'];

var html$1 = ['accept', 'action', 'align', 'alt', 'autocomplete', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'coords', 'datetime', 'default', 'dir', 'disabled', 'download', 'enctype', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'ismap', 'label', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'multiple', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'span', 'srclang', 'start', 'src', 'step', 'style', 'summary', 'tabindex', 'title', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns'];

var svg$1 = ['accent-height', 'accumulate', 'additivive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan'];

var mathMl$1 = ['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns'];

var xml = ['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink'];

/* Add properties to a lookup table */
function addToSet(set, array) {
  var l = array.length;
  while (l--) {
    if (typeof array[l] === 'string') {
      array[l] = array[l].toLowerCase();
    }
    set[array[l]] = true;
  }
  return set;
}

/* Shallow clone an object */
function clone(object) {
  var newObject = {};
  var property = void 0;
  for (property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      newObject[property] = object[property];
    }
  }
  return newObject;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};

function createDOMPurify() {
  var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

  var DOMPurify = function DOMPurify(root) {
    return createDOMPurify(root);
  };

  /**
      * Version label, exposed for easier checks
      * if DOMPurify is up to date or not
      */
  DOMPurify.version = '1.0.2';

  /**
    * Array of elements that DOMPurify removed during sanitation.
    * Empty if nothing was removed.
    */
  DOMPurify.removed = [];

  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;

    return DOMPurify;
  }

  var originalDocument = window.document;
  var useDOMParser = false; // See comment below
  var useXHR = false;

  var document = window.document;
  var DocumentFragment = window.DocumentFragment,
      HTMLTemplateElement = window.HTMLTemplateElement,
      Node = window.Node,
      NodeFilter = window.NodeFilter,
      _window$NamedNodeMap = window.NamedNodeMap,
      NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
      Text = window.Text,
      Comment = window.Comment,
      DOMParser = window.DOMParser,
      _window$XMLHttpReques = window.XMLHttpRequest,
      XMLHttpRequest = _window$XMLHttpReques === undefined ? window.XMLHttpRequest : _window$XMLHttpReques,
      _window$encodeURI = window.encodeURI,
      encodeURI = _window$encodeURI === undefined ? window.encodeURI : _window$encodeURI;

  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.

  if (typeof HTMLTemplateElement === 'function') {
    var template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }

  var _document = document,
      implementation = _document.implementation,
      createNodeIterator = _document.createNodeIterator,
      getElementsByTagName = _document.getElementsByTagName,
      createDocumentFragment = _document.createDocumentFragment;

  var importNode = originalDocument.importNode;

  var hooks = {};

  /**
    * Expose whether this browser supports running the full DOMPurify.
    */
  DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && document.documentMode !== 9;

  /**
    * We consider the elements and attributes below to be safe. Ideally
    * don't add any new ones but feel free to remove unwanted ones.
    */

  /* allowed element names */
  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(svgFilters), _toConsumableArray(mathMl), _toConsumableArray(text)));

  /* Allowed attribute names */
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(mathMl$1), _toConsumableArray(xml)));

  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  var FORBID_TAGS = null;

  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  var FORBID_ATTR = null;

  /* Decide if ARIA attributes are okay */
  var ALLOW_ARIA_ATTR = true;

  /* Decide if custom data attributes are okay */
  var ALLOW_DATA_ATTR = true;

  /* Decide if unknown protocols are okay */
  var ALLOW_UNKNOWN_PROTOCOLS = false;

  /* Output should be safe for jQuery's $() factory? */
  var SAFE_FOR_JQUERY = false;

  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  var SAFE_FOR_TEMPLATES = false;

  /* Specify template detection regex for SAFE_FOR_TEMPLATES mode */
  var MUSTACHE_EXPR = /\{\{[\s\S]*|[\s\S]*\}\}/gm;
  var ERB_EXPR = /<%[\s\S]*|[\s\S]*%>/gm;

  /* Decide if document with <html>... should be returned */
  var WHOLE_DOCUMENT = false;

  /* Track whether config is already set on this instance of DOMPurify. */
  var SET_CONFIG = false;

  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  var FORCE_BODY = false;

  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html string.
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  var RETURN_DOM = false;

  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html string */
  var RETURN_DOM_FRAGMENT = false;

  /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
   * `Node` is imported into the current `Document`. If this flag is not enabled the
   * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
   * DOMPurify. */
  var RETURN_DOM_IMPORT = false;

  /* Output should be free from DOM clobbering attacks? */
  var SANITIZE_DOM = true;

  /* Keep element content when removing element? */
  var KEEP_CONTENT = true;

  /* Allow usage of profiles like html, svg and mathMl */
  var USE_PROFILES = {};

  /* Tags to ignore content of when KEEP_CONTENT is true */
  var FORBID_CONTENTS = addToSet({}, ['audio', 'head', 'math', 'script', 'style', 'template', 'svg', 'video']);

  /* Tags that are safe for data: URIs */
  var DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image']);

  /* Attributes safe for values like "javascript:" */
  var URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

  /* Keep a reference to config to pass to hooks */
  var CONFIG = null;

  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */

  var formElement = document.createElement('form');

  /**
  * _parseConfig
  *
  * @param  optional config literal
  */
  // eslint-disable-next-line complexity
  var _parseConfig = function _parseConfig(cfg) {
    /* Shield configuration object from tampering */
    if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
      cfg = {};
    }

    /* Set configuration parameters */
    ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
    FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
    FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
    USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    SAFE_FOR_JQUERY = cfg.SAFE_FOR_JQUERY || false; // Default false
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }

    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }

    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(text)));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html);
        addToSet(ALLOWED_ATTR, html$1);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl);
        addToSet(ALLOWED_ATTR, mathMl$1);
        addToSet(ALLOWED_ATTR, xml);
      }
    }

    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
    }

    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }

    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (Object && 'freeze' in Object) {
      Object.freeze(cfg);
    }

    CONFIG = cfg;
  };

  /**
  * _forceRemove
  *
  * @param  a DOM node
  */
  var _forceRemove = function _forceRemove(node) {
    DOMPurify.removed.push({ element: node });
    try {
      node.parentNode.removeChild(node);
    } catch (err) {
      node.outerHTML = '';
    }
  };

  /**
  * _removeAttribute
  *
  * @param  an Attribute name
  * @param  a DOM node
  */
  var _removeAttribute = function _removeAttribute(name, node) {
    DOMPurify.removed.push({
      attribute: node.getAttributeNode(name),
      from: node
    });
    node.removeAttribute(name);
  };

  /**
  * _initDocument
  *
  * @param  a string of dirty markup
  * @return a DOM, filled with the dirty markup
  */
  var _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    var doc = void 0;
    var body = void 0;

    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    }

    /* Use XHR if necessary because Safari 10.1 and newer are buggy */
    if (useXHR) {
      try {
        dirty = encodeURI(dirty);
      } catch (err) {}
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'document';
      xhr.open('GET', 'data:text/html;charset=utf-8,' + dirty, false);
      xhr.send(null);
      doc = xhr.response;
    }

    /* Use DOMParser to workaround Firefox bug (see comment below) */
    if (useDOMParser) {
      try {
        doc = new DOMParser().parseFromString(dirty, 'text/html');
      } catch (err) {}
    }

    /* Otherwise use createHTMLDocument, because DOMParser is unsafe in
    Safari (see comment below) */
    if (!doc || !doc.documentElement) {
      doc = implementation.createHTMLDocument('');
      body = doc.body;
      body.parentNode.removeChild(body.parentNode.firstElementChild);
      body.outerHTML = dirty;
    }

    /* Work on whole document or just its body */
    return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
  };

  // Safari 10.1+ (unfixed as of time of writing) has a catastrophic bug in
  // its implementation of DOMParser such that the following executes the
  // JavaScript:
  //
  // new DOMParser()
  //   .parseFromString('<svg onload=alert(document.domain)>', 'text/html');
  //
  // Later, it was also noticed that even more assumed benign and inert ways
  // of creating a document are now insecure thanks to Safari. So we work
  // around that with a feature test and use XHR to create the document in
  // case we really have to. That one seems safe for now.
  //
  // However, Firefox uses a different parser for innerHTML rather than
  // DOMParser (see https://bugzilla.mozilla.org/show_bug.cgi?id=1205631)
  // which means that you *must* use DOMParser, otherwise the output may
  // not be safe if used in a document.write context later.
  //
  // So we feature detect the Firefox bug and use the DOMParser if necessary.
  if (DOMPurify.isSupported) {
    (function () {
      var doc = _initDocument('<svg><g onload="this.parentNode.remove()"></g></svg>');
      if (!doc.querySelector('svg')) {
        useXHR = true;
      }
      try {
        doc = _initDocument('<svg><p><style><img src="</style><img src=x onerror=alert(1)//">');
        if (doc.querySelector('svg img')) {
          useDOMParser = true;
        }
      } catch (err) {}
    })();
  }

  /**
  * _createIterator
  *
  * @param  document/fragment to create iterator for
  * @return iterator instance
  */
  var _createIterator = function _createIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
      return NodeFilter.FILTER_ACCEPT;
    }, false);
  };

  /**
  * _isClobbered
  *
  * @param  element to check for clobbering attacks
  * @return true if clobbered, false if safe
  */
  var _isClobbered = function _isClobbered(elm) {
    if (elm instanceof Text || elm instanceof Comment) {
      return false;
    }
    if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function') {
      return true;
    }
    return false;
  };

  /**
  * _isNode
  *
  * @param object to check whether it's a DOM node
  * @return true is object is a DOM node
  */
  var _isNode = function _isNode(obj) {
    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
  };

  /**
  * _executeHook
  * Execute user configurable hooks
  *
  * @param  {String} entryPoint  Name of the hook's entry point
  * @param  {Node} currentNode
  */
  var _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }

    hooks[entryPoint].forEach(function (hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };

  /**
  * _sanitizeElements
  *
  * @protect nodeName
  * @protect textContent
  * @protect removeChild
  *
  * @param   node to check for permission to exist
  * @return  true if node was killed, false if left alive
  */
  var _sanitizeElements = function _sanitizeElements(currentNode) {
    var content = void 0;

    /* Execute a hook if present */
    _executeHook('beforeSanitizeElements', currentNode, null);

    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Now let's check the element's type and name */
    var tagName = currentNode.nodeName.toLowerCase();

    /* Execute a hook if present */
    _executeHook('uponSanitizeElement', currentNode, {
      tagName: tagName,
      allowedTags: ALLOWED_TAGS
    });

    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Keep content except for black-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
        try {
          currentNode.insertAdjacentHTML('AfterEnd', currentNode.innerHTML);
        } catch (err) {}
      }
      _forceRemove(currentNode);
      return true;
    }

    /* Convert markup to cover jQuery behavior */
    if (SAFE_FOR_JQUERY && !currentNode.firstElementChild && (!currentNode.content || !currentNode.content.firstElementChild) && /</g.test(currentNode.textContent)) {
      DOMPurify.removed.push({ element: currentNode.cloneNode() });
      currentNode.innerHTML = currentNode.textContent.replace(/</g, '&lt;');
    }

    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      content = content.replace(MUSTACHE_EXPR, ' ');
      content = content.replace(ERB_EXPR, ' ');
      if (currentNode.textContent !== content) {
        DOMPurify.removed.push({ element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeElements', currentNode, null);

    return false;
  };

  var DATA_ATTR = /^data-[\-\w.\u00B7-\uFFFF]/; // eslint-disable-line no-useless-escape
  var ARIA_ATTR = /^aria-[\-\w]+$/; // eslint-disable-line no-useless-escape
  var IS_ALLOWED_URI = /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i; // eslint-disable-line no-useless-escape
  var IS_SCRIPT_OR_DATA = /^(?:\w+script|data):/i;
  /* This needs to be extensive thanks to Webkit/Blink's behavior */
  var ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g;

  /**
  * _sanitizeAttributes
  *
  * @protect attributes
  * @protect nodeName
  * @protect removeAttribute
  * @protect setAttribute
  *
  * @param   node to sanitize
  * @return  void
  */
  // eslint-disable-next-line complexity
  var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    var attr = void 0;
    var name = void 0;
    var value = void 0;
    var lcName = void 0;
    var idAttr = void 0;
    var attributes = void 0;
    var l = void 0;
    /* Execute a hook if present */
    _executeHook('beforeSanitizeAttributes', currentNode, null);

    attributes = currentNode.attributes;

    /* Check if we have attributes; if not we might have a text node */
    if (!attributes) {
      return;
    }

    var hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;

    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      attr = attributes[l];
      name = attr.name;
      value = attr.value.trim();
      lcName = name.toLowerCase();

      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;

      /* Remove attribute */
      // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
      // remove a "name" attribute from an <img> tag that has an "id"
      // attribute at the time.
      if (lcName === 'name' && currentNode.nodeName === 'IMG' && attributes.id) {
        idAttr = attributes.id;
        attributes = Array.prototype.slice.apply(attributes);
        _removeAttribute('id', currentNode);
        _removeAttribute(name, currentNode);
        if (attributes.indexOf(idAttr) > l) {
          currentNode.setAttribute('id', idAttr.value);
        }
      } else if (
      // This works around a bug in Safari, where input[type=file]
      // cannot be dynamically set after type has been removed
      currentNode.nodeName === 'INPUT' && lcName === 'type' && value === 'file' && (ALLOWED_ATTR[lcName] || !FORBID_ATTR[lcName])) {
        continue;
      } else {
        // This avoids a crash in Safari v9.0 with double-ids.
        // The trick is to first set the id to be empty and then to
        // remove the attribute
        if (name === 'id') {
          currentNode.setAttribute(name, '');
        }
        _removeAttribute(name, currentNode);
      }

      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }

      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in window || value in document || value in formElement)) {
        continue;
      }

      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        value = value.replace(MUSTACHE_EXPR, ' ');
        value = value.replace(ERB_EXPR, ' ');
      }

      /* Allow valid data-* attributes: At least one character after "-"
         (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
         XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
         We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && DATA_ATTR.test(lcName)) {
        // This attribute is safe
      } else if (ALLOW_ARIA_ATTR && ARIA_ATTR.test(lcName)) {
        // This attribute is safe
        /* Otherwise, check the name is permitted */
      } else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        continue;

        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) {
        // This attribute is safe
        /* Check no script, data or unknown possibly unsafe URI
         unless we know URI values are safe for that attribute */
      } else if (IS_ALLOWED_URI.test(value.replace(ATTR_WHITESPACE, ''))) {
        // This attribute is safe
        /* Keep image data URIs alive if src/xlink:href is allowed */
      } else if ((lcName === 'src' || lcName === 'xlink:href') && value.indexOf('data:') === 0 && DATA_URI_TAGS[currentNode.nodeName.toLowerCase()]) {
        // This attribute is safe
        /* Allow unknown protocols: This provides support for links that
         are handled by protocol handlers which may be unknown ahead of
         time, e.g. fb:, spotify: */
      } else if (ALLOW_UNKNOWN_PROTOCOLS && !IS_SCRIPT_OR_DATA.test(value.replace(ATTR_WHITESPACE, ''))) {
        // This attribute is safe
        /* Check for binary attributes */
        // eslint-disable-next-line no-negated-condition
      } else if (!value) {
        // Binary attributes are safe at this point
        /* Anything else, presume unsafe, do not add it back */
      } else {
        continue;
      }

      /* Handle invalid data-* attribute set by try-catching it */
      try {
        currentNode.setAttribute(name, value);
        DOMPurify.removed.pop();
      } catch (err) {}
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeAttributes', currentNode, null);
  };

  /**
  * _sanitizeShadowDOM
  *
  * @param  fragment to iterate over recursively
  * @return void
  */
  var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    var shadowNode = void 0;
    var shadowIterator = _createIterator(fragment);

    /* Execute a hook if present */
    _executeHook('beforeSanitizeShadowDOM', fragment, null);

    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);

      /* Sanitize tags and elements */
      if (_sanitizeElements(shadowNode)) {
        continue;
      }

      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(shadowNode);
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };

  /**
  * Sanitize
  * Public method providing core sanitation functionality
  *
  * @param {String|Node} dirty string or DOM node
  * @param {Object} configuration object
  */
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty, cfg) {
    var body = void 0;
    var importedNode = void 0;
    var currentNode = void 0;
    var oldNode = void 0;
    var returnNode = void 0;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    if (!dirty) {
      dirty = '<!-->';
    }

    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      // eslint-disable-next-line no-negated-condition
      if (typeof dirty.toString !== 'function') {
        throw new TypeError('toString is not a function');
      } else {
        dirty = dirty.toString();
      }
    }

    /* Check we can run. Otherwise fall back or ignore */
    if (!DOMPurify.isSupported) {
      if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
        if (typeof dirty === 'string') {
          return window.toStaticHTML(dirty);
        } else if (_isNode(dirty)) {
          return window.toStaticHTML(dirty.outerHTML);
        }
      }
      return dirty;
    }

    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }

    /* Clean up removed elements */
    DOMPurify.removed = [];

    if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!-->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !WHOLE_DOCUMENT && dirty.indexOf('<') === -1) {
        return dirty;
      }

      /* Initialize the document to work on */
      body = _initDocument(dirty);

      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : '';
      }
    }

    /* Remove first element node (ours) if FORCE_BODY is set */
    if (FORCE_BODY) {
      _forceRemove(body.firstChild);
    }

    /* Get node iterator */
    var nodeIterator = _createIterator(body);

    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Fix IE's strange behavior with manipulated textNodes #89 */
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }

      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }

      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(currentNode);

      oldNode = currentNode;
    }

    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);

        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }

      if (RETURN_DOM_IMPORT) {
        /* AdoptNode() is not used because internal state is not reset
               (e.g. the past names map of a HTMLFormElement), this is safe
               in theory but we would rather not risk another attack vector.
               The state that is cloned by importNode() is explicitly defined
               by the specs. */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }

      return returnNode;
    }

    return WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
  };

  /**
  * Public method to set the configuration once
  * setConfig
  *
  * @param {Object} configuration object
  * @return void
  */
  DOMPurify.setConfig = function (cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };

  /**
  * Public method to remove the configuration
  * clearConfig
  *
  * @return void
  */
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };

  /**
  * AddHook
  * Public method to add DOMPurify hooks
  *
  * @param {String} entryPoint
  * @param {Function} hookFunction
  */
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    hooks[entryPoint].push(hookFunction);
  };

  /**
  * RemoveHook
  * Public method to remove a DOMPurify hook at a given entryPoint
  * (pops it from the stack of hooks if more are present)
  *
  * @param {String} entryPoint
  * @return void
  */
  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint].pop();
    }
  };

  /**
  * RemoveHooks
  * Public method to remove all DOMPurify hooks at a given entryPoint
  *
  * @param  {String} entryPoint
  * @return void
  */
  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };

  /**
  * RemoveAllHooks
  * Public method to remove all DOMPurify hooks
  *
  * @return void
  */
  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };

  return DOMPurify;
}

var purify = createDOMPurify();

return purify;

})));
//# sourceMappingURL=purify.js.map


/***/ }),
/* 572 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _minigrid = __webpack_require__(220);

var _minigrid2 = _interopRequireDefault(_minigrid);

var _debounce = __webpack_require__(93);

var _debounce2 = _interopRequireDefault(_debounce);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _post = __webpack_require__(573);

var _post2 = _interopRequireDefault(_post);

var _fetch_wp = __webpack_require__(115);

var _fetch_wp2 = _interopRequireDefault(_fetch_wp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Posts = function (_React$Component) {
  (0, _inherits3['default'])(Posts, _React$Component);

  function Posts() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Posts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Posts.__proto__ || (0, _getPrototypeOf2['default'])(Posts)).call.apply(_ref, [this].concat(args))), _this), _this.state = { posts: [], paged: 1, seeMore: true }, _this.getPosts = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee() {
      var posts;
      return _regenerator2['default'].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch_wp2['default'])('get_posts');

            case 2:
              posts = _context.sent;

              _this.setState({ posts: posts.data });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.initGrid = function () {
      var posts = _this.state.posts;


      if (posts && posts.length > 0) {
        var container = _this.grid;
        var grid = new _minigrid2['default']({ container: container, item: '.grid-item' });
        grid.mount();
      }
    }, _this.goToPosts = function () {
      window.location = _this.props.see_more_link;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Posts, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getPosts();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', (0, _debounce2['default'])(this.initGrid, 300));
      this.initGrid();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.initGrid();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state$posts = this.state.posts,
          posts = _state$posts === undefined ? [] : _state$posts;


      var postMain = posts.map(function (post, i) {
        if (i === 0) {
          return _react2['default'].createElement(_post2['default'], (0, _extends3['default'])({
            key: post.ID,
            onImageLoaded: _this3.initGrid
          }, _this3.props, {
            type: 'main',
            post: post
          }));
        }
      });

      var postsNodes = posts.map(function (post, i) {
        if (i !== 0) {
          return _react2['default'].createElement(_post2['default'], (0, _extends3['default'])({
            key: post.ID,
            onImageLoaded: _this3.initGrid
          }, _this3.props, {
            type: 'item',
            post: post
          }));
        }
      });

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { ref: function ref(grid) {
              return _this3.grid = grid;
            } },
          postMain,
          _react2['default'].createElement(
            'div',
            { className: 'grid-items' },
            postsNodes
          )
        ),
        _react2['default'].createElement(
          'button',
          {
            style: { display: 'block' },
            onClick: this.goToPosts,
            className: this.state.seeMore ? 'bs-see-more' : 'hidden'
          },
          this.props.see_more
        )
      );
    }
  }]);
  return Posts;
}(_react2['default'].Component);

Posts.displayName = 'Posts';


Posts.propTypes = {
  see_more: _propTypes2['default'].string.isRequired,
  see_more_link: _propTypes2['default'].string.isRequired
};
exports['default'] = Posts;

/***/ }),
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = __webpack_require__(36);

var _cookies = __webpack_require__(167);

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var cleanEmpty = function cleanEmpty(arrArg) {
  return arrArg.filter(function (item) {
    return item.length > 0;
  });
};

var Post = function (_React$Component) {
  (0, _inherits3['default'])(Post, _React$Component);

  function Post() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Post);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Post.__proto__ || (0, _getPrototypeOf2['default'])(Post)).call.apply(_ref, [this].concat(args))), _this), _this.handleImageLoaded = function () {
      _this.props.onImageLoaded();
    }, _this.goToPost = function (e) {
      e.preventDefault();
      var post = _this.props.post;

      var pid = _cookies2['default'].dp_pid;
      var event = {
        name: 'READPOST',
        person: { pid: pid },
        metadata: {
          url: post.post_permalink
        }
      };

      (0, _events.storeEvent)('cl_event', event).then(function () {
        window.location = post.post_permalink;
      });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Post, [{
    key: 'render',
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
      var title = post_title || '';
      var short = post.post_short ? post.post_short : '';

      if (window.innerWidth <= '767') {
        title = title.substring(0, 70) + '...';
      }

      return _react2['default'].createElement(
        'div',
        {
          className: type === 'main' ? 'grid-item grid-item--main' : 'grid-item'
        },
        _react2['default'].createElement(
          'div',
          {
            className: type === 'main' ? 'grid-item__content grid-item--main__content' : 'grid-item__content'
          },
          _react2['default'].createElement(
            'a',
            { onClick: this.goToPost, href: post.post_permalink },
            imgUrl.length > 0 ? _react2['default'].createElement('img', { 'data-src': imgUrl, className: 'lazyload', onLoad: this.handleImageLoaded }) : _react2['default'].createElement('div', null)
          ),
          _react2['default'].createElement(
            'div',
            {
              className: type === 'main' ? 'grid-item__content__texts grid-item--main__content__texts' : 'grid-item__content__texts',
              style: !imgUrl.length > 0 ? { width: '100%' } : {}
            },
            _react2['default'].createElement(
              'h5',
              null,
              _react2['default'].createElement(
                'a',
                { href: post.post_permalink, onClick: this.goToPost },
                title
              )
            ),
            _react2['default'].createElement(
              'p',
              null,
              short.substring(0, 220) + '...'
            ),
            _react2['default'].createElement(
              'a',
              {
                href: post.post_permalink,
                onClick: this.goToPost,
                className: 'grid-item__content__texts__readmore'
              },
              read_more,
              '...'
            )
          )
        )
      );
    }
  }]);
  return Post;
}(_react2['default'].Component);

Post.displayName = 'Post';
Post.defaultProps = {
  post: {
    post_title: '',
    type: ''
  }
};


Post.propTypes = {
  onImageLoaded: _propTypes2['default'].func.isRequired,
  post: _propTypes2['default'].object,
  type: _propTypes2['default'].string.isRequired,
  read_more: _propTypes2['default'].string.isRequired
};

exports['default'] = Post;

/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _amount = __webpack_require__(172);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(173);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(174);

var _contact2 = _interopRequireDefault(_contact);

var _donate = __webpack_require__(120);

var actions = _interopRequireWildcard(_donate);

var _events = __webpack_require__(36);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _keys2['default'])(errors).every(function (key) {
    return errors[key] === true;
  });
}

var Donate = function (_Component) {
  (0, _inherits3['default'])(Donate, _Component);

  function Donate() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Donate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Donate.__proto__ || (0, _getPrototypeOf2['default'])(Donate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      loading: false,
      donation_type: 'monthly',
      amount: 30,
      currency: 'usd',
      contact: {
        name: '',
        email: '',
        country: _this.props.texts.country
      },
      stripe: {
        card_type: '',
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        token: ''
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four_step: false,
      show_titles: false
    }, _this.handleChange = function (field) {
      _this.setState((0, _extends3['default'])({}, _this.state, field));
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.nextSection();
    }, _this.completeTransaction = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee() {
      var _this$state, amount, donation_type, contact, base, stripeCharge, id, action, label, gaEvent, clEvent, fbEvent, gaEcommerceEvent, url;

      return _regenerator2['default'].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state = _this.state, amount = _this$state.amount, donation_type = _this$state.donation_type, contact = _this$state.contact;
              base = _this.props.redirect[donation_type];


              _this.setState({ loading: true });

              _context.prev = 3;
              _context.next = 6;
              return actions.stripeCharge(_this.state);

            case 6:
              stripeCharge = _context.sent;
              id = stripeCharge.data.id;
              _context.next = 10;
              return actions.storeConvertLoop(_this.props.tags, _this.state.contact);

            case 10:
              action = donation_type === 'monthly' ? 'DONATION_MONTHLY' : 'DONATION_UNIQUE';
              label = window.bs.currentPageLang === 'Español' ? 'DONATION_SP' : 'DONATION_EN';
              gaEvent = {
                action: action,
                label: label,
                category: 'DONATION',
                value: amount
              };
              _context.next = 15;
              return (0, _events.storeEvent)('ga_event', gaEvent);

            case 15:
              clEvent = {
                name: 'Donation ' + donation_type,
                person: contact,
                metadata: {
                  amount: amount,
                  type: donation_type,
                  url: window.location.href
                }
              };
              _context.next = 18;
              return (0, _events.storeEvent)('cl_event', clEvent);

            case 18:
              fbEvent = {
                eventName: 'Purchase',
                content: { value: amount, currency: 'USD' }
              };
              _context.next = 21;
              return (0, _events.storeEvent)('fb_event', fbEvent);

            case 21:
              gaEcommerceEvent = {
                customerId: contact.email + '-' + id,
                revenue: amount
              };
              _context.next = 24;
              return (0, _events.storeEvent)('ga_ecm_event', gaEcommerceEvent);

            case 24:
              url = base + '?amount=' + amount + '&personname=' + contact.name + '&donation_type=' + donation_type;


              setTimeout(function () {
                return window.location = url;
              }, 0);
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context['catch'](3);

              console.log('err donate', _context.t0);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[3, 28]]);
    })), _this.creditCardIsValid = function () {
      var errs = _this.creditCard.validateAll();
      return isAllValid(errs.stripe);
    }, _this.contactIsValid = function () {
      var errs = _this.contact.validateAll();
      return isAllValid(errs.contact);
    }, _this.getToken = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2() {
      var stripeToken, stripe;
      return _regenerator2['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return actions.stripeToken(_this.state);

            case 3:
              stripeToken = _context2.sent;


              if (stripeToken.id) {
                stripe = (0, _extends3['default'])({}, _this.state.stripe, { token: stripeToken.id });

                _this.setState((0, _extends3['default'])({}, _this.state, { stripe: stripe }));
              }

              if (!stripeToken.stripeCode) {
                _context2.next = 8;
                break;
              }

              _this.setState((0, _extends3['default'])({}, _this.state, { loading: false, declined: true }));
              return _context2.abrupt('return', false);

            case 8:
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);

              console.log('donate get token err', _context2.t0);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 10]]);
    })), _this.nextSection = function () {
      var section = _this.state.section < 2 ? _this.state.section + 1 : 2;

      if (_this.state.section === 1) {
        if (!_this.creditCardIsValid()) return false;
        _this.getToken();
      }

      if (_this.state.section === 2) {
        if (!_this.contactIsValid()) return false;
        _this.completeTransaction();
      }

      _this.setState({ section: section, loading: false });

      return section;
    }, _this.prevSection = function (e) {
      e.preventDefault();
      var section = _this.state.section >= 0 ? _this.state.section - 1 : 0;
      _this.setState({ section: section });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Donate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      if (this.donateForm) {
        this.donateForm.addEventListener('keydown', function (e) {
          if (e.which === 9) {
            e.preventDefault();
            _this3.nextSection();
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var section = this.state.section;

      var sectionWidth = 100 / 3 + '%';
      var viewPortStyle = { width: '300%', left: '-' + section * 100 + '%' };
      var donationTypeStyle = {
        color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff'
      };

      var backBtnStyle = {
        color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff'
      };

      return _react2['default'].createElement(
        'form',
        {
          onSubmit: this.handleSubmit,
          className: this.props.is_blue ? 'donate_react donate_inline' : 'donate_react',
          ref: function ref(donate) {
            return _this4.donateForm = donate;
          },
          'data-jsx': 1143493784
        },
        _react2['default'].createElement(
          'div',
          { className: 'donate_react__viewport', style: viewPortStyle, 'data-jsx': 1143493784
          },
          _react2['default'].createElement(_amount2['default'], (0, _extends3['default'])({}, this.state, this.props, {
            width: sectionWidth,
            onChange: this.handleChange
          })),
          _react2['default'].createElement(_creditCard2['default'], (0, _extends3['default'])({
            ref: function ref(creditCard) {
              return _this4.creditCard = creditCard;
            }
          }, this.state, this.props, {
            width: sectionWidth,
            onChange: this.handleChange
          })),
          _react2['default'].createElement(_contact2['default'], (0, _extends3['default'])({
            ref: function ref(contact) {
              return _this4.contact = contact;
            }
          }, this.state, this.props, {
            width: sectionWidth,
            onChange: this.handleChange
          }))
        ),
        _react2['default'].createElement(
          'div',
          { className: 'form-group', 'data-jsx': 1143493784
          },
          _react2['default'].createElement(
            'button',
            {
              className: 'donate_react__submit pull-left',
              onClick: this.handleSubmit,
              disabled: this.state.loading,
              'data-jsx': 1143493784
            },
            this.state.section === 1 ? this.props.texts.next : this.props.texts.donate,
            ' ',
            this.state.loading ? '...' : ''
          ),
          _react2['default'].createElement(
            'span',
            { className: 'donation-type', style: donationTypeStyle, 'data-jsx': 1143493784
            },
            this.state.amount + ' USD ' + this.props.texts[this.state.donation_type]
          ),
          this.state.section > 0 && _react2['default'].createElement(
            'button',
            { className: 'back-btn', style: backBtnStyle, onClick: this.prevSection, 'data-jsx': 1143493784
            },
            this.props.texts.back
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'decline',
            style: this.state.declined ? { display: 'block' } : { display: 'none' },
            'data-jsx': 1143493784
          },
          this.props.texts.validation_declined
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1143493784,
          css: '.decline[data-jsx="1143493784"]{background:red;color:#fff;float:left;width:100%;padding:10px}.donation-type[data-jsx="1143493784"]{display:inline;marginLeft:15px}.back-btn[data-jsx="1143493784"]{float:right;background:transparent;border:none;padding:0 20px}'
        })
      );
    }
  }]);
  return Donate;
}(_react.Component);

Donate.displayName = 'Donate';
Donate.defaultProps = {
  texts: {},
  redirect: {}
};


Donate.propTypes = {
  texts: _propTypes2['default'].object,
  redirect: _propTypes2['default'].object,
  is_blue: _propTypes2['default'].string.isRequired
};

exports['default'] = Donate;

/***/ }),
/* 575 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AmountBtn = function AmountBtn(_ref) {
  var changeAmount = _ref.changeAmount,
      amount = _ref.amount,
      amountText = _ref.amountText;
  return _react2['default'].createElement(
    'a',
    {
      href: '#',
      className: amount === amountText ? 'active' : '',
      onClick: function onClick(e) {
        return changeAmount(e, amountText);
      }
    },
    '$',
    amountText
  );
};

AmountBtn.displayName = 'AmountBtn';
var AmountBtns = function AmountBtns(props) {
  var changeAmount = props.changeAmount,
      _props$texts = props.texts,
      texts = _props$texts === undefined ? {} : _props$texts,
      _props$amount = props.amount,
      amount = _props$amount === undefined ? 30 : _props$amount;


  return _react2['default'].createElement(
    'ul',
    { className: 'change-amount', style: { padding: 0 } },
    _react2['default'].createElement(
      'li',
      { className: 'col-1-4' },
      _react2['default'].createElement(AmountBtn, {
        changeAmount: changeAmount,
        amount: amount,
        amountText: 10
      })
    ),
    _react2['default'].createElement(
      'li',
      { className: 'col-1-4' },
      _react2['default'].createElement(AmountBtn, {
        changeAmount: changeAmount,
        amount: amount,
        amountText: 30
      })
    ),
    _react2['default'].createElement(
      'li',
      { className: 'col-1-4' },
      _react2['default'].createElement(AmountBtn, {
        changeAmount: changeAmount,
        amount: amount,
        amountText: 50
      })
    ),
    _react2['default'].createElement(
      'li',
      { className: 'col-1-4' },
      _react2['default'].createElement(AmountBtn, {
        changeAmount: changeAmount,
        amount: amount,
        amountText: 100
      })
    ),
    _react2['default'].createElement(
      'li',
      { className: 'col-1-4' },
      _react2['default'].createElement(
        'a',
        {
          href: '#',
          onClick: function onClick(e) {
            return changeAmount(e, 5);
          }
        },
        texts.other
      )
    )
  );
};

AmountBtns.displayName = 'AmountBtns';
AmountBtns.propTypes = {
  changeAmount: _propTypes2['default'].func.isRequired.isRequired,
  texts: _propTypes2['default'].object.isRequired,
  amount: _propTypes2['default'].number.isRequired
};

exports['default'] = AmountBtns;

/***/ }),
/* 576 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Cards = function (_Component) {
  (0, _inherits3['default'])(Cards, _Component);

  function Cards() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Cards);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Cards.__proto__ || (0, _getPrototypeOf2['default'])(Cards)).call.apply(_ref, [this].concat(args))), _this), _this.cardType = function (type) {
      var typeCls = _this.props.stripe.card_type === type ? 'card-type card-type--active' : 'card-type';
      return typeCls;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Cards, [{
    key: 'render',
    value: function render() {
      var texts = this.props.texts;


      return _react2['default'].createElement(
        'div',
        { className: 'form-group donate_landing__cards' },
        _react2['default'].createElement('img', {
          className: this.cardType('visa'),
          alt: 'visa',
          src: texts.template_uri + '/public/img/cards/Visa.png'
        }),
        _react2['default'].createElement('img', {
          className: this.cardType('master-card'),
          alt: 'mastercard',
          src: texts.template_uri + '/public/img/cards/MasterCard.png'
        }),
        _react2['default'].createElement('img', {
          className: this.cardType('diners-club'),
          alt: 'diners club',
          src: texts.template_uri + '/public/img/cards/DinersClub.png'
        }),
        _react2['default'].createElement('img', {
          className: this.cardType('american-express'),
          alt: 'american express',
          src: texts.template_uri + '/public/img/cards/AmericanExpress.png'
        }),
        _react2['default'].createElement('img', {
          className: this.cardType('discover'),
          alt: 'discover',
          src: texts.template_uri + '/public/img/cards/Discover.png'
        })
      );
    }
  }]);
  return Cards;
}(_react.Component);

Cards.displayName = 'Cards';


Cards.propTypes = {
  stripe: _propTypes2['default'].object.isRequired,
  texts: _propTypes2['default'].object.isRequired
};

exports['default'] = Cards;

/***/ }),
/* 577 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _inline = __webpack_require__(259);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DonateInlineSection = function (_Component) {
  (0, _inherits3['default'])(DonateInlineSection, _Component);

  function DonateInlineSection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DonateInlineSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DonateInlineSection.__proto__ || (0, _getPrototypeOf2['default'])(DonateInlineSection)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0
    }, _this.changeSection = function (section) {
      _this.setState({ section: section });
      console.log('hi section', section);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DonateInlineSection, [{
    key: 'render',
    value: function render() {
      var texts = this.props.texts;


      return _react2['default'].createElement(
        'div',
        { className: { display: 'flex', flexWrap: 'wrap' } },
        _react2['default'].createElement(
          'div',
          { className: 'col-12-l', style: { margin: '40px 0' } },
          _react2['default'].createElement(
            'h2',
            {
              style: {
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 2px 20px rgba(0,0,0,0.47)'
              }
            },
            this.state.section == 0 ? texts.title : texts.success_title
          ),
          _react2['default'].createElement(
            'h3',
            {
              style: {
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 2px 20px rgba(0,0,0,0.47)',
                fontWeight: '300'
              }
            },
            this.state.section == 0 ? texts.subtitle : texts.success_subtitle
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'col-12 col-4-l',
            style: this.state.section == 0 ? { display: 'block', background: 'RGBA(43, 58, 68, .9)', padding: '20px' } : { display: 'none' }
          },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content } })
        ),
        _react2['default'].createElement(
          'div',
          {
            className: this.state.section == 0 ? 'col-12 col-8-l' : 'col-12 col-12-l',
            style: { background: '#fff', padding: '40px' }
          },
          _react2['default'].createElement(_inline2['default'], (0, _extends3['default'])({ changeSection: this.changeSection }, this.props))
        )
      );
    }
  }]);
  return DonateInlineSection;
}(_react.Component);

DonateInlineSection.displayName = 'DonateInlineSection';
DonateInlineSection.defaultProps = {
  content: ''
};
exports['default'] = DonateInlineSection;

/***/ }),
/* 578 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(579);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DonateSection = function (_Component) {
  (0, _inherits3['default'])(DonateSection, _Component);

  function DonateSection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DonateSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DonateSection.__proto__ || (0, _getPrototypeOf2['default'])(DonateSection)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0
    }, _this.changeSection = function (section) {
      _this.setState({ section: section });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DonateSection, [{
    key: 'render',
    value: function render() {
      var texts = this.props.texts;


      return _react2['default'].createElement(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap' } },
        _react2['default'].createElement(
          'div',
          { className: 'col-12-l', style: { margin: '40px 0' } },
          _react2['default'].createElement(
            'h2',
            {
              style: {
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 2px 20px rgba(0,0,0,0.47)'
              }
            },
            this.state.section == 0 ? texts.title : texts.success_title
          ),
          _react2['default'].createElement(
            'h3',
            {
              style: {
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 2px 20px rgba(0,0,0,0.47)',
                fontWeight: '300'
              }
            },
            this.state.section == 0 ? texts.subtitle : texts.success_subtitle
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'col-12 col-4-l',
            style: this.state.section == 0 ? { display: 'block', background: 'RGBA(43, 58, 68, .9)', padding: '20px' } : { display: 'none' }
          },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content } })
        ),
        _react2['default'].createElement(
          'div',
          {
            className: this.state.section == 0 ? 'col-12 col-8-l' : 'col-12 col-12-l',
            style: { background: '#fff', padding: '40px' }
          },
          _react2['default'].createElement(_index2['default'], (0, _extends3['default'])({}, this.props, { changeSection: this.changeSection }))
        )
      );
    }
  }]);
  return DonateSection;
}(_react.Component);

DonateSection.displayName = 'DonateSection';
DonateSection.defaultProps = {
  content: '',
  titles: []
};
exports['default'] = DonateSection;

/***/ }),
/* 579 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _amount = __webpack_require__(172);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(173);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(174);

var _contact2 = _interopRequireDefault(_contact);

var _four = __webpack_require__(260);

var _four2 = _interopRequireDefault(_four);

var _donate = __webpack_require__(120);

var actions = _interopRequireWildcard(_donate);

var _events = __webpack_require__(36);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isAllValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _keys2['default'])(errors).every(function (key) {
    return errors[key] === true;
  });
}

var Donate = function (_Component) {
  (0, _inherits3['default'])(Donate, _Component);

  function Donate() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Donate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Donate.__proto__ || (0, _getPrototypeOf2['default'])(Donate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      left: 0,
      loading: false,
      donation_type: 'monthly',
      amount: 30,
      currency: 'usd',
      contact: {
        name: '',
        email: '',
        country: _this.props.texts.country
      },
      stripe: {
        card_type: '',
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        token: ''
      },
      errors: { stripe: {}, contact: {} },
      is_blue: false,
      show_four_step: false,
      show_titles: true
    }, _this.handleChange = function (field) {
      _this.setState((0, _extends3['default'])({}, _this.state, field));
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.nextSection();
    }, _this.completeTransaction = function () {
      var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state = _this.state,
          amount = _this$state.amount,
          donation_type = _this$state.donation_type,
          contact = _this$state.contact;

      var base = _this.props.redirect[donation_type];
      var id = stripeResponse.id;


      _this.setState({ loading: true });

      actions.storeConvertLoop(_this.props.tags, contact).then(function () {
        var action = donation_type === 'monthly' ? 'DONATION_MONTHLY' : 'DONATION_UNIQUE';

        var label = bs.currentPageLang === 'Español' ? 'DONATION_SP' : 'DONATION_EN';

        var event = {
          action: action,
          label: label,
          category: 'DONATION',
          value: amount
        };

        (0, _events.storeEvent)('ga_event', event);
      }).then(function () {
        var event = {
          name: 'Donation ' + donation_type,
          person: contact,
          metadata: {
            amount: amount,
            type: donation_type,
            url: window.location.href
          }
        };

        return (0, _events.storeEvent)('cl_event', event);
      }).then(function () {
        var event = {
          eventName: 'Purchase',
          content: { value: amount, currency: 'USD' }
        };

        return (0, _events.storeEvent)('fb_event', event);
      }).then(function () {
        var event = {
          customerId: contact.email + '-' + id,
          revenue: amount
        };

        return (0, _events.storeEvent)('ga_ecm_event', event);
      }).then(function () {
        if (donation_type == 'monthly') {
          var url = base + '?amount=' + amount + '&personname=' + contact.name + '&donation_type=' + donation_type;
          setTimeout(function () {
            window.location = url;
          }, 0);
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
            var stripe = (0, _extends3['default'])({}, _this.state.stripe, { token: res.id });
            _this.setState((0, _extends3['default'])({}, _this.state, { stripe: stripe }));
            return stripe;
          }

          if (res.stripeCode) {
            _this.setState((0, _extends3['default'])({}, _this.state, { loading: false, declined: true }));
            return null;
          }
        });
      }

      if (_this.state.section === 2) {
        if (!_this.contactIsValid()) return false;
        actions.stripeCharge(_this.state).then(function (res) {
          return _this.completeTransaction(res.data);
        });
      }

      var left = '-' + section * 100 + '%';

      if (_this.state.section === 0) {
        _this.setState({ section: section, left: left, loading: false });
      } else {
        _this.setState({ section: section, left: left });
      }
    }, _this.prevSection = function (e) {
      e.preventDefault();
      var section = _this.state.section >= 0 ? _this.state.section - 1 : 0;
      var left = '-' + section * 100 + '%';
      _this.setState({ section: section, left: left });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Donate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.donateForm.addEventListener('keydown', function (e) {
        if (e.which === 9) {
          e.preventDefault();
          _this2.nextSection();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var sectionWidth = 100 / 3 + '%';
      var viewPortStyle = { width: '300%', left: this.state.left };
      var donationTypeStyle = {
        display: 'inline',
        marginLeft: '15px',
        color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff'
      };

      var backBtnStyle = {
        float: 'right',
        background: 'transparent',
        border: 'none',
        padding: '0 20px',
        color: this.props.is_blue ? 'rgb(60, 81, 95)' : '#fff'
      };

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'form',
          {
            onSubmit: this.handleSubmit,
            className: this.props.is_blue ? 'donate_react donate_inline' : 'donate_react',
            style: this.state.show_four ? { display: 'none' } : { display: 'block' },
            ref: function ref(donate) {
              _this3.donateForm = donate;
            }
          },
          _react2['default'].createElement(
            'div',
            { className: 'donate_react__viewport', style: viewPortStyle },
            _react2['default'].createElement(_amount2['default'], (0, _extends3['default'])({}, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2['default'].createElement(_creditCard2['default'], (0, _extends3['default'])({
              ref: function ref(creditCard) {
                _this3.creditCard = creditCard;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            })),
            _react2['default'].createElement(_contact2['default'], (0, _extends3['default'])({
              ref: function ref(contact) {
                _this3.contact = contact;
              }
            }, this.state, this.props, {
              width: sectionWidth,
              onChange: this.handleChange
            }))
          ),
          _react2['default'].createElement(
            'div',
            { className: 'form-group' },
            _react2['default'].createElement(
              'button',
              {
                className: 'donate_react__submit pull-left',
                onClick: this.handleSubmit,
                disabled: this.state.loading
              },
              this.state.section === 1 ? this.props.texts.next : this.props.texts.donate
            ),
            _react2['default'].createElement(
              'span',
              { style: donationTypeStyle },
              this.state.amount + ' USD ' + this.props.texts[this.state.donation_type]
            ),
            this.state.section > 0 ? _react2['default'].createElement(
              'button',
              { style: backBtnStyle, onClick: this.prevSection },
              this.props.texts.back
            ) : ''
          ),
          _react2['default'].createElement(
            'div',
            {
              style: this.state.declined ? {
                display: 'block',
                background: 'red',
                color: '#fff',
                float: 'left',
                width: '100%',
                padding: '10px'
              } : { display: 'none' }
            },
            this.props.texts.validation_declined
          )
        ),
        _react2['default'].createElement(_four2['default'], (0, _extends3['default'])({}, this.props, this.state))
      );
    }
  }]);
  return Donate;
}(_react.Component);

Donate.displayName = 'Donate';
Donate.defaultProps = {
  texts: {},
  redirect: {},
  tags: '',
  is_blue: false
};


Donate.propTypes = {
  texts: _propTypes2['default'].object,
  redirect: _propTypes2['default'].object,
  tags: _propTypes2['default'].string,
  is_blue: _propTypes2['default'].bool,
  changeSection: _propTypes2['default'].func
};

exports['default'] = Donate;

/***/ }),
/* 580 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sectionVideo = __webpack_require__(252);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CampaignsSlider = function (_React$Component) {
  (0, _inherits3['default'])(CampaignsSlider, _React$Component);

  function CampaignsSlider() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, CampaignsSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = CampaignsSlider.__proto__ || (0, _getPrototypeOf2['default'])(CampaignsSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { currentSlide: 0, left: '0' }, _this.nextSlide = function () {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (clear) clearInterval(_this.interval);
      var total = _this.props.slides.length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;
      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _this.prevSlide = function () {
      clearInterval(_this.interval);
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(CampaignsSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.nextSlide(false);
      }, this.props.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var slides = this.props.slides;

      var viewportWidth = 100 * slides.length + '%';
      var slideWidth = 100 / slides.length + '%';
      var viewportStyle = { width: viewportWidth, left: this.state.left };

      return _react2['default'].createElement(
        'div',
        { className: 'campaigns-slider' },
        _react2['default'].createElement(
          'div',
          { className: 'campaigns-slider__viewport', style: viewportStyle },
          slides.map(function (slide, i) {
            return _react2['default'].createElement(
              'div',
              {
                key: i,
                className: 'campaigns-slider__slide',
                style: { width: slideWidth }
              },
              _react2['default'].createElement(_sectionVideo2['default'], {
                imgUrl: slide.image,
                url: slide.url,
                imageStyle: { width: '100%' }
              }),
              _react2['default'].createElement(
                'div',
                {
                  className: 'campaigns-slider__slide__content',
                  style: { background: slide.bg }
                },
                _react2['default'].createElement(
                  'h4',
                  null,
                  _react2['default'].createElement(
                    'a',
                    { href: slide.url ? slide.url : '#' },
                    slide.title
                  )
                ),
                _react2['default'].createElement(
                  'p',
                  null,
                  slide.content
                )
              )
            );
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'campaigns-slider__btns' },
          _react2['default'].createElement(
            'button',
            {
              className: 'campaigns-slider__btns__prev',
              onClick: this.prevSlide
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-left' })
          ),
          _react2['default'].createElement(
            'button',
            {
              className: 'campaigns-slider__btns__next',
              onClick: this.nextSlide
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-right' })
          )
        )
      );
    }
  }]);
  return CampaignsSlider;
}(_react2['default'].Component);

CampaignsSlider.displayName = 'CampaignsSlider';
CampaignsSlider.defaultProps = { slides: [], interval: 0 };


CampaignsSlider.propTypes = {
  slides: _propTypes2['default'].array.isRequired,
  interval: _propTypes2['default'].number
};

exports['default'] = CampaignsSlider;

/***/ }),
/* 581 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(89);

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(18);

var _extends5 = _interopRequireDefault(_extends4);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

var _isEmail = __webpack_require__(92);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _getCountries = __webpack_require__(251);

var _getCountries2 = _interopRequireDefault(_getCountries);

var _events = __webpack_require__(36);

var _contact = __webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var endpoint = '/wp-admin/admin-ajax.php';

var DownloadPdf = function (_React$Component) {
  (0, _inherits3['default'])(DownloadPdf, _React$Component);

  function DownloadPdf(props) {
    (0, _classCallCheck3['default'])(this, DownloadPdf);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (DownloadPdf.__proto__ || (0, _getPrototypeOf2['default'])(DownloadPdf)).call(this, props));

    _initialiseProps.call(_this);

    var country = props.country;


    _this.state = {
      email: '',
      errors: {
        email: false
      },
      country: country
    };
    return _this;
  }

  (0, _createClass3['default'])(DownloadPdf, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          countries = _props.countries,
          btn = _props.btn,
          texts = _props.texts;
      var errors = this.state.errors;


      console.log(this.props);

      var btnStyle = {
        borderColor: btn.background,
        background: btn.background
      };

      return _react2['default'].createElement(
        'form',
        { onSubmit: this.handlepdf, className: 'form-inline download-pdf' },
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            placeholder: texts.email,
            onChange: function onChange(e) {
              return _this2.handleChange(e, 'email');
            },
            value: this.state.email
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.email ? 'input-error' : 'hidden' },
            errors.email,
            ' ',
            texts.validation_email
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement(
            'select',
            {
              onChange: function onChange(e) {
                return _this2.handleChange(e, 'country');
              },
              value: this.state.country || this.props.country
            },
            countries.map(function (country, i) {
              return _react2['default'].createElement(
                'option',
                { key: i, value: country },
                country
              );
            })
          )
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.handlepdf, style: btnStyle },
          btn.text
        )
      );
    }
  }]);
  return DownloadPdf;
}(_react2['default'].Component);

DownloadPdf.displayName = 'DownloadPdf';
DownloadPdf.defaultProps = {
  btn: {
    text: '',
    background: ''
  },
  texts: {},
  countries: _getCountries2['default'],
  pdf_url: ''
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.validate = function () {
    var errors = {};

    var validations = (0, _keys2['default'])(_this3.state.errors).map(function (field) {
      var val = !(0, _isEmail2['default'])(_this3.state[field]);
      errors = (0, _extends5['default'])({}, errors, (0, _defineProperty3['default'])({}, field, val));
      return val;
    });

    _this3.setState({ errors: errors });

    return _promise2['default'].all(validations);
  };

  this.isValid = function () {
    return _this3.validate().then(function (arr) {
      return arr.every(function (item) {
        return item == false;
      });
    })['catch'](function (err) {
      return console.error(err);
    });
  };

  this.handlepdf = function () {
    var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
      var isValid;
      return _regenerator2['default'].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _context.next = 3;
              return _this3.isValid();

            case 3:
              isValid = _context.sent;

              _this3.storeContact(isValid);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this3);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.storeContact = function () {
    var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee2(isValid) {
      var _props2, redirect_url, event, tags, _state, email, country, contact, language, gaEventData, clEventData, fbEventData;

      return _regenerator2['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _props2 = _this3.props, redirect_url = _props2.redirect_url, event = _props2.event, tags = _props2.tags;
              _state = _this3.state, email = _state.email, country = _state.country;
              contact = { email: email, country: country };

              if (!isValid) {
                _context2.next = 23;
                break;
              }

              _context2.prev = 4;
              _context2.next = 7;
              return (0, _contact.storeConvertLoop)(tags, contact);

            case 7:
              language = window.bs.currentPageLang === 'Español' ? 'SP' : 'EN';
              gaEventData = { category: 'SUBSCRIBE', action: event, label: event + '_' + language };
              _context2.next = 11;
              return (0, _events.storeEvent)('ga_event', gaEventData);

            case 11:
              clEventData = { name: event, person: contact };
              _context2.next = 14;
              return (0, _events.storeEvent)('cl_event', clEventData);

            case 14:
              fbEventData = { eventName: 'Lead' };
              _context2.next = 17;
              return (0, _events.storeEvent)('fb_event', fbEventData);

            case 17:

              setTimeout(function () {
                return window.location = redirect_url;
              }, 0);
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2['catch'](4);

              console.log(_context2.t0);

            case 23:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this3, [[4, 20]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.handleChange = function (e, field) {
    _this3.setState((0, _extends5['default'])({}, _this3.state, (0, _defineProperty3['default'])({}, field, e.target.value)));
  };
};

exports['default'] = DownloadPdf;

/***/ }),
/* 582 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(18);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GalleryHeader = function (_Component) {
  (0, _inherits3['default'])(GalleryHeader, _Component);

  function GalleryHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, GalleryHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = GalleryHeader.__proto__ || (0, _getPrototypeOf2['default'])(GalleryHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 0,
      imageStyle: {
        maxWidth: '100%',
        display: 'block',
        maxHeight: '500px',
        margin: '0 auto'
      }
    }, _this.getImage = function (e) {
      var imageStyle = void 0;
      if (e.target.height > e.target.width) {
        imageStyle = (0, _extends3['default'])({}, _this.state.imageStyle, { maxWidth: '45%' });
        _this.setState({ imageStyle: imageStyle });
      } else {
        imageStyle = (0, _extends3['default'])({}, _this.state.imageStyle, { maxWidth: '100%' });
        _this.setState({ imageStyle: imageStyle });
      }
    }, _this.changeSection = function (type, e) {
      if (e) e.preventDefault();

      var section = _this.state.section;
      if (type === 'next') {
        section = _this.state.section < _this.props.images.length - 1 ? _this.state.section + 1 : 0;
      }

      if (type === 'prev') section = _this.state.section > 0 ? _this.state.section - 1 : 0;

      _this.setState({ section: section });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(GalleryHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var nav = document.querySelector('.nav');
      nav.style.background = 'rgb(34, 34, 34)';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          images = _props.images,
          excerpts = _props.excerpts;

      var h = window.innerHeight - 100;
      var w = window.innerHeight;
      var rootHeight = h + 'px';
      var viewportHeight = h + 'px';

      return _react2['default'].createElement(
        'div',
        { className: 'root', style: { height: rootHeight }, 'data-jsx': 2885328103
        },
        _react2['default'].createElement(
          'div',
          { style: { height: viewportHeight }, 'data-jsx': 2885328103
          },
          _react2['default'].createElement(
            'div',
            { style: { maxWidth: w, margin: '0 auto', padding: '0 20px' }, 'data-jsx': 2885328103
            },
            _react2['default'].createElement(
              'h5',
              { className: 'gallery-header__title', 'data-jsx': 2885328103
              },
              this.props.texts.gallery,
              ' ',
              _react2['default'].createElement('i', { className: 'ion-camera', 'data-jsx': 2885328103
              })
            ),
            _react2['default'].createElement(
              'div',
              { className: 'gallery-header__item', 'data-jsx': 2885328103
              },
              _react2['default'].createElement('img', {
                onLoad: this.getImage,
                src: images[this.state.section],
                style: this.state.imageStyle,
                'data-jsx': 2885328103
              }),
              _react2['default'].createElement(
                'div',
                { className: 'gallery-header__excerpt-container', 'data-jsx': 2885328103
                },
                _react2['default'].createElement(
                  'span',
                  { className: 'gallery-header__excerpt', 'data-jsx': 2885328103
                  },
                  excerpts[this.state.section]
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'gallery-header__share-list-container', 'data-jsx': 2885328103
                },
                _react2['default'].createElement(
                  'ul',
                  { className: 'share-list', 'data-jsx': 2885328103
                  },
                  _react2['default'].createElement(
                    'li',
                    {
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement(
                      'a',
                      {
                        key: 1,
                        className: 'share-btn',
                        href: 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
                        'data-jsx': 2885328103
                      },
                      _react2['default'].createElement('i', { className: 'ion-social-facebook', 'data-jsx': 2885328103
                      })
                    )
                  ),
                  _react2['default'].createElement(
                    'li',
                    {
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement(
                      'a',
                      {
                        key: 2,
                        className: 'share-btn',
                        href: 'https://twitter.com/intent/tweet?text=' + window.location.href,
                        'data-jsx': 2885328103
                      },
                      _react2['default'].createElement('i', { className: 'ion-social-twitter', 'data-jsx': 2885328103
                      })
                    )
                  ),
                  _react2['default'].createElement(
                    'li',
                    {
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement(
                      'a',
                      {
                        key: 3,
                        className: 'share-btn',
                        href: 'https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href,
                        'data-jsx': 2885328103
                      },
                      _react2['default'].createElement('i', { className: 'ion-social-linkedin', 'data-jsx': 2885328103
                      })
                    )
                  ),
                  _react2['default'].createElement(
                    'li',
                    {
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement(
                      'a',
                      {
                        key: 4,
                        className: 'share-btn',
                        href: 'whatsapp://send?text=' + window.location.href,
                        'data-jsx': 2885328103
                      },
                      _react2['default'].createElement('i', { className: 'ion-social-whatsapp-outline', 'data-jsx': 2885328103
                      })
                    )
                  )
                ),
                _react2['default'].createElement(
                  'div',
                  { style: { float: 'right', marginTop: '7px' }, 'data-jsx': 2885328103
                  },
                  _react2['default'].createElement(
                    'span',
                    { style: { color: '#fff', paddingRight: '10px' }, 'data-jsx': 2885328103
                    },
                    this.state.section + 1,
                    ' ',
                    this.props.texts.of,
                    ' ',
                    images.length
                  ),
                  _react2['default'].createElement(
                    'button',
                    {
                      key: 'btn-1',
                      onClick: function onClick(e) {
                        return _this2.changeSection(e, 'prev');
                      },
                      className: 'nav-btn',
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement('i', { className: 'ion-chevron-left', 'data-jsx': 2885328103
                    })
                  ),
                  _react2['default'].createElement(
                    'button',
                    {
                      key: 'btn-2',
                      onClick: function onClick(e) {
                        return _this2.changeSection(e, 'next');
                      },
                      className: 'nav-btn',
                      'data-jsx': 2885328103
                    },
                    _react2['default'].createElement('i', { className: 'ion-chevron-right', 'data-jsx': 2885328103
                    })
                  )
                )
              )
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'arrow-down', 'data-jsx': 2885328103
            },
            _react2['default'].createElement(
              'a',
              { href: '#post-content', 'data-jsx': 2885328103
              },
              _react2['default'].createElement('img', {
                onLoad: this.getImage,
                src: '/wp-content/themes/acn_int/public/images/down.png',
                'data-jsx': 2885328103
              })
            )
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 2885328103,
          css: '.root[data-jsx="2885328103"]{background:#222;position:relative;overflow:hidden}.gallery-header__title[data-jsx="2885328103"]{color:#fff;margin-bottom:20px}.gallery-header__item[data-jsx="2885328103"]{position:relative}.gallery-header__excerpt-container[data-jsx="2885328103"]{width:100%;float:left}.gallery-header__excerpt[data-jsx="2885328103"]{color:#fff;margin-top:20px;display:block;-webkit-text-shadow:2px 2px 2px #222;text-shadow:2px 2px 2px #222}.gallery-header__share-list-container[data-jsx="2885328103"]{width:100%;float:left;margin-top:10px}.arrow-down[data-jsx="2885328103"]{position:absolute;-webkit-text-align:center;text-align:center;bottom:10px;left:0;right:0}.share-list[data-jsx="2885328103"]{list-style:none;padding:0;float:left}.share-list[data-jsx="2885328103"] li[data-jsx="2885328103"]{margin-left:5px;display:none}.nav-btn[data-jsx="2885328103"]{border:1px solid #fff;background:transparent;width:40px;height:40px;border-radius:0;padding:0}.nav-btn[data-jsx="2885328103"]:hover{background:rgba(255, 255, 255, .2)}.share-btn[data-jsx="2885328103"]{color:#fff;width:30px;height:30px;border-radius:30px;-webkit-text-align:center;text-align:center;display:block;border:1px solid #fff;padding:5px;font-size:12px}@media(max-width:767px){.root[data-jsx="2885328103"]{margin:0 -20px}.share-btn[data-jsx="2885328103"]{background:rgba(255, 255, 255, .2)}.share-list[data-jsx="2885328103"] li[data-jsx="2885328103"]{display:inline-block}}'
        })
      );
    }
  }]);
  return GalleryHeader;
}(_react.Component);

GalleryHeader.displayName = 'GalleryHeader';
GalleryHeader.defaultProps = {
  images: [],
  excerpts: [],
  texts: {}
};


GalleryHeader.propTypes = {
  images: _propTypes2['default'].object,
  texts: _propTypes2['default'].object
};

exports['default'] = GalleryHeader;

/***/ }),
/* 583 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _projects = __webpack_require__(253);

var _projects2 = _interopRequireDefault(_projects);

var _postsAbout = __webpack_require__(584);

var _postsAbout2 = _interopRequireDefault(_postsAbout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var colors = {
  1: '#b91325',
  2: '#00355f',
  3: '#6e5785',
  4: '#95a0ad',
  5: '#156734',
  6: '#689038',
  7: '#7a2d04',
  8: '#b27009',
  9: '#E4A70F'
};

var ProjectsAbout = function (_React$Component) {
  (0, _inherits3['default'])(ProjectsAbout, _React$Component);

  function ProjectsAbout() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ProjectsAbout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ProjectsAbout.__proto__ || (0, _getPrototypeOf2['default'])(ProjectsAbout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: 8
    }, _this.handleSection = function (i) {
      var section = i - 1;
      _this.setState({ section: section });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(ProjectsAbout, [{
    key: 'render',
    value: function render() {
      var section = this.state.section;


      return _react2['default'].createElement(
        'div',
        {
          'data-jsx': 3244233877
        },
        _react2['default'].createElement(_projects2['default'], {
          contents: this.props.projects.map(function (project) {
            project.text = project.content;
            return project;
          }),
          donate: this.props.donate,
          changeSection: this.handleSection
        }),
        _react2['default'].createElement(
          'div',
          { className: 'projects-about-num', 'data-jsx': 3244233877
          },
          _react2['default'].createElement(
            'div',
            {
              className: 'projects-about-num__num',
              style: { color: colors[this.state.section + 1] },
              'data-jsx': 3244233877
            },
            _react2['default'].createElement(
              'h2',
              {
                'data-jsx': 3244233877
              },
              this.props.projects[section] ? this.props.projects[section].number : ''
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'projects-about-num__text', 'data-jsx': 3244233877
            },
            this.props.projects[section] ? this.props.projects[section].number_text : ''
          ),
          _react2['default'].createElement(
            'div',
            { className: 'projects-about__posts-container', 'data-jsx': 3244233877
            },
            _react2['default'].createElement(
              'div',
              { className: 'l-wrap', 'data-jsx': 3244233877
              },
              _react2['default'].createElement(
                'h4',
                { className: 'projects-about__posts-title', 'data-jsx': 3244233877
                },
                this.props.texts.stories
              ),
              _react2['default'].createElement(_postsAbout2['default'], {
                category: this.props.projects[section] ? this.props.projects[section].post_category : ''
              })
            )
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 3244233877,
          css: '.projects-about-num__num[data-jsx="3244233877"]{width:50%;-webkit-text-align:right;text-align:right;padding-top:40px;float:left;height:150px;background:#fff}.projects-about-num__text[data-jsx="3244233877"]{-webkit-text-align:left;text-align:left;width:50%;float:left;height:150px;padding:60px;font-size:1.5em;color:#A0A0A0}.projects-about__posts-title[data-jsx="3244233877"]{color:#324049;-webkit-text-transform:uppercase;text-transform:uppercase;margin-bottom:20px;margin-left:15px;font-weight:normal}.projects-about__posts-container[data-jsx="3244233877"]{background:#F8F6F8;padding:80px 0;float:left;width:100%}@media (max-width:767px){.projects-about-num__text[data-jsx="3244233877"]{width:100%;height:auto;-webkit-text-align:center;text-align:center;padding:0 0 60px 0}.projects-about-num__num[data-jsx="3244233877"]{width:100%;height:auto;-webkit-text-align:center;text-align:center}.projects-about__posts-container[data-jsx="3244233877"]{padding:20px 0 0 0}}'
        })
      );
    }
  }]);
  return ProjectsAbout;
}(_react2['default'].Component);

ProjectsAbout.displayName = 'ProjectsAbout';
exports['default'] = ProjectsAbout;

/***/ }),
/* 584 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var endpoint = '/wp-admin/admin-ajax.php';

var PostsAbout = function (_React$Component) {
  (0, _inherits3['default'])(PostsAbout, _React$Component);

  function PostsAbout() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, PostsAbout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = PostsAbout.__proto__ || (0, _getPrototypeOf2['default'])(PostsAbout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      posts: [],
      loading: false
    }, _this.fetchPosts = function () {
      var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(props) {
        var data, res;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _qs2['default'].stringify({
                  action: 'get_posts',
                  post_perpage: 4,
                  post_category: props.category
                });


                _this.setState({ loading: true });
                _context.prev = 2;
                _context.next = 5;
                return _axios2['default'].post(endpoint, data);

              case 5:
                res = _context.sent;

                _this.setState({ loading: false, posts: res.data ? res.data : [] });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                console.log(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[2, 9]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(PostsAbout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchPosts(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.fetchPosts(props);
    }
  }, {
    key: 'render',
    value: function render() {
      var posts = this.state.posts;

      return _react2['default'].createElement(
        'div',
        {
          style: this.state.loading ? { transition: '300 ms', opacity: 0 } : { transition: '300 ms', opacity: 1 }
        },
        posts.map(function (post, i) {
          return _react2['default'].createElement(
            'div',
            { key: i, className: 'col-12 col-3-l' },
            _react2['default'].createElement(
              'a',
              { href: post.post_permalink, style: { background: '#fff' } },
              _react2['default'].createElement('img', { src: post.post_image, alt: '', style: { width: '100%' } })
            ),
            _react2['default'].createElement(
              'div',
              {
                className: 'post-about__title',
                style: {
                  background: '#fff',
                  padding: '20px',
                  marginBottom: '20px'
                }
              },
              _react2['default'].createElement(
                'h5',
                null,
                _react2['default'].createElement(
                  'a',
                  { style: { color: '#324049' }, href: post.post_permalink },
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
}(_react2['default'].Component);

PostsAbout.displayName = 'PostsAbout';
exports['default'] = PostsAbout;

/***/ }),
/* 585 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(119);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var VideoHeader = function (_React$Component) {
  (0, _inherits3['default'])(VideoHeader, _React$Component);

  function VideoHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, VideoHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = VideoHeader.__proto__ || (0, _getPrototypeOf2['default'])(VideoHeader)).call.apply(_ref, [this].concat(args))), _this), _this.openModal = function (e) {
      e.preventDefault();
      _this.modal.show();
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(VideoHeader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          videoUrl = _props.videoUrl,
          imageUrl = _props.imageUrl;

      var height = window.innerHeight < 700 ? window.innerHeight / 2 - 100 + 'px' : window.innerHeight - 100 + 'px';

      var style = {
        backgroundImage: 'url(' + imageUrl + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        height: height
      };

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_videoModal2['default'], { ref: function ref(modal) {
            return _this2.modal = modal;
          }, url: videoUrl }),
        _react2['default'].createElement(
          'div',
          { style: style, onClick: this.openModal },
          _react2['default'].createElement(
            'div',
            {
              style: {
                background: 'rgba(60,81,90, .5)',
                width: '100%',
                padding: '10px 10px'
              }
            },
            _react2['default'].createElement(
              'div',
              { className: 'l-wrap', style: { color: '#fff', fontSize: '18px' } },
              'Video ',
              _react2['default'].createElement('i', { className: 'ion-ios-videocam' })
            )
          )
        )
      );
    }
  }]);
  return VideoHeader;
}(_react2['default'].Component);

VideoHeader.displayName = 'VideoHeader';
VideoHeader.defaultProps = {
  videoUrl: '',
  imageUrl: ''
};
exports['default'] = VideoHeader;

/***/ }),
/* 586 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Carousel = function (_React$Component) {
  (0, _inherits3['default'])(Carousel, _React$Component);

  function Carousel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Carousel.__proto__ || (0, _getPrototypeOf2['default'])(Carousel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentSlide: 0,
      left: '0',
      viewportWidth: '100%'
    }, _this.setViewportWidth = function () {
      var num = $('.bs-carousel-item').length;
      $('.bs-carousel-item').css({ width: 100 / num + '%', float: 'left' });
      _this.setState({ viewportWidth: num * 100 + '%' });
    }, _this.nextSlide = function () {
      // if (clear) clearInterval(this.interval);
      var total = $('.bs-carousel-item').length - 1;
      var left = _this.state.currentSlide < total ? _this.state.currentSlide + 1 : 0;

      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _this.prevSlide = function () {
      // clearInterval(this.interval);
      var left = _this.state.currentSlide > 0 ? _this.state.currentSlide - 1 : 0;
      _this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setViewportWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var viewportStyle = {
        width: this.state.viewportWidth,
        left: this.state.left
      };

      var btnLeft = { left: '20px' };
      var btnRight = { right: '20px' };

      return _react2['default'].createElement(
        'div',
        { style: { width: '100%', overflow: 'hidden' }, 'data-jsx': 528420226
        },
        _react2['default'].createElement(
          'div',
          { className: 'viewport', style: viewportStyle, 'data-jsx': 528420226
          },
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content }, 'data-jsx': 528420226
          })
        ),
        _react2['default'].createElement(
          'div',
          {
            'data-jsx': 528420226
          },
          _react2['default'].createElement(
            'button',
            { onClick: this.prevSlide, style: btnLeft, 'data-jsx': 528420226
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-left', 'data-jsx': 528420226
            })
          ),
          _react2['default'].createElement(
            'button',
            { onClick: this.nextSlide, style: btnRight, 'data-jsx': 528420226
            },
            _react2['default'].createElement('i', { className: 'ion-chevron-right', 'data-jsx': 528420226
            })
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 528420226,
          css: '.viewport[data-jsx="528420226"]{position:relative;-webkit-transition:left 300ms;transition:left 300ms}button[data-jsx="528420226"]{display:block;background:rgba(0,0,0, .5);font-size:20px;color:#fff;-webkit-text-align:center;text-align:center;width:40px;height:40px;border-radius:40px;position:absolute;top:45%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:0}'
        })
      );
    }
  }]);
  return Carousel;
}(_react2['default'].Component);

Carousel.displayName = 'Carousel';


Carousel.propTypes = {
  content: _propTypes2['default'].string
};

exports['default'] = Carousel;

/***/ }),
/* 587 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Counter = function (_Component) {
  (0, _inherits3["default"])(Counter, _Component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, (_ref = Counter.__proto__ || (0, _getPrototypeOf2["default"])(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentNum: 0
    }, _this.componentDidMount = function () {
      var emmiter = window.mitt;
      emmiter.on("runCounter", _this.callCounter);
    }, _this.callCounter = function () {
      clearInterval(_this.counterInterval);
      _this.setState({ currentNum: 0 });
      _this.runCounter();
    }, _this.runCounter = function () {
      var _this$props = _this.props,
          time = _this$props.time,
          delay = _this$props.delay;

      var nums = [];
      var total = time / delay;
      var num = _this.props.num;
      var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
      var decimalLength = isFloat ? (num.split(".")[1] || []).length : 0;
      var isLessThenTotal = function isLessThenTotal() {
        return 0 <= total;
      };

      for (var i = 0; i <= total; i++) {
        var n = parseInt(num / total * i);

        if (isFloat) {
          n = parseFloat(num / total * i).toFixed(decimalLength);
        }

        nums = nums.concat([n]);
      }

      _this.updateNum(nums, num);

      _this.counterInterval = setInterval(_this.updateNum.bind(null, nums, num), delay);
    }, _this.updateNum = function (nums, num) {
      var currentNum = nums.shift();

      if (currentNum >= num) {
        clearInterval(_this.counterInterval);
      }

      _this.setState({ currentNum: currentNum });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  (0, _createClass3["default"])(Counter, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var emmiter = window.mitt;
      emmiter.off("runCounter", this.callCounter);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2["default"].createElement(
        "span",
        { ref: function ref(counter) {
            return _this2.counter = counter;
          } },
        this.state.currentNum
      );
    }
  }]);
  return Counter;
}(_react.Component);

Counter.displayName = "Counter";
exports["default"] = Counter;

/***/ }),
/* 588 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PostShare = function (_Component) {
  (0, _inherits3["default"])(PostShare, _Component);

  function PostShare() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, PostShare);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, (_ref = PostShare.__proto__ || (0, _getPrototypeOf2["default"])(PostShare)).call.apply(_ref, [this].concat(args))), _this), _this.onRedirect = function (e) {
      e.preventDefault();
      var href = e.currentTarget.getAttribute('href');
      var l = bs.currentPageLang == "Español" ? "SP" : "EN";

      (0, _events.eventGoogleAnalytics)({ category: 'SHARE', action: 'SHARE', label: "SHARE_" + l }).then(function () {
        var event = {
          name: 'Shares',
          person: {},
          metadata: {
            url: window.location.href
          }
        };

        return (0, _events.eventConvertloopAsync)(event);
      }).then(function () {
        setTimeout(function () {
          window.location = href;
        }, 0);
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  (0, _createClass3["default"])(PostShare, [{
    key: "render",
    value: function render() {
      var currentUrl = window.location.href;
      var _props = this.props,
          title = _props.title,
          subtitle = _props.subtitle;


      return _react2["default"].createElement(
        "div",
        {
          "data-jsx": 3868259300
        },
        _react2["default"].createElement(
          "span",
          { className: "title", "data-jsx": 3868259300
          },
          title
        ),
        _react2["default"].createElement(
          "div",
          { className: "bs-post__share", "data-jsx": 3868259300
          },
          _react2["default"].createElement(
            "div",
            { className: "l-wrap", "data-jsx": 3868259300
            },
            _react2["default"].createElement(
              "span",
              { className: "bs-post__share-subtitle", "data-jsx": 3868259300
              },
              subtitle
            ),
            _react2["default"].createElement(
              "ul",
              {
                "data-jsx": 3868259300
              },
              _react2["default"].createElement(
                "li",
                {
                  "data-jsx": 3868259300
                },
                _react2["default"].createElement(
                  "a",
                  {
                    onClick: this.onRedirect,
                    className: "icon",
                    href: "https://www.facebook.com/sharer/sharer.php?u=" + currentUrl,
                    "data-jsx": 3868259300
                  },
                  _react2["default"].createElement("i", { className: "ion-social-facebook", "data-jsx": 3868259300
                  })
                )
              ),
              _react2["default"].createElement(
                "li",
                {
                  "data-jsx": 3868259300
                },
                _react2["default"].createElement(
                  "a",
                  {
                    onClick: this.onRedirect,
                    className: "icon",
                    href: "https://twitter.com/intent/tweet?text=" + currentUrl,
                    "data-jsx": 3868259300
                  },
                  _react2["default"].createElement("i", { className: "ion-social-twitter", "data-jsx": 3868259300
                  })
                )
              ),
              _react2["default"].createElement(
                "li",
                {
                  "data-jsx": 3868259300
                },
                _react2["default"].createElement(
                  "a",
                  {
                    onClick: this.onRedirect,
                    className: "icon",
                    href: "https://www.linkedin.com/shareArticle?mini=true&url=" + currentUrl,
                    "data-jsx": 3868259300
                  },
                  _react2["default"].createElement("i", { className: "ion-social-linkedin", "data-jsx": 3868259300
                  })
                )
              ),
              _react2["default"].createElement(
                "li",
                {
                  "data-jsx": 3868259300
                },
                _react2["default"].createElement(
                  "a",
                  {
                    onClick: this.onRedirect,
                    className: "icon",
                    href: "whatsapp://send?text=" + currentUrl,
                    "data-jsx": 3868259300
                  },
                  _react2["default"].createElement("i", { className: "ion-social-whatsapp-outline", "data-jsx": 3868259300
                  })
                )
              )
            )
          )
        ),
        _react2["default"].createElement(_style2["default"], {
          styleId: 3868259300,
          css: ".bs-post__share[data-jsx=\"3868259300\"]{background:#F7F7F7}.bs-post__share-subtitle[data-jsx=\"3868259300\"]{display:inline-block;font-size:20px;color:#3C515F}.l-wrap[data-jsx=\"3868259300\"]{-webkit-text-align:center;text-align:center}ul[data-jsx=\"3868259300\"]{display:inline-block}ul[data-jsx=\"3868259300\"] li[data-jsx=\"3868259300\"]{display:inline-block;margin-right:15px}.title[data-jsx=\"3868259300\"]{-webkit-text-align:center;text-align:center;font-size:20px;color:#3C515F;display:block;margin:40px auto}.icon[data-jsx=\"3868259300\"]{color:#939597;width:40px;height:40px;border-radius:40px;-webkit-text-align:center;text-align:center;display:block;border:1px solid #939597;padding:5px;font-size:20px}"
        })
      );
    }
  }]);
  return PostShare;
}(_react.Component);

PostShare.displayName = "PostShare";
exports["default"] = PostShare;

/***/ }),
/* 589 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _contactsSearchGrantGuidelines = __webpack_require__(590);

var _contactsSearchGrantGuidelines2 = _interopRequireDefault(_contactsSearchGrantGuidelines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import DOMPurify from 'dompurify';

var ContactsGG = function (_Component) {
  (0, _inherits3['default'])(ContactsGG, _Component);

  function ContactsGG() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ContactsGG);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContactsGG.__proto__ || (0, _getPrototypeOf2['default'])(ContactsGG)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      continent: '',
      country: null,
      countryName: '',
      contacts: []
    }, _this.setContact = function (countryName, e) {
      if (e) e.preventDefault();
      var _this$props = _this.props,
          contacts = _this$props.contacts,
          countriesTranslated = _this$props.countriesTranslated;

      var country = (0, _keys2['default'])(countriesTranslated).filter(function (countryKey) {
        return countriesTranslated[countryKey] === countryName;
      })[0];
      var selectedContacts = contacts.filter(function (contact) {
        return contact.countries.indexOf(country) !== -1;
      });

      if (contacts.length > 0) {
        _this.setState({ contacts: selectedContacts, country: country, countryName: countryName });
      }
    }, _this.setContinent = function (e, continentName) {
      if (e) e.preventDefault();

      if (_this.state.continent === continentName) {
        _this.setState({ continent: '' });
      } else {
        _this.setState({ continent: continentName });
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(ContactsGG, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          contactTitle = _props.contactTitle,
          continents = _props.continents,
          countries = _props.countries,
          countriesTranslated = _props.countriesTranslated,
          searchPlaceholder = _props.searchPlaceholder;
      var _state = this.state,
          countryName = _state.countryName,
          country = _state.country,
          continent = _state.continent;

      var countrySelected = country;
      var continentsKeys = (0, _keys2['default'])(continents);

      return _react2['default'].createElement(
        'div',
        {
          'data-jsx': 3911743141
        },
        _react2['default'].createElement(_contactsSearchGrantGuidelines2['default'], { searchPlaceholder: searchPlaceholder, countries: countries, countriesTranslated: countriesTranslated, onSelect: this.setContact }),
        _react2['default'].createElement(
          'ul',
          { className: 'col-6-l', 'data-jsx': 3911743141
          },
          continentsKeys.map(function (continentName) {
            return _react2['default'].createElement(
              'li',
              { key: continentName, className: continent === continentName ? 'continent__name continent__name--active' : 'continent__name', 'data-jsx': 3911743141
              },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: function onClick(e) {
                    return _this2.setContinent(e, continentName);
                  }, 'data-jsx': 3911743141
                },
                continentName,
                _react2['default'].createElement('i', { className: continent === continentName ? 'ion-chevron-up' : 'ion-chevron-down', 'data-jsx': 3911743141
                })
              ),
              _react2['default'].createElement(
                'ul',
                {
                  className: continent === continentName ? 'continent__countries continent__countries--open' : 'continent__countries',
                  'data-jsx': 3911743141
                },
                continents[continent] ? continents[continent].map(function (countr) {
                  return _react2['default'].createElement(
                    'li',
                    { key: countr, 'data-jsx': 3911743141
                    },
                    _react2['default'].createElement(
                      'a',
                      {
                        href: '#',
                        className: countr === countrySelected ? 'country-selected' : '',
                        onClick: function onClick(e) {
                          return _this2.setContact(countr, e);
                        },
                        'data-jsx': 3911743141
                      },
                      countr
                    )
                  );
                }) : ''
              )
            );
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-6-l contacts', 'data-jsx': 3911743141
          },
          _react2['default'].createElement(
            'h4',
            {
              'data-jsx': 3911743141
            },
            countryName
          ),
          _react2['default'].createElement(
            'p',
            {
              'data-jsx': 3911743141
            },
            this.state.contacts.length > 0 ? contactTitle : ''
          ),
          this.state.contacts.map(function (contact) {
            return _react2['default'].createElement(
              'div',
              { className: 'contact', 'data-jsx': 3911743141
              },
              _react2['default'].createElement('img', { src: contact.image, 'data-jsx': 3911743141
              }),
              _react2['default'].createElement(
                'h3',
                {
                  'data-jsx': 3911743141
                },
                contact.post_title
              ),
              contact.hasOwnProperty('fields') && contact.fields.length > 0 ? contact.fields.map(function (field) {
                return _react2['default'].createElement(
                  'p',
                  {
                    'data-jsx': 3911743141
                  },
                  field
                );
              }) : '',
              _react2['default'].createElement('div', { className: 'contact__content', dangerouslySetInnerHTML: { __html: contact.content }, 'data-jsx': 3911743141
              }),
              _react2['default'].createElement(
                'ul',
                { className: 'contact__countries', 'data-jsx': 3911743141
                },
                contact.hasOwnProperty('countries') && contact.countries.length > 0 ? contact.countries.map(function (countr) {
                  return _react2['default'].createElement(
                    'li',
                    {
                      'data-jsx': 3911743141
                    },
                    countriesTranslated[countr],
                    ' \xB7'
                  );
                }) : ''
              )
            );
          })
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 3911743141,
          css: 'ul[data-jsx="3911743141"]{padding:0}li[data-jsx="3911743141"]{list-style:none}.continent__name[data-jsx="3911743141"]>a[data-jsx="3911743141"]{background:#3C515F;display:block;padding:10px 30px;font-weight:500;color:#fff;margin-bottom:2px;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.continent__name[data-jsx="3911743141"]>a[data-jsx="3911743141"] i[data-jsx="3911743141"]{float:right}.continent__name--active[data-jsx="3911743141"]>a[data-jsx="3911743141"]{background:#F1364E}.contact__content[data-jsx="3911743141"]{margin:20px 0}.continent__countries[data-jsx="3911743141"]{display:none;background:#fff;height:400px;overflow-y:scroll;padding:20px 30px}.continent__countries--open[data-jsx="3911743141"]{display:block}.continent__countries[data-jsx="3911743141"] li[data-jsx="3911743141"] a[data-jsx="3911743141"]{color:#8E8E8E;margin-bottom:10px;display:block}.country-selected[data-jsx="3911743141"]{color:red !important;font-weight:bold}.contacts[data-jsx="3911743141"]{padding-left:40px}.contact[data-jsx="3911743141"]{padding-bottom:40px}.contact[data-jsx="3911743141"] h2[data-jsx="3911743141"]{margin:0 20px 0 0;color:#3C515F}.contacts[data-jsx="3911743141"] h4[data-jsx="3911743141"]{margin-bottom:20px;color:#3C515F}.contact[data-jsx="3911743141"] img[data-jsx="3911743141"]{max-width:100%}.contact[data-jsx="3911743141"] h3[data-jsx="3911743141"]{margin:0 20px 0 0;color:#3C515F}.contact[data-jsx="3911743141"] ul[data-jsx="3911743141"]{margin:20px 0}.contact[data-jsx="3911743141"] li[data-jsx="3911743141"]{float:left;color:#3c515f;margin-right:10px}.contact__countries[data-jsx="3911743141"] li[data-jsx="3911743141"]{font-weight:600}'
        })
      );
    }
  }]);
  return ContactsGG;
}(_react.Component);

ContactsGG.displayName = 'ContactsGG';


ContactsGG.propTypes = {
  contacts: _propTypes2['default'].array.isRequired,
  contactTitle: _propTypes2['default'].string.isRequired,
  searchPlaceholder: _propTypes2['default'].string.isRequired,
  continents: _propTypes2['default'].object.isRequired,
  countries: _propTypes2['default'].array.isRequired,
  countriesTranslated: _propTypes2['default'].object.isRequired
};

exports['default'] = ContactsGG;

/***/ }),
/* 590 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = __webpack_require__(591);

var _values2 = _interopRequireDefault(_values);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ContactsSearchGG = function (_Component) {
  (0, _inherits3['default'])(ContactsSearchGG, _Component);

  function ContactsSearchGG() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ContactsSearchGG);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContactsSearchGG.__proto__ || (0, _getPrototypeOf2['default'])(ContactsSearchGG)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      query: '',
      results: [],
      country: '',
      openResults: false
    }, _this.handleSubmit = function (country, e) {
      e.preventDefault();
    }, _this.handleChange = function (e) {
      e.preventDefault();
      var query = e.target.value;
      var countriesTranslated = _this.props.countriesTranslated;


      var results = (0, _values2['default'])(countriesTranslated).filter(function (country) {
        return country.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      _this.setState({ openResults: true, query: query, results: results });
    }, _this.handleSelect = function (e, country) {
      if (e) e.preventDefault();
      _this.setState({ country: country, openResults: false, query: '' });
      _this.props.onSelect(country);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(ContactsSearchGG, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          countriesTranslated = _props.countriesTranslated,
          searchPlaceholder = _props.searchPlaceholder;
      var _state = this.state,
          query = _state.query,
          results = _state.results,
          openResults = _state.openResults;


      return _react2['default'].createElement(
        'div',
        {
          'data-jsx': 1034869203
        },
        _react2['default'].createElement(
          'form',
          { onSubmit: this.handleSubmit, 'data-jsx': 1034869203
          },
          _react2['default'].createElement('input', { type: 'text', placeholder: searchPlaceholder, onChange: this.handleChange, value: query, 'data-jsx': 1034869203
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: openResults ? 'results results--open' : 'results', 'data-jsx': 1034869203
          },
          _react2['default'].createElement(
            'ul',
            {
              'data-jsx': 1034869203
            },
            results.length > 0 ? results.map(function (country) {
              return _react2['default'].createElement(
                'li',
                { key: country, 'data-jsx': 1034869203
                },
                _react2['default'].createElement(
                  'a',
                  { href: '#', onClick: function onClick(e) {
                      return _this2.handleSelect(e, country);
                    }, 'data-jsx': 1034869203
                  },
                  country
                )
              );
            }) : (0, _values2['default'])(countriesTranslated).map(function (country) {
              return _react2['default'].createElement(
                'li',
                { key: country, 'data-jsx': 1034869203
                },
                _react2['default'].createElement(
                  'a',
                  { href: '#', onClick: function onClick(e) {
                      return _this2.handleSelect(e, country);
                    }, 'data-jsx': 1034869203
                  },
                  country
                )
              );
            })
          )
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1034869203,
          css: '.results[data-jsx="1034869203"]{position:relative;max-height:220px;background:#fff;overflow-y:scroll;display:none}.results--open[data-jsx="1034869203"]{display:block}.results[data-jsx="1034869203"] ul[data-jsx="1034869203"]{padding:0}.results[data-jsx="1034869203"] ul[data-jsx="1034869203"] li[data-jsx="1034869203"]{list-style:none}.results[data-jsx="1034869203"] ul[data-jsx="1034869203"] li[data-jsx="1034869203"] a[data-jsx="1034869203"]{display:block;width:100%;height:40px;font-size:14px;-webkit-text-align:left;text-align:left;padding:10px 20px;background:#f7f7f7;color:#9b9b9b;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.results[data-jsx="1034869203"] ul[data-jsx="1034869203"] li[data-jsx="1034869203"] a[data-jsx="1034869203"]:hover{background:red;color:#fff}'
        })
      );
    }
  }]);
  return ContactsSearchGG;
}(_react.Component);

ContactsSearchGG.displayName = 'ContactsSearchGG';


ContactsSearchGG.propTypes = {
  onSelect: _propTypes2['default'].func.isRequired,
  countriesTranslated: _propTypes2['default'].object.isRequired,
  searchPlaceholder: _propTypes2['default'].string.isRequired
};

exports['default'] = ContactsSearchGG;

/***/ }),
/* 591 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(592), __esModule: true };

/***/ }),
/* 592 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(593);
module.exports = __webpack_require__(15).Object.values;

/***/ }),
/* 593 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(28)
  , $values = __webpack_require__(594)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 594 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(70)
  , toIObject = __webpack_require__(56)
  , isEnum    = __webpack_require__(88).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 595 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isInteger = __webpack_require__(261);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

var _isEmpty = __webpack_require__(116);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isEmail = __webpack_require__(92);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ContactUsForm = function (_Component) {
  (0, _inherits3['default'])(ContactUsForm, _Component);

  function ContactUsForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ContactUsForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContactUsForm.__proto__ || (0, _getPrototypeOf2['default'])(ContactUsForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      name: '',
      lastname: '',
      email: '',
      message: '',
      errors: {},
      complete: false
    }, _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3['default'])({}, e.target.name, e.target.value));
    }, _this.validate = function () {
      var fields = ['name', 'lastname', 'email', 'message'];
      var errors = {};

      fields.forEach(function (field) {
        var val = _this.state[field];
        errors[field] = field === 'email' ? !(0, _isEmail2['default'])(val) : (0, _isEmpty2['default'])(val);
      });

      _this.setState({ errors: errors });

      return fields.map(function (key) {
        var val = _this.state[key];
        return key === 'email' ? (0, _isEmail2['default'])(val) : !(0, _isEmpty2['default'])(val);
      });
    }, _this.handleSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
        var data, res;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e) e.preventDefault();

                if (!_this.validate().every(function (item) {
                  return item === true;
                })) {
                  _context.next = 7;
                  break;
                }

                data = _qs2['default'].stringify({ action: 'send_contact_us', data: _this.state });
                _context.next = 5;
                return _axios2['default'].post('/wp-admin/admin-ajax.php', data);

              case 5:
                res = _context.sent;

                if ((0, _isInteger2['default'])(res.data)) {
                  _this.setState({ complete: true });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(ContactUsForm, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          name = _state.name,
          lastname = _state.lastname,
          email = _state.email,
          message = _state.message,
          errors = _state.errors;
      var _props = this.props,
          placeholders = _props.placeholders,
          messages = _props.messages,
          btnText = _props.btnText;


      if (this.state.complete) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h4',
            { style: { color: '#3c515f' } },
            messages.thanks
          )
        );
      }

      return _react2['default'].createElement(
        'form',
        { action: '#', onSubmit: this.handleSubmit, 'data-jsx': 1496041568
        },
        _react2['default'].createElement(
          'div',
          { className: 'input-container', 'data-jsx': 1496041568
          },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'name',
            placeholder: placeholders.name,
            onChange: this.handleChange,
            value: name,
            'data-jsx': 1496041568
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.name ? 'input-error' : 'hidden', 'data-jsx': 1496041568
            },
            messages.name
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container', 'data-jsx': 1496041568
          },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'lastname',
            placeholder: placeholders.lastname,
            onChange: this.handleChange,
            value: lastname,
            'data-jsx': 1496041568
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.lastname ? 'input-error' : 'hidden', 'data-jsx': 1496041568
            },
            messages.lastname
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container', 'data-jsx': 1496041568
          },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'email',
            placeholder: placeholders.email,
            onChange: this.handleChange,
            value: email,
            'data-jsx': 1496041568
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.email ? 'input-error' : 'hidden', 'data-jsx': 1496041568
            },
            messages.email
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container', 'data-jsx': 1496041568
          },
          _react2['default'].createElement(
            'textarea',
            {
              placeholder: placeholders.message,
              name: 'message',
              rows: '5',
              onChange: this.handleChange,
              'data-jsx': 1496041568
            },
            message
          ),
          _react2['default'].createElement(
            'div',
            { className: errors.message ? 'input-error' : 'hidden', 'data-jsx': 1496041568
            },
            messages.message
          )
        ),
        _react2['default'].createElement(
          'button',
          {
            'data-jsx': 1496041568
          },
          btnText
        ),
        _react2['default'].createElement(_style2['default'], {
          styleId: 1496041568,
          css: 'textarea[data-jsx="1496041568"]{width:100%;background:transparent;padding:6px 12px;font-size:.8em;border:1px solid #6A7C82}textarea[data-jsx="1496041568"]:focus{outline:none}'
        })
      );
    }
  }]);
  return ContactUsForm;
}(_react.Component);

ContactUsForm.displayName = 'ContactUsForm';


ContactUsForm.propTypes = {
  placeholders: _propTypes2['default'].object.isRequired,
  messages: _propTypes2['default'].object.isRequired,
  btnText: _propTypes2['default'].string.isRequired
};

exports['default'] = ContactUsForm;

/***/ }),
/* 596 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(597);
module.exports = __webpack_require__(15).Number.isInteger;

/***/ }),
/* 597 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(28);

$export($export.S, 'Number', {isInteger: __webpack_require__(598)});

/***/ }),
/* 598 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(49)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 599 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = __webpack_require__(73);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _contact = __webpack_require__(118);

var _events = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var validate = function validate(str) {
	var s = typeof str === 'string' ? str.trim() : '';
	return s.length === 0;
};

var ContactCall = function (_Component) {
	(0, _inherits3['default'])(ContactCall, _Component);

	function ContactCall() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		(0, _classCallCheck3['default'])(this, ContactCall);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContactCall.__proto__ || (0, _getPrototypeOf2['default'])(ContactCall)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			name: '',
			lastname: '',
			email: '',
			country: _this.props.country,
			city: '',
			phone: '',
			prefix: _this.props.prefixes[_this.props.country],
			loading: false,
			errors: {
				name: false,
				lastname: false,
				email: false,
				country: false,
				city: false,
				phone: false
			}
		}, _this.handleInputChange = function (e, field) {
			_this.setState((0, _defineProperty3['default'])({}, e.target.name, e.target.value));
		}, _this.isValid = function () {

			var errors = (0, _keys2['default'])(_this.state.errors).reduce(function (obj, field) {
				var v = validate(_this.state[field]);
				console.log(field, v);
				obj[field] = v;
				return obj;
			}, {});

			_this.setState({ errors: errors });

			var invalid = errors.some(function (err) {
				return err;
			});
			return !invalid;
		}, _this.handleStore = function () {
			var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
				var _this$props, convertloop, redirect, contact, isValid, language, gaEventData, clEventData, fbEventData;

				return _regenerator2['default'].wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								e.preventDefault();
								_this$props = _this.props, convertloop = _this$props.convertloop, redirect = _this$props.redirect;

								_this.setState({ loading: true });
								contact = _this.state;
								isValid = _this.isValid();

								console.log('is valid: ', isValid);

								if (!isValid) {
									_context.next = 28;
									break;
								}

								_context.prev = 7;
								_context.next = 10;
								return (0, _contact.storeConvertLoop)(convertloop.tags, contact);

							case 10:
								language = window.bs.currentPageLang === 'Español' ? 'SP' : 'EN';
								gaEventData = { category: 'SUBSCRIBE', action: 'SUBSCRIBE', label: 'SUBSCRIBE_' + language };
								_context.next = 14;
								return (0, _events.storeEvent)('ga_event', gaEventData);

							case 14:
								clEventData = { name: convertloop.event, person: contact };
								_context.next = 17;
								return (0, _events.storeEvent)('cl_event', clEventData);

							case 17:
								fbEventData = { eventName: 'Lead' };
								_context.next = 20;
								return (0, _events.storeEvent)('fb_event', fbEventData);

							case 20:

								setTimeout(function () {
									return window.location = redirect;
								}, 0);
								_context.next = 26;
								break;

							case 23:
								_context.prev = 23;
								_context.t0 = _context['catch'](7);

								console.log(_context.t0);

							case 26:
								_context.next = 29;
								break;

							case 28:
								_this.setState({ loading: false });

							case 29:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[7, 23]]);
			}));

			return function (_x) {
				return _ref2.apply(this, arguments);
			};
		}(), _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	}

	(0, _createClass3['default'])(ContactCall, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    placeholders = _props.placeholders,
			    texts = _props.texts,
			    validation = _props.validation,
			    countries = _props.countries,
			    prefixes = _props.prefixes;
			var _state = this.state,
			    name = _state.name,
			    lastname = _state.lastname,
			    email = _state.email,
			    country = _state.country,
			    city = _state.city,
			    phone = _state.phone,
			    loading = _state.loading,
			    prefix = _state.prefix,
			    errors = _state.errors;


			return _react2['default'].createElement(
				'section',
				{ ref: function ref(_ref3) {
						return _this3.container = _ref3;
					}, 'data-jsx': 3199457661
				},
				_react2['default'].createElement(
					'form',
					{ onSubmit: this.handleStore, 'data-jsx': 3199457661
					},
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.name ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-person', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.name
							)
						),
						_react2['default'].createElement('input', {
							name: 'name',
							type: 'text',
							className: 'input-section__text',
							onChange: function onChange(e) {
								return _this3.handleInputChange(e);
							},
							value: name,
							'data-jsx': 3199457661
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.lastname ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-person', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.lastname
							)
						),
						_react2['default'].createElement('input', {
							name: 'lastname',
							type: 'text',
							className: 'input-section__text',
							onChange: function onChange(e) {
								return _this3.handleInputChange(e);
							},
							value: lastname,
							'data-jsx': 3199457661
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.email ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-person', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.email
							)
						),
						_react2['default'].createElement('input', {
							name: 'email',
							type: 'email',
							className: 'input-section__text',
							onChange: function onChange(e) {
								return _this3.handleInputChange(e);
							},
							value: email,
							'data-jsx': 3199457661
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.country ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-location', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.country
							)
						),
						_react2['default'].createElement(
							'select',
							{
								name: 'country',
								value: country,
								onChange: function onChange(e) {
									return _this3.handleInputChange(e);
								},
								className: 'input-section__select',
								'data-jsx': 3199457661
							},
							countries.map(function (country, i) {
								return _react2['default'].createElement(
									'option',
									{ key: i, value: country, 'data-jsx': 3199457661
									},
									country
								);
							})
						)
					),
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.city ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-location', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.city
							)
						),
						_react2['default'].createElement('input', {
							name: 'city',
							type: 'text',
							className: 'input-section__text',
							onChange: function onChange(e) {
								return _this3.handleInputChange(e);
							},
							value: city,
							'data-jsx': 3199457661
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: this.state.errors.phone ? "input-section input-err " : "input-section", 'data-jsx': 3199457661
						},
						_react2['default'].createElement(
							'div',
							{ className: 'input-section__placeholder', 'data-jsx': 3199457661
							},
							_react2['default'].createElement('i', { className: 'ion-iphone', 'data-jsx': 3199457661
							}),
							' ',
							_react2['default'].createElement(
								'span',
								{
									'data-jsx': 3199457661
								},
								placeholders.phone
							)
						),
						_react2['default'].createElement(
							'select',
							{ className: 'prefix', name: 'prefix', value: prefix, onChange: function onChange(e) {
									return _this3.handleInputChange(e);
								}, 'data-jsx': 3199457661
							},
							prefixes && (0, _keys2['default'])(prefixes).map(function (contr) {
								return _react2['default'].createElement(
									'option',
									{ value: prefixes[contr], 'data-jsx': 3199457661
									},
									'+ ' + prefixes[contr]
								);
							})
						),
						_react2['default'].createElement('input', {
							name: 'phone',
							type: 'text',
							className: 'input-section__text',
							onChange: function onChange(e) {
								return _this3.handleInputChange(e);
							},
							value: phone,
							'data-jsx': 3199457661
						})
					),
					_react2['default'].createElement(
						'button',
						{ disabled: loading, 'data-jsx': 3199457661
						},
						loading ? texts.loading : texts.btn
					)
				),
				_react2['default'].createElement(_style2['default'], {
					styleId: 3199457661,
					css: 'form[data-jsx="3199457661"] button[data-jsx="3199457661"]{height:50px;width:100%;background-color:#7ed321;font-size:20px;font-weight:bold;-webkit-text-align:center;text-align:center;color:#ffffff}.input-section[data-jsx="3199457661"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:solid 1px #d0d0d0;height:50px;width:100%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:16px;color:#1b1b1b;margin-bottom:15px}.input-err[data-jsx="3199457661"]{border-color:red}.prefix[data-jsx="3199457661"]{width:50%;border:none;background:#f1f1f1;height:100%;margin-left:10px}.input-section__placeholder[data-jsx="3199457661"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-weight:bold}.input-section__placeholder[data-jsx="3199457661"] i[data-jsx="3199457661"]{padding:0 5px 0 15px;font-size:18px}.input-section__text[data-jsx="3199457661"],.input-section__select[data-jsx="3199457661"]{border:none;height:auto}'
				})
			);
		}
	}]);
	return ContactCall;
}(_react.Component);

ContactCall.displayName = 'ContactCall';
exports['default'] = ContactCall;

/***/ }),
/* 600 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _contact = __webpack_require__(118);

var _events = __webpack_require__(36);

var _provinces_spain = __webpack_require__(601);

var _provinces_spain2 = _interopRequireDefault(_provinces_spain);

var _selectArrow = __webpack_require__(602);

var _selectArrow2 = _interopRequireDefault(_selectArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ContactSpain = function (_Component) {
	(0, _inherits3['default'])(ContactSpain, _Component);

	function ContactSpain() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		(0, _classCallCheck3['default'])(this, ContactSpain);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContactSpain.__proto__ || (0, _getPrototypeOf2['default'])(ContactSpain)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			'name': '',
			'lastname': '',
			'email': '',
			'country': _this.props.country,
			'postalCode': '',
			'province': '',
			'terms': false,
			'loading': false,
			'termsError': false
		}, _this.handleChange = function (e) {
			return _this.setState((0, _defineProperty3['default'])({}, e.target.name, e.target.value));
		}, _this.handleTerms = function (e) {
			return _this.setState({ terms: !_this.state.terms });
		}, _this.handleSubmit = function () {
			var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
				var _this$props, convertloop, redirect, contact, language, gaEventData, clEventData, fbEventData;

				return _regenerator2['default'].wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								e.preventDefault();
								_this$props = _this.props, convertloop = _this$props.convertloop, redirect = _this$props.redirect;
								contact = _this.state;

								if (!_this.state.terms) {
									_context.next = 26;
									break;
								}

								_this.setState({ loading: !_this.state.loading, termsError: false });
								_context.prev = 5;
								_context.next = 8;
								return (0, _contact.storeConvertLoop)(convertloop.tags, contact);

							case 8:
								language = window.bs.currentPageLang === 'Español' ? 'SP' : 'EN';
								gaEventData = { category: 'SUBSCRIBE_SPAIN', action: 'SUBSCRIBE_SPAIN', label: 'SUBSCRIBE_SPAIN' };
								_context.next = 12;
								return (0, _events.storeEvent)('ga_event', gaEventData);

							case 12:
								clEventData = { name: convertloop.event, person: contact };
								_context.next = 15;
								return (0, _events.storeEvent)('cl_event', clEventData);

							case 15:
								fbEventData = { eventName: 'Lead' };
								_context.next = 18;
								return (0, _events.storeEvent)('fb_event', fbEventData);

							case 18:

								setTimeout(function () {
									return window.location = redirect;
								}, 0);
								_context.next = 24;
								break;

							case 21:
								_context.prev = 21;
								_context.t0 = _context['catch'](5);

								console.log(_context.t0);

							case 24:
								_context.next = 27;
								break;

							case 26:
								_this.setState({ termsError: true });

							case 27:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[5, 21]]);
			}));

			return function (_x) {
				return _ref2.apply(this, arguments);
			};
		}(), _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	}

	(0, _createClass3['default'])(ContactSpain, [{
		key: 'render',
		value: function render() {
			var _state = this.state,
			    name = _state.name,
			    lastname = _state.lastname,
			    email = _state.email,
			    country = _state.country,
			    postalCode = _state.postalCode,
			    province = _state.province,
			    terms = _state.terms,
			    loading = _state.loading,
			    termsError = _state.termsError;
			var _props = this.props,
			    countries = _props.countries,
			    placeholder = _props.placeholder,
			    texts = _props.texts,
			    validation = _props.validation;


			return _react2['default'].createElement(
				'form',
				{ onSubmit: this.handleSubmit, 'data-jsx': 874102480
				},
				_react2['default'].createElement(
					'div',
					{ className: 'inputs-wrap', 'data-jsx': 874102480
					},
					_react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement('input', {
							type: 'text',
							name: 'name',
							placeholder: placeholder.name,
							value: name,
							onChange: this.handleChange,
							required: true,
							'data-jsx': 874102480
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement('input', {
							type: 'text',
							name: 'lastname',
							placeholder: placeholder.lastname,
							value: lastname,
							onChange: this.handleChange,
							'data-jsx': 874102480
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement('input', {
							type: 'email',
							name: 'email',
							placeholder: placeholder.email,
							value: email,
							onChange: this.handleChange,
							required: true,
							'data-jsx': 874102480
						})
					),
					_react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement(
							'div',
							{ className: 'select-container', 'data-jsx': 874102480
							},
							_react2['default'].createElement(
								'select',
								{ name: 'country', onChange: this.handleChange, value: country, 'data-jsx': 874102480
								},
								_react2['default'].createElement(
									'option',
									{ value: '', 'data-jsx': 874102480
									},
									placeholder.country
								),
								countries.map(function (country) {
									return _react2['default'].createElement(
										'option',
										{ value: country, 'data-jsx': 874102480
										},
										country
									);
								})
							),
							_react2['default'].createElement(_selectArrow2['default'], null)
						)
					),
					_react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement('input', {
							type: 'text',
							name: 'postalCode',
							placeholder: 'Código postal',
							onChange: this.handleChange,
							value: postalCode,
							'data-jsx': 874102480
						})
					),
					country === 'Spain' || country === 'España' ? _react2['default'].createElement(
						'div',
						{ className: 'col-12 col-6-m col-4-l', 'data-jsx': 874102480
						},
						_react2['default'].createElement(
							'div',
							{ className: 'select-container', 'data-jsx': 874102480
							},
							_react2['default'].createElement(
								'select',
								{ name: 'province', onChange: this.handleChange, value: province, 'data-jsx': 874102480
								},
								_react2['default'].createElement(
									'option',
									{ value: '', 'data-jsx': 874102480
									},
									placeholder.province
								),
								_provinces_spain2['default'].map(function (province) {
									return _react2['default'].createElement(
										'option',
										{ value: province.name, 'data-jsx': 874102480
										},
										province.name
									);
								})
							),
							_react2['default'].createElement(_selectArrow2['default'], null)
						)
					) : null
				),
				_react2['default'].createElement(
					'div',
					{ className: 'checkbox', 'data-jsx': 874102480
					},
					_react2['default'].createElement(
						'label',
						{ htmlFor: 'terms', 'data-jsx': 874102480
						},
						_react2['default'].createElement('input', {
							id: 'terms',
							type: 'checkbox',
							onChange: this.handleTerms,
							checked: terms, 'data-jsx': 874102480
						}),
						' ',
						placeholder.terms
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'err-container', 'data-jsx': 874102480
					},
					_react2['default'].createElement(
						'div',
						{ className: termsError ? 'err' : 'hidden', 'data-jsx': 874102480
						},
						validation.terms
					)
				),
				_react2['default'].createElement(
					'button',
					{ disabled: loading, 'data-jsx': 874102480
					},
					loading ? texts.loading : texts.btn
				),
				_react2['default'].createElement(_style2['default'], {
					styleId: 874102480,
					css: '.inputs-wrap[data-jsx="874102480"]::before{content:" ";display:table}input[data-jsx="874102480"],select[data-jsx="874102480"]{height:40px;width:100%;font-size:14px;color:#2B3740;background:#fff;border:2px solid #2B3740;font-family:\'Open Sans\';border-radius:5px;margin-bottom:20px !important}button[data-jsx="874102480"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#FC3938;-webkit-text-align:center;text-align:center;font-family:\'Open Sans\';font-weight:600;font-size:23px;width:100%;padding:5px 0 7px 0;margin:0 auto;box-sizing:content-box;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#fff}#terms[data-jsx="874102480"]{width:15px;height:15px;top:15px}.checkbox[data-jsx="874102480"]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#fff;font-size:12px;font-weight:600}.select-container[data-jsx="874102480"]{position:relative}.err-container[data-jsx="874102480"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:20px 0}.err[data-jsx="874102480"]{font-size:.9rem;background:#F4334A;display:inline;padding:3px 15px 3px 15px;border-radius:3px;color:#fff}@media (min-width:992px){input[data-jsx="874102480"],select[data-jsx="874102480"]{height:50px;font-size:16px}.checkbox[data-jsx="874102480"]{font-size:20px}button[data-jsx="874102480"]{font-size:35px;width:380px}}'
				})
			);
		}
	}]);
	return ContactSpain;
}(_react.Component);

ContactSpain.displayName = 'ContactSpain';
exports['default'] = ContactSpain;

/***/ }),
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var provincesSpain = [{ "name": "La Coruña", "short": "C", "country": "ES" }, { "name": "Lugo", "short": "LU", "country": "ES" }, { "name": "Vizcaya", "short": "BI", "country": "ES" }, { "name": "Guipúzcoa", "short": "SS", "country": "ES" }, { "name": "Huesca", "short": "HU", "country": "ES" }, { "name": "Lérida", "short": "L", "country": "ES" }, { "name": "Gerona", "short": "GI", "country": "ES" }, { "name": "Barcelona", "short": "B", "country": "ES" }, { "name": "Tarragona", "short": "T", "country": "ES" }, { "name": "Castellón", "short": "CS", "country": "ES" }, { "name": "Valencia", "short": "V", "country": "ES" }, { "name": "Alicante", "short": "A", "country": "ES" }, { "name": "Murcia", "short": "MU", "country": "ES" }, { "name": "Zaragoza", "short": "Z", "country": "ES" }, { "name": "Teruel", "short": "TE", "country": "ES" }, { "name": "Cuenca", "short": "CU", "country": "ES" }, { "name": "Albacete", "short": "AB", "country": "ES" }, { "name": "Almeria", "short": "AL", "country": "ES" }, { "name": "Granada", "short": "GR", "country": "ES" }, { "name": "Málaga", "short": "MA", "country": "ES" }, { "name": "Tenerife", "short": "TF", "country": "ES" }, { "name": "Cádiz", "short": "CA", "country": "ES" }, { "name": "Sevilla", "short": "SE", "country": "ES" }, { "name": "Huelva", "short": "H", "country": "ES" }, { "name": "Las Palmas", "short": "GC", "country": "ES" }, { "name": "Madrid", "short": "M", "country": "ES" }, { "name": "Badajoz", "short": "BA", "country": "ES" }, { "name": "Cáceres", "short": "CC", "country": "ES" }, { "name": "Toledo", "short": "TO", "country": "ES" }, { "name": "Ciudad Real", "short": "CR", "country": "ES" }, { "name": "Salamanca", "short": "SA", "country": "ES" }, { "name": "Córdoba", "short": "CO", "country": "ES" }, { "name": "Jaén", "short": "J", "country": "ES" }, { "name": "Ávila", "short": "AV", "country": "ES" }, { "name": "Valladolid", "short": "VA", "country": "ES" }, { "name": "Zamora", "short": "ZA", "country": "ES" }, { "name": "Álava", "short": "VI", "country": "ES" }, { "name": "Segovia", "short": "SG", "country": "ES" }, { "name": "Burgos", "short": "BU", "country": "ES" }, { "name": "Pontevedra", "short": "PO", "country": "ES" }, { "name": "León", "short": "LE", "country": "ES" }, { "name": "Orense", "short": "OU", "country": "ES" }, { "name": "Palencia", "short": "P", "country": "ES" }, { "name": "La Rioja", "short": "LO", "country": "ES" }, { "name": "Soria", "short": "SO", "country": "ES" }, { "name": "Guadalajara", "short": "GU", "country": "ES" }];

exports["default"] = provincesSpain;

/***/ }),
/* 602 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _style = __webpack_require__(16);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectArrow = function selectArrow() {
	return _react2["default"].createElement(
		"svg",
		{ width: "23px", height: "14px", viewBox: "0 0 23 14", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink", "data-jsx": 3546703980
		},
		_react2["default"].createElement("defs", {
			"data-jsx": 3546703980
		}),
		_react2["default"].createElement(
			"g",
			{ id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", "data-jsx": 3546703980
			},
			_react2["default"].createElement(
				"g",
				{ id: "2", transform: "translate(-559.000000, -532.000000)", strokeWidth: "4", stroke: "#5D5D5D", "data-jsx": 3546703980
				},
				_react2["default"].createElement("polyline", { id: "Path-2", points: "561 534.221514 570.092894 543.205 579.41 534", "data-jsx": 3546703980
				})
			)
		),
		_react2["default"].createElement(_style2["default"], {
			styleId: 3546703980,
			css: "svg[data-jsx=\"3546703980\"]{position:absolute;right:20px;top:15px}@media (min-width:992px){svg[data-jsx=\"3546703980\"]{top:20px}}"
		})
	);
};

selectArrow.displayName = "selectArrow";
exports["default"] = selectArrow;

/***/ }),
/* 603 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isInteger = __webpack_require__(261);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(72);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(2);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

var _isEmpty = __webpack_require__(116);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isEmail = __webpack_require__(92);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var lmForm = function (_Component) {
  (0, _inherits3['default'])(lmForm, _Component);

  function lmForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, lmForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = lmForm.__proto__ || (0, _getPrototypeOf2['default'])(lmForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      name: '',
      lastname: '',
      email: '',
      country: 'España',
      otherCountry: '',
      postalCode: '',
      province: _this.props.provinces[0],
      errors: {},
      complete: false
    }, _this.handleChange = function (e) {
      _this.setState((0, _defineProperty3['default'])({}, e.target.name, e.target.value));
    }, _this.validate = function () {
      var fields = ['name', 'lastname', 'email', 'country'];
      var errors = {};

      fields.forEach(function (field) {
        var val = _this.state[field];
        errors[field] = field === 'email' ? !(0, _isEmail2['default'])(val) : (0, _isEmpty2['default'])(val);
      });

      _this.setState({ errors: errors });

      return fields.map(function (key) {
        var val = _this.state[key];
        return key === 'email' ? (0, _isEmail2['default'])(val) : !(0, _isEmpty2['default'])(val);
      });
    }, _this.handleSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
        var data, res;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e) e.preventDefault();

                if (!_this.validate().every(function (item) {
                  return item === true;
                })) {
                  _context.next = 7;
                  break;
                }

                data = _qs2['default'].stringify({ action: 'send_lm', data: _this.state });
                _context.next = 5;
                return _axios2['default'].post('/wp-admin/admin-ajax.php', data);

              case 5:
                res = _context.sent;

                if ((0, _isInteger2['default'])(res.data)) {
                  _this.setState({ complete: true });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(lmForm, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          name = _state.name,
          lastname = _state.lastname,
          email = _state.email,
          country = _state.country,
          otherCountry = _state.otherCountry,
          postalCode = _state.postalCode,
          province = _state.province,
          errors = _state.errors;
      var _props = this.props,
          placeholders = _props.placeholders,
          messages = _props.messages,
          btnText = _props.btnText,
          provinces = _props.provinces;


      if (this.state.complete) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h4',
            { style: { color: '#3c515f' } },
            messages.thanks
          )
        );
      }

      return _react2['default'].createElement(
        'form',
        { action: '#', onSubmit: this.handleSubmit },
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'name',
            placeholder: placeholders.name,
            onChange: this.handleChange,
            value: name
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.name ? 'input-error' : 'hidden' },
            messages.name
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'lastname',
            placeholder: placeholders.lastname,
            onChange: this.handleChange,
            value: lastname
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.lastname ? 'input-error' : 'hidden' },
            messages.lastname
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'email',
            placeholder: placeholders.email,
            onChange: this.handleChange,
            value: email
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.email ? 'input-error' : 'hidden' },
            messages.email,
            'value=',
            name
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement(
            'label',
            null,
            placeholders.country,
            _react2['default'].createElement(
              'select',
              {
                name: 'country',
                value: country,
                onChange: this.handleChange,
                placeholder: placeholders.country
              },
              _react2['default'].createElement(
                'option',
                { value: 'Espa\xF1a' },
                'Espa\xF1a'
              ),
              _react2['default'].createElement(
                'option',
                { value: 'Otro' },
                'Otro'
              )
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: errors.country ? 'input-error' : 'hidden' },
            messages.country
          )
        ),
        country === 'Otro' ? _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'otherCountry',
            placeholder: placeholders.country,
            onChange: this.handleChange,
            value: otherCountry
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.otherCountry ? 'input-error' : 'hidden' },
            messages.otherCountry
          )
        ) : '',
        country === 'España' ? _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement('input', {
            type: 'text',
            name: 'postalCode',
            placeholder: placeholders.postal_code,
            onChange: this.handleChange,
            value: postalCode
          }),
          _react2['default'].createElement(
            'div',
            { className: errors.postalCode ? 'input-error' : 'hidden' },
            messages.postalCode
          )
        ) : '',
        country === 'España' ? _react2['default'].createElement(
          'div',
          { className: 'input-container' },
          _react2['default'].createElement(
            'label',
            null,
            placeholders.province,
            _react2['default'].createElement(
              'select',
              {
                name: 'province',
                value: province,
                onChange: this.handleChange,
                placeholder: placeholders.province
              },
              provinces.map(province, function () {
                return _react2['default'].createElement(
                  'option',
                  { value: province },
                  province
                );
              })
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: errors.province ? 'input-error' : 'hidden' },
            messages.province
          )
        ) : '',
        _react2['default'].createElement(
          'button',
          null,
          btnText
        )
      );
    }
  }]);
  return lmForm;
}(_react.Component);

lmForm.displayName = 'lmForm';


lmForm.propTypes = {
  placeholders: _propTypes2['default'].object.isRequired,
  messages: _propTypes2['default'].object.isRequired,
  btnText: _propTypes2['default'].string.isRequired,
  provinces: _propTypes2['default'].array.isRequired
};

exports['default'] = lmForm;

/***/ }),
/* 604 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hammerjs = __webpack_require__(224);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var setMenuMobile = function setMenuMobile() {
  var _this = this;

  var $menu = $('.menu--mobile');
  var currentLang = $('.menu--mobile .current-lang > a');
  $('.menu--mobile .current-lang').addClass('dropdown');
  $('.menu--mobile .current-lang').append('<ul class="menu--mobile__langs"></ul>');

  var langs = $('.menu--mobile .lang-item').not($('.current-lang'));
  var $dropdown = $menu.find('.menu--mobile__langs');

  langs.each(function () {
    $dropdown.append($(this).html());
    $(this).remove();
  });

  var newText = currentLang.text() + '  <i class="ion-chevron-right"></i>';
  currentLang.html(newText);

  currentLang.on('click', function (e) {
    e.preventDefault();

    if ($dropdown.hasClass('menu--mobile__langs--open')) {
      $(_this).find('i').attr('class', 'ion-chevron-right');
      $dropdown.removeClass('menu--mobile__langs--open');
    } else {
      $(_this).find('i').attr('class', 'ion-chevron-down');
      $dropdown.addClass('menu--mobile__langs--open');
    }
  });

  var $mainLinks = $('.menu--mobile .menu-item-has-children > a');

  $mainLinks.each(function () {
    var itemWithIcon = $(this).text() + '  <i class="ion-chevron-right"></i>';
    $(this).html(itemWithIcon);
  });

  $mainLinks.on('click', function (e) {
    e.preventDefault();

    var $submenu = $(this).parent().find('.sub-menu');

    if ($submenu.hasClass('sub-menu--open')) {
      $(this).find('i').attr('class', 'ion-chevron-right');
      $submenu.removeClass('sub-menu--open');
    } else {
      $('.menu--mobile .menu-item-has-children > a').find('i').attr('class', 'ion-chevron-right');
      $('.menu--mobile .menu-item-has-children .sub-menu').removeClass('sub-menu--open');
      $(this).find('i').attr('class', 'ion-chevron-down');
      $submenu.addClass('sub-menu--open');
    }
  });

  function openMenuMobile() {
    $(document.body).addClass('menu-open');
    $('.menu--mobile').addClass('menu--mobile--open');
    $('.menu--mobile__overlay').addClass('menu--mobile__overlay--open');
  }

  function closeMenuMobile() {
    $(document.body).removeClass('menu-open');
    $('.menu--mobile').removeClass('menu--mobile--open');
    $('.menu--mobile__overlay').removeClass('menu--mobile__overlay--open');
  }

  $('.open-menu').on('click', function (e) {
    e.stopPropagation();
    openMenuMobile();
  });

  $('.close-menu').on('click', function (e) {
    e.stopPropagation();
    closeMenuMobile();
  });

  $(document).on('click', function (e) {
    if ($.contains($menu.get(0), e.target) || $menu.get(0) === e.target) {} else {
      closeMenuMobile();
    }
  });

  var stage = document.body;
  var mc = new _hammerjs2['default'].Manager(stage);
  var Swipe = new _hammerjs2['default'].Swipe({ direction: _hammerjs2['default'].DIRECTION_HORIZONTAL });
  mc.add(Swipe);

  mc.on('swipeleft', function (e) {
    openMenuMobile();
  });

  mc.on('swiperight', function (e) {
    closeMenuMobile();
  });
};

exports['default'] = setMenuMobile;

/***/ }),
/* 605 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMenu = function setMenu() {
  var $menu = $('.menu');
  var currentLang = $('.menu .current-lang > a');
  $menu.find('.current-lang').addClass('dropdown');
  $menu.find('.current-lang').append('<div class="dropdown-content"></div>');

  var langs = $('.menu .lang-item').not($('.current-lang'));

  langs.each(function () {
    $menu.find('.dropdown-content').append($(this).html());
    $(this).remove();
  });

  $menu.addClass('menu--show');

  currentLang.on('click', function (e) {
    e.preventDefault();
    var $dropdown = $menu.find('.dropdown-content');

    if ($dropdown.hasClass('dropdown-content--show')) {
      $dropdown.removeClass('dropdown-content--show');
    } else {
      $dropdown.addClass('dropdown-content--show');
    }
  });

  var newText = currentLang.text() + ' <i class="ion-chevron-down"></i>';
  currentLang.html(newText);
};

exports['default'] = setMenu;

/***/ }),
/* 606 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(42);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(43);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = __webpack_require__(67);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(68);

var _qs2 = _interopRequireDefault(_qs);

var _events = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
  if ($('.bs-donate a')) {
    $('.bs-donate a').text(window.bs.donate);
  }

  if ($('.bs-donate')) {
    $('.bs-donate').on('click', function () {
      var _ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function _callee(e) {
        var $el, data, res;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                $el = $(this);
                data = _qs2['default'].stringify({ action: 'donate_redirect_2' });
                _context.prev = 3;
                _context.next = 6;
                return (0, _events.eventGoogleAnalytics)({ category: 'CLICK', action: 'DONATE', label: 'CLICKDONATE_EN' });

              case 6:
                _context.next = 8;
                return (0, _events.eventConvertloopAsync)({ name: 'Donate Click' });

              case 8:
                if (!($el.attr('href') && $el.attr('href') !== '#' && $el.attr('href') !== '')) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', window.location = $el.attr('href'));

              case 10:
                _context.next = 12;
                return _axios2['default'].post('/wp-admin/admin-ajax.php', data);

              case 12:
                res = _context.sent;

                if (!(res.data !== false)) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', window.location = res.data);

              case 15:
                return _context.abrupt('return', window.location = $el.attr('href'));

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](3);

                console.log('donate redirect err: ', _context.t0);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 18]]);
      }));

      function onClickDonate(_x) {
        return _ref.apply(this, arguments);
      }

      return onClickDonate;
    }());
  }
};

/***/ }),
/* 607 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = smoothScroll;

var _debounce = __webpack_require__(93);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function smoothScroll() {
  $('.bs-donate, .bs-anchor').on('click', function handleAnchor(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;
      var less = $('.nav') ? $('.nav').height() + 20 : 0;

      var scrollTop = $(hash) ? $(hash).offset().top - less : 0;
      $('html, body').animate({ scrollTop: scrollTop }, 800, function () {});
    }
  });

  if ($('.nav').length > 0) {
    window.addEventListener('scroll', (0, _debounce2['default'])(function () {
      if ($('.nav').offset().top > 0) {
        $('#return-to-top').css({ display: 'block' });
      } else {
        $('#return-to-top').css({ display: 'none' });
      }
    }, 200));
  }

  $('#return-to-top').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({ scrollTop: 0 }, 800, function () {});
  });
}

/***/ }),
/* 608 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = scrollViaCrucisNav;

var _debounce = __webpack_require__(93);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function scrollViaCrucisNav() {
  var onScroll = (0, _debounce2['default'])(function () {
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
/* 609 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toggleViaCrucisNav;
function toggleViaCrucisNav() {
  if ($('.via-crucis-toggle')) {
    $('.via-crucis-toggle').on('click', function (e) {
      e.preventDefault();
      $('.via-crucis-toggle i').toggleClass('ion-chevron-up');
      $('.via-crucis-nav__container').toggleClass('via-crucis-nav__container--open');
    });
  }
}

/***/ }),
/* 610 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toggleMenu;
function toggleMenu() {
  if (window.innerWidth < 701) {
    if ($('.grant-menu__list').length > 0) $('.grant-menu__list').removeClass('dropdown-list--show');
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

  $('.dropdown-trigger').on('click', function handleDropdown(e) {
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
/* 611 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = stickyMenu;
function stickMenu() {
  var $nav = $('.nav');
  var $stickyMenu = $('.sticky-menu');
  var navTop = $nav.length > 0 ? $nav.offset().top : 0;
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

/***/ })
],[485]);