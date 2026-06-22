import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { convertImage } from '@/lib/imageUtils';

const FORMATS = [
  { value: 'jpeg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WEBP' },
  { value: 'gif', label: 'GIF' },
  { value: 'bmp', label: 'BMP' },
  { value: 'tiff', label: 'TIFF' }
];

const ConversionControls = ({ images, onConvert, onReset }) => {
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState([80]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      const convertedImages = [];
      const totalImages = images.length;

      for (let i = 0; i < totalImages; i++) {
        const image = images[i];
        const converted = await convertImage(image, format, quality[0] / 100);
        convertedImages.push(converted);
        setProgress(((i + 1) / totalImages) * 100);
      }

      onConvert(convertedImages);
      
      toast({
        title: "¡Conversión exitosa!",
        description: `${totalImages} imagen(es) convertida(s) a ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al convertir las imágenes",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Configuración de conversión
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="format" className="text-sm font-medium text-gray-700">
            Formato de salida
          </Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format" className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map(fmt => (
                <SelectItem key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="quality" className="text-sm font-medium text-gray-700">
            Calidad de compresión: {quality[0]}%
          </Label>
          <Slider
            id="quality"
            min={1}
            max={100}
            step={1}
            value={quality}
            onValueChange={setQuality}
            className="py-4"
          />
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Procesando imágenes...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleConvert}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Convertir y Comprimir
            </>
          )}
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          disabled={isProcessing}
          className="px-6 py-6"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ConversionControls;