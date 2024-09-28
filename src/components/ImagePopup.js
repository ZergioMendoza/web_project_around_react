import React, { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
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

  if (!card) return null;

  return (
    <div className={`popup popup_opened`} onClick={onClose}>
      <div className="popup__container">
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__caption">{card.name}</h3>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
