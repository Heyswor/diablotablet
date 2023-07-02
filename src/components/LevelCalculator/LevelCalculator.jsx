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
  const [errorMessage, setErrorMessage] = useState("");

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

  const recalculateRequiredValues = () => {
    const start = parseInt(startLevel, 10);
    const end = parseInt(endLevel, 10);

    const requiredExperienceFormatted = requiredExperience.toLocaleString();
    const requiredTimeFormatted = requiredTime.toLocaleString();

    setRequiredExperience(requiredExperienceFormatted);
    setRequiredTime(requiredTimeFormatted);
    setErrorMessage("");

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
      setErrorMessage("");
    } else {
      setRequiredExperience("");
      setRequiredTime("");
      setErrorMessage("Fill in all the fields");
    }
  };

  useEffect(() => {
    recalculateRequiredValues();
  }, [startLevel, endLevel, experiencePerTime, timeInterval]);

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
        </div>
        <div className={css.info}>
          {errorMessage && (
            <div className={css.infoError}>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className={css.infoResult}>
            {requiredExperience && (
              <div className={css.infoResultBlock}>
                <h3>Required Experience:</h3>
                <p>{requiredExperience.toLocaleString()}</p>
              </div>
            )}

            {requiredTime && (
              <div className={css.infoResultBlock}>
                <h3>Required Time:</h3>
                <p>{requiredTime.toLocaleString()} </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LevelCalculator;
