class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
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

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api({
  address: 'https://nomoreparties.co',
  token: '973de3af-50d3-4d36-a3b6-c4529a18880b', // Asegúrate de que este sea tu token correcto
});

export default api;
