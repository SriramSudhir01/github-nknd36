"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HexColorPicker } from 'react-colorful';
import { ImageIcon, Palette, Image as ImageIconLucide } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackgroundEditorProps {
  onBackgroundChange: (background: string) => void;
  currentBackground: string;
}

const PRESET_COLORS = [
  { name: 'Transparent', value: 'transparent' },
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ff0000' },
  { name: 'Green', value: '#00ff00' },
  { name: 'Blue', value: '#0000ff' },
];

const PRESET_GRADIENTS = [
  { name: 'Blue Ocean', value: 'linear-gradient(to right, #2193b0, #6dd5ed)' },
  { name: 'Purple Dream', value: 'linear-gradient(to right, #8e2de2, #4a00e0)' },
  { name: 'Sunset', value: 'linear-gradient(to right, #f12711, #f5af19)' },
  { name: 'Northern Lights', value: 'linear-gradient(to right, #4facfe, #00f2fe)' },
];

const PRESET_IMAGES = [
  { name: 'Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop' },
  { name: 'Nature', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop' },
  { name: 'Studio', url: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=800&auto=format&fit=crop' },
  { name: 'Abstract', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop' },
];

export default function BackgroundEditor({ onBackgroundChange, currentBackground }: BackgroundEditorProps) {
  const [activeTab, setActiveTab] = useState<'solid' | 'gradient' | 'image'>('solid');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === 'solid' ? 'default' : 'outline'}
          onClick={() => setActiveTab('solid')}
        >
          <Palette className="h-4 w-4 mr-2" />
          Solid Color
        </Button>
        <Button
          variant={activeTab === 'gradient' ? 'default' : 'outline'}
          onClick={() => setActiveTab('gradient')}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gradient
        </Button>
        <Button
          variant={activeTab === 'image' ? 'default' : 'outline'}
          onClick={() => setActiveTab('image')}
        >
          <ImageIconLucide className="h-4 w-4 mr-2" />
          Image
        </Button>
      </div>

      {activeTab === 'solid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {PRESET_COLORS.map((color) => (
              <Button
                key={color.value}
                variant="outline"
                className={cn(
                  "h-12 relative",
                  currentBackground === color.value && "ring-2 ring-blue-500"
                )}
                style={{
                  background: color.value,
                  border: color.value === 'transparent' ? '2px dashed #ccc' : undefined
                }}
                onClick={() => onBackgroundChange(color.value)}
              >
                <span className="sr-only">{color.name}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Custom Color</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-12 h-12"
                style={{ background: customColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  onBackgroundChange(e.target.value);
                }}
                placeholder="#ffffff"
              />
            </div>
            {showColorPicker && (
              <div className="mt-2">
                <HexColorPicker
                  color={customColor}
                  onChange={(color) => {
                    setCustomColor(color);
                    onBackgroundChange(color);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'gradient' && (
        <div className="grid grid-cols-2 gap-4">
          {PRESET_GRADIENTS.map((gradient) => (
            <Button
              key={gradient.name}
              variant="outline"
              className={cn(
                "h-24 relative",
                currentBackground === gradient.value && "ring-2 ring-blue-500"
              )}
              style={{ background: gradient.value }}
              onClick={() => onBackgroundChange(gradient.value)}
            >
              <span className="sr-only">{gradient.name}</span>
            </Button>
          ))}
        </div>
      )}

      {activeTab === 'image' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {PRESET_IMAGES.map((image) => (
              <Button
                key={image.url}
                variant="outline"
                className={cn(
                  "h-32 relative bg-cover bg-center",
                  currentBackground === `url(${image.url})` && "ring-2 ring-blue-500"
                )}
                style={{ backgroundImage: `url(${image.url})` }}
                onClick={() => onBackgroundChange(`url(${image.url})`)}
              >
                <span className="sr-only">{image.name}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Custom Image URL</Label>
            <div className="flex gap-2">
              <Input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button
                onClick={() => onBackgroundChange(`url(${customImageUrl})`)}
                disabled={!customImageUrl}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}