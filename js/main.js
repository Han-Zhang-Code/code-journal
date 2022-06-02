/* global data */
if (data.entries.length !== 0) {
  var $selectNoRecordElement = document.querySelector('.set-middle');
  $selectNoRecordElement.className = 'hidden';
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

  if (data.entries.length === 1) {
    var $selectNoRecordElement = document.querySelector('.set-middle');
    $selectNoRecordElement.className = 'hidden';
  }

  viewEntries();
}

window.addEventListener('DOMContentLoaded', loadDomTree);
function generageEntryDomTree(entry) {
  var $createList = document.createElement('li');
  $createList.setAttribute('data-entry-id', entry.entryId);
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
  $createTitlediv.setAttribute('class', 'list-title row adjust-position');
  $createTitlediv.textContent = entry.titleText;
  var $createIcon = document.createElement('i');
  $createIcon.setAttribute('class', 'fa-solid fa-pen-to-square');
  $createIcon.setAttribute('data-entry-id', entry.entryId);
  // $createIcon.addEventListener('click', function callback() { editing(entry); });
  var $createContentdiv = document.createElement('div');
  $createContentdiv.setAttribute('class', 'list-content');
  $createContentdiv.textContent = entry.notesText;

  $createList.appendChild($createRow);
  $createRow.appendChild($createColumn);
  $createColumn.appendChild($createImg);
  $createRow.appendChild($create2Column);
  $create2Column.appendChild($createTitlediv);
  $createTitlediv.appendChild($createIcon);
  $create2Column.appendChild($createContentdiv);

  return $createList;
}
function loadDomTree(event) {
  // console.log(data);
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
      $views[i].className = 'view hidden';
    } else if ($views[i].getAttribute('data-view') !== 'entry-form') {
      $views[i].className = 'view';
    }
  }
}

var $anchor = document.querySelector('#anchor');
// $anchor.addEventListener('click', () => { toNewEntry('add'); });
$anchor.addEventListener('click', toNewEntry);
// function toNewEntry(action, data) {
function toNewEntry(event) {
  // console.log('hihi', action);
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      // clean();
      $views[i].className = 'view';
    } else if ($views[i].getAttribute('data-view') !== 'entry-form') {
      $views[i].className = 'view hidden';
    }
  }
}

var $unOrderedList = document.querySelector('ul');
$unOrderedList.addEventListener('click', editing);

function editing(event) {
  var $icon = document.querySelectorAll('i');
  var $list = document.querySelectorAll('li');
  for (var i = 0; i < $list.length; i++) {
    if ($list[i].getAttribute('data-entry-id') === (data.entries[i].entryId).toString() && event.target.getAttribute('data-entry-id') === $icon[i].getAttribute('data-entry-id')) {
      data.editing = $list[i];
      toNewEntry();
      var $header = document.querySelector('#form-title');
      $header.innerHTML = 'Edit Entry';
      var $title = document.querySelector('#title');
      $title.value = data.entries[i].titleText;
      var $notes = document.querySelector('#notes');
      $notes.value = data.entries[i].notesText;
      var $photoUrl = document.querySelector('#photo-url');
      $photoUrl.value = data.entries[i].imgUrl;
      $imgHolder.setAttribute('src', data.entries[i].imgUrl);
    }
  }
}

// function clean() {
//   $header1 = document.querySelector('#form-title');
//   $header1.innerHTML = 'New Entry';
//   $title = document.querySelector('#title');
//   $title.value = '';
// }

// function prePopular(data) {
//   console.log(data);
//   toNewEntry('edit', data);
//   $header1 = document.querySelector('#form-title');
//   console.log('hihi', $title);
//   $header1.innerHTML = 'editentry';
//   $title = document.querySelector('#title');
//   $title.value = data.titleText;
// }
