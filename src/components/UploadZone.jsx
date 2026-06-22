import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UploadZone = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, sube solo archivos de imagen",
        variant: "destructive"
      });
      return;
    }

    onUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-all duration-300 ease-in-out
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50 scale-105' 
          : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <motion.div
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-full">
            <Upload className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">
            {isDragging ? '¡Suelta aquí!' : 'Subir imagen'}
          </h3>
          <p className="text-gray-600">
            Arrastra y suelta tus imágenes aquí o haz clic para seleccionar
          </p>
          <p className="text-sm text-gray-500">
            Soporta: JPG, PNG, WEBP, GIF, BMP, TIFF, SVG
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg"
        >
          Seleccionar archivos
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UploadZone;