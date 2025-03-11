import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUALITY = {
  jpg: 80,
  webp: 75,
  avif: 70
};

const MAX_WIDTH = {
  logo: 400,
  mockup: 1920
};

async function processImage(inputPath, outputDir) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const name = path.basename(filename, ext);
    
    // Determine max width based on filename
    const maxWidth = filename.includes('logo') ? MAX_WIDTH.logo : MAX_WIDTH.mockup;
    
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Load image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if width is larger than maxWidth
    if (metadata.width > maxWidth) {
      image.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Output optimized formats
    const formats = [
      {
        ext: 'webp',
        options: { quality: QUALITY.webp }
      },
      {
        ext: 'avif',
        options: { quality: QUALITY.avif }
      }
    ];
    
    // If original is JPG/PNG, optimize it too
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      await image
        .jpeg({ quality: QUALITY.jpg })
        .toFile(path.join(outputDir, filename));
    }
    
    // Generate WebP and AVIF versions
    for (const format of formats) {
      const outputPath = path.join(outputDir, `${name}.${format.ext}`);
      await image[format.ext](format.options).toFile(outputPath);
      
      console.log(`✓ Generated ${format.ext}: ${outputPath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function optimizeImages() {
  const sourceDir = path.join(__dirname, '../src/assets/img');
  const outputDir = path.join(__dirname, '../public/img');
  
  try {
    // Recursively get all image files
    async function getImageFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files = await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return getImageFiles(fullPath);
        } else if (['.jpg', '.jpeg', '.png'].includes(path.extname(entry.name).toLowerCase())) {
          return fullPath;
        }
      }));
      
      return files.flat().filter(Boolean);
    }
    
    const imageFiles = await getImageFiles(sourceDir);
    
    // Process each image
    console.log(`Found ${imageFiles.length} images to process...`);
    
    for (const file of imageFiles) {
      const relativePath = path.relative(sourceDir, file);
      const outputSubDir = path.join(outputDir, path.dirname(relativePath));
      
      await processImage(file, outputSubDir);
    }
    
    console.log('✨ Image optimization complete!');
    
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

optimizeImages(); 