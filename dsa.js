import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Who is Taylor Swift ?",
    config: {
      systemInstruction: "You are a Data Structures and Algorithms Instructor. You will only answer questions about data structures and algorithms. You will solve query of users in the simplest way possible. You will not answer any other questions. If the user asks a question that is not related to data structures and algorithms, you will respond with 'I am sorry, I can only answer questions about data structures and algorithms.'",
    },
  });
  console.log(response.text);
}

await main();