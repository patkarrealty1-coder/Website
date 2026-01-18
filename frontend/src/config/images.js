// External Image URLs Configuration
// Upload your images to ImgBB, Cloudinary, or any CDN and paste the URLs here

export const IMAGES = {
  // Hero Section
  HERO_BACKGROUND: 'https://i.ibb.co/YOUR-IMAGE-ID/hero.jpg', // Replace with your ImgBB URL
  
  // Fallback to local images if CDN fails
  HERO_BACKGROUND_FALLBACK: '/images/Firefly.png',
  
  // Other images (add as needed)
  LOGO: '/images/Logo.png',
  PROPERTY_THUMBNAIL: '/images/property-thumbnail.svg',
};

// Helper function to get image URL with fallback
export const getImageUrl = (imageKey, fallback = true) => {
  const url = IMAGES[imageKey];
  
  // If it's a CDN URL (starts with http), return it
  if (url && url.startsWith('http')) {
    return url;
  }
  
  // Otherwise return local path
  return url || IMAGES[`${imageKey}_FALLBACK`] || '';
};

export default IMAGES;
