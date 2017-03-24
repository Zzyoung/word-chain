/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = RedBlackBST;
function RedBlackBST () {
    this.root = null;
}

var RED = true;
var BLACK = false;

function Node (key, val, N, color) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.color = color;
    this.left = null;
    this.right = null;
}

function size (node) {
    if (node === null) {return 0}
        else {return node.N}
}

function min(node) {
    if (node.left === null) {
        return node;
    }
    return min(node.left);
}

function isRed (node) {
    if (node === null) return false;
    return node.color === RED;
}

function rotateLeft (node) {
    var temp = node.right;  
    node.right = temp.left; 
    temp.left = node;       
    temp.color = node.color;    // 保存根节点的颜色
    node.color = RED;           // 经过旋转h成了红色左链接
    temp.N = node.N;
    node.N = 1 + size(node.left) + size(node.right);
    return temp;
}

function rotateRight (node) {
    var temp = node.left;
    node.left = temp.right;
    temp.right = node;
    temp.color = node.color;
    node.color = RED;
    temp.N = node.N;
    node.N = 1 + size(node.left) + size(node.right);
    return temp;
}

function flipColors (node) {
    node.color = !node.color;
    if (node.left !== null) {
        node.left.color = !node.left.color;
    }
    if (node.right !== null) {
        node.right.color = !node.right.color;
    }
}

function put (node, key, val) {
    if (node == null) {
        return new Node(key, val, 1, RED);
    }

    var cmp = compareTo(key, node.key);
    if (cmp < 0) {
        node.left = put(node.left, key, val);
    } else if (cmp > 0) {
        node.right = put(node.right, key, val);
    } else {
        node.val = val;
    }

    if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.N = size(node.left) + size(node.right) + 1;
    return node;
}

function compareTo (val1, val2) {
    if (val1 < val2) {
        return -1;
    } else if(val1 > val2) {
        return 1;
    } else {
        return 0;
    }
}

function get (node, key) {
    if (node === null) {
        return null;
    }
    var cmp = compareTo(key, node.key);

    if (cmp < 0) {
        return get(node.left, key);
    } else if (cmp > 0) {
        return get(node.right, key);
    } else {
        return node.val;
    }
}

function moveRedLeft (node) {
    flipColors(node);
    if (node.right !== null && isRed(node.right.left)) {
        node.right = rotateRight(node.right);
        node = rotateLeft(node);
    }
    return node;
}

function moveRedRight (node) {
    flipColors(node);
    if (node.left !== null && (!isRed(node.left.left))) {
        node = rotateRight(node);
    }
    return node;
}

function balance (node) {
    if (isRed(node.right)) {
        node = rotateLeft(node);
    }
    if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.N = size(node.left) + size(node.right) + 1;
    return node;
}

function deleteMin (node) {
    if (node.left === null) {
        return null;
    }
    if (!isRed(node.left) && !isRed(node.left.left)) {
        node = moveRedLeft(node);
    }
    node.left = deleteMin(node.left);
    return balance(node);
}

function remove (node, key) {
    if (compareTo(key, node.key) < 0) {
        if (!isRed(node.left) && !isRed(node.left.left)) {
            node = moveRedLeft(node);
        }
        node.left = remove(node.left, key);
    } else {
        if (isRed(node.left)) {
            node = rotateRight(node);
        }
        if (compareTo(key, node.key) === 0 && node.right === null) {
            return null;
        }
        if ((!isRed(node.right)) && (!isRed(node.right.left))) {
            node = moveRedRight(node);
        }
        if (compareTo(key, node.key) === 0) {
            node.val = get(node.right, min(node.right).key);
            node.key = min(node.right).key;
            node.right = deleteMin(node.right);
        } else {
            node.right = remove(node.right, key);
        }
    }

    return balance(node);
}

function getByFirstLetter(node, prefix) {
    if (node === null) {
        return null;
    }
    var cmp = compareTo(prefix, node.key.charAt(0));
    if (cmp < 0) {
        return getByFirstLetter(node.left, prefix);
    } else if (cmp > 0) {
        return getByFirstLetter(node.right, prefix);
    } else {
        return node.val;
    }
}

RedBlackBST.prototype.size = function () {
    return size(this.root);
}

RedBlackBST.prototype.isEmpty = function () {
    return size(this.root) === 0;
}

RedBlackBST.prototype.put = function (key, val) {
    this.root = put(this.root, key, val)
    this.root.color = BLACK;
}

RedBlackBST.prototype.get = function (key) {
    return get(this.root, key);
}

RedBlackBST.prototype.deleteMin = function () {
    if ((!isRed(this.root.left)) && (!isRed(this.root.right))) {
        this.root.color = RED;
    }
    this.root = deleteMin(this.root);
    if (!this.isEmpty()) {
        this.root.color = BLACK;
    }
}

RedBlackBST.prototype.remove = function (key) {
    if ((!isRed(this.root.left)) && (!isRed(this.root.right))) {
        this.root.color = RED;
    }
    this.root = remove(this.root, key);
    if (!this.isEmpty()) {
        this.root.color = BLACK;
    }
}

RedBlackBST.prototype.getByFirstLetter = function (prefix) {
    return getByFirstLetter(this.root, prefix);
}



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(2)
var ieee754 = __webpack_require__(6)
var isArray = __webpack_require__(7)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  width: 100%;\n  height: 100%;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  margin: 0 auto;\n  max-width: 480px;\n  min-height: 100%;\n  height:100%;\n  background-color: rgb(234, 244, 233);\n  font-family: \"Helvetica Neue\",Helvetica,Tahoma,Arial,\"PingFang SC\",STHeiti,\"Microsoft YaHei\",SimSun,Heiti,sans-serif;\n}\n.clearfix:after{\n  content: \".\";\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden\n}\n\n.start-page {\n  padding-top: 60px;\n  box-sizing: border-box;\n  min-width: 100%;\n  min-height: 100%;\n}\n\n.start-page header {\n  width: 150px;\n  margin: 0 auto;\n  text-align: center;\n}\n\n.start-page header img {\n  width: 48px;\n  height: auto;\n}\n\n.start-page header h1 {\n  margin-top: 12px;\n  font-size: 22px;\n  color: rgb(162, 184, 148);\n}\n\n.start-page .start {\n  display: block;\n  width: 52%;\n  height: 60px;\n  margin: 40% auto 24%;\n  font-size: 20px;\n  color: #fff;\n  background-color: rgb(177, 204, 149);\n  border: 2px solid rgb(168, 192, 144);\n  border-radius: 30px;\n  outline: none;\n}\n\n.start-page .rules {\n  position: relative;\n  width: 90%;\n  height:120px;\n  margin: 80px auto 0;\n  background-color: #fff;\n  border: 2px solid rgb(226, 233, 225);\n  border-radius: 10px;\n  box-shadow: 0 2px 12px 0 rgba(0,0,0,.08);\n}\n\n.start-page .rules h6 {\n  position: absolute;\n  left: 12px;\n  top: -10px;\n  width: 80px;\n  height:20px;\n  border:1px solid;\n  border-radius: 3px;\n  background-color: rgb(234, 244, 233);\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  color:rgb(167, 183, 157);\n  font-weight: normal;\n}\n\n.start-page .rules ul {\n  position: absolute;\n  top: 50%;\n  left: 10%;\n  transform: translateY(-50%);\n}\n\n.start-page .rules ul li {\n  margin-bottom: 6px;\n}\n\n.game-page {\n  box-sizing: border-box;\n  min-width: 100%;\n  min-height: 100%;\n  padding-top: 24px;\n}\n\n.game-page header {\n  position: relative;\n  width: 90%;\n  height: 40px;\n  padding-left: 18px;\n  background-color: rgb(214, 238, 190);\n  margin:0 auto;\n  border-radius: 20px;\n}\n\n.game-page .score {\n  position: absolute;\n  top:10px;\n  height: 20px;\n  line-height: 20px;\n  color:rgb(75, 177, 67);\n  font-weight: 900;\n  font-size: 22px;\n  padding-right: 10px;\n}\n\n.game-page .score::after {\n  content: '\\6210\\7EE9';\n  display: inline-block;\n  height: 17px;\n  font-size: 14px;\n  vertical-align: 1px;\n  font-weight: normal;\n  padding-left: 6px;\n  margin-left: 10px;\n  border-left: 1px solid;\n}\n\n.timer {\n  position: absolute;\n  right: 0;\n  top:0;\n}\n\n.timer-wrapper, .timer-wrapper *, .achter{\n  box-sizing: border-box;\n}\n.timer-wrapper {\n  top:0px;\n  right: 0px;\n  z-index: 1;\n  width: 40px;\n  height: 40px;\n  position: absolute;\n}\n.timer-wrapper .num {\n  position: absolute;\n  top:0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  width:20px;\n  height: 20px;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  color:rgb(75, 177, 67);\n}\n.timer-wrapper .left {\n  width: 20px;\n  height: 40px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border:4px solid #fff;\n  border-right:none;\n  border-radius: 20px 0 0 20px;\n  z-index: 10;\n  opacity: 0;\n  animation: fill 15s steps(1, end) 1;\n  animation-fill-mode: forwards;\n}\n.timer-wrapper .right {\n  width: 20px;\n  height: 40px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  border:4px solid #fff;\n  border-left:none;\n  border-radius: 0 20px 20px 0;\n  z-index: 10;\n  opacity: 1;\n  animation: mask 15s steps(1, end) 1;\n  animation-fill-mode: forwards;\n}\n.achter{\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  border:4px solid rgb(94,181,84);\n  border-radius: 20px ;\n  z-index: 0;\n  opacity: 1;\n\n}\n.timer-wrapper .rotate {\n  width: 20px;\n  height: 40px;\n  position: absolute; \n  top: 0px;\n  right: 0px;\n  background: transparent;\n  border:4px solid rgb(94,181,84);\n  border-left:none;\n  border-radius: 0 20px 20px 0;\n  z-index: 20;\n  transform-origin: 0 50%;\n  animation: rota 15s linear 1;\n  animation-fill-mode: forwards;\n}\n\n.timer-wrapper.paused .left, .timer-wrapper.paused .right, .timer-wrapper.paused .rotate {\n  animation-play-state: paused;\n}\n.timer-wrapper.no-animation .left, .timer-wrapper.no-animation .right, .timer-wrapper.no-animation .rotate {\n  animation-name: initial;\n}\n@keyframes rota {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n@keyframes fill {\n  0%        { opacity: 0; }\n  50%, 100% { opacity: 1; }\n}\n@keyframes mask {\n  0%        { z-index: 10; }\n  50%, 100% { z-index: 30; }\n}\n@keyframes scaleIn {\n  0%        {transform: scale(0);}\n  100%      {transform: scale(1);}\n}\n.game-page .main {\n  position: relative;\n  margin-top: 30px;\n  width: 100%;\n  height: 180px;\n  overflow: scroll;\n}\n\n.game-page #word-chain {\n  width: 100%;\n  list-style-type: none;\n}\n\n.game-page #word-chain li {\n  width: 100%;\n  text-align: center;\n  animation: scaleIn .3s linear 1;\n}\n.game-page #word-chain li:nth-child(2n) span, .game-page #word-chain li:nth-child(2n) .pass{\n  background-color: #fff;\n}\n.game-page #word-chain li:nth-child(2n-1) span, .game-page #word-chain li:nth-child(2n-1) .pass{\n  background-color: rgb(247, 254, 236);\n}\n.game-page #word-chain li span {\n  display: inline-block;\n  padding: 10px 30px;\n  height: 20px;\n  line-height: 20px;\n  border-radius: 20px;\n  font-size: 20px;\n  font-weight: bold;\n  letter-spacing: 0.5px;\n  color: rgb(147, 147, 147);\n}\n.game-page #word-chain li span em {\n  font-style: normal;\n  color:rgb(105, 108, 99);\n}\n.game-page #word-chain li .pass {\n  position: relative;\n  height: 20px;\n  width: 40px;\n  margin: 0 auto;\n}\n.game-page #word-chain li .pass:before {\n  content:'';\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 18px;\n  height: 20px;\n  border-top-right-radius: 10px;\n  background-color: rgb(234, 244, 233);\n}\n.game-page #word-chain li .pass:after {\n  content:'';\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 18px;\n  height: 20px;\n  border-top-left-radius: 10px;\n  background-color: rgb(234, 244, 233);\n}\n.game-page #word-chain li:last-child .pass {\n  display: none;\n}\n.game-page #word-chain li:last-child span em {\n  color:rgb(75, 177, 67);\n}\n.game-page #word-chain li span:first-letter {\n  color:rgb(105, 108, 99);\n}\n\n.game-page .input-wrapper {\n  position: relative;\n  width: 100%;\n  margin-top: 12px;\n}\n\n#answer-wrapper {\n  box-sizing: border-box;\n  width: 62.5%;\n  height: 36px;\n  margin: 0 auto;\n  outline: none;\n  border-radius: 18px;\n  border:none;\n  text-align: center;\n  font-weight: bold;\n  font-size: 16px;\n  line-height: 36px;\n  background-color: #fff;\n}\n\n#answer-input {\n  padding: 0 3px;\n  letter-spacing: 0.3px;\n  color: rgb(75, 177, 67);\n  border-right: 2px solid transparent;\n}\n\n#answer-wrapper.focus {\n  border: 1px solid rgb(75, 177, 67);\n  line-height: 34px;\n  box-shadow: 0 2px 12px 0 rgba(0,0,0,.08);\n}\n\n#answer-wrapper.focus #answer-input {\n  animation: blink 1s infinite steps(1, start);\n}\n\n.game-page .input-wrapper .arrow {\n  position: absolute;\n  right: 5%;\n  top: 0;\n  box-sizing: border-box;\n  width: 36px;\n  height: 36px;\n  color: rgb(75, 177, 67);\n  border: 2px solid rgb(209, 221, 199);\n  border-radius: 12px;\n  text-align: center;\n  line-height: 28px;\n  outline: none;\n}\n\n.game-page footer {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 80px;\n  padding: 10px 0 0 30px;\n  border-top: 2px solid rgb(220, 230, 219);\n  background-color: rgb(242, 248, 238);\n  color: rgb(157, 170, 140);\n}\n\n.end-modal {\n  position: fixed;\n}\n\n.modal-header {\n  width: 100%;\n  text-align: center;\n  font-size: 30px;\n  font-weight: bold;\n  color:rgb(159, 184, 138);\n}\n\n.modal-content {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top:24%;\n  margin: 0 auto;\n  padding: 30px 0 20px;\n  width: 90%;\n  background-color: #fff;\n  text-align: center;\n  z-index: 2;\n  border-radius: 5px;\n  color:rgb(159, 184, 138);\n}\n\n.modal-content .score {\n  font-size: 40px;\n  font-weight: bold;\n  margin-top: 12px;\n}\n\n.modal-content #restart {\n  margin-top: 30px;\n  width: 36%;\n  height: 30px;\n  line-height: 30px;\n  color: #fff;\n  outline: none;\n  border: none;\n  border-radius: 15px;\n  background-color: rgb(159, 184, 138);\n}\n\n.end-modal:before {\n  position: fixed;\n  content: '';\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n  background-color: rgba(0,0,0,.12);\n}\n\n.game-page #error-msg {\n  margin-top: 20px;\n  height: 20px;\n  line-height: 20px;\n  color: red;\n  text-align: center;\n  visibility: hidden;\n}\n\n#keyboard {\n  position: fixed;\n  box-sizing: border-box;\n  bottom:0;\n  left:0;\n  height:180px;\n  width:100%;\n  padding-top: 20px;\n  background-color: rgb(226, 239, 222);\n  transform: translateY(0);\n  transition: transform .2s linear;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-focus: none;\n  -moz-user-select: none;\n  -webkit-appearance:none;\n  outline: none;\n  border: none;\n}\n#keyboard.hide {\n  transform: translateY(100%);\n}\n#keyboard span{\n  float: left;\n  box-sizing: border-box;\n  width: 9%;\n  height: 38px;\n  margin-bottom: 9px;\n  margin-right: 1%;\n  line-height: 34px;\n  text-align: center;\n  border: 1px solid rgb(174,174,174);\n  border-radius: 5px;\n  font-size: 20px;\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,.18);\n  background-color: #fff;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -webkit-touch-callout:none;\n  -moz-user-focus: none;\n  -moz-user-select: none;\n  -webkit-appearance:none;\n  outline: none;\n  border: none;\n}\n\n#keyboard span:first-child {\n  margin-left: 0.5%;\n}\n\n#keyboard span:last-child {\n  margin-right: 0.5%;\n}\n\n#keyboard .del {\n  width: 18%;\n}\n\n#keyboard .second-line span:first-child, #keyboard .third-line span:first-child {\n  margin-left: 6%;\n}\n\n@keyframes blink {\n    0%, 100% {\n        border-right: 2px solid #000;\n    }\n    50% {\n        border-right: 2px solid transparent;\n    }\n}\n\n\n\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedBlackBST__ = __webpack_require__(1);

