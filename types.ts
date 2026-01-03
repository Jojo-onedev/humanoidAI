
export enum WritingStyle {
  NATURAL = 'natural',
  CASUAL = 'casual',
  PROFESSIONAL = 'professional',
  CREATIVE = 'creative',
  ACADEMIC = 'academic',
  STORYTELLER = 'storyteller'
}

export interface HumanizeOptions {
  style: WritingStyle;
  intensity: number; // 1 to 100
  targetAudience: string;
  preserveStructure: boolean;
}

export interface HumanizedResult {
  originalText: string;
  humanizedText: string;
  humanScore: number;
  readabilityScore: number;
  wordCount: number;
}
