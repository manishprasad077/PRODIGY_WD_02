import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startStopButtonRef = useRef(null);

  const startStop = () => {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
    startStopButtonRef.current.textContent = running ? 'Start' : 'Stop';
  };

  const lap = () => {
    if (running) {
      const lapTime = time;
      setLaps([...laps, lapTime]);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    setTime(0);
    setLaps([]);
    startStopButtonRef.current.textContent = 'Start';
  };

  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millisecondsPart = Math.floor(date.getUTCMilliseconds() / 10);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(millisecondsPart)}`;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="container">
      <div className="stopwatch">
        <div className="time">{formatTime(time)}</div>
        <button onClick={startStop} ref={startStopButtonRef}>
          Start
        </button>
        <button onClick={lap}>Lap</button>
        <button onClick={reset}>Reset</button>
        <ul className="lap-list">
          {laps.map((lapTime, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
