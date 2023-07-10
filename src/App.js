import LevelCalculator from "./components/LevelCalculator/LevelCalculator";
import GlyphCalc from "./components/GlyphCalc/GlyphCalc";
import Tirandill from "./components/Tirandill/Tirandill"
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/" className="navLink" activeClassName="active">
          LevelCalculator
        </NavLink>
        <NavLink to="/glyphcalc" className="navLink" activeClassName="active">
          Glyph Calculator
        </NavLink>
        <NavLink to="/admin" className="navLink" activeClassName="active">
          Admin page{" "}
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LevelCalculator />} />
        <Route path="/glyphcalc" element={<GlyphCalc />} />
        <Route path="/admin" element={<Tirandill />} />
      </Routes>
    </div>
  );
}

export default App;
