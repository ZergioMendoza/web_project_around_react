import React, { useEffect } from 'react';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, children }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
