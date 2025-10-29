// Create a new file: src/utils/imageHelper.js

/**
 * Converts any image path/URL to the correct backend URL
 * Handles: local filenames, full URLs, partial paths, production URLs
 */
export const getImageUrl = (imagePath, apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000') => {
  if (!imagePath) return null;
  
  // If it's already a complete HTTP/HTTPS URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Check if it's our API URL (might be old production URL)
    if (imagePath.includes('api.ekalakaar.com/uploads') || 
        imagePath.includes('localhost:4000/images') ||
        imagePath.includes('localhost:5000/images')) {
      // Extract just the filename
      const filename = imagePath.split('/').pop();
      return `${apiBaseUrl}/images/${filename}`;
    }
    // External URL (Cloudinary, etc) - return as is
    return imagePath;
  }
  
  // If it's a blob URL (temporary upload preview)
  if (imagePath.startsWith('blob:')) {
    return imagePath;
  }
  
  // Clean any path prefixes
  let cleanPath = imagePath
    .replace(/^\/public\/images\//, '')
    .replace(/^public\/images\//, '')
    .replace(/^\/images\//, '')
    .replace(/^images\//, '')
    .replace(/^\/uploads\/performance\//, '')
    .replace(/^uploads\/performance\//, '');
  
  // Build final URL
  return `${apiBaseUrl}/images/${cleanPath}`;
};
