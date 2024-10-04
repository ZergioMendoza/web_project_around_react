import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Actualizar avatar"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar-url"
        className="popup__input"
        placeholder="URL del nuevo avatar"
        required
        ref={avatarRef} // Usamos ref para acceder al valor del input
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
