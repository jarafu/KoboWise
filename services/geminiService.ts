import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, InsightData } from "../types";
import { CURRENCY_SYMBOL } from "../constants";

// Initialize Gemini Client
// Note: In a real app, ensure process.env.API_KEY is defined.
// The code handles missing keys gracefully by returning mock data if needed.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateFinancialInsights = async (transactions: Transaction[]): Promise<InsightData> => {
  const ai = getClient();
  
  if (!ai) {
    console.warn("Gemini API Key missing. Returning fallback insight.");
    return {
      summary: "AI Insights are unavailable without an API Key. Connect your key to see personalized analysis.",
      actionableTips: ["Track your daily spending.", "Set a monthly budget.", "Review recurring subscriptions."],
      lastUpdated: Date.now()
    };
  }

  // Prepare data for the prompt
  const transactionSummary = transactions.slice(0, 20).map(t => 
    `- ${t.date.split('T')[0]}: ${t.type} of ${CURRENCY_SYMBOL}${t.amount} for ${t.category} (${t.description})`
  ).join('\n');

  const prompt = `
    You are a Nigerian financial advisor for the app 'KoboWise'. 
    Analyze the following recent transactions for a user living in Nigeria.
    
    Transactions:
    ${transactionSummary}
    
    Provide a JSON response with:
    1. 'summary': A brief, friendly paragraph (max 40 words) about their spending habits this month. Be encouraging but realistic.
    2. 'actionableTips': An array of 3 short, specific tips (max 15 words each) to improve their financial health based on the data.
    
    Use Nigerian context (e.g., mention specific categorization like 'Food' or 'Transport' if high).
    Do not use markdown in the JSON values.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            actionableTips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      summary: result.summary || "Your spending looks active this week. Keep tracking!",
      actionableTips: result.actionableTips || ["Check your subscription costs.", "Try to save 10% of income.", "Review food expenses."],
      lastUpdated: Date.now()
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      summary: "We couldn't generate new insights right now. Please try again later.",
      actionableTips: ["Review your transaction history manually.", "Ensure you are categorized correctly."],
      lastUpdated: Date.now()
    };
  }
};