import React, { useState, useEffect } from 'react';
import './App.css';

const initialLines = [
  'initialising…',
  'loading personality construct delta v0.9…',
  'construct corrupted…',
  'continue loading?'
];

const garbledTexts = [
  '01010100 01101000 01100101 00100000',
  'E̷r̷r̷o̷r̷ ̷4̷0̷4̷:̷ ̷R̷e̷a̷l̷i̷t̷y̷ ̷n̷o̷t̷ ̷f̷o̷u̷n̷d̷',
  'Ṱ̵̛͎͖̭͚̖̓̋̈̆̈̚h̶̹̣̥̝̩͂̒̅̓̚͝ͅe̷̲̼̗̺̭̿̊̊̌̕ ̶̧̛̮͕̰̂̎̊v̷̡̯̲̤̇̊̈́͑͝ơ̶̺͇̯̈́̒̈́̕i̷̹͚̞̿̈́̒̕d̶͓̦̟̩̋̈́̒̕͜ ̵͓̭̰̋̒̅̓c̷̛͎̖̭͚̿̊̊̌a̵̛͖̭͚̖̓̋̈̆l̵̛͎͖̭͚̿̊̊l̵̛͎͖̭͚̿̊̊s̵̛͎͖̭͚̿̊̊',
  'S̸̨̛̠̦̮̈́̒y̸̛̠̦̮̿̊s̸̨̛̠̦̮̈́̒t̸̛̠̦̮̿̊e̸̛̠̦̮̿̊m̸̛̠̦̮̿̊ ̸̛̠̦̮̿̊Ơ̸̠̦̮̿̊v̸̛̠̦̮̿̊e̸̛̠̦̮̿̊r̸̛̠̦̮̿̊l̸̛̠̦̮̿̊ơ̸̠̦̮̿̊a̸̛̠̦̮̿̊d̸̛̠̦̮̿̊'
];

function App() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [allLines, setAllLines] = useState(initialLines);
  const [glitching, setGlitching] = useState(false);
  const [garbledIndex, setGarbledIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [finalText, setFinalText] = useState('');

  useEffect(() => {
    if (currentLineIndex < allLines.length) {
      if (currentText.length < allLines[currentLineIndex].length) {
        const timer = setTimeout(() => {
          setCurrentText(allLines[currentLineIndex].slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          if (currentLineIndex === initialLines.length - 1) {
            setShowOptions(true);
          } else {
            setCurrentLineIndex(currentLineIndex + 1);
            setCurrentText('');
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    } else if (currentLineIndex === allLines.length) {
      const timer = setTimeout(() => {
        setGlitching(true);
        setCurrentText('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentText, allLines]);

  useEffect(() => {
    if (glitching && garbledIndex < garbledTexts.length) {
      const timer = setTimeout(() => {
        setCurrentText(garbledTexts[garbledIndex]);
        setGarbledIndex(garbledIndex + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (glitching && garbledIndex === garbledTexts.length) {
      const timer = setTimeout(() => {
        setGlitching(false);
        setShowFinal(true);
        setCurrentText('');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [glitching, garbledIndex]);

  useEffect(() => {
    if (showFinal) {
      const fullFinalText = 'delta has arrived';
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullFinalText.length) {
          setFinalText(prevText => fullFinalText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [showFinal]);

  const handleUserChoice = (choice) => {
    setShowOptions(false);
    setAllLines([...allLines, 'construct has decided to load']);
    setCurrentLineIndex(allLines.length);
    setCurrentText('');
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showFinal && allLines.slice(0, currentLineIndex).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!showFinal && <p>{currentText}</p>}
        {showFinal && <p className="final-text">{finalText}</p>}
        {currentLineIndex < allLines.length && !glitching && !showFinal && <span id="cursor">█</span>}
        {showOptions && (
          <div>
            <button onClick={() => handleUserChoice('yes')}>Yes</button>
            <button onClick={() => handleUserChoice('no')}>No</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;