import React from 'react'
import { createContext } from 'react'
export const authDataContext= createContext()
function AuthContext({children}) {
    // Backend API base URL (matches PORT in backend/.env)
    let serverUrl = "https://onecart-backend-nioc.onrender.com"

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

