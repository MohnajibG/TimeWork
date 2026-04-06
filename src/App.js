import HeureCalculator from "./HeureCalculator";
import logo from "./assets/bellanotte.png";

const App = () => {
  return (
    <div className="app">
      <img src={logo} alt="Bella Notte" className="logo" />

      <HeureCalculator />
    </div>
  );
};

export default App;
