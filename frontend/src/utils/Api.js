class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  };
    #getAnswer(result) {
      if (result.ok) {
        return result.json();
      };
  
      return Promise.reject(`Ошибка: ${result.status}`);
    }

    getCards() {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this.#getAnswer);
    };
     
    getUserInfo() {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this.#getAnswer);
    }
          
    editProfile({name, about}) {
      const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}users/me`,{
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
          name: name,
          about: about
      })
     })
     .then(this.#getAnswer)
  }
          
    addCard(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this.#getAnswer);
    }

    editAvatar(avatar) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          avatar,
        }),
      }).then(this.#getAnswer);
      }

      deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(this.#getAnswer);
      }
    
      addLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }).then(this.#getAnswer);
      }
    
      removeLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }).then(this.#getAnswer);
      }
    

      changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.removeLike(cardId) : this.addLike(cardId)
      }
  }


export const api = new Api({
  //baseUrl: "https://egorovaas96.nomoreparties.co/",
  baseUrl: process.env.REACT_APP_API_BASE_URL
});
    