import { GoogleGenAI } from "@google/genai";
import { FormData, ContentType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateMarketingContent = async (formData: FormData): Promise<string> => {
  const { contentType, platform, topic, audience, tone, details } = formData;

  let specificInstructions = "";

  switch (contentType) {
    case ContentType.SOCIAL_POST:
      specificInstructions = `Create a viral-worthy ${platform} post. Include relevant emojis and 3-5 high-traffic hashtags. Keep formatting native to ${platform}.`;
      break;
    case ContentType.BLOG_POST:
      specificInstructions = "Write a comprehensive blog post outline followed by a drafted introduction and main key points. Use clear H2 and H3 headers.";
      break;
    case ContentType.EMAIL_COPY:
      specificInstructions = "Write a compelling email subject line (give 3 variations) and a persuasive body text designed for high click-through rates.";
      break;
    case ContentType.AD_COPY:
      specificInstructions = `Create 3 distinct ad variations for ${platform === 'General' ? 'Digital Ads' : platform}. Include a strong headline, main copy, and a clear Call to Action (CTA).`;
      break;
    case ContentType.PRODUCT_DESC:
      specificInstructions = "Write a persuasive product description that highlights features and benefits. Use bullet points for key specs.";
      break;
    case ContentType.TAGLINE:
      specificInstructions = "Generate 10 catchy, memorable tagline or slogan variations.";
      break;
    default:
      specificInstructions = "Generate high-quality marketing copy.";
  }

  const prompt = `
    Role: You are a world-class Marketing Copywriter and Strategist.
    
    Task: Generate ${contentType} for the following request.

    Context:
    - Topic/Product: ${topic}
    - Target Audience: ${audience}
    - Tone: ${tone}
    - Key Details/Features: ${details}
    - Platform: ${platform}

    Instructions:
    ${specificInstructions}

    Format:
    Return the response in clean Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert marketing assistant. You prioritize clarity, engagement, and conversion optimization in all generated text.",
      }
    });

    return response.text || "No content generated. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please check your API key and try again.");
  }
};