__webpack_require__(0);

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var dictionary = {
  data: new __WEBPACK_IMPORTED_MODULE_0__RedBlackBST__["a" /* RedBlackBST */](),
  wordChain: [],
  getByFirstLetter: function (prefix) {
    var result = this.data.getByFirstLetter(prefix);
    this.wordChain.push(result);
    this.data.remove(result);
    return result;
  },
  validate: function (word) {
    var search = this.data.get(word);
    var validate = search === word;
    if (validate) {
      this.wordChain.push(word);
      this.data.remove(word);
    }
    return validate;
  },
  isRepeat: function (word) {
    return this.wordChain.indexOf(word) >= 0;
  },
  size: function () {
    return this.data.size();
  },
  reset: function () {
    for (var i = this.wordChain.length - 1; i >= 0; i--) {
      this.data.put(this.wordChain[i], this.wordChain[i]);
    }
    this.wordChain = [];
  }
};
(function () {
    'use strict';
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var wordChainDom = null;
    var startBtn = null;
    var answerBtn = null;
    var answerInput = null;
    var answerWrapper = null;
    var wordChainWrapper = null;
    var errorMsgDom = null;
    var gamePageDom = null;
    var keyboard = null;
    var game = {
      scoreDom: null,
      timerDom: {
        timerWrapper: null,
        num: null,
        left: null,
        right: null,
        rotate: null
      },
      endModal: null,
      score: 0,
      defaultCycle: 15,
      cycle: 15,
      jsTimer: null,
      getScore: function () {
        this.score ++;
        this.scoreDom.innerHTML = this.score;
      },
      timeStart: function () {
        var self = this;
        addClass(this.timerDom.timerWrapper,'no-animation');
        removeClass(this.timerDom.timerWrapper, 'paused');
        setTimeout(function() {
          removeClass(self.timerDom.timerWrapper,'no-animation');
        },20);
        this.timerDom.num.innerHTML = this.defaultCycle;
        this.cycle = this.defaultCycle;
        this.startInterval();
      },
      timePause: function () {
        addClass(this.timerDom.timerWrapper, 'paused');
      },
      start: function() {
        document.querySelector('.start-page').style.display = 'none';
        document.querySelector('.game-page').style.display = 'block';
        hideError();
        this.timeStart();
        this.startInterval();
      },
      restart: function () {
        this.endModal.style.display = 'none';
        this.score = 0;
        this.cycle = this.defaultCycle;
        this.scoreDom.innerHTML = 0;
        wordChainDom.innerHTML = '';
        dictionary.reset();

        this.start();
        computer.answer(letters[new Date().getTime() % 25]);
      },
      startInterval: function() {
        var self = this;
        clearInterval(this.jsTimer);
        this.jsTimer = setInterval(function () {
          self.cycle--;
          self.timerDom.num.innerHTML = self.cycle;
          if (self.cycle === 0) {
            clearInterval(self.jsTimer);
            self.computerWin();
          }
        }, 1000);
      },
      computerWin: function () {
        this.timePause();
        
        this.endModal.querySelector('.score').innerHTML = this.score;
        this.endModal.style.display = 'block';
        addClass(keyboard, 'hide');
      },
      playerWin: function () {
        this.timePause();

        this.endModal.querySelector('.score').innerHTML = this.score;
        this.endModal.querySelector('.modal-header').innerHTML = 'YOU WIN!';
        this.endModal.style.display = 'block';
      }
    };
    var computer = {
      memory: new __WEBPACK_IMPORTED_MODULE_0__RedBlackBST__["a" /* RedBlackBST */](),
      answer: function (first) {
        var word = dictionary.getByFirstLetter(first);

        if (word === null) {
          game.playerWin();
        }

        game.timePause();
        answer(word, 'computer');
        game.getScore();
        game.timeStart();
      },
      getByFirstLetter: function (argument) {
        var result = this.memory.getByFirstLetter(prefix);
        this.memory.remove(result);
        return result;
      }
    };
    var player = {
      answer: function() {
        var word = answerInput.innerHTML;
        var isRepeat = dictionary.isRepeat(word);
        if (isRepeat) {
          showError('这个单词已经出现过了');
          return;
        }

        var validate = dictionary.validate(word);
        if (!validate) {
          showError('呀，拼错了！');
          return;
        }

        hideError();
        game.timePause();
        answer(word, 'player');
        game.getScore();
        setTimeout(function () {
          computer.answer(word.slice(word.length - 1));
        },150);
        game.timeStart();
      },
      writeAnswer: function (button) {
        var answer = answerInput.innerHTML;

        if (containClass(button, 'del')) {
          if (answer.length === 1) {
            return ;
          }
          answerInput.innerHTML = answer.substr(0, answer.length - 1);
          return;
        }

        if (button.tagName.toLowerCase() === 'span') {
          var letter = button.innerHTML;
          
          if (/^[a-z]{1}$/.test(letter)) {
            answerInput.innerHTML = answerInput.innerHTML + letter;
          }
        }
      }
    }
    initDictionary(dictionary.data);
    initDictionary(computer.memory);

    window.onload = function () {
      startBtn = document.querySelector('.start');
      answerBtn = document.querySelector('#answer-btn');
      answerInput = document.querySelector('#answer-input');
      answerWrapper = document.querySelector('#answer-wrapper');
      wordChainDom = document.querySelector('#word-chain');
      wordChainWrapper = document.querySelector('.main');
      errorMsgDom = document.querySelector('#error-msg');
      gamePageDom = document.querySelector('.game-page');
      keyboard = document.querySelector('#keyboard');
      initGame();

      startBtn.onclick = function () {
        game.start();
        // answer('start', 'computer');
        computer.answer(letters[new Date().getTime() % 25]);
      }

      answerBtn.onclick = function () {
        player.answer();
      };

      document.querySelector('#restart').onclick = function () {
        game.restart();
      };

      keyboard.addEventListener('touchstart', function (e) {
        e.preventDefault();
        var target = e.target;  
        
        player.writeAnswer(target);
      }, false);

      gamePageDom.onclick = function (e) {
        var target = e.target;

        if (target.getAttribute('id') === 'answer-wrapper') {
          addClass(answerWrapper, 'focus');
          removeClass(keyboard, 'hide');
        } else if(target.getAttribute('id') === 'answer-btn'){
          addClass(answerWrapper, 'focus');
        } else {
          removeClass(answerWrapper, 'focus');
          addClass(keyboard, 'hide');
        }
      };
    }

    function initGame () {
      game.scoreDom = document.querySelector('.score');
      var timerWrapper = document.querySelector('.timer-wrapper');
      game.timerDom.timerWrapper = timerWrapper;
      game.timerDom.num = timerWrapper.querySelector('.num');
      game.timerDom.left = timerWrapper.querySelector('.left');
      game.timerDom.right = timerWrapper.querySelector('.right');
      game.timerDom.rotate = timerWrapper.querySelector('.rotate');
      game.endModal = document.querySelector('.end-modal');
    }

    function showError (msg) {
      errorMsgDom.innerHTML = msg;
      errorMsgDom.style.visibility = 'visible';
    }

    function hideError () {
      errorMsgDom.style.visibility = 'hidden';
    }

    function addNewWordInChain (word) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      var em = document.createElement('em');
      var div = document.createElement('div');
      em.innerHTML = word.slice(word.length - 1);
      span.innerHTML = word.slice(0, word.length - 1);
      span.appendChild(em);
      li.appendChild(span);
      div.setAttribute('class','pass');
      li.appendChild(div);
      wordChainDom.appendChild(li);
      scrollDown(wordChainWrapper, 0, 0.4);
    }

    function answer (word, player) {
      addNewWordInChain(word);
      
      if (player === 'computer') {
        answerInput.innerHTML = word.slice(word.length - 1);
        answerInput.focus();
      }
    }
    // t: 当前时间
    // b: 初始值
    // c: 变化量
    // d: 持续时间
    function linear(t, b, c, d) {
      return c * t/d + b;
    }

    function scrollDown (dom, currentTime, duration) {
      var scrollTop = dom.scrollTop;
      var changeValue = dom.scrollHeight - dom.offsetHeight - scrollTop;

      if (changeValue <= 0) {
        return;
      }

      var beginValue = 0;
      var value = linear(currentTime, beginValue, changeValue, duration);
      dom.scrollTop = value + scrollTop ;
      currentTime += 0.1;

      if (currentTime <= duration) {
        requestAnimationFrame(function () {
          scrollDown(dom, currentTime, duration);
        });
      }
    }

    function initDictionary (dictionary) {
      var word1 = ['africa','aids','america','april','arab','asia','august','bc','bible','britain','british','buddhism','cal','celsius','china','chinese','christ','christian','christmas','december','eden','eire','england','english','eucharist','europe','european','fahrenheit','february','fortran','france','french','friday','gents','german','germany','greenwich','hollywood','i','interpol','ireland','islam','italy','january','japan','japanese','jesus','jew','jewish','july','june','korea','ladies','ma','mars','mayday','mercury','monday','muslim','nato','negro','november','occident','oceania','october','olympic','oscar','pentagon','pope','saturday','scotland','september','sunday','tv','thursday','usa','wc','wednesday','xmas','yale','a','aback','abandon','abase','abash','abate','abattoir','abbreviate','abdicate','abdomen','abduct','abed','abend','abet','abeyance','abhor','abhorrence','abhorrent','abide','ability','abject','abjure','ablaze','able','ably','abnegate','abnormal','aboard','abolish','abolition','abominable','abominate','abort','abortion','abortive','abound','about','above','abrade','abrasion','abrasive','abreast','abridge','abroad','abrogate','abrupt','abscissa','abscond','abseil','absence','absent','absentee','absolute','absolution','absolutism','absolve','absorb','absorbent','absorption','abstain','abstemious','abstention','abstract','abstruse','absurd','abundance','abundant','abuse','abusive','abut','abysmal','academic','academy','accede','accelerate','accent','accentuate','accept','acceptable','acceptance','access','accessary','accessible','accession','accessory','accidence','accident','accidental','acclaim','accompany','accomplice','accomplish','accord','accordance','accordion','accost','account','accountant','accredit','accretion','accrue','accumulate','accuracy','accurate','accursed','accusation','accusative','accuse','accustom','ace','ache','achieve','acid','acidify','acidity','acme','acoustic','acoustics','acquaint','acquiesce','acquire','acquit','acquittal','acre','acrid','acrobat','acrobatics','acronym','across','act','action','activate','active','activist','activity','actor','actress','actual','actuality','actualize','actually','actuate','acuity','acumen','acute','ad','adage','adamant','adapt','adaptable','adaptation','adaptor','add','addendum','addict','addition','additional','additive','addle','address','addressee','adduce','adept','adequate','adhere','adherent','adhesive','adjacent','adjective','adjoin','adjourn','adjunctive','adjust','adjustable','adjustment','adjutant','administer','admirable','admiral','admiralty','admiration','admire','admissible','admission','admit','admittance','admittedly','admonish','admonition','ado','adolescent','adopt','adoption','adoptive','adorable','adoration','adore','adorn','adrift','adroit','adulate','adulation','adult','adulterer','adulteress','adultery','advance','advantage','advent','adventure','adventurer','adverb','adversary','adverse','adversity','advertise','advice','advisable','advise','adviser','advisory','advocacy','advocate','adze','aeon','aerate','aerial','aerobatics','aeroplane','aerospace','aesthetic','afar','affable','affair','affect','affection','affidavit','affiliate','affinity','affirm','affix','afflict','affliction','affluence','affluent','afford','afforest','affray','affront','afghani','aficionado','afield','aflame','afloat','afoot','aforesaid','afraid','afresh','after','afterlife','aftermath','afternoon','afterwards','again','against','agape','agate','age','ageless','agency','agenda','agent','aggravate','aggregate','aggression','aggressive','aggressor','aggro','aghast','agile','agio','agitate','agitation','agitator','aglow','agnostic','ago','agog','agonize','agony','agrarian','agree','agreeable','agreement','aground','ah','aha','ahead','ahem','aid','aide','ail','aim','air','airborne','airbus','aircraft','aircrew','airforce','airhostess','airlane','airlift','airline','airliner','airmail','airplane','airport','airship','airspace','airway','airy','aisle','ajar','akimbo','akin','alacrity','alarm','alas','albatross','albino','album','alcohol','alcoholic','alcove','alert','algebra','algorithm','alias','alibi','alien','alienate','alight','align','alike','aliment','alimentary','alimony','alive','alkali','all','allay','allege','allegedly','allegiance','allegory','allergy','alleviate','alley','alliance','allied','allocate','allotment','allow','allowance','alloy','allude','allure','allusion','alluvium','ally','almanac','almighty','almost','alms','aloft','alone','along','alongside','aloof','aloud','alpha','alphabet','already','also','altar','alter','alteration','alternate','alternator','although','altimeter','altitude','alto','altogether','aluminium','always','am','amalgamate','amass','amateur','amateurish','amaze','amazement','ambassador','amber','ambience','ambiguity','ambiguous','ambition','ambitious','ambivalent','amble','ambrosia','ambulance','ambush','amend','amenity','amiable','amicable','amid','amidships','amiss','amity','ammeter','ammunition','amnesia','amnesty','amok','among','amoral','amorous','amortize','amount','amour','amp','ampere','amphibian','ample','amplifier','amplify','amplitude','amputate','amulet','amuse','amusement','an','anaemia','analgesic','analogize','analogue','analogy','analyse','analysis','analyst','analytic','analytical','anarchism','anarchy','anatomy','ancestor','ancestry','anchor','anchorage','ancient','ancillary','and','anecdote','aneroid','anew','angel','angelic','anger','angina','angle','angry','angst','anguish','angular','anhydrous','animadvert','animal','animation','animosity','ankle','annals','anneal','annex','annexe','annihilate','annotate','announce','announcer','annoy','annual','annuity','annul','annular','anode','anodyne','anomalous','anomaly','anon','anonymous','another','answer','ant','antagonism','antagonize','antarctic','antecedent','antedate','antelope','antenatal','antenna','anterior','anteroom','anthem','anthology','anthracite','anthropoid','antibiotic','antibody','anticipate','anticlimax','antics','antidote','antifreeze','antigen','antihero','antiknock','antipathy','antiquary','antique','antiquity','antiseptic','antisocial','antithesis','antler','antonym','anus','anxiety','anxious','any','anybody','anyhow','anyone','anything','anyway','anywhere','aorta','apace','apart','apartheid','apartment','apathy','ape','aperitif','aperture','apex','aphorism','apiary','apiece','apocalypse','apocryphal','apogee','apologetic','apologize','apology','apoplexy','apostrophe','appal','apparatus','apparent','apparition','appeal','appear','appearance','appease','append','appendage','appendix','appertain','appetite','appetizer','appetizing','applaud','applause','apple','appliance','applicable','applicant','applique','apply','appoint','apportion','appraisal','appraise','appreciate','apprehend','apprentice','apprise','approach','approval','approve','apricot','apron','apropos','apt','aptitude','aqualung','aquaplane','aquarium','aquatic','aqueduct','aqueous','aquiline','arable','arbiter','arbitrage','arbitrary','arbitrate','arboreal','arboretum','arbour','arc','arch','archaic','archaism','archbishop','archer','archetype','architect','archives','archway','arclamp','arctic','ardent','ardour','arduous','area','arena','argot','arguable','argue','argument','arid','aright','arise','arithmetic','ark','arm','armada','armament','armature','armchair','armistice','armour','armoured','armourer','army','armyman','aroma','arose','around','arouse','arraign','arrange','arrant','array','arrears','arrest','arrival','arrive','arrogant','arrogate','arrow','arse','arsehole','arsenal','arson','art','artefact','arterial','artery','artesian','artful','arthritis','article','articulate','artifice','artificer','artificial','artillery','artisan','artist','artiste','artistic','artistry','as','asbestos','ascend','ascendant','ascension','ascent','ascertain','ascetic','ascribe','asexual','ash','ashamed','ashore','ashtray','ashy','aside','ask','askance','askew','aslant','asleep','aspect','aspen','asperity','aspersion','asphalt','asphyxia','asphyxiate','aspirant','aspiration','aspire','aspirin','ass','assail','assassin','assault','assay','assemblage','assemble','assembler','assembly','assent','assert','assertion','assess','assessment','assessor','asset','asseverate','assiduous','assign','assignment','assimilate','assist','assistance','assistant','associate','assorted','assortment','assuage','assume','assumption','assurance','assure','asterisk','astern','asteroid','asthma','astir','astonish','astray','astride','astrology','astronaut','astronomy','astute','asylum','asymmetric','at','atheist','athlete','athletic','atlas','atmosphere','atoll','atom','atomic','atomize','atonal','atone','atrocious','atrocity','attach','attache','attachment','attack','attain','attainment','attempt','attend','attendance','attendant','attention','attentive','attest','attic','attire','attitude','attorney','attract','attraction','attractive','attribute','attrition','attune','atypical','aubergine','auburn','auction','audacious','audible','audience','audio','audit','audition','auditorium','auditory','augment','augur','augury','aunt','aura','aural','auricle','auspices','auspicious','austere','authentic','author','authority','authorize','auto','autobahn','autocracy','autocrat','autocue','autograph','autoimmune','automat','automate','automatic','automation','automobile','automotive','autonomous','autonomy','autopilot','autopsy','autoroute','autumn','auxiliary','avail','available','avalanche','avarice','avenge','avenue','aver','average','averse','aversion','aversive','avert','aviation','avid','avionics','avocation','avoid','avow','await','awake','awaken','award','aware','awareness','away','awe','awful','awhile','awkward','awl','awn','awoke','awry','axe','axial','axiom','axiomatic','axis','axle','aye','azimuth','azure','baa','babble','babe','baboon','baby','babyhood','bachelor','back','backache','backbite','backbone','backer','backfire','background','backhander','backpedal','backside','backslide','backstreet','backstroke','backtrack','backup','backward','backwards','backwash','backwater','backwoods','backyard','bacon','bad','badge','badly','badminton','baffle','bag','baggage','baggy','bail','bailiff','bait','baize'];
      var word2 = ['bake','bakelite','baker','balance','balcony','bald','balderdash','bale','balk','ball','ballad','ballast','ballerina','ballet','ballistics','balloon','ballot','ballyhoo','balm','balmy','balsam','balustrade','bamboo','bamboozle','ban','banana','band','bandage','bandit','bandwagon','bandwidth','bandy','bane','bang','bangle','banish','banisters','banjo','bank','bankbook','banker','bankrupt','bankruptcy','bannal','banner','banns','banquet','bantam','banter','baptism','baptize','bar','barb','barbarian','barbarity','barbarous','barbecue','barber','bare','barefaced','barely','bargain','barge','baritone','barium','bark','barley','barmaid','barman','barn','barnacle','barometer','baron','baronet','barque','barrack','barrage','barred','barrel','barren','barricade','barrier','barrister','barrow','barter','base','baseball','baseline','basement','bash','bashful','basic','basin','basis','bask','basket','basketball','bass','bassinet','bassoon','bastard','bastardize','baste','bastion','bat','batch','bated','bath','bathe','bathrobe','bathroom','baton','battalion','batten','batter','battery','battle','battlement','batty','bauble','baulk','bauxite','bawdy','bawl','bay','bayonet','bazaar','be','beach','beacon','bead','beak','beaker','beam','bean','bear','beard','bearer','bearish','beast','beat','beatific','beatnik','beautician','beautiful','beautify','beauty','beaver','becalmed','because','beck','beckon','become','bed','bedevil','bedlam','bedraggle','bedridden','bedrock','bedroom','bedside','bedspread','bedtime','bee','beef','beefsteak','beefy','beehive','beeline','beeper','beer','beeswax','beet','beetle','befall','befit','before','beforehand','befriend','befuddle','beg','beget','beggar','begin','beginner','begone','begrudge','beguile','behalf','behave','behaviour','behind','behold','beholden','beige','belabour','belated','belch','belie','belief','believe','belittle','bell','bellboy','bellicose','bellow','belly','bellyache','bellyful','belong','beloved','below','belt','bemoan','bench','bend','beneath','benefactor','beneficent','beneficial','benefit','benevolent','benighted','benign','benumb','benzene','bequeath','bequest','berate','bereave','beret','berk','berry','berserk','berth','beryl','beseech','beside','besides','besiege','besmirch','besotted','bespeak','bespoke','bestial','bestir','bestow','bestrew','bet','beta','betake','betide','betimes','betray','betroth','better','between','bevel','beverage','bevy','bewail','beware','bewilder','bewitch','beyond','biannual','bias','biceps','bicker','bicycle','bide','biennial','bier','bifocals','big','bigamy','bigwig','bike','bikini','bilateral','bile','bilge','bilingual','bill','billboard','billet','billfold','billiard','billion','billow','bimonthly','bin','binary','bind','binder','binoculars','binomial','biographer','biography','biological','biology','bionics','biped','biplane','bird','biro','birth','birthday','birthplace','birthrate','biscuit','bisect','bishop','bison','bistro','bitch','bite','bitter','bitterness','bitumen','biweekly','bizarre','blab','black','blackboard','blacken','blackguard','blackleg','blacklist','blackmail','blackout','blacksmith','bladder','blade','blah','blame','blanch','blancmange','bland','blank','blanket','blare','blarney','blaspheme','blast','blatant','blaze','blazer','blazon','bleach','bleak','bleary','bleat','bleed','blemish','blench','blend','bless','blight','blind','blindfold','blink','bliss','blister','blitz','blizzard','bloc','block','blockade','blockhead','bloke','blond','blonde','blood','bloodbath','bloodless','bloodshot','bloody','bloom','bloomers','blossom','blot','blotch','blouse','blow','blower','blowfly','blubber','blue','blueprint','bluff','blunder','blunt','blur','blurt','blush','bluster','boa','boar','board','boast','boat','boatswain','bob','bobbin','bobby','bodily','body','bog','boggle','bogus','bohemian','boil','boiler','boisterous','bold','bole','boll','bollard','bolster','bolt','bomb','bombard','bombastic','bomber','bombshell','bond','bondage','bone','bonfire','bonkers','bonnet','bonny','bonus','bony','boob','booby','book','bookcase','bookish','booklet','bookseller','bookshop','bookstall','bookstore','boom','boomerang','boon','boost','boot','booth','bootleg','booty','booze','borax','border','borderland','bore','bored','borrow','bosh','bosom','boss','botanical','botany','botch','both','bother','bottle','bottleneck','bottom','bottomless','botulism','boudoir','bough','boulder','boulevard','bounce','boundary','bounder','bounteous','bounty','bouquet','bourgeois','bout','boutique','bow','bowdlerize','bowel','bowl','box','boxer','boy','boyfriend','bps','bra','brace','bracelet','bracket','bradawl','brag','braid','braille','brain','brake','bramble','bran','branch','brand','brandish','brandy','brash','brass','brassiere','brassy','brat','bravado','brave','bravery','bravo','brawl','brawn','bray','brazen','brazier','breach','bread','breadline','breadth','break','breakage','breakdance','breakdown','breaker','breakfast','breakneck','breakwater','breast','breath','breathe','breech','breeches','breed','breeze','breezy','brevity','brew','bribe','brick','bricklayer','bride','bridegroom','bridesmaid','bridge','bridle','brief','briefcase','brig','brigade','brigadier','brigand','bright','brighten','brilliant','brim','brine','bring','brink','brisk','bristle','brittle','broach','broad','broadcast','broaden','broadside','brocade','brochure','broke','broker','bronze','brooch','brood','broody','brook','broom','broth','brothel','brother','brow','browbeat','brown','browse','bruise','brunch','brunt','brush','brusque','brutal','brutalize','brute','bubble','buccaneer','buck','bucket','buckle','buckwheat','bucolic','bud','budge','budget','buff','buffalo','buffer','buffet','buffoon','bug','bugle','build','builder','bulb','bulge','bulk','bulkhead','bulky','bull','bulldoze','bulldozer','bullet','bulletin','bullfight','bullion','bullock','bully','bulwark','bum','bump','bumper','bumpkin','bumptious','bumpy','bun','bunch','bundle','bung','bungalow','bungle','bunk','bunker','bunny','buoy','buoyant','burden','bureau','bureaucrat','burette','burgeon','burgh','burglar','burgle','burial','burly','burn','burner','burning','burnish','burp','burrow','bursar','bursary','burst','bury','bus','bush','bushel','bushy','business','bust','bustle','busy','busybody','but','butcher','butt','butter','butterfly','buttock','button','buttonhole','buttress','buxom','buy','buyer','buzz','buzzer','by','bye','byelaw','bygone','bypass','bypath','byroad','byway','byword','cab','cabbage','cabby','cabin','cabinet','cable','cablegram','cabman','cacao','cache','cackle','cactus','cad','cadaverous','caddie','caddy','cadence','cadge','cadmium','cadre','caesarean','cafe','cafeteria','caffeine','cage','cagoule','caisson','cajole','cake','cakewalk','calabash','calamity','calcify','calcium','calculate','calculator','calculus','calendar','calender','calf','calibrate','calibre','calico','caliph','call','caller','callipers','callous','callow','calm','calorie','calumniate','calumny','calve','camber','cambric','camel','camellia','cameo','camera','cameraman','camouflage','camp','campaign','campfire','camphor','campus','can','canal','canalize','canary','cancel','cancer','candid','candidate','candle','candour','candy','cane','canine','canister','canker','cannabis','cannery','cannibal','cannon','canny','canoe','canopy','cant','canteen','canter','cantilever','canvas','canvass','canyon','cap','capability','capable','capacious','capacitor','capacity','cape','caper','capillary','capital','capitalism','capitalist','capitalize','capitate','capitation','caprice','capricious','capsize','capstan','capsule','captain','caption','captious','captivate','captive','capture','car','carat','caravan','carbolic','carbon','carbonic','carbonize','carbuncle','carcass','carcinogen','card','cardboard','cardiac','cardinal','care','career','carefree','careful','careless','caress','caretaker','cargo','caricature','caries','carmine','carnage','carnal','carnation','carnival','carol','carouse','carp','carpenter','carpentry','carper','carpet','carriage','carrier','carrot','carry','cart','cartel','cartilage','carton','cartoon','cartridge','carve','cascade','case','casein','casement','cash','cashier','cashmere','casino','cask','casket','cassava','casserole','cassette','cassock','cast','caste','castigate','castle','castor','castrate','casual','casualty','casuist','cat','cataclysm','catacomb','catalogue','catalyst','catapult','cataract','catarrh','catch','catchword','catchy','categorize','category','cater','cathedral','cathode','catholic','catkin','cattle','cauldron','caulk','causal','cause','causeway','caustic','cauterize','caution','cautious','cavalcade','cavalier','cavalry','cave','cavern','caviare','cavil','cavity','cavy','cayenne','cease','cedar','cede','ceiling','celebrate','celebrity','celerity','celery','celestial','celibate','cell','cellar','cello','cellophane','cellular','celluloid','cellulose','cement','cemetery','cenotaph','censer','censor','censorious','censure','census','cent','centenary','centigrade','centimetre','central','centralize','centre','century','ceramic','cereal','cerebral','cerebrum','ceremonial','ceremony','certain','certainly','certainty','certify','certitude','cessation','cession','chafe','chaff','chagrin','chain','chair','chairman','chalet','chalk','challenge','chamber','chameleon','chamois','champ','champagne','champion','chance','chancellor','chancy','chandelier','chandler','change','changeable','channel','chaos','chaotic','chap','chaperon','chaplet','chapter','char','character','charge','chargeable','charity','charlatan','charm','chart','charter','chary','chase','chasm'];
      var word3 = ['chassis','chaste','chasten','chastise','chat','chattel','chatter','chatty','chauffeur','chauvinism','cheap','cheapen','cheat','check','checkout','checkup','cheek','cheeky','cheer','cheerful','cheerio','cheery','cheese','chef','chelate','chemical','chemist','chemistry','cheque','chequebook','cherish','cherry','cherub','chess','chessman','chest','chestnut','chevron','chew','chewinggum','chic','chicanery','chick','chicken','chide','chief','chiffon','chilblain','child','childbirth','childhood','childish','childlike','chill','chilly','chime','chimney','chimpanzee','chin','chink','chip','chiropody','chirp','chirpy','chirrup','chisel','chit','chloride','chlorinate','chlorine','chloroform','chocolate','choice','choke','cholera','choleric','choose','chop','chopper','chopsticks','chord','chore','chorus','christen','chrome','chromium','chromosome','chronic','chronicle','chronology','chubby','chuck','chuckle','chug','church','churchyard','churlish','churn','chute','cicada','cider','cigar','cigarette','cinder','cinema','cinnamon','cipher','circa','circle','circuit','circuitry','circular','circulate','circumcise','circumvent','circus','cirrus','cistern','citadel','citation','citizen','citron','city','civic','civil','civilian','civility','civilize','clack','claim','clam','clamber','clammy','clamour','clamp','clang','clank','clap','claret','clarify','clarinet','clarion','clarity','clash','clasp','class','classic','classical','classify','classmate','classroom','classy','clatter','clause','clavicle','claw','clay','clean','cleaner','cleanly','cleanse','clear','clearance','cleavage','cleave','clement','clergy','cleric','clerical','clerk','clever','cliche','click','client','clientele','cliff','climate','climatic','climax','climb','climber','clinch','cling','clinic','clinical','clink','clip','clippers','clique','cloak','cloakroom','cloche','clock','clockwise','clod','clog','cloister','close','closet','closure','clot','cloth','clothe','clothing','cloud','cloudy','clout','clown','cloze','club','cluck','clue','clump','clumsy','cluster','clutch','clutter','coach','coagulate','coal','coalesce','coalition','coarse','coast','coastal','coastguard','coastline','coastwise','coat','coax','coaxial','cobble','cobra','cobweb','cocaine','cock','cockaded','cockatoo','cockerel','cockroach','cocksure','cocktail','cocoa','coconut','cocoon','cod','coddle','code','codepage','codicil','codify','coerce','coexist','coffee','coffer','coffin','cog','cogent','cogitate','cognac','cognate','cognizance','cogwheel','cohabit','cohere','coherent','cohesion','coil','coin','coinage','coincide','coke','cola','colander','cold','colic','collapse','collar','collate','collateral','colleague','collect','collected','collection','collective','collector','college','collegiate','collide','collier','collision','colloquial','colloquy','collusion','colon','colonel','colonial','colonist','colonize','colonnade','colony','color','colored','colorful','colorless','colossal','colossus','column','columnist','coma','comatose','comb','combat','combatant','combative','combine','combing','come','comedian','comedienne','comedy','comely','comet','comfort','comic','comical','comity','comma','command','commandant','commandeer','commander','commando','commence','commend','comment','commentary','commerce','commercial','commissar','commission','commit','commitment','committee','commodious','commodity','commodore','common','commonly','commotion','communal','commune','communion','communique','communism','communist','community','commutator','commute','compact','companion','company','comparable','compare','comparison','compass','compassion','compatible','compatriot','compel','compendium','compensate','compere','compete','competence','competent','competitor','compile','compiler','complain','complaint','complement','complete','completion','complex','complexion','complexity','compliance','compliant','complicate','complicity','compliment','comply','component','comport','compose','composer','composite','compositor','compost','composure','compote','compound','comprador','comprehend','compress','comprise','compromise','compulsion','compulsory','compute','computer','comrade','comsat','con','concave','conceal','concede','conceit','conceive','concentric','concept','conception','concern','concerning','concert','concerto','concession','conciliate','concise','conclave','conclude','conclusion','conclusive','concoct','concord','concourse','concrete','concubine','concur','concurrent','concussion','condemn','condense','condenser','condescend','condiment','condition','condole','condolence','condom','condone','conduct','conduction','conductive','conductor','conduit','cone','confection','confer','conference','confess','confession','confide','confidence','confident','confine','confirm','conflict','confluence','conform','conformity','confound','confront','confuse','confusion','confute','congeal','congenial','congenital','congested','congregate','congress','conical','conjecture','conjugal','conjugate','conjure','conjurer','connect','connection','connive','connote','conquer','conqueror','conquest','conscience','conscious','conscript','consecrate','consensus','consent','consequent','conserve','consider','consign','consignee','consist','consistent','console','consonant','consort','consortium','conspiracy','conspire','constable','constancy','constant','constipate','constitute','constrain','constraint','constrict','construct','construe','consul','consulate','consult','consultant','consume','consumer','consummate','contact','contagion','contagious','contain','container','contempt','contend','content','contest','context','contiguous','continent','contingent','continual','continue','continuity','continuous','contort','contour','contraband','contract','contractor','contradict','contralto','contrary','contrast','contravene','contribute','contrite','contrive','control','controller','contumely','contuse','conundrum','convection','convene','convenient','convent','convention','converge','conversant','converse','conversion','convert','convex','convey','conveyance','conveyor','convict','conviction','convince','convivial','convoke','convoluted','convoy','convulse','cony','cook','cooker','cookery','cool','cooperate','cop','cope','copier','copious','copper','coppice','copula','copulate','copy','copyright','corduroy','core','cork','corn','cornea','corner','cornet','cornflake','corolla','corollary','corona','coroner','corporal','corporate','corps','corpse','corpulent','corpuscle','corral','correct','correction','corrective','correlate','correspond','corridor','corrode','corrosion','corrosive','corrugate','corrupt','corruption','corsair','corset','cos','cosine','cosmetic','cosmic','cosmonaut','cosmos','cost','costly','costume','cosy','cot','cotangent','cottage','cotton','couch','cough','council','councillor','counsel','counsellor','count','countdown','counter','counteract','countess','countless','country','countryman','county','coup','couple','coupon','courage','courageous','courier','course','court','courteous','courtesy','courtly','courtship','courtyard','cousin','covenant','cover','coverage','coverlet','covert','covet','cow','coward','cowboy','cower','cowherd','cox','coy','coyote','crab','crack','crackle','cradle','craft','craftsman','crag','craggy','cram','cramp','cranberry','crane','crank','cranky','crap','crash','crass','crate','crater','crave','craven','crawl','crayon','craze','crazy','cream','crease','create','creation','creative','creature','creche','credence','credential','credible','credit','creditable','creditor','credulity','creed','creek','creep','cremate','crepe','crescendo','crescent','cress','crest','crevasse','crevice','crew','crib','cricket','crime','criminal','crimp','crimson','cringe','crinkle','cripple','crisis','crisp','criterion','critic','critical','criticism','criticize','croak','crochet','crock','crockery','crocodile','crocus','crony','crook','croon','crop','cropper','croquet','cross','crossroad','crosstalk','crosswalk','crossword','crotchet','crouch','crow','crowd','crown','crucial','crucible','crucify','crude','cruel','cruelty','cruise','cruiser','crumb','crumble','crumbly','crumple','crush','crust','crusty','crutch','crux','cry','crypt','cryptic','crystal','cub','cube','cubic','cubicle','cuckoo','cucumber','cuddle','cue','cuff','culinary','culminate','culpable','culprit','cult','cultivate','cultivator','cultural','culture','culvert','cumbersome','cumulative','cumulus','cunning','cup','cupboard','cupidity','cupola','cur','curable','curative','curb','curd','curdle','cure','curfew','curio','curiosity','curious','curl','curly','currant','currency','current','currently','curriculum','curry','curse','cursor','cursory','curt','curtail','curtain','curvaceous','curvature','curve','cushion','custard','custodian','custody','custom','customary','customer','cut','cute','cutlass','cutler','cutlery','cutlet','cutter','cutthroat','cuttlefish','cycle','cyclist','cyclone','cylinder','cymbal','cynical','cynosure','cypress','cyst','dab','dabble','dad','daddy','daffodil','dagger','daily','dainty','dairy','dais','daisy','dalliance','dally','dam','damage','damask','damn','damnation','damp','dampen','damper','dance','dancer','dandelion','dandle','dandy','danger','dangerous','dangle','dank','dapper','dapple','dare','dark','darken','darkness','darkroom','darling','darn','dart','dash','dastard','dastardly','database','date','dateline','datum','daub','daughter','daunt','davit','dawdle','dawn','day','dayboy','daygirl','daylight','dayroom','daytime','daze','dazzle','dead','deadline','deadlock','deadly','deaf','deafen','deal','dealer','dean','dear','dearly','dearth','death','deathblow','deathless','debar','debase','debate','debauch','debenture','debilitate','debility','debit','debonair','debris','debt','debtor','debut','decade','decadence','decadent','decamp','decant','decapitate','decathlon','decay','decease','deceit','deceive','decent','deception','decibel','decide','deciduous','decimal','decimate','decipher','decision','decisive','deck','deckchair','declaim','declare','decline','decode','decompose','decorate','decoration','decorator','decorum','decoy','decrease','decree','decrepit','decry','dedicate','dedication','deduce','deduct','deduction','deed','deem','deep','deepen','deer','deface','defame','default'];
      var word4 = ['defeat','defect','defective','defence','defend','defendant','defense','defensive','defer','deference','defiance','deficiency','deficient','deficit','defile','define','definite','definition','definitive','deflate','deflation','deflect','deform','deformity','defraud','defray','defrost','deft','defunct','defy','degenerate','degrade','degree','dehydrate','deify','deign','deity','delay','delectable','delegate','delegation','delete','deliberate','delicacy','delicate','delicious','delight','delineate','delinquent','deliver','delivery','dell','delta','delude','deluge','delusion','deluxe','delve','demagogue','demand','demarcate','demean','demented','demerit','demise','demist','demobilize','democracy','democrat','democratic','demography','demolish','demon','demoralize','demote','demur','demure','den','denial','denote','denounce','dense','density','dent','dental','dentist','denture','denude','deny','deodorant','deodorize','depart','department','departure','depend','dependable','dependence','dependent','depict','deplete','deplore','deploy','depopulate','deport','deportment','depose','deposit','deposition','depositor','depository','depot','deprave','depravity','deprecate','depreciate','depress','depression','deprive','dept.','depth','deputation','depute','deputize','deputy','derail','derange','derelict','deride','derisive','derisory','derivation','derive','derogatory','derrick','derv','descend','descendant','descent','describe','desert','deserts','deserve','desiccant','desiccate','design','designate','designedly','designer','desirable','desire','desist','desk','desolate','despair','despatch','desperado','desperate','despise','despite','despond','despot','dessert','destine','destined','destiny','destitute','destroy','destroyer','desultory','detach','detachment','detail','detain','detainee','detect','detection','detective','detector','detente','detention','deter','detergent','determine','deterrent','detest','dethrone','detonate','detour','detract','detriment','devalue','devastate','develop','deviate','deviation','device','devil','devilish','devious','devise','devitalize','devolution','devolve','devote','devotion','devour','devout','dew','dexterous','diabetes','diabolic','diaeresis','diagnose','diagnosis','diagonal','diagram','dial','dialect','dialectic','dialogue','diameter','diamond','diaper','diaphanous','diaphragm','diarrhoea','diary','diatribe','dice','dictate','dictation','dictator','diction','dictionary','didactic','die','diesel','diet','differ','difference','different','difficult','difficulty','diffident','diffuse','dig','digest','digestive','digit','digital','dignify','dignitary','dignity','digress','dike','dilate','dilatory','dilemma','dilettante','diligent','dilute','dim','dime','dimension','diminish','dimple','din','dine','dinghy','dingy','dinky','dinner','dint','diode','dioxide','dip','diphtheria','diphthong','diploma','diplomacy','diplomatic','dirage','dire','direct','direction','directive','director','directory','dirk','dirt','dirty','disable','disabuse','disagree','disallow','disappear','disappoint','disapprove','disarm','disarrange','disaster','disastrous','disavow','disband','disbelieve','disburse','disc','discard','discern','discharge','discipline','disclaim','disclose','disco','discomfit','discomfort','discompose','disconcert','disconnect','discontent','discord','discount','discourage','discourse','discover','discovery','discredit','discreet','discrete','discretion','discursive','discus','discuss','discussion','disdain','disease','disembark','disenchant','disengage','disfavour','disfigure','disgrace','disguise','disgust','dish','dishearten','dishonest','dishonour','disinfect','disinherit','disk','dislike','dislocate','dislodge','dismal','dismay','dismember','dismiss','dismount','disobey','disoblige','disorder','disorderly','disown','disparage','disparity','dispatch','dispel','dispensary','dispense','disperse','dispirit','displace','display','displease','disposal','dispose','dispossess','disprove','disputable','disputant','dispute','disqualify','disquiet','disregard','disrepair','disrepute','disrespect','disrobe','disrupt','dissatisfy','dissect','dissemble','dissension','dissent','disservice','dissident','dissimilar','dissipate','dissociate','dissolute','dissolve','dissonance','dissonant','dissuade','distance','distant','distaste','distend','distil','distinct','distort','distract','distraught','distress','distribute','district','distrust','disturb','disuse','ditch','ditcher','ditto','ditty','divan','dive','diver','diverge','diverse','diversify','diversion','diversity','divert','divest','divide','dividend','dividers','divine','divinity','divisible','division','divisor','divorce','divulge','dizzy','do','docile','dock','doctor','doctrine','document','dodge','doe','dog','doggerel','dogmatic','dogmatism','dogmatize','doldrums','dole','doleful','doll','dollar','dolly','dolorous','dolphin','dolt','domain','dome','domestic','domicile','dominance','dominant','dominate','domination','dominion','domino','don','donate','donation','donkey','donor','doodle','doom','doomsday','door','doorbell','doorkeeper','doorway','dope','dorm','dormant','dormitory','dorsal','dose','dossier','dot','dote','double','doubt','doubtful','doubtless','dour','dove','down','downcast','downfall','downhill','downpour','downright','downstairs','downtown','downward','downwards','dowry','doze','dozen','drab','draft','draftee','draftsman','drafty','drag','dragon','dragonfly','dragoon','drain','drainage','drake','drama','dramatic','dramatics','dramatist','dramatize','drape','draper','drapery','drastic','draughty','draw','drawback','drawer','drawl','dread','dreadful','dream','dreamy','dreary','dredge','dredger','drench','dress','dresser','dribble','driblet','drier','drift','drifter','driftwood','drill','drink','drinkable','drip','drive','drivel','drizzle','droll','dromedary','drone','droop','drop','dropout','dross','drought','drove','drown','drowse','drowsy','drudge','drudgery','druggist','drugstore','drum','drummer','drunkard','drunken','dry','dryer','dual','dub','dubbin','dubiety','dubious','duchess','duck','ducky','duct','ductile','dud','dude','dudgeon','due','duel','duet','duff','duffer','duffle','dugong','dugout','duke','dulcet','dulcimer','dull','dullard','duly','dumb','dumbfound','dummy','dump','dumper','dumping','dumpling','dumpy','dun','dunce','dune','dung','dunghill','dunk','duo','duodecimal','duodenum','duologue','dupe','duple','duplex','duplicate','duplicator','duplicity','durable','duration','duress','during','dusk','dusky','dust','dustbin','dustbowl','dustcart','duster','dustman','dustpan','dustsheet','dusty','dutiable','dutiful','duty','dwarf','dwell','dwindle','dye','dyke','dynamic','dynamics','dynamism','dynamite','dynamo','dynasty','dysentery','dyslexia','dyspepsia','dysphasia','dystrophy','each','eager','eagle','ear','earful','earl','early','earmark','earn','earnest','earnings','earphone','earring','earshot','earth','earthen','earthly','earthmover','earthquake','earthwork','ease','easel','easily','east','easter','easterly','eastern','eastward','easy','eat','eatable','eaves','eavesdrop','ebb','ebony','ebullience','eccentric','echo','eclipse','ecocide','ecology','economic','economical','economics','economist','economize','economy','ecstasy','ecstatic','ecuadorian','eczema','eddy','edge','edgeways','edible','edict','edifice','edify','edit','edition','editor','editorial','educate','education','eel','eerie','efface','effect','effective','effectual','effeminate','effervesce','effete','efficiency','efficient','effigy','effluent','effort','effrontery','effusion','effusive','egg','eggshell','ego','egoism','egress','eiderdown','eight','eighteen','eighteenth','eighth','eightieth','eighty','either','ejaculate','eject','eke','elaborate','elapse','elastic','elasticity','elate','elation','elbow','elder','elderly','eldest','elect','election','elective','elector','electorate','electric','electrical','electrify','electrode','electron','electronic','elegance','elegant','elegy','element','elemental','elementary','elephant','elevate','elevation','elevator','eleven','eleventh','elicit','elide','eligible','eliminate','elite','elitism','elixir','elk','ellipse','ellipsis','elliptic','elliptical','elm','elocution','elongate','elope','eloquence','eloquent','else','elsewhere','elucidate','elude','elusive','emanate','emancipate','emasculate','embankment','embargo','embark','embarrass','embassy','embed','embellish','ember','embezzle','embitter','emblem','emblematic','embody','embolden','embrace','embroider','embroidery','embroil','embryo','emend','emerald','emerge','emergence','emergency','emergent','emery','emetic','emigrant','emigrate','emigration','eminence','eminent','emir','emissary','emission','emit','emolument','emotion','emotional','emperor','emphasis','emphasize','emphatic','empire','empirical','employ','employee','employer','employment','emporium','empower','empress','empty','emulate','emulsion','en','enable','enact','enactment','enamel','encamp','encase','enchant','encircle','enclave','enclose','enclosure','encore','encounter','encourage','encroach','encumber','end','endanger','endear','endeavour','endemic','endless','endorse','endow','endurance','endure','endways','enemy','energetic','energize','energy','enervate','enfeeble','enfold','enforce','engage','engaged','engagement','engender','engine','engineer','engrave','engross','engulf','enhance','enigma','enigmatic','enjoin','enjoy','enjoyable','enjoyment','enlarge','enlighten','enlist','enliven','enmesh','enmity','ennoble','enormity','enormous','enough','enquire','enquiry','enrage','enrapture','enrich','enrol','enroll','ensign','enslave','ensue','ensure','entail','entangle','enter','enterprise','entertain','enthral','enthrone','enthuse','enthusiasm','entice','entire','entitle','entity','entourage','entrails','entrance','entrant','entrench','entrust','entry','entwine','enumerate','envelop','envelope','enviable','envious','envisage','envision','envoy','envy','enzyme','epaulette','ephemeral','epic','epicure','epidemic','epigram','epilepsy','epileptic','epilogue','episcopal','episode','epistle','epitaph','epithet','epitome','epoch','equable','equal','equality','equalize','equanimity','equate','equation','equator','equatorial','equestrian','equine','equinox','equip','equipment','equitable','equity','equivalent','equivocal','era','eradicate'];
      var word5 = ['erase','eraser','erasure','erect','ergonomics','ermine','erode','erosion','erotic','errand','erratic','erratum','erroneous','error','erudite','erupt','eruption','escalate','escalator','escapade','escape','escapement','escapism','eschew','escort','esophagus','esoteric','especial','espionage','espouse','espy','essay','essence','essential','establish','estate','esteem','esthetic','estimable','estimate','estimation','estrange','estuary','etc','etcetera','etch','eternal','eternity','ethereal','ethical','ethics','ethnic','etiquette','etymology','eugenics','eulogize','eulogy','euphemism','euphony','euphoria','euthanasia','evacuate','evade','evaluate','evaluation','evaporate','evasion','evasive','eve','even','evening','event','eventful','eventual','eventually','ever','evermore','every','everybody','everyday','everyone','everything','everywhere','evict','evidence','evident','evil','evince','evoke','evolution','evolve','ewe','ewer','exact','exaction','exactitude','exactly','exaggerate','exalt','exaltation','exam','examine','example','exasperate','excavate','excavator','exceed','excel','excellency','excellent','except','exception','excerpt','excess','excessive','exchange','excise','excitable','excitation','excite','excitement','exclaim','exclude','exclusion','exclusive','excrement','excrete','exculpate','excursion','excusable','excuse','execrable','execrate','execute','execution','executive','executor','exemplary','exemplify','exempt','exercise','exert','exeunt','exhale','exhaust','exhaustive','exhibition','exhilarate','exhort','exhume','exigency','exile','exist','existence','exit','exodus','exonerate','exorbitant','exotic','expand','expansion','expansive','expatiate','expatriate','expect','expectancy','expectant','expedient','expedite','expedition','expel','expend','expense','expensive','experience','experiment','expert','expertise','expiate','expiration','expire','explain','explicate','explicit','explode','exploit','explore','explorer','explosion','explosive','exponent','export','expose','exposition','exposure','expound','express','expression','expressive','expulsion','expunge','expurgate','exquisite','extant','extend','extension','extensive','extent','extenuate','exterior','external','extinct','extinguish','extirpate','extol','extort','extortion','extra','extract','extraction','extradite','extraneous','extreme','extremist','extremity','extricate','extrinsic','exuberant','exude','exult','eye','eyeball','eyebrow','eyelash','eyelet','eyelid','eyesight','eyesore','eyewitness','fable','fabric','fabricate','fabulous','facade','face','facet','facetious','facial','facile','facilitate','facility','facsimile','fact','faction','factor','factorship','factory','faculty','fad','fade','faeces','fag','fail','failure','faint','fair','fairy','faith','faithful','faithless','fake','falcon','fall','fallacious','fallacy','fallible','fallow','false','falsify','falter','fame','familiar','family','famine','famish','famous','fan','fanatic','fanciful','fancy','fang','fantastic','fantasy','far','faraway','farce','fare','farm','farmer','farmyard','farther','fascinate','fascism','fascist','fashion','fast','fasten','fastener','fastidious','fat','fatal','fatalism','fatality','fate','father','fatherly','fathom','fatigue','fatten','fatuous','fault','faultless','faulty','fauna','favor','favorable','favorite','fawn','fax','fear','fearful','fearless','feasible','feast','feat','feather','feature','febrile','feckless','federal','federalism','federation','fee','feeble','feed','feedback','feel','feign','feint','felicitate','felicitous','felicity','feline','fell','fellow','fellowship','felon','felony','female','feminine','feminism','feminist','fen','fence','fend','fender','ferment','ferocious','ferocity','ferris','ferrous','ferry','fertile','fertility','fertilize','fertilizer','fervent','fervour','fester','festival','festive','festivity','fetch','fete','fetid','fetter','feudal','fever','feverish','few','fiance','fiancee','fiasco','fiat','fibre','fickle','fiction','fictitious','fiddle','fidelity','fidget','field','fiend','fierce','fiery','fifteen','fifteenth','fifth','fiftieth','fifty','fight','fighter','figment','figurative','figure','figured','filament','filch','file','filial','fill','fillet','film','filmstrip','filmy','filter','filth','filthy','fin','final','finale','finalist','finality','finalize','finance','financial','financier','find','fine','finely','finery','finesse','finger','finicky','finish','finite','fiord','fire','firearm','firebrand','firedamp','fireman','fireplace','fireproof','fireside','firework','firing','firm','firmament','firmness','first','firsthand','firstname','fiscal','fish','fisherman','fishmonger','fishy','fission','fissure','fist','fit','fitful','fitness','fitter','five','fix','fixture','flabby','flaccid','flag','flagon','flagrant','flagship','flagstaff','flail','flair','flake','flamboyant','flame','flammable','flange','flank','flannel','flap','flare','flash','flashlight','flashy','flask','flat','flatly','flatten','flatter','flaunt','flavor','flaw','flax','flay','flea','fleck','flee','fleece','fleet','flesh','flex','flexible','flextime','flick','flicker','flier','flight','flighty','flimsy','flinch','fling','flint','flip','flippant','flirt','flit','float','floating','flock','flog','flood','floor','flop','floppy','flora','floral','florid','florist','flotilla','flotsam','flounce','flounder','flour','flourish','flout','flow','flower','flowery','flu','fluctuate','flue','fluent','fluff','fluid','fluke','flummox','flunk','fluorine','flurry','flush','fluster','flute','flutter','flux','fly','flyer','flying','flywheel','foal','foam','fob','focal','focus','fodder','foe','fog','foggy','foghorn','fogy','foible','foil','foist','fold','foliage','folk','follow','follower','folly','foment','fond','fondle','food','foodstuff','fool','foolish','foolproof','foot','football','foothill','foothold','footlights','footnote','footpath','footprint','footstep','fop','for','forage','foray','forbear','forbid','force','forceful','forceps','forcible','ford','fore','forearm','forebode','forecast','forefather','forefinger','forefront','foregone','foreground','forehand','foreign','foreigner','foreman','foremost','forenoon','forensic','forerunner','foresee','foreshadow','foreshore','foresight','forest','forestall','forester','foretell','forever','forewarn','foreword','forfeit','forgather','forge','forgery','forget','forgetful','forgive','forgo','fork','forlorn','form','formal','formality','format','formation','former','formidable','formula','formulate','fornicate','forsake','forswear','fort','forte','forth','forthright','forthwith','fortieth','fortify','fortitude','fortnight','fortress','fortuitous','fortunate','fortune','forty','forum','forward','fossil','foster','foul','foundation','founder','foundry','fountain','four','fourteen','fourteenth','fowl','fox','foxhound','foyer','fraction','fractional','fractious','fracture','fragile','fragment','fragrant','frail','frailty','frame','framework','franc','franchise','frank','frankly','frantic','fraternal','fraternity','fraternize','fraud','fraught','fray','freak','freakish','freckle','free','freedom','freehand','freehold','freely','freeway','freeze','freezer','freight','frenetic','frenzy','frequency','frequent','fresco','fresh','freshen','freshwater','fret','friction','fridge','friend','friendly','friendship','frigate','fright','frighten','frightful','frigid','frigidity','frill','fringe','frisbee','frisk','fritter','frivolous','fro','frock','frog','frogman','frolic','from','front','frontage','frontal','frontier','frost','frostbite','frosty','froth','frown','frowzy','frugal','fruit','fruitful','fruition','fruitless','fruity','frustrate','fry','fuddle','fudge','fuel','fugitive','fulfil','full','fulminate','fumble','fume','fun','function','functional','fund','funeral','funereal','fungus','funicular','funk','funky','funnel','funny','fur','furbish','furious','furl','furlough','furnace','furnish','furniture','furrow','further','furtive','fury','fuse','fuselage','fusion','fuss','fussy','fusty','futile','future','futurity','fuzz','fuzzy','gabardine','gabble','gable','gad','gadget','gadgetry','gaff','gaffe','gag','gage','gain','gainful','gainsay','gait','gala','galactic','galaxy','gale','gall','gallant','gallantry','gallery','galley','gallivant','gallon','gallop','gallows','gallstone','galore','galosh','galvanic','galvanism','galvanize','gambit','gamble','gambol','game','gamut','gander','gang','gangplank','gangrene','gangster','gangway','gantry','gaol','gap','gape','garage','garb','garbage','garble','garden','gardener','gargoyle','garish','garland','garlic','garment','garner','garnet','garnish','garret','garrison','garrulous','gas','gasbag','gaseous','gash','gasholder','gasify','gasoline','gasp','gastric','gastronomy','gate','gateway','gather','gaudy','gauge','gaunt','gauze','gay','gaze','gazelle','gazette','gazetteer','gear','gearbox','gearlever','gelatine','geld','gem','gendarme','gender','gene','genealogy','general','generality','generalize','generate','generation','generator','generosity','generous','genesis','genetic','genetics','genial','genitals','genius','genocide','genteel','gentle','gentleman','gently','gentry','genuine','genus','geocentric','geography','geology','geometry','geophysics','geriatrics','germ','germicide','germinate','gerund','gestation','gesture','get','getup','ghastly','ghetto','ghost','giant','gibe','giddy','gift','gifted','gigantic','giggle','gild','gill','gimmick','gin','ginger','gingerly','gipsy','giraffe','gird','girder','girdle','girl','girlfriend','girlish','girth','gist','give','giveaway','glacial','glacier','glad','gladden','glade','glamorize','glamorous','glamour','glance','gland','glandular','glare','glass','glasshouse','glassy','glaze','glazier','gleam','glean','glee','glen','glib','glide','glider','glimmer','glimpse','glint','glisten','glitter','gloat','global','globe','globular','globule'];
      var word6 = ['gloom','gloomy','glorify','glorious','glory','gloss','glossary','glove','glow','glower','glucose','glue','glum','glut','glutinous','glutton','glycerine','gnash','gnat','gnaw','gnu','go','goad','goal','goalkeeper','goat','goatherd','gobble','goblet','goblin','god','goddess','godless','goggle','going','gold','golden','goldfish','goldsmith','golf','gondola','gong','good','goodbye','goodness','goodnight','goods','goodwill','goody','goose','gooseberry','gore','gorge','gorgeous','gorilla','gorse','gory','gospel','gossamer','gossip','gouge','gourmand','gourmet','gout','govern','governess','government','governor','gown','grab','grace','graceful','graceless','gracious','gradation','grade','gradient','gradual','graduate','graduation','graft','grain','gram','grammar','gramme','gramophone','granary','grand','grandad','grandchild','grandeur','grandiose','grandma','grandpa','grandson','grandstand','grange','granite','grannie','granny','grant','granulated','granule','grape','grapevine','graph','graphic','graphite','grapnel','grapple','grasp','grass','grassy','grate','grateful','gratify','gratis','gratitude','gratuitous','gratuity','grave','gravel','gravestone','graveyard','gravitate','gravity','gray','graze','grease','greasy','great','greatness','greed','greedy','green','greenbelt','greenery','greenhorn','greenhouse','greens','greet','gregarious','grenade','grey','grid','grief','grievance','grieve','grievous','grill','grille','grim','grimace','grime','grimy','grin','grind','grindstone','grip','gripe','grisly','gristle','grit','groan','grocer','grocery','groggy','groom','groove','grope','gross','grotesque','grouch','groundnut','groundsman','groundwork','group','grouse','grove','grovel','grow','grower','growl','growth','grub','grudge','gruel','gruelling','gruesome','gruff','grumble','grumpy','grunt','guano','guarantee','guarantor','guaranty','guard','guardian','guardroom','guerrilla','guess','guest','guesthouse','guestimate','guffaw','guidance','guide','guideline','guile','guilt','guilty','guise','guitar','gulf','gull','gullet','gully','gulp','gum','gumboot','gun','gunboat','gunner','gunpowder','gunshot','gunsmith','gurgle','gush','gust','gusto','gut','gutter','guttural','guy','guzzle','gym','gymkhana','gymnasium','gymnast','gymnastics','gypsy','gyrate','habit','habitable','habitat','habitation','habitual','habituate','hack','haddock','hag','haggard','haggle','hail','hailstone','hair','haircut','hairdo','hairpiece','hairpin','hairy','halcyon','hale','half','halfway','halitosis','hall','hallmark','hallo','hallow','halo','halt','halter','halve','halyard','ham','hamburger','hamlet','hammer','hammock','hamper','hand','handbag','handball','handbill','handbook','handcart','handcuff','handful','handicap','handicraft','handiwork','handle','handlebar','handout','handpicked','hands','handshake','handsome','handy','hang','hangar','hangdog','hanger','hangman','hank','hanker','haphazard','happen','happiness','happy','harangue','harass','harbinger','harbour','hard','harden','hardihood','hardly','hardness','hardship','hardware','hardy','hare','haricot','hark','harlequin','harlot','harm','harmful','harmless','harmonious','harmonize','harmony','harness','harp','harpoon','harrow','harry','harsh','harvest','harvester','hash','hassle','haste','hasten','hasty','hat','hatch','hatchery','hatchet','hate','hateful','hatred','haughty','haul','haulage','haunt','have','haven','havoc','haw','hawk','hawser','hawthorn','hay','haystack','haywire','hazard','hazardous','haze','hazel','hazy','he','head','headache','header','headhunter','headland','headlight','headline','headlong','headman','headmaster','headphone','headstrong','headway','headword','heal','health','healthy','heap','hear','hearken','hearsay','hearse','heart','heartache','heartbeat','heartburn','hearten','heartfelt','hearth','heartily','heartless','hearty','heat','heater','heath','heathen','heatwave','heave','heaven','heavenly','heavily','heavy','heckle','hectare','hectic','hedge','hedgehog','heed','heedful','heedless','heel','hefty','hegemony','heifer','height','heighten','heinous','heir','heiress','helicopter','heliport','helium','hell','hello','helm','helmet','help','helper','helpful','helping','helpless','helpmate','hem','hemisphere','hemp','hen','hence','henceforth','henchman','hepatic','hepatitis','her','herald','herb','herbaceous','herbage','herd','herdsman','here','hereabouts','hereafter','hereby','hereditary','heredity','heresy','heretic','herewith','heritable','heritage','hermetic','hero','heroic','heroin','heroine','heroism','heron','herpes','hers','herself','hertz','hesitant','hesitate','hesitation','heterodox','heterodoxy','hew','hexagon','hey','hi','hiatus','hibernate','hiccup','hide','hidebound','hideous','hie','hierarchy','high','highborn','highbrow','highland','highlander','highlight','highness','highroad','highway','highwayman','hijack','hike','hilarious','hill','hillock','hillside','hilly','hilt','him','himself','hind','hinder','hindrance','hinge','hint','hinterland','hip','hippie','hippodrome','hire','his','hiss','historian','historic','historical','history','histrionic','hit','hitch','hitchhike','hither','hitherto','hive','hoard','hoarfrost','hoarse','hoary','hoax','hobble','hobby','hobbyhorse','hobgoblin','hobnob','hobo','hock','hockey','hod','hoe','hog','hoist','hold','holdall','holder','holdup','hole','holiday','holiness','holler','hollow','holly','hollyhock','holocaust','holster','holy','homage','home','homeland','homeless','homelike','homely','homemade','homesick','homespun','homestead','hometown','homeward','homework','homicidal','homicide','homonym','homosexual','hone','honest','honestly','honey','honeycomb','honeymoon','honor','honorable','honorarium','honorary','hood','hoodoo','hoodwink','hoof','hook','hooker','hooky','hooligan','hoop','hoot','hoover','hooves','hop','hope','hopeful','hopeless','horde','horizon','horizontal','hormone','horn','hornet','hornpipe','horny','horology','horrible','horrid','horrify','horror','horse','horseback','horseman','horseplay','horsepower','horseshoe','horsewhip','horsy','hose','hospice','hospitable','hospital','host','hostage','hostel','hostess','hostile','hostility','hot','hotbed','hotchpotch','hotel','hotelier','hotfoot','hotheaded','hothouse','hour','hourly','house','houseboat','housefly','household','houseman','housewife','housework','hovel','hover','hovercraft','how','however','howitzer','howl','howler','hub','hubbub','hubby','huddle','hue','huff','hug','huge','hulk','hull','hum','human','humane','humanism','humanity','humanize','humble','humbug','humdrum','humid','humidify','humiliate','humility','hummock','humorist','humorous','humour','hump','humpback','hunch','hunchback','hundred','hundredth','hunger','hungry','hunk','hunt','hunter','huntsman','hurdler','hurl','hurrah','hurricane','hurry','hurt','hurtle','husband','husbandry','hush','husk','husky','hussar','hussy','hustings','hustle','hut','hutch','hyacinth','hybrid','hydrant','hydraulic','hydraulics','hydrofoil','hydrogen','hydroplane','hyena','hygiene','hygienic','hymen','hymn','hymnal','hyperbolic','hyphen','hypnosis','hypnotism','hypnotize','hypocrisy','hypocrite','hypodermic','hypothesis','hysteria','hysterical','hysterics','ibid','ice','iceberg','icebound','icebreaker','icicle','icon','icy','idea','ideal','idealism','idealist','idealize','idem','identical','identify','identikit','identity','ideology','idiom','idiomatic','idiot','idiotic','idle','idleness','idler','idol','idolater','idolatry','idolize','idyll','if','igloo','igneous','ignite','ignition','ignoble','ignominy','ignoramus','ignorance','ignorant','ignore','ill','illegal','illegible','illicit','illiterate','illness','illogical','illuminate','illumine','illusion','illusive','illustrate','image','imagery','imaginable','imaginary','imagine','imbalance','imbecile','imbibe','imbue','imitate','imitation','imitative','imitator','immaculate','immaterial','immature','immediate','immemorial','immense','immensity','immerse','immigrant','immigrate','imminence','imminent','immobile','immoderate','immodest','immoral','immortal','immovable','immune','immunity','immunize','immutable','impact','impair','impale','impart','impartial','impassable','impasse','impassive','impatient','impeach','impeccable','impede','impediment','impel','impending','impenitent','imperative','imperfect','imperial','imperil','imperious','impersonal','impervious','impetuous','impetus','impinge','impious','implacable','implant','implement','implicate','implicit','implore','imply','impolite','import','importance','important','importune','impose','imposing','impossible','impostor','imposture','impotent','impound','impoverish','impregnate','impresario','impress','impression','impressive','imprint','imprison','improbable','impromptu','improper','improve','improvise','imprudent','impugn','impulse','impulsive','impunity','impure','impurity','imputation','impute','in','inaccurate','inaction','inactive','inadequacy','inadequate','inane','inanimate','inapt','inaugural','inaugurate','inborn','inbred','incapable','incapacity','incarnate','incendiary','incense','incentive','inception','incessant','incest','inch','incidence','incident','incidental','incinerate','incipient','incise','incision','incisive','incite','inclement','incline','include','inclusive','incognito','incoherent','income','incoming','incommode','incomplete','inconstant','incorrect','increase','incredible','increment','incubate','incubator','inculcate','incumbent','incur','incursion','indebted','indecent','indecision','indecorous','indeed','indefinite','indelible','indelicate','indemnify','indemnity','indent','indenture','index','indicate','indication','indicative','indicator','indict','indictable','indictment','indigenous','indigent','indignant','indignity','indirect','indiscreet','indistinct','individual','indolent','indoor','indoors','induce','inducement','induction','inductive','indulge','indulgence','indulgent','industrial','industry','inebriate','ineffable','inept','inert','inertia','inevitable','inexorable','inexpert','infallible','infamous','infamy','infancy','infant','infantile','infantry','infatuate'];
      var word7 = ['infect','infection','infectious','infer','inference','inferior','infernal','inferno','infertile','infest','infidelity','infiltrate','infinite','infinitive','infinity','infirm','infirmary','infirmity','inflame','inflate','inflation','inflexible','inflict','inflow','influence','influenza','influx','inform','informal','informer','infraction','infrared','infringe','infuriate','infuse','infusion','ingenious','ingenuous','ingot','ingratiate','ingredient','inhabit','inhabitant','inhale','inherent','inherit','inhibit','inhuman','inhumane','inhumanity','inimical','iniquitous','iniquity','initial','initially','initiate','initiative','inject','injection','injunction','injure','injurious','injury','injustice','ink','inkling','inland','inlay','inlet','inmate','inmost','inn','innate','inner','inning','innocent','innocuous','innovate','innovation','innuendo','inoperable','inorganic','input','inquest','inquietude','inquire','inquirer','inquiry','inroad','inrush','insane','insatiable','inscribe','insect','insecure','inseminate','insensate','insensible','insert','insertion','inset','inside','insidious','insight','insignia','insincere','insinuate','insipid','insist','insistent','insolent','insoluble','insomnia','insomuch','inspect','inspection','inspector','inspire','install','instance','instant','instantly','instead','instep','instil','instinct','institute','instruct','instructor','instrument','insular','insulate','insulation','insulator','insult','insurance','insurant','insure','insurer','insurgent','intact','intake','intangible','integer','integral','integrate','integrity','intellect','intend','intense','intensify','intensive','intent','intention','interact','intercede','intercept','intercom','interest','interface','interfere','interim','interior','interject','interlock','interloper','interlude','intermezzo','intern','internal','internet','interplay','interpose','interpret','interrupt','intersect','intertwine','interval','intervene','interview','intestate','intestine','intimate','intimidate','into','intonation','intone','intoxicant','intoxicate','intranet','intricate','intrigue','intrinsic','introduce','intrude','intuition','inundate','inure','invade','invalid','invalidate','invaluable','invariable','invasion','invective','inveigh','inveigle','invent','invention','inventor','inventory','inverse','inversion','invert','invest','investment','investor','inveterate','invidious','invigorate','invincible','inviolate','invisible','invitation','invite','invocation','invoice','invoke','involve','inward','iodine','ion','iota','irascible','irate','iridium','iris','irk','iron','ironic','ironworks','irony','irradiate','irregular','irrelevant','irrigate','irrigation','irritable','irritant','irritation','island','isobar','isolate','isolation','isotherm','isotope','issue','isthmus','it','italic','italicize','itch','itchy','item','itemize','iterate','iteration','itinerant','itinerary','its','itself','ivory','ivy','ixia','jab','jabber','jack','jackal','jackass','jacket','jade','jaguar','jail','jailbird','jailbreak','jailer','jalopy','jam','jamb','jamboree','jangle','janitor','jar','jargon','jasmin','jaundice','jaunt','jaunty','javelin','jaw','jazz','jazzy','jealous','jealousy','jean','jeep','jelly','jellyfish','jeopardize','jeopardy','jerk','jerky','jerry','jest','jester','jet','jetsam','jettison','jetty','jewel','jeweller','jewellery','jib','jibe','jiff','jiffy','jig','jiggered','jiggle','jigsaw','jihad','jilt','jingle','jinks','jinx','jitter','job','jobber','jobbery','jobbing','jobcenter','jobless','jobsheet','jockstrap','jocose','jocular','jocund','jog','jogger','joggle','jogtrot','john','join','joinery','joint','jointure','joist','joke','joker','jollify','jollity','jolly','jolt','jostle','jot','jotter','joule','journal','journalism','journalist','journey','journeyman','jovial','jowl','joy','joyful','joyless','joyous','joyride','joystick','jubilant','jubilation','jubilee','judge','judgement','judgment','judicature','judicial','judicious','judo','judoist','jug','juggle','jugular','juice','juicy','jukebox','jumble','jumbo','jump','jumper','jumpy','junction','juncture','jungle','junior','junket','juridical','jurist','juror','jury','juryman','just','justice','justify','jut','jute','juvenile','juxtapose','kamikaze','kangaroo','kaolin','kapok','karabiner','karat','karate','kebab','keel','keen','keep','keeper','keepsake','keg','ken','kendo','kennel','keratin','kerb','kerbstone','kerchief','kerfuffle','kernel','kerosene','ketchup','kettle','kettledrum','key','keyboard','keyhole','keynote','keystone','kg','khaki','kick','kickback','kid','kiddie','kidnap','kidney','kill','killer','kiln','kilobyte','kilocycle','kilogram','kilohertz','kilometre','kiloton','kilovolt','kilowatt','kimono','kin','kind','kindle','kindly','kindness','kindred','kinetic','kinetics','king','kingdom','kingpin','kink','kinsfolk','kinship','kinsman','kinswoman','kiosk','kiss','kit','kitchen','kite','kith','kitten','kitty','km','knack','knapsack','knave','knead','knee','kneecap','kneel','knell','knickers','knife','knight','knit','knitwear','knob','knobbly','knock','knockabout','knocker','knoll','knot','knotty','know','knowledge','knuckle','knurl','koala','kosher','kowtow','krill','kudos','kw','lab','label','labial','labor','laborer','laborious','labyrinth','lace','lacerate','lachrymose','lack','lackey','laconic','lacquer','lactic','lacy','lad','ladder','laden','lading','lady','lag','lager','lair','laird','laity','lake','lamb','lambskin','lame','lament','lamp','lampoon','lamppost','lampshade','lance','lancet','land','landholder','landlady','landlocked','landlord','landlubber','landmark','landscape','landslide','lane','language','languid','languish','languor','lank','lanky','lantern','lap','lapdog','lapel','lapse','larceny','lard','larder','large','lark','larva','laryngitis','larynx','lascivious','laser','lash','lass','lassitude','lasso','last','latch','late','lately','latent','later','lateral','latest','lath','lathe','lather','latitude','latrine','latter','laud','laudable','laugh','laughable','laughter','launch','launder','laundress','laundry','laureate','laurel','lava','lavatory','lavender','lavish','law','lawcourt','lawful','lawless','lawn','lawsuit','lawyer','lax','laxative','lay','layer','layman','layout','laze','lazy','lead','leader','leadership','leaf','leaflet','league','leak','leakage','leaky','lean','leap','learn','lease','leasehold','least','leather','leave','leaven','lecture','lecturer','ledge','ledger','lee','leech','leek','leeway','leg','legacy','legal','legality','legalize','legate','legation','legend','legible','legion','legislate','legislator','legitimate','leisure','leisured','leisurely','lemon','lemonade','lend','length','lengthen','lengthwise','lengthy','lenient','lens','leprosy','lesbian','less','lessee','lessen','lesson','lessor','lest','let','lethal','lethargy','letter','letterbox','lettuce','leukemia','level','lever','leverage','levity','levy','lewd','lexical','lexicon','liability','liable','liaison','liar','libel','liberal','liberality','liberalize','liberate','liberation','liberty','librarian','library','libretto','licence','license','licentious','lick','licorice','lid','lie','lieutenant','life','lifebelt','lifeboat','lifebuoy','lifeguard','lifeless','lifelong','lifetime','lift','light','lighten','lighter','lighthouse','lightly','lightning','likable','like','likelihood','likely','likeness','likewise','lilac','lilt','lily','limb','limbo','lime','limelight','limestone','limit','limitation','limp','limpid','linchpin','line','lineage','lineal','lineament','linear','lineman','linen','liner','linesman','linger','lingerie','lingo','lingua','linguist','linguistic','liniment','link','links','linoleum','linseed','lint','lintel','lion','lionize','lip','lipstick','liquefy','liqueur','liquid','liquidate','liquor','liquorice','list','listen','listener','listless','literacy','literal','literally','literary','literate','literature','lithe','lithium','lithograph','litigant','litigate','litigious','litre','litter','little','littoral','liturgy','live','livelihood','livelong','lively','liver','livery','livestock','livid','lizard','load','loaf','loam','loan','loath','loathe','loathsome','loaves','lobby','lobe','lobster','local','locality','localize','locate','location','loch','lock','locker','lockout','locksmith','lockup','locomotion','locomotive','locum','locust','locution','lode','lodestar','lodestone','lodge','lodger','loess','loft','lofty','log','logarithm','loggerhead','logic','logical','login','loin','loiter','loll','lone','loneliness','lonely','lonesome','long','longbow','longer','longevity','longhand','longitude','look','lookout','loom','loop','loophole','loose','loosen','loot','lop','lope','lord','lordly','lore','lorry','lose','loser','loss','lot','lotion','lottery','loud','lounge','louse','lousy','lout','louvre','lovable','love','loveless','lovely','lovemaking','lover','low','lowbrow','lower','lowly','loyal','loyalty','lozenge','lubricant','lubricate','lucid','luck','lucky','lucrative','ludicrous','lug','luggage','lugubrious','lukewarm','lull','lumbago','lumber','luminary','luminous','lump','lumpish','lumpy','lunacy','lunar','lunatic','lunch','luncheon','lunchtime','lung','lunge','lurch','lure','lurid','lurk','luscious','lush','lust','lustful','lustre','lustrous','lusty','lute','luxuriance','luxuriant','luxuriate','luxurious','luxury','lychee','lymph','lynch','lynx','lyre','lyric','lyrical','macabre','macadam','macaroni','mace','macerate','machine','machinegun','machinery','machinist','mackintosh','macrocosm','mad','madam','madame','madcap','madden','madhouse','madman','madrigal','maelstrom','maestro','magazine','magenta','maggot','magic','magician','magistrate','magnate','magnesia','magnesium','magnet','magnetic','magnetism','magnetize','magneto','magnify','magnitude','magpie','magus','mahogany','maid','maiden','mail'];
      var word8 = ['mailbag','maim','main','mainland','mainline','mainspring','mainstay','mainstream','maintain','maize','majesty','major','majority','make','maker','makeshift','makeweight','malady','malaria','malcontent','male','malefactor','malevolent','malformed','malice','malicious','malign','malignant','malinger','mall','malleable','mallet','malodorous','malt','maltreat','mama','mamma','mammal','mammon','mammoth','man','manacle','manage','manageable','management','manager','managerial','mandate','mandated','mandolin','manful','manganese','mangle','mango','mangrove','manhandle','manhole','manhood','mania','maniac','manicure','manifest','manifesto','manifold','manipulate','mankind','manlike','manly','mannequin','manner','mannered','mannerism','mannish','manoeuvre','mansion','mantis','mantle','manual','manure','manuscript','many','map','maple','mar','marathon','marauder','marble','march','margarine','margin','marginal','marijuana','marine','mariner','marital','maritime','mark','marked','marker','market','marketable','marksman','marmalade','marquee','marquis','marriage','marrow','marry','marsh','marshal','mart','marten','martial','martyr','martyrdom','marvel','marvellous','mascot','masculine','mash','mask','mason','masonry','masquerade','mass','massacre','massage','masseur','masseuse','massive','mast','master','masterful','masterly','mastery','masticate','masturbate','mat','match','matchless','matchmaker','matchwood','mate','material','maternal','maternity','math','maths','matriarch','matricide','matrimony','matrix','matron','matted','matter','mattock','mattress','maturate','mature','maturity','maul','mausoleum','mauve','maw','mawkish','maxim','maximize','maximum','may','maybe','mayor','mayoralty','mayoress','maze','me','mead','meadow','meagre','meal','mealy','mean','meander','meaningful','meantime','meanwhile','measles','measly','measurable','measure','meat','mechanic','mechanical','mechanics','mechanism','mechanize','medal','medallist','meddle','media','mediaeval','mediate','medical','medicament','medicated','medicinal','medicine','medieval','mediocre','mediocrity','meditate','medium','medley','meek','meet','megaphone','melancholy','mellow','melodious','melodrama','melody','melon','melt','member','membership','membrane','memento','memo','memoir','memorable','memorandum','memorial','memorize','memory','menace','menagerie','mend','mendacious','menial','menopause','mental','mentality','mention','mentor','menu','mercantile','mercenary','merchant','merciful','merciless','mercurial','mercy','mere','merely','merge','merger','meridian','meringue','merino','merit','mermaid','merry','mesh','mesmerism','mesmerize','mess','message','messenger','messy','metabolism','metal','metallic','metallurgy','meteor','meteoric','meteorite','meter','method','methodical','methylate','meticulous','metre','metric','metrical','metricize','metro','metropolis','mettle','microbe','microfilm','micrometer','micron','microphone','microscope','microwave','mid','midday','midden','middle','middleman','midge','midget','midmost','midnight','midst','midsummer','midway','midwinter','mien','might','mighty','migraine','migrant','migrate','migration','migratory','mike','milch','mild','mile','mileage','milestone','militant','militarism','militarize','military','militate','militia','milk','milkmaid','milkman','milky','mill','millibar','milligram','millilitre','millimetre','milliner','millinery','million','millionth','millstone','mime','mimic','mimicry','min','mince','mind','mindful','mindless','mine','minefield','miner','mineral','mineralogy','mingle','mini','miniature','minibus','minimal','minimize','minimum','minister','ministry','mink','minor','minority','mint','minuet','minus','minute','miracle','miraculous','mirage','mire','mirror','mirth','misapply','misbehave','miscarry','miscellany','mischance','mischief','misconduct','miscreant','misdate','misdeal','misdeed','misdirect','miser','miserable','misery','misfire','misfortune','misguide','mishap','misinform','misjudge','mislay','mislead','misnomer','misplace','misprint','misquote','misread','misreport','misrule','miss','missile','mission','missionary','missive','misspell','misspend','misstate','mist','mistake','mister','mistress','mistrust','misty','misuse','mitigate','mitre','mitt','mitten','mix','mixer','mixture','moan','moat','mob','mobile','mobilize','mobster','mock','mockery','mode','model','moderate','moderately','moderation','modern','modernism','modernize','modest','modesty','modicum','modify','modish','modulate','modulation','module','mohair','moist','moisten','moisture','molar','molasses','mole','molecule','molest','mollify','mollusc','mom','moment','momentary','momentous','momentum','mommy','monarch','monarchy','monastery','monastic','monetary','money','mongrel','monitor','monk','monkey','monochrome','monogamy','monogram','monograph','monolith','monolithic','monologue','monophonic','monoplane','monopolist','monopolize','monopoly','monopsony','monorail','monostelic','monotone','monotonous','monovalent','monoxide','monsieur','monsoon','monster','monstrous','montage','month','monthly','monument','monumental','mood','moody','moon','moonlight','moonlit','moonscape','moonshot','moonstone','moor','moose','moot','mop','mope','moppet','moral','morale','moralist','moralistic','morality','moralize','morass','moratorium','morbid','mordant','mordent','more','moreover','mores','moribund','morning','morose','morphine','morrow','morsel','mortal','mortality','mortar','mortgage','mortgagee','mortgager','mortician','mortify','mortise','mortuary','mosaic','mosey','moslem','mosque','mosquito','moss','most','mostly','mot','mote','motel','moth','mothball','mother','motherhood','motherly','motion','motionless','motivate','motley','motor','motorbike','motorboat','motorcade','motorcar','motorcycle','motorist','motorize','motorman','motormouth','motorway','motto','mould','moulder','mouldy','moult','mound','mount','mountain','mountebank','mourn','mourner','mouse','moustache','mouth','mouthful','mouthorgan','mouthpiece','mouthwash','movable','move','movement','movie','mow','much','muck','muckrake','mucous','mud','muddle','muddy','mudguard','muff','muffle','muffler','mufti','mug','mulberry','mulct','mule','mulish','mullion','multimedia','multiple','multiply','multitude','mum','mumble','mummify','mummy','mundane','municipal','munificent','munition','mural','murder','murderer','murderous','murky','murmur','murrain','muscle','muscular','muse','museum','mushroom','music','musical','musician','musk','muslin','must','mustard','muster','musty','mutable','mute','mutilate','mutineer','mutinous','mutiny','mutter','mutton','mutual','muzzle','muzzy','my','myopia','myopic','myriad','myself','mysterious','mystery','mystic','mystify','myth','mythology','nab','nadir','nag','naiad','nail','naive','naivety','naked','name','nameless','namely','nanny','nap','napalm','nape','naphtha','napkin','nappy','narcissus','narcotic','nark','narky','narrate','narration','narrative','narrator','narrow','nasal','nasty','natal','nation','national','native','nativity','natty','natural','naturalist','naturalize','nature','naught','naughty','nausea','nauseate','nauseous','nautical','naval','navel','navigable','navigate','navigation','navigator','navy','nay','neap','near','nearby','nearly','neat','nebula','nebulous','necessary','necessity','neck','neckband','necklace','necktie','nectar','need','needful','needle','needless','needlework','needy','negate','negation','negative','neglect','neglectful','negligent','negligible','negotiable','negotiate','neighbour','neither','nemesis','neologism','nephew','nerve','nerveless','nervous','nervy','nest','nestle','net','nether','nettle','network','neuralgia','neurosis','neurotic','neuter','neutral','neutrality','neutralize','neutron','never','nevermore','new','newly','news','newsboy','newspaper','newsreel','newt','next','nib','nibble','nice','nicely','nicety','niche','nick','nickel','nickname','niece','niggard','niggardly','night','nightclub','nightdress','nightly','nightmare','nightshirt','nil','nimble','nincompoop','nine','nineteen','nineteenth','ninetieth','ninety','nip','nipper','nipple','no','nobility','noble','nobleman','nobody','nocturnal','nod','noes','noise','noiseless','noisome','noisy','nomad','nomadic','nominal','nominate','nomination','nominee','nonaligned','nonce','nonchalant','none','nonentity','nonferrous','nonfiction','nonpareil','nonpayment','nonplus','nonsense','nonsmoker','nonstick','nonstop','noodle','nook','noon','noonday','noone','noontide','noose','nope','nor','norm','normal','normalize','north','northeast','northerly','northern','northward','northwest','nose','nosedive','nosegay','nosey','nostalgia','nostril','not','notable','notably','notary','notation','notch','note','notebook','notepaper','noteworthy','nothing','notice','noticeable','notifiable','notify','notion','notorious','nougat','nought','noun','nourish','novel','novelty','novice','novitiate','now','nowadays','noway','nowhere','noxious','nuclear','nucleus','nude','nudge','nugget','nuisance','nuke','null','nullify','numb','number','numberless','numerable','numeral','numerate','numerator','numerical','numerous','numskull','nun','nuptial','nurse','nursery','nurseryman','nurture','nut','nutation','nutcase','nutcracker','nuthouse','nutrient','nutriment','nutrition','nuts','nutshell','nuzzle','nylon','oak','oar','oarsman','oasis','oath','obcordate','obedience','obedient','obeisance','obese','obey','obituary','object','objection','objective','objector','oblation','obligate','obligation','obligatory','oblige','oblique','obliterate','oblivion','oblong','obloquy','obnoxious','obscene','obscenity','obscure','obsequies','obsequious','observant','observe','observer','obsess','obsession','obsolete','obstacle','obstinate','obstruct','obtain','obtainable','obtrude','obtuse','obverse','obviate','obvious','occasion','occasional','occult','occupant','occupation','occupier','occupy','occur','occurrence','ocean','ochre','octagon','octave','octopus','ocular','oculist','odd','oddity','oddly','odds','ode','odious','odium','odour','of','off','offal','offence','offend','offender'];
      var word9 = ['offensive','offer','offertory','offhand','office','officer','official','officiate','officious','offing','offset','offshoot','offspring','often','oil','oilcake','oilfield','oilskin','oily','ointment','ok','okay','old','oleaginous','oligarchy','oligopoly','olive','olympiad','omega','omelette','omen','ominous','omission','omit','omnibus','omnipotent','omniscient','omnivorous','on','once','one','onerous','oneself','onion','online','onlooker','only','onset','onslaught','onto','onus','onward','ooze','opal','opaque','open','openwork','opera','operable','operate','operation','operative','operator','opinion','opponent','opportune','oppose','opposite','opposition','oppress','oppression','oppressive','optical','optician','optics','optimism','optimist','optimistic','optimum','option','optional','opulent','opus','or','oral','orange','orangeade','orangutang','oration','orator','oratory','orb','orbit','orchard','orchestra','orchestral','ordain','ordeal','order','orderly','ordinal','ordinance','ordinary','ordnance','organ','organic','organism','organist','organize','orgasm','orgy','orient','orientate','orifice','origin','original','originate','ornament','ornamental','ornate','orphan','orphanage','orthodox','orthodoxy','oscillate','ossify','ostensible','ostracize','ostrich','other','otherwise','otter','ottoman','ought','ounce','our','ours','ourself','ourselves','oust','out','outbid','outbound','outbreak','outcast','outclass','outcome','outcrop','outcry','outdated','outdo','outdoor','outdoors','outer','outermost','outface','outfight','outfit','outfitter','outflank','outgo','outgoing','outgoings','outgrow','outgrowth','outhouse','outlandish','outlast','outlaw','outlay','outlet','outline','outlive','outlook','outlying','outnumber','outpatient','outplay','outpost','output','outrage','outrageous','outright','outsell','outset','outside','outsider','outskirts','outspoken','outstay','outstrip','outward','outwards','outwit','outwork','oval','ovary','ovation','oven','over','overact','overall','overawe','overboard','overcast','overcoat','overcome','overdo','overdraft','overdraw','overdress','overdue','overflow','overgrown','overhang','overhaul','overhead','overhear','overland','overlap','overload','overlook','overmuch','overnight','overpass','overpay','overpower','overrate','overreach','override','overrule','overrun','overseas','oversee','overseer','overshadow','oversight','overstate','overstay','overstep','overstock','overstrung','overt','overtake','overtax','overthrow','overtime','overture','overturn','overweight','overwhelm','overwork','oviduct','ovulate','ovum','owe','owl','own','owner','ownership','ox','oxide','oxidize','oxygen','oyster','oz','ozone','pace','pacific','pacifism','pacifist','pacify','pack','package','packet','pact','pad','paddle','paddock','paddy','padlock','pagan','page','pageant','pageantry','pagoda','pail','pain','painful','painless','paint','painter','pair','pal','palace','palatable','palate','palatial','palaver','pale','palette','pallet','palliate','palliation','palliative','pallid','pallor','palm','palmy','palpable','palpitate','palsy','paltry','pamper','pamphlet','pan','panacea','pancake','panda','pandemic','pander','pane','panegyric','panel','pang','panic','panorama','pant','pantheism','panther','panties','pantile','pantograph','pantomime','pantry','pants','pap','papa','paper','paperback','paperwork','papist','par','parable','parabola','parachute','parade','paradise','paradox','paraffin','paragon','paragraph','parallel','paralysis','paralytic','paralyze','parameter','paramount','paranoia','parapet','paraphrase','parasite','parasol','paratroops','parcel','parch','pardon','pardonable','pare','parent','parentage','parental','parish','parity','park','parlance','parley','parliament','parlour','parochial','parody','parole','paroxysm','parquet','parrot','parry','parse','parsimony','parsley','part','partake','partial','partiality','partially','participle','particle','particular','partition','partner','party','pass','passable','passage','passbook','passenger','passion','passionate','passive','passkey','passport','password','paste','pasteboard','pastel','pastime','pastor','pasture','pasty','pat','patch','patchy','pate','patent','patentee','paternal','paternity','path','pathetic','pathfinder','pathname','pathology','pathos','patience','patient','patriarch','patriot','patriotic','patriotism','patrol','patron','patronage','patronize','patter','pattern','paucity','pauper','pause','pave','pavement','pavilion','paw','pawn','pawnshop','pay','payable','payee','payer','payload','paymaster','payment','pea','peace','peaceable','peaceful','peacetime','peach','peacock','peak','peal','peanut','pear','pearl','peasant','peat','pebble','peccadillo','peck','peckish','peculate','peculiar','pecuniary','pedagogue','pedagogy','pedal','pedant','pedantic','pedantry','peddle','pedestal','pedestrian','pedicab','pedigree','pedlar','peek','peel','peep','peer','peevish','peg','pelagic','pellet','pelt','pemmican','pen','penal','penalize','penalty','pencil','pendant','pending','pendium','pendulum','penetrate','penguin','penicillin','peninsula','peninsular','penitence','penitent','pennant','penniless','penny','pension','pensioner','pensive','pentathlon','penthouse','penurious','penury','people','pep','pepper','peppermint','peppery','per','perceive','percent','percentage','perception','perceptive','perch','perchance','percolate','percolator','percussion','peremptory','perennial','perfect','perfection','perfidy','perforate','perforce','perform','performer','perfume','perfumer','pergola','perhaps','peril','perilous','perimeter','period','periodic','periodical','periphery','periscope','perish','perishable','perjure','perjury','perk','perky','perm','permanent','permeable','permeate','permission','permit','permute','pernicious','pernickety','peroration','peroxide','perpetrate','perpetual','perpetuate','perpetuity','perplex','perplexity','perquisite','persecute','persevere','persist','persistent','person','personable','personage','personal','personify','personnel','perspire','persuade','persuasion','persuasive','pert','pertain','pertinent','perturb','peruse','pervade','pervasive','perverse','perversion','pervert','pessimism','pessimist','pest','pester','pesticide','pestilence','pet','petal','peter','petite','petition','petrel','petrify','petrol','petroleum','petticoat','petty','petulant','pew','phantasm','phantom','pharmacist','pharmacy','phase','pheasant','phenomenal','phenomenon','phial','philander','philately','philosophy','philtre','phlegm','phobia','phoenix','phone','phonetic','phonetics','phoney','phonogram','phonograph','photo','photocopy','photograph','photostat','phrasal','phrase','phylum','physical','physically','physician','physicist','physics','physiology','physique','pi','pianist','piano','pick','pickaback','picket','pickings','pickle','pickpocket','picnic','pictorial','picture','pidgin','pie','piece','piecemeal','pieces','pied','pier','pierce','piety','piffle','pig','pigeon','pigeonhole','pigheaded','pigment','pigsty','pigtail','pike','pilchard','pile','pilfer','pilgrim','pilgrimage','pill','pillage','pillar','pillion','pillow','pilot','pimple','pin','pinafore','pincers','pinch','pine','pineapple','pinion','pink','pinnacle','pinprick','pint','pioneer','pious','pip','pipe','pipeline','piquant','pique','piracy','pirate','pirouette','piscatory','piss','pistol','piston','pit','pitch','pitcher','pitchfork','piteous','pitfall','pith','pithy','pitiable','pitiful','pitiless','pittance','pity','pivot','pizza','placard','placate','place','placid','plagiarize','plague','plain','plaintiff','plaintive','plan','plane','planet','planetary','plank','plant','plantain','plantation','planter','plaque','plaster','plastic','plate','plateau','plateful','platelayer','platform','platinum','platitude','platoon','platter','plaudit','plausible','play','playbill','playboy','player','playful','playgoer','playground','playmate','playwright','plaza','plea','plead','pleasant','pleasantly','pleasantry','please','pleasure','pleat','plebeian','plebiscite','pledge','plenary','plentiful','plenty','pliable','pliers','plight','plinth','plod','plot','plough','pluck','plucky','plug','plum','plumage','plumb','plumber','plume','plump','plunder','plunge','plural','plus','plush','plutocracy','plutocrat','ply','poach','pock','pocket','pocketbook','pod','podgy','poem','poet','poetic','poetry','poignant','point','pointer','pointless','poise','poison','poisonous','poke','poker','polar','pole','polemic','police','policeman','policy','polish','politburo','polite','politic','political','politician','politick','politics','poll','pollard','pollen','pollenate','polling','pollute','pollution','polo','poly','polygamy','polyglot','polygon','pomp','pompous','pond','ponder','ponderous','poniard','pontiff','pontoon','pool','poor','poorhouse','poorly','poorness','pop','poplar','poppy','populace','popular','popularity','popularize','populate','population','populous','porcelain','porch','pore','pork','porous','porpoise','porridge','port','portable','portage','portal','portend','portent','portentous','porter','portfolio','porthole','portico','portion','portly','portrait','portray','portrayal','pose','poser','poseur','posh','position','positive','possess','possession','possessive','possible','possibly','post','postage','postal','postcard','postcode','postdate','poster','posterior','posterity','posthaste','posthumous','postman','postmark','postmaster','postpaid','postpone','postscript','postulate','posture','postwar','posy','pot','potash','potato','potent','potentate','potential','potion','potluck','potter','pottery','potty','pouch','poultice','poultry','pounce','pound','pour','pout','poverty','powder','powdery','power','powerful','powerless','practical','practice','practise','pragmatism','prairie','praise','pram','prank','prate','pray','prayer','preach','preamble','precarious','precaution','precede','precedence','precedent','preceding','precept','precinct','precious','precipice','precis','precise','precision','preclude','precocious','precursor','predestine','predicate','predict','prediction','predispose','preeminent','preempt','preemption','preen','prefab','preface','prefect','prefer','preferable','preference','prefix','pregnancy'];
      var word10 = ['pregnant','prelude','premature','premier','premise','premium','preoccupy','preordain','prep','prepare','presage','preschool','prescient','prescribe','presence','present','presently','preserve','preset','preside','presidency','president','press','pressure','pressurize','prestige','presumable','presumably','presume','presuppose','pretence','pretend','pretension','preterite','pretext','pretty','prevail','prevalence','prevalent','prevent','prevention','preventive','preview','previous','prey','price','priceless','prick','prickle','prickly','pride','priest','prig','prim','prima','primacy','primarily','primary','primate','prime','primer','primeval','primitive','prince','princess','principal','principle','print','printable','printer','printout','prior','priority','prism','prismatic','prison','prisoner','privacy','private','privation','privilege','privileged','prize','pro','probable','probably','probate','probation','probe','probity','problem','procedure','proceed','process','procession','processor','proclaim','proclivity','procure','prod','prodigal','prodigious','prodigy','produce','producer','product','production','productive','profane','profess','profession','professor','proffer','proficient','profile','profit','profitable','profiteer','profligate','profound','profuse','profusion','progeny','prognosis','program','programme','progress','prohibit','project','projectile','projection','projector','prolific','prologue','prolong','promenade','prominence','prominent','promise','promissory','promote','promotion','promotor','prompt','promulgate','prone','pronoun','pronounce','proof','proofread','prop','propaganda','propagate','propel','propeller','propensity','proper','property','prophecy','prophesy','prophet','propitiate','propitious','proponent','proportion','proposal','propose','propound','proprietor','propriety','propulsion','prorate','prorogue','prosaic','proscribe','prose','prosecute','prosecutor','prosody','prospect','prospectus','prosper','prosperity','prosperous','prosy','protect','protection','protective','protector','protege','protein','protest','protocol','proton','prototype','protract','protractor','protrude','proud','prove','proverb','proverbial','provide','provident','province','provincial','provision','proviso','provoke','prowess','proximate','proximity','proxy','prude','prudence','prudent','prune','prurient','pry','psalm','pseudonym','psychiatry','psychic','psychology','psychopath','psychosis','psychotic','pub','puberty','public','publican','publicity','publicize','publish','publisher','puck','pucker','pudding','puerile','puff','pugilism','pugilist','pugnacious','puke','pull','pulley','pulp','pulsate','pulse','pulverize','puma','pumice','pummel','pump','pumpkin','punch','punctual','punctuate','pundit','pungent','punish','punishment','punitive','punk','punt','puny','pupil','puppet','puppy','purchase','pure','puree','purely','purgative','purge','purify','purity','purlieus','purloin','purple','purport','purpose','purposeful','purse','purser','pursuance','pursue','pursuit','purulent','purvey','pus','push','puss','put','putrefy','putrid','putty','puzzle','pyjamas','pylon','pyramid','python','quack','quadrangle','quadrant','quadruped','quadruple','quagmire','quail','quaint','quake','qualify','quality','qualm','quandary','quantify','quantity','quarantine','quarrel','quarry','quart','quarter','quartet','quartz','quatrain','quaver','quay','queasy','queen','queer','quench','querulous','query','quest','question','queue','quibble','quick','quicken','quicklime','quicksand','quickset','quid','quiescent','quiet','quieten','quietude','quilt','quinine','quintet','quip','quire','quirk','quit','quite','quiver','quiz','quizzical','quoit','quorum','quota','quotation','quote','quotient','rabbit','rabble','rabid','race','racecourse','racial','racialism','rack','racket','racketeer','racy','radar','radiant','radiate','radiation','radiator','radical','radio','radiograph','radish','radius','raffle','raft','rafter','rag','rage','raid','raider','rail','raillery','railroad','railway','raiment','rain','rainbow','raincoat','raindrop','rainfall','raingauge','rainproof','rainy','raise','raisin','rake','rally','ram','ramble','rambler','ramify','ramp','rampage','rampant','ramshackle','ranch','rancour','random','range','rank','ransack','ransom','rant','rap','rapacious','rape','rapid','rapidity','rapture','rare','rarely','rarity','rascal','rash','rasp','rat','ratchet','rate','rather','ratify','ratio','ration','rational','ravage','rave','ravel','raven','ravine','ravish','raw','ray','rayon','raze','razor','re','reach','react','reaction','reactor','readable','readdress','reader','readily','readiness','readjust','readout','ready','real','realism','realistic','reality','realize','really','realm','realty','ream','reanimate','reap','reaper','rear','reason','reasonable','reasonably','reassure','rebate','rebel','rebellion','rebellious','rebuff','rebuild','rebuke','rebut','recall','recant','recapture','recast','recede','receipt','receive','received','receiver','recent','receptacle','reception','receptive','recess','recession','recipe','recipient','reciprocal','recital','recitation','recite','reckless','reckon','reclaim','recline','recognize','recoil','recollect','recommend','recompense','reconcile','recondite','record','recorder','recount','recoup','recourse','recover','recovery','recreate','recreation','recrudesce','recruit','rectangle','rectify','rectitude','rector','recumbent','recuperate','recur','recurrence','recurrent','recycle','red','redden','redeem','redemption','redouble','redound','redress','reduce','reduction','redundancy','redundant','reef','reek','reel','reentry','reexport','ref','refectory','refer','referee','reference','referendum','refine','refinement','refinery','reflect','reflection','reflex','reflexive','reform','refract','refractory','refrain','refresh','refuel','refuge','refugee','refund','refusal','refuse','refute','regain','regal','regard','regardful','regardless','regime','regimen','regiment','region','regional','register','registrar','registry','regress','regret','regular','regularity','regularize','regulate','regulation','rehearsal','rehearse','reign','reimburse','rein','reinforce','reinstate','reiterate','reject','rejoice','rejoin','relapse','relate','relation','relative','relativity','relax','relaxation','relay','release','relegate','relevant','reliable','reliance','reliant','relief','relieve','religion','religious','relinquish','relish','reluctant','rely','remain','remainder','remand','remark','remarkable','remedial','remedy','remember','remind','reminder','remiss','remission','remit','remorse','remote','removable','removal','remove','remunerate','rend','render','rendezvous','renew','renewal','renounce','renovate','renown','rental','reorganize','repair','repairable','reparable','reparation','repartee','repast','repatriate','repay','repeal','repeat','repeatedly','repel','repent','repentance','repetition','repine','replace','replay','replenish','replete','repletion','replica','replicate','reply','report','reporter','repose','repository','reprehend','represent','repress','repression','reprieve','reprimand','reprint','reprisal','reproach','reprobate','reproduce','reproof','reprove','reptile','republic','republican','repudiate','repugnance','repugnant','repulse','repulsion','reputable','reputation','repute','request','require','requisite','requital','requite','rescind','rescue','research','resemble','resent','resentful','reserve','reservoir','reside','residence','residency','resident','residue','resign','resin','resist','resistance','resistant','resolute','resolution','resolve','resonance','resonant','resort','resound','resource','respect','respectful','respective','respire','respite','respond','response','responsive','rest','restart','restaurant','restore','restrain','restraint','restrict','result','resultant','resume','resurrect','retail','retailer','retain','retaliate','retard','retch','retell','retention','retentive','reticent','retire','retirement','retort','retouch','retrace','retract','retreat','retrench','retrial','retrieve','retrograde','retrogress','retrospect','return','returnable','reunion','revalue','reveal','revel','revelation','revelry','revenge','revengeful','revenue','revere','reverence','reverend','reverent','reverie','reversal','reverse','reversible','revert','review','revile','revise','revision','revival','revive','revoke','revolt','revolution','revolve','revolver','revulsion','reward','rhetoric','rhinoceros','rhyme','rhymed','rhythm','rib','ribald','ribaldry','ribbon','rice','rich','riches','rick','rickety','riddance','riddle','ride','rider','ridge','ridicule','ridiculous','rife','rifle','rig','right','righteous','rightful','rightism','rigid','rigmarole','rigorous','rigour','rile','rim','rind','ring','rink','rinse','riot','riotous','rip','ripe','ripen','ripple','rise','rising','risk','rite','ritual','rival','rivalry','river','rivet','rivulet','road','roadway','roam','roan','roar','roast','rob','robber','robbery','robe','robin','robot','robust','rock','rocket','rocky','rod','rodent','rogue','roguery','roguish','role','roll','roller','rolling','romantic','romp','rompers','roof','rook','room','roomed','roomy','roost','rooster','root','rope','rosary','rose','roseate','roster','rostrum','rosy','rot','rota','rotary','rotate','rotation','rote','rotten','rotund','rotunda','rouge','rough','roughcast','roughshod','roulette','round','roundabout','roundly','rouse','rout','route','routine','row','rowdy','royal','royalty','rub','rubber','rubbish','rubble','rubicund','rubric','ruby','rucksack','ructions','rudder','ruddy','rude','rudiments','rue','ruffian','ruffle','rug','rugged','ruin','ruination','rule','ruler','rum','rumble','ruminant','ruminate','rummage','rumour','rump','rumple','rumpus','run','runaway','runnel','runner','runway','rupture','rural','ruse','rush','rusk','russet','rust','rustle','rusty','rut','ruthless','sable','sabotage','saboteur','sabre','sachet','sack','sacrament','sacred','sacrifice','sacrosanct','sad','sadden','saddle','sadness','safari','safe','safeguard','safety','sag','sagacious','sagacity','sage','sail','sailor','saint','sake','salable'];
      var word11 = ['salad','salary','sale','salesman','salesroom','salient','saline','saliva','sally','salon','saloon','salt','salty','salutary','salutation','salute','salvage','salvation','salve','salver','salvo','same','sample','sanctify','sanction','sanctity','sanctuary','sanctum','sand','sandal','sandbag','sandbank','sandpaper','sandstone','sandwich','sandy','sane','sangfroid','sanitary','sanitation','sanity','sap','sapling','sapper','sapphire','sappy','sarcasm','sarcastic','sardine','sardonic','sartorial','sash','satanic','satchel','satellite','satiate','satiety','satin','satire','satirist','satirize','satisfy','saturate','saturation','saturnine','sauce','saucepan','saucer','saucy','sauna','saunter','sausage','saute','savage','savagery','savant','save','savings','saviour','savour','savoury','saw','sawdust','sawmill','sawyer','saxophone','say','scabbard','scald','scale','scalp','scalpel','scamp','scamper','scan','scandal','scandalize','scandalous','scant','scanty','scapegoat','scar','scarce','scarcely','scarcity','scare','scarecrow','scarf','scarlet','scatter','scattered','scenario','scene','scenery','scenic','scent','sceptical','scepticism','schedule','schema','scheme','schism','schismatic','scholar','scholarly','scholastic','school','schoolboy','schoolgirl','schoolmate','schoolroom','science','scientific','scientist','scissors','scoff','scold','scoop','scoot','scope','scorch','score','scorer','scorn','scornful','scorpion','scotch','scoundrel','scour','scourge','scout','scowl','scraggy','scramble','scrap','scrapbook','scrape','scraper','scratch','scratchy','scrawl','scream','screech','screed','screen','screenplay','screw','scribble','script','scriptural','scripture','scroll','scrub','scrubby','scruff','scruffy','scruple','scrupulous','scrutinize','scrutiny','scud','scuffle','scull','scullery','sculptor','sculpture','scum','scupper','scurf','scurrilous','scurry','scuttle','sea','seaboard','seaborne','seafaring','seagull','seal','seam','seaman','seamanship','seamstress','seamy','seaport','sear','search','seashore','seasick','seaside','season','seasonable','seasonal','seat','seaworthy','secede','seclude','seclusion','second','secondary','secondhand','secondly','secrecy','secret','secretary','secrete','secretion','secretive','sect','sectarian','section','sectional','sector','secular','secure','security','sedan','sedate','sedative','sedentary','sediment','sedition','seduce','seduction','seductive','sedulous','see','seed','seedless','seedling','seedsman','seedy','seek','seem','seemly','seesaw','seethe','segment','segregate','seismic','seize','seldom','select','selection','selective','selector','self','selfish','selfless','selfsame','sell','seller','semaphore','semblance','semen','semester','semicircle','semicolon','semifinal','seminal','seminary','senate','senator','send','sender','senile','senility','senior','seniority','sensation','sense','senseless','sensible','sensitive','sensitize','sensor','sensory','sensual','sensuous','sentence','sentient','sentiment','sentinel','sentry','separable','separate','separation','sepulchre','sequel','sequence','sequester','sequin','serenade','serene','serfdom','sergeant','serial','series','serious','sermon','serpent','serpentine','serum','servant','serve','service','serviceman','serviette','servitude','session','set','setback','settle','settlement','settler','seven','seventeen','seventh','seventieth','seventy','sever','several','severally','severe','sew','sewage','sex','sexism','sextant','sexual','sexy','shabby','shackle','shade','shadow','shady','shaft','shaggy','shake','shaky','shall','shallow','sham','shamble','shambles','shame','shamefaced','shameful','shameless','shampoo','shank','shape','shapely','share','shark','sharp','sharpen','sharper','shatter','shave','shaver','shawl','she','sheaf','shear','sheath','sheathe','shed','sheen','sheep','sheepdog','sheepish','sheer','sheet','shelf','shell','shelter','shelve','shepherd','sheriff','sherry','shield','shift','shiftless','shifty','shimmer','shin','shine','shingle','ship','shipment','shipper','shipwreck','shire','shirk','shirt','shit','shiver','shock','shoddy','shoe','shoehorn','shoelace','shoemaker','shoestring','shoot','shooting','shop','shopkeeper','shoplifter','shore','short','shortage','shortcut','shorten','shorthand','shortly','shorts','shortwave','shotgun','shoulder','shout','shove','shovel','show','showcase','showdown','shower','showroom','showy','shrapnel','shred','shrewd','shriek','shrill','shrimp','shrine','shrink','shrinkage','shrivel','shroud','shrub','shrubbery','shrug','shudder','shuffle','shun','shunt','shut','shutter','shuttle','shy','sick','sicken','sickle','sickly','sickness','side','sideboard','sidecar','sidelight','sideline','sideshow','sidetrack','sidewalk','sideways','sidle','siege','sift','sigh','sight','sightless','sign','signal','signalize','signaller','signatory','signature','signify','signpost','silage','silence','silencer','silent','silhouette','silicon','silk','silken','silkworm','silky','sill','silly','silo','silver','silvery','similar','similarity','simmer','simple','simpleton','simplicity','simplify','simply','simulate','sin','since','sincere','sincerity','sinew','sinful','sing','singe','singer','single','singlet','singsong','singular','sinister','sink','sinker','sinless','sinuous','sip','siphon','sir','siren','sister','sisterly','sit','site','situated','situation','six','sixteen','sixteenth','sixth','sixtieth','sixty','sizable','size','sizzle','skate','skateboard','skein','skeleton','skeptical','sketch','sketchy','skewer','ski','skid','skilful','skill','skilled','skim','skimp','skin','skinflint','skinny','skip','skipper','skirmish','skirt','skit','skittish','skulk','skull','skullcap','skunk','sky','skylark','skylight','skyline','skyscraper','slab','slack','slacken','slake','slam','slander','slanderous','slang','slangy','slant','slap','slapdash','slash','slate','slattern','slaty','slaughter','slave','slaver','slavery','slavish','slay','sled','sledge','sleek','sleep','sleeper','sleepless','sleepy','sleet','sleeve','sleigh','slender','sleuth','slew','slice','slick','slide','sliding','slight','slim','slime','slimy','sling','slink','slip','slipknot','slipper','slippery','slipshod','slipway','slit','slither','slobber','slogan','slop','slope','sloppy','slops','slosh','slot','sloth','slough','slow','slowcoach','sluggard','sluggish','sluice','slum','slumber','slump','slur','slush','slut','sly','smack','small','smart','smarten','smash','smattering','smear','smell','smile','smirch','smirk','smite','smith','smithy','smock','smog','smoke','smoker','smokestack','smoky','smooth','smother','smudge','smug','smuggle','smut','snack','snag','snail','snake','snaky','snap','snappy','snapshot','snare','snarl','snatch','sneak','sneer','sneeze','sniff','snigger','snip','snipe','snippet','snob','snobbish','snooker','snoop','snooper','snooze','snore','snorkel','snort','snout','snow','snowball','snowbound','snowdrift','snowdrop','snowflake','snowshoe','snowstorm','snowy','snub','snuff','snuffle','snug','snuggle','so','soak','soap','soapy','soar','sob','sober','sobriety','soccer','sociable','social','socialism','socialist','socialite','socialize','society','sociology','sock','socket','sod','soda','sofa','soft','softball','soften','softness','software','soggy','soil','sojourn','solace','solar','solarium','solder','soldier','sole','solecism','solemn','solemnity','solemnize','solicit','solicitor','solicitous','solicitude','solid','solidarity','solidify','solidity','soliloquy','solitary','solitude','solo','soloist','solstice','soluble','solution','solve','solvent','sombre','some','somebody','someday','somehow','someone','somersault','something','sometime','sometimes','somewhat','somewhere','somnolent','son','sonar','sonata','song','sonic','sonorous','soon','soot','soothe','sop','sophism','sophist','sophistry','soporific','soprano','sorcerer','sorcery','sordid','sore','sorrow','sorrowful','sorry','sort','sorter','sortie','soul','sound','soundtrack','soup','sour','source','south','southeast','southerly','southern','southward','southwards','southwest','souvenir','sovereign','sow','soya','spa','space','spacecraft','spaceship','spacious','spade','spangle','spank','spanner','spar','spare','sparerib','spark','sparkle','sparrow','sparse','spartan','spasm','spasmodic','spate','spatial','spatter','speak','speaker','speaking','spear','spearhead','special','specialist','speciality','specialize','specially','specialty','specie','species','specific','specify','specimen','specious','speck','speckle','specs','spectacle','spectator','spectral','spectre','spectrum','speculate','speech','speechless','speed','speedway','speedy','spell','spellbound','spend','sperm','spew','sphere','spherical','spheroid','spice','spider','spike','spill','spin','spinach','spinal','spindle','spindly','spine','spineless','spinning','spiral','spire','spirit','spiritless','spiritual','spirituous','spit','spite','spiteful','spittle','spittoon','splash','splay','spleen','splendid','splendour','splice','splint','splinter','split','splutter','spoil','spoilsport','spoke','spokesman','sponge','sponger','spongy','sponsor','spoof','spook','spool','spoon','spoonful','spoor','sporadic','sport','sportive','sportsman','spot','spotless','spotlight','spotter','spouse','spout','sprain','sprat','sprawl','spray','spread','spree','sprig','sprightly','spring','springtide','springtime','springy','sprinkle','sprinkler','sprint','sprite','sprout','spruce','spry','spud','spume','spur','spurious','spurn','spurt','spy','squabble','squad','squadron','squalid','squall','squalor','squander','square','squash','squat','squawk','squeak','squeal','squeamish','squeeze','squelch','squib','squint','squirm','squirrel','squirt','stab','stability','stabilize','stable','stack','stadium','staff','stag','stage'];
      var word12 = ['stagger','stagnant','stagnate','stain','stainless','stair','staircase','stairway','stake','stalactite','stalagmite','stale','stalemate','stalk','stall','stalwart','stamina','stammer','stamp','stampede','stanch','stanchion','stand','standard','standpoint','standstill','stank','staple','star','starboard','starch','starchy','stare','starfish','stark','starling','start','starter','startle','startup','starvation','starve','state','stateless','stately','statement','statesman','static','statical','station','stationary','stationer','stationery','statistic','statistics','statue','statuesque','statuette','stature','status','statute','statutory','staunch','stave','stay','stead','steadfast','steadily','steady','steak','steal','stealth','steam','steamer','steamship','steamy','steel','steely','steep','steeple','steer','steerage','steersman','stele','stellar','stem','stench','stencil','stentorian','step','stepfather','stepmother','steppe','stepsister','stereo','stereotype','sterile','sterilize','sterling','stern','stet','stevedore','stew','steward','stewardess','stick','sticker','sticky','stiff','stiffen','stifle','stigma','stigmatize','stiletto','still','stillness','stilt','stimulant','stimulate','stimulus','sting','stingy','stink','stint','stipulate','stir','stitch','stock','stockade','stockpile','stocky','stodgy','stoke','stoker','stole','stolid','stomach','stone','stonemason','stoneware','stony','stool','stoop','stop','stopcock','stopgap','stoppage','stopper','stopwatch','storage','store','storey','storm','stormy','story','stout','stow','stowaway','straddle','straggle','straight','straighten','strain','strait','straiten','strand','strange','stranger','strangle','strap','stratagem','strategic','strategist','strategy','stratum','straw','strawberry','stray','streak','streaky','stream','streamer','streamline','street','strength','strengthen','strenuous','stress','stretch','stretcher','strew','strict','stricture','stride','strife','strike','striker','string','stringent','stringy','strip','stripe','stripling','strive','stroke','stroll','strong','stronghold','structural','structure','struggle','strum','strut','stub','stubble','stubborn','stubby','stucco','stud','student','studio','studious','study','stuff','stuffy','stultify','stumble','stump','stumpy','stun','stunt','stuntman','stupefy','stupendous','stupid','stupor','sturdy','stutter','style','stylish','stylistic','stylus','suave','sub','subdivide','subdue','subheading','subject','subjection','subjective','subjugate','sublet','sublime','submarine','submerge','submission','submissive','submit','subscribe','subscriber','subsequent','subside','subsidiary','subsidize','subsidy','subsist','substance','substitute','subtitle','subtle','subtract','suburb','suburban','subversive','subvert','subway','succeed','success','successful','succession','successive','successor','succour','succumb','such','suck','sucker','suckle','suction','sudden','sue','suffer','sufferance','suffice','sufficient','suffix','suffocate','suffrage','suffuse','sugar','sugarcane','suggest','suggestion','suggestive','suicide','suit','suitable','suitcase','suite','suitor','sulk','sulky','sullen','sully','sultry','sum','summarize','summary','summat','summer','summit','summon','summons','sumptuous','sun','sunburn','sundae','sundial','sundown','sundry','sunflower','sunlight','sunny','sunrise','sunset','sunshade','sunshine','sunstroke','sup','super','superb','superfine','superhuman','superior','superpower','supersede','supersonic','superstar','supervene','supervise','supine','supper','supplant','supple','supplement','supplicant','supplicate','supply','support','supporter','suppose','suppress','suppurate','supreme','surcharge','sure','surety','surf','surface','surfboard','surfeit','surge','surgeon','surgery','surgical','surly','surmise','surmount','surname','surpass','surplus','surprise','surrender','surround','surtax','survey','surveyor','survival','survive','survivor','suspect','suspend','suspender','suspense','suspension','suspicion','suspicious','sustain','sustenance','suture','svelte','swab','swag','swagger','swallow','swamp','swan','swank','swap','swarm','swathe','sway','swear','swearword','sweat','sweater','sweep','sweeper','sweet','sweeten','sweetheart','swell','swelter','swerve','swift','swill','swim','swimmingly','swindle','swing','swipe','swirl','switch','switchback','swivel','swoon','swoop','swop','sword','swordfish','swot','sycophant','syllable','syllabus','sylvan','symbol','symbolic','symbolize','symmetry','sympathize','sympathy','symphonic','symphony','symposium','symptom','synonym','synopsis','syntax','synthesis','synthesize','synthetic','syringe','syrup','system','systematic','tab','table','tablecloth','tableland','tablespoon','tablet','taboo','tabular','tabulate','tacit','tack','tackle','tact','tactical','tactician','tactics','tactile','taffeta','tag','tail','tailor','taint','take','takeaway','takeoff','taker','takings','tale','talent','talesman','talk','talkative','tall','tally','tame','tan','tangent','tangerine','tangible','tangle','tango','tank','tankard','tanker','tanner','tannery','tantalize','tantamount','tantrum','tap','tape','taper','tapestry','tapioca','tar','tardy','target','tariff','tarmac','tarnish','tarpaulin','tarry','tartan','task','taste','tasteful','tasteless','tasty','tatter','tattle','tattoo','taunt','taut','tautology','tavern','tawdry','tawny','tax','taxable','taxation','taxi','taximeter','taxpayer','tea','teabag','teach','teacher','teacup','team','teapot','tear','tearful','tearoom','tease','teaser','teaset','teaspoon','teat','technical','technician','technique','technology','tedious','tedium','teem','teenage','teenager','teens','teethe','telecast','telegram','telegraph','telegraphy','telemetry','telepathy','telephone','telephoto','telescope','telescopic','televise','television','telex','tell','teller','telltale','telly','temerity','temper','temperance','temperate','tempest','temple','tempo','temporal','temporary','temporize','tempt','temptation','ten','tenable','tenacious','tenancy','tenant','tend','tendency','tender','tendon','tendril','tenement','tenet','tennis','tenor','tenpin','tense','tensile','tension','tent','tentacle','tentative','tenth','tenuous','tenure','tepid','term','terminal','terminate','terminus','termite','terms','terra','terrace','terrain','terrible','terrific','terrify','territory','terrorism','terrorist','terse','terylene','test','testament','testate','testator','testify','testimony','testy','tetanus','tether','text','textbook','textile','texture','than','thank','thankful','thankless','that','thatch','thaw','the','theatre','theatrical','theft','their','theirs','theism','them','theme','themselves','then','thence','theologian','theology','theorem','theorist','theorize','theory','therapy','there','thereafter','thereby','therefore','thereof','thereupon','thesaurus','these','thesis','they','thick','thicken','thicket','thickness','thickset','thief','thieve','thigh','thimble','thimbleful','thin','thing','think','thinker','third','thirdly','thirst','thirsty','thirteen','thirteenth','thirtieth','thirty','this','thong','thorax','thorn','thorny','thorough','those','though','thoughtful','thousand','thousandth','thrash','thread','threadbare','threat','threaten','three','thresh','threshold','thrice','thrift','thrifty','thrill','thriller','thrive','throat','throaty','throb','throes','throne','throng','throttle','through','throughout','throughput','throw','thrum','thrush','thrust','thud','thug','thumb','thump','thunder','thunderous','thus','thwart','thyroid','tibia','tick','ticker','tickertape','ticket','tickle','ticklish','tidal','tide','tidings','tidy','tie','tier','tiff','tiger','tigerish','tight','tighten','tights','tigress','tile','till','tilt','timber','time','timeless','timely','timer','timetable','timework','timezone','timid','timorous','tin','tincture','tinfoil','tinge','tingle','tinker','tinkle','tinplate','tinsel','tiny','tip','tipple','tiptoe','tirade','tire','tireless','tiresome','tiro','tissue','tit','titan','titanic','titbit','title','titter','titular','to','toady','toast','tobacco','today','toe','toffee','together','toil','toilet','toiletries','toils','token','tolerable','tolerance','tolerant','tolerate','toleration','toll','tollgate','tomato','tomb','tomboy','tombstone','tome','tomfool','tomfoolery','tomorrow','ton','tonal','tonality','tone','tongs','tongue','tonic','tonight','tonne','too','tool','tooth','toothache','toothbrush','toothless','toothpaste','toothpick','toothsome','top','topcoat','topic','topical','topless','topmost','topography','topple','topsoil','torch','torment','tornado','torpedo','torpid','torpor','torque','torrent','torrid','torsion','torso','tortoise','tortuous','torture','toss','tot','total','totality','totter','touch','touchstone','touchy','tough','toughen','tour','tourism','tourist','tournament','tousle','tout','tow','towards','towel','tower','towering','town','toxic','toxin','toy','trace','track','trackless','tract','tractable','traction','tractor','trade','trademark','trader','tradesman','tradition','traduce','traffic','tragedian','tragedy','tragic','trail','trailer','train','trainee','trainer','trait','traitor','trajectory','tram','trammel','tramp','trample','trampoline','tramway','trance','tranquil','trans','transact','transcend','transcribe','transcript','transfer','transfix','transform','transfuse','transgress','transient','transistor','transit','transition','transitive','transitory','translate','transmit','transpire','transplant','transport','transpose','transship','transverse','trap','trapdoor','trapeze','trapezoid','trapper','trappings','trash','trashy','trauma','travel','traveller','traverse','travesty','trawl','trawler','tray','treachery','tread','treadle','treason','treasure','treasurer','treasury','treat','treatise','treatment','treaty','treble','tree','trek','trellis','tremble','tremendous','tremor','tremulous','trench','trenchant','trend','trespass','tress','trestle','trial','triangle','triangular','tribe','tribesman','tribunal','tribune','tributary','tribute'];
      var word13 = ['trice','trick','trickery','trickle','trickster','tricky','tricycle','trident','triennial','trifle','trigger','trilateral','trilingual','trill','trillion','trilogy','trim','trimming','trinity','trinket','trio','trip','tripartite','tripe','triple','triplet','triplicate','tripod','tripper','trisect','trite','triumph','triumphal','triumphant','trivial','trolley','trolleybus','troop','trooper','trophy','tropic','tropical','trot','trouble','trough','trounce','troupe','trousers','trousseau','trout','trowel','truant','truce','truck','truckle','truculent','trudge','true','truism','trump','trumpery','trumpet','truncate','truncheon','trundle','trunk','truss','trust','trustee','trustful','trusty','truth','truthful','try','tub','tubby','tube','tubular','tuck','tuft','tug','tuition','tulip','tumble','tumbledown','tumbler','tummy','tumour','tumult','tumultuous','tuna','tune','tuneful','tunic','tunnel','turban','turbid','turbine','turbojet','turboprop','turbulent','turf','turkey','turmoil','turn','turncoat','turner','turning','turnip','turnout','turnover','turnstile','turntable','turpentine','turpitude','turret','turtle','tusk','tussle','tutor','tutorial','tutu','twaddle','twang','tweak','tweeter','tweezers','twelfth','twelve','twentieth','twenty','twice','twiddle','twig','twilight','twill','twin','twine','twinge','twinkle','twirl','twist','twister','twit','twitch','twitter','two','twofold','twosome','tycoon','type','typesetter','typewriter','typhoon','typical','typify','typist','typo','typography','tyrannical','tyrannize','tyranny','tyrant','tyre','tyro','ubiquitous','udder','ufo','ugly','ulcer','ulcerate','ulterior','ultimate','ultimatum','ultrasonic','umbra','umbrage','umbrella','umpire','unabated','unable','unaffected','unassuming','unattended','unaware','unawares','unbearable','unbend','unblushing','unbolt','unborn','unbosom','unbroken','unburden','uncanny','uncertain','uncle','uncommon','unconcern','uncouple','uncouth','uncover','unction','unctuous','uncut','undecided','undeniable','under','undercover','undercut','underdog','underdone','underfoot','undergo','underhand','underlie','underline','underling','undermine','underneath','underpass','underpin','underrate','underscore','undersell','understand','understate','understudy','undertake','undertone','underwear','underworld','underwrite','undies','undivided','undo','undoubted','undress','undue','undulate','undulation','undying','unearth','unearthly','uneasy','uneconomic','uneducated','unemployed','unequal','unerring','uneven','unexpected','unfailing','unfair','unfaithful','unfeeling','unfit','unfold','unfounded','ungainly','ungodly','ungracious','ungrateful','unhappy','unhealthy','unheard','unhinge','uniform','unify','unilateral','uninformed','union','unionist','unique','unison','unit','unity','universal','universe','university','unjust','unkempt','unkind','unknowing','unknown','unlawful','unless','unlettered','unlike','unlikely','unlimited','unload','unlock','unloose','unmask','unmatched','unmoved','unnatural','unnerve','unnumbered','unofficial','unorthodox','unpack','unplaced','unpleasant','unprovoked','unravel','unreadable','unreal','unreserved','unrest','unrivalled','unroll','unruly','unsavoury','unscathed','unscramble','unscrew','unseat','unseemly','unsettle','unsociable','unsound','unsparing','unstable','unstop','unsubdued','unsuitable','unswerving','untapped','untie','until','untimely','untold','untoward','untruth','unused','unusual','unveil','unversed','unwieldy','unwilling','unwind','unwitting','unworthy','unzip','up','upbraid','upbringing','update','upend','upgrade','upheaval','uphill','uphold','upholster','upholstery','upkeep','uplift','upon','upper','upright','uproar','uproarious','uproot','upset','upshot','upside','upstage','upstairs','upstanding','upstart','upstream','uptake','upturn','upward','upwards','urban','urbane','urchin','urge','urgency','urgent','urinary','urinate','urine','urn','us','usage','use','useful','usefulness','useless','user','usher','usual','usurer','usurp','usury','utensil','utility','utilize','utmost','utter','vacancy','vacant','vacate','vacation','vacillate','vacuous','vacuum','vagabond','vagary','vagrant','vague','vain','vainglory','valet','valiant','valid','validate','validity','valise','valley','valour','valuable','valuation','value','valve','vampire','van','vandal','vane','vanguard','vanish','vanity','vanquish','vapid','vapor','vaporize','vapour','variable','variance','variant','variation','variety','various','varnish','varsity','vary','vascular','vase','vaseline','vassalage','vast','vat','vaudeville','vault','vaunt','veal','vector','veer','vegetable','vegetarian','vegetate','vegetation','vehement','vehicle','vehicular','veil','vein','vellum','velocity','velour','velvet','venal','vend','vendetta','vendor','venerable','venerate','venereal','vengeance','vengeful','venial','venom','venomous','vent','ventilate','ventilator','ventral','ventricle','venture','venue','veracious','veranda','verb','verbal','verbatim','verbose','verdant','verdict','verge','verifiable','verity','vermin','verminous','vernacular','vernal','versatile','verse','version','versus','vertebrate','vertical','vertigo','verve','very','vessel','vest','vestibule','vestige','vestment','vet','veteran','veterinary','veto','vex','vexation','vexatious','via','viable','viaduct','vibrant','vibrate','vibration','vicarious','vice','viceroy','vicinity','vicious','victim','victimize','victorious','victory','victualler','vide','video','videotape','vie','view','viewfinder','viewpoint','vigil','vigilance','vigilant','vigorous','vigour','vile','vilify','villa','village','villain','villainous','vim','vindicate','vine','vinegar','vineyard','vino','vintage','viola','violate','violence','violent','violet','violin','violinist','viper','viral','virgin','virginal','virile','virology','virtual','virtue','virtuoso','virtuous','virulent','virus','visa','visage','visibility','visible','vision','visionary','visit','visitor','visor','vista','visual','visualize','vital','vitality','vitalize','vitamin','vitiate','vivacious','vivid','vocabulary','vocal','vocalist','vocation','vocational','vociferate','vodka','vogue','voice','void','volatile','volcanic','volcano','volition','volley','volleyball','volt','voltage','voluble','volume','voluminous','voluntary','volunteer','voluptuous','vomit','voracious','vortex','vote','voter','vouch','voucher','vouchsafe','vow','vowel','vox','voyage','vulcanize','vulgar','vulgarity','vulnerable','vulture','wad','waddle','wade','wader','waffle','waft','wag','wage','wager','waggle','waggon','waif','wail','waist','waistband','waistcoat','wait','waiter','waitress','waive','wake','wakeful','waken','walk','walkman','wall','wallaby','wallet','wallflower','wallop','wallow','wallpaper','walnut','waltz','wan','wand','wander','wane','wangle','want','war','warble','ward','warden','wardrobe','ware','warehouse','warfare','warlike','warm','warmonger','warmth','warn','warp','warpath','warrant','warranty','warrior','warship','wary','wash','washer','washout','washroom','washstand','wasp','waspish','wastage','waste','wasteful','wastepipe','wastrel','watch','watchful','watchman','watchword','water','watered','waterfall','waterfront','waterline','waterloo','watermark','watermelon','waterproof','waters','watershed','waterspout','watertight','waterworks','watery','watt','wattle','wave','waveband','wavelength','waver','wavy','wax','waxen','waxwork','way','waylay','wayside','wayward','we','weak','weaken','weakling','weakly','weakness','weal','wealth','wealthy','wean','weapon','wear','wearisome','weary','weasel','weather','weave','weaver','web','webbed','webbing','wed','wedding','wedge','wedlock','weed','weedy','week','weekday','weekend','weekly','weep','weeping','weft','weigh','weight','weighty','weir','weird','welcome','weld','welder','welfare','well','wellbeing','wellborn','welt','welter','wend','west','westerly','western','westward','westwards','wet','wetting','whack','whale','whaler','wharf','what','whatever','whatsoever','wheat','wheedle','wheel','wheelchair','wheeze','when','whence','whenever','where','whereas','whereby','wherefore','whereupon','wherever','whet','whether','which','whichever','whiff','while','whilst','whim','whimper','whimsical','whimsy','whine','whinny','whip','whirl','whirlpool','whirlwind','whisk','whisker','whisky','whisper','whistle','whit','white','whiten','whitewash','whither','whiting','whittle','who','whoever','whole','wholesale','wholesome','wholly','whom','whoop','whooping','whopper','whose','why','wicked','wicker','wickerwork','wicket','wide','widen','widespread','widow','widowed','widower','width','wield','wife','wig','wiggle','wild','wildcards','wildcat','wilderness','wile','wilful','will','willing','willow','willowy','wilt','wily','win','wince','winch','wind','windfall','windlass','windmill','window','windpipe','windscreen','windward','windy','wine','wing','wingspread','wink','winner','winnings','winsome','winter','wintertime','wintry','wipe','wiper','wire','wireless','wiry','wisdom','wise','wish','wishful','wisp','wistful','wit','witch','witchcraft','witchery','with','withdraw','withdrawal','wither','withhold','within','without','withstand','witness','witticism','wittingly','witty','wizard','wobble','wold','wolf','woman','womanhood','womanish','womanly','womb','wonder','wonderful','wonderment','wondrous','woo','wood','woodcut','wooden','woodland','woodman','woodpecker','woodwork','woody','wool','woolen','woolly','woozy','word','wordy','work','workable','workaday','workbook','workday','worker','workman','workshop','world','worldly','worldwide','worm','worry','worse','worship','worth','worthless','worthwhile','worthy','wrangle','wrap','wrapper','wrath','wreak','wreath','wreathe','wreck','wreckage','wrecker','wrench','wrest','wrestle','wrestler','wretch','wretched','wriggle','wring','wringer','wrinkle','wrist','wristlet','write','writer','writhe','wrong','wrongful','wry'];
      var word14 = ['xerography','xerox','yacht','yak','yam','yank','yap','yard','yarn','yawn','yeah','year','yearbook','yearly','yearn','yeast','yell','yellow','yelp','yen','yeoman','yes','yesterday','yet','yield','yoke','yonder','yore','you','young','youngish','youngster','your','yours','yourself','youth','youthful','yule','zany','zap','zeal','zealot','zealous','zebra','zenith','zephyr','zero','zest','zigzag','zillion','zinc','zip','zombie','zonal','zone','zoo','zoological','zoologist','zoology','zoom','read'];
      var interval = 80;

      setTimeout(function () {
        putWordInBST(dictionary, word1);
      }, interval);
      setTimeout(function () {
        putWordInBST(dictionary, word2);
      }, interval * 2);
      setTimeout(function () {
        putWordInBST(dictionary, word3);
      }, interval * 3);
      setTimeout(function () {
        putWordInBST(dictionary, word4);
      }, interval * 4);
      setTimeout(function () {
        putWordInBST(dictionary, word5);
      }, interval * 5);
      setTimeout(function () {
        putWordInBST(dictionary, word6);
      }, interval * 6);
      setTimeout(function () {
        putWordInBST(dictionary, word7);
      }, interval * 7);
      setTimeout(function () {
        putWordInBST(dictionary, word8);
      }, interval * 8);
      setTimeout(function () {
        putWordInBST(dictionary, word9);
      }, interval * 9);
      setTimeout(function () {
        putWordInBST(dictionary, word10);
      }, interval * 10);
      setTimeout(function () {
        putWordInBST(dictionary, word11);
      }, interval * 11);
      setTimeout(function () {
        putWordInBST(dictionary, word12);
      }, interval * 12);
      setTimeout(function () {
        putWordInBST(dictionary, word13);
      }, interval * 13);
      setTimeout(function () {
        putWordInBST(dictionary, word14);
      }, interval * 14);
    }

    function putWordInBST (dictionary, arr) {
      var word = null;
      for (var i = arr.length - 1; i >= 0; i--) {
        word = arr[i];
        dictionary.put(word,word);
      }
    }

    function addClass(dom, name) {
      if (containClass(dom, name)) {
        return;
      }
      if (dom.classList) {
        dom.classList.add(name);
      } else {
        var arr = dom.getAttribute('class').split(' ');
        arr.push(name);
        dom.setAttribute('class', arr.join(' '));
      }
    }

    function removeClass(dom, name) {
      if (!containClass(dom, name)) {
        return;
      }
      if (dom.classList) {
        dom.classList.remove(name);
      } else {
        var arr = dom.getAttribute('class').split(' ');
        var index = arr.indexOf(name);
        arr.splice(index, index);
        dom.setAttribute('class', arr.join(' '));
      }
    }

    function containClass(dom, name) {
      if (dom.classList) {
        return dom.classList.contains(name);
      } else {
        var arr = dom.getAttribute('class').split(' ');
        return arr.indexOf(name) >= 0;
      }
    }
})();

/***/ })
/******/ ]);