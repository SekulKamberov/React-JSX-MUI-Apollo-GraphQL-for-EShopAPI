import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import apolloClient from './apollo/config'
import { ApolloProvider } from '@apollo/client'

import AuthContext from './AuthContext'

import App from './App' 
import reportWebVitals from './reportWebVitals'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContext.Provider> 
      <ApolloProvider client={apolloClient}> 
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ApolloProvider>
  </AuthContext.Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
