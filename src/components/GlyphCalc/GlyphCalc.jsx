import React, { useState, useEffect, useMemo } from "react";
import glyphLevelData from "./jsons/glevels.json";
import nmdExp from "./jsons/nmdexp.json";
import css from "./GlyphCalc.module.css";

const GlyphCalc = () => {
  const [formData, setFormData] = useState({
    startGlyphLevel: "",
    endGlyphLevel: "",
    nmdLevel: "",
  });
  const [requiredRuns, setRequiredRuns] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { startGlyphLevel, endGlyphLevel, nmdLevel } = formData;

  const start = useMemo(() => parseInt(startGlyphLevel, 10), [startGlyphLevel]);
  const end = useMemo(() => parseInt(endGlyphLevel, 10), [endGlyphLevel]);
  const key = useMemo(() => parseInt(nmdLevel, 10), [nmdLevel]);

  useEffect(() => {
    if (start <= end && start >= 1 && end <= 21) {
      let totalExp = 0;
      let res = 1;

      for (let i = start; i <= end; i++) {
        if (glyphLevelData[i]) {
          totalExp += glyphLevelData[i];
        }
      }

      if (nmdExp.hasOwnProperty(key)) {
        res = nmdExp[key];
      }

      const requiredRuns = totalExp / res;
      setRequiredRuns(Math.ceil(requiredRuns));
    } else {
      setRequiredRuns("");
    }
  }, [start, end, key]);

  return (
    <div>
      <header>
        <h2 className={css.header}>Diablo 4 Glyph Calculator</h2>
      </header>
      <main className={css.main}>
        <div className={css.calcBody}>
          <label className={css.calcLabel}>
            Starting Glyph level
            <input
              className={css.calcInput}
              type="number"
              name="startGlyphLevel"
              value={startGlyphLevel}
              onChange={handleInputChange}
            />
          </label>
          <label className={css.calcLabel}>
            Ending Glyph level
            <input
              className={css.calcInput}
              type="number"
              name="endGlyphLevel"
              value={endGlyphLevel}
              onChange={handleInputChange}
            />
          </label>
          <label className={css.calcLabel}>
            Level of Nightmare Dungeon
            <input
              className={css.calcInput}
              type="number"
              name="nmdLevel"
              value={nmdLevel}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={css.info}>
          <div className={css.infoResultBlock}>
            <h3>Required Runs: {requiredRuns}</h3>
          </div>
        </div>
        <div className={css.info}>
          <div className={css.infoResultBlock}>
            <h3>Required Time: {requiredRuns}</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlyphCalc;
