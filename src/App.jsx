import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import ImageConverter from '@/components/ImageConverter';

function App() {
  return (
    <>
      <Helmet>
        <title>Image Converter & Compressor - Convierte y Comprime Imágenes</title>
        <meta name="description" content="Convierte y comprime tus imágenes al instante. Soporta JPG, PNG, WEBP, GIF, BMP, TIFF y SVG. Procesamiento rápido del lado del cliente." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <ImageConverter />
        <Toaster />
      </div>
    </>
  );
}

export default App;