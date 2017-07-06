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
 * Issue wraps the functionality to get issues for repositories
 */
var Issue = function (_Requestable) {
   _inherits(Issue, _Requestable);

   /**
    * Create a new Issue
    * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Issue(repository, auth, apiBase) {
      _classCallCheck(this, Issue);

      var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, auth, apiBase));

      _this.__repository = repository;
      return _this;
   }

   /**
    * Create a new issue
    * @see https://developer.github.com/v3/issues/#create-an-issue
    * @param {Object} issueData - the issue to create
    * @param {Requestable.callback} [cb] - will receive the created issue
    * @return {Promise} - the promise for the http request
    */


   _createClass(Issue, [{
      key: 'createIssue',
      value: function createIssue(issueData, cb) {
         return this._request('POST', '/repos/' + this.__repository + '/issues', issueData, cb);
      }

      /**
       * List the issues for the repository
       * @see https://developer.github.com/v3/issues/#list-issues-for-a-repository
       * @param {Object} options - filtering options
       * @param {Requestable.callback} [cb] - will receive the array of issues
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listIssues',
      value: function listIssues(options, cb) {
         return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
      }

      /**
       * List the events for an issue
       * @see https://developer.github.com/v3/issues/events/#list-events-for-an-issue
       * @param {number} issue - the issue to get events for
       * @param {Requestable.callback} [cb] - will receive the list of events
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listIssueEvents',
      value: function listIssueEvents(issue, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
      }

      /**
       * List comments on an issue
       * @see https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
       * @param {number} issue - the id of the issue to get comments from
       * @param {Requestable.callback} [cb] - will receive the comments
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listIssueComments',
      value: function listIssueComments(issue, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
      }

      /**
       * Get a single comment on an issue
       * @see https://developer.github.com/v3/issues/comments/#get-a-single-comment
       * @param {number} id - the comment id to get
       * @param {Requestable.callback} [cb] - will receive the comment
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getIssueComment',
      value: function getIssueComment(id, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
      }

      /**
       * Comment on an issue
       * @see https://developer.github.com/v3/issues/comments/#create-a-comment
       * @param {number} issue - the id of the issue to comment on
       * @param {string} comment - the comment to add
       * @param {Requestable.callback} [cb] - will receive the created comment
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createIssueComment',
      value: function createIssueComment(issue, comment, cb) {
         return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
      }

      /**
       * Edit a comment on an issue
       * @see https://developer.github.com/v3/issues/comments/#edit-a-comment
       * @param {number} id - the comment id to edit
       * @param {string} comment - the comment to edit
       * @param {Requestable.callback} [cb] - will receive the edited comment
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editIssueComment',
      value: function editIssueComment(id, comment, cb) {
         return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
      }

      /**
       * Delete a comment on an issue
       * @see https://developer.github.com/v3/issues/comments/#delete-a-comment
       * @param {number} id - the comment id to delete
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteIssueComment',
      value: function deleteIssueComment(id, cb) {
         return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
      }

      /**
       * Edit an issue
       * @see https://developer.github.com/v3/issues/#edit-an-issue
       * @param {number} issue - the issue number to edit
       * @param {Object} issueData - the new issue data
       * @param {Requestable.callback} [cb] - will receive the modified issue
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editIssue',
      value: function editIssue(issue, issueData, cb) {
         return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
      }

      /**
       * Get a particular issue
       * @see https://developer.github.com/v3/issues/#get-a-single-issue
       * @param {number} issue - the issue number to fetch
       * @param {Requestable.callback} [cb] - will receive the issue
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getIssue',
      value: function getIssue(issue, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
      }

      /**
       * List the milestones for the repository
       * @see https://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
       * @param {Object} options - filtering options
       * @param {Requestable.callback} [cb] - will receive the array of milestones
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listMilestones',
      value: function listMilestones(options, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
      }

      /**
       * Get a milestone
       * @see https://developer.github.com/v3/issues/milestones/#get-a-single-milestone
       * @param {string} milestone - the id of the milestone to fetch
       * @param {Requestable.callback} [cb] - will receive the milestone
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getMilestone',
      value: function getMilestone(milestone, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
      }

      /**
       * Create a new milestone
       * @see https://developer.github.com/v3/issues/milestones/#create-a-milestone
       * @param {Object} milestoneData - the milestone definition
       * @param {Requestable.callback} [cb] - will receive the milestone
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createMilestone',
      value: function createMilestone(milestoneData, cb) {
         return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
      }

      /**
       * Edit a milestone
       * @see https://developer.github.com/v3/issues/milestones/#update-a-milestone
       * @param {string} milestone - the id of the milestone to edit
       * @param {Object} milestoneData - the updates to make to the milestone
       * @param {Requestable.callback} [cb] - will receive the updated milestone
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editMilestone',
      value: function editMilestone(milestone, milestoneData, cb) {
         return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
      }

      /**
       * Delete a milestone (this is distinct from closing a milestone)
       * @see https://developer.github.com/v3/issues/milestones/#delete-a-milestone
       * @param {string} milestone - the id of the milestone to delete
       * @param {Requestable.callback} [cb] - will receive the status
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteMilestone',
      value: function deleteMilestone(milestone, cb) {
         return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
      }

      /**
       * Create a new label
       * @see https://developer.github.com/v3/issues/labels/#create-a-label
       * @param {Object} labelData - the label definition
       * @param {Requestable.callback} [cb] - will receive the object representing the label
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createLabel',
      value: function createLabel(labelData, cb) {
         return this._request('POST', '/repos/' + this.__repository + '/labels', labelData, cb);
      }

      /**
       * List the labels for the repository
       * @see https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
       * @param {Object} options - filtering options
       * @param {Requestable.callback} [cb] - will receive the array of labels
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listLabels',
      value: function listLabels(options, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/labels', options, cb);
      }

      /**
       * Get a label
       * @see https://developer.github.com/v3/issues/labels/#get-a-single-label
       * @param {string} label - the name of the label to fetch
       * @param {Requestable.callback} [cb] - will receive the label
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getLabel',
      value: function getLabel(label, cb) {
         return this._request('GET', '/repos/' + this.__repository + '/labels/' + label, null, cb);
      }

      /**
       * Edit a label
       * @see https://developer.github.com/v3/issues/labels/#update-a-label
       * @param {string} label - the name of the label to edit
       * @param {Object} labelData - the updates to make to the label
       * @param {Requestable.callback} [cb] - will receive the updated label
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'editLabel',
      value: function editLabel(label, labelData, cb) {
         return this._request('PATCH', '/repos/' + this.__repository + '/labels/' + label, labelData, cb);
      }

      /**
       * Delete a label
       * @see https://developer.github.com/v3/issues/labels/#delete-a-label
       * @param {string} label - the name of the label to delete
       * @param {Requestable.callback} [cb] - will receive the status
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteLabel',
      value: function deleteLabel(label, cb) {
         return this._request('DELETE', '/repos/' + this.__repository + '/labels/' + label, null, cb);
      }
   }]);

   return Issue;
}(_Requestable3.default);

module.exports = Issue;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklzc3VlLmpzIl0sIm5hbWVzIjpbIklzc3VlIiwicmVwb3NpdG9yeSIsImF1dGgiLCJhcGlCYXNlIiwiX19yZXBvc2l0b3J5IiwiaXNzdWVEYXRhIiwiY2IiLCJfcmVxdWVzdCIsIm9wdGlvbnMiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiaXNzdWUiLCJpZCIsImNvbW1lbnQiLCJib2R5IiwibWlsZXN0b25lIiwibWlsZXN0b25lRGF0YSIsImxhYmVsRGF0YSIsImxhYmVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQU9BOzs7Ozs7Ozs7OytlQVBBOzs7Ozs7O0FBU0E7OztJQUdNQSxLOzs7QUFDSDs7Ozs7O0FBTUEsa0JBQVlDLFVBQVosRUFBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztBQUFBOztBQUFBLGdIQUM5QkQsSUFEOEIsRUFDeEJDLE9BRHdCOztBQUVwQyxZQUFLQyxZQUFMLEdBQW9CSCxVQUFwQjtBQUZvQztBQUd0Qzs7QUFFRDs7Ozs7Ozs7Ozs7a0NBT1lJLFMsRUFBV0MsRSxFQUFJO0FBQ3hCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGNBQWdDLEtBQUtILFlBQXJDLGNBQTREQyxTQUE1RCxFQUF1RUMsRUFBdkUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O2lDQU9XRSxPLEVBQVNGLEUsRUFBSTtBQUNyQixnQkFBTyxLQUFLRyxnQkFBTCxhQUFnQyxLQUFLTCxZQUFyQyxjQUE0REksT0FBNUQsRUFBcUVGLEVBQXJFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztzQ0FPZ0JJLEssRUFBT0osRSxFQUFJO0FBQ3hCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGdCQUEyRE0sS0FBM0QsY0FBMkUsSUFBM0UsRUFBaUZKLEVBQWpGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozt3Q0FPa0JJLEssRUFBT0osRSxFQUFJO0FBQzFCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGdCQUEyRE0sS0FBM0QsZ0JBQTZFLElBQTdFLEVBQW1GSixFQUFuRixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7c0NBT2dCSyxFLEVBQUlMLEUsRUFBSTtBQUNyQixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyx5QkFBb0VPLEVBQXBFLEVBQTBFLElBQTFFLEVBQWdGTCxFQUFoRixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7O3lDQVFtQkksSyxFQUFPRSxPLEVBQVNOLEUsRUFBSTtBQUNwQyxnQkFBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxjQUFnQyxLQUFLSCxZQUFyQyxnQkFBNERNLEtBQTVELGdCQUE4RSxFQUFDRyxNQUFNRCxPQUFQLEVBQTlFLEVBQStGTixFQUEvRixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7O3VDQVFpQkssRSxFQUFJQyxPLEVBQVNOLEUsRUFBSTtBQUMvQixnQkFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLSCxZQUF0Qyx5QkFBc0VPLEVBQXRFLEVBQTRFLEVBQUNFLE1BQU1ELE9BQVAsRUFBNUUsRUFBNkZOLEVBQTdGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozt5Q0FPbUJLLEUsRUFBSUwsRSxFQUFJO0FBQ3hCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtILFlBQXZDLHlCQUF1RU8sRUFBdkUsRUFBNkUsSUFBN0UsRUFBbUZMLEVBQW5GLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7Z0NBUVVJLEssRUFBT0wsUyxFQUFXQyxFLEVBQUk7QUFDN0IsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBS0gsWUFBdEMsZ0JBQTZETSxLQUE3RCxFQUFzRUwsU0FBdEUsRUFBaUZDLEVBQWpGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzsrQkFPU0ksSyxFQUFPSixFLEVBQUk7QUFDakIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0gsWUFBcEMsZ0JBQTJETSxLQUEzRCxFQUFvRSxJQUFwRSxFQUEwRUosRUFBMUUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O3FDQU9lRSxPLEVBQVNGLEUsRUFBSTtBQUN6QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxrQkFBK0RJLE9BQS9ELEVBQXdFRixFQUF4RSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7bUNBT2FRLFMsRUFBV1IsRSxFQUFJO0FBQ3pCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLG9CQUErRFUsU0FBL0QsRUFBNEUsSUFBNUUsRUFBa0ZSLEVBQWxGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztzQ0FPZ0JTLGEsRUFBZVQsRSxFQUFJO0FBQ2hDLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGNBQWdDLEtBQUtILFlBQXJDLGtCQUFnRVcsYUFBaEUsRUFBK0VULEVBQS9FLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7b0NBUWNRLFMsRUFBV0MsYSxFQUFlVCxFLEVBQUk7QUFDekMsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBS0gsWUFBdEMsb0JBQWlFVSxTQUFqRSxFQUE4RUMsYUFBOUUsRUFBNkZULEVBQTdGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztzQ0FPZ0JRLFMsRUFBV1IsRSxFQUFJO0FBQzVCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtILFlBQXZDLG9CQUFrRVUsU0FBbEUsRUFBK0UsSUFBL0UsRUFBcUZSLEVBQXJGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztrQ0FPWVUsUyxFQUFXVixFLEVBQUk7QUFDeEIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0gsWUFBckMsY0FBNERZLFNBQTVELEVBQXVFVixFQUF2RSxDQUFQO0FBQ0Y7O0FBRUY7Ozs7Ozs7Ozs7aUNBT1lFLE8sRUFBU0YsRSxFQUFJO0FBQ3JCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGNBQTJESSxPQUEzRCxFQUFvRUYsRUFBcEUsQ0FBUDtBQUNGOztBQUVGOzs7Ozs7Ozs7OytCQU9VVyxLLEVBQU9YLEUsRUFBSTtBQUNqQixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxnQkFBMkRhLEtBQTNELEVBQW9FLElBQXBFLEVBQTBFWCxFQUExRSxDQUFQO0FBQ0Y7O0FBRUY7Ozs7Ozs7Ozs7O2dDQVFXVyxLLEVBQU9ELFMsRUFBV1YsRSxFQUFJO0FBQzdCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUtILFlBQXRDLGdCQUE2RGEsS0FBN0QsRUFBc0VELFNBQXRFLEVBQWlGVixFQUFqRixDQUFQO0FBQ0Y7O0FBRUY7Ozs7Ozs7Ozs7a0NBT2FXLEssRUFBT1gsRSxFQUFJO0FBQ3BCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtILFlBQXZDLGdCQUE4RGEsS0FBOUQsRUFBdUUsSUFBdkUsRUFBNkVYLEVBQTdFLENBQVA7QUFDRjs7Ozs7O0FBR0pZLE9BQU9DLE9BQVAsR0FBaUJuQixLQUFqQiIsImZpbGUiOiJJc3N1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcblxyXG4vKipcclxuICogSXNzdWUgd3JhcHMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gZ2V0IGlzc3VlcyBmb3IgcmVwb3NpdG9yaWVzXHJcbiAqL1xyXG5jbGFzcyBJc3N1ZSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBJc3N1ZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwb3NpdG9yeSAtIHRoZSBmdWxsIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkgKGA6dXNlci86cmVwb2ApIHRvIGdldCBpc3N1ZXMgZm9yXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IocmVwb3NpdG9yeSwgYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgICAgdGhpcy5fX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IGlzc3VlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2NyZWF0ZS1hbi1pc3N1ZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXNzdWVEYXRhIC0gdGhlIGlzc3VlIHRvIGNyZWF0ZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIGlzc3VlXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZUlzc3VlKGlzc3VlRGF0YSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlc2AsIGlzc3VlRGF0YSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgaXNzdWVzIGZvciB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNsaXN0LWlzc3Vlcy1mb3ItYS1yZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgaXNzdWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RJc3N1ZXMob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlc2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIGV2ZW50cyBmb3IgYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9ldmVudHMvI2xpc3QtZXZlbnRzLWZvci1hbi1pc3N1ZVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgdG8gZ2V0IGV2ZW50cyBmb3JcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBldmVudHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdElzc3VlRXZlbnRzKGlzc3VlLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vZXZlbnRzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCBjb21tZW50cyBvbiBhbiBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNsaXN0LWNvbW1lbnRzLW9uLWFuLWlzc3VlXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpZCBvZiB0aGUgaXNzdWUgdG8gZ2V0IGNvbW1lbnRzIGZyb21cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdElzc3VlQ29tbWVudHMoaXNzdWUsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfS9jb21tZW50c2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCBhIHNpbmdsZSBjb21tZW50IG9uIGFuIGlzc3VlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGdldFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb21tZW50XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldElzc3VlQ29tbWVudChpZCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ29tbWVudCBvbiBhbiBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNjcmVhdGUtYS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpZCBvZiB0aGUgaXNzdWUgdG8gY29tbWVudCBvblxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGFkZFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIGNvbW1lbnRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlSXNzdWVDb21tZW50KGlzc3VlLCBjb21tZW50LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2NvbW1lbnRzYCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGEgY29tbWVudCBvbiBhbiBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNlZGl0LWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBlZGl0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IC0gdGhlIGNvbW1lbnQgdG8gZWRpdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBlZGl0ZWQgY29tbWVudFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBlZGl0SXNzdWVDb21tZW50KGlkLCBjb21tZW50LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIHtib2R5OiBjb21tZW50fSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgY29tbWVudCBvbiBhbiBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNkZWxldGUtYS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGRlbGV0ZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBkZWxldGVJc3N1ZUNvbW1lbnQoaWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEVkaXQgYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jZWRpdC1hbi1pc3N1ZVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgbnVtYmVyIHRvIGVkaXRcclxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBuZXcgaXNzdWUgZGF0YVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCBpc3N1ZVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBlZGl0SXNzdWUoaXNzdWUsIGlzc3VlRGF0YSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX1gLCBpc3N1ZURhdGEsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCBhIHBhcnRpY3VsYXIgaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jZ2V0LWEtc2luZ2xlLWlzc3VlXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpc3N1ZSBudW1iZXIgdG8gZmV0Y2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgaXNzdWVcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0SXNzdWUoaXNzdWUsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIG1pbGVzdG9uZXMgZm9yIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jbGlzdC1taWxlc3RvbmVzLWZvci1hLXJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmaWx0ZXJpbmcgb3B0aW9uc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBhcnJheSBvZiBtaWxlc3RvbmVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RNaWxlc3RvbmVzKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSBtaWxlc3RvbmVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNnZXQtYS1zaW5nbGUtbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBmZXRjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtaWxlc3RvbmVcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0TWlsZXN0b25lKG1pbGVzdG9uZSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgbWlsZXN0b25lXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jY3JlYXRlLWEtbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBtaWxlc3RvbmVEYXRhIC0gdGhlIG1pbGVzdG9uZSBkZWZpbml0aW9uXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1pbGVzdG9uZVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVNaWxlc3RvbmUobWlsZXN0b25lRGF0YSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBtaWxlc3RvbmVEYXRhLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGEgbWlsZXN0b25lXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jdXBkYXRlLWEtbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBlZGl0XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBtaWxlc3RvbmVEYXRhIC0gdGhlIHVwZGF0ZXMgdG8gbWFrZSB0byB0aGUgbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgbWlsZXN0b25lXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGVkaXRNaWxlc3RvbmUobWlsZXN0b25lLCBtaWxlc3RvbmVEYXRhLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXMvJHttaWxlc3RvbmV9YCwgbWlsZXN0b25lRGF0YSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgbWlsZXN0b25lICh0aGlzIGlzIGRpc3RpbmN0IGZyb20gY2xvc2luZyBhIG1pbGVzdG9uZSlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNkZWxldGUtYS1taWxlc3RvbmVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1pbGVzdG9uZSAtIHRoZSBpZCBvZiB0aGUgbWlsZXN0b25lIHRvIGRlbGV0ZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBzdGF0dXNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlTWlsZXN0b25lKG1pbGVzdG9uZSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgbGFiZWxcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2NyZWF0ZS1hLWxhYmVsXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYWJlbERhdGEgLSB0aGUgbGFiZWwgZGVmaW5pdGlvblxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBsYWJlbFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVMYWJlbChsYWJlbERhdGEsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHNgLCBsYWJlbERhdGEsIGNiKTtcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaXN0IHRoZSBsYWJlbHMgZm9yIHRoZSByZXBvc2l0b3J5XHJcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2xpc3QtYWxsLWxhYmVscy1mb3ItdGhpcy1yZXBvc2l0b3J5XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmaWx0ZXJpbmcgb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGxhYmVsc1xyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgKi9cclxuICAgbGlzdExhYmVscyhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgbGFiZWxcclxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jZ2V0LWEtc2luZ2xlLWxhYmVsXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGZldGNoXHJcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGFiZWxcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICovXHJcbiAgIGdldExhYmVsKGxhYmVsLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWRpdCBhIGxhYmVsXHJcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI3VwZGF0ZS1hLWxhYmVsXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGVkaXRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbGFiZWxEYXRhIC0gdGhlIHVwZGF0ZXMgdG8gbWFrZSB0byB0aGUgbGFiZWxcclxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIGxhYmVsXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAqL1xyXG4gICBlZGl0TGFiZWwobGFiZWwsIGxhYmVsRGF0YSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBsYWJlbERhdGEsIGNiKTtcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYSBsYWJlbFxyXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyNkZWxldGUtYS1sYWJlbFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBuYW1lIG9mIHRoZSBsYWJlbCB0byBkZWxldGVcclxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBzdGF0dXNcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICovXHJcbiAgIGRlbGV0ZUxhYmVsKGxhYmVsLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJc3N1ZTtcclxuIl19
//# sourceMappingURL=Issue.js.map
