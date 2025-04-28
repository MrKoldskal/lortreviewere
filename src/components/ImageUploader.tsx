
import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const ImageUploader = ({ image, setImage }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [setImage]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [setImage]);

  return (
    <div>
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileSelect}
      />
      <label 
        htmlFor="file-upload"
        className={`block w-64 h-48 bg-[#222222] rounded-lg cursor-pointer flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'bg-gray-800' : 'bg-[#222222]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <img 
            src={image} 
            alt="Uploadet billede" 
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-center p-6 text-white">
            <Upload className="h-8 w-8 mx-auto mb-4" />
            <p className="text-2xl font-light">
              Upload fil
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
