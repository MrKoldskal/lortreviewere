
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
        const result = await analyzeImage(newImage);
        setAnalysis(result);
        toast.success("Analyse fuldført!");
      } catch (error) {
        console.error("Analysefejl:", error);
        toast.error("Kunne ikke analysere billedet");
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      setAnalysis(null);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          <ImageUploader image={image} setImage={handleImageChange} />
          <GradeDisplay analysis={analysis} isLoading={isAnalyzing} />
        </div>
      </div>
    </div>
  );
};

export default Index;
