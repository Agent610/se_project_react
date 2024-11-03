import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");
  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //   if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  // };
  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  //console.log(currentTemperatureUnit);
  return (
    <label className="ToggleSwitch">
      <input
        type="checkbox"
        className="ToggleSwitch__box"
        onChange={handleToggleSwitchChange}
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
