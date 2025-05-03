import * as sharp from 'sharp';

export async function convertToGreyscale(imagePath: string): Promise<{ buffer: Buffer, width: number, height: number }> {
  // Load the image and get raw pixel data
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Create a buffer to hold grayscale pixel data
  const greyscaleBuffer = Buffer.alloc(info.width * info.height);
  
  // Determine number of channels (usually 3 for RGB, 4 for RGBA)
  const channels = data.length / (info.width * info.height);
  
  // Process each pixel
  for (let i = 0; i < info.width * info.height; i++) {
    // Calculate the position in the source buffer
    const pos = i * channels;
    
    // Extract RGB values (assuming RGB or RGBA format)
    const r = data[pos];
    const g = data[pos + 1];
    const b = data[pos + 2];
    
    // Apply proper luminance weights for grayscale conversion
    // Using ITU-R BT.601 standard: Y = 0.299R + 0.587G + 0.114B
    const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    
    // Store the grayscale value
    greyscaleBuffer[i] = y;
  }

  return {
    buffer: greyscaleBuffer,
    width: info.width,
    height: info.height
  };
}