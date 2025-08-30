# PersonalBuilder Documentation

## Table of Contents
1. Project Overview
2. Complete File Structure
3. Root Configuration Files
4. Client Application
5. Client Components
6. Client Hooks
7. Client Libraries
8. Client Pages
9. Server Application
10. Build & Deployment
11. Development Guidelines
12. Contact & Support

---

## Project Overview
PersonalBuilder is a modern, production-ready resume builder application built with React, Express, and modern web technologies. It allows users to create professional, ATS-friendly resumes with a clean, minimal interface.

Key Technologies:
- Frontend: React 18, Vite, TailwindCSS, Radix UI
- Backend: Express.js, Node.js
- Deployment: Netlify (Frontend), Express Server
- State Management: Context API, Local Storage
- PDF Generation: react-to-print

---

## Complete File Structure
```
PersonalBuilder/
├── docs/                     # Documentation
│   ├── AGENTS.md             # Developer notes and project info
│   ├── README.md             # Project documentation and setup guide
│   └── documentation.md      # Comprehensive documentation (this file)
│
├── client/                   # React Frontend Application
│   ├── App.jsx               # Main app component with routing
│   ├── global.css            # Global styles and TailwindCSS imports
│   ├── components/
│   │   └── ui/               # Base UI Component Library (Radix + Tailwind)
│   ├── data/                 # Static data
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities (gsapUtils, utils, viewport, profileStorage)
│   └── pages/                # Routes (Index, Builder, About, Templates, Contact, Privacy, Terms, NotFound)
│
├── server/
│   └── index.js              # Express server
│
├── public/                   # Static Public Assets
├── netlify/functions/        # Netlify serverless functions
├── package.json
├── index.html
├── netlify.toml
└── tailwind.config.js
```

---

## Root Configuration Files
- docs/AGENTS.md — Developer guidelines and patterns
- docs/README.md — Main project documentation
- docs/documentation.md — Full system documentation
- components.json — Shadcn/ui component configuration
- index.html — SPA entry point
- netlify.toml — Netlify deployment & redirects
- package.json — Scripts and dependencies
- postcss.config.js — PostCSS configuration
- tailwind.config.js — TailwindCSS theme
- vite.config.js — Vite client config
- vite.config.server.js — Vite server build config

---

## Client Application
App.jsx provides SPA routing, global providers (QueryClient, Tooltip, Toast), analytics, and scroll-to-top behavior. Global styles live in global.css.

Routes managed:
- /, /builder, /about, /templates, /contact, /privacy, /terms, * (NotFound)

---

## Client Components

UI Components (client/components/ui/):
- button, enhanced-button, input, textarea, label, select, switch, form
- card, separator, sheet, sidebar, dialog, dropdown-menu
- alert, alert-dialog, toast, toaster, tooltip, skeleton, command, toggle

Resume Builder Components:
- CustomSectionEditor, CustomSectionWizard, CustomSectionRenderer
- EnhancedResumeTemplate, ResumeTemplate
- PDFExportDialog, ConfirmationDialog
- ProfileManager, ProfileCreationModal
- Logo, Layout, LoadingSpinner

Note: Removed components (no longer in codebase): BuiltInSectionEditor, SectionManager, ErrorBoundary, HelpDialog, KeyboardShortcuts, OnboardingGuide, PreloadLink, StatusIndicator.

---

## Client Hooks
- use-lock-body-scroll.js — Prevent body scroll for overlays
- use-mobile.jsx — Mobile device detection
- use-toast.js — Toast state and helpers

---

## Client Libraries (client/lib/)
- gsapUtils.js — GSAP utilities and animations
- profileStorage.js — Local storage utilities for profiles
- utils.js, utils.spec.js — General helpers and tests
- viewport.js — Viewport utilities

Note: Removed libraries: animations.js, navigation.js, serviceWorker.js.

---

## Client Pages (client/pages/)
- Index.jsx — Landing page
- Builder.jsx — Resume builder interface
- Templates.jsx — Template gallery
- About.jsx — About page
- Contact.jsx — Contact page
- Privacy.jsx — Privacy Policy
- Terms.jsx — Terms of Service
- NotFound.jsx — 404 page

---

## Server Application
server/index.js — Express server with middleware and API routes.

Available endpoint(s):
- GET /api/ping — Health check and server status

---

## Build & Deployment
- public/ — Manifest, robots, service worker, and assets
- netlify/functions/api.js — Example serverless function

Build commands:
```bash
npm run build
npm run start
```

---

## Development Guidelines
- Components: idiomatic React, composition first
- Hooks: abstract reusable logic
- Utils: pure functions, tested where feasible
- Styles: Tailwind utility-first, consistent tokens
- Performance: code-splitting, minimal re-renders, efficient DOM
- Accessibility: keyboard support, semantic markup, focus management

---

## Contact & Support
- Email: kushwahaabhishek9981@gmail.com
- Documentation: docs/README.md and docs/documentation.md
- Issues: use GitHub issues for bugs and feature requests
