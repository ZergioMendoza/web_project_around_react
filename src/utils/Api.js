
// class Api {
//   constructor({ address, token }) {
//     this._address = address;
//     this._token = token;
//   }

//   // Método para obtener la información del usuario
//   getUserInfo() {
//     return fetch(`${this._address}/v1/web_es_11/users/me`, {
//       headers: {
//         authorization: this._token,
//       },
//     }).then(this._checkResponse);
//   }

//   // Método para obtener las tarjetas (cards)
//   getCards() {
//     return fetch(`${this._address}/v1/web_es_11/cards`, {
//       headers: {
//         authorization: this._token,
//       },
//     }).then(this._checkResponse);
//   }

//   // Método para manejar el estado de los likes
//   changeLikeCardStatus(cardId, isLiked) {
//     return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
//       method: isLiked ? 'DELETE' : 'PUT', // Si isLiked es true, quitar like, si no, añadir like
//       headers: {
//         authorization: this._token,
//       },
//     }).then(this._checkResponse);
//   }

//   // Método para agregar "like" (ya no es necesario con changeLikeCardStatus)
//   addLike(cardId) {
//     return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
//       method: 'PUT',
//       headers: {
//         authorization: this._token,
//       },
//     }).then(this._checkResponse);
//   }

//   // Método para quitar "like" (ya no es necesario con changeLikeCardStatus)
//   removeLike(cardId) {
//     return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
//       method: 'DELETE',
//       headers: {
//         authorization: this._token,
//       },
//     }).then(this._checkResponse);
//   }

//   // Método para verificar la respuesta del servidor
//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   }
// }

// // Inicializar la clase Api con la dirección y token
// const api = new Api({
//   address: 'https://nomoreparties.co',
//   token: '973de3af-50d3-4d36-a3b6-c4529a18880b', // Asegúrate de que este sea tu token correcto
// });

// export default api;
class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  // Método para verificar la respuesta de la API
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Método para obtener la información del usuario
  getUserInfo() {
    return fetch(`${this._address}/v1/web_es_11/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // Método para obtener las tarjetas (cards)
  getCards() {
    return fetch(`${this._address}/v1/web_es_11/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // Método para dar "like" a una tarjeta
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  addLike(cardId) {
    return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // Método para quitar "like" a una tarjeta
  removeLike(cardId) {
    return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // Método para actualizar la información del perfil
  updateUserInfo({ name, about }) {
    return fetch(`${this._address}/v1/web_es_11/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  // Método para actualizar el avatar del usuario
  updateAvatar(avatarUrl) {
    return fetch(`${this._address}/v1/web_es_11/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }

  // Método para crear una nueva tarjeta
  addCard({ name, link }) {
    return fetch(`${this._address}/v1/web_es_11/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  // Método para eliminar una tarjeta
  deleteCard(cardId) {
    return fetch(`${this._address}/v1/web_es_11/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }
}

// Exporta una instancia de Api con la configuración predeterminada
const api = new Api({
  address: 'https://nomoreparties.co',
  token: '973de3af-50d3-4d36-a3b6-c4529a18880b', // Asegúrate de que este sea tu token correcto
});

export default api;
