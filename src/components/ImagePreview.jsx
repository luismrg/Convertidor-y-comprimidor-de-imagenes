import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/imageUtils';

const ImagePreview = ({ images, onRemove, onAddMore }) => {
  const fileInputRef = React.useRef(null);

  const handleAddMore = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onAddMore(files);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Imágenes cargadas ({images.length})
        </h3>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Añadir más
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleAddMore}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-indigo-400 transition-colors">
              <img
                src={image.preview}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <button
              onClick={() => onRemove(image.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mt-2 text-xs text-gray-600 truncate">
              <p className="font-medium truncate">{image.name}</p>
              <p className="text-gray-500">{formatFileSize(image.size)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;