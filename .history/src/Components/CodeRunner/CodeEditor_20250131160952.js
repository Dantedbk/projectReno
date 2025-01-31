import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import Output from './Output';
import { CODE_SNIPPETS } from './constants';
import './coderunner.css'; 
import { executeCode } from './api';

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(CODE_SNIPPETS[language]);
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);



      if (result.stderr) {
        console.error(result.stderr);
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error.message || 'Unable to run code'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="editor-container">
      <div className="exec-container">
          <button className="button btn-exec" disabled={isLoading} onClick={runCode} > {isLoading ? 'reza...' : 'Ejecutar'} </button>
          </div>
        <div className="language-selector">
          <LanguageSelector language={language} onSelect={onSelect} />
          <div className="output-container">
      <Output editorRef={editorRef} language={language} output={output}/>
      </div>
        </div>
        <Editor
          theme="vs-dark"
          language={language}
          value={value}
          options={{ minimap: { enabled: false }, automaticLayout: true }}
          onMount={onMount}
          onChange={(newValue) => setValue(newValue)}
        />

      </div>
    </>
  );
};

export default CodeEditor;
