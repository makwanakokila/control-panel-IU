// API endpoints
const API_BASE_URL = "https://idharudhar-backend-2.onrender.com/api/auth"
const LOGIN_API = `${API_BASE_URL}/login`
const SEND_OTP_API = `${API_BASE_URL}/send-otp`
const VERIFY_OTP_API = `${API_BASE_URL}/verify-otp`

// Types
export interface ApiResponse {
  success?: boolean
  message: string
  data?: any
  token?: string
}

export interface SendOtpRequest {
  email: string
}

export interface VerifyOtpRequest {
  email: string
  otp: string
}

export interface LoginRequest {
  email: string
  password?: string
}

// API functions
export async function sendOtp(email: string): Promise<ApiResponse> {
  try {
    console.log("Sending OTP to:", email)
    const response = await fetch(SEND_OTP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API response:", responseText)

    // Parse the response as JSON
    let data
    try {
      data = JSON.parse(responseText)

      // Important: If the API returns a message with "success" in it,
      // but doesn't have an explicit success field, consider it successful
      if (!data.hasOwnProperty("success") && data.message && data.message.toLowerCase().includes("success")) {
        data.success = true
      }

      return data
    } catch (e) {
      console.error("Failed to parse API response as JSON:", e)
      return {
        success: false,
        message: "Invalid response from server",
      }
    }
  } catch (error) {
    console.error("Error sending OTP:", error)
    return {
      success: false,
      message: "Failed to send OTP. Please try again.",
    }
  }
}

export async function verifyOtp(email: string, otp: string): Promise<ApiResponse> {
  try {
    console.log("Verifying OTP for:", email)
    const response = await fetch(VERIFY_OTP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API response:", responseText)

    // Parse the response as JSON
    let data
    try {
      data = JSON.parse(responseText)

      // If the API returns a message with "success" in it,
      // but doesn't have an explicit success field, consider it successful
      if (!data.hasOwnProperty("success") && data.message && data.message.toLowerCase().includes("success")) {
        data.success = true
      }

      return data
    } catch (e) {
      console.error("Failed to parse API response as JSON:", e)
      return {
        success: false,
        message: "Invalid response from server",
      }
    }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    }
  }
}

export async function login(email: string): Promise<ApiResponse> {
  try {
    console.log("Logging in:", email)
    const response = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API response:", responseText)

    // Parse the response as JSON
    let data
    try {
      data = JSON.parse(responseText)

      // If the API returns a message with "success" in it,
      // but doesn't have an explicit success field, consider it successful
      if (!data.hasOwnProperty("success") && data.message && data.message.toLowerCase().includes("success")) {
        data.success = true
      }

      return data
    } catch (e) {
      console.error("Failed to parse API response as JSON:", e)
      return {
        success: false,
        message: "Invalid response from server",
      }
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return {
      success: false,
      message: "Failed to login. Please try again.",
    }
  }
}
