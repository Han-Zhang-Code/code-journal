/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('currentStorage');
if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', tasks);
function tasks(event) {
  window.localStorage.setItem('currentStorage', JSON.stringify(data));
}
