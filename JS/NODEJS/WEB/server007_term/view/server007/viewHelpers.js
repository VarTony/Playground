

const mover = (e, componentName, addFunc = () => console.log('Without additional functions')) => {

  e.preventDefault();
  e.stopPropagation();
  if(e.currentTarget !== e.target & componentName !== '#paint') return;
  const component = document.querySelector(componentName);
  let mousePosition;
  let offset = [component.offsetLeft - e.clientX, component.offsetTop - e.clientY ];
  let timeOfClick = performance.now();
  component.style.position = 'absolute';
  moveAt(e);
  document.body.appendChild(component);
  component.style.zIndex = 16;
  addFunc()
  function moveAt(e) {
    mousePosition = {x : e.clientX, y : e.clientY}
      component.style.left = (mousePosition.x + offset[0]) + 'px';
      component.style.top  = (mousePosition.y + offset[1]) + 'px';

    }
  document.onmousemove = e => moveAt(e);

  component.onmouseup = () => {
    timeOfClick = performance.now() - timeOfClick;
    document.onmousemove = null;
    component.onmouseup = null;
  }
}

export default mover;
