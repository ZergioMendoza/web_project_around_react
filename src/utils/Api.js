

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

  // Método para dar "like" a una tarjeta o quitarlo según el estado
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  // Método para añadir un "like" a la tarjeta
  addLike(cardId) {
    return fetch(`${this._address}/v1/web_es_11/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // Método para quitar "like" a la tarjeta
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
    })
      .then(this._checkResponse)
      .then((data) => {
        // Verificar la estructura de la respuesta y ajustarla si es necesario
        return data;
      });
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
    })
      .then(this._checkResponse)
      .then((data) => {
        // Asegúrate de que los datos del avatar sean consistentes
        return data;
      });
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
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
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