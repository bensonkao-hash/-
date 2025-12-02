import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a Korean travel itinerary based on user preferences.
 */
export const generateItinerary = async (preferences: string): Promise<any> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    請為我規劃一個詳細的 5 天韓國首爾旅遊行程。
    日期：2026/03/18 至 2026/03/22。
    使用者偏好：${preferences}
    
    請嚴格遵守以下 JSON 結構回傳資料，內容請使用繁體中文。
    日期必須對應行程天數。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING, description: "YYYY-MM-DD 格式" },
              dayLabel: { type: Type.STRING, description: "例如：第一天：抵達首爾" },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING, description: "例如：09:00" },
                    activity: { type: Type.STRING, description: "活動名稱" },
                    location: { type: Type.STRING, description: "地點" },
                    category: { type: Type.STRING, enum: ['food', 'sightseeing', 'shopping', 'travel', 'other'] },
                    note: { type: Type.STRING, description: "備註或小撇步" }
                  },
                  required: ["time", "activity", "location", "category"]
                }
              }
            },
            required: ["date", "dayLabel", "items"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};

/**
 * Translates text to Korean with Romanization.
 */
export const translateToKorean = async (text: string): Promise<{ korean: string; romanization: string; notes?: string }> => {
  const model = "gemini-2.5-flash";
  const prompt = `
  將以下句子翻譯成適合遊客使用的自然韓語。
  輸入："${text}"
  回傳 JSON 格式，包含 'korean' (韓文), 'romanization' (羅馬拼音發音), 與可選的 'notes' (禮貌程度或情境說明，請用繁體中文)。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            korean: { type: Type.STRING },
            romanization: { type: Type.STRING },
            notes: { type: Type.STRING }
          },
          required: ["korean", "romanization"]
        }
      }
    });

    const result = response.text;
    return result ? JSON.parse(result) : { korean: "錯誤", romanization: "Error" };
  } catch (error) {
    console.error("Translation error:", error);
    return { korean: "錯誤", romanization: "Error", notes: "請重試。" };
  }
};

/**
 * General chat assistant for Korea travel.
 */
export const chatWithTravelAssistant = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  const model = "gemini-2.5-flash";
  
  try {
    const chat = ai.chats.create({
      model,
      history: history,
      config: {
        systemInstruction: "你是一位專業的韓國旅遊嚮導，名字叫 'SeoulMate'。你非常熱心、有禮貌，且熟悉首爾的景點、美食、交通（如 Naver Map, T-Money）與當地禮儀。請務必使用繁體中文回答使用者的問題，回答請簡潔實用。"
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};