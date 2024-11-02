import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");
  const handleChange = (e) => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };
  console.log(currentTemperatureUnit);
  return (
    <label className="ToggleSwitch">
      <input
        type="checkbox"
        className="ToggleSwitch__box"
        onChange={handleChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "ToggleSwitch__slider ToggleSwitch__slider-F"
            : "ToggleSwitch__slider ToggleSwitch__slider-C"
        }
      ></span>
      <p
        className={`ToggleSwitch__Temperature-F ${
          currentTemperatureUnit === "F" && "ToggleSwitch__active"
        }`}
      >
        F
      </p>
      <p
        className={`ToggleSwitch__Temperature-C ${
          currentTemperatureUnit === "C" && "ToggleSwitch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
