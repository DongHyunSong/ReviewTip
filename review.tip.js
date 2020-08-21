let inject = () => {
  console.log(`Hello! ReviewTip`);

  let tools = document.createElement('div');
  tools.id = 'review_tools_header';
  tools.className = 'tools_header';
  tools.innerHTML = '<div class=tools>ReviewTools</div>';

  document.body.appendChild(tools);
  dragElement(tools);

  function dragElement(elm) {
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
};

setTimeout(inject, 1000);
