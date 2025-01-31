import React, { useState } from 'react';
import './coderunner.css'; // Importing the CSS file

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);

 

  return (
    <>
      <div className="exec-container">
          <button className="button btn-exec" disabled={isLoading} onClick={runCode} > {isLoading ? 'reza...' : 'Ejecutar'} </button>
          </div>
      <div className={`output-box ${isError ? 'error' : ''}`} >
        {output
          ? output.map((line, index) => (
            <div className="output-text" key={index}>{line}</div>
          ))
          : '.. escribe un código q devuelva los 10 primeros numeros de fibonacci'}
      </div>
    </>
  );
};

export default Output;
