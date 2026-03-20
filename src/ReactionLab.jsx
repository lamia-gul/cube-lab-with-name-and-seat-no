import React, { useState, useEffect } from 'react';

const ReactionLab = () => {
  const [stimulus, setStimulus] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, waiting, active

  const characters = ['A', 'S', 'D', 'F', 'J', 'K', 'L'];

  const startTrial = () => {
    setStatus('waiting');
    setStimulus(null);
    
    // Random delay between 1.5 to 4 seconds
    const delay = Math.random() * 2500 + 1500;
    
    setTimeout(() => {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      setStimulus(randomChar);
      setStartTime(performance.now());
      setStatus('active');
    }, delay);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status === 'active' && stimulus) {
        if (e.key.toUpperCase() === stimulus) {
          const endTime = performance.now();
          const rt = (endTime - startTime).toFixed(2);
          setResults(prev => [...prev, parseFloat(rt)]);
          setStatus('idle');
          setStimulus(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, stimulus, startTime]);

  const avgRT = results.length > 0 
    ? (results.reduce((a, b) => a + b, 0) / results.length).toFixed(2) 
    : 0;

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>HCI Lab 1: Reaction Time Test</h2>
      
      {status === 'idle' && (
        <button onClick={startTrial} style={{ padding: '15px 30px', fontSize: '20px' }}>
          Begin Trial {results.length + 1}
        </button>
      )}

      {status === 'waiting' && <p style={{ fontSize: '24px', color: 'orange' }}>Wait for stimulus...</p>}

      {status === 'active' && (
        <h1 style={{ fontSize: '120px', margin: '20px', color: '#007bff' }}>{stimulus}</h1>
      )}

      <div style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h3>Results</h3>
        <p>Average RT: <strong>{avgRT} ms</strong></p>
        <p>Trials Completed: {results.length}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.slice(-5).reverse().map((res, i) => (
            <li key={i}>Trial {results.length - i}: {res} ms</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReactionLab;