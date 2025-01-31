import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import Output from './Output';
import { CODE_SNIPPETS } from './constants';
import './coderunner.css'; 

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(CODE_SNIPPETS[language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  return (
    <>
      <div className="editor-container">
        <Editor
          theme="vs-dark"
          language={language}
          value={value}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            fontFamily: 'monospace', 
            fontSize: 14,
          }}
          onMount={onMount}
          onChange={(newValue) => setValue(newValue)}
        />
        <div className="output-container">
      </div>
      </div>
            <div className="language-selector">
              <LanguageSelector language={language} onSelect={onSelect} />
            </div>
      <Output editorRef={editorRef} language={language} />
    </>
  );
};

export default CodeEditor;
