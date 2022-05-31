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
  dataObject.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(dataObject);
  $imgHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submit.reset();
}

window.addEventListener('beforeunload', tasks);
function tasks(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('localStorage', dataJSON);
}
