import React from 'react';
import closeButton from '../images/icon/close-button.svg'; // Importa la imagen del botón de cierre

export default function PopupWithForm({ title, name, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar */}
        <button className="popup__close" type="button" onClick={onClose}>
          <img src={closeButton} alt="Cerrar popup" />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name}>
          {children}
          <button type="submit" className="popup__submit">Guardar</button>
        </form>
      </div>
    </div>
  );
}
