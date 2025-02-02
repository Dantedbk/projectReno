import React, { useState, useEffect, useRef } from 'react';
import { LANGUAGE_VERSIONS } from './constants';
import './coderunner.css'; // Importing the CSS file

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const selectLanguage = (lang) => {
    onSelect(lang);
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className="language-selector">
      <button className="button lang-select" onClick={toggleMenu}>
        <b>Lenguaje: </b>{'\u00A0' + language}
      </button>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {languages.map(([lang, version]) => (
          <div
            key={lang}
            className="menu-item"
            style={{
              background: lang === language ? '#c4c4c4' : 'transparent',
              color: lang === language ? 'black' : 'white'
            }}
            onClick={() => selectLanguage(lang)}
          >
            {lang} &nbsp;
            <span style={{ color: 'gray', fontSize: 'small' }}>
              ({version})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
