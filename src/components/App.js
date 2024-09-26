import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'; // Importar ImagePopup

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Estado para la tarjeta seleccionada

  // Función para manejar clic en la tarjeta
  function handleCardClick(card) {
    setSelectedCard(card); // Guardamos la tarjeta seleccionada
  }

  // Función para cerrar todos los popups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null); // Cerramos la imagen
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
        onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
        onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
        onCardClick={handleCardClick} // Asegúrate de pasar el prop onCardClick aquí
      />
      <Footer />

      {/* Popups */}
      <PopupWithForm
        title="Editar perfil"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* Formulario de editar perfil */}
      </PopupWithForm>

      <PopupWithForm
        title="Nuevo lugar"
        name="add-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {/* Formulario de añadir lugar */}
      </PopupWithForm>

      <PopupWithForm
        title="Cambiar imagen de perfil"
        name="change-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        {/* Formulario de cambiar avatar */}
      </PopupWithForm>

      {/* Popup de imagen completa */}
      <ImagePopup
        card={selectedCard} // Pasamos la tarjeta seleccionada
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
