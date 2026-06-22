export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const convertImage = (imageData, format, quality) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const mimeType = `image/${format === 'jpeg' ? 'jpeg' : format}`;
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Conversion failed'));
            return;
          }
          
          const url = URL.createObjectURL(blob);
          const fileName = imageData.name.replace(/\.[^/.]+$/, '') + '.' + format;
          
          resolve({
            url,
            name: fileName,
            size: blob.size,
            originalSize: imageData.size,
            format,
            blob
          });
        },
        mimeType,
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageData.preview;
  });
};