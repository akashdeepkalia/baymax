import { Platform } from "react-native"

export const GEMINI_API_KEY = "AIzaSyA_HB34ohSkRUH3eDrQwbTMOW9pl0EqZj8"
export const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.5:3000'

// For hosted
// export const BASE_URL = https://fcm-server-1wsr.onrender.com
