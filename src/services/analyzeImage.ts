
import { toast } from "sonner";

export interface ShitAnalysisResult {
  diet: number;
  form: number;
  color: number;
  consistency: number;
  tips: string[];
}

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
        "Øg dit fiberindtag for bedre konsistens",
        "Hold dig hydreret ved at drikke mere vand gennem dagen",
        "Overvej at tilføje flere bladgrøntsager til din kost",
        "Reducer indtag af forarbejdede fødevarer for sundere fordøjelse",
        "Regelmæssig motion kan hjælpe med at forbedre fordøjelsen"
      ]
    };
    
    // Randomly select 2-3 tips
    const tipCount = Math.floor(Math.random() * 2) + 2;
    result.tips = result.tips.sort(() => 0.5 - Math.random()).slice(0, tipCount);
    
    return result;
  } catch (error) {
    console.error("Fejl ved analyse af billede:", error);
    toast.error("Kunne ikke analysere billedet. Prøv igen.");
    return {
      diet: 0,
      form: 0, 
      color: 0,
      consistency: 0,
      tips: ["Kunne ikke analysere billedet"]
    };
  }
};
