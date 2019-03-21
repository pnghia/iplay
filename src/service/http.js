/* eslint-disable no-restricted-globals */
import axios from 'axios'
import config from 'config'

function handleErrors(response) {
  if (response.status === 401) {
    location.href = '/login'
}
return response
}

export default {
  token: undefined,

  headers: {},

  setJwtToken(token) {
    this.token = token
    this.establishHeaderRequest()
  },

  establishHeaderRequest() {
    this.headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
  },

  get({
    path = ''
  }) {
    return fetch(`${config.baseUrl  }/${  path}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: this.headers,
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      // body: JSON.stringify(payload), // body data type must match "Content-Type" header
    })
    .then(handleErrors)
    .then(response => response.json())
  },

  put({
    path = '',
    payload
  }) {
    return axios({
      baseURL: config.baseUrl,
      data: payload,
      method: 'PUT',
      url: path,
      headers: this.headers
    })
  },

  post({
    path = '',
    payload
  }) {
    return fetch(`${config.baseUrl  }/${  path}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: this.headers,
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
    })
    .then(handleErrors)
    .then(response => response.json())
  },

  postForm({
    path = '',
    payload
  }) {
    // this.setJwtToken();
    return axios({
      baseURL: config.baseUrl,
      data: payload,
      method: 'POST',
      url: path,
      headers: {
        ...this.headers,
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}