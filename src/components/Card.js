import React from 'react';

function Card({ card, onCardClick }) {
  return (
    <div className="cards__card">
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={() => onCardClick(card)} // Al hacer clic en la imagen, pasa la tarjeta
      />
      <div className="cards__menu">
        <h2 className="cards__title">{card.name}</h2>
        <p className="cards__like-count">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
