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
  //const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };

  const handleSigninClick = () => {
    setActiveModal("login");
  };

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleEditClick = () => {
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
      .then(({ items }) => {
        setClothingItems(items.reverse());
      })
      .catch((err) => console.error("Cannot retrieve items", err));
  }, [isLoggedIn]);

  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    api
      .addItem(item, token)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Cannot add item", err));
  };

  const handleCardDelete = (card) => {
    api
      .removeItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((err) => console.error("Cannot delete item", err));
  };

  const handleRegisterSubmit = ({ email, password, name, avatar }) => {
    signUp({ email, password, name, avatar })
      .then(() => {
        //setIsLoggedIn(true);
        handleLoginSubmit({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.error("Cannot register user", err));
  };

  const handleLoginSubmit = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserData();
        //setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Cannot log user in", err));
  };

  const handleEditSubmit = ({ name, avatar }) => {
    console.log("Submitting edit with:", { name, avatar });
    editProfile({ name, avatar })
      .then((data) => {
        console.log("Edit profile response:", data);
        setCurrentUser(data.user);
        // setIsLoggedIn(true);
        // setCurrentUser((previousUser) => {
        //   previousUser, name, avatar;
        // });
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Cannot edit the current user", err));
  };

  // const handleCardLike = ({ id, isLiked }) => {
  //   const token = localStorage.getItem("jwt");
  //   // !isLiked;
  //   // api
  //   //   .addCardLike(id, token)
  //   const apiCall = isLiked ? api.removeCardLike : api.addCardLike;
  //   apiCall(id, token)
  //     .then((updatedCard) => {
  //       setClothingItems((cards) =>
  //         cards.map((item) => (item._id === id ? updatedCard : item))
  //       );
  //     })
  //     // .catch((err) => console.error("Cannot like the item", err));
  //     // api
  //     //   .removeCardLike(id, token)
  //     //   .then((updatedCard) => {
  //     //     setClothingItems((cards) =>
  //     //       cards.map((item) => (item._id === id ? updatedCard : item))
  //     //     );
  //     //   })
  //     //   .catch((err) => console.error("Cannot remove the current like", err));
  //     .catch((err) =>
  //       console.error(
  //         `Cannot ${isLiked ? "remove like from" : "like"} the item`,
  //         err
  //       )
  //     );
  // };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const apiCall = isLiked ? api.addCardLike : api.removeCardLike;

    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedCard.id ? updatedCard : item
          )
        );
      })
      .catch((err) =>
        console.error(`Cannot ${isLiked ? "unlike" : "like"} item`, err)
      );
  };
  const handleLogout = (res) => {
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

  function getUserData() {
    const token = getToken();
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) =>
          console.error("Cannot retrive current user information", err)
        );
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} isLoggedIn={isLoggedIn}>
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      //onCardClick={onCardClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardDelete={handleCardDelete}
                      handleSigninClick={handleSigninClick}
                      handleSignupClick={handleSignupClick}
                      isLoggedIn={isLoggedIn}
                      handleEditClick={handleEditClick}
                      handleLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              {/* <Route
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
              /> */}
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
            handleEditClick={handleEditClick}
            onSubmit={handleEditSubmit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
