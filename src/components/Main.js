


import { useState, useEffect } from 'react';
import profileLogo from '../images/img-profile.jpg';
import vector from '../images/Vector.svg';
import api from '../utils/Api';
import Card from './Card';
// import EditProfilePopup from './EditProfilePopup';

export default function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick }) { 
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(profileLogo);
  const [cards, setCards] = useState([]); 

  // Cargar la información del usuario al montar el componente
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.error(`Error obteniendo datos del usuario: ${err}`));
  }, []);

  // Cargar las tarjetas al montar el componente
  useEffect(() => {
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.error(`Error obteniendo tarjetas: ${err}`));
  }, []);

  // Función para manejar el "like" de una tarjeta
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === 'currentUserId'); // Usa tu propio ID de usuario

    // Llama a la API para actualizar el estado del "like"
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) =>
          prevState.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(`Error actualizando el like de la tarjeta: ${err}`));
  }

  // Función para manejar la eliminación de una tarjeta
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevState) =>
          prevState.filter((c) => c._id !== card._id)
        );
      })
      .catch((err) => console.error(`Error eliminando la tarjeta: ${err}`));
  }

  return (
    <main id="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div className="profile__avatar-edit-icon">
            <img src={vector} alt="Edit icon" />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={onEditProfileClick} aria-label="Edit profile"></button>
          <p className="profile__about">{userDescription}</p>
          <button className="profile__add-button" onClick={onAddPlaceClick} aria-label="Add place"></button>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id} // Usa _id si es lo que te da la API, verifica el nombre del campo
            card={card}
            onCardClick={onCardClick} 
            onCardLike={handleCardLike}  // Pasamos el manejador de like
            onCardDelete={handleCardDelete}  // Pasamos el manejador de eliminación
          />
        ))}
      </section>
    </main>
  );
}


 

