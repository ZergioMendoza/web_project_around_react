
// // export default App;
// import React, { useState } from 'react';
// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
// import PopupWithForm from './PopupWithForm';
// import ImagePopup from './ImagePopup';

// function App() {
//   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
//   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
//   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
  
//   // Estado de las tarjetas
//   const [cards, setCards] = useState([
//     { id: 1, name: 'Card 1', link: '/images/card1.jpg', likes: [] },
//     { id: 2, name: 'Card 2', link: '/images/card2.jpg', likes: [] },
//     // Añade más tarjetas según sea necesario
//   ]);

//   // Función para manejar el clic en la tarjeta
//   function handleCardClick(card) {
//     setSelectedCard(card); // Actualiza la tarjeta seleccionada
//   }

//   // Función para manejar los "likes" en las tarjetas
//   function handleCardLike(card) {
//     const isLiked = card.likes.includes('currentUserId'); // Simula el ID del usuario actual
//     const updatedCards = cards.map((c) =>
//       c.id === card.id
//         ? {
//             ...c,
//             likes: isLiked
//               ? c.likes.filter((id) => id !== 'currentUserId') // Elimina el "like"
//               : [...c.likes, 'currentUserId'], // Añade el "like"
//           }
//         : c
//     );
//     setCards(updatedCards); // Actualiza el estado de las tarjetas
//   }

//   // Función para manejar la eliminación de una tarjeta
//   function handleCardDelete(card) {
//     const updatedCards = cards.filter((c) => c.id !== card.id); // Elimina la tarjeta del array
//     setCards(updatedCards); // Actualiza el estado de las tarjetas
//   }

//   // Función para cerrar todos los popups
//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setIsEditAvatarPopupOpen(false);
//     setSelectedCard(null); // Cierra el popup de la imagen
//   }

//   return (
//     <div className="page">
//       <Header />
//       <Main
//         cards={cards} // Pasamos las tarjetas al componente Main
//         onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
//         onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
//         onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
//         onCardClick={handleCardClick} // Pasa la función handleCardClick a Main
//         onCardLike={handleCardLike}  // Pasa la función handleCardLike a Main
//         onCardDelete={handleCardDelete}  // Pasa la función handleCardDelete a Main
//       />
//       <Footer />

//       {/* Popup para editar el perfil */}
//       <PopupWithForm
//         title="Editar perfil"
//         name="edit-profile"
//         isOpen={isEditProfilePopupOpen}
//         onClose={closeAllPopups}
//         onSubmit={(e) => {
//           e.preventDefault();
//           // Lógica para editar perfil aquí
//           closeAllPopups();
//         }}
//       >
//         <input
//           type="text"
//           name="name"
//           className="popup__input"
//           placeholder="Nombre"
//           required
//           minLength="2"
//           maxLength="40"
//         />
//         <input
//           type="text"
//           name="about"
//           className="popup__input"
//           placeholder="Sobre mí"
//           required
//           minLength="2"
//           maxLength="200"
//         />
//       </PopupWithForm>

//       {/* Popup para añadir un lugar */}
//       <PopupWithForm
//         title="Nuevo lugar"
//         name="add-place"
//         isOpen={isAddPlacePopupOpen}
//         onClose={closeAllPopups}
//         onSubmit={(e) => {
//           e.preventDefault();
//           // Lógica para añadir lugar aquí
//           closeAllPopups();
//         }}
//       >
//         <input
//           type="text"
//           name="title"
//           className="popup__input"
//           placeholder="Título"
//           required
//           minLength="2"
//           maxLength="30"
//         />
//         <input
//           type="url"
//           name="image-url"
//           className="popup__input"
//           placeholder="URL de la imagen"
//           required
//         />
//       </PopupWithForm>

//       {/* Popup para editar el avatar */}
//       <PopupWithForm
//         title="Actualizar avatar"
//         name="edit-avatar"
//         isOpen={isEditAvatarPopupOpen}
//         onClose={closeAllPopups}
//         onSubmit={(e) => {
//           e.preventDefault();
//           // Lógica para actualizar avatar aquí
//           closeAllPopups();
//         }}
//       >
//         <input
//           type="url"
//           name="avatar-url"
//           className="popup__input"
//           placeholder="URL del nuevo avatar"
//           required
//         />
//       </PopupWithForm>

//       {/* Popup para la imagen seleccionada */}
//       <ImagePopup card={selectedCard} onClose={closeAllPopups} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api'; // Importamos la instancia de la API
import CurrentUserContext from './Contexts/CurrentUserContext'; // Asegúrate de que la ruta sea correcta
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'; // Asegúrate de importar el nuevo componente

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Aquí creamos el estado de currentUser y cards
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); // Estado para las tarjetas

  // Llamar a la API para obtener la información del usuario y las tarjetas cuando se monta el componente
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData); // Actualiza el estado con los datos del usuario
        setCards(cardData); // Actualiza el estado con los datos de las tarjetas
      })
      .catch(err => console.error(`Error obteniendo los datos: ${err}`));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card); 
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null); 
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.error(`Error actualizando los datos del usuario: ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.error(`Error actualizando el avatar: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(cards.map(c => (c._id === card._id ? newCard : c))); // Actualiza la tarjeta
      })
      .catch(err => console.error(`Error dando like a la tarjeta: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id)); // Elimina la tarjeta de la lista
      })
      .catch(err => console.error(`Error eliminando la tarjeta: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]); // Agrega la nueva tarjeta al principio de la lista
        closeAllPopups();
      })
      .catch(err => console.error(`Error añadiendo la tarjeta: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards} // Pasa las tarjetas a Main
          onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
          onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
          onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike} // Pasa el manejador de like
          onCardDelete={handleCardDelete} // Pasa el manejador de eliminación
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} // Pasa el manejador para añadir tarjeta
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
