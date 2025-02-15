import React, { useState } from 'react';
import './coderunner.css'; // Importing the CSS file

const Output = ({ output,isError }) => {


  return (
    <>

      <div className={`output-box ${isError ? 'error' : ''}`} >
        {output
          ? output.map((line, index) => (
            <div className="output-text" key={index}>{line}</div>
          ))
          : 'Imprime los 10 primeros numeros de fibonacci ->>'}
      </div>
    </>
  );
};

export default Output;
