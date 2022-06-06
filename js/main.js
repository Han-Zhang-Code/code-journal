/* global data */
if (data.entries.length !== 0) {
  var $selectNoRecordElement = document.querySelector('.set-middle');
  $selectNoRecordElement.className = 'set-middle hidden';
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
    imgUrl: img
  };
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].titleText = dataObject.titleText;
        data.entries[i].notesText = dataObject.notesText;
        data.entries[i].imgUrl = dataObject.imgUrl;
        var $allList = document.querySelectorAll('li');
        for (var j = 0; j < $allList.length; j++) {
          if ($allList[j].getAttribute('data-entry-id') === data.editing.entryId.toString()) {
            $allList[j].replaceWith(generateEntryDomTree(data.editing));
            viewEntries();
          }
        }
      }
    }
  } else {
    dataObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(dataObject);
    var $selectContainer = document.querySelector('ul');
    $selectContainer.prepend(generateEntryDomTree(data.entries[0]));
    viewEntries();
  }
  data.editing = null;
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submit.reset();
  if (data.entries.length === 1) {
    var $selectNoRecordElement = document.querySelector('.set-middle');
    $selectNoRecordElement.className = 'set-middle hidden';
  }
  viewEntries();
}

window.addEventListener('DOMContentLoaded', loadDomTree);
function generateEntryDomTree(entry) {
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
  var $selectContainer = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var $appendToview = generateEntryDomTree(data.entries[i]);
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
$anchor.addEventListener('click', toNewEntry);
function toNewEntry(event) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      clean();
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
      data.editing = data.entries[i];
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
  var $selectRow = document.querySelector('#submit-row');
  $selectRow.className = 'row add-delete';
  var $deleteAnchor = document.querySelector('.delete');
  $deleteAnchor.className = 'delete';
  $deleteAnchor.addEventListener('click', goToModal);
}

function clean() {
  var $header = document.querySelector('#form-title');
  $header.innerHTML = 'New Entry';
  var $title = document.querySelector('#title');
  $title.value = '';
  var $notes = document.querySelector('#notes');
  $notes.value = '';
  var $photoUrl = document.querySelector('#photo-url');
  $photoUrl.value = '';
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  var $selectRow = document.querySelector('#submit-row');
  $selectRow.className = 'row adjust-button-position';
  var $deleteAnchor = document.querySelector('.delete');
  $deleteAnchor.className = 'delete hidden';
}

function goToModal() {
  var $selectModal = document.querySelector('#modal');
  $selectModal.className = 'modal row column-full';
  var $cancelDelete = document.querySelector('.close-button');
  $cancelDelete.addEventListener('click', cancelDelete);
  var $confirmDelete = document.querySelector('.confirm-button');
  $confirmDelete.addEventListener('click', confirmDelete);
}

function cancelDelete() {
  event.preventDefault();
  var $selectModal = document.querySelector('#modal');
  $selectModal.className = 'modal row hidden';
}

function confirmDelete(event) {
  event.preventDefault();
  var $selectModal = document.querySelector('#modal');
  $selectModal.className = 'modal row column-full hidden';
  var $list = document.querySelectorAll('li');
  for (var i = 0; i < $list.length; i++) {
    if ($list[i].getAttribute('data-entry-id') === (data.editing.entryId).toString()) {
      $list[i].remove();
      data.entries.splice(i, 1);
    }
  }
  data.editing = null;
  viewEntries();
  if (data.entries.length === 0) {
    var $selectNoRecordElement = document.querySelector('.set-middle');
    $selectNoRecordElement.className = 'set-middle';
  }

}
