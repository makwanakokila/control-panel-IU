"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { FaGlobe, FaEye, FaEyeSlash } from "react-icons/fa"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth() || {};

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)

    if (!result.success) {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleDemoLogin = () => {
    setEmail("admin@idharudhar.com")
    setPassword("admin123")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand">
            <FaGlobe className="brand-icon" />
            <div>
              <h1>IdharUdhar</h1>
              <p>Admin Control Panel</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>
          <p>Sign in to your admin account</p>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button type="button" className="demo-btn" onClick={handleDemoLogin}>
            Use Demo Credentials
          </button>
        </form>

        <div className="login-footer">
          <p>© 2024 IdharUdhar. All rights reserved.</p>
        </div>
      </div>

      <div className="login-background">
        <div className="bg-pattern"></div>
      </div>
    </div>
  )
}

export default Login
