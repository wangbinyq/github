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
 * Renders html from Markdown text
 */
var Markdown = function (_Requestable) {
  _inherits(Markdown, _Requestable);

  /**
   * construct a Markdown
   * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
   * @param {string} [apiBase] - the base Github API URL
   * @return {Promise} - the promise for the http request
   */
  function Markdown(auth, apiBase) {
    _classCallCheck(this, Markdown);

    return _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, auth, apiBase));
  }

  /**
   * Render html from Markdown text.
   * @see https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
   * @param {Object} options - conversion options
   * @param {string} [options.text] - the markdown text to convert
   * @param {string} [options.mode=markdown] - can be either `markdown` or `gfm`
   * @param {string} [options.context] - repository name if mode is gfm
   * @param {Requestable.callback} [cb] - will receive the converted html
   * @return {Promise} - the promise for the http request
   */


  _createClass(Markdown, [{
    key: 'render',
    value: function render(options, cb) {
      return this._request('POST', '/markdown', options, cb);
    }
  }]);

  return Markdown;
}(_Requestable3.default);

module.exports = Markdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hcmtkb3duLmpzIl0sIm5hbWVzIjpbIk1hcmtkb3duIiwiYXV0aCIsImFwaUJhc2UiLCJvcHRpb25zIiwiY2IiLCJfcmVxdWVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFPQTs7Ozs7Ozs7OzsrZUFQQTs7Ozs7OztBQVNBOzs7SUFHTUEsUTs7O0FBQ0g7Ozs7OztBQU1BLG9CQUFZQyxJQUFaLEVBQWtCQyxPQUFsQixFQUEyQjtBQUFBOztBQUFBLCtHQUNsQkQsSUFEa0IsRUFDWkMsT0FEWTtBQUUxQjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7MkJBVU9DLE8sRUFBU0MsRSxFQUFJO0FBQ2pCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsRUFBc0IsV0FBdEIsRUFBbUNGLE9BQW5DLEVBQTRDQyxFQUE1QyxDQUFQO0FBQ0Y7Ozs7OztBQUdKRSxPQUFPQyxPQUFQLEdBQWlCUCxRQUFqQiIsImZpbGUiOiJNYXJrZG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBodG1sIGZyb20gTWFya2Rvd24gdGV4dFxyXG4gKi9cclxuY2xhc3MgTWFya2Rvd24gZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBjb25zdHJ1Y3QgYSBNYXJrZG93blxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IGF1dGggLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdEh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2VdIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJlbmRlciBodG1sIGZyb20gTWFya2Rvd24gdGV4dC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL21hcmtkb3duLyNyZW5kZXItYW4tYXJiaXRyYXJ5LW1hcmtkb3duLWRvY3VtZW50XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29udmVyc2lvbiBvcHRpb25zXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50ZXh0XSAtIHRoZSBtYXJrZG93biB0ZXh0IHRvIGNvbnZlcnRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm1vZGU9bWFya2Rvd25dIC0gY2FuIGJlIGVpdGhlciBgbWFya2Rvd25gIG9yIGBnZm1gXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jb250ZXh0XSAtIHJlcG9zaXRvcnkgbmFtZSBpZiBtb2RlIGlzIGdmbVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb252ZXJ0ZWQgaHRtbFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICByZW5kZXIob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCAnL21hcmtkb3duJywgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWFya2Rvd247XHJcbiJdfQ==
//# sourceMappingURL=Markdown.js.map
