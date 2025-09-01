import React, { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (payload) => setUser(payload)
  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
