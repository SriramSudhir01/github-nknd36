"use client";

import { Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

interface ProcessedImageProps {
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  background?: string;
}

export default function ProcessedImage({ processedImage, isProcessing, progress, background = "transparent" }: ProcessedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (processedImage && background !== 'transparent') {
      const loadImage = async () => {
        const img = new Image();
        img.src = processedImage;
        await img.decode();

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        if (background.startsWith('url(')) {
          const bgImg = new Image();
          bgImg.src = background.slice(4, -1);
          await bgImg.decode();
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);
      };

      loadImage();
    }
  }, [processedImage, background]);

  const handleDownload = async () => {
    try {
      let imageToDownload = processedImage;
      
      if (background !== 'transparent' && canvasRef.current) {
        imageToDownload = canvasRef.current.toDataURL('image/png');
      }

      if (!imageToDownload) {
        throw new Error('No image to download');
      }

      const response = await fetch(imageToDownload);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bgremoval-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image. Please try again.');
    }
  };

  const getBackgroundStyle = () => {
    if (background === 'transparent') {
      return {
        backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        backgroundColor: 'white'
      };
    }
    return {};
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-200 rounded-xl h-[400px] flex flex-col items-center justify-center relative"
      style={getBackgroundStyle()}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center gap-4">
          <Progress value={progress} className="w-[60%]" />
          <p className="text-sm text-gray-600">Processing image... {progress}%</p>
        </div>
      ) : processedImage ? (
        <>
          <div className="relative w-full h-full">
            {background === 'transparent' ? (
              <Image
                src={processedImage}
                alt="Processed"
                fill
                className="object-contain rounded-xl"
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain rounded-xl"
              />
            )}
          </div>
          <Button 
            className="absolute bottom-4 right-4"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Result
          </Button>
        </>
      ) : (
        <>
          <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-4">
            Your processed image will appear here
          </p>
          <Button disabled variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Download Result
          </Button>
        </>
      )}
    </div>
  );
}