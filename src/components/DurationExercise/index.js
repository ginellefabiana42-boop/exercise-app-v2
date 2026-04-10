import { useState, useEffect } from "react";

function DurationExercise({ name }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h1>{name}</h1>
      <p style={{ fontSize: "2rem" }}>Time: {time}s</p>
      <button onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</button>
      <button onClick={() => {setTime(0); setRunning(false)}}>Reset</button>
    </div>
  );
}
export default DurationExercise;