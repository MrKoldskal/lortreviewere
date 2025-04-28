
import { ShitAnalysisResult } from "../services/analyzeImage";

interface GradeDisplayProps {
  analysis: ShitAnalysisResult | null;
  isLoading: boolean;
}

const GradeDisplay = ({ analysis, isLoading }: GradeDisplayProps) => {
  return (
    <div className="flex-1">
      <div className="space-y-6 font-light text-2xl">
        <div className="flex justify-between">
          <span>Diæt</span>
          <span>{isLoading ? "..." : analysis ? `${analysis.diet}` : "100"}</span>
        </div>
        <div className="flex justify-between">
          <span>Form</span>
          <span>{isLoading ? "..." : analysis ? `${analysis.form}` : "100"}</span>
        </div>
        <div className="flex justify-between">
          <span>Farve</span>
          <span>{isLoading ? "..." : analysis ? `${analysis.color}` : "100"}</span>
        </div>
        <div className="flex justify-between">
          <span>Konsistens</span>
          <span>{isLoading ? "..." : analysis ? `${analysis.consistency}` : "10"}</span>
        </div>
      </div>
      
      {analysis && analysis.tips.length > 0 && (
        <div className="mt-10">
          <h3 className="font-medium text-lg mb-2">Forbedringstips:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.tips.map((tip, index) => (
              <li key={index} className="text-sm">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GradeDisplay;
