import { useState } from "react";

// Utils
const heureEnMinutes = (heure) => {
  const [h, m] = heure.split(":").map(Number);
  return h * 60 + m;
};

const pauseAutomatique = (amplitude) => {
  if (amplitude <= 205) return 0;
  if (amplitude <= 315) return 15;
  if (amplitude <= 360) return 30;
  if (amplitude <= 435) return 45;
  if (amplitude <= 480) return 60;
  return 75;
};

const minutesEnHHMM = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
};

const HeureCalculator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [employees, setEmployees] = useState([]);

  const addEmployee = () => {
    if (!start || !end) return;

    const amplitude = heureEnMinutes(end) - heureEnMinutes(start);
    if (amplitude <= 0) return;

    const pause = pauseAutomatique(amplitude);
    const effectives = amplitude - pause;

    setEmployees([...employees, { start, end, pause, minutes: effectives }]);

    setStart("");
    setEnd("");
  };

  const removeEmployee = (indexToRemove) => {
    setEmployees(employees.filter((_, index) => index !== indexToRemove));
  };

  const totalMinutes = employees.reduce((sum, emp) => sum + emp.minutes, 0);

  return (
    <div className="card">
      <h1>Heure Calculator</h1>

      <label>Début de service</label>
      <input
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label>Fin de service</label>
      <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />

      <button className="add-btn" onClick={addEmployee}>
        ➕ Ajouter un Cast Member
      </button>

      {employees.length > 0 && (
        <>
          <hr />
          <h2>Récapitulatif</h2>

          {employees.map((emp, index) => (
            <div key={index} className="employee">
              <span className="hours">
                {emp.start} → {emp.end}
              </span>

              <span className="pause">Pause {emp.pause} min</span>

              <span className="result">{minutesEnHHMM(emp.minutes)}</span>
              <button
                className="remove-btn"
                onClick={() => removeEmployee(index)}
              >
                ✕
              </button>
            </div>
          ))}

          <hr />
          <h2>Total effectif : {minutesEnHHMM(totalMinutes)}</h2>
        </>
      )}
    </div>
  );
};

export default HeureCalculator;
