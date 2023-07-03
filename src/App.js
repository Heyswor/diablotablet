import LevelCalculator from "./components/LevelCalculator/LevelCalculator";
import GlyphCalc from "./components/GlyphCalc/GlyphCalc";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <NavLink
          to="/diablotablet"
          className="navLink"
          activeClassName="active"
        >
          LevelCalculator
        </NavLink>
        <NavLink to="/glyphcalc" className="navLink" activeClassName="active">
          Glyph Calculator
        </NavLink>
      </nav>
      <Routes>
        <Route path="/diablotablet" element={<LevelCalculator />} />
        <Route path="/glyphcalc" element={<GlyphCalc />} />
      </Routes>
    </div>
  );
}

export default App;
