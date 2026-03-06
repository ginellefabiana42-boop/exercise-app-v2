import { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import RunningExercise from "./components/RunningExercise";

function App() {
  const [currentExercise, setCurrentExercise] = useState(null);

  if (currentExercise) {
    return (
      <div className="App">
        <button onClick={() => setCurrentExercise(null)}>Back to Menu</button>
        {currentExercise.type === "running" ? (
          <RunningExercise name={currentExercise.name} />
        ) : currentExercise.type === "repetition" ? (
          <RepetitionExercise name={currentExercise.name} />
        ) : (
          <DurationExercise name={currentExercise.name} />
        )}
      </div>
    );
  }

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>Go Fitness!</h1>
      <button onClick={() => setCurrentExercise({ name: "Push Ups", type: "repetition" })}>Push Ups</button>
      <button onClick={() => setCurrentExercise({ name: "Running", type: "running" })}>Running (Laps)</button>
      <button onClick={() => setCurrentExercise({ name: "Plank", type: "duration" })}>Plank</button>
    </div>
  );
}

export default App;