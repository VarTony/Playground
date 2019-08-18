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


export {handlerLogs, showLastLog, keyGenerate};
