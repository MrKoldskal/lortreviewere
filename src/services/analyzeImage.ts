
import { toast } from "sonner";

// Mock AI analysis response type
export interface ShitAnalysisResult {
  diet: number;
  form: number;
  color: number;
  consistency: number;
  tips: string[];
}

// Function to analyze the uploaded image
export const analyzeImage = async (imageBase64: string): Promise<ShitAnalysisResult> => {
  try {
    // In a real implementation, this would be an API call to an AI service
    // For now, we're simulating an analysis with random values and tips
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate pseudo-random scores between 40-95
    const getRandomScore = () => Math.floor(Math.random() * 55) + 40;
    
    const result: ShitAnalysisResult = {
      diet: getRandomScore(),
      form: getRandomScore(),
      color: getRandomScore(),
      consistency: getRandomScore(),
      tips: [
        "Increase your fiber intake for better consistency",
        "Stay hydrated by drinking more water throughout the day",
        "Consider adding more leafy greens to your diet",
        "Reduce processed food consumption for healthier bowel movements",
        "Regular exercise can help improve digestion"
      ]
    };
    
    // Randomly select 2-3 tips
    const tipCount = Math.floor(Math.random() * 2) + 2;
    result.tips = result.tips.sort(() => 0.5 - Math.random()).slice(0, tipCount);
    
    return result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    toast.error("Failed to analyze image. Please try again.");
    return {
      diet: 0,
      form: 0, 
      color: 0,
      consistency: 0,
      tips: ["Unable to analyze image"]
    };
  }
};
