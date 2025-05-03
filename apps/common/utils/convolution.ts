export function applyConvolution(
    imageData: Buffer,
    width: number,
    height: number,
    channels: number,
    kernel: number[][]
): Buffer {
    const result = Buffer.alloc(imageData.length);
    
    // Get kernel dimensions
    const kernelHeight = kernel.length;
    const kernelWidth = kernel[0].length;
    
    // Calculate kernel center
    const kernelCenterY = Math.floor(kernelHeight / 2);
    const kernelCenterX = Math.floor(kernelWidth / 2);
    
    // Process each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Process each color channel
            for (let c = 0; c < channels; c++) {
                let sum = 0;
                
                // Apply kernel
                for (let ky = 0; ky < kernelHeight; ky++) {
                    for (let kx = 0; kx < kernelWidth; kx++) {
                        // Calculate image coordinates relative to kernel position
                        const imgY = y + (ky - kernelCenterY);
                        const imgX = x + (kx - kernelCenterX);
                        
                        // Skip pixels outside the image (edge handling - zero padding)
                        if (imgY < 0 || imgY >= height || imgX < 0 || imgX >= width) {
                            continue;
                        }
                        
                        // Get pixel value
                        const pixelIndex = (imgY * width + imgX) * channels + c;
                        const pixelValue = imageData[pixelIndex];
                        
                        // Apply kernel weight
                        sum += pixelValue * kernel[ky][kx];
                    }
                }
                
                // Store result with proper clamping to valid pixel range
                const resultIndex = (y * width + x) * channels + c;
                result[resultIndex] = Math.min(Math.max(Math.round(sum), 0), 255);
            }
        }
    }
    
    return result;
}

// For emboss operations, you might also need this helper function:
export function applyEmbossConvolution(
    imageData: Buffer,
    width: number,
    height: number,
    channels: number,
    kernel: number[][]
): Buffer {
    const result = Buffer.alloc(imageData.length);
    
    // Get kernel dimensions
    const kernelHeight = kernel.length;
    const kernelWidth = kernel[0].length;
    
    // Calculate kernel center
    const kernelCenterY = Math.floor(kernelHeight / 2);
    const kernelCenterX = Math.floor(kernelWidth / 2);
    
    // Process each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Process each color channel
            for (let c = 0; c < channels; c++) {
                let sum = 0;
                
                // Apply kernel
                for (let ky = 0; ky < kernelHeight; ky++) {
                    for (let kx = 0; kx < kernelWidth; kx++) {
                        // Calculate image coordinates relative to kernel position
                        const imgY = y + (ky - kernelCenterY);
                        const imgX = x + (kx - kernelCenterX);
                        
                        // Skip pixels outside the image (edge handling - zero padding)
                        if (imgY < 0 || imgY >= height || imgX < 0 || imgX >= width) {
                            continue;
                        }
                        
                        // Get pixel value
                        const pixelIndex = (imgY * width + imgX) * channels + c;
                        const pixelValue = imageData[pixelIndex];
                        
                        // Apply kernel weight
                        sum += pixelValue * kernel[ky][kx];
                    }
                }
                
                // For emboss, add 128 to get a neutral gray for areas with no edges
                const resultIndex = (y * width + x) * channels + c;
                result[resultIndex] = Math.min(Math.max(Math.round(sum + 128), 0), 255);
            }
        }
    }
    
    return result;
}