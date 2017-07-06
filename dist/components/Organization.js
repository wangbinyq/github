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
 * Organization encapsulates the functionality to create repositories in organizations
 */
var Organization = function (_Requestable) {
   _inherits(Organization, _Requestable);

   /**
    * Create a new Organization
    * @param {string} organization - the name of the organization
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Organization(organization, auth, apiBase) {
      _classCallCheck(this, Organization);

      var _this = _possibleConstructorReturn(this, (Organization.__proto__ || Object.getPrototypeOf(Organization)).call(this, auth, apiBase));

      _this.__name = organization;
      return _this;
   }

   /**
    * Create a repository in an organization
    * @see https://developer.github.com/v3/repos/#create
    * @param {Object} options - the repository definition
    * @param {Requestable.callback} [cb] - will receive the created repository
    * @return {Promise} - the promise for the http request
    */


   _createClass(Organization, [{
      key: 'createRepo',
      value: function createRepo(options, cb) {
         return this._request('POST', '/orgs/' + this.__name + '/repos', options, cb);
      }

      /**
       * List the repositories in an organization
       * @see https://developer.github.com/v3/repos/#list-organization-repositories
       * @param {Requestable.callback} [cb] - will receive the list of repositories
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getRepos',
      value: function getRepos(cb) {
         var requestOptions = this._getOptionsWithDefaults({ direction: 'desc' });

         return this._requestAllPages('/orgs/' + this.__name + '/repos', requestOptions, cb);
      }

      /**
       * Query if the user is a member or not
       * @param {string} username - the user in question
       * @param {Requestable.callback} [cb] - will receive true if the user is a member
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'isMember',
      value: function isMember(username, cb) {
         return this._request204or404('/orgs/' + this.__name + '/members/' + username, null, cb);
      }

      /**
       * List the users who are members of the company
       * @see https://developer.github.com/v3/orgs/members/#members-list
       * @param {object} options - filtering options
       * @param {string} [options.filter=all] - can be either `2fa_disabled` or `all`
       * @param {string} [options.role=all] - can be one of: `all`, `admin`, or `member`
       * @param {Requestable.callback} [cb] - will receive the list of users
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listMembers',
      value: function listMembers(options, cb) {
         return this._request('GET', '/orgs/' + this.__name + '/members', options, cb);
      }

      /**
       * List the Teams in the Organization
       * @see https://developer.github.com/v3/orgs/teams/#list-teams
       * @param {Requestable.callback} [cb] - will receive the list of teams
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getTeams',
      value: function getTeams(cb) {
         return this._requestAllPages('/orgs/' + this.__name + '/teams', undefined, cb);
      }

      /**
       * Create a team
       * @see https://developer.github.com/v3/orgs/teams/#create-team
       * @param {object} options - Team creation parameters
       * @param {string} options.name - The name of the team
       * @param {string} [options.description] - Team description
       * @param {string} [options.repo_names] - Repos to add the team to
       * @param {string} [options.privacy=secret] - The level of privacy the team should have. Can be either one
       * of: `secret`, or `closed`
       * @param {Requestable.callback} [cb] - will receive the created team
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createTeam',
      value: function createTeam(options, cb) {
         return this._request('POST', '/orgs/' + this.__name + '/teams', options, cb);
      }

      /**
       * Get information about all projects
       * @see https://developer.github.com/v3/projects/#list-organization-projects
       * @param {Requestable.callback} [cb] - will receive the list of projects
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjects',
      value: function listProjects(cb) {
         return this._requestAllPages('/orgs/' + this.__name + '/projects', { AcceptHeader: 'inertia-preview' }, cb);
      }

      /**
       * Create a new project
       * @see https://developer.github.com/v3/repos/projects/#create-a-project
       * @param {Object} options - the description of the project
       * @param {Requestable.callback} cb - will receive the newly created project
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createProject',
      value: function createProject(options, cb) {
         options = options || {};
         options.AcceptHeader = 'inertia-preview';
         return this._request('POST', '/orgs/' + this.__name + '/projects', options, cb);
      }
   }]);

   return Organization;
}(_Requestable3.default);

module.exports = Organization;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZ2FuaXphdGlvbi5qcyJdLCJuYW1lcyI6WyJPcmdhbml6YXRpb24iLCJvcmdhbml6YXRpb24iLCJhdXRoIiwiYXBpQmFzZSIsIl9fbmFtZSIsIm9wdGlvbnMiLCJjYiIsIl9yZXF1ZXN0IiwicmVxdWVzdE9wdGlvbnMiLCJfZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyIsImRpcmVjdGlvbiIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJ1c2VybmFtZSIsIl9yZXF1ZXN0MjA0b3I0MDQiLCJ1bmRlZmluZWQiLCJBY2NlcHRIZWFkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7Ozs7Ozs7K2VBUEE7Ozs7Ozs7QUFTQTs7O0lBR01BLFk7OztBQUNIOzs7Ozs7QUFNQSx5QkFBWUMsWUFBWixFQUEwQkMsSUFBMUIsRUFBZ0NDLE9BQWhDLEVBQXlDO0FBQUE7O0FBQUEsOEhBQ2hDRCxJQURnQyxFQUMxQkMsT0FEMEI7O0FBRXRDLFlBQUtDLE1BQUwsR0FBY0gsWUFBZDtBQUZzQztBQUd4Qzs7QUFFRDs7Ozs7Ozs7Ozs7aUNBT1dJLE8sRUFBU0MsRSxFQUFJO0FBQ3JCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGFBQStCLEtBQUtILE1BQXBDLGFBQW9EQyxPQUFwRCxFQUE2REMsRUFBN0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7K0JBTVNBLEUsRUFBSTtBQUNWLGFBQUlFLGlCQUFpQixLQUFLQyx1QkFBTCxDQUE2QixFQUFDQyxXQUFXLE1BQVosRUFBN0IsQ0FBckI7O0FBRUEsZ0JBQU8sS0FBS0MsZ0JBQUwsWUFBK0IsS0FBS1AsTUFBcEMsYUFBb0RJLGNBQXBELEVBQW9FRixFQUFwRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OzsrQkFNU00sUSxFQUFVTixFLEVBQUk7QUFDcEIsZ0JBQU8sS0FBS08sZ0JBQUwsWUFBK0IsS0FBS1QsTUFBcEMsaUJBQXNEUSxRQUF0RCxFQUFrRSxJQUFsRSxFQUF3RU4sRUFBeEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7a0NBU1lELE8sRUFBU0MsRSxFQUFJO0FBQ3RCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGFBQThCLEtBQUtILE1BQW5DLGVBQXFEQyxPQUFyRCxFQUE4REMsRUFBOUQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7K0JBTVNBLEUsRUFBSTtBQUNWLGdCQUFPLEtBQUtLLGdCQUFMLFlBQStCLEtBQUtQLE1BQXBDLGFBQW9EVSxTQUFwRCxFQUErRFIsRUFBL0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7aUNBWVdELE8sRUFBU0MsRSxFQUFJO0FBQ3JCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGFBQStCLEtBQUtILE1BQXBDLGFBQW9EQyxPQUFwRCxFQUE2REMsRUFBN0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7bUNBTWFBLEUsRUFBSTtBQUNkLGdCQUFPLEtBQUtLLGdCQUFMLFlBQStCLEtBQUtQLE1BQXBDLGdCQUF1RCxFQUFDVyxjQUFjLGlCQUFmLEVBQXZELEVBQTBGVCxFQUExRixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7b0NBT2NELE8sRUFBU0MsRSxFQUFJO0FBQ3hCRCxtQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxpQkFBUVUsWUFBUixHQUF1QixpQkFBdkI7QUFDQSxnQkFBTyxLQUFLUixRQUFMLENBQWMsTUFBZCxhQUErQixLQUFLSCxNQUFwQyxnQkFBdURDLE9BQXZELEVBQWdFQyxFQUFoRSxDQUFQO0FBQ0Y7Ozs7OztBQUdKVSxPQUFPQyxPQUFQLEdBQWlCakIsWUFBakIiLCJmaWxlIjoiT3JnYW5pemF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cclxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cclxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcclxuXHJcbi8qKlxyXG4gKiBPcmdhbml6YXRpb24gZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSByZXBvc2l0b3JpZXMgaW4gb3JnYW5pemF0aW9uc1xyXG4gKi9cclxuY2xhc3MgT3JnYW5pemF0aW9uIGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IE9yZ2FuaXphdGlvblxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3JnYW5pemF0aW9uIC0gdGhlIG5hbWUgb2YgdGhlIG9yZ2FuaXphdGlvblxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKG9yZ2FuaXphdGlvbiwgYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgICAgdGhpcy5fX25hbWUgPSBvcmdhbml6YXRpb247XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSByZXBvc2l0b3J5IGluIGFuIG9yZ2FuaXphdGlvblxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2NyZWF0ZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSByZXBvc2l0b3J5IGRlZmluaXRpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCByZXBvc2l0b3J5XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZVJlcG8ob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vcmVwb3NgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSByZXBvc2l0b3JpZXMgaW4gYW4gb3JnYW5pemF0aW9uXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1vcmdhbml6YXRpb24tcmVwb3NpdG9yaWVzXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldFJlcG9zKGNiKSB7XHJcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoe2RpcmVjdGlvbjogJ2Rlc2MnfSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvb3Jncy8ke3RoaXMuX19uYW1lfS9yZXBvc2AsIHJlcXVlc3RPcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBRdWVyeSBpZiB0aGUgdXNlciBpcyBhIG1lbWJlciBvciBub3RcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgaW4gcXVlc3Rpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSB1c2VyIGlzIGEgbWVtYmVyXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGlzTWVtYmVyKHVzZXJuYW1lLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvb3Jncy8ke3RoaXMuX19uYW1lfS9tZW1iZXJzLyR7dXNlcm5hbWV9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgdXNlcnMgd2hvIGFyZSBtZW1iZXJzIG9mIHRoZSBjb21wYW55XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL21lbWJlcnMvI21lbWJlcnMtbGlzdFxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5maWx0ZXI9YWxsXSAtIGNhbiBiZSBlaXRoZXIgYDJmYV9kaXNhYmxlZGAgb3IgYGFsbGBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJvbGU9YWxsXSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgYWRtaW5gLCBvciBgbWVtYmVyYFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHVzZXJzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RNZW1iZXJzKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vbWVtYmVyc2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIFRlYW1zIGluIHRoZSBPcmdhbml6YXRpb25cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2xpc3QtdGVhbXNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiB0ZWFtc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRUZWFtcyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvb3Jncy8ke3RoaXMuX19uYW1lfS90ZWFtc2AsIHVuZGVmaW5lZCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgdGVhbVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jY3JlYXRlLXRlYW1cclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUZWFtIGNyZWF0aW9uIHBhcmFtZXRlcnNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0ZWFtXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kZXNjcmlwdGlvbl0gLSBUZWFtIGRlc2NyaXB0aW9uXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5yZXBvX25hbWVzXSAtIFJlcG9zIHRvIGFkZCB0aGUgdGVhbSB0b1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucHJpdmFjeT1zZWNyZXRdIC0gVGhlIGxldmVsIG9mIHByaXZhY3kgdGhlIHRlYW0gc2hvdWxkIGhhdmUuIENhbiBiZSBlaXRoZXIgb25lXHJcbiAgICAqIG9mOiBgc2VjcmV0YCwgb3IgYGNsb3NlZGBcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCB0ZWFtXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZVRlYW0ob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vdGVhbXNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIHByb2plY3RzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jbGlzdC1vcmdhbml6YXRpb24tcHJvamVjdHNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBwcm9qZWN0c1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0UHJvamVjdHMoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL29yZ3MvJHt0aGlzLl9fbmFtZX0vcHJvamVjdHNgLCB7QWNjZXB0SGVhZGVyOiAnaW5lcnRpYS1wcmV2aWV3J30sIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBwcm9qZWN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9wcm9qZWN0cy8jY3JlYXRlLWEtcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZVByb2plY3Qob3B0aW9ucywgY2IpIHtcclxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgIG9wdGlvbnMuQWNjZXB0SGVhZGVyID0gJ2luZXJ0aWEtcHJldmlldyc7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9vcmdzLyR7dGhpcy5fX25hbWV9L3Byb2plY3RzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT3JnYW5pemF0aW9uO1xyXG4iXX0=
//# sourceMappingURL=Organization.js.map
