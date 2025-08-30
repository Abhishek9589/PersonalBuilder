# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, Vitest, Zod, and modern tooling.

While the starter comes with an Express server, only create endpoints when strictly necessary, for example to encapsulate logic that must live on the server, such as private key handling or certain DB operations.

## Tech Stack

- Frontend: React 18 + React Router 6 (SPA) + Vite + TailwindCSS 3
- Backend: Express server integrated with Vite dev server
- Testing: Vitest
- UI: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.jsx = home)
│   ├── Index.jsx         # Home page (/)
│   ├── Builder.jsx       # Resume builder (/builder)
│   ├── About.jsx         # About page (/about)
│   ├── Templates.jsx     # Templates page (/templates)
│   ├── Contact.jsx       # Contact page (/contact)
│   ├── Privacy.jsx       # Privacy Policy (/privacy)
│   ├── Terms.jsx         # Terms of Service (/terms)
│   └── NotFound.jsx      # 404 page
├── components/ui/        # Pre-built UI component library
├── App.jsx               # App entry point with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
└── index.js              # Main server setup (express config + routes)

docs/                     # Documentation (moved here)
├── README.md             # Project documentation and setup guide
├── AGENTS.md             # Developer notes and project info
└── documentation.md      # Comprehensive system docs

public/                   # Static assets
```

## Key Features

### SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.jsx` represents the home page.
- Routes are defined in `client/App.jsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/builder" element={<Builder />} />
  <Route path="/about" element={<About />} />
  <Route path="/templates" element={<Templates />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Styling System

- Primary: TailwindCSS 3 utility classes
- Theme and design tokens: Configure in `client/global.css`
- UI components: Pre-built library in `client/components/ui/`
- Utility: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

### Express Server Integration

- Development: Single port (8080) for both frontend/backend
- Hot reload: Both client and server code
- API endpoints: Prefixed with `/api/`

Example API route available:
- `GET /api/ping` – simple ping API

## Development Commands

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm run start      # Start production server
npm test           # Run Vitest tests
```

## Adding Features

### Add new colors to the theme
Open `client/global.css` and `tailwind.config.js` and add new Tailwind colors.

### New API Route
1. Create a new route handler in `server/index.js` or a separate module, then register it:
```js
// server/index.js
app.get("/api/my-endpoint", (req, res) => {
  res.json({ message: "Hello from my endpoint!" });
});
```

### New Page Route
1. Create a component in `client/pages/MyPage.jsx`
2. Add route in `client/App.jsx`:
```jsx
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- Standard: `npm run build` + `npm start`
- Prefer Netlify to deploy the site (preconfigured)

## Architecture Notes

- Single-port development with Vite + Express integration
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Clean separation between client and server
