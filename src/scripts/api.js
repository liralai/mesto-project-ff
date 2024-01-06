const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '7a8ddf5f-9dbc-4325-a07d-0c9c09013273',
    'Content-Type': 'application/json'
  }
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(getResponse);
};

const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponse);
};

const getBaseInfo = async () => {
  return Promise.all([getUserData(), getInitialCards()]);
};

const editUserData = async (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  })
  .then(getResponse);
};

const addNewCard = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
  .then(getResponse);
};

const deleteCardApi = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(getResponse);
};

const addLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(getResponse);
};

const removeLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(getResponse);
};

const updateAvatar = async (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
  .then(getResponse);
};

export { getUserData, getInitialCards, getBaseInfo, editUserData, addNewCard, deleteCardApi, addLike, removeLike, updateAvatar };
