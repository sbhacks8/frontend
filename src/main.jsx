import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="timelyproject.us.auth0.com"
      clientId="0POtC7ZJW80qO0lzLloAy6ru34QmiStr"
      redirectUri={window.location.origin}
      audience="vincentAuth0Id"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
