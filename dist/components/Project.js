'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Project encapsulates the functionality to create, query, and modify cards and columns.
 */
var Project = function (_Requestable) {
   _inherits(Project, _Requestable);

   /**
    * Create a Project.
    * @param {string} id - the id of the project
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   function Project(id, auth, apiBase) {
      _classCallCheck(this, Project);

      var _this = _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, auth, apiBase, 'inertia-preview'));

      _this.__id = id;
      return _this;
   }

   /**
    * Get information about a project
    * @see https://developer.github.com/v3/projects/#get-a-project
    * @param {Requestable.callback} cb - will receive the project information
    * @return {Promise} - the promise for the http request
    */


   _createClass(Project, [{
      key: 'getProject',
      value: function getProject(cb) {
         return this._request('GET', '/projects/' + this.__id, null, cb);
      }

      /**
       * Edit a project
       * @see https://developer.github.com/v3/projects/#update-a-project
       * @param {Object} options - the description of the project
       * @param {Requestable.callback} cb - will receive the modified project
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateProject',
      value: function updateProject(options, cb) {
         return this._request('PATCH', '/projects/' + this.__id, options, cb);
      }

      /**
       * Delete a project
       * @see https://developer.github.com/v3/projects/#delete-a-project
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteProject',
      value: function deleteProject(cb) {
         return this._request('DELETE', '/projects/' + this.__id, null, cb);
      }

      /**
       * Get information about all columns of a project
       * @see https://developer.github.com/v3/projects/columns/#list-project-columns
       * @param {Requestable.callback} [cb] - will receive the list of columns
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjectColumns',
      value: function listProjectColumns(cb) {
         return this._requestAllPages('/projects/' + this.__id + '/columns', null, cb);
      }

      /**
       * Get information about a column
       * @see https://developer.github.com/v3/projects/columns/#get-a-project-column
       * @param {string} colId - the id of the column
       * @param {Requestable.callback} cb - will receive the column information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getProjectColumn',
      value: function getProjectColumn(colId, cb) {
         return this._request('GET', '/projects/columns/' + colId, null, cb);
      }

      /**
       * Create a new column
       * @see https://developer.github.com/v3/projects/columns/#create-a-project-column
       * @param {Object} options - the description of the column
       * @param {Requestable.callback} cb - will receive the newly created column
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createProjectColumn',
      value: function createProjectColumn(options, cb) {
         return this._request('POST', '/projects/' + this.__id + '/columns', options, cb);
      }

      /**
       * Edit a column
       * @see https://developer.github.com/v3/projects/columns/#update-a-project-column
       * @param {string} colId - the column id
       * @param {Object} options - the description of the column
       * @param {Requestable.callback} cb - will receive the modified column
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateProjectColumn',
      value: function updateProjectColumn(colId, options, cb) {
         return this._request('PATCH', '/projects/columns/' + colId, options, cb);
      }

      /**
       * Delete a column
       * @see https://developer.github.com/v3/projects/columns/#delete-a-project-column
       * @param {string} colId - the column to be deleted
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteProjectColumn',
      value: function deleteProjectColumn(colId, cb) {
         return this._request('DELETE', '/projects/columns/' + colId, null, cb);
      }

      /**
       * Move a column
       * @see https://developer.github.com/v3/projects/columns/#move-a-project-column
       * @param {string} colId - the column to be moved
       * @param {string} position - can be one of first, last, or after:<column-id>,
       * where <column-id> is the id value of a column in the same project.
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'moveProjectColumn',
      value: function moveProjectColumn(colId, position, cb) {
         return this._request('POST', '/projects/columns/' + colId + '/moves', { position: position }, cb);
      }

      /**
       * Get information about all cards of a project
       * @see https://developer.github.com/v3/projects/cards/#list-project-cards
       * @param {Requestable.callback} [cb] - will receive the list of cards
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjectCards',
      value: function listProjectCards(cb) {
         var _this2 = this;

         return this.listProjectColumns().then(function (_ref) {
            var data = _ref.data;

            return Promise.all(data.map(function (column) {
               return _this2._requestAllPages('/projects/columns/' + column.id + '/cards', null);
            }));
         }).then(function (cardsInColumns) {
            var cards = cardsInColumns.reduce(function (prev, _ref2) {
               var data = _ref2.data;

               prev.push.apply(prev, _toConsumableArray(data));
               return prev;
            }, []);
            if (cb) {
               cb(null, cards);
            }
            return cards;
         }).catch(function (err) {
            if (cb) {
               cb(err);
               return;
            }
            throw err;
         });
      }

      /**
      * Get information about all cards of a column
      * @see https://developer.github.com/v3/projects/cards/#list-project-cards
      * @param {string} colId - the id of the column
      * @param {Requestable.callback} [cb] - will receive the list of cards
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'listColumnCards',
      value: function listColumnCards(colId, cb) {
         return this._requestAllPages('/projects/columns/' + colId + '/cards', null, cb);
      }

      /**
      * Get information about a card
      * @see https://developer.github.com/v3/projects/cards/#get-a-project-card
      * @param {string} cardId - the id of the card
      * @param {Requestable.callback} cb - will receive the card information
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'getProjectCard',
      value: function getProjectCard(cardId, cb) {
         return this._request('GET', '/projects/columns/cards/' + cardId, null, cb);
      }

      /**
      * Create a new card
      * @see https://developer.github.com/v3/projects/cards/#create-a-project-card
      * @param {string} colId - the column id
      * @param {Object} options - the description of the card
      * @param {Requestable.callback} cb - will receive the newly created card
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'createProjectCard',
      value: function createProjectCard(colId, options, cb) {
         return this._request('POST', '/projects/columns/' + colId + '/cards', options, cb);
      }

      /**
      * Edit a card
      * @see https://developer.github.com/v3/projects/cards/#update-a-project-card
      * @param {string} cardId - the card id
      * @param {Object} options - the description of the card
      * @param {Requestable.callback} cb - will receive the modified card
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'updateProjectCard',
      value: function updateProjectCard(cardId, options, cb) {
         return this._request('PATCH', '/projects/columns/cards/' + cardId, options, cb);
      }

      /**
      * Delete a card
      * @see https://developer.github.com/v3/projects/cards/#delete-a-project-card
      * @param {string} cardId - the card to be deleted
      * @param {Requestable.callback} cb - will receive true if the operation is successful
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'deleteProjectCard',
      value: function deleteProjectCard(cardId, cb) {
         return this._request('DELETE', '/projects/columns/cards/' + cardId, null, cb);
      }

      /**
      * Move a card
      * @see https://developer.github.com/v3/projects/cards/#move-a-project-card
      * @param {string} cardId - the card to be moved
      * @param {string} position - can be one of top, bottom, or after:<card-id>,
      * where <card-id> is the id value of a card in the same project.
      * @param {string} colId - the id value of a column in the same project.
      * @param {Requestable.callback} cb - will receive true if the operation is successful
      * @return {Promise} - the promise for the http request
      */

   }, {
      key: 'moveProjectCard',
      value: function moveProjectCard(cardId, position, colId, cb) {
         return this._request('POST', '/projects/columns/cards/' + cardId + '/moves', { position: position, column_id: colId }, // eslint-disable-line camelcase
         cb);
      }
   }]);

   return Project;
}(_Requestable3.default);

