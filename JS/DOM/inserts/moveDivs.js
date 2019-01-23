const blocks = document.querySelectorAll('div');
blocks.forEach( block => block.onmousedown = (e) => f(e, block));

const f = (e, block)  => { 
  let timeOfClick = performance.now();
  block.style.position = 'absolute';
  moveAt(e);
  document.body.appendChild(block);
  block.style.zIndex = 500; 

  function moveAt(e) {
    block.style.left = e.pageX - block.offsetWidth / 3 + 'px';
    block.style.top = e.pageY - block.offsetHeight / 2 + 'px';
  }
  const contex = {block};
  document.onmousemove = e => moveAt(e);
  block.onmouseup = () => {
    timeOfClick = performance.now() - timeOfClick;

    document.onmousemove = null;
    block.onmouseup = null;
  }
}


