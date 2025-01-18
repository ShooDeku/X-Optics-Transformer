# Image Handling Implementation Guide

## 1. Component Integration

### Installation

1. Add the required dependencies to your project:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.344.0"
  }
}
```

2. Copy the SupabaseImageTransformer component files into your project:

```
src/
  components/
    SupabaseImageTransformer/
      SupabaseImageTransformer.tsx
      types.ts
      utils.ts
      index.ts
```

### Usage

```tsx
import { SupabaseImageTransformer } from './components/SupabaseImageTransformer';

function MyComponent() {
  return (
    <SupabaseImageTransformer 
      imageUrl="https://your-project.supabase.co/storage/v1/object/public/images/example.jpg"
      transformations={{
        width: 300,
        height: 200,
        resize: 'cover',
        format: 'webp',
        quality: 80
      }}
      alt="Example image"
      className="rounded-lg"
    />
  );
}
```

## 2. Supabase Storage Implementation

### Setup

1. Create a new Supabase project at https://supabase.com
2. Create a new storage bucket:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Create a new public bucket
const { data, error } = await supabase
  .storage
  .createBucket('images', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 2, // 2MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  });
```

### Image Upload Component

```tsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export function ImageUploader() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Uploaded image URL:', data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 2MB)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
```

### Image Gallery Component

```tsx
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SupabaseImageTransformer } from './SupabaseImageTransformer';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export function ImageGallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      const { data, error } = await supabase
        .storage
        .from('images')
        .list();

      if (error) {
        console.error('Error loading images:', error);
        return;
      }

      const imageUrls = data.map(file => {
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(file.name);
        return data.publicUrl;
      });

      setImages(imageUrls);
    }

    loadImages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((url, index) => (
        <SupabaseImageTransformer
          key={index}
          imageUrl={url}
          transformations={{
            width: 300,
            height: 300,
            resize: 'cover'
          }}
          alt={`Gallery image ${index + 1}`}
          className="rounded-lg shadow-md"
        />
      ))}
    </div>
  );
}
```

## 3. ImgProxy Integration

### Self-Hosting ImgProxy

1. Create a Docker Compose configuration:

```yaml
version: '3'
services:
  imgproxy:
    image: darthsim/imgproxy:latest
    ports:
      - "8080:8080"
    environment:
      - IMGPROXY_KEY=${IMGPROXY_KEY}
      - IMGPROXY_SALT=${IMGPROXY_SALT}
      - IMGPROXY_MAX_SRC_RESOLUTION=50
      - IMGPROXY_TTL=3600
      - IMGPROXY_USE_S3=true
      - IMGPROXY_S3_ENDPOINT=${SUPABASE_STORAGE_URL}
      - IMGPROXY_S3_ACCESS_KEY_ID=${SUPABASE_ACCESS_KEY}
      - IMGPROXY_S3_SECRET_ACCESS_KEY=${SUPABASE_SECRET_KEY}
```

2. Generate secure key and salt:

```bash
openssl rand -base64 32 # For IMGPROXY_KEY
openssl rand -base64 32 # For IMGPROXY_SALT
```

### Security Considerations

1. Set up rate limiting
2. Configure allowed source URLs
3. Set maximum source resolution
4. Enable signature verification

```yaml
environment:
  - IMGPROXY_ALLOW_ORIGIN=your-domain.com
  - IMGPROXY_MAX_SRC_RESOLUTION=50
  - IMGPROXY_MAX_ANIMATION_FRAMES=1
  - IMGPROXY_ENABLE_WEBP_DETECTION=true
  - IMGPROXY_ENFORCE_SIGNATURE=true
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your Supabase storage bucket CORS settings allow your domain
   - Check ImgProxy CORS configuration

2. **Upload Failures**
   - Verify file size limits
   - Check allowed MIME types
   - Ensure proper bucket permissions

3. **Transformation Issues**
   - Confirm image URL format is correct
   - Verify transformation parameters are within limits
   - Check ImgProxy logs for errors

### Performance Tips

1. Use appropriate image sizes
2. Enable caching headers
3. Implement lazy loading
4. Use WebP format when supported
5. Optimize quality settings

## Limitations

1. Supabase Storage:
   - File size limits
   - Bucket quotas
   - Storage pricing considerations

2. ImgProxy:
   - Processing limits
   - Memory constraints
   - CPU usage considerations

3. Component:
   - Browser compatibility
   - Network dependency
   - Cache management