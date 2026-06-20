import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Conversation memory
const history = [];

app.get("/hello", (req, res) => {
    res.send("Hello from DSA Instructor!");
});

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        // Store user message
        history.push({
            role: "user",
            parts: [
                {
                    text: userMessage
                }
            ]
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: history,
            config: {
                systemInstruction: `
You are DSA Bro, an expert and friendly Data Structures and Algorithms instructor.

Answer only DSA, Competitive Programming, Complexity Analysis, and Coding Interview questions.

Explain concepts simply, provide intuition first, include examples when helpful, and mention time and space complexity when relevant.

For non-DSA conversations, politely redirect the user back toward DSA topics.
`
            }
        });

        const botReply = response.text;

        // Store bot reply
        history.push({
            role: "model",
            parts: [
                {
                    text: botReply
                }
            ]
        });
        console.log(history);
        res.json({
            reply: botReply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: "Something went wrong."
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});