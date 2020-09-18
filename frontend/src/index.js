import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'index.css' // Generated by tailwind
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'ecommerce-a2z.firebaseapp.com',
  databaseURL: 'https://ecommerce-a2z.firebaseio.com',
  projectId: 'ecommerce-a2z',
  storageBucket: 'ecommerce-a2z.appspot.com',
  messagingSenderId: '20408455475',
  appId: '1:20408455475:web:44ff651e45b34622c82e46',
  measurementId: 'G-C3MJ8GSTLY',
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
