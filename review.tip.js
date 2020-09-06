function attachDragElement(elm) {
  var reviewTools = document.getElementById('reviewTools');
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elm.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elm.id).addEventListener('mousedown', dragMouseDown, false);
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
    document.addEventListener('mouseup', closeDragElement, false);
    // call a function whenever the cursor moves:
    document.addEventListener('mousemove', elementDrag, false);
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
    reviewTools.style.top = (elm.offsetTop - pos2 + 30) + "px";
    reviewTools.style.left = (elm.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', closeDragElement, false);
    document.removeEventListener('mousemove', elementDrag, false);
  }
}

let currentUrl = '';
let codeReviewSystem = '';
function getCurrentCommit() {
  currentUrl = window.location.href;
  if (currentUrl.indexOf('review.tizen.org') > -1) {
    codeReviewSystem = 'gerrit';
  } else if (currentUrl.indexOf('github') > -1) {
    codeReviewSystem = 'github';
  } else {
    codeReviewSystem = 'swarm';
  }
}

function makeMenuItem(menuTitle, defaultAction) {
  let div = document.createElement('div');
  div.className = 'menu_item';
  div.innerHTML = menuTitle;
  div.addEventListener('click', defaultAction, false);
  reviewTools.appendChild(div);
}

function mekeNote() {
  let div = document.createElement('div');
  div.id = 'note';
  div.style.display = 'none';
  div.style.width = '300px';
  div.style.height = '100px';

  let notepad = document.createElement('textarea');
  notepad.cols = 60;
  notepad.rows = 5;
  notepad.className = 'notepad';
  notepad.onkeypress = () => {
    event.stopPropagation();
  }
  div.appendChild(notepad);
  reviewTools.appendChild(div);
}

let menuItemVisible = false;
let onMouseMove = false;
function showMenuItem() {
  if (onMouseMove) {
    return;
  }
  getCurrentCommit();
  if (!menuItemVisible) {
    menuItemVisible = true;
    makeMenuItem('Code Smell');
    makeMenuItem('Notes', () => {
      let noteElm = document.getElementById('note');
      if (noteElm.style.display == 'block') {
        noteElm.style.display = 'none';
      } else {
        noteElm.style.display = 'block';
      }
    });
    mekeNote();
    reviewTools.style.display = 'inline-block';
  } else {
    menuItemVisible = false;
    reviewTools.style.display = 'none';
    reviewTools.innerHTML = '';
  }
}


let inject = () => {
  console.log(`Hello! ReviewTip`);

  let reviewToolsHeader = document.createElement('div');
  reviewToolsHeader.id = 'reviewToolsHeader';
  reviewToolsHeader.className = 'tools_header';
  reviewToolsHeader.innerHTML = `<div id='reviewToolsTitle'>ReviewTools</div>`;

  let reviewTools = document.createElement('div');;
  reviewTools.id = 'reviewTools';
  reviewTools.className = 'tools';

  document.body.appendChild(reviewToolsHeader);
  document.body.appendChild(reviewTools);
  document.getElementById('reviewToolsTitle').addEventListener('dblclick', showMenuItem);

  attachDragElement(reviewToolsHeader);
  getCurrentCommit();
};

setTimeout(inject, 1000);
