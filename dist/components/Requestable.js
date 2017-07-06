'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsBase = require('js-base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:request');

/**
 * The error structure returned when a network call fails
 */

var ResponseError = function (_Error) {
   _inherits(ResponseError, _Error);

   /**
    * Construct a new ResponseError
    * @param {string} message - an message to return instead of the the default error message
    * @param {string} path - the requested path
    * @param {Object} response - the object returned by Axios
    */
   function ResponseError(message, path, response) {
      _classCallCheck(this, ResponseError);

      var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, message));

      _this.path = path;
      _this.request = response.config;
      _this.response = (response || {}).response || response;
      _this.status = response.status;
      return _this;
   }

   return ResponseError;
}(Error);

/**
 * Requestable wraps the logic for making http requests to the API
 */


var Requestable = function () {
   /**
    * Either a username and password or an oauth token for Github
    * @typedef {Object} Requestable.auth
    * @prop {string} [username] - the Github username
    * @prop {string} [password] - the user's password
    * @prop {token} [token] - an OAuth token
    */
   /**
    * Initialize the http internals.
    * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
    *                                  not provided request will be made unauthenticated
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    * @param {string} [AcceptHeader=v3] - the accept header for the requests
    */
   function Requestable(auth, apiBase, AcceptHeader) {
      _classCallCheck(this, Requestable);

      this.__apiBase = apiBase || 'https://api.github.com';
      this.__auth = {
         token: auth.token,
         username: auth.username,
         password: auth.password
      };
      this.__AcceptHeader = AcceptHeader || 'v3';

      if (auth.token) {
         this.__authorizationHeader = 'token ' + auth.token;
      } else if (auth.username && auth.password) {
         this.__authorizationHeader = 'Basic ' + _jsBase.Base64.encode(auth.username + ':' + auth.password);
      }
   }

   /**
    * Compute the URL to use to make a request.
    * @private
    * @param {string} path - either a URL relative to the API base or an absolute URL
    * @return {string} - the URL to use
    */


   _createClass(Requestable, [{
      key: '__getURL',
      value: function __getURL(path) {
         var url = path;

         if (path.indexOf('//') === -1) {
            url = this.__apiBase + path;
         }

         var newCacheBuster = 'timestamp=' + new Date().getTime();
         return url.replace(/(timestamp=\d+)/, newCacheBuster);
      }

      /**
       * Compute the headers required for an API request.
       * @private
       * @param {boolean} raw - if the request should be treated as JSON or as a raw request
       * @param {string} AcceptHeader - the accept header for the request
       * @return {Object} - the headers to use in the request
       */

   }, {
      key: '__getRequestHeaders',
      value: function __getRequestHeaders(raw, AcceptHeader) {
         var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/vnd.github.' + (AcceptHeader || this.__AcceptHeader)
         };

         if (raw) {
            headers.Accept += '.raw';
         }
         headers.Accept += '+json';

         if (this.__authorizationHeader) {
            headers.Authorization = this.__authorizationHeader;
         }

         return headers;
      }

      /**
       * Sets the default options for API requests
       * @protected
       * @param {Object} [requestOptions={}] - the current options for the request
       * @return {Object} - the options to pass to the request
       */

   }, {
      key: '_getOptionsWithDefaults',
      value: function _getOptionsWithDefaults() {
         var requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

         if (!(requestOptions.visibility || requestOptions.affiliation)) {
            requestOptions.type = requestOptions.type || 'all';
         }
         requestOptions.sort = requestOptions.sort || 'updated';
         requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

         return requestOptions;
      }

      /**
       * if a `Date` is passed to this function it will be converted to an ISO string
       * @param {*} date - the object to attempt to cooerce into an ISO date string
       * @return {string} - the ISO representation of `date` or whatever was passed in if it was not a date
       */

   }, {
      key: '_dateToISO',
      value: function _dateToISO(date) {
         if (date && date instanceof Date) {
            date = date.toISOString();
         }

         return date;
      }

      /**
       * A function that receives the result of the API request.
       * @callback Requestable.callback
       * @param {Requestable.Error} error - the error returned by the API or `null`
       * @param {(Object|true)} result - the data returned by the API or `true` if the API returns `204 No Content`
       * @param {Object} request - the raw {@linkcode https://github.com/mzabriskie/axios#response-schema Response}
       */
      /**
       * Make a request.
       * @param {string} method - the method for the request (GET, PUT, POST, DELETE)
       * @param {string} path - the path for the request
       * @param {*} [data] - the data to send to the server. For HTTP methods that don't have a body the data
       *                   will be sent as query parameters
       * @param {Requestable.callback} [cb] - the callback for the request
       * @param {boolean} [raw=false] - if the request should be sent as raw. If this is a falsy value then the
       *                              request will be made as JSON
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: '_request',
      value: function _request(method, path, data, cb, raw) {
         var url = this.__getURL(path);

         var AcceptHeader = (data || {}).AcceptHeader;
         if (AcceptHeader) {
            delete data.AcceptHeader;
         }
         var headers = this.__getRequestHeaders(raw, AcceptHeader);

         var queryParams = {};

         var shouldUseDataAsParams = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && methodHasNoBody(method);
         if (shouldUseDataAsParams) {
            queryParams = data;
            data = undefined;
         }

         var config = {
            url: url,
            method: method,
            headers: headers,
            params: queryParams,
            data: data,
            responseType: raw ? 'text' : 'json'
         };

         log(config.method + ' to ' + config.url);
         var requestPromise = (0, _axios2.default)(config).catch(callbackErrorOrThrow(cb, path));

         if (cb) {
            requestPromise.then(function (response) {
               if (response.data && Object.keys(response.data).length > 0) {
                  // When data has results
                  cb(null, response.data, response);
               } else if (config.method !== 'GET' && Object.keys(response.data).length < 1) {
                  // True when successful submit a request and receive a empty object
                  cb(null, response.status < 300, response);
               } else {
                  cb(null, response.data, response);
               }
            });
         }

         return requestPromise;
      }

      /**
       * Make a request to an endpoint the returns 204 when true and 404 when false
       * @param {string} path - the path to request
       * @param {Object} data - any query parameters for the request
       * @param {Requestable.callback} cb - the callback that will receive `true` or `false`
       * @param {method} [method=GET] - HTTP Method to use
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: '_request204or404',
      value: function _request204or404(path, data, cb) {
         var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';

         return this._request(method, path, data).then(function success(response) {
            if (cb) {
               cb(null, true, response);
            }
            return true;
         }, function failure(response) {
            if (response.response.status === 404) {
               if (cb) {
                  cb(null, false, response);
               }
               return false;
            }

            if (cb) {
               cb(response);
            }
            throw response;
         });
      }

      /**
       * Make a request and fetch all the available data. Github will paginate responses so for queries
       * that might span multiple pages this method is preferred to {@link Requestable#request}
       * @param {string} path - the path to request
       * @param {Object} options - the query parameters to include
       * @param {Requestable.callback} [cb] - the function to receive the data. The returned data will always be an array.
       * @param {Object[]} results - the partial results. This argument is intended for interal use only.
       * @return {Promise} - a promise which will resolve when all pages have been fetched
       * @deprecated This will be folded into {@link Requestable#_request} in the 2.0 release.
       */

   }, {
      key: '_requestAllPages',
      value: function _requestAllPages(path, options, cb, results) {
         var _this2 = this;

         results = results || [];

         return this._request('GET', path, options).then(function (response) {
            var _results;

            var thisGroup = void 0;
            if (response.data instanceof Array) {
               thisGroup = response.data;
            } else if (response.data.items instanceof Array) {
               thisGroup = response.data.items;
            } else {
               var message = 'cannot figure out how to append ' + response.data + ' to the result set';
               throw new ResponseError(message, path, response);
            }
            (_results = results).push.apply(_results, _toConsumableArray(thisGroup));

            var nextUrl = getNextPage(response.headers.link);
            if (nextUrl && typeof options.page !== 'number') {
               log('getting next page: ' + nextUrl);
               return _this2._requestAllPages(nextUrl, options, cb, results);
            }

            if (cb) {
               cb(null, results, response);
            }

            response.data = results;
            return response;
         }).catch(callbackErrorOrThrow(cb, path));
      }
   }]);

   return Requestable;
}();

