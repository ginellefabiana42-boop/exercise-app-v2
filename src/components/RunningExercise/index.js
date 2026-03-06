import { useState, useEffect } from "react";

function RunningExercise({ name }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]); // Array to store lap times

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (t) => {
    let mins = ("0" + Math.floor((t / 60000) % 60)).slice(-2);
    let secs = ("0" + Math.floor((t / 1000) % 60)).slice(-2);
    let ms = ("0" + ((t / 10) % 100)).slice(-2);
    return `${mins}:${secs}:${ms}`;
  };

  const recordLap = () => {
    setLaps([...laps, formatTime(time)]); // Add current time to the laps list
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{name}</h1>
      <p style={{ fontSize: "3rem", fontFamily: "monospace" }}>{formatTime(time)}</p>
      
      <button onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</button>
      <button onClick={recordLap} disabled={!running}>Record Lap</button>
      <button onClick={() => { setTime(0); setLaps([]); setRunning(false); }}>Reset</button>

      <h3>Laps</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {lap}</li>
        ))}
      </ul>
    </div>
  );
}

export default RunningExercise;