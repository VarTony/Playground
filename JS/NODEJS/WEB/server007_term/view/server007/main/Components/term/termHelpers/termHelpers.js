import React from 'react';


const keyGenerate = () => Math.floor(Math.random() * 80000);


const showLastLog = () => {
  const logFieldTerm = document.querySelector('#log_field_term');
  logFieldTerm.scrollTop = logFieldTerm.scrollHeight;
}


const handlerLogs = logs => {

  let newLogs = [];
  newLogs = logs.map(log =>   {
     let response = log.response.type === 'data'
      ? log.response.data.split(' ').map(res => <li className='logs_with_indent' key={keyGenerate()}>{res}</li>)
      : log.response.data;

      return log.response.type === 'code'
      ?(
        <ul className='logs_list' key={keyGenerate()}>
          {log.response.data !== '' && <br/>}
          <li className='logs' key={keyGenerate()}>{log.comand}</li>
          <pre className='cat_output' key={keyGenerate()}>{response}</pre>
        </ul>)
      :(
        <ul className='logs_list' key={keyGenerate()}>
          {log.response.data !== '' && <br/>}
          <li className='logs' key={keyGenerate()}>{log.comand}</li>
          {response}
        </ul>);
    });
    return newLogs
}


const mover = e => {

  e.preventDefault();
  e.stopPropagation();
  if(e.currentTarget !== e.target) return;

  const term = document.querySelector('#term');
  let mousePosition;
  let offset = [term.offsetLeft - e.clientX, term.offsetTop - e.clientY ];
  let timeOfClick = performance.now();
  term.style.position = 'absolute';
  moveAt(e);
  document.body.appendChild(term);
  term.style.zIndex = 16;
  showLastLog();
  function moveAt(e) {
    mousePosition = {x : e.clientX, y : e.clientY}
      term.style.left = (mousePosition.x + offset[0]) + 'px';
      term.style.top  = (mousePosition.y + offset[1]) + 'px';

    }
  document.onmousemove = e => moveAt(e);

  term.onmouseup = () => {
    timeOfClick = performance.now() - timeOfClick;
    document.onmousemove = null;
    term.onmouseup = null;
  }
}


export { mover, handlerLogs, showLastLog, keyGenerate};
