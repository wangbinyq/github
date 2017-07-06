'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:user');

/**
 * A User allows scoping of API requests to a particular Github user.
 */

var User = function (_Requestable) {
   _inherits(User, _Requestable);

   /**
    * Create a User.
    * @param {string} [username] - the user to use for user-scoped queries
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function User(username, auth, apiBase) {
      _classCallCheck(this, User);

      var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, auth, apiBase));

      _this.__user = username;
      return _this;
   }

   /**
    * Get the url for the request. (dependent on if we're requesting for the authenticated user or not)
    * @private
    * @param {string} endpoint - the endpoint being requested
    * @return {string} - the resolved endpoint
    */


   _createClass(User, [{
      key: '__getScopedUrl',
      value: function __getScopedUrl(endpoint) {
         if (this.__user) {
            return endpoint ? '/users/' + this.__user + '/' + endpoint : '/users/' + this.__user;
         } else {
            // eslint-disable-line
            switch (endpoint) {
               case '':
                  return '/user';

               case 'notifications':
               case 'gists':
                  return '/' + endpoint;

               default:
                  return '/user/' + endpoint;
            }
         }
      }

      /**
       * List the user's repositories
       * @see https://developer.github.com/v3/repos/#list-user-repositories
       * @param {Object} [options={}] - any options to refine the search
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listRepos',
      value: function listRepos(options, cb) {
         if (typeof options === 'function') {
            cb = options;
            options = {};
         }

         options = this._getOptionsWithDefaults(options);

         log('Fetching repositories with options: ' + JSON.stringify(options));
         return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
      }

      /**
       * List the orgs that the user belongs to
       * @see https://developer.github.com/v3/orgs/#list-user-organizations
       * @param {Requestable.callback} [cb] - will receive the list of organizations
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listOrgs',
      value: function listOrgs(cb) {
         return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
      }

      /**
       * List the user's gists
       * @see https://developer.github.com/v3/gists/#list-a-users-gists
       * @param {Requestable.callback} [cb] - will receive the list of gists
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listGists',
      value: function listGists(cb) {
         return this._request('GET', this.__getScopedUrl('gists'), null, cb);
      }

      /**
       * List the user's notifications
       * @see https://developer.github.com/v3/activity/notifications/#list-your-notifications
       * @param {Object} [options={}] - any options to refine the search
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listNotifications',
      value: function listNotifications(options, cb) {
         options = options || {};
         if (typeof options === 'function') {
            cb = options;
            options = {};
         }

         options.since = this._dateToISO(options.since);
         options.before = this._dateToISO(options.before);

         return this._request('GET', this.__getScopedUrl('notifications'), options, cb);
      }

      /**
       * Show the user's profile
       * @see https://developer.github.com/v3/users/#get-a-single-user
       * @param {Requestable.callback} [cb] - will receive the user's information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getProfile',
      value: function getProfile(cb) {
         return this._request('GET', this.__getScopedUrl(''), null, cb);
      }

      /**
       * Gets the list of starred repositories for the user
       * @see https://developer.github.com/v3/activity/starring/#list-repositories-being-starred
       * @param {Requestable.callback} [cb] - will receive the list of starred repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listStarredRepos',
      value: function listStarredRepos(cb) {
         var requestOptions = this._getOptionsWithDefaults();
         return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
      }

      /**
       * List email addresses for a user
       * @see https://developer.github.com/v3/users/emails/#list-email-addresses-for-a-user
       * @param {Requestable.callback} [cb] - will receive the list of emails
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getEmails',
      value: function getEmails(cb) {
         return this._request('GET', '/user/emails', null, cb);
      }

      /**
       * Have the authenticated user follow this user
       * @see https://developer.github.com/v3/users/followers/#follow-a-user
       * @param {string} username - the user to follow
       * @param {Requestable.callback} [cb] - will receive true if the request succeeds
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'follow',
      value: function follow(username, cb) {
         return this._request('PUT', '/user/following/' + this.__user, null, cb);
      }

      /**
       * Have the currently authenticated user unfollow this user
       * @see https://developer.github.com/v3/users/followers/#follow-a-user
       * @param {string} username - the user to unfollow
       * @param {Requestable.callback} [cb] - receives true if the request succeeds
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'unfollow',
      value: function unfollow(username, cb) {
         return this._request('DELETE', '/user/following/' + this.__user, null, cb);
      }

      /**
       * Create a new repository for the currently authenticated user
       * @see https://developer.github.com/v3/repos/#create
       * @param {object} options - the repository definition
       * @param {Requestable.callback} [cb] - will receive the API response
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRepo',
      value: function createRepo(options, cb) {
         return this._request('POST', '/user/repos', options, cb);
      }
   }]);

   return User;
}(_Requestable3.default);

module.exports = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzZXIuanMiXSwibmFtZXMiOlsibG9nIiwiVXNlciIsInVzZXJuYW1lIiwiYXV0aCIsImFwaUJhc2UiLCJfX3VzZXIiLCJlbmRwb2ludCIsIm9wdGlvbnMiLCJjYiIsIl9nZXRPcHRpb25zV2l0aERlZmF1bHRzIiwiSlNPTiIsInN0cmluZ2lmeSIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJfX2dldFNjb3BlZFVybCIsIl9yZXF1ZXN0Iiwic2luY2UiLCJfZGF0ZVRvSVNPIiwiYmVmb3JlIiwicmVxdWVzdE9wdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFSQTs7Ozs7OztBQVNBLElBQU1BLE1BQU0scUJBQU0sYUFBTixDQUFaOztBQUVBOzs7O0lBR01DLEk7OztBQUNIOzs7Ozs7QUFNQSxpQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQUE7O0FBQUEsOEdBQzVCRCxJQUQ0QixFQUN0QkMsT0FEc0I7O0FBRWxDLFlBQUtDLE1BQUwsR0FBY0gsUUFBZDtBQUZrQztBQUdwQzs7QUFFRDs7Ozs7Ozs7OztxQ0FNZUksUSxFQUFVO0FBQ3RCLGFBQUksS0FBS0QsTUFBVCxFQUFpQjtBQUNkLG1CQUFPQyx1QkFDTSxLQUFLRCxNQURYLFNBQ3FCQyxRQURyQixlQUVNLEtBQUtELE1BRmxCO0FBS0YsVUFORCxNQU1PO0FBQUU7QUFDTixvQkFBUUMsUUFBUjtBQUNHLG9CQUFLLEVBQUw7QUFDRyx5QkFBTyxPQUFQOztBQUVILG9CQUFLLGVBQUw7QUFDQSxvQkFBSyxPQUFMO0FBQ0csK0JBQVdBLFFBQVg7O0FBRUg7QUFDRyxvQ0FBZ0JBLFFBQWhCO0FBVE47QUFXRjtBQUNIOztBQUVEOzs7Ozs7Ozs7O2dDQU9VQyxPLEVBQVNDLEUsRUFBSTtBQUNwQixhQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDaENDLGlCQUFLRCxPQUFMO0FBQ0FBLHNCQUFVLEVBQVY7QUFDRjs7QUFFREEsbUJBQVUsS0FBS0UsdUJBQUwsQ0FBNkJGLE9BQTdCLENBQVY7O0FBRUFQLHNEQUEyQ1UsS0FBS0MsU0FBTCxDQUFlSixPQUFmLENBQTNDO0FBQ0EsZ0JBQU8sS0FBS0ssZ0JBQUwsQ0FBc0IsS0FBS0MsY0FBTCxDQUFvQixPQUFwQixDQUF0QixFQUFvRE4sT0FBcEQsRUFBNkRDLEVBQTdELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OytCQU1TQSxFLEVBQUk7QUFDVixnQkFBTyxLQUFLTSxRQUFMLENBQWMsS0FBZCxFQUFxQixLQUFLRCxjQUFMLENBQW9CLE1BQXBCLENBQXJCLEVBQWtELElBQWxELEVBQXdETCxFQUF4RCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztnQ0FNVUEsRSxFQUFJO0FBQ1gsZ0JBQU8sS0FBS00sUUFBTCxDQUFjLEtBQWQsRUFBcUIsS0FBS0QsY0FBTCxDQUFvQixPQUFwQixDQUFyQixFQUFtRCxJQUFuRCxFQUF5REwsRUFBekQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O3dDQU9rQkQsTyxFQUFTQyxFLEVBQUk7QUFDNUJELG1CQUFVQSxXQUFXLEVBQXJCO0FBQ0EsYUFBSSxPQUFPQSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2hDQyxpQkFBS0QsT0FBTDtBQUNBQSxzQkFBVSxFQUFWO0FBQ0Y7O0FBRURBLGlCQUFRUSxLQUFSLEdBQWdCLEtBQUtDLFVBQUwsQ0FBZ0JULFFBQVFRLEtBQXhCLENBQWhCO0FBQ0FSLGlCQUFRVSxNQUFSLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JULFFBQVFVLE1BQXhCLENBQWpCOztBQUVBLGdCQUFPLEtBQUtILFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEtBQUtELGNBQUwsQ0FBb0IsZUFBcEIsQ0FBckIsRUFBMkROLE9BQTNELEVBQW9FQyxFQUFwRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztpQ0FNV0EsRSxFQUFJO0FBQ1osZ0JBQU8sS0FBS00sUUFBTCxDQUFjLEtBQWQsRUFBcUIsS0FBS0QsY0FBTCxDQUFvQixFQUFwQixDQUFyQixFQUE4QyxJQUE5QyxFQUFvREwsRUFBcEQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7dUNBTWlCQSxFLEVBQUk7QUFDbEIsYUFBSVUsaUJBQWlCLEtBQUtULHVCQUFMLEVBQXJCO0FBQ0EsZ0JBQU8sS0FBS0csZ0JBQUwsQ0FBc0IsS0FBS0MsY0FBTCxDQUFvQixTQUFwQixDQUF0QixFQUFzREssY0FBdEQsRUFBc0VWLEVBQXRFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7O2dDQU1VQSxFLEVBQUk7QUFDWCxnQkFBTyxLQUFLTSxRQUFMLENBQWMsS0FBZCxFQUFxQixjQUFyQixFQUFxQyxJQUFyQyxFQUEyQ04sRUFBM0MsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7OzZCQU9PTixRLEVBQVVNLEUsRUFBSTtBQUNsQixnQkFBTyxLQUFLTSxRQUFMLENBQWMsS0FBZCx1QkFBd0MsS0FBS1QsTUFBN0MsRUFBdUQsSUFBdkQsRUFBNkRHLEVBQTdELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzsrQkFPU04sUSxFQUFVTSxFLEVBQUk7QUFDcEIsZ0JBQU8sS0FBS00sUUFBTCxDQUFjLFFBQWQsdUJBQTJDLEtBQUtULE1BQWhELEVBQTBELElBQTFELEVBQWdFRyxFQUFoRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7aUNBT1dELE8sRUFBU0MsRSxFQUFJO0FBQ3JCLGdCQUFPLEtBQUtNLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLGFBQXRCLEVBQXFDUCxPQUFyQyxFQUE4Q0MsRUFBOUMsQ0FBUDtBQUNGOzs7Ozs7QUFHSlcsT0FBT0MsT0FBUCxHQUFpQm5CLElBQWpCIiwiZmlsZSI6IlVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnVzZXInKTtcclxuXHJcbi8qKlxyXG4gKiBBIFVzZXIgYWxsb3dzIHNjb3Bpbmcgb2YgQVBJIHJlcXVlc3RzIHRvIGEgcGFydGljdWxhciBHaXRodWIgdXNlci5cclxuICovXHJcbmNsYXNzIFVzZXIgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBVc2VyLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXJuYW1lXSAtIHRoZSB1c2VyIHRvIHVzZSBmb3IgdXNlci1zY29wZWQgcXVlcmllc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKHVzZXJuYW1lLCBhdXRoLCBhcGlCYXNlKSB7XHJcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xyXG4gICAgICB0aGlzLl9fdXNlciA9IHVzZXJuYW1lO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IHRoZSB1cmwgZm9yIHRoZSByZXF1ZXN0LiAoZGVwZW5kZW50IG9uIGlmIHdlJ3JlIHJlcXVlc3RpbmcgZm9yIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgb3Igbm90KVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnQgLSB0aGUgZW5kcG9pbnQgYmVpbmcgcmVxdWVzdGVkXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgcmVzb2x2ZWQgZW5kcG9pbnRcclxuICAgICovXHJcbiAgIF9fZ2V0U2NvcGVkVXJsKGVuZHBvaW50KSB7XHJcbiAgICAgIGlmICh0aGlzLl9fdXNlcikge1xyXG4gICAgICAgICByZXR1cm4gZW5kcG9pbnQgP1xyXG4gICAgICAgICAgICBgL3VzZXJzLyR7dGhpcy5fX3VzZXJ9LyR7ZW5kcG9pbnR9YCA6XHJcbiAgICAgICAgICAgIGAvdXNlcnMvJHt0aGlzLl9fdXNlcn1gXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgc3dpdGNoIChlbmRwb2ludCkge1xyXG4gICAgICAgICAgICBjYXNlICcnOlxyXG4gICAgICAgICAgICAgICByZXR1cm4gJy91c2VyJztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbnMnOlxyXG4gICAgICAgICAgICBjYXNlICdnaXN0cyc6XHJcbiAgICAgICAgICAgICAgIHJldHVybiBgLyR7ZW5kcG9pbnR9YDtcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgIHJldHVybiBgL3VzZXIvJHtlbmRwb2ludH1gO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIHVzZXIncyByZXBvc2l0b3JpZXNcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LXVzZXItcmVwb3NpdG9yaWVzXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBhbnkgb3B0aW9ucyB0byByZWZpbmUgdGhlIHNlYXJjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0UmVwb3Mob3B0aW9ucywgY2IpIHtcclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgIGNiID0gb3B0aW9ucztcclxuICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zKTtcclxuXHJcbiAgICAgIGxvZyhgRmV0Y2hpbmcgcmVwb3NpdG9yaWVzIHdpdGggb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyh0aGlzLl9fZ2V0U2NvcGVkVXJsKCdyZXBvcycpLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBvcmdzIHRoYXQgdGhlIHVzZXIgYmVsb25ncyB0b1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy8jbGlzdC11c2VyLW9yZ2FuaXphdGlvbnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBvcmdhbml6YXRpb25zXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RPcmdzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdvcmdzJyksIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIHVzZXIncyBnaXN0c1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2xpc3QtYS11c2Vycy1naXN0c1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGdpc3RzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RHaXN0cyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnZ2lzdHMnKSwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgdXNlcidzIG5vdGlmaWNhdGlvbnNcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L25vdGlmaWNhdGlvbnMvI2xpc3QteW91ci1ub3RpZmljYXRpb25zXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBhbnkgb3B0aW9ucyB0byByZWZpbmUgdGhlIHNlYXJjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0Tm90aWZpY2F0aW9ucyhvcHRpb25zLCBjYikge1xyXG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgIGNiID0gb3B0aW9ucztcclxuICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcHRpb25zLnNpbmNlID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMuc2luY2UpO1xyXG4gICAgICBvcHRpb25zLmJlZm9yZSA9IHRoaXMuX2RhdGVUb0lTTyhvcHRpb25zLmJlZm9yZSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnbm90aWZpY2F0aW9ucycpLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTaG93IHRoZSB1c2VyJ3MgcHJvZmlsZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvI2dldC1hLXNpbmdsZS11c2VyXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVzZXIncyBpbmZvcm1hdGlvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRQcm9maWxlKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCcnKSwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0cyB0aGUgbGlzdCBvZiBzdGFycmVkIHJlcG9zaXRvcmllcyBmb3IgdGhlIHVzZXJcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L3N0YXJyaW5nLyNsaXN0LXJlcG9zaXRvcmllcy1iZWluZy1zdGFycmVkXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygc3RhcnJlZCByZXBvc2l0b3JpZXNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdFN0YXJyZWRSZXBvcyhjYikge1xyXG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXModGhpcy5fX2dldFNjb3BlZFVybCgnc3RhcnJlZCcpLCByZXF1ZXN0T3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCBlbWFpbCBhZGRyZXNzZXMgZm9yIGEgdXNlclxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvZW1haWxzLyNsaXN0LWVtYWlsLWFkZHJlc3Nlcy1mb3ItYS11c2VyXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZW1haWxzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldEVtYWlscyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgJy91c2VyL2VtYWlscycsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEhhdmUgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBmb2xsb3cgdGhpcyB1c2VyXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My91c2Vycy9mb2xsb3dlcnMvI2ZvbGxvdy1hLXVzZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gZm9sbG93XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBmb2xsb3codXNlcm5hbWUsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3VzZXIvZm9sbG93aW5nLyR7dGhpcy5fX3VzZXJ9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogSGF2ZSB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciB1bmZvbGxvdyB0aGlzIHVzZXJcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3VzZXJzL2ZvbGxvd2Vycy8jZm9sbG93LWEtdXNlclxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSB0aGUgdXNlciB0byB1bmZvbGxvd1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gcmVjZWl2ZXMgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1bmZvbGxvdyh1c2VybmFtZSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9mb2xsb3dpbmcvJHt0aGlzLl9fdXNlcn1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgcmVwb3NpdG9yeSBmb3IgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXJcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNjcmVhdGVcclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB0aGUgcmVwb3NpdG9yeSBkZWZpbml0aW9uXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIEFQSSByZXNwb25zZVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVSZXBvKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgJy91c2VyL3JlcG9zJywgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIl19
//# sourceMappingURL=User.js.map
