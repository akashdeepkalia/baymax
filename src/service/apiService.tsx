import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./API";

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