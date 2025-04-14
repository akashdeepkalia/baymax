import { GoogleGenAI } from "@google/genai";
import { BASE_URL, GEMINI_API_KEY } from "./API";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const askAI = async(prompt:string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });
          console.log(response.text);
          const text = response.text as string
          
          return typeof text === "string" ? text : await text; 

    } catch (error) {
        throw error;
    }

  }

export const registerToken = async (device_token: string) => {
    console.log("Sending device token:", device_token);
    try {
        const res = await axios.post(`${BASE_URL}/notification/register-token`,{
            device_token
        })
        console.log("register token : hits")
        console.log(res.data)
    } catch (error) {
        console.log("cathch hits bro")
        console.log(error)
    }
}