import LevelCalculator from "./components/LevelCalculator/LevelCalculator";
import GlyphCalc from "./components/GlyphCalc/GlyphCalc";
import OrderTablet from "./components/OrderTablet/OrderTablet";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { KnowledgeBase } from "./components/KnowledgeBase/KnowledgeBase";

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/" className="navLink" activeclassname="active">
          LevelCalculator
        </NavLink>
        <NavLink to="/glyphcalc" className="navLink" activeclassname="active">
          Glyph Calculator
        </NavLink>
        <NavLink to="/orders" className="navLink" activeclassname="active">
          Orders
        </NavLink>
        <NavLink to="/kb" className="navLink" activeclassname="active">
          Knowledge Base
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LevelCalculator />} />
        <Route path="/glyphcalc" element={<GlyphCalc />} />
        <Route path="/orders" element={<OrderTablet />} />
        <Route path="/kb" element={<KnowledgeBase />} />
      </Routes>
    </div>
  );
}

export default App;
