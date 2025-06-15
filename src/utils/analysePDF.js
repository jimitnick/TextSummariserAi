import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analysePDF(file) {
  const base64 = await fileToBase64(file);
  const cleanBase64 = base64.split(",")[1]; 

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: "Summarize this document" },
          {
            inlineData: {
              mimeType: file.type, 
              data: cleanBase64
            }
          }
        ]
      }
    ]
  });

  const response = await result.response.text();
  return response;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default analysePDF