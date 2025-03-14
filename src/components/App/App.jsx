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
// import {
//   getItemList,
//   addItem,
//   removeItem,
//   addCardLike,
//   removeCardLike,
// } from "../../utils/api";
import api from "../../utils/api";
import { signIn, signUp, editProfile, getCurrentUser } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectRoute/ProtectedRoute";
import { getToken } from "../../utils/token";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSigninClick = () => {
    setActiveModal("login");
  };

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleEdit = () => {
    setActiveModal("edit");
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
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleRegisterSubmit = ({ email, password, name, avatar }) => {
    signUp({ email, password, name, avatar })
      .then(() => {
        setIsLoggedIn(true);
        handleLoginSubmit({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSubmit = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleEditSubmit = ({ name, avatar }) => {
    editProfile(
      { name, avatar }
        .then(() => {
          setIsLoggedIn(true);
          setCurrentUser((previousUser) => {
            previousUser, name, avatar;
          });
          closeActiveModal();
          navigate("/profile");
        })
        .catch((err) => console.log(err))
    );
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt", res.token);
    setCurrentUser({});
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
    const token = getToken();
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setIsLoggedIn(true);
          setUserData(user);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSigninClick={handleSigninClick}
              handleSignupClick={handleSignupClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardDelete={handleCardDelete}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} /> >
                  (
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardDelete={handleCardDelete}
                      handleSigninClick={handleSigninClick}
                      handleSignupClick={handleSignupClick}
                      isLoggedIn={isLoggedIn}
                      handleEdit={handleEdit}
                      handleLogout={handleLogout}
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
            isOpen={activeModal === "preview"}
            handleCardDelete={handleCardDelete}
            card={selectedCard}
            isLiked={handleCardLike}
            onClose={closeActiveModal}
          />

          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onSubmit={handleAddItemSubmit}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleLoginSubmit}
            handleSigninClick={handleSigninClick}
            handleSignupClick={handleSignupClick}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSubmit={handleRegisterSubmit}
            handleSigninClick={handleSigninClick}
            handleSignupClick={handleSignupClick}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
            onSubmit={handleEditSubmit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
