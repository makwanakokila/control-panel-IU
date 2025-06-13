"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../services/firebase"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    try {
      // Check if auth is available (client-side only)
      if (!auth) {
        console.error("Auth is not available")
        return { success: false, error: "Authentication service unavailable" }
      }

      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      // Check if auth is available (client-side only)
      if (!auth) {
        console.error("Auth is not available")
        return { success: false, error: "Authentication service unavailable" }
      }

      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password, userData) => {
    try {
      // Check if auth is available (client-side only)
      if (!auth) {
        console.error("Auth is not available")
        return { success: false, error: "Authentication service unavailable" }
      }

      const result = await createUserWithEmailAndPassword(auth, email, password)
      // Store additional user data in Firestore
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    login,
    logout,
    register,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
