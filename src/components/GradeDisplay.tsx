
import { ShitAnalysisResult } from "../services/analyzeImage";

interface GradeDisplayProps {
  analysis: ShitAnalysisResult | null;
  isLoading: boolean;
}

const GradeDisplay = ({ analysis, isLoading }: GradeDisplayProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center gap-6">
      <div className="font-sans text-black text-lg">
        Diet: {isLoading ? "analyzing..." : analysis ? `${analysis.diet}/100` : "-/100"}
      </div>
      <div className="font-sans text-black text-lg">
        Form: {isLoading ? "analyzing..." : analysis ? `${analysis.form}/100` : "-/100"}
      </div>
      <div className="font-sans text-black text-lg">
        Color: {isLoading ? "analyzing..." : analysis ? `${analysis.color}/100` : "-/100"}
      </div>
      <div className="font-sans text-black text-lg">
        Consistency: {isLoading ? "analyzing..." : analysis ? `${analysis.consistency}/100` : "-/100"}
      </div>
      
      {analysis && analysis.tips.length > 0 && (
        <div className="mt-4">
          <h3 className="font-sans text-black text-lg font-semibold mb-2">Improvement Tips:</h3>
          <ul className="list-disc pl-5">
            {analysis.tips.map((tip, index) => (
              <li key={index} className="font-sans text-black text-base mb-1">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GradeDisplay;
