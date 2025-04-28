
import { useState, useCallback } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

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
    <div className="flex-1 min-w-0">
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileSelect}
      />
      <label 
        htmlFor="file-upload"
        className={`block w-full aspect-square border-2 border-[#dddddd] rounded cursor-pointer transition-colors ${
          isDragging ? 'bg-gray-50' : 'bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <img 
            src={image} 
            alt="Uploaded image" 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center p-6">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500 font-sans">
              Upload an image of your stool for analysis
            </p>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Drag and drop or click to upload
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
