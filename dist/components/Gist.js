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
 * A Gist can retrieve and modify gists.
 */
var Gist = function (_Requestable) {
   _inherits(Gist, _Requestable);

   /**
    * Create a Gist.
    * @param {string} id - the id of the gist (not required when creating a gist)
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Gist(id, auth, apiBase) {
      _classCallCheck(this, Gist);

      var _this = _possibleConstructorReturn(this, (Gist.__proto__ || Object.getPrototypeOf(Gist)).call(this, auth, apiBase));

      _this.__id = id;
      return _this;
   }

   /**
    * Fetch a gist.
    * @see https://developer.github.com/v3/gists/#get-a-single-gist
    * @param {Requestable.callback} [cb] - will receive the gist
    * @return {Promise} - the Promise for the http request
    */


   _createClass(Gist, [{
      key: 'read',
      value: function read(cb) {
         return this._request('GET', '/gists/' + this.__id, null, cb);
      }

      /**
       * Create a new gist.
       * @see https://developer.github.com/v3/gists/#create-a-gist
       * @param {Object} gist - the data for the new gist
       * @param {Requestable.callback} [cb] - will receive the new gist upon creation
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'create',
      value: function create(gist, cb) {
         var _this2 = this;

         return this._request('POST', '/gists', gist, cb).then(function (response) {
            _this2.__id = response.data.id;
            return response;
         });
      }

      /**
       * Delete a gist.
       * @see https://developer.github.com/v3/gists/#delete-a-gist
       * @param {Requestable.callback} [cb] - will receive true if the request succeeds
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'delete',
      value: function _delete(cb) {
         return this._request('DELETE', '/gists/' + this.__id, null, cb);
      }

      /**
       * Fork a gist.
       * @see https://developer.github.com/v3/gists/#fork-a-gist
       * @param {Requestable.callback} [cb] - the function that will receive the gist
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'fork',
      value: function fork(cb) {
         return this._request('POST', '/gists/' + this.__id + '/forks', null, cb);
      }

      /**
       * Update a gist.
       * @see https://developer.github.com/v3/gists/#edit-a-gist
       * @param {Object} gist - the new data for the gist
       * @param {Requestable.callback} [cb] - the function that receives the API result
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'update',
      value: function update(gist, cb) {
         return this._request('PATCH', '/gists/' + this.__id, gist, cb);
      }

      /**
       * Star a gist.
       * @see https://developer.github.com/v3/gists/#star-a-gist
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'star',
      value: function star(cb) {
         return this._request('PUT', '/gists/' + this.__id + '/star', null, cb);
      }

      /**
       * Unstar a gist.
       * @see https://developer.github.com/v3/gists/#unstar-a-gist
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'unstar',
      value: function unstar(cb) {
         return this._request('DELETE', '/gists/' + this.__id + '/star', null, cb);
      }

      /**
       * Check if a gist is starred by the user.
       * @see https://developer.github.com/v3/gists/#check-if-a-gist-is-starred
       * @param {Requestable.callback} [cb] - will receive true if the gist is starred and false if the gist is not starred
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'isStarred',
      value: function isStarred(cb) {
         return this._request204or404('/gists/' + this.__id + '/star', null, cb);
      }

      /**
       * List the gist's commits
       * @see https://developer.github.com/v3/gists/#list-gist-commits
       * @param {Requestable.callback} [cb] - will receive the array of commits
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'listCommits',
      value: function listCommits(cb) {
         return this._requestAllPages('/gists/' + this.__id + '/commits', null, cb);
      }

      /**
       * Fetch one of the gist's revision.
       * @see https://developer.github.com/v3/gists/#get-a-specific-revision-of-a-gist
       * @param {string} revision - the id of the revision
       * @param {Requestable.callback} [cb] - will receive the revision
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'getRevision',
      value: function getRevision(revision, cb) {
         return this._request('GET', '/gists/' + this.__id + '/' + revision, null, cb);
      }

      /**
       * List the gist's comments
       * @see https://developer.github.com/v3/gists/comments/#list-comments-on-a-gist
       * @param {Requestable.callback} [cb] - will receive the array of comments
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listComments',
      value: function listComments(cb) {
         return this._requestAllPages('/gists/' + this.__id + '/comments', null, cb);
      }

      /**
       * Fetch one of the gist's comments
       * @see https://developer.github.com/v3/gists/comments/#get-a-single-comment
       * @param {number} comment - the id of the comment
       * @param {Requestable.callback} [cb] - will receive the comment
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'getComment',
      value: function getComment(comment, cb) {
         return this._request('GET', '/gists/' + this.__id + '/comments/' + comment, null, cb);
      }

      /**
       * Comment on a gist
       * @see https://developer.github.com/v3/gists/comments/#create-a-comment
       * @param {string} comment - the comment to add
       * @param {Requestable.callback} [cb] - the function that receives the API result
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'createComment',
      value: function createComment(comment, cb) {
         return this._request('POST', '/gists/' + this.__id + '/comments', { body: comment }, cb);
      }

      /**
       * Edit a comment on the gist
       * @see https://developer.github.com/v3/gists/comments/#edit-a-comment
       * @param {number} comment - the id of the comment
       * @param {string} body - the new comment
       * @param {Requestable.callback} [cb] - will receive the modified comment
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editComment',
      value: function editComment(comment, body, cb) {
         return this._request('PATCH', '/gists/' + this.__id + '/comments/' + comment, { body: body }, cb);
      }

      /**
       * Delete a comment on the gist.
       * @see https://developer.github.com/v3/gists/comments/#delete-a-comment
       * @param {number} comment - the id of the comment
       * @param {Requestable.callback} [cb] - will receive true if the request succeeds
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: 'deleteComment',
      value: function deleteComment(comment, cb) {
         return this._request('DELETE', '/gists/' + this.__id + '/comments/' + comment, null, cb);
      }
   }]);

   return Gist;
}(_Requestable3.default);

module.exports = Gist;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpc3QuanMiXSwibmFtZXMiOlsiR2lzdCIsImlkIiwiYXV0aCIsImFwaUJhc2UiLCJfX2lkIiwiY2IiLCJfcmVxdWVzdCIsImdpc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiX3JlcXVlc3QyMDRvcjQwNCIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJyZXZpc2lvbiIsImNvbW1lbnQiLCJib2R5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQU9BOzs7Ozs7Ozs7OytlQVBBOzs7Ozs7O0FBU0E7OztJQUdNQSxJOzs7QUFDSDs7Ozs7O0FBTUEsaUJBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCQyxPQUF0QixFQUErQjtBQUFBOztBQUFBLDhHQUN0QkQsSUFEc0IsRUFDaEJDLE9BRGdCOztBQUU1QixZQUFLQyxJQUFMLEdBQVlILEVBQVo7QUFGNEI7QUFHOUI7O0FBRUQ7Ozs7Ozs7Ozs7MkJBTUtJLEUsRUFBSTtBQUNOLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtGLElBQXBDLEVBQTRDLElBQTVDLEVBQWtEQyxFQUFsRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7NkJBT09FLEksRUFBTUYsRSxFQUFJO0FBQUE7O0FBQ2QsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsRUFBc0IsUUFBdEIsRUFBZ0NDLElBQWhDLEVBQXNDRixFQUF0QyxFQUNIRyxJQURHLENBQ0UsVUFBQ0MsUUFBRCxFQUFjO0FBQ2pCLG1CQUFLTCxJQUFMLEdBQVlLLFNBQVNDLElBQVQsQ0FBY1QsRUFBMUI7QUFDQSxtQkFBT1EsUUFBUDtBQUNGLFVBSkcsQ0FBUDtBQUtGOztBQUVEOzs7Ozs7Ozs7OEJBTU9KLEUsRUFBSTtBQUNSLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtGLElBQXZDLEVBQStDLElBQS9DLEVBQXFEQyxFQUFyRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OzsyQkFNS0EsRSxFQUFJO0FBQ04sZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0YsSUFBckMsYUFBbUQsSUFBbkQsRUFBeURDLEVBQXpELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs2QkFPT0UsSSxFQUFNRixFLEVBQUk7QUFDZCxnQkFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLRixJQUF0QyxFQUE4Q0csSUFBOUMsRUFBb0RGLEVBQXBELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzJCQU1LQSxFLEVBQUk7QUFDTixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixJQUFwQyxZQUFpRCxJQUFqRCxFQUF1REMsRUFBdkQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7NkJBTU9BLEUsRUFBSTtBQUNSLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtGLElBQXZDLFlBQW9ELElBQXBELEVBQTBEQyxFQUExRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztnQ0FNVUEsRSxFQUFJO0FBQ1gsZ0JBQU8sS0FBS00sZ0JBQUwsYUFBZ0MsS0FBS1AsSUFBckMsWUFBa0QsSUFBbEQsRUFBd0RDLEVBQXhELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7O2tDQU1ZQSxFLEVBQUk7QUFDYixnQkFBTyxLQUFLTyxnQkFBTCxhQUFnQyxLQUFLUixJQUFyQyxlQUFxRCxJQUFyRCxFQUEyREMsRUFBM0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O2tDQU9ZUSxRLEVBQVVSLEUsRUFBSTtBQUN2QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixJQUFwQyxTQUE0Q1MsUUFBNUMsRUFBd0QsSUFBeEQsRUFBOERSLEVBQTlELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7O21DQU1hQSxFLEVBQUk7QUFDZCxnQkFBTyxLQUFLTyxnQkFBTCxhQUFnQyxLQUFLUixJQUFyQyxnQkFBc0QsSUFBdEQsRUFBNERDLEVBQTVELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztpQ0FPV1MsTyxFQUFTVCxFLEVBQUk7QUFDckIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0YsSUFBcEMsa0JBQXFEVSxPQUFyRCxFQUFnRSxJQUFoRSxFQUFzRVQsRUFBdEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O29DQU9jUyxPLEVBQVNULEUsRUFBSTtBQUN4QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxjQUFnQyxLQUFLRixJQUFyQyxnQkFBc0QsRUFBQ1csTUFBTUQsT0FBUCxFQUF0RCxFQUF1RVQsRUFBdkUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7OztrQ0FRWVMsTyxFQUFTQyxJLEVBQU1WLEUsRUFBSTtBQUM1QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLRixJQUF0QyxrQkFBdURVLE9BQXZELEVBQWtFLEVBQUNDLE1BQU1BLElBQVAsRUFBbEUsRUFBZ0ZWLEVBQWhGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztvQ0FPY1MsTyxFQUFTVCxFLEVBQUk7QUFDeEIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLFFBQWQsY0FBa0MsS0FBS0YsSUFBdkMsa0JBQXdEVSxPQUF4RCxFQUFtRSxJQUFuRSxFQUF5RVQsRUFBekUsQ0FBUDtBQUNGOzs7Ozs7QUFHSlcsT0FBT0MsT0FBUCxHQUFpQmpCLElBQWpCIiwiZmlsZSI6Ikdpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5cclxuLyoqXHJcbiAqIEEgR2lzdCBjYW4gcmV0cmlldmUgYW5kIG1vZGlmeSBnaXN0cy5cclxuICovXHJcbmNsYXNzIEdpc3QgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBHaXN0LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIGdpc3QgKG5vdCByZXF1aXJlZCB3aGVuIGNyZWF0aW5nIGEgZ2lzdClcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXHJcbiAgICAqL1xyXG4gICBjb25zdHJ1Y3RvcihpZCwgYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgICAgdGhpcy5fX2lkID0gaWQ7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBGZXRjaCBhIGdpc3QuXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jZ2V0LWEtc2luZ2xlLWdpc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgZ2lzdFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICByZWFkKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2NyZWF0ZS1hLWdpc3RcclxuICAgICogQHBhcmFtIHtPYmplY3R9IGdpc3QgLSB0aGUgZGF0YSBmb3IgdGhlIG5ldyBnaXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBnaXN0IHVwb24gY3JlYXRpb25cclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlKGdpc3QsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgJy9naXN0cycsIGdpc3QsIGNiKVxyXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fX2lkID0gcmVzcG9uc2UuZGF0YS5pZDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBhIGdpc3QuXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jZGVsZXRlLWEtZ2lzdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEZvcmsgYSBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2ZvcmstYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdGhhdCB3aWxsIHJlY2VpdmUgdGhlIGdpc3RcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZm9yayhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvZ2lzdHMvJHt0aGlzLl9faWR9L2ZvcmtzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogVXBkYXRlIGEgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNlZGl0LWEtZ2lzdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZ2lzdCAtIHRoZSBuZXcgZGF0YSBmb3IgdGhlIGdpc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBBUEkgcmVzdWx0XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVwZGF0ZShnaXN0LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfWAsIGdpc3QsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFN0YXIgYSBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI3N0YXItYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHN0YXIoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvZ2lzdHMvJHt0aGlzLl9faWR9L3N0YXJgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBVbnN0YXIgYSBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI3Vuc3Rhci1hLWdpc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgdW5zdGFyKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9zdGFyYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ2hlY2sgaWYgYSBnaXN0IGlzIHN0YXJyZWQgYnkgdGhlIHVzZXIuXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jY2hlY2staWYtYS1naXN0LWlzLXN0YXJyZWRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBnaXN0IGlzIHN0YXJyZWQgYW5kIGZhbHNlIGlmIHRoZSBnaXN0IGlzIG5vdCBzdGFycmVkXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGlzU3RhcnJlZChjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvZ2lzdHMvJHt0aGlzLl9faWR9L3N0YXJgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBnaXN0J3MgY29tbWl0c1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2xpc3QtZ2lzdC1jb21taXRzXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGNvbW1pdHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdENvbW1pdHMoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL2dpc3RzLyR7dGhpcy5fX2lkfS9jb21taXRzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRmV0Y2ggb25lIG9mIHRoZSBnaXN0J3MgcmV2aXNpb24uXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jZ2V0LWEtc3BlY2lmaWMtcmV2aXNpb24tb2YtYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXZpc2lvbiAtIHRoZSBpZCBvZiB0aGUgcmV2aXNpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmV2aXNpb25cclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0UmV2aXNpb24ocmV2aXNpb24sIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS8ke3JldmlzaW9ufWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIGdpc3QncyBjb21tZW50c1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvY29tbWVudHMvI2xpc3QtY29tbWVudHMtb24tYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGNvbW1lbnRzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RDb21tZW50cyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvZ2lzdHMvJHt0aGlzLl9faWR9L2NvbW1lbnRzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRmV0Y2ggb25lIG9mIHRoZSBnaXN0J3MgY29tbWVudHNcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNnZXQtYS1zaW5nbGUtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29tbWVudCAtIHRoZSBpZCBvZiB0aGUgY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb21tZW50XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldENvbW1lbnQoY29tbWVudCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvZ2lzdHMvJHt0aGlzLl9faWR9L2NvbW1lbnRzLyR7Y29tbWVudH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDb21tZW50IG9uIGEgZ2lzdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvY29tbWVudHMvI2NyZWF0ZS1hLWNvbW1lbnRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgLSB0aGUgY29tbWVudCB0byBhZGRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBBUEkgcmVzdWx0XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZUNvbW1lbnQoY29tbWVudCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9jb21tZW50c2AsIHtib2R5OiBjb21tZW50fSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRWRpdCBhIGNvbW1lbnQgb24gdGhlIGdpc3RcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNlZGl0LWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29tbWVudCAtIHRoZSBpZCBvZiB0aGUgY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIHRoZSBuZXcgY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCBjb21tZW50XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGVkaXRDb21tZW50KGNvbW1lbnQsIGJvZHksIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvZ2lzdHMvJHt0aGlzLl9faWR9L2NvbW1lbnRzLyR7Y29tbWVudH1gLCB7Ym9keTogYm9keX0sIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBhIGNvbW1lbnQgb24gdGhlIGdpc3QuXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy9jb21tZW50cy8jZGVsZXRlLWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29tbWVudCAtIHRoZSBpZCBvZiB0aGUgY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlQ29tbWVudChjb21tZW50LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHMvJHtjb21tZW50fWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdpc3Q7XHJcbiJdfQ==
//# sourceMappingURL=Gist.js.map
