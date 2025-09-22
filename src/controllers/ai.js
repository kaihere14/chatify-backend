import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { response } from "express";

// The client gets the API key from the environment variable GEMINI_API_KEY.
const ai = new GoogleGenAI({});

async function main(req, res) {
  const { input } = req.body;

  if (!input) {
    return res.status(400);
  }

  try {
    let response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Try to answer in short to medium length if not metnioned to give long answer and the input is : ${input}`,
      generationConfig: {
        temperature: 0.3,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 500,
      },
    });

    return res.status(200).json({ text: response.text, sender: "bot" });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

const inputRedfine = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res
      .status(200)
      .json({ text: "Please provide an input to redefine.", sender: "bot" });
  }

  try {
    let response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are tasked with redefining or refining user input questions. Whenever I provide a question or input, rewrite it into a clearer, more precise, and professional version without changing its original meaning. If the input is vague, make it more specific and structured. Only return the redefined input, not explanations and the input is : ${input}`,
    });

    return res.status(200).json({ text: response.text, sender: "bot" });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

export default main;
export { inputRedfine };
