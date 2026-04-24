import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [snippetPath, slidesDir] = process.argv.slice(2);

if (!snippetPath || !slidesDir) {
  console.error("Usage: node scripts/inject-gtm.mjs <snippet> <slides-dir>");
  process.exit(1);
}

const gtm = readFileSync(snippetPath, "utf8");

readdirSync(slidesDir)
  .filter((f) => f.endsWith(".html"))
  .forEach((f) => {
    const p = join(slidesDir, f);
    const html = readFileSync(p, "utf8");
    writeFileSync(p, html.replace("</head>", gtm + "</head>"));
  });
