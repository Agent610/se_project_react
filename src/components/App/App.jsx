import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectRoute/ProtectedRoute";
//import { Switch, Route } from "react-router-dom";
//import { useHistory } from "react-router-dom";
//ADD Auth.js
//ADD API.Js

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  console.log(clothingItems);

  const [currentUser, setCurrentUserContext] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    api
      .getItemList()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((item) => {
        console.log(item);
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    console.log(`Deleting item with id: ${card._id}`);
    api
      .removeItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleRegisterSubmit = (e) => {
    api.signUp
      .then(() => {
        onSubmit(email, password, name, avatar);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  const handleLoginSubmit = (e) => {
    api.signIn
      .then(() => {
        onSubmit(email, password);
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked;
    api
      .addCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));

    api
      .removeCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  const isAuthenticated = true;

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.err);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} /> >
                (
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleCardDelete={handleCardDelete}
                    onAddNewClick={() => setActiveModal("add-garment")}
                  />
                )
              }
            />
          </Routes>
        </div>
        <ItemModal
          handleCardDelete={handleCardDelete}
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          isLiked={handleCardLike}
        />
        <Footer />
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onSubmit={handleAddItemSubmit}
        />
        <LoginModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          onSubmit={handleLoginSubmit}
        />
        <RegisterModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          onSubmit={handleRegisterSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
      <CurrentUserContext.Provider value={currentUser} isLoggedIn={""}>
        <div className="page"></div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
