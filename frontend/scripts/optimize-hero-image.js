const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.log('❌ Sharp not installed. Installing...');
  console.log('Run: npm install --save-dev sharp');
  console.log('Then run this script again.');
  process.exit(1);
}

const inputPath = path.join(__dirname, '../public/images/Firefly.png');
const outputWebP = path.join(__dirname, '../public/images/Firefly.webp');
const outputOptimizedPng = path.join(__dirname, '../public/images/Firefly-optimized.png');

async function optimizeImage() {
  try {
    console.log('🔄 Optimizing hero image...');
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 Original size: ${originalSizeMB}MB`);

    // Create WebP version (best compression)
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputWebP);

    const webpStats = fs.statSync(outputWebP);
    const webpSizeMB = (webpStats.size / 1024 / 1024).toFixed(2);
    console.log(`✅ WebP created: ${webpSizeMB}MB (${((1 - webpStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);

    // Create optimized PNG version (fallback)
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .png({ 
        quality: 85,
        compressionLevel: 9,
        effort: 10
      })
      .toFile(outputOptimizedPng);

    const pngStats = fs.statSync(outputOptimizedPng);
    const pngSizeMB = (pngStats.size / 1024 / 1024).toFixed(2);
    console.log(`✅ Optimized PNG created: ${pngSizeMB}MB (${((1 - pngStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);

    console.log('\n🎉 Optimization complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Update Hero.jsx to use Firefly.webp');
    console.log('2. Keep Firefly-optimized.png as fallback');
    console.log('3. Test the page load speed');
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    process.exit(1);
  }
}

optimizeImage();
