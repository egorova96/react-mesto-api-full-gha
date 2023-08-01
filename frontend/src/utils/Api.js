class Api {
    constructor({ mainUrl, headers }) {
      this._mainUrl = mainUrl;
      this._headers = headers;
    }
    _getAnswer(result) {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  
    getInitialCards() {
        return fetch(`${this._mainUrl}cards`, 
        { method: 'GET',
          headers: this._headers,
         })
         .then(this._getAnswer);
    }
     
    setUserInfo() {
      return fetch(`${this._mainUrl}users/me`, { 
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getAnswer);
    }
          
    editProfile(data) {
    return fetch(`${this._mainUrl}users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
          name: data.name,
          about: data.about
      })
     })
     .then(this._getAnswer)
  }
          
    addCard(data) {
        return fetch(`${this._mainUrl}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        }).then(this._getAnswer);
    }

    editAvatar(data) {
        return fetch(`${this._mainUrl}users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        }).then(this._getAnswer);
      }

      deleteCard(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    
      addLike(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    
      removeLike(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    

        changeLikeCardStatus(cardId, isLiked) {
          return isLiked ? this.removeLike(cardId) : this.addLike(cardId)
    }
  }

    const api = new Api({
      mainUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
      headers: {
        authorization: "c8003cca-5572-430e-8e9c-250a3cfc2feb",
        "Content-Type": "application/json",
      },
    });
    
    export default api

    