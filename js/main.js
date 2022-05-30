var $photourl = document.querySelector('#photo-url');

var $imgHolder = document.querySelector('.adjust-img');

$photourl.addEventListener('input', addImg);
function addImg(event) {
  $imgHolder.setAttribute('src', event.target.value);
}
