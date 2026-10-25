# NEURO Series 01

Next.js App Router conversion of the original standalone `index.html` experience.

Requires Node.js 20.9 or newer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm start
```

The original `index.html` and `audio/` folder are retained as source/reference files.

The migration keeps the original visual experience intact while separating it into:

- `app/` for the Next.js route, metadata, global styles, and client-side loader
- `public/neuro-content.html` for the preserved page markup
- `public/neuro.js` for the original animation and interaction logic
- `public/audio/` for the soundtrack

If the original HTML changes, regenerate the extracted files with:

```powershell
.\scripts\migrate-html.ps1
```
