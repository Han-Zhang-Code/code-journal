/* global data */
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
}

/* <div class="row">
  <div class="column-half">
    <img src="images/placeholder-image-square.jpg" alt="placeholder-image-square" class="adjust-img column-full"">
  </div>
  <div class="column-half">
    <ul>
      <li class="list-title">title</li>
      <li class="list-content">To be clear, let's reiterate what is happening here. The element we've given a display value of flex to is acting like a
        block-level element in terms of how it interacts with the rest of the page, but its children are laid out as flex items.
        The next section will explain in more detail what this means. Note also that you can use a display value of inline-flex
        if you wish to lay out an element's children as flex items, but have that element behave like an inline element.</li>
    </ul>
  </div>
</div> */

// window.addEventListener('DOMContentLoaded', domCreation);
// function domCreation(datas) {
//   console.log(datas);
//   var $createRow = document.createElement('div');
//   $createRow.setAttribute('class', 'row');
//   var $createColumn = document.createElement('div');
//   $createColumn.setAttribute('class', 'column-half');
//   var $createImg = document.createElement('img');
//   $createImg.setAttribute('src', datas.entries[0].imgUrl);
//   var $create2Column = document.createElement('div');
//   $create2Column.setAttribute('class', 'column-half');
//   var $createUnorderedList = document.createElement('ul');
//   var $createTitleList = document.createElement('li');
//   $createTitleList.setAttribute('class', 'list-title');
//   $createTitleList.textContent = datas.entries[0].titleText;
//   var $createContentList = document.createElement('li');
//   $createContentList.setAttribute('class', 'list-content');
//   $createContentList.textContent = datas.entries.notesText;

//   $createRow.appendChild($createColumn);
//   $createColumn.appendChild($createImg);
//   $createRow.appendChild($create2Column);
//   $create2Column.appendChild($createUnorderedList);
//   $createUnorderedList.appendChild($createTitleList);
//   $createUnorderedList.appendChild($createContentList);

//   return $createRow;
// }
