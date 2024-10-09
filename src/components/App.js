import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from './Contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Efecto para obtener los datos de usuario y tarjetas al cargar el componente
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.error(`Error obteniendo los datos: ${err}`));
  }, []);

  // Controlador para abrir los popups
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Función para cerrar todos los popups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  // Función para actualizar los datos del usuario
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.updateUserInfo(data)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups(); // Cerrar el popup después de la actualización
      })
      .catch(err => console.error(`Error actualizando los datos del usuario: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Función para actualizar el avatar del usuario
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups(); // Cerrar el popup después de la actualización
      })
      .catch(err => console.error(`Error actualizando el avatar: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Función para dar y quitar like a las tarjetas
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(cards.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.error(`Error dando like a la tarjeta: ${err}`));
  }

  // Función para eliminar una tarjeta
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch(err => console.error(`Error eliminando la tarjeta: ${err}`));
  }

  // Función para agregar una nueva tarjeta
  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true); // Indicador de carga mientras se realiza la solicitud API
    api.addCard({ name, link })
      .then(newCard => {
        // Actualiza el estado de las tarjetas agregando la nueva tarjeta al inicio del array
        setCards([newCard, ...cards]);
        closeAllPopups(); // Cierra el popup después de agregar la tarjeta
      })
      .catch(err => console.error(`Error añadiendo la tarjeta: ${err}`))
      .finally(() => setIsLoading(false)); // Restablece el estado de carga
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards} // Pasar las tarjetas al componente Main
          onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
          onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
          onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
