// Smart local image generation engine - generates metadata and descriptions for images

import * as crypto from 'crypto';

export interface ImageMetadata {
  id: string;
  prompt: string;
  style: string;
  size: string;
  description: string;
  colorPalette: string[];
  mood: string;
  elements: string[];
  composition: string;
  lightingType: string;
  generatedAt: string;
}

export interface GeneratedImage {
  id: string;
  metadata: ImageMetadata;
  svgPreview: string;
  dataUrl: string;
  fileName: string;
}

// Art styles and their characteristics
const styleConfigs = {
  realistic: {
    description: 'صورة احترافية واقعية عالية التفاصيل',
    techniques: ['high resolution', 'photorealistic', 'professional lighting'],
    colorDepth: 'vibrant and natural',
  },
  painting: {
    description: 'لوحة زيتية فنية حديثة',
    techniques: ['oil painting', 'brush strokes', 'impressionistic'],
    colorDepth: 'rich and textured',
  },
  anime: {
    description: 'فن أنمي ياباني جميل',
    techniques: ['anime style', 'vibrant colors', 'expressive eyes'],
    colorDepth: 'bold and saturated',
  },
  cartoon: {
    description: 'رسم كرتوني مرح وملون',
    techniques: ['cartoon style', 'bold outlines', 'friendly characters'],
    colorDepth: 'bright and playful',
  },
  digital: {
    description: 'فن رقمي حديث وعصري',
    techniques: ['digital art', 'modern design', 'clean lines'],
    colorDepth: 'contemporary and sleek',
  },
};

// Color palettes for different moods
const colorPalettes = {
  warm: ['#FF6B6B', '#FFA500', '#FFD700', '#FF8C00', '#CD5C5C'],
  cool: ['#1E90FF', '#00CED1', '#20B2AA', '#4169E1', '#6495ED'],
  vibrant: ['#FF1493', '#00FF00', '#FFD700', '#1E90FF', '#FF69B4'],
  muted: ['#A0826D', '#9B8B7E', '#8B8680', '#837E75', '#6B6B83'],
  pastel: ['#FFB3BA', '#FFCCCB', '#FFE5CC', '#E0BBE4', '#D4F1F4'],
  dark: ['#2C3E50', '#34495E', '#445566', '#556B82', '#667799'],
};

// Mood descriptors
const moods = [
  'mystical', 'energetic', 'calm', 'dramatic', 'playful',
  'elegant', 'surreal', 'industrial', 'natural', 'futuristic'
];

// Art elements
const elements = [
  'light rays', 'texture', 'depth', 'movement', 'symmetry',
  'contrast', 'shadows', 'gradients', 'geometric shapes', 'organic forms'
];

// Composition styles
const compositions = [
  'centered composition',
  'rule of thirds',
  'leading lines',
  'framing',
  'layered depth',
  'balanced asymmetry',
  'golden ratio',
];

// Lighting types
const lightingTypes = [
  'natural daylight',
  'studio lighting',
  'backlighting',
  'neon glow',
  'soft lighting',
  'dramatic shadows',
  'golden hour',
];

// Generate deterministic but varied color based on prompt
function generateColorsFromPrompt(prompt: string, style: string): string[] {
  const hash = crypto.createHash('md5').update(prompt + style).digest('hex');
  const paletteKeys = Object.keys(colorPalettes) as Array<keyof typeof colorPalettes>;
  const index = parseInt(hash.substring(0, 1), 16) % paletteKeys.length;
  return colorPalettes[paletteKeys[index]];
}

// Generate realistic mood based on prompt keywords
function generateMood(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('هادئ') || lower.includes('سلام') || lower.includes('متسالم'))
    return 'calm';
  if (lower.includes('حركة') || lower.includes('طاقة') || lower.includes('نشيط'))
    return 'energetic';
  if (lower.includes('خيالي') || lower.includes('سحري') || lower.includes('غامض'))
    return 'mystical';
  if (lower.includes('درامي') || lower.includes('قوي') || lower.includes('مثير'))
    return 'dramatic';
  if (lower.includes('مرح') || lower.includes('فرح') || lower.includes('ضحك'))
    return 'playful';
  if (lower.includes('أنيق') || lower.includes('فاخر') || lower.includes('عالي الجودة'))
    return 'elegant';
  
  return moods[Math.floor(Math.random() * moods.length)];
}

