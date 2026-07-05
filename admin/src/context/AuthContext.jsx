import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
    let serverUrl = import.meta.env.VITE_BACKEND_URL || 
                    (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                      ? 'http://localhost:8000' 
                      : window.location.origin)

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

