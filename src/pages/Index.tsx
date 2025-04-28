
import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import GradeDisplay from '../components/GradeDisplay';

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <ImageUploader image={image} setImage={setImage} />
          <GradeDisplay />
        </div>
      </div>
    </div>
  );
};

export default Index;
