import React, { useState } from 'react';

function Card({ card, onCardClick }) {
  const [isLiked, setIsLiked] = useState(false); // Estado para manejar el like

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Cambia el estado de like
  };

  return (
    <div className="cards__card">
      <img 
        src={card.link} 
        alt={card.name} 
        className="cards__image"
        onClick={() => onCardClick(card)} 
      />
      <div className="cards__menu">
        <button 
          className={`cards__like-icon ${isLiked ? 'cards__like-color' : ''}`} 
          onClick={handleLikeClick}
        />
        <h2 className="cards__title">{card.name}</h2>
        <p className="cards__like-count">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
