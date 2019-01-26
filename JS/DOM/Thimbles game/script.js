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

    if(timeOfClick < 110) {
        checkChose.call(contex);
    }
    document.onmousemove = null;
    block.onmouseup = null;
  }
}

const rand = Math.floor(Math.random() * (3 - 1) + 1);


function checkChose () {
  const ht = document.createElement('h2');
  const hf = document.createElement('h2');
  ht.innerText = 'true';
  hf.innerText = 'false';
  console.log(rand);
  let id = this.block.id[this.block.id.length - 1];
  ht.id = 'ht';
  hf.id = 'hf';

  (rand + '') === id ? !this.block.children[0] && this.block.append(ht): 
      !this.block.children[0] && this.block.append(hf);
}