import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card); // Actualiza la tarjeta seleccionada
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null); // Cierra el popup de la imagen
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
        onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
        onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
        onCardClick={handleCardClick} // Pasa la función handleCardClick a Main
      />
      <Footer />

      {/* Popup para editar el perfil */}
      <PopupWithForm
        title="Editar perfil"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={(e) => {
          e.preventDefault();
          // Lógica para editar perfil aquí
          closeAllPopups();
        }}
      >
        <input
          type="text"
          name="name"
          className="popup__input"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
        />
        <input
          type="text"
          name="about"
          className="popup__input"
          placeholder="Sobre mí"
          required
          minLength="2"
          maxLength="200"
        />
      </PopupWithForm>

      {/* Popup para añadir un lugar */}
      <PopupWithForm
        title="Nuevo lugar"
        name="add-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={(e) => {
          e.preventDefault();
          // Lógica para añadir lugar aquí
          closeAllPopups();
        }}
      >
        <input
          type="text"
          name="title"
          className="popup__input"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
        />
        <input
          type="url"
          name="image-url"
          className="popup__input"
          placeholder="URL de la imagen"
          required
        />
      </PopupWithForm>

      {/* Popup para editar el avatar */}
      <PopupWithForm
        title="Actualizar avatar"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={(e) => {
          e.preventDefault();
          // Lógica para actualizar avatar aquí
          closeAllPopups();
        }}
      >
        <input
          type="url"
          name="avatar-url"
          className="popup__input"
          placeholder="URL del nuevo avatar"
          required
        />
      </PopupWithForm>

      {/* Popup para la imagen seleccionada */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
