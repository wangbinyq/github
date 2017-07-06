'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

var _Gist = require('./Gist');

var _Gist2 = _interopRequireDefault(_Gist);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _Issue = require('./Issue');

var _Issue2 = _interopRequireDefault(_Issue);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _RateLimit = require('./RateLimit');

var _RateLimit2 = _interopRequireDefault(_RateLimit);

var _Repository = require('./Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _Organization = require('./Organization');

var _Organization2 = _interopRequireDefault(_Organization);

var _Team = require('./Team');

var _Team2 = _interopRequireDefault(_Team);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * GitHub encapsulates the functionality to create various API wrapper objects.
 */
var GitHub = function () {
   /**
    * Create a new GitHub.
    * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
    *                                  not provided requests will be made unauthenticated
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function GitHub(auth) {
      var apiBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://api.github.com';

      _classCallCheck(this, GitHub);

      this.__apiBase = apiBase;
      this.__auth = auth || {};
   }

   /**
    * Create a new Gist wrapper
    * @param {number} [id] - the id for the gist, leave undefined when creating a new gist
    * @return {Gist}
    */


   _createClass(GitHub, [{
      key: 'getGist',
      value: function getGist(id) {
         return new _Gist2.default(id, this.__auth, this.__apiBase);
      }

      /**
       * Create a new User wrapper
       * @param {string} [user] - the name of the user to get information about
       *                        leave undefined for the authenticated user
       * @return {User}
       */

   }, {
      key: 'getUser',
      value: function getUser(user) {
         return new _User2.default(user, this.__auth, this.__apiBase);
      }

      /**
       * Create a new Organization wrapper
       * @param {string} organization - the name of the organization
       * @return {Organization}
       */

   }, {
      key: 'getOrganization',
      value: function getOrganization(organization) {
         return new _Organization2.default(organization, this.__auth, this.__apiBase);
      }

      /**
       * create a new Team wrapper
       * @param {string} teamId - the name of the team
       * @return {team}
       */

   }, {
      key: 'getTeam',
      value: function getTeam(teamId) {
         return new _Team2.default(teamId, this.__auth, this.__apiBase);
      }

      /**
       * Create a new Repository wrapper
       * @param {string} user - the user who owns the respository
       * @param {string} repo - the name of the repository
       * @return {Repository}
       */

   }, {
      key: 'getRepo',
      value: function getRepo(user, repo) {
         return new _Repository2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
      }

      /**
       * Create a new Issue wrapper
       * @param {string} user - the user who owns the respository
       * @param {string} repo - the name of the repository
       * @return {Issue}
       */

   }, {
      key: 'getIssues',
      value: function getIssues(user, repo) {
         return new _Issue2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
      }

      /**
       * Create a new Search wrapper
       * @param {string} query - the query to search for
       * @return {Search}
       */

   }, {
      key: 'search',
      value: function search(query) {
         return new _Search2.default(query, this.__auth, this.__apiBase);
      }

      /**
       * Create a new RateLimit wrapper
       * @return {RateLimit}
       */

   }, {
      key: 'getRateLimit',
      value: function getRateLimit() {
         return new _RateLimit2.default(this.__auth, this.__apiBase);
      }

      /**
       * Create a new Markdown wrapper
       * @return {Markdown}
       */

   }, {
      key: 'getMarkdown',
      value: function getMarkdown() {
         return new _Markdown2.default(this.__auth, this.__apiBase);
      }

      /**
       * Create a new Project wrapper
       * @param {string} id - the id of the project
       * @return {Project}
       */

   }, {
      key: 'getProject',
      value: function getProject(id) {
         return new _Project2.default(id, this.__auth, this.__apiBase);
      }

      /**
       * Computes the full repository name
       * @param {string} user - the username (or the full name)
       * @param {string} repo - the repository name, must not be passed if `user` is the full name
       * @return {string} the repository's full name
       */

   }, {
      key: '_getFullName',
      value: function _getFullName(user, repo) {
         var fullname = user;

         if (repo) {
            fullname = user + '/' + repo;
         }

         return fullname;
      }
   }]);

   return GitHub;
}();

module.exports = GitHub;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpdEh1Yi5qcyJdLCJuYW1lcyI6WyJHaXRIdWIiLCJhdXRoIiwiYXBpQmFzZSIsIl9fYXBpQmFzZSIsIl9fYXV0aCIsImlkIiwidXNlciIsIm9yZ2FuaXphdGlvbiIsInRlYW1JZCIsInJlcG8iLCJfZ2V0RnVsbE5hbWUiLCJxdWVyeSIsImZ1bGxuYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7cWpCQUFBOzs7Ozs7QUFNQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLE07QUFDSDs7Ozs7O0FBTUEsbUJBQVlDLElBQVosRUFBc0Q7QUFBQSxVQUFwQ0MsT0FBb0MsdUVBQTFCLHdCQUEwQjs7QUFBQTs7QUFDbkQsV0FBS0MsU0FBTCxHQUFpQkQsT0FBakI7QUFDQSxXQUFLRSxNQUFMLEdBQWNILFFBQVEsRUFBdEI7QUFDRjs7QUFFRDs7Ozs7Ozs7OzhCQUtRSSxFLEVBQUk7QUFDVCxnQkFBTyxtQkFBU0EsRUFBVCxFQUFhLEtBQUtELE1BQWxCLEVBQTBCLEtBQUtELFNBQS9CLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzhCQU1RRyxJLEVBQU07QUFDWCxnQkFBTyxtQkFBU0EsSUFBVCxFQUFlLEtBQUtGLE1BQXBCLEVBQTRCLEtBQUtELFNBQWpDLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7c0NBS2dCSSxZLEVBQWM7QUFDM0IsZ0JBQU8sMkJBQWlCQSxZQUFqQixFQUErQixLQUFLSCxNQUFwQyxFQUE0QyxLQUFLRCxTQUFqRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OzhCQUtRSyxNLEVBQVE7QUFDYixnQkFBTyxtQkFBU0EsTUFBVCxFQUFpQixLQUFLSixNQUF0QixFQUE4QixLQUFLRCxTQUFuQyxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs4QkFNUUcsSSxFQUFNRyxJLEVBQU07QUFDakIsZ0JBQU8seUJBQWUsS0FBS0MsWUFBTCxDQUFrQkosSUFBbEIsRUFBd0JHLElBQXhCLENBQWYsRUFBOEMsS0FBS0wsTUFBbkQsRUFBMkQsS0FBS0QsU0FBaEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Z0NBTVVHLEksRUFBTUcsSSxFQUFNO0FBQ25CLGdCQUFPLG9CQUFVLEtBQUtDLFlBQUwsQ0FBa0JKLElBQWxCLEVBQXdCRyxJQUF4QixDQUFWLEVBQXlDLEtBQUtMLE1BQTlDLEVBQXNELEtBQUtELFNBQTNELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7NkJBS09RLEssRUFBTztBQUNYLGdCQUFPLHFCQUFXQSxLQUFYLEVBQWtCLEtBQUtQLE1BQXZCLEVBQStCLEtBQUtELFNBQXBDLENBQVA7QUFDRjs7QUFFRDs7Ozs7OztxQ0FJZTtBQUNaLGdCQUFPLHdCQUFjLEtBQUtDLE1BQW5CLEVBQTJCLEtBQUtELFNBQWhDLENBQVA7QUFDRjs7QUFFRDs7Ozs7OztvQ0FJYztBQUNYLGdCQUFPLHVCQUFhLEtBQUtDLE1BQWxCLEVBQTBCLEtBQUtELFNBQS9CLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7aUNBS1dFLEUsRUFBSTtBQUNaLGdCQUFPLHNCQUFZQSxFQUFaLEVBQWdCLEtBQUtELE1BQXJCLEVBQTZCLEtBQUtELFNBQWxDLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7O21DQU1hRyxJLEVBQU1HLEksRUFBTTtBQUN0QixhQUFJRyxXQUFXTixJQUFmOztBQUVBLGFBQUlHLElBQUosRUFBVTtBQUNQRyx1QkFBY04sSUFBZCxTQUFzQkcsSUFBdEI7QUFDRjs7QUFFRCxnQkFBT0csUUFBUDtBQUNGOzs7Ozs7QUFHSkMsT0FBT0MsT0FBUCxHQUFpQmQsTUFBakIiLCJmaWxlIjoiR2l0SHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cclxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cclxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxyXG4gKi9cclxuLyogZXNsaW50IHZhbGlkLWpzZG9jOiBbXCJlcnJvclwiLCB7XCJyZXF1aXJlUmV0dXJuRGVzY3JpcHRpb25cIjogZmFsc2V9XSAqL1xyXG5cclxuaW1wb3J0IEdpc3QgZnJvbSAnLi9HaXN0JztcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcclxuaW1wb3J0IElzc3VlIGZyb20gJy4vSXNzdWUnO1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vU2VhcmNoJztcclxuaW1wb3J0IFJhdGVMaW1pdCBmcm9tICcuL1JhdGVMaW1pdCc7XHJcbmltcG9ydCBSZXBvc2l0b3J5IGZyb20gJy4vUmVwb3NpdG9yeSc7XHJcbmltcG9ydCBPcmdhbml6YXRpb24gZnJvbSAnLi9Pcmdhbml6YXRpb24nO1xyXG5pbXBvcnQgVGVhbSBmcm9tICcuL1RlYW0nO1xyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAnLi9NYXJrZG93bic7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XHJcblxyXG4vKipcclxuICogR2l0SHViIGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUgdmFyaW91cyBBUEkgd3JhcHBlciBvYmplY3RzLlxyXG4gKi9cclxuY2xhc3MgR2l0SHViIHtcclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBHaXRIdWIuXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gdGhlIGNyZWRlbnRpYWxzIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWIuIElmIGF1dGggaXNcclxuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3RzIHdpbGwgYmUgbWFkZSB1bmF1dGhlbnRpY2F0ZWRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbScpIHtcclxuICAgICAgdGhpcy5fX2FwaUJhc2UgPSBhcGlCYXNlO1xyXG4gICAgICB0aGlzLl9fYXV0aCA9IGF1dGggfHwge307XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgR2lzdCB3cmFwcGVyXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaWRdIC0gdGhlIGlkIGZvciB0aGUgZ2lzdCwgbGVhdmUgdW5kZWZpbmVkIHdoZW4gY3JlYXRpbmcgYSBuZXcgZ2lzdFxyXG4gICAgKiBAcmV0dXJuIHtHaXN0fVxyXG4gICAgKi9cclxuICAgZ2V0R2lzdChpZCkge1xyXG4gICAgICByZXR1cm4gbmV3IEdpc3QoaWQsIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgVXNlciB3cmFwcGVyXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdXNlcl0gLSB0aGUgbmFtZSBvZiB0aGUgdXNlciB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXRcclxuICAgICogICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZSB1bmRlZmluZWQgZm9yIHRoZSBhdXRoZW50aWNhdGVkIHVzZXJcclxuICAgICogQHJldHVybiB7VXNlcn1cclxuICAgICovXHJcbiAgIGdldFVzZXIodXNlcikge1xyXG4gICAgICByZXR1cm4gbmV3IFVzZXIodXNlciwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBPcmdhbml6YXRpb24gd3JhcHBlclxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3JnYW5pemF0aW9uIC0gdGhlIG5hbWUgb2YgdGhlIG9yZ2FuaXphdGlvblxyXG4gICAgKiBAcmV0dXJuIHtPcmdhbml6YXRpb259XHJcbiAgICAqL1xyXG4gICBnZXRPcmdhbml6YXRpb24ob3JnYW5pemF0aW9uKSB7XHJcbiAgICAgIHJldHVybiBuZXcgT3JnYW5pemF0aW9uKG9yZ2FuaXphdGlvbiwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGNyZWF0ZSBhIG5ldyBUZWFtIHdyYXBwZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRlYW1JZCAtIHRoZSBuYW1lIG9mIHRoZSB0ZWFtXHJcbiAgICAqIEByZXR1cm4ge3RlYW19XHJcbiAgICAqL1xyXG4gICBnZXRUZWFtKHRlYW1JZCkge1xyXG4gICAgICByZXR1cm4gbmV3IFRlYW0odGVhbUlkLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IFJlcG9zaXRvcnkgd3JhcHBlclxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VyIHdobyBvd25zIHRoZSByZXNwb3NpdG9yeVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIHRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEByZXR1cm4ge1JlcG9zaXRvcnl9XHJcbiAgICAqL1xyXG4gICBnZXRSZXBvKHVzZXIsIHJlcG8pIHtcclxuICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHRoaXMuX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IElzc3VlIHdyYXBwZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgLSB0aGUgdXNlciB3aG8gb3ducyB0aGUgcmVzcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAcmV0dXJuIHtJc3N1ZX1cclxuICAgICovXHJcbiAgIGdldElzc3Vlcyh1c2VyLCByZXBvKSB7XHJcbiAgICAgIHJldHVybiBuZXcgSXNzdWUodGhpcy5fZ2V0RnVsbE5hbWUodXNlciwgcmVwbyksIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgU2VhcmNoIHdyYXBwZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gdGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3JcclxuICAgICogQHJldHVybiB7U2VhcmNofVxyXG4gICAgKi9cclxuICAgc2VhcmNoKHF1ZXJ5KSB7XHJcbiAgICAgIHJldHVybiBuZXcgU2VhcmNoKHF1ZXJ5LCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IFJhdGVMaW1pdCB3cmFwcGVyXHJcbiAgICAqIEByZXR1cm4ge1JhdGVMaW1pdH1cclxuICAgICovXHJcbiAgIGdldFJhdGVMaW1pdCgpIHtcclxuICAgICAgcmV0dXJuIG5ldyBSYXRlTGltaXQodGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBNYXJrZG93biB3cmFwcGVyXHJcbiAgICAqIEByZXR1cm4ge01hcmtkb3dufVxyXG4gICAgKi9cclxuICAgZ2V0TWFya2Rvd24oKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTWFya2Rvd24odGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBQcm9qZWN0IHdyYXBwZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBwcm9qZWN0XHJcbiAgICAqIEByZXR1cm4ge1Byb2plY3R9XHJcbiAgICAqL1xyXG4gICBnZXRQcm9qZWN0KGlkKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvamVjdChpZCwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENvbXB1dGVzIHRoZSBmdWxsIHJlcG9zaXRvcnkgbmFtZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VybmFtZSAob3IgdGhlIGZ1bGwgbmFtZSlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgcmVwb3NpdG9yeSBuYW1lLCBtdXN0IG5vdCBiZSBwYXNzZWQgaWYgYHVzZXJgIGlzIHRoZSBmdWxsIG5hbWVcclxuICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgcmVwb3NpdG9yeSdzIGZ1bGwgbmFtZVxyXG4gICAgKi9cclxuICAgX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pIHtcclxuICAgICAgbGV0IGZ1bGxuYW1lID0gdXNlcjtcclxuXHJcbiAgICAgIGlmIChyZXBvKSB7XHJcbiAgICAgICAgIGZ1bGxuYW1lID0gYCR7dXNlcn0vJHtyZXBvfWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmdWxsbmFtZTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdpdEh1YjtcclxuIl19
//# sourceMappingURL=GitHub.js.map
