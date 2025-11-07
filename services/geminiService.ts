
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development; in a real environment, the key should be set.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateReply = async (
  emailHistory: Message[],
  faqKnowledgeBase: string,
  userPrompt: string
): Promise<string> => {
  try {
    const systemInstruction = `You are a professional and helpful customer support agent for a subscription service named 'Sparkle'. Your tone should be friendly, clear, and concise.
    Your primary goal is to resolve user issues efficiently.
    Use the provided FAQ Knowledge Base to answer questions accurately. If the answer isn't in the FAQ, provide a helpful response based on the conversation context.
    Do not make up information not present in the FAQ or conversation.
    Keep your replies focused on the user's latest message.

    ---
    FAQ KNOWLEDGE BASE:
    ${faqKnowledgeBase}
    ---
    `;
    
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: emailHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        })),
        config: {
            systemInstruction: systemInstruction,
        },
    });

    const finalPrompt = `Based on the conversation history and my instruction below, please draft a reply.
    Instruction: "${userPrompt}"`;

    const response: GenerateContentResponse = await chat.sendMessage({ message: finalPrompt });

    return response.text;
  } catch (error) {
    console.error("Error generating reply with Gemini:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the reply: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while generating the reply.";
  }
};
   