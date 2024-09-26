import { useState, useEffect } from 'react';
import profileLogo from '../images/img-profile.jpg';
import vector from '../images/Vector.svg';
import api from '../utils/Api';
import Card from './Card'; // Importamos el componente Card

export default function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick }) { // Asegúrate de agregar onCardClick aquí
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(profileLogo);
  const [cards, setCards] = useState([]); // Estado para las tarjetas

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.error(`Error obteniendo datos del usuario: ${err}`));
  }, []);

  // useEffect para obtener las tarjetas de la API
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
          <button className="profile__edit-button" onClick={onEditProfileClick}></button>
          <p className="profile__about">{userDescription}</p>
          <button className="profile__add-button" onClick={onAddPlaceClick}></button>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick} // Pasamos el handler de clic a cada tarjeta
          />
        ))}
      </section>
    </main>
  );
}
