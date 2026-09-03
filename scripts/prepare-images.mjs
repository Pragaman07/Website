/**
 * Derives every memoji/photo asset the components reference from
 * Pragaman's source images. Sources stay untouched — run again whenever
 * they change:  node scripts/prepare-images.mjs
 *
 * Toggle faces (§3.2 as amended 3 Sep 2026, DECISIONS.md): the Surprise
 * memoji in Work, the winking memoji in Know Me. The other cut-outs feed
 * the memoji placement map (Work hero, Door, intake success, Know footer,
 * egg-1 card); next/image resizes from these height-capped PNGs.
 */
import fs from "node:fs";
import sharp from "sharp";

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const cut = (file) => sharp(`public/images/${file}`).trim();

// 120px faces for the 30px toggle knob (raw <img> in the header — tiny on purpose)
await cut("surprise.png")
  .resize(120, 120, { fit: "contain", background: clear })
  .png()
  .toFile("public/images/memoji-surprise-face.png");
await cut("memoji-fun.png")
  .resize(120, 120, { fit: "contain", background: clear })
  .png()
  .toFile("public/images/memoji-face.png");

// the winking memoji at sticker size — Know Me hub polaroid corner (§11.1 garnish)
await cut("memoji-fun.png")
  .resize(160, 186, { fit: "contain", background: clear })
  .png()
  .toFile("public/images/memoji-sticker.png");

// placement cut-outs: trimmed, height-capped at 2x their largest display size
const cuts = [
  ["surprise.png", "memoji-surprise.png", 320], // egg-1 error card
  ["heart.png", "memoji-heart.png", 480], // intake success + Know Me footer
  ["Hands on waist.png", "memoji-hands.png", 640], // Work hero
];
for (const [src, out, height] of cuts) {
  await cut(src).resize({ height }).png({ compressionLevel: 9 }).toFile(`public/images/${out}`);
}

// real dimensions → components/ui/Memoji.tsx manifest
for (const f of [
  "memoji-surprise-face.png",
  "memoji-surprise.png",
  "memoji-heart.png",
  "memoji-hands.png",
  "memoji-full.png",
  "memoji-call.png",
]) {
  const m = await sharp(`public/images/${f}`).metadata();
  const kb = Math.round(fs.statSync(`public/images/${f}`).size / 1024);
  console.log(`${f.padEnd(26)} ${m.width}x${m.height}  ${kb}KB`);
}
