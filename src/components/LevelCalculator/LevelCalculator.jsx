import React, { useState, useEffect } from "react";
import levelsData from "../../levels.json";
import css from "./LevelCalculator.module.css";

const LevelCalculator = () => {
  const [startLevel, setStartLevel] = useState("");
  const [endLevel, setEndLevel] = useState("");
  const [experiencePerTime, setExperiencePerTime] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [requiredTime, setRequiredTime] = useState("");
  const [keylvl, setKeylvl] = useState("");

  const handleKeylvlChange = (e) => {
    const { value } = e.target;
    setKeylvl(value);
  };

  const handleStartLevelChange = (event) => {
    const { value } = event.target;
    setStartLevel(value);
  };

  const handleEndLevelChange = (event) => {
    const { value } = event.target;
    setEndLevel(value);
  };

  const handleExperiencePerTimeChange = (event) => {
    const { value } = event.target;
    setExperiencePerTime(value);
  };

  const handleTimeIntervalChange = (event) => {
    const { value } = event.target;
    setTimeInterval(value);
  };

  const calculateMonstLvl = () => {
    const baselvl = parseInt(54, 10);
    const targetlvl = parseInt(keylvl, 10);
    if (Number.isNaN(targetlvl)) {
      return ""; // Возвращаем пустую строку, если keylvl не является числом
    }

    const calclvl = baselvl + targetlvl;
    return calclvl;
  };

  const recalculateRequiredValues = () => {
    const start = parseInt(startLevel, 10);
    const end = parseInt(endLevel, 10);

    const requiredExperienceFormatted = requiredExperience.toLocaleString();
    const requiredTimeFormatted = requiredTime.toLocaleString();

    setRequiredExperience(requiredExperienceFormatted);
    setRequiredTime(requiredTimeFormatted);

    if (
      start <= end &&
      start >= 1 &&
      end <= 100 &&
      experiencePerTime &&
      timeInterval
    ) {
      let totalExperience = 0;

      for (let i = start; i <= end; i++) {
        if (levelsData[i]) {
          totalExperience += levelsData[i];
        }
      }

      const requiredExperience = totalExperience - levelsData[start];
      const requiredMinutes =
        Math.ceil(requiredExperience / experiencePerTime) * timeInterval;

      const hours = Math.floor(requiredMinutes / 60);
      const minutes = requiredMinutes % 60;

      const formattedTime = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m`;

      setRequiredExperience(requiredExperience);
      setRequiredTime(formattedTime);
    } else {
      setRequiredExperience("");
      setRequiredTime("");
    }
  };

  useEffect(() => {
    recalculateRequiredValues();
  });
  useEffect(() => {
    calculateMonstLvl();
  });

  return (
    <div>
      <header>
        <h2 className={css.header}>Diablo 4 Level Calculator</h2>
      </header>
      <main className={css.main}>
        <div className={css.calcBody}>
          <label className={css.calcLabel}>
            Start Level:
            <input
              type="number"
              value={startLevel}
              onChange={handleStartLevelChange}
              className={css.calcInput}
            />
          </label>
          <label className={css.calcLabel}>
            End Level:
            <input
              type="number"
              value={endLevel}
              onChange={handleEndLevelChange}
              className={css.calcInput}
            />
          </label>

          <label className={css.calcLabel}>
            Time Interval (minutes):
            <input
              type="number"
              value={timeInterval}
              onChange={handleTimeIntervalChange}
              className={css.calcInput}
            />
          </label>
          <label className={css.calcLabel}>
            Experience per Time:
            <input
              type="number"
              value={experiencePerTime}
              onChange={handleExperiencePerTimeChange}
              className={css.calcInput}
            />
          </label>
          <label className={css.calcLabel}>
            Key level:
            <input
              type="number"
              value={keylvl}
              onChange={handleKeylvlChange}
              className={css.calcInput}
            />
            
          </label>
        </div>
        <div className={css.info}>
          <div className={css.infoResult}>
            <div className={css.infoResultBlock}>
              <h3>
                Required Experience: {requiredExperience.toLocaleString()}
              </h3>
            </div>

            <div className={css.infoResultBlock}>
              <h3>Required Time: {requiredTime.toLocaleString()}</h3>
            </div>
            <div className={css.infoResultBlock}>
              <h3>Monster Level: {calculateMonstLvl()}</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LevelCalculator;
