import React from 'react';

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card); // Llama al handler onCardClick y pasa los datos de la tarjeta
  }

  return (
    <article className="card">
      <div 
        className="card__image" 
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick} // Maneja el clic en la imagen
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
