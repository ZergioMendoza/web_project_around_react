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
  
  const [name, setName] = useState('Jacques Cousteau');
  const [about, setAbout] = useState('Explorador');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  // Definición de handleCardClick
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditProfileSubmit(e) {
    e.preventDefault();
    // Lógica para manejar el envío del formulario de editar perfil
    console.log('Perfil editado:', { name, about });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    // Lógica para manejar el envío del formulario de añadir lugar
    console.log('Nueva tarjeta:', { title, imageUrl });
    closeAllPopups();
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
        onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
        onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
        onCardClick={handleCardClick} // Asegúrate de que esta línea esté presente
      />
      <Footer />

      {/* Popup de editar perfil */}
      <PopupWithForm
        title="Editar perfil"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleEditProfileSubmit}
      >
        <input
          type="text"
          className="popup__input popup__input-name"
          name="name"
          value={name}
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error input-name-error"></span>
        <input
          type="text"
          className="popup__input popup__input-about"
          name="about"
          value={about}
          placeholder="Sobre mí"
          minLength="2"
          maxLength="40"
          required
          onChange={(e) => setAbout(e.target.value)}
        />
        <span className="popup__input-error input-about-error"></span>
      </PopupWithForm>

      {/* Popup para añadir tarjeta */}
      <PopupWithForm
        title="Nuevo lugar"
        name="add-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      >
        <input
          type="text"
          className="popup__input popup__newplaces-input-name"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="40"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="popup__input-error input-title-error"></span>
        <input
          type="url"
          className="popup__input popup__newplaces-input-about"
          name="image-url"
          placeholder="URL de la imagen"
          required
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <span className="popup__input-error input-url-error"></span>
      </PopupWithForm>

      {/* Popup de imagen */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