// Extract relevant elements from prompt
function extractElements(prompt: string): string[] {
  const selected: string[] = [];
  const lower = prompt.toLowerCase();
  
  elements.forEach((element) => {
    if (
      lower.includes(element) ||
      (element === 'light rays' && (lower.includes('نور') || lower.includes('ضوء'))) ||
      (element === 'movement' && (lower.includes('حركة') || lower.includes('متحرك')))
    ) {
      selected.push(element);
    }
  });
  
  // If no elements matched, select random ones
  if (selected.length === 0) {
    for (let i = 0; i < 3; i++) {
      selected.push(elements[Math.floor(Math.random() * elements.length)]);
    }
  }
  
  return selected.slice(0, 5);
}

// Generate detailed image description
function generateDescription(prompt: string, style: string, mood: string): string {
  const styleConfig = styleConfigs[style as keyof typeof styleConfigs];
  const descriptions = [
    `${styleConfig.description} تصور ${prompt}`,
    `${styleConfig.colorDepth} مع ${mood} ${prompt} بأسلوب ${style}`,
    `صورة ${mood} من ${prompt} مع تقنيات ${styleConfig.techniques.join('، ')}`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Select composition for the image
function selectComposition(): string {
  return compositions[Math.floor(Math.random() * compositions.length)];
}

// Select lighting type
function selectLighting(): string {
  return lightingTypes[Math.floor(Math.random() * lightingTypes.length)];
}

// Generate a beautiful SVG artwork based on prompt and style
function generateSVGPreview(
  prompt: string,
  colors: string[],
  width: number,
  height: number
): string {
  const hash = crypto.createHash('md5').update(prompt).digest('hex');
  const parts: string[] = [];
  
  // SVG opening tag
  parts.push(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`);
  
  // Define gradients
  parts.push(`
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:0.3" />
        <stop offset="50%" style="stop-color:${colors[1]};stop-opacity:0.5" />
        <stop offset="100%" style="stop-color:${colors[2]};stop-opacity:0.3" />
      </linearGradient>
      <radialGradient id="light-grad" cx="50%" cy="30%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0.0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `);
  
  // Background
  parts.push(`<rect width="${width}" height="${height}" fill="${colors[colors.length - 1]}"/>`);
  parts.push(`<rect width="${width}" height="${height}" fill="url(#bg-grad)"/>`);
  
  // Decorative elements based on mood/style
  const elements = 12;
  for (let i = 0; i < elements; i++) {
    const hashOffset = i * 4;
    const hashVal = parseInt(hash.substring(hashOffset, hashOffset + 4), 16);
    
    const x = (hashVal % width);
    const yVal = parseInt(hash.substring(hashOffset + 4, hashOffset + 8), 16);
    const y = (yVal % height);
    
    const sizeVal = parseInt(hash.substring(hashOffset + 8, hashOffset + 12), 16);
    const size = 20 + (sizeVal % 120);
    
    const colorIdx = (i + parseInt(hash.substring(0, 2), 16)) % colors.length;
    const color = colors[colorIdx];
    
    const opacity = 0.15 + (i % 10) * 0.08;
    const blurAmount = 1 + (i % 3);
    
    const shapeType = (hashVal + i) % 4;
    
    if (shapeType === 0) {
      // Circle with blur
      parts.push(
        `<circle cx="${x}" cy="${y}" r="${size/2}" fill="${color}" opacity="${opacity}" filter="url(#glow)" style="filter: blur(${blurAmount}px)"/>`
      );
    } else if (shapeType === 1) {
      // Rectangle with rotation
      const rotation = (hashVal % 360);
      parts.push(
        `<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})" style="filter: blur(${blurAmount}px)"/>`
      );
    } else if (shapeType === 2) {
      // Triangle
      const points = `${x},${y - size/2} ${x + size/2},${y + size/2} ${x - size/2},${y + size/2}`;
      parts.push(
        `<polygon points="${points}" fill="${color}" opacity="${opacity}" style="filter: blur(${blurAmount}px)"/>`
      );
    } else {
      // Star-like shape
      const points = [];
      for (let j = 0; j < 5; j++) {
        const angle = (j * 4 * Math.PI) / 5;
        const rx = x + (size / 2) * Math.cos(angle);
        const ry = y + (size / 2) * Math.sin(angle);
        points.push(`${rx},${ry}`);
      }
      parts.push(
        `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}" style="filter: blur(${blurAmount}px)"/>`
      );
    }
  }
  
  // Light overlay
  parts.push(`<circle cx="${width * 0.3}" cy="${height * 0.2}" r="${width * 0.4}" fill="url(#light-grad)"/>`);
  
  // Add some textured lines for depth
  const lineCount = 4;
  for (let i = 0; i < lineCount; i++) {
    const hashVal = parseInt(hash.substring(i * 3, i * 3 + 3), 16);
    const y1 = (height / lineCount) * i;
    const y2 = (height / lineCount) * (i + 1);
    const colorIdx = i % colors.length;
    
    parts.push(
      `<line x1="0" y1="${y1}" x2="${width}" y2="${y2}" stroke="${colors[colorIdx]}" stroke-width="2" opacity="0.1"/>`
    );
  }
  
  // Add decorative border
  parts.push(
    `<rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${colors[0]}" stroke-width="3" opacity="0.3"/>`
  );
  
  parts.push('</svg>');
  
  return parts.join('\n');
}

export function generateImage(
  prompt: string,
  style: string = 'realistic',
  size: string = '1024x1024'
): GeneratedImage {
  // Parse size
  const [widthStr, heightStr] = size.split('x');
  const width = parseInt(widthStr) || 1024;
  const height = parseInt(heightStr) || 1024;
  
  // Generate metadata
  const colors = generateColorsFromPrompt(prompt, style);
  const mood = generateMood(prompt);
  const selectedElements = extractElements(prompt);
  const composition = selectComposition();
  const lighting = selectLighting();
  const description = generateDescription(prompt, style, mood);
  
  const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  
  const metadata: ImageMetadata = {
    id: imageId,
    prompt,
    style,
    size,
    description,
    colorPalette: colors,
    mood,
    elements: selectedElements,
    composition,
    lightingType: lighting,
    generatedAt: new Date().toISOString(),
  };
  
  // Generate SVG preview
  const svgPreview = generateSVGPreview(prompt, colors, width, height);
  
  // Create data URL
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgPreview).toString('base64')}`;
  
  return {
    id: imageId,
    metadata,
    svgPreview,
    dataUrl,
    fileName: `${prompt.slice(0, 30).replace(/\s+/g, '-')}-${imageId}.svg`,
  };
}

export function imageMetadataToJSON(image: GeneratedImage): string {
  return JSON.stringify(image.metadata, null, 2);
}

export function imagesToMarkdown(images: GeneratedImage[]): string {
  let markdown = '# الصور المولدة\n\n';
  
  images.forEach((image, index) => {
    markdown += `## الصورة ${index + 1}\n\n`;
    markdown += `**الوصف:** ${image.metadata.description}\n\n`;
    markdown += `**الموضوع:** ${image.metadata.prompt}\n`;
    markdown += `**الأسلوب:** ${image.metadata.style}\n`;
    markdown += `**المزاج:** ${image.metadata.mood}\n`;
    markdown += `**الدقة:** ${image.metadata.size}\n`;
    markdown += `**التكوين:** ${image.metadata.composition}\n`;
    markdown += `**الإضاءة:** ${image.metadata.lightingType}\n\n`;
    
    markdown += `**العناصر:** ${image.metadata.elements.join('، ')}\n\n`;
    markdown += `**الألوان:** `;
    image.metadata.colorPalette.forEach((color) => {
      markdown += `\`${color}\` `;
    });
    markdown += `\n\n`;
    
    markdown += `**تاريخ الإنشاء:** ${new Date(image.metadata.generatedAt).toLocaleString('ar-SA')}\n\n`;
    markdown += '---\n\n';
  });
  
  return markdown;
}
