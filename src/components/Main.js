import { useState, useEffect } from 'react';
import profileLogo from '../images/img-profile.jpg';
import vector from '../images/Vector.svg';
import api from '../utils/Api';
import Card from './Card';

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
          />
        ))}
      </section>
    </main>
  );
}