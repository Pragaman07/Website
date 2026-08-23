/**
 * Derives the small toggle-face assets from Pragaman's real images
 * (Design Spec §3.2: headshot in Work / memoji in Know Me — permanent).
 * Source files stay untouched; run again whenever they change.
 *
 * Run: node scripts/prepare-images.mjs
 */
import sharp from "sharp";

// Face crop from the real photo (2139×2139 square): head, upper-center.
await sharp("public/images/prag.png")
  .extract({ left: 680, top: 20, width: 760, height: 760 })
  .resize(120, 120)
  .jpeg({ quality: 82 })
  .toFile("public/images/prag-face.jpg");

// Winking memoji, trimmed + downsized for the 30px knob.
await sharp("public/images/memoji-fun.png")
  .trim()
  .resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("public/images/memoji-face.png");

console.log("prag-face.jpg + memoji-face.png written");
