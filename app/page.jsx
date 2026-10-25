import fs from "node:fs";
import path from "node:path";

export default function HomePage() {
  const markup = fs.readFileSync(
    path.join(process.cwd(), "public", "neuro-content.html"),
    "utf8",
  );

  return (
    <div
      id="neuro-root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
