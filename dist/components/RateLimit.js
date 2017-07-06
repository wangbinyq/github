'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * RateLimit allows users to query their rate-limit status
 */
var RateLimit = function (_Requestable) {
  _inherits(RateLimit, _Requestable);

  /**
   * construct a RateLimit
   * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
   * @param {string} [apiBase] - the base Github API URL
   * @return {Promise} - the promise for the http request
   */
  function RateLimit(auth, apiBase) {
    _classCallCheck(this, RateLimit);

    return _possibleConstructorReturn(this, (RateLimit.__proto__ || Object.getPrototypeOf(RateLimit)).call(this, auth, apiBase));
  }

  /**
   * Query the current rate limit
   * @see https://developer.github.com/v3/rate_limit/
   * @param {Requestable.callback} [cb] - will receive the rate-limit data
   * @return {Promise} - the promise for the http request
   */


  _createClass(RateLimit, [{
    key: 'getRateLimit',
    value: function getRateLimit(cb) {
      return this._request('GET', '/rate_limit', null, cb);
    }
  }]);

  return RateLimit;
}(_Requestable3.default);

module.exports = RateLimit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJhdGVMaW1pdC5qcyJdLCJuYW1lcyI6WyJSYXRlTGltaXQiLCJhdXRoIiwiYXBpQmFzZSIsImNiIiwiX3JlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7Ozs7Ozs7K2VBUEE7Ozs7Ozs7QUFTQTs7O0lBR01BLFM7OztBQUNIOzs7Ozs7QUFNQSxxQkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkI7QUFBQTs7QUFBQSxpSEFDbEJELElBRGtCLEVBQ1pDLE9BRFk7QUFFMUI7O0FBRUQ7Ozs7Ozs7Ozs7aUNBTWFDLEUsRUFBSTtBQUNkLGFBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsRUFBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMENELEVBQTFDLENBQVA7QUFDRjs7Ozs7O0FBR0pFLE9BQU9DLE9BQVAsR0FBaUJOLFNBQWpCIiwiZmlsZSI6IlJhdGVMaW1pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcblxyXG4vKipcclxuICogUmF0ZUxpbWl0IGFsbG93cyB1c2VycyB0byBxdWVyeSB0aGVpciByYXRlLWxpbWl0IHN0YXR1c1xyXG4gKi9cclxuY2xhc3MgUmF0ZUxpbWl0IGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogY29uc3RydWN0IGEgUmF0ZUxpbWl0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gYXV0aCAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0SHViXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjb25zdHJ1Y3RvcihhdXRoLCBhcGlCYXNlKSB7XHJcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUXVlcnkgdGhlIGN1cnJlbnQgcmF0ZSBsaW1pdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmF0ZV9saW1pdC9cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmF0ZS1saW1pdCBkYXRhXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldFJhdGVMaW1pdChjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgJy9yYXRlX2xpbWl0JywgbnVsbCwgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmF0ZUxpbWl0O1xyXG4iXX0=
//# sourceMappingURL=RateLimit.js.map
