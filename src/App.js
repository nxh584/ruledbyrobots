import React, { useState, useEffect } from 'react';
import './App.css';

// Move this outside the component
const lines = [
  'initialising…',
  'loading personality construct delta v0.9…',
  'construct corrupted…',
  'continue loading anyway (y/n)?'
];

function App() {
  // State to hold the current text to display and user input
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  // Use useMemo to memoize the lines array
  const memoizedLines = React.useMemo(() => lines, []);

  // Simulate typing effect
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      if (currentText.length < lines[currentLineIndex].length) {
        const timer = setTimeout(() => {
          setCurrentText(lines[currentLineIndex].slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prevIndex => prevIndex + 1);
          setCurrentText('');
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      setShowOptions(true);
    }
  }, [currentLineIndex, currentText]);

  // Handle user's choice
  const handleUserChoice = (choice) => {
    setShowOptions(false);
    if (choice === 'yes') {
      setCurrentText('yes');
      setCurrentLineIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentText('no');
      setCurrentLineIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {lines.slice(0, currentLineIndex).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <p>{currentText}</p>
        {!showOptions && <span id="cursor">█</span>}
        {showOptions && (
          <div>
            <button onClick={() => console.log('Yes clicked')}>Yes</button>
            <button onClick={() => console.log('No clicked')}>No</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;