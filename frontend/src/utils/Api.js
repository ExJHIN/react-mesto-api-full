class Api {
  constructor({baseUrl,headers,credentials}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this.credentials = credentials;
  }

  getInfo() {
    return Promise.all([this.getInitialCards(), this.getProfile()])
  }

  getProfile(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkHelper)
    .catch(console.log)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkHelper)
    .catch(console.log)
  }

  editProfile(name,about) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about
      })
    }).then(this.checkHelper)
    .catch(console.log)
  }

  addImage(name,link) {
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link
      })
    }).then(this.checkHelper)
    .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then(this.checkHelper)
    .catch(console.log)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: "DELETE",
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkHelper)
    .catch(console.log)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: "PUT",
      headers: this._headers,
      credentials: 'include'
    }).then(this.checkHelper)
    .catch(console.log)
  }

  editAvatar( avatar ) {
    return fetch(`${this._baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      })
    }).then(this.checkHelper)
    .catch(console.log)
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.deleteLike(id);
  }

  checkHelper(res) {
    if (res.ok) {
      console.log('ok');
      return res.json()}
    else {
      return Promise.reject(`Ошибка: ${res.status}`)};
  }

  updateToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
  }
}

const token = localStorage.getItem('jwt');

export const api = new Api({
  baseUrl: "https://api.mesto.students.nomoredomains.work",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
