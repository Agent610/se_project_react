//import React from "react";
import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;
