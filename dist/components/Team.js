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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2016 Matt Smith (Development Seed)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:team');

/**
 * A Team allows scoping of API requests to a particular Github Organization Team.
 */

var Team = function (_Requestable) {
   _inherits(Team, _Requestable);

   /**
    * Create a Team.
    * @param {string} [teamId] - the id for the team
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Team(teamId, auth, apiBase) {
      _classCallCheck(this, Team);

      var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, auth, apiBase));

      _this.__teamId = teamId;
      return _this;
   }

   /**
    * Get Team information
    * @see https://developer.github.com/v3/orgs/teams/#get-team
    * @param {Requestable.callback} [cb] - will receive the team
    * @return {Promise} - the promise for the http request
    */


   _createClass(Team, [{
      key: 'getTeam',
      value: function getTeam(cb) {
         log('Fetching Team ' + this.__teamId);
         return this._request('Get', '/teams/' + this.__teamId, undefined, cb);
      }

      /**
       * List the Team's repositories
       * @see https://developer.github.com/v3/orgs/teams/#list-team-repos
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listRepos',
      value: function listRepos(cb) {
         log('Fetching repositories for Team ' + this.__teamId);
         return this._requestAllPages('/teams/' + this.__teamId + '/repos', undefined, cb);
      }

      /**
       * Edit Team information
       * @see https://developer.github.com/v3/orgs/teams/#edit-team
       * @param {object} options - Parameters for team edit
       * @param {string} options.name - The name of the team
       * @param {string} [options.description] - Team description
       * @param {string} [options.repo_names] - Repos to add the team to
       * @param {string} [options.privacy=secret] - The level of privacy the team should have. Can be either one
       * of: `secret`, or `closed`
       * @param {Requestable.callback} [cb] - will receive the updated team
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editTeam',
      value: function editTeam(options, cb) {
         log('Editing Team ' + this.__teamId);
         return this._request('PATCH', '/teams/' + this.__teamId, options, cb);
      }

      /**
       * List the users who are members of the Team
       * @see https://developer.github.com/v3/orgs/teams/#list-team-members
       * @param {object} options - Parameters for listing team users
       * @param {string} [options.role=all] - can be one of: `all`, `maintainer`, or `member`
       * @param {Requestable.callback} [cb] - will receive the list of users
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listMembers',
      value: function listMembers(options, cb) {
         log('Getting members of Team ' + this.__teamId);
         return this._requestAllPages('/teams/' + this.__teamId + '/members', options, cb);
      }

      /**
       * Get Team membership status for a user
       * @see https://developer.github.com/v3/orgs/teams/#get-team-membership
       * @param {string} username - can be one of: `all`, `maintainer`, or `member`
       * @param {Requestable.callback} [cb] - will receive the membership status of a user
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getMembership',
      value: function getMembership(username, cb) {
         log('Getting membership of user ' + username + ' in Team ' + this.__teamId);
         return this._request('GET', '/teams/' + this.__teamId + '/memberships/' + username, undefined, cb);
      }

      /**
       * Add a member to the Team
       * @see https://developer.github.com/v3/orgs/teams/#add-team-membership
       * @param {string} username - can be one of: `all`, `maintainer`, or `member`
       * @param {object} options - Parameters for adding a team member
       * @param {string} [options.role=member] - The role that this user should have in the team. Can be one
       * of: `member`, or `maintainer`
       * @param {Requestable.callback} [cb] - will receive the membership status of added user
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'addMembership',
      value: function addMembership(username, options, cb) {
         log('Adding user ' + username + ' to Team ' + this.__teamId);
         return this._request('PUT', '/teams/' + this.__teamId + '/memberships/' + username, options, cb);
      }

      /**
       * Get repo management status for team
       * @see https://developer.github.com/v3/orgs/teams/#remove-team-membership
       * @param {string} owner - Organization name
       * @param {string} repo - Repo name
       * @param {Requestable.callback} [cb] - will receive the membership status of added user
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'isManagedRepo',
      value: function isManagedRepo(owner, repo, cb) {
         log('Getting repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
         return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb);
      }

      /**
       * Add or Update repo management status for team
       * @see https://developer.github.com/v3/orgs/teams/#add-or-update-team-repository
       * @param {string} owner - Organization name
       * @param {string} repo - Repo name
       * @param {object} options - Parameters for adding or updating repo management for the team
       * @param {string} [options.permission] - The permission to grant the team on this repository. Can be one
       * of: `pull`, `push`, or `admin`
       * @param {Requestable.callback} [cb] - will receive the membership status of added user
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'manageRepo',
      value: function manageRepo(owner, repo, options, cb) {
         log('Adding or Updating repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
         return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, options, cb, 'PUT');
      }

      /**
       * Remove repo management status for team
       * @see https://developer.github.com/v3/orgs/teams/#remove-team-repository
       * @param {string} owner - Organization name
       * @param {string} repo - Repo name
       * @param {Requestable.callback} [cb] - will receive the membership status of added user
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'unmanageRepo',
      value: function unmanageRepo(owner, repo, cb) {
         log('Remove repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
         return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb, 'DELETE');
      }

      /**
       * Delete Team
       * @see https://developer.github.com/v3/orgs/teams/#delete-team
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteTeam',
      value: function deleteTeam(cb) {
         log('Deleting Team ' + this.__teamId);
         return this._request204or404('/teams/' + this.__teamId, undefined, cb, 'DELETE');
      }
   }]);

   return Team;
}(_Requestable3.default);

module.exports = Team;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlYW0uanMiXSwibmFtZXMiOlsibG9nIiwiVGVhbSIsInRlYW1JZCIsImF1dGgiLCJhcGlCYXNlIiwiX190ZWFtSWQiLCJjYiIsIl9yZXF1ZXN0IiwidW5kZWZpbmVkIiwiX3JlcXVlc3RBbGxQYWdlcyIsIm9wdGlvbnMiLCJ1c2VybmFtZSIsIm93bmVyIiwicmVwbyIsIl9yZXF1ZXN0MjA0b3I0MDQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFSQTs7Ozs7OztBQVNBLElBQU1BLE1BQU0scUJBQU0sYUFBTixDQUFaOztBQUVBOzs7O0lBR01DLEk7OztBQUNIOzs7Ozs7QUFNQSxpQkFBWUMsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEJDLE9BQTFCLEVBQW1DO0FBQUE7O0FBQUEsOEdBQzFCRCxJQUQwQixFQUNwQkMsT0FEb0I7O0FBRWhDLFlBQUtDLFFBQUwsR0FBZ0JILE1BQWhCO0FBRmdDO0FBR2xDOztBQUVEOzs7Ozs7Ozs7OzhCQU1RSSxFLEVBQUk7QUFDVE4sZ0NBQXFCLEtBQUtLLFFBQTFCO0FBQ0EsZ0JBQU8sS0FBS0UsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0YsUUFBcEMsRUFBZ0RHLFNBQWhELEVBQTJERixFQUEzRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztnQ0FNVUEsRSxFQUFJO0FBQ1hOLGlEQUFzQyxLQUFLSyxRQUEzQztBQUNBLGdCQUFPLEtBQUtJLGdCQUFMLGFBQWdDLEtBQUtKLFFBQXJDLGFBQXVERyxTQUF2RCxFQUFrRUYsRUFBbEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7K0JBWVNJLE8sRUFBU0osRSxFQUFJO0FBQ25CTiwrQkFBb0IsS0FBS0ssUUFBekI7QUFDQSxnQkFBTyxLQUFLRSxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLRixRQUF0QyxFQUFrREssT0FBbEQsRUFBMkRKLEVBQTNELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7a0NBUVlJLE8sRUFBU0osRSxFQUFJO0FBQ3RCTiwwQ0FBK0IsS0FBS0ssUUFBcEM7QUFDQSxnQkFBTyxLQUFLSSxnQkFBTCxhQUFnQyxLQUFLSixRQUFyQyxlQUF5REssT0FBekQsRUFBa0VKLEVBQWxFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztvQ0FPY0ssUSxFQUFVTCxFLEVBQUk7QUFDekJOLDZDQUFrQ1csUUFBbEMsaUJBQXNELEtBQUtOLFFBQTNEO0FBQ0EsZ0JBQU8sS0FBS0UsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0YsUUFBcEMscUJBQTRETSxRQUE1RCxFQUF3RUgsU0FBeEUsRUFBbUZGLEVBQW5GLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7OztvQ0FVY0ssUSxFQUFVRCxPLEVBQVNKLEUsRUFBSTtBQUNsQ04sOEJBQW1CVyxRQUFuQixpQkFBdUMsS0FBS04sUUFBNUM7QUFDQSxnQkFBTyxLQUFLRSxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixRQUFwQyxxQkFBNERNLFFBQTVELEVBQXdFRCxPQUF4RSxFQUFpRkosRUFBakYsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7OztvQ0FRY00sSyxFQUFPQyxJLEVBQU1QLEUsRUFBSTtBQUM1Qk4sa0RBQXVDLEtBQUtLLFFBQTVDLGtCQUFpRU8sS0FBakUsU0FBMEVDLElBQTFFO0FBQ0EsZ0JBQU8sS0FBS0MsZ0JBQUwsYUFBZ0MsS0FBS1QsUUFBckMsZUFBdURPLEtBQXZELFNBQWdFQyxJQUFoRSxFQUF3RUwsU0FBeEUsRUFBbUZGLEVBQW5GLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7aUNBV1dNLEssRUFBT0MsSSxFQUFNSCxPLEVBQVNKLEUsRUFBSTtBQUNsQ04sNkRBQWtELEtBQUtLLFFBQXZELGtCQUE0RU8sS0FBNUUsU0FBcUZDLElBQXJGO0FBQ0EsZ0JBQU8sS0FBS0MsZ0JBQUwsYUFBZ0MsS0FBS1QsUUFBckMsZUFBdURPLEtBQXZELFNBQWdFQyxJQUFoRSxFQUF3RUgsT0FBeEUsRUFBaUZKLEVBQWpGLEVBQXFGLEtBQXJGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7bUNBUWFNLEssRUFBT0MsSSxFQUFNUCxFLEVBQUk7QUFDM0JOLGlEQUFzQyxLQUFLSyxRQUEzQyxrQkFBZ0VPLEtBQWhFLFNBQXlFQyxJQUF6RTtBQUNBLGdCQUFPLEtBQUtDLGdCQUFMLGFBQWdDLEtBQUtULFFBQXJDLGVBQXVETyxLQUF2RCxTQUFnRUMsSUFBaEUsRUFBd0VMLFNBQXhFLEVBQW1GRixFQUFuRixFQUF1RixRQUF2RixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OztpQ0FNV0EsRSxFQUFJO0FBQ1pOLGdDQUFxQixLQUFLSyxRQUExQjtBQUNBLGdCQUFPLEtBQUtTLGdCQUFMLGFBQWdDLEtBQUtULFFBQXJDLEVBQWlERyxTQUFqRCxFQUE0REYsRUFBNUQsRUFBZ0UsUUFBaEUsQ0FBUDtBQUNGOzs7Ozs7QUFHSlMsT0FBT0MsT0FBUCxHQUFpQmYsSUFBakIiLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDE2IE1hdHQgU21pdGggKERldmVsb3BtZW50IFNlZWQpXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XHJcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6dGVhbScpO1xyXG5cclxuLyoqXHJcbiAqIEEgVGVhbSBhbGxvd3Mgc2NvcGluZyBvZiBBUEkgcmVxdWVzdHMgdG8gYSBwYXJ0aWN1bGFyIEdpdGh1YiBPcmdhbml6YXRpb24gVGVhbS5cclxuICovXHJcbmNsYXNzIFRlYW0gZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBUZWFtLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3RlYW1JZF0gLSB0aGUgaWQgZm9yIHRoZSB0ZWFtXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IodGVhbUlkLCBhdXRoLCBhcGlCYXNlKSB7XHJcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xyXG4gICAgICB0aGlzLl9fdGVhbUlkID0gdGVhbUlkO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IFRlYW0gaW5mb3JtYXRpb25cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2dldC10ZWFtXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHRlYW1cclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0VGVhbShjYikge1xyXG4gICAgICBsb2coYEZldGNoaW5nIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR2V0JywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9YCwgdW5kZWZpbmVkLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBUZWFtJ3MgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNsaXN0LXRlYW0tcmVwb3NcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiByZXBvc2l0b3JpZXNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdFJlcG9zKGNiKSB7XHJcbiAgICAgIGxvZyhgRmV0Y2hpbmcgcmVwb3NpdG9yaWVzIGZvciBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3NgLCB1bmRlZmluZWQsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEVkaXQgVGVhbSBpbmZvcm1hdGlvblxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jZWRpdC10ZWFtXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgdGVhbSBlZGl0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGVhbVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gVGVhbSBkZXNjcmlwdGlvblxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucmVwb19uYW1lc10gLSBSZXBvcyB0byBhZGQgdGhlIHRlYW0gdG9cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnByaXZhY3k9c2VjcmV0XSAtIFRoZSBsZXZlbCBvZiBwcml2YWN5IHRoZSB0ZWFtIHNob3VsZCBoYXZlLiBDYW4gYmUgZWl0aGVyIG9uZVxyXG4gICAgKiBvZjogYHNlY3JldGAsIG9yIGBjbG9zZWRgXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgdGVhbVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBlZGl0VGVhbShvcHRpb25zLCBjYikge1xyXG4gICAgICBsb2coYEVkaXRpbmcgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfWAsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIHVzZXJzIHdobyBhcmUgbWVtYmVycyBvZiB0aGUgVGVhbVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jbGlzdC10ZWFtLW1lbWJlcnNcclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBsaXN0aW5nIHRlYW0gdXNlcnNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJvbGU9YWxsXSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgdXNlcnNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdE1lbWJlcnMob3B0aW9ucywgY2IpIHtcclxuICAgICAgbG9nKGBHZXR0aW5nIG1lbWJlcnMgb2YgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgVGVhbSBtZW1iZXJzaGlwIHN0YXR1cyBmb3IgYSB1c2VyXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNnZXQtdGVhbS1tZW1iZXJzaGlwXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGEgdXNlclxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRNZW1iZXJzaGlwKHVzZXJuYW1lLCBjYikge1xyXG4gICAgICBsb2coYEdldHRpbmcgbWVtYmVyc2hpcCBvZiB1c2VyICR7dXNlcm5hbWV9IGluIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNoaXBzLyR7dXNlcm5hbWV9YCwgdW5kZWZpbmVkLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBBZGQgYSBtZW1iZXIgdG8gdGhlIFRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2FkZC10ZWFtLW1lbWJlcnNoaXBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gY2FuIGJlIG9uZSBvZjogYGFsbGAsIGBtYWludGFpbmVyYCwgb3IgYG1lbWJlcmBcclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBhZGRpbmcgYSB0ZWFtIG1lbWJlclxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucm9sZT1tZW1iZXJdIC0gVGhlIHJvbGUgdGhhdCB0aGlzIHVzZXIgc2hvdWxkIGhhdmUgaW4gdGhlIHRlYW0uIENhbiBiZSBvbmVcclxuICAgICogb2Y6IGBtZW1iZXJgLCBvciBgbWFpbnRhaW5lcmBcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVtYmVyc2hpcCBzdGF0dXMgb2YgYWRkZWQgdXNlclxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBhZGRNZW1iZXJzaGlwKHVzZXJuYW1lLCBvcHRpb25zLCBjYikge1xyXG4gICAgICBsb2coYEFkZGluZyB1c2VyICR7dXNlcm5hbWV9IHRvIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNoaXBzLyR7dXNlcm5hbWV9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IHJlcG8gbWFuYWdlbWVudCBzdGF0dXMgZm9yIHRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI3JlbW92ZS10ZWFtLW1lbWJlcnNoaXBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyIC0gT3JnYW5pemF0aW9uIG5hbWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSBSZXBvIG5hbWVcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVtYmVyc2hpcCBzdGF0dXMgb2YgYWRkZWQgdXNlclxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBpc01hbmFnZWRSZXBvKG93bmVyLCByZXBvLCBjYikge1xyXG4gICAgICBsb2coYEdldHRpbmcgcmVwbyBtYW5hZ2VtZW50IGJ5IFRlYW0gJHt0aGlzLl9fdGVhbUlkfSBmb3IgcmVwbyAke293bmVyfS8ke3JlcG99YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L3JlcG9zLyR7b3duZXJ9LyR7cmVwb31gLCB1bmRlZmluZWQsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEFkZCBvciBVcGRhdGUgcmVwbyBtYW5hZ2VtZW50IHN0YXR1cyBmb3IgdGVhbVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jYWRkLW9yLXVwZGF0ZS10ZWFtLXJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyIC0gT3JnYW5pemF0aW9uIG5hbWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSBSZXBvIG5hbWVcclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBhZGRpbmcgb3IgdXBkYXRpbmcgcmVwbyBtYW5hZ2VtZW50IGZvciB0aGUgdGVhbVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGVybWlzc2lvbl0gLSBUaGUgcGVybWlzc2lvbiB0byBncmFudCB0aGUgdGVhbSBvbiB0aGlzIHJlcG9zaXRvcnkuIENhbiBiZSBvbmVcclxuICAgICogb2Y6IGBwdWxsYCwgYHB1c2hgLCBvciBgYWRtaW5gXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbWFuYWdlUmVwbyhvd25lciwgcmVwbywgb3B0aW9ucywgY2IpIHtcclxuICAgICAgbG9nKGBBZGRpbmcgb3IgVXBkYXRpbmcgcmVwbyBtYW5hZ2VtZW50IGJ5IFRlYW0gJHt0aGlzLl9fdGVhbUlkfSBmb3IgcmVwbyAke293bmVyfS8ke3JlcG99YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L3JlcG9zLyR7b3duZXJ9LyR7cmVwb31gLCBvcHRpb25zLCBjYiwgJ1BVVCcpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmVtb3ZlIHJlcG8gbWFuYWdlbWVudCBzdGF0dXMgZm9yIHRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI3JlbW92ZS10ZWFtLXJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyIC0gT3JnYW5pemF0aW9uIG5hbWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSBSZXBvIG5hbWVcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVtYmVyc2hpcCBzdGF0dXMgb2YgYWRkZWQgdXNlclxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1bm1hbmFnZVJlcG8ob3duZXIsIHJlcG8sIGNiKSB7XHJcbiAgICAgIGxvZyhgUmVtb3ZlIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9yZXBvcy8ke293bmVyfS8ke3JlcG99YCwgdW5kZWZpbmVkLCBjYiwgJ0RFTEVURScpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIFRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2RlbGV0ZS10ZWFtXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGRlbGV0ZVRlYW0oY2IpIHtcclxuICAgICAgbG9nKGBEZWxldGluZyBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH1gLCB1bmRlZmluZWQsIGNiLCAnREVMRVRFJyk7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZWFtO1xyXG4iXX0=
//# sourceMappingURL=Team.js.map
