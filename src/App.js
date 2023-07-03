import LevelCalculator from "./components/LevelCalculator/LevelCalculator";
import GlyphCalc from "./components/GlyphCalc/GlyphCalc";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router basename="/diablotablet">
      <div>
        <nav>
          <NavLink to="/" className="navLink" activeClassName="active">
            LevelCalculator
          </NavLink>
          <NavLink to="/glyphcalc" className="navLink" activeClassName="active">
            Glyph Calculator
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LevelCalculator />} />
          <Route path="/glyphcalc" element={<GlyphCalc />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
