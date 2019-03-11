import { useState, useEffect } from "react"
import store from 'store'
import http from 'service/http'

const TOKEN = 'token'

function useAuth(initialAuth = store.get(TOKEN)) {
  if(initialAuth && !http.token) {
    console.log(initialAuth);
    http.setJwtToken(initialAuth.token)
  }
  const [auth, setAuth] = useState(initialAuth)
  useEffect(
    () => {
      store.set(TOKEN, auth)
    },
    [auth]
  )
  return [auth, setAuth];
}
export default useAuth;