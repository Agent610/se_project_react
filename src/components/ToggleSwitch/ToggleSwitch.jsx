import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="ToggleSwitch">
      <input
        type="checkbox"
        className="ToggleSwitch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "ToggleSwitch__slider ToggleSwitch__slider-C"
            : "ToggleSwitch__slider ToggleSwitch__slider-F"
        }
      ></span>
      <p
        className={`ToggleSwitch__Temperature-C ${
          currentTemperatureUnit === "C" && "ToggleSwitch__active"
        }`}
      >
        C
      </p>
      <p
        className={`ToggleSwitch__Temperature-F ${
          currentTemperatureUnit === "F" && "ToggleSwitch__active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
