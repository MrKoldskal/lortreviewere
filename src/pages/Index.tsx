
import { useState } from 'react';
import { toast } from "sonner";
import ImageUploader from '../components/ImageUploader';
import GradeDisplay from '../components/GradeDisplay';
import { analyzeImage, ShitAnalysisResult } from '../services/analyzeImage';

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ShitAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  const handleImageChange = async (newImage: string | null) => {
    setImage(newImage);
    
    if (newImage) {
      setIsAnalyzing(true);
      setAnalysis(null);
      
      try {
        // Analyze the image
        const result = await analyzeImage(newImage);
        setAnalysis(result);
        toast.success("Analysis complete!");
      } catch (error) {
        console.error("Analysis error:", error);
        toast.error("Failed to analyze the image");
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      setAnalysis(null);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <ImageUploader image={image} setImage={handleImageChange} />
          <GradeDisplay analysis={analysis} isLoading={isAnalyzing} />
        </div>
      </div>
    </div>
  );
};

export default Index;
