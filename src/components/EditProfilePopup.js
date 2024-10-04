import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const nameRef = useRef('');
  const aboutRef = useRef('');

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = ''; // Limpia el input al abrir
      aboutRef.current.value = ''; // Limpia el input al abrir
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: nameRef.current.value,
      about: aboutRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit-profile"
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
        maxLength="40"
        ref={nameRef}
      />
      <input
        type="text"
        name="about"
        className="popup__input"
        placeholder="Acerca de mí"
        required
        minLength="2"
        maxLength="200"
        ref={aboutRef}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

