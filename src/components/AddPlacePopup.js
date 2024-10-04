import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState(''); // Asegúrate de que name tenga un valor inicial
  const [link, setLink] = useState(''); // Asegúrate de que link tenga un valor inicial

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link }); // Pasa los datos de la nueva tarjeta
  }

  return (
    <PopupWithForm
      title="Nueva tarjeta"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input"
        placeholder="Nombre"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="url"
        name="link"
        className="popup__input"
        placeholder="URL de la imagen"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
