import React, { useState, useEffect } from "react";
import levelsData from "../../levels.json";

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

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      setRequiredExperience(requiredExperience);
      setRequiredTime(formattedTime);
      setErrorMessage("");
    } else {
      setRequiredExperience("");
      setRequiredTime("");
      setErrorMessage("Заполните все поля");
    }
  };

  useEffect(() => {
    recalculateRequiredValues();
  }, [startLevel, endLevel, experiencePerTime, timeInterval]);

  return (
    <div>
      <h2>Level Calculator</h2>
      <div>
        <label>
          Start Level:
          <input
            type="number"
            value={startLevel}
            onChange={handleStartLevelChange}
          />
        </label>
        <label>
          End Level:
          <input
            type="number"
            value={endLevel}
            onChange={handleEndLevelChange}
          />
        </label>
        <label>
          Time Interval (minutes):
          <input
            type="number"
            value={timeInterval}
            onChange={handleTimeIntervalChange}
          />
        </label>
        <label>
          Experience per Time:
          <input
            type="number"
            value={experiencePerTime}
            onChange={handleExperiencePerTimeChange}
          />
        </label>
      </div>

      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      {requiredExperience && (
        <div>
          <h3>Required Experience:</h3>
          <p>{requiredExperience}</p>
        </div>
      )}

      {requiredTime && (
        <div>
          <h3>Required Time:</h3>
          <p>{requiredTime} (часов:минут)</p>
        </div>
      )}
    </div>
  );
};

export default LevelCalculator;
