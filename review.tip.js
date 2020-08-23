function attachDragElement(elm) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elm.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elm.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elm.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elm.style.top = (elm.offsetTop - pos2) + "px";
    elm.style.left = (elm.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let currentUrl = '';
function getCurrentCommit() {
  currentUrl = window.location.href;
}

function makeMenuItem(menu_title) {
  let div = document.createElement('div');
  div.className = 'menu_item';
  div.innerHTML = menu_title;
  review_tools.appendChild(div);
}

let menuItemVisible = false;
function showMenuItem() {
  getCurrentCommit();
  if (!menuItemVisible) {
    menuItemVisible = true;
    makeMenuItem('Code Smell');
    makeMenuItem('Notes');
    review_tools.style.display = 'inline-block';
  } else {
    menuItemVisible = false;
    review_tools.style.display = 'none';
    review_tools.innerHTML = '';
  }
}

let inject = () => {
  console.log(`Hello! ReviewTip`);

  let review_tools_header = document.createElement('div');
  review_tools_header.id = 'review_tools_header';
  review_tools_header.className = 'tools_header';
  review_tools_header.innerHTML = `<div id='review_tools_title'>ReviewTools</div>`;

  let review_tools = document.createElement('div');;
  review_tools.id = 'review_tools';
  review_tools.className = 'tools';

  review_tools_header.appendChild(review_tools);
  document.body.appendChild(review_tools_header);
  document.getElementById('review_tools_title').addEventListener('click', showMenuItem);

  attachDragElement(review_tools_header);
  getCurrentCommit();
};

setTimeout(inject, 1000);
