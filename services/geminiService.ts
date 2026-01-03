
import { GoogleGenAI, Type } from "@google/genai";
import { WritingStyle, HumanizeOptions, HumanizedResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async humanize(text: string, options: HumanizeOptions): Promise<HumanizedResult> {
    const structureInstruction = options.preserveStructure 
      ? `7. STRUCTURE STRICTE : Vous DEVEZ conserver la mise en page EXACTE du texte original. Gardez le même nombre de paragraphes, les mêmes puces, les mêmes listes numérotées et les mêmes titres. Ne fusionnez pas les paragraphes.`
      : `7. STRUCTURE : N'hésitez pas à optimiser légèrement le flux des paragraphes pour une meilleure lisibilité si nécessaire.`;

    const prompt = `
      Transformez le texte suivant généré par IA pour qu'il paraisse plus humain en FRANÇAIS.
      
      INSTRUCTIONS CRITIQUES :
      1. STYLE : Utilisez un ton ${options.style}.
      2. INTENSITÉ : L'intensité de l'humanisation est de ${options.intensity}/100. Une intensité plus élevée signifie des changements plus radicaux dans le vocabulaire et la syntaxe, ajoutant plus de personnalité et d'expressions idiomatiques françaises.
      3. PUBLIC : Le public cible est ${options.targetAudience || 'Général'}.
      4. ÉVITER LES CLICHÉS IA : N'utilisez pas de phrases courantes d'IA comme "En conclusion,", "De plus,", "Il est important de noter,", "Explorons...", "Dans le paysage actuel...".
      5. VARIATION DES PHRASES : Variez considérablement la longueur des phrases (facteur de "Burstiness").
      6. PERPLEXITÉ : Utilisez des choix de mots plus naturels, parfois moins prévisibles, comme le ferait un rédacteur humain.
      ${structureInstruction}

      TEXTE À HUMANISER :
      "${text}"
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            humanizedText: { type: Type.STRING },
            humanScore: { type: Type.NUMBER, description: "Score de ressemblance humaine prédit de 0 à 100" },
            readabilityScore: { type: Type.NUMBER, description: "Score de facilité de lecture de 0 à 100" }
          },
          required: ["humanizedText", "humanScore", "readabilityScore"]
        }
      }
    });

    const result = JSON.parse(response.text);

    return {
      originalText: text,
      humanizedText: result.humanizedText,
      humanScore: result.humanScore,
      readabilityScore: result.readabilityScore,
      wordCount: result.humanizedText.split(/\s+/).length
    };
  }
}
