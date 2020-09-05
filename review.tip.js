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
  div.innerHTML = `<textarea class='notepad' rows="5" cols="60"></textarea>`;
  let windowKeyEvent = document.onkeypress;
  document.onkeypress = () => {};
  div.addEventListener('click', () => { 
    div.focus();
    event.preventDefault();
  }, false)
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
  reviewToolsHeader.innerHTML = `<div id='review_tools_title'>ReviewTools</div>`;

  let reviewTools = document.createElement('div');;
  reviewTools.id = 'reviewTools';
  reviewTools.className = 'tools';

  reviewToolsHeader.appendChild(reviewTools);
  document.body.appendChild(reviewToolsHeader);
  reviewToolsHeader.addEventListener('dblclick', showMenuItem);

  attachDragElement(reviewToolsHeader);
  getCurrentCommit();
};

setTimeout(inject, 1000);
