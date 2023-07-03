import React, { useState, useEffect } from "react";
import glyphLevelData from "./glevels.json";
import nmdExp from "./nmdexp.json";
import css from "./GlyphCalc.module.css";

const GlyphCalc = () => {
  const [startGlyphLevel, setStartGlyphLevel] = useState("");
  const [endGlyphLevel, setEndGlyphLevel] = useState("");
  const [nmdLevel, setNmdLevel] = useState("");
  const [requiredRuns, setRequiredRuns] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartGlyphLevel = (event) => {
    const { value } = event.target;
    setStartGlyphLevel(value);
  };

  const handleEndGlyphLevel = (event) => {
    const { value } = event.target;
    setEndGlyphLevel(value);
  };

  const handleNmdLevel = (event) => {
    const { value } = event.target;
    setNmdLevel(value);
  };

  const calculateReqRuns = () => {
    const start = parseInt(startGlyphLevel, 10);
    const end = parseInt(endGlyphLevel, 10);
    const key = parseInt(nmdLevel, 10);

    if (start <= end && start >= 1 && end <= 21) {
      let totalExp = 0;
      let res = 1;

      for (let i = start; i <= end; i++) {
        if (glyphLevelData[i]) {
          totalExp += glyphLevelData[i];
        }
      }

      if (nmdExp.hasOwnProperty(key)) {
        res = Object.values(nmdExp)[key - 1];
      }

      const requiredRuns = totalExp / res;
      setRequiredRuns(Math.ceil(requiredRuns));
    } else {
      setRequiredRuns("");
      setErrorMessage("Fill in all the fields");
    }
  };

  useEffect(() => {
    calculateReqRuns();
  }, [startGlyphLevel, endGlyphLevel, nmdLevel]);

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
              value={startGlyphLevel}
              onChange={handleStartGlyphLevel}
            />
          </label>
          <label className={css.calcLabel}>
            Ending Glyph level
            <input
              className={css.calcInput}
              type="number"
              value={endGlyphLevel}
              onChange={handleEndGlyphLevel}
            />
          </label>
          <label className={css.calcLabel}>
            Level of Nightmare Dungeon
            <input
              className={css.calcInput}
              type="number"
              value={nmdLevel}
              onChange={handleNmdLevel}
            />
          </label>
        </div>
        <div className={css.info}>
          <div className={css.infoResultBlock}>
            <h3>Required Runs: {requiredRuns}</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlyphCalc;
