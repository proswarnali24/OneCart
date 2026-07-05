import React, { createContext } from 'react'
import axios from 'axios'

// Set up Axios interceptor to automatically attach JWT token from localStorage
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("onecart_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authDataContext= createContext()
function AuthContext({children}) {
    let serverUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                      ? 'http://localhost:8000' 
                      : ''

    let value = {
       serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