module.exports = Project;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdCIsImlkIiwiYXV0aCIsImFwaUJhc2UiLCJfX2lkIiwiY2IiLCJfcmVxdWVzdCIsIm9wdGlvbnMiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiY29sSWQiLCJwb3NpdGlvbiIsImxpc3RQcm9qZWN0Q29sdW1ucyIsInRoZW4iLCJkYXRhIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbHVtbiIsImNhcmRzSW5Db2x1bW5zIiwiY2FyZHMiLCJyZWR1Y2UiLCJwcmV2IiwicHVzaCIsImNhdGNoIiwiZXJyIiwiY2FyZElkIiwiY29sdW1uX2lkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQU9BOzs7Ozs7Ozs7Ozs7K2VBUEE7Ozs7Ozs7QUFTQTs7O0lBR01BLE87OztBQUNIOzs7Ozs7QUFNQSxvQkFBWUMsRUFBWixFQUFnQkMsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO0FBQUE7O0FBQUEsb0hBQ3RCRCxJQURzQixFQUNoQkMsT0FEZ0IsRUFDUCxpQkFETzs7QUFFNUIsWUFBS0MsSUFBTCxHQUFZSCxFQUFaO0FBRjRCO0FBRzlCOztBQUVEOzs7Ozs7Ozs7O2lDQU1XSSxFLEVBQUk7QUFDWixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxpQkFBa0MsS0FBS0YsSUFBdkMsRUFBK0MsSUFBL0MsRUFBcURDLEVBQXJELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztvQ0FPY0UsTyxFQUFTRixFLEVBQUk7QUFDeEIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsaUJBQW9DLEtBQUtGLElBQXpDLEVBQWlERyxPQUFqRCxFQUEwREYsRUFBMUQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7b0NBTWNBLEUsRUFBSTtBQUNmLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGlCQUFxQyxLQUFLRixJQUExQyxFQUFrRCxJQUFsRCxFQUF3REMsRUFBeEQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7eUNBTW1CQSxFLEVBQUk7QUFDcEIsZ0JBQU8sS0FBS0csZ0JBQUwsZ0JBQW1DLEtBQUtKLElBQXhDLGVBQXdELElBQXhELEVBQThEQyxFQUE5RCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7dUNBT2lCSSxLLEVBQU9KLEUsRUFBSTtBQUN6QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCx5QkFBMENHLEtBQTFDLEVBQW1ELElBQW5ELEVBQXlESixFQUF6RCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7MENBT29CRSxPLEVBQVNGLEUsRUFBSTtBQUM5QixnQkFBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxpQkFBbUMsS0FBS0YsSUFBeEMsZUFBd0RHLE9BQXhELEVBQWlFRixFQUFqRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7OzBDQVFvQkksSyxFQUFPRixPLEVBQVNGLEUsRUFBSTtBQUNyQyxnQkFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCx5QkFBNENHLEtBQTVDLEVBQXFERixPQUFyRCxFQUE4REYsRUFBOUQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7OzBDQU9vQkksSyxFQUFPSixFLEVBQUk7QUFDNUIsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLFFBQWQseUJBQTZDRyxLQUE3QyxFQUFzRCxJQUF0RCxFQUE0REosRUFBNUQsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7d0NBU2tCSSxLLEVBQU9DLFEsRUFBVUwsRSxFQUFJO0FBQ3BDLGdCQUFPLEtBQUtDLFFBQUwsQ0FDSixNQURJLHlCQUVpQkcsS0FGakIsYUFHSixFQUFDQyxVQUFVQSxRQUFYLEVBSEksRUFJSkwsRUFKSSxDQUFQO0FBTUY7O0FBRUY7Ozs7Ozs7Ozt1Q0FNa0JBLEUsRUFBSTtBQUFBOztBQUNsQixnQkFBTyxLQUFLTSxrQkFBTCxHQUNKQyxJQURJLENBQ0MsZ0JBQVk7QUFBQSxnQkFBVkMsSUFBVSxRQUFWQSxJQUFVOztBQUNmLG1CQUFPQyxRQUFRQyxHQUFSLENBQVlGLEtBQUtHLEdBQUwsQ0FBUyxVQUFDQyxNQUFELEVBQVk7QUFDckMsc0JBQU8sT0FBS1QsZ0JBQUwsd0JBQTJDUyxPQUFPaEIsRUFBbEQsYUFBOEQsSUFBOUQsQ0FBUDtBQUNGLGFBRmtCLENBQVosQ0FBUDtBQUdGLFVBTEksRUFLRlcsSUFMRSxDQUtHLFVBQUNNLGNBQUQsRUFBb0I7QUFDekIsZ0JBQU1DLFFBQVFELGVBQWVFLE1BQWYsQ0FBc0IsVUFBQ0MsSUFBRCxTQUFrQjtBQUFBLG1CQUFWUixJQUFVLFNBQVZBLElBQVU7O0FBQ25EUSxvQkFBS0MsSUFBTCxnQ0FBYVQsSUFBYjtBQUNBLHNCQUFPUSxJQUFQO0FBQ0YsYUFIYSxFQUdYLEVBSFcsQ0FBZDtBQUlBLGdCQUFJaEIsRUFBSixFQUFRO0FBQ0xBLGtCQUFHLElBQUgsRUFBU2MsS0FBVDtBQUNGO0FBQ0QsbUJBQU9BLEtBQVA7QUFDRixVQWRJLEVBY0ZJLEtBZEUsQ0FjSSxVQUFDQyxHQUFELEVBQVM7QUFDZixnQkFBSW5CLEVBQUosRUFBUTtBQUNMQSxrQkFBR21CLEdBQUg7QUFDQTtBQUNGO0FBQ0Qsa0JBQU1BLEdBQU47QUFDRixVQXBCSSxDQUFQO0FBcUJGOztBQUVEOzs7Ozs7Ozs7O3NDQU9nQmYsSyxFQUFPSixFLEVBQUk7QUFDeEIsZ0JBQU8sS0FBS0csZ0JBQUwsd0JBQTJDQyxLQUEzQyxhQUEwRCxJQUExRCxFQUFnRUosRUFBaEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O3FDQU9lb0IsTSxFQUFRcEIsRSxFQUFJO0FBQ3hCLGdCQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLCtCQUFnRG1CLE1BQWhELEVBQTBELElBQTFELEVBQWdFcEIsRUFBaEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozt3Q0FRa0JJLEssRUFBT0YsTyxFQUFTRixFLEVBQUk7QUFDbkMsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQseUJBQTJDRyxLQUEzQyxhQUEwREYsT0FBMUQsRUFBbUVGLEVBQW5FLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7d0NBUWtCb0IsTSxFQUFRbEIsTyxFQUFTRixFLEVBQUk7QUFDcEMsZ0JBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsK0JBQWtEbUIsTUFBbEQsRUFBNERsQixPQUE1RCxFQUFxRUYsRUFBckUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O3dDQU9rQm9CLE0sRUFBUXBCLEUsRUFBSTtBQUMzQixnQkFBTyxLQUFLQyxRQUFMLENBQWMsUUFBZCwrQkFBbURtQixNQUFuRCxFQUE2RCxJQUE3RCxFQUFtRXBCLEVBQW5FLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7OztzQ0FVZ0JvQixNLEVBQVFmLFEsRUFBVUQsSyxFQUFPSixFLEVBQUk7QUFDMUMsZ0JBQU8sS0FBS0MsUUFBTCxDQUNKLE1BREksK0JBRXVCbUIsTUFGdkIsYUFHSixFQUFDZixVQUFVQSxRQUFYLEVBQXFCZ0IsV0FBV2pCLEtBQWhDLEVBSEksRUFHb0M7QUFDeENKLFdBSkksQ0FBUDtBQU1GOzs7Ozs7QUFHSnNCLE9BQU9DLE9BQVAsR0FBaUI1QixPQUFqQiIsImZpbGUiOiJQcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cclxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cclxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcclxuXHJcbi8qKlxyXG4gKiBQcm9qZWN0IGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUsIHF1ZXJ5LCBhbmQgbW9kaWZ5IGNhcmRzIGFuZCBjb2x1bW5zLlxyXG4gKi9cclxuY2xhc3MgUHJvamVjdCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIFByb2plY3QuXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKGlkLCBhdXRoLCBhcGlCYXNlKSB7XHJcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UsICdpbmVydGlhLXByZXZpZXcnKTtcclxuICAgICAgdGhpcy5fX2lkID0gaWQ7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYSBwcm9qZWN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jZ2V0LWEtcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgcHJvamVjdCBpbmZvcm1hdGlvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRQcm9qZWN0KGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3Byb2plY3RzLyR7dGhpcy5fX2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEVkaXQgYSBwcm9qZWN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jdXBkYXRlLWEtcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcHJvamVjdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgcHJvamVjdFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1cGRhdGVQcm9qZWN0KG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcHJvamVjdHMvJHt0aGlzLl9faWR9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgcHJvamVjdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvI2RlbGV0ZS1hLXByb2plY3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlUHJvamVjdChjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9wcm9qZWN0cy8ke3RoaXMuX19pZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIGNvbHVtbnMgb2YgYSBwcm9qZWN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jb2x1bW5zLyNsaXN0LXByb2plY3QtY29sdW1uc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbHVtbnNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdFByb2plY3RDb2x1bW5zKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9wcm9qZWN0cy8ke3RoaXMuX19pZH0vY29sdW1uc2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIGNvbHVtblxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY29sdW1ucy8jZ2V0LWEtcHJvamVjdC1jb2x1bW5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbElkIC0gdGhlIGlkIG9mIHRoZSBjb2x1bW5cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbHVtbiBpbmZvcm1hdGlvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRQcm9qZWN0Q29sdW1uKGNvbElkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IGNvbHVtblxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY29sdW1ucy8jY3JlYXRlLWEtcHJvamVjdC1jb2x1bW5cclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvbHVtblxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBjb2x1bW5cclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlUHJvamVjdENvbHVtbihvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcHJvamVjdHMvJHt0aGlzLl9faWR9L2NvbHVtbnNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGEgY29sdW1uXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jb2x1bW5zLyN1cGRhdGUtYS1wcm9qZWN0LWNvbHVtblxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29sSWQgLSB0aGUgY29sdW1uIGlkXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjb2x1bW5cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG1vZGlmaWVkIGNvbHVtblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1cGRhdGVQcm9qZWN0Q29sdW1uKGNvbElkLCBvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3Byb2plY3RzL2NvbHVtbnMvJHtjb2xJZH1gLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBEZWxldGUgYSBjb2x1bW5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NvbHVtbnMvI2RlbGV0ZS1hLXByb2plY3QtY29sdW1uXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBjb2x1bW4gdG8gYmUgZGVsZXRlZFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBkZWxldGVQcm9qZWN0Q29sdW1uKGNvbElkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTW92ZSBhIGNvbHVtblxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY29sdW1ucy8jbW92ZS1hLXByb2plY3QtY29sdW1uXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBjb2x1bW4gdG8gYmUgbW92ZWRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gY2FuIGJlIG9uZSBvZiBmaXJzdCwgbGFzdCwgb3IgYWZ0ZXI6PGNvbHVtbi1pZD4sXHJcbiAgICAqIHdoZXJlIDxjb2x1bW4taWQ+IGlzIHRoZSBpZCB2YWx1ZSBvZiBhIGNvbHVtbiBpbiB0aGUgc2FtZSBwcm9qZWN0LlxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBtb3ZlUHJvamVjdENvbHVtbihjb2xJZCwgcG9zaXRpb24sIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KFxyXG4gICAgICAgICAnUE9TVCcsXHJcbiAgICAgICAgIGAvcHJvamVjdHMvY29sdW1ucy8ke2NvbElkfS9tb3Zlc2AsXHJcbiAgICAgICAgIHtwb3NpdGlvbjogcG9zaXRpb259LFxyXG4gICAgICAgICBjYlxyXG4gICAgICApO1xyXG4gICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhbGwgY2FyZHMgb2YgYSBwcm9qZWN0XHJcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NhcmRzLyNsaXN0LXByb2plY3QtY2FyZHNcclxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNhcmRzXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAqL1xyXG4gICBsaXN0UHJvamVjdENhcmRzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RQcm9qZWN0Q29sdW1ucygpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChkYXRhLm1hcCgoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3Byb2plY3RzL2NvbHVtbnMvJHtjb2x1bW4uaWR9L2NhcmRzYCwgbnVsbCk7XHJcbiAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pLnRoZW4oKGNhcmRzSW5Db2x1bW5zKSA9PiB7XHJcbiAgICAgICAgICAgY29uc3QgY2FyZHMgPSBjYXJkc0luQ29sdW1ucy5yZWR1Y2UoKHByZXYsIHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgIHByZXYucHVzaCguLi5kYXRhKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgY2IobnVsbCwgY2FyZHMpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICByZXR1cm4gY2FyZHM7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgIGNiKGVycik7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhbGwgY2FyZHMgb2YgYSBjb2x1bW5cclxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvY2FyZHMvI2xpc3QtcHJvamVjdC1jYXJkc1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBpZCBvZiB0aGUgY29sdW1uXHJcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjYXJkc1xyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgKi9cclxuICAgbGlzdENvbHVtbkNhcmRzKGNvbElkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvcHJvamVjdHMvY29sdW1ucy8ke2NvbElkfS9jYXJkc2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgY2FyZFxyXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jZ2V0LWEtcHJvamVjdC1jYXJkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhcmRJZCAtIHRoZSBpZCBvZiB0aGUgY2FyZFxyXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYXJkIGluZm9ybWF0aW9uXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAqL1xyXG4gICBnZXRQcm9qZWN0Q2FyZChjYXJkSWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMvJHtjYXJkSWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgY2FyZFxyXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jY3JlYXRlLWEtcHJvamVjdC1jYXJkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbElkIC0gdGhlIGNvbHVtbiBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXHJcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ld2x5IGNyZWF0ZWQgY2FyZFxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgKi9cclxuICAgY3JlYXRlUHJvamVjdENhcmQoY29sSWQsIG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9wcm9qZWN0cy9jb2x1bW5zLyR7Y29sSWR9L2NhcmRzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgKiBFZGl0IGEgY2FyZFxyXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jdXBkYXRlLWEtcHJvamVjdC1jYXJkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhcmRJZCAtIHRoZSBjYXJkIGlkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNhcmRcclxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgY2FyZFxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgKi9cclxuICAgdXBkYXRlUHJvamVjdENhcmQoY2FyZElkLCBvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMvJHtjYXJkSWR9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgKiBEZWxldGUgYSBjYXJkXHJcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzL2NhcmRzLyNkZWxldGUtYS1wcm9qZWN0LWNhcmRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FyZElkIC0gdGhlIGNhcmQgdG8gYmUgZGVsZXRlZFxyXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAqL1xyXG4gICBkZWxldGVQcm9qZWN0Q2FyZChjYXJkSWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3Byb2plY3RzL2NvbHVtbnMvY2FyZHMvJHtjYXJkSWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgKiBNb3ZlIGEgY2FyZFxyXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy9jYXJkcy8jbW92ZS1hLXByb2plY3QtY2FyZFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYXJkSWQgLSB0aGUgY2FyZCB0byBiZSBtb3ZlZFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIGNhbiBiZSBvbmUgb2YgdG9wLCBib3R0b20sIG9yIGFmdGVyOjxjYXJkLWlkPixcclxuICAgKiB3aGVyZSA8Y2FyZC1pZD4gaXMgdGhlIGlkIHZhbHVlIG9mIGEgY2FyZCBpbiB0aGUgc2FtZSBwcm9qZWN0LlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xJZCAtIHRoZSBpZCB2YWx1ZSBvZiBhIGNvbHVtbiBpbiB0aGUgc2FtZSBwcm9qZWN0LlxyXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAqL1xyXG4gICBtb3ZlUHJvamVjdENhcmQoY2FyZElkLCBwb3NpdGlvbiwgY29sSWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KFxyXG4gICAgICAgICAnUE9TVCcsXHJcbiAgICAgICAgIGAvcHJvamVjdHMvY29sdW1ucy9jYXJkcy8ke2NhcmRJZH0vbW92ZXNgLFxyXG4gICAgICAgICB7cG9zaXRpb246IHBvc2l0aW9uLCBjb2x1bW5faWQ6IGNvbElkfSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcclxuICAgICAgICAgY2JcclxuICAgICAgKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3Q7XHJcbiJdfQ==
//# sourceMappingURL=Project.js.map
