/* eslint-disable no-restricted-globals */
import axios from 'axios'
import config from 'config'
import store from 'store'
import queryString from 'query-string'

function handleErrors(response) {
  if ([200, 201].includes(response.status)) {
    return response
  }
  if (response.status === 401) {
    store.clearAll()
    location.href = '/?loginSidebar=true'
  }
  
  throw response
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
    path = '',
    params
  }) {
    return fetch(`${config.baseUrl}/${path}?${queryString.stringify(params)}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      referrer: "no-referrer",
    })
    .then(handleErrors)
    .then(response => response.json())
    .catch(async err => {throw await err.json()})
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
    return fetch(`${config.baseUrl}/${path}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(payload),
    })
    .then(handleErrors)
    .then(response => response.json())
    .catch(async err => {throw await err.json()})
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