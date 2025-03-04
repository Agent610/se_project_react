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
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectRoute/ProtectedRoute";
import { getToken } from "../../utils/auth";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const Navigate = useNavigate();

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
    if (password === confirmPassword) e.preventDefault();
    api
      .signUp({ email, password, name, avatar })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        Navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSubmit = (e) => {
    if (!email || !password) {
      return;
    }
    e.preventDefault();
    api
      .signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        Navigate("/Profile");
      })
      .catch((err) => console.log(err));
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

  //const isAuthenticated = true;

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.err);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setUserData(user);
        })
        .catch((err) => console.error(err));
    }
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
                <ProtectedRoute isLoggedIn={isLoggedIn} /> >
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
            <Route
              path="/login"
              element={
                <div className="loginContainer">
                  <LoginModal handleLogin={handleLoginSubmit} />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="registerContainer">
                  <RegisterModal handleRegistration={handleRegisterSubmit} />
                  <RegisterModal />
                </div>
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
