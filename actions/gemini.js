"use server"
// Серверная часть для конфига Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function runAi(prompt) { // Функция для промпта.Не стали использовать fetch api.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });


const result = await model.generateContent(prompt); // Функция генерации контента.
const response = await result.response
const text = response.text()

return text
}