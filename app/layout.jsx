import "./globals.css";
import ScriptLoader from "./script-loader";

export const metadata = {
  title: "NEURO Series 01",
  description:
    "NEURO Series 01: Neurotransmitter. Nine collectible blind box figures, each a brain chemical with a face. Secret odds 1 : 144.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..800&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body>
        {children}
        <ScriptLoader />
      </body>
    </html>
  );
}
