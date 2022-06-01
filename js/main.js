/* global data */
if (data.entries.length === 0) {
  var $createRow = document.createElement('div');
  $createRow.setAttribute('class', 'row');
  var $createEmptyContent = document.createElement('div');
  $createEmptyContent.setAttribute('class', 'set-middle');
  var $createContent = document.createElement('p');
  $createContent.textContent = 'No entries have been recorded';
  var $appendToEntries = document.querySelector('#entries');
  $appendToEntries.appendChild($createRow);
  $createRow.appendChild($createEmptyContent);
  $createEmptyContent.appendChild($createContent);
}

var $photourl = document.querySelector('#photo-url');
var $imgHolder = document.querySelector('.adjust-img');
$photourl.addEventListener('input', addImg);
function addImg(event) {
  $imgHolder.setAttribute('src', event.target.value);
}

var $submit = document.querySelector('#entry-form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$submit.addEventListener('submit', submited);
function submited(event) {
  event.preventDefault();
  var title = $title.value;
  var notes = $notes.value;
  var img = $photourl.value;
  var dataObject = {
    titleText: title,
    notesText: notes,
    imgUrl: img,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(dataObject);
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submit.reset();

  var $selectContainer = document.querySelector('ul');
  $selectContainer.prepend(generageEntryDomTree(data.entries[0]));
}

window.addEventListener('DOMContentLoaded', loadDomTree);
function generageEntryDomTree(entry) {
  var $createList = document.createElement('li');
  var $createRow = document.createElement('div');
  $createRow.setAttribute('class', 'row');
  var $createColumn = document.createElement('div');
  $createColumn.setAttribute('class', 'column-half');
  var $createImg = document.createElement('img');
  $createImg.setAttribute('src', entry.imgUrl);
  $createImg.setAttribute('class', 'adjust-img column-full');
  var $create2Column = document.createElement('div');
  $create2Column.setAttribute('class', 'column-half');
  var $createTitlediv = document.createElement('div');
  $createTitlediv.setAttribute('class', 'list-title');
  $createTitlediv.textContent = entry.titleText;
  var $createContentdiv = document.createElement('div');
  $createContentdiv.setAttribute('class', 'list-content');
  $createContentdiv.textContent = entry.notesText;

  $createList.appendChild($createRow);
  $createRow.appendChild($createColumn);
  $createColumn.appendChild($createImg);
  $createRow.appendChild($create2Column);
  $create2Column.appendChild($createTitlediv);
  $create2Column.appendChild($createContentdiv);

  return $createList;
}
function loadDomTree(event) {
  var $selectContainer = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var $appendToview = generageEntryDomTree(data.entries[i]);
    $selectContainer.appendChild($appendToview);
  }
}

var $views = document.querySelectorAll('.view');
var $entriesNavButton = document.querySelector('.header-entries');
$entriesNavButton.addEventListener('click', viewEntries);
function viewEntries(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      $views[i].className = 'hidden';
    } else if ($views[i].getAttribute('data-view') !== 'entry-form') {
      $views[i].className = 'view';
    }
  }
}

var $anchor = document.querySelector('#anchor');
$anchor.addEventListener('click', toNewEntry);
function toNewEntry(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      $views[i].className = 'view';
    } else if ($views[i].getAttribute('data-view') !== 'entry-form') {
      $views[i].className = 'hidden';
    }
  }
}
