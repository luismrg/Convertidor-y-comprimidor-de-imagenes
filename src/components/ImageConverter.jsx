import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import ImagePreview from '@/components/ImagePreview';
import ConversionControls from '@/components/ConversionControls';
import ProcessedImages from '@/components/ProcessedImages';
const ImageConverter = () => {
  const [images, setImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const handleImagesUpload = files => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setImages(prev => [...prev, ...newImages]);
  };
  const handleRemoveImage = id => {
    setImages(prev => prev.filter(img => img.id !== id));
  };
  const handleConvert = convertedImages => {
    setProcessedImages(convertedImages);
  };
  const handleReset = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    processedImages.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);
    setProcessedImages([]);
  };
  return <div className="max-w-6xl mx-auto">
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ImageIcon className="w-10 h-10 text-indigo-600" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Image Converter & Compressor
          </h1>
        </div>
        <p className="text-xl text-gray-600">Convierte y comprime tus imágenes al instante  sin perder calidad</p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        {images.length === 0 ? <UploadZone onUpload={handleImagesUpload} /> : <div className="space-y-6">
            <ImagePreview images={images} onRemove={handleRemoveImage} onAddMore={handleImagesUpload} />
            <ConversionControls images={images} onConvert={handleConvert} onReset={handleReset} />
          </div>}
      </motion.div>

      <AnimatePresence>
        {processedImages.length > 0 && <ProcessedImages images={processedImages} />}
      </AnimatePresence>
    </div>;
};
export default ImageConverter;