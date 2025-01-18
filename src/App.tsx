import React from 'react';
import { SupabaseImageTransformer } from './components/SupabaseImageTransformer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">X-Optics Professional Image Transformer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Original Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Original</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Original portrait"
              className="rounded-lg w-full h-64 object-cover"
              preload={true}
            />
          </div>

          {/* Portrait Enhancement */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Portrait Enhancement</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              transformations={{
                portrait: {
                  skinTone: 10,
                  skinSmoothing: 30,
                  eyeBrightness: 20,
                  catchLight: true,
                  portraitLighting: 'rembrandt'
                },
                color: {
                  exposure: 5,
                  contrast: 10,
                  vibrance: 15
                }
              }}
              alt="Enhanced portrait"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>

          {/* Cinematic Style */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Cinematic Style</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              transformations={{
                style: {
                  style: 'cinematic',
                  intensity: 80,
                  preserveDetail: true
                },
                effects: {
                  grain: 20,
                  vignette: 30
                },
                color: {
                  contrast: 15,
                  shadows: -10,
                  highlights: -5
                }
              }}
              alt="Cinematic portrait"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>

          {/* Vintage Film */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Vintage Film</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              transformations={{
                effects: {
                  filmType: 'kodak',
                  grain: 40,
                  grainSize: 60,
                  lightLeak: 'warm'
                },
                color: {
                  saturation: -20,
                  temperature: 10,
                  tint: 5
                }
              }}
              alt="Vintage film portrait"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>

          {/* HDR Enhancement */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">HDR Enhancement</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              transformations={{
                color: {
                  hdr: 70,
                  highlights: -15,
                  shadows: 15,
                  vibrance: 20
                },
                detail: {
                  clarity: 30,
                  texture: 20
                }
              }}
              alt="HDR enhanced portrait"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>

          {/* Professional Retouching */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Professional Retouching</h2>
            <SupabaseImageTransformer 
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              transformations={{
                portrait: {
                  skinSmoothing: 40,
                  facialStructure: 10,
                  portraitLighting: 'butterfly'
                },
                detail: {
                  sharpness: 30,
                  clarity: 20,
                  lensCorrection: true,
                  chromatic: true
                },
                metadata: {
                  preserve: true,
                  copyright: "© 2024 X-Optics",
                  author: "Professional Retouching AI"
                }
              }}
              alt="Professionally retouched portrait"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">About the Transformations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Portrait Enhancement</h3>
              <p className="text-gray-600">Professional skin tone enhancement with Rembrandt lighting pattern and subtle exposure adjustments.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Cinematic Style</h3>
              <p className="text-gray-600">Hollywood-grade color grading with film grain and controlled dynamic range.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Vintage Film</h3>
              <p className="text-gray-600">Classic Kodak film emulation with authentic grain and warm light leak effects.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">HDR Enhancement</h3>
              <p className="text-gray-600">Advanced dynamic range optimization with detail preservation in highlights and shadows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;