module.exports = Requestable;

// ////////////////////////// //
//  Private helper functions  //
// ////////////////////////// //
var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
function methodHasNoBody(method) {
   return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
}

function getNextPage() {
   var linksHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

   var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
   return links.reduce(function (nextUrl, link) {
      if (link.search(/rel="next"/) !== -1) {
         return (link.match(/<(.*)>/) || [])[1];
      }

      return nextUrl;
   }, undefined);
}

function callbackErrorOrThrow(cb, path) {
   return function handler(object) {
      var error = void 0;
      if (object.hasOwnProperty('config')) {
         var _object$response = object.response,
             status = _object$response.status,
             statusText = _object$response.statusText,
             _object$config = object.config,
             method = _object$config.method,
             url = _object$config.url;

         var message = status + ' error making request ' + method + ' ' + url + ': "' + statusText + '"';
         error = new ResponseError(message, path, object);
         log(message + ' ' + JSON.stringify(object.data));
      } else {
         error = object;
      }
      if (cb) {
         log('going to error callback');
         cb(error);
      } else {
         log('throwing error');
         throw error;
      }
   };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RhYmxlLmpzIl0sIm5hbWVzIjpbImxvZyIsIlJlc3BvbnNlRXJyb3IiLCJtZXNzYWdlIiwicGF0aCIsInJlc3BvbnNlIiwicmVxdWVzdCIsImNvbmZpZyIsInN0YXR1cyIsIkVycm9yIiwiUmVxdWVzdGFibGUiLCJhdXRoIiwiYXBpQmFzZSIsIkFjY2VwdEhlYWRlciIsIl9fYXBpQmFzZSIsIl9fYXV0aCIsInRva2VuIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIl9fQWNjZXB0SGVhZGVyIiwiX19hdXRob3JpemF0aW9uSGVhZGVyIiwiZW5jb2RlIiwidXJsIiwiaW5kZXhPZiIsIm5ld0NhY2hlQnVzdGVyIiwiRGF0ZSIsImdldFRpbWUiLCJyZXBsYWNlIiwicmF3IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJyZXF1ZXN0T3B0aW9ucyIsInZpc2liaWxpdHkiLCJhZmZpbGlhdGlvbiIsInR5cGUiLCJzb3J0IiwicGVyX3BhZ2UiLCJkYXRlIiwidG9JU09TdHJpbmciLCJtZXRob2QiLCJkYXRhIiwiY2IiLCJfX2dldFVSTCIsIl9fZ2V0UmVxdWVzdEhlYWRlcnMiLCJxdWVyeVBhcmFtcyIsInNob3VsZFVzZURhdGFBc1BhcmFtcyIsIm1ldGhvZEhhc05vQm9keSIsInVuZGVmaW5lZCIsInBhcmFtcyIsInJlc3BvbnNlVHlwZSIsInJlcXVlc3RQcm9taXNlIiwiY2F0Y2giLCJjYWxsYmFja0Vycm9yT3JUaHJvdyIsInRoZW4iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiX3JlcXVlc3QiLCJzdWNjZXNzIiwiZmFpbHVyZSIsIm9wdGlvbnMiLCJyZXN1bHRzIiwidGhpc0dyb3VwIiwiQXJyYXkiLCJpdGVtcyIsInB1c2giLCJuZXh0VXJsIiwiZ2V0TmV4dFBhZ2UiLCJsaW5rIiwicGFnZSIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiTUVUSE9EU19XSVRIX05PX0JPRFkiLCJsaW5rc0hlYWRlciIsImxpbmtzIiwic3BsaXQiLCJyZWR1Y2UiLCJzZWFyY2giLCJtYXRjaCIsImhhbmRsZXIiLCJvYmplY3QiLCJlcnJvciIsImhhc093blByb3BlcnR5Iiwic3RhdHVzVGV4dCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9BOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7OztBQVdBLElBQU1BLE1BQU0scUJBQU0sZ0JBQU4sQ0FBWjs7QUFFQTs7OztJQUdNQyxhOzs7QUFDSDs7Ozs7O0FBTUEsMEJBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCQyxRQUEzQixFQUFxQztBQUFBOztBQUFBLGdJQUM1QkYsT0FENEI7O0FBRWxDLFlBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUtFLE9BQUwsR0FBZUQsU0FBU0UsTUFBeEI7QUFDQSxZQUFLRixRQUFMLEdBQWdCLENBQUNBLFlBQVksRUFBYixFQUFpQkEsUUFBakIsSUFBNkJBLFFBQTdDO0FBQ0EsWUFBS0csTUFBTCxHQUFjSCxTQUFTRyxNQUF2QjtBQUxrQztBQU1wQzs7O0VBYndCQyxLOztBQWdCNUI7Ozs7O0lBR01DLFc7QUFDSDs7Ozs7OztBQU9BOzs7Ozs7O0FBT0Esd0JBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCQyxZQUEzQixFQUF5QztBQUFBOztBQUN0QyxXQUFLQyxTQUFMLEdBQWlCRixXQUFXLHdCQUE1QjtBQUNBLFdBQUtHLE1BQUwsR0FBYztBQUNYQyxnQkFBT0wsS0FBS0ssS0FERDtBQUVYQyxtQkFBVU4sS0FBS00sUUFGSjtBQUdYQyxtQkFBVVAsS0FBS087QUFISixPQUFkO0FBS0EsV0FBS0MsY0FBTCxHQUFzQk4sZ0JBQWdCLElBQXRDOztBQUVBLFVBQUlGLEtBQUtLLEtBQVQsRUFBZ0I7QUFDYixjQUFLSSxxQkFBTCxHQUE2QixXQUFXVCxLQUFLSyxLQUE3QztBQUNGLE9BRkQsTUFFTyxJQUFJTCxLQUFLTSxRQUFMLElBQWlCTixLQUFLTyxRQUExQixFQUFvQztBQUN4Qyxj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LE1BQWpCLEVBQXlCO0FBQzdCLFVBQUlDLGNBQUo7QUFDQSxVQUFJRCxPQUFPRSxjQUFQLENBQXNCLFFBQXRCLENBQUosRUFBcUM7QUFBQSxnQ0FDOEJGLE1BRDlCLENBQzNCN0UsUUFEMkI7QUFBQSxhQUNoQkcsTUFEZ0Isb0JBQ2hCQSxNQURnQjtBQUFBLGFBQ1I2RSxVQURRLG9CQUNSQSxVQURRO0FBQUEsOEJBQzhCSCxNQUQ5QixDQUNLM0UsTUFETDtBQUFBLGFBQ2NpQyxNQURkLGtCQUNjQSxNQURkO0FBQUEsYUFDc0JsQixHQUR0QixrQkFDc0JBLEdBRHRCOztBQUVsQyxhQUFJbkIsVUFBY0ssTUFBZCw4QkFBNkNnQyxNQUE3QyxTQUF1RGxCLEdBQXZELFdBQWdFK0QsVUFBaEUsTUFBSjtBQUNBRixpQkFBUSxJQUFJakYsYUFBSixDQUFrQkMsT0FBbEIsRUFBMkJDLElBQTNCLEVBQWlDOEUsTUFBakMsQ0FBUjtBQUNBakYsYUFBT0UsT0FBUCxTQUFrQm1GLEtBQUtDLFNBQUwsQ0FBZUwsT0FBT3pDLElBQXRCLENBQWxCO0FBQ0YsT0FMRCxNQUtPO0FBQ0owQyxpQkFBUUQsTUFBUjtBQUNGO0FBQ0QsVUFBSXhDLEVBQUosRUFBUTtBQUNMekMsYUFBSSx5QkFBSjtBQUNBeUMsWUFBR3lDLEtBQUg7QUFDRixPQUhELE1BR087QUFDSmxGLGFBQUksZ0JBQUo7QUFDQSxlQUFNa0YsS0FBTjtBQUNGO0FBQ0gsSUFqQkQ7QUFrQkYiLCJmaWxlIjoiUmVxdWVzdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5pbXBvcnQge0Jhc2U2NH0gZnJvbSAnanMtYmFzZTY0JztcclxuXHJcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6cmVxdWVzdCcpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBlcnJvciBzdHJ1Y3R1cmUgcmV0dXJuZWQgd2hlbiBhIG5ldHdvcmsgY2FsbCBmYWlsc1xyXG4gKi9cclxuY2xhc3MgUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgLyoqXHJcbiAgICAqIENvbnN0cnVjdCBhIG5ldyBSZXNwb25zZUVycm9yXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gYW4gbWVzc2FnZSB0byByZXR1cm4gaW5zdGVhZCBvZiB0aGUgdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSByZXF1ZXN0ZWQgcGF0aFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSB0aGUgb2JqZWN0IHJldHVybmVkIGJ5IEF4aW9zXHJcbiAgICAqL1xyXG4gICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBwYXRoLCByZXNwb25zZSkge1xyXG4gICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVzcG9uc2UuY29uZmlnO1xyXG4gICAgICB0aGlzLnJlc3BvbnNlID0gKHJlc3BvbnNlIHx8IHt9KS5yZXNwb25zZSB8fCByZXNwb25zZTtcclxuICAgICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XHJcbiAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3RhYmxlIHdyYXBzIHRoZSBsb2dpYyBmb3IgbWFraW5nIGh0dHAgcmVxdWVzdHMgdG8gdGhlIEFQSVxyXG4gKi9cclxuY2xhc3MgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogRWl0aGVyIGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIG9yIGFuIG9hdXRoIHRva2VuIGZvciBHaXRodWJcclxuICAgICogQHR5cGVkZWYge09iamVjdH0gUmVxdWVzdGFibGUuYXV0aFxyXG4gICAgKiBAcHJvcCB7c3RyaW5nfSBbdXNlcm5hbWVdIC0gdGhlIEdpdGh1YiB1c2VybmFtZVxyXG4gICAgKiBAcHJvcCB7c3RyaW5nfSBbcGFzc3dvcmRdIC0gdGhlIHVzZXIncyBwYXNzd29yZFxyXG4gICAgKiBAcHJvcCB7dG9rZW59IFt0b2tlbl0gLSBhbiBPQXV0aCB0b2tlblxyXG4gICAgKi9cclxuICAgLyoqXHJcbiAgICAqIEluaXRpYWxpemUgdGhlIGh0dHAgaW50ZXJuYWxzLlxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViLiBJZiBhdXRoIGlzXHJcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBwcm92aWRlZCByZXF1ZXN0IHdpbGwgYmUgbWFkZSB1bmF1dGhlbnRpY2F0ZWRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtBY2NlcHRIZWFkZXI9djNdIC0gdGhlIGFjY2VwdCBoZWFkZXIgZm9yIHRoZSByZXF1ZXN0c1xyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSwgQWNjZXB0SGVhZGVyKSB7XHJcbiAgICAgIHRoaXMuX19hcGlCYXNlID0gYXBpQmFzZSB8fCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XHJcbiAgICAgIHRoaXMuX19hdXRoID0ge1xyXG4gICAgICAgICB0b2tlbjogYXV0aC50b2tlbixcclxuICAgICAgICAgdXNlcm5hbWU6IGF1dGgudXNlcm5hbWUsXHJcbiAgICAgICAgIHBhc3N3b3JkOiBhdXRoLnBhc3N3b3JkLFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLl9fQWNjZXB0SGVhZGVyID0gQWNjZXB0SGVhZGVyIHx8ICd2Myc7XHJcblxyXG4gICAgICBpZiAoYXV0aC50b2tlbikge1xyXG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICd0b2tlbiAnICsgYXV0aC50b2tlbjtcclxuICAgICAgfSBlbHNlIGlmIChhdXRoLnVzZXJuYW1lICYmIGF1dGgucGFzc3dvcmQpIHtcclxuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAnQmFzaWMgJyArIEJhc2U2NC5lbmNvZGUoYXV0aC51c2VybmFtZSArICc6JyArIGF1dGgucGFzc3dvcmQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSBVUkwgdG8gdXNlIHRvIG1ha2UgYSByZXF1ZXN0LlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGVpdGhlciBhIFVSTCByZWxhdGl2ZSB0byB0aGUgQVBJIGJhc2Ugb3IgYW4gYWJzb2x1dGUgVVJMXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgVVJMIHRvIHVzZVxyXG4gICAgKi9cclxuICAgX19nZXRVUkwocGF0aCkge1xyXG4gICAgICBsZXQgdXJsID0gcGF0aDtcclxuXHJcbiAgICAgIGlmIChwYXRoLmluZGV4T2YoJy8vJykgPT09IC0xKSB7XHJcbiAgICAgICAgIHVybCA9IHRoaXMuX19hcGlCYXNlICsgcGF0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld0NhY2hlQnVzdGVyID0gJ3RpbWVzdGFtcD0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvKHRpbWVzdGFtcD1cXGQrKS8sIG5ld0NhY2hlQnVzdGVyKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENvbXB1dGUgdGhlIGhlYWRlcnMgcmVxdWlyZWQgZm9yIGFuIEFQSSByZXF1ZXN0LlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSB0cmVhdGVkIGFzIEpTT04gb3IgYXMgYSByYXcgcmVxdWVzdFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gQWNjZXB0SGVhZGVyIC0gdGhlIGFjY2VwdCBoZWFkZXIgZm9yIHRoZSByZXF1ZXN0XHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgaGVhZGVycyB0byB1c2UgaW4gdGhlIHJlcXVlc3RcclxuICAgICovXHJcbiAgIF9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3LCBBY2NlcHRIZWFkZXIpIHtcclxuICAgICAgbGV0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyxcclxuICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLicgKyAoQWNjZXB0SGVhZGVyIHx8IHRoaXMuX19BY2NlcHRIZWFkZXIpLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHJhdykge1xyXG4gICAgICAgICBoZWFkZXJzLkFjY2VwdCArPSAnLnJhdyc7XHJcbiAgICAgIH1cclxuICAgICAgaGVhZGVycy5BY2NlcHQgKz0gJytqc29uJztcclxuXHJcbiAgICAgIGlmICh0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcikge1xyXG4gICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZXRzIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIEFQSSByZXF1ZXN0c1xyXG4gICAgKiBAcHJvdGVjdGVkXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdE9wdGlvbnM9e31dIC0gdGhlIGN1cnJlbnQgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcclxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIHJlcXVlc3RcclxuICAgICovXHJcbiAgIF9nZXRPcHRpb25zV2l0aERlZmF1bHRzKHJlcXVlc3RPcHRpb25zID0ge30pIHtcclxuICAgICAgaWYgKCEocmVxdWVzdE9wdGlvbnMudmlzaWJpbGl0eSB8fCByZXF1ZXN0T3B0aW9ucy5hZmZpbGlhdGlvbikpIHtcclxuICAgICAgICAgcmVxdWVzdE9wdGlvbnMudHlwZSA9IHJlcXVlc3RPcHRpb25zLnR5cGUgfHwgJ2FsbCc7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdE9wdGlvbnMuc29ydCA9IHJlcXVlc3RPcHRpb25zLnNvcnQgfHwgJ3VwZGF0ZWQnO1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy5wZXJfcGFnZSA9IHJlcXVlc3RPcHRpb25zLnBlcl9wYWdlIHx8ICcxMDAnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gICAgICByZXR1cm4gcmVxdWVzdE9wdGlvbnM7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBpZiBhIGBEYXRlYCBpcyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBhbiBJU08gc3RyaW5nXHJcbiAgICAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBvYmplY3QgdG8gYXR0ZW1wdCB0byBjb29lcmNlIGludG8gYW4gSVNPIGRhdGUgc3RyaW5nXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgSVNPIHJlcHJlc2VudGF0aW9uIG9mIGBkYXRlYCBvciB3aGF0ZXZlciB3YXMgcGFzc2VkIGluIGlmIGl0IHdhcyBub3QgYSBkYXRlXHJcbiAgICAqL1xyXG4gICBfZGF0ZVRvSVNPKGRhdGUpIHtcclxuICAgICAgaWYgKGRhdGUgJiYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xyXG4gICAgICAgICBkYXRlID0gZGF0ZS50b0lTT1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzdWx0IG9mIHRoZSBBUEkgcmVxdWVzdC5cclxuICAgICogQGNhbGxiYWNrIFJlcXVlc3RhYmxlLmNhbGxiYWNrXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuRXJyb3J9IGVycm9yIC0gdGhlIGVycm9yIHJldHVybmVkIGJ5IHRoZSBBUEkgb3IgYG51bGxgXHJcbiAgICAqIEBwYXJhbSB7KE9iamVjdHx0cnVlKX0gcmVzdWx0IC0gdGhlIGRhdGEgcmV0dXJuZWQgYnkgdGhlIEFQSSBvciBgdHJ1ZWAgaWYgdGhlIEFQSSByZXR1cm5zIGAyMDQgTm8gQ29udGVudGBcclxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3QgLSB0aGUgcmF3IHtAbGlua2NvZGUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvYXhpb3MjcmVzcG9uc2Utc2NoZW1hIFJlc3BvbnNlfVxyXG4gICAgKi9cclxuICAgLyoqXHJcbiAgICAqIE1ha2UgYSByZXF1ZXN0LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIC0gdGhlIG1ldGhvZCBmb3IgdGhlIHJlcXVlc3QgKEdFVCwgUFVULCBQT1NULCBERUxFVEUpXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSByZXF1ZXN0XHJcbiAgICAqIEBwYXJhbSB7Kn0gW2RhdGFdIC0gdGhlIGRhdGEgdG8gc2VuZCB0byB0aGUgc2VydmVyLiBGb3IgSFRUUCBtZXRob2RzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJvZHkgdGhlIGRhdGFcclxuICAgICogICAgICAgICAgICAgICAgICAgd2lsbCBiZSBzZW50IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBjYWxsYmFjayBmb3IgdGhlIHJlcXVlc3RcclxuICAgICogQHBhcmFtIHtib29sZWFufSBbcmF3PWZhbHNlXSAtIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBzZW50IGFzIHJhdy4gSWYgdGhpcyBpcyBhIGZhbHN5IHZhbHVlIHRoZW4gdGhlXHJcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCB3aWxsIGJlIG1hZGUgYXMgSlNPTlxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBfcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEsIGNiLCByYXcpIHtcclxuICAgICAgY29uc3QgdXJsID0gdGhpcy5fX2dldFVSTChwYXRoKTtcclxuXHJcbiAgICAgIGNvbnN0IEFjY2VwdEhlYWRlciA9IChkYXRhIHx8IHt9KS5BY2NlcHRIZWFkZXI7XHJcbiAgICAgIGlmIChBY2NlcHRIZWFkZXIpIHtcclxuICAgICAgICAgZGVsZXRlIGRhdGEuQWNjZXB0SGVhZGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLl9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3LCBBY2NlcHRIZWFkZXIpO1xyXG5cclxuICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0ge307XHJcblxyXG4gICAgICBjb25zdCBzaG91bGRVc2VEYXRhQXNQYXJhbXMgPSBkYXRhICYmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIG1ldGhvZEhhc05vQm9keShtZXRob2QpO1xyXG4gICAgICBpZiAoc2hvdWxkVXNlRGF0YUFzUGFyYW1zKSB7XHJcbiAgICAgICAgIHF1ZXJ5UGFyYW1zID0gZGF0YTtcclxuICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXHJcbiAgICAgICAgIHBhcmFtczogcXVlcnlQYXJhbXMsXHJcbiAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgIHJlc3BvbnNlVHlwZTogcmF3ID8gJ3RleHQnIDogJ2pzb24nLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbG9nKGAke2NvbmZpZy5tZXRob2R9IHRvICR7Y29uZmlnLnVybH1gKTtcclxuICAgICAgY29uc3QgcmVxdWVzdFByb21pc2UgPSBheGlvcyhjb25maWcpLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XHJcblxyXG4gICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgcmVxdWVzdFByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgT2JqZWN0LmtleXMocmVzcG9uc2UuZGF0YSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAvLyBXaGVuIGRhdGEgaGFzIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5tZXRob2QgIT09ICdHRVQnICYmIE9iamVjdC5rZXlzKHJlc3BvbnNlLmRhdGEpLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgLy8gVHJ1ZSB3aGVuIHN1Y2Nlc3NmdWwgc3VibWl0IGEgcmVxdWVzdCBhbmQgcmVjZWl2ZSBhIGVtcHR5IG9iamVjdFxyXG4gICAgICAgICAgICAgICBjYihudWxsLCAocmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBjYihudWxsLCByZXNwb25zZS5kYXRhLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXF1ZXN0UHJvbWlzZTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIE1ha2UgYSByZXF1ZXN0IHRvIGFuIGVuZHBvaW50IHRoZSByZXR1cm5zIDIwNCB3aGVuIHRydWUgYW5kIDQwNCB3aGVuIGZhbHNlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggdG8gcmVxdWVzdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFueSBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgcmVjZWl2ZSBgdHJ1ZWAgb3IgYGZhbHNlYFxyXG4gICAgKiBAcGFyYW0ge21ldGhvZH0gW21ldGhvZD1HRVRdIC0gSFRUUCBNZXRob2QgdG8gdXNlXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIF9yZXF1ZXN0MjA0b3I0MDQocGF0aCwgZGF0YSwgY2IsIG1ldGhvZCA9ICdHRVQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KG1ldGhvZCwgcGF0aCwgZGF0YSlcclxuICAgICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgY2IobnVsbCwgdHJ1ZSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICB9LCBmdW5jdGlvbiBmYWlsdXJlKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZmFsc2UsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICBjYihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTWFrZSBhIHJlcXVlc3QgYW5kIGZldGNoIGFsbCB0aGUgYXZhaWxhYmxlIGRhdGEuIEdpdGh1YiB3aWxsIHBhZ2luYXRlIHJlc3BvbnNlcyBzbyBmb3IgcXVlcmllc1xyXG4gICAgKiB0aGF0IG1pZ2h0IHNwYW4gbXVsdGlwbGUgcGFnZXMgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkIHRvIHtAbGluayBSZXF1ZXN0YWJsZSNyZXF1ZXN0fVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIHRvIHJlcXVlc3RcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdG8gcmVjZWl2ZSB0aGUgZGF0YS4gVGhlIHJldHVybmVkIGRhdGEgd2lsbCBhbHdheXMgYmUgYW4gYXJyYXkuXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0W119IHJlc3VsdHMgLSB0aGUgcGFydGlhbCByZXN1bHRzLiBUaGlzIGFyZ3VtZW50IGlzIGludGVuZGVkIGZvciBpbnRlcmFsIHVzZSBvbmx5LlxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIGEgcHJvbWlzZSB3aGljaCB3aWxsIHJlc29sdmUgd2hlbiBhbGwgcGFnZXMgaGF2ZSBiZWVuIGZldGNoZWRcclxuICAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIGZvbGRlZCBpbnRvIHtAbGluayBSZXF1ZXN0YWJsZSNfcmVxdWVzdH0gaW4gdGhlIDIuMCByZWxlYXNlLlxyXG4gICAgKi9cclxuICAgX3JlcXVlc3RBbGxQYWdlcyhwYXRoLCBvcHRpb25zLCBjYiwgcmVzdWx0cykge1xyXG4gICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBwYXRoLCBvcHRpb25zKVxyXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoaXNHcm91cDtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICB0aGlzR3JvdXAgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEuaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICB0aGlzR3JvdXAgPSByZXNwb25zZS5kYXRhLml0ZW1zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGBjYW5ub3QgZmlndXJlIG91dCBob3cgdG8gYXBwZW5kICR7cmVzcG9uc2UuZGF0YX0gdG8gdGhlIHJlc3VsdCBzZXRgO1xyXG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVzcG9uc2VFcnJvcihtZXNzYWdlLCBwYXRoLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnRoaXNHcm91cCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXh0VXJsID0gZ2V0TmV4dFBhZ2UocmVzcG9uc2UuaGVhZGVycy5saW5rKTtcclxuICAgICAgICAgICAgaWYgKG5leHRVcmwgJiYgdHlwZW9mIG9wdGlvbnMucGFnZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgbG9nKGBnZXR0aW5nIG5leHQgcGFnZTogJHtuZXh0VXJsfWApO1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKG5leHRVcmwsIG9wdGlvbnMsIGNiLCByZXN1bHRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3VsdHMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3VsdHM7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgfSkuY2F0Y2goY2FsbGJhY2tFcnJvck9yVGhyb3coY2IsIHBhdGgpKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RhYmxlO1xyXG5cclxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cclxuLy8gIFByaXZhdGUgaGVscGVyIGZ1bmN0aW9ucyAgLy9cclxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cclxuY29uc3QgTUVUSE9EU19XSVRIX05PX0JPRFkgPSBbJ0dFVCcsICdIRUFEJywgJ0RFTEVURSddO1xyXG5mdW5jdGlvbiBtZXRob2RIYXNOb0JvZHkobWV0aG9kKSB7XHJcbiAgIHJldHVybiBNRVRIT0RTX1dJVEhfTk9fQk9EWS5pbmRleE9mKG1ldGhvZCkgIT09IC0xO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0UGFnZShsaW5rc0hlYWRlciA9ICcnKSB7XHJcbiAgIGNvbnN0IGxpbmtzID0gbGlua3NIZWFkZXIuc3BsaXQoL1xccyosXFxzKi8pOyAvLyBzcGxpdHMgYW5kIHN0cmlwcyB0aGUgdXJsc1xyXG4gICByZXR1cm4gbGlua3MucmVkdWNlKGZ1bmN0aW9uKG5leHRVcmwsIGxpbmspIHtcclxuICAgICAgaWYgKGxpbmsuc2VhcmNoKC9yZWw9XCJuZXh0XCIvKSAhPT0gLTEpIHtcclxuICAgICAgICAgcmV0dXJuIChsaW5rLm1hdGNoKC88KC4qKT4vKSB8fCBbXSlbMV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXh0VXJsO1xyXG4gICB9LCB1bmRlZmluZWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkge1xyXG4gICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihvYmplY3QpIHtcclxuICAgICAgbGV0IGVycm9yO1xyXG4gICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KCdjb25maWcnKSkge1xyXG4gICAgICAgICBjb25zdCB7cmVzcG9uc2U6IHtzdGF0dXMsIHN0YXR1c1RleHR9LCBjb25maWc6IHttZXRob2QsIHVybH19ID0gb2JqZWN0O1xyXG4gICAgICAgICBsZXQgbWVzc2FnZSA9IChgJHtzdGF0dXN9IGVycm9yIG1ha2luZyByZXF1ZXN0ICR7bWV0aG9kfSAke3VybH06IFwiJHtzdGF0dXNUZXh0fVwiYCk7XHJcbiAgICAgICAgIGVycm9yID0gbmV3IFJlc3BvbnNlRXJyb3IobWVzc2FnZSwgcGF0aCwgb2JqZWN0KTtcclxuICAgICAgICAgbG9nKGAke21lc3NhZ2V9ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0LmRhdGEpfWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBlcnJvciA9IG9iamVjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgbG9nKCdnb2luZyB0byBlcnJvciBjYWxsYmFjaycpO1xyXG4gICAgICAgICBjYihlcnJvcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGxvZygndGhyb3dpbmcgZXJyb3InKTtcclxuICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuICAgfTtcclxufVxyXG4iXX0=
//# sourceMappingURL=Requestable.js.map
