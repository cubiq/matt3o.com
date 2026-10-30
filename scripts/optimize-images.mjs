import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const CACHE_FILE = path.resolve(process.cwd(), '.image-opt-cache.json');
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const WEBP_QUALITY = 82;

function getFileHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n', 'utf8');
}

function walkImages(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(full, list);
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      list.push(full);
    }
  }
  return list;
}

async function run() {
  const forceAll = process.argv.includes('--force');
  const cache = forceAll ? {} : loadCache();
  const images = walkImages(PUBLIC_DIR);

  let strippedExifCount = 0;
  let resizedCount = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const filePath of images) {
    const relPath = path.relative(PUBLIC_DIR, filePath);
    const inputBuffer = fs.readFileSync(filePath);
    const origSize = inputBuffer.length;
    bytesBefore += origSize;

    const currentHash = getFileHash(inputBuffer);
    if (cache[relPath] === currentHash) {
      bytesAfter += origSize;
      skippedCount++;
      continue;
    }

    let meta;
    try {
      meta = await sharp(inputBuffer).metadata();
    } catch (err) {
      console.warn(`[warn] Skipping unreadable image ${relPath}:`, err.message);
      bytesAfter += origSize;
      continue;
    }

    const hasMetadata = Boolean(meta.exif || meta.iptc || meta.xmp);
    const needsResize = (meta.width || 0) > MAX_DIMENSION || (meta.height || 0) > MAX_DIMENSION;

    // 1. Auto-orient based on EXIF Orientation before stripping all EXIF/XMP/IPTC metadata
    let pipeline = sharp(inputBuffer).rotate();

    // 2. Resize if larger than MAX_DIMENSION
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,
        progressive: true,
      });
    } else if (ext === '.png') {
      pipeline = pipeline.png({
        compressionLevel: 9,
        palette: true,
        quality: PNG_QUALITY,
        effort: 8,
      });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({
        quality: WEBP_QUALITY,
        effort: 6,
      });
    }

    const outputBuffer = await pipeline.toBuffer();
    const newSize = outputBuffer.length;
    const savedEnough = newSize < origSize * 0.98;

    if (hasMetadata) strippedExifCount++;
    if (needsResize) resizedCount++;

    // Always write if metadata had to be stripped or dimensions exceeded max; otherwise only if smaller
    if (hasMetadata || needsResize || savedEnough) {
      fs.writeFileSync(filePath, outputBuffer);
      cache[relPath] = getFileHash(outputBuffer);
      bytesAfter += newSize;
      optimizedCount++;
    } else {
      cache[relPath] = currentHash;
      bytesAfter += origSize;
      skippedCount++;
    }
  }

  saveCache(cache);

  const savedMB = ((bytesBefore - bytesAfter) / (1024 * 1024)).toFixed(2);
  const beforeMB = (bytesBefore / (1024 * 1024)).toFixed(2);
  const afterMB = (bytesAfter / (1024 * 1024)).toFixed(2);

  console.log(
    `[image-opt] Scanned ${images.length} images | Optimized: ${optimizedCount} | EXIF/Metadata stripped: ${strippedExifCount} | Resized (>${MAX_DIMENSION}px): ${resizedCount} | Unchanged: ${skippedCount}`
  );
  console.log(`[image-opt] Total size: ${beforeMB} MB -> ${afterMB} MB (Saved ${savedMB} MB)`);
}

run().catch((err) => {
  console.error('[image-opt] Failed:', err);
  process.exit(1);
});

