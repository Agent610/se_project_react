import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;
