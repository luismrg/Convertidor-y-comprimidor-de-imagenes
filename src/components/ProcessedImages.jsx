import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/imageUtils';

const ProcessedImages = ({ images }) => {
  const handleDownload = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    images.forEach((image, index) => {
      setTimeout(() => {
        handleDownload(image);
      }, index * 200);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold text-gray-800">
            Imágenes procesadas
          </h3>
        </div>
        <Button
          onClick={handleDownloadAll}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar todas
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-white mb-4 border border-gray-200">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-gray-800 truncate">
                {image.name}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <p className="text-gray-600">
                    Original: <span className="font-medium">{formatFileSize(image.originalSize)}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-4 h-4 text-green-600" />
                    <p className="text-green-600 font-medium">
                      {formatFileSize(image.size)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Reducción</p>
                  <p className="text-lg font-bold text-green-600">
                    {Math.round((1 - image.size / image.originalSize) * 100)}%
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(image)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessedImages;