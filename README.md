# X-Optics Transformer Component

A reusable React component for applying image transformations to images stored in Supabase Storage.

## Features

- Easy integration with any React application using Supabase
- Support for all Supabase image transformation parameters
- Built-in error handling and loading states
- Performance optimized with URL caching
- TypeScript support
- Fully customizable with HTML img attributes

## Installation


```typescript
import { SupabaseImageTransformer } from './components/SupabaseImageTransformer';
```

## Usage

### Basic Usage

```typescript
<SupabaseImageTransformer 
  imageUrl="https://your-project.supabase.co/storage/v1/object/public/bucket/image.jpg"
/>
```

### With Transformations

```typescript
<SupabaseImageTransformer 
  imageUrl="https://your-project.supabase.co/storage/v1/object/public/bucket/image.jpg"
  transformations={{
    width: 300,
    height: 200,
    resize: 'cover',
    quality: 80,
    format: 'webp'
  }}
/>
```

### With Custom Styling

```typescript
<SupabaseImageTransformer 
  imageUrl="https://your-project.supabase.co/storage/v1/object/public/bucket/image.jpg"
  className="rounded-lg shadow-md"
  style={{ maxWidth: '500px' }}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| imageUrl | string | Yes | The URL of the image in Supabase Storage |
| transformations | object | No | Object containing transformation parameters |
| fallbackImage | string | No | URL to display if the main image fails to load |
| alt | string | No | Alt text for the image |
| className | string | No | Additional CSS classes |
| ...props | HTMLImageAttributes | No | Any valid HTML img attribute |

### Transformation Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| width | number | Desired width of the image |
| height | number | Desired height of the image |
| resize | 'cover' \| 'contain' \| 'fill' | Resize mode |
| quality | number | Image quality (1-100) |
| format | 'webp' \| 'jpeg' \| 'jpg' \| 'png' | Output format |

## Error Handling

The component includes built-in error handling:

- Displays a placeholder if no imageUrl is provided
- Shows a loading spinner while the image is loading
- Falls back to the original image or fallbackImage (if provided) when an error occurs
- Logs transformation errors to the console

## Performance

The component includes URL caching to avoid unnecessary computations when applying the same transformations multiple times.

## Limitations

- Only works with images stored in Supabase Storage
- Transformation parameters must match Supabase's supported options
- The image URL must be accessible (public or with valid authentication)

## Example Implementation

```typescript
import { SupabaseImageTransformer } from './components/SupabaseImageTransformer';

function Gallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Original Image */}
      <SupabaseImageTransformer 
        imageUrl="https://example.com/image.jpg"
        alt="Original"
      />
      
      {/* Resized Image */}
      <SupabaseImageTransformer 
        imageUrl="https://example.com/image.jpg"
        transformations={{
          width: 300,
          height: 300,
          resize: 'cover'
        }}
        alt="Resized"
      />
      
      {/* Optimized WebP */}
      <SupabaseImageTransformer 
        imageUrl="https://example.com/image.jpg"
        transformations={{
          format: 'webp',
          quality: 80
        }}
        alt="Optimized"
      />
    </div>
  );
}
```