# PersonalBuilder - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Complete File Structure](#complete-file-structure)
3. [Root Configuration Files](#root-configuration-files)
4. [Client Application](#client-application)
5. [Server Application](#server-application)
6. [Shared Resources](#shared-resources)
7. [Build & Deployment](#build--deployment)
8. [Development Guidelines](#development-guidelines)

---

## Project Overview

PersonalBuilder is a modern, production-ready resume builder application built with React, Express, and modern web technologies. It allows users to create professional, ATS-friendly resumes with a clean, minimal interface.

**Key Technologies:**
- Frontend: React 18, Vite, TailwindCSS, Radix UI
- Backend: Express.js, Node.js
- Deployment: Netlify (Frontend), Express Server
- State Management: Context API, Local Storage
- PDF Generation: react-to-print

---

## Complete File Structure

```
PersonalBuilder/
├── 📄 Root Configuration & Documentation
│   ├── AGENTS.md                 # Development guidelines and project info
│   ├── README.md                 # Project documentation and setup guide
│   ├── documentation.md          # This comprehensive documentation file
│   ├── components.json           # Shadcn/ui component configuration
│   ├── index.html                # Main HTML entry point
│   ├── netlify.toml              # Netlify deployment configuration
│   ├── package.json              # Dependencies and scripts
│   ├── postcss.config.js         # PostCSS configuration for TailwindCSS
│   ├── tailwind.config.js        # TailwindCSS configuration and theme
│   ├── vite.config.js            # Vite bundler configuration (client)
│   └── vite.config.server.js     # Vite bundler configuration (server)
│
├── 🖥️ client/                    # React Frontend Application
│   ├── App.jsx                   # Main app component with routing
│   ├── global.css                # Global styles and TailwindCSS imports
│   │
│   ├── 🧩 components/            # React Components
│   │   ├── 🎨 ui/                # Base UI Component Library (Radix + Tailwind)
│   │   │   ├── alert-dialog.jsx  # Modal confirmation dialogs
│   │   │   ├── alert.jsx         # Alert/notification messages
│   │   │   ├── button.jsx        # Standard button component
│   │   │   ├── card.jsx          # Content container cards
│   │   │   ├── command.jsx       # Command palette/search interface
│   │   │   ├── dialog.jsx        # Modal dialog windows
│   │   │   ├── dropdown-menu.jsx # Dropdown menu interfaces
│   │   │   ├── enhanced-button.jsx # Premium styled button variants
│   │   │   ├── form.jsx          # Form field utilities and validation
│   │   │   ├── input.jsx         # Text input fields
│   │   │   ├── label.jsx         # Form field labels
│   │   │   ├── select.jsx        # Dropdown selection menus
│   │   │   ├── separator.jsx     # Visual divider lines
│   │   │   ├── sheet.jsx         # Side panel/drawer components
│   │   │   ├── sidebar.jsx       # Navigation sidebar
│   │   │   ├── skeleton.jsx      # Loading skeleton placeholders
│   │   │   ├── switch.jsx        # Toggle switch controls
│   │   │   ├── textarea.jsx      # Multi-line text input
│   │   │   ├── toast.jsx         # Toast notification system
│   │   │   ├── toaster.jsx       # Toast notification provider
│   │   │   ├── toggle.jsx        # Toggle button components
│   │   │   └── tooltip.jsx       # Hover tooltip overlays
│   │   │
│   │   ├── 📝 Resume Builder Components
│   │   │   ├── BuiltInSectionEditor.jsx    # Editor for standard resume sections
│   │   │   ├── CustomSectionEditor.jsx     # Editor for custom user sections
│   │   │   ├── CustomSectionRenderer.jsx   # Display renderer for custom sections
│   │   │   ├── CustomSectionWizard.jsx     # Wizard for creating custom sections
│   │   │   ├── EnhancedResumeTemplate.jsx  # Advanced resume template with features
│   │   │   ├── ResumeTemplate.jsx          # Basic resume template layout
│   │   │   ├── SectionManager.jsx          # Manager for resume section ordering
│   │   │   ├── PDFExportDialog.jsx         # PDF export interface and logic
│   │   │   ├── ProfileManager.jsx          # Multiple resume profile management
│   │   │   └── ProfileCreationModal.jsx    # Modal for creating new profiles
│   │   │
│   │   ├── 🎯 Utility Components
│   │   │   ├── ConfirmationDialog.jsx      # Generic confirmation dialogs
│   │   │   ├── ErrorBoundary.jsx           # React error boundary wrapper
│   │   │   ├── HelpDialog.jsx              # Help and documentation modal
│   │   │   ├── KeyboardShortcuts.jsx       # Keyboard shortcut manager
│   │   │   ├── Layout.jsx                  # Main app layout with header/footer
│   │   │   ├── LoadingSpinner.jsx          # Loading animation component
│   │   │   ├── Logo.jsx                    # PersonalBuilder logo component
│   │   │   ├── OnboardingGuide.jsx         # User onboarding tutorial
│   │   │   ├── PreloadLink.jsx             # Performance optimization for links
│   │   │   └── StatusIndicator.jsx         # Status/progress indicators
│   │   │
│   │   └── 📊 data/              # Static Data
│   │       └── skills.js         # Predefined skill categories and suggestions
│   │
│   ├── 🪝 hooks/                 # Custom React Hooks
│   │   ├── use-lock-body-scroll.js  # Prevent body scroll (for modals)
│   │   ├── use-mobile.jsx           # Mobile device detection hook
│   │   └── use-toast.js             # Toast notification management hook
│   │
│   ├── 🛠️ lib/                   # Utility Libraries
│   │   ├── animations.js         # Animation utilities and configurations
│   │   ├── gsapUtils.js          # GSAP animation library utilities
│   │   ├── navigation.js         # Navigation helpers and utilities
│   │   ├── profileStorage.js     # Local storage management for profiles
│   │   ├── serviceWorker.js      # PWA service worker registration
│   │   ├── utils.js              # General utility functions
│   │   ├── utils.spec.js         # Unit tests for utility functions
│   │   └── viewport.js           # Viewport and responsive utilities
│   │
│   └── 📄 pages/                 # Page-Level Components (Routes)
│       ├── About.jsx             # About page (/about)
│       ├── Builder.jsx           # Main resume builder interface (/builder)
│       ��── Contact.jsx           # Contact information page (/contact)
│       ├── Index.jsx             # Home/landing page (/)
│       ├── NotFound.jsx          # 404 error page (*)
│       ├── Privacy.jsx           # Privacy Policy page (/privacy)
│       ├── Templates.jsx         # Resume templates showcase (/templates)
│       └── Terms.jsx             # Terms of Service page (/terms)
│
├── 🖧 server/                    # Express.js Backend
│   ├── index.js                  # Main server configuration and routes
│   └── node-build.js             # Production server build script
│
├── 🔗 shared/                    # Shared Code (Client + Server)
│   ├── api.js                    # API interface definitions and types
│   └── resume-types.js           # Resume data structure definitions
│
├── 🌐 public/                    # Static Public Assets
│   ├── favicon.ico               # Website favicon
│   ├── manifest.json             # PWA manifest configuration
│   ├── placeholder.svg           # Placeholder image for missing assets
│   ├── robots.txt                # Search engine crawler instructions
│   └── sw.js                     # Service worker for PWA functionality
│
└── 🚀 netlify/                   # Netlify Deployment
    └── functions/
        └── api.js                # Netlify serverless function
```

---

## Root Configuration Files

### 📋 AGENTS.md
**Purpose:** Development guidelines and technical documentation for developers
**Contains:**
- Project architecture overview
- Technology stack explanation
- Development patterns and conventions
- Code style guidelines
- Routing system documentation

### 📖 README.md
**Purpose:** Main project documentation for users and contributors
**Contains:**
- Project overview and features
- Installation and setup instructions
- Usage guide for developers
- Deployment instructions
- Contributing guidelines

### ⚙️ components.json
**Purpose:** Shadcn/ui component library configuration
**Contains:**
- Component generation settings
- TypeScript configuration
- Import path aliases
- Styling configuration

### 🌐 index.html
**Purpose:** Main HTML entry point for the React application
**Contains:**
- Meta tags for SEO and PWA
- Viewport configuration for responsive design
- Root div for React mounting
- External font imports

### 🚀 netlify.toml
**Purpose:** Netlify deployment and hosting configuration
**Contains:**
- Build command specifications
- Redirect rules for SPA routing
- Environment variable settings
- Function deployment settings

### 📦 package.json
**Purpose:** Node.js project configuration and dependency management
**Contains:**
- Project metadata and version
- Production and development dependencies
- Build and development scripts
- Cross-browser compatibility settings

### 🎨 postcss.config.js
**Purpose:** PostCSS configuration for CSS processing
**Contains:**
- TailwindCSS plugin configuration
- Autoprefixer settings for browser compatibility
- CSS optimization settings

### 🎨 tailwind.config.js
**Purpose:** TailwindCSS framework configuration
**Contains:**
- Custom color palette (black & white theme)
- Font family definitions
- Responsive breakpoints
- Custom utility classes
- Animation configurations

### ⚡ vite.config.js
**Purpose:** Vite bundler configuration for client-side development
**Contains:**
- React plugin configuration
- Development server settings
- Build optimization settings
- Path alias configurations

### ⚡ vite.config.server.js
**Purpose:** Vite bundler configuration for server-side development
**Contains:**
- Node.js build configuration
- Express server build settings
- External dependency handling

---

## Client Application

### 🚀 App.jsx
**Purpose:** Main React application component and routing setup
**Key Features:**
- React Router configuration for SPA navigation
- Global provider setup (QueryClient, Tooltip, Toast)
- Route definitions for all pages
- Analytics integration
- Scroll-to-top functionality on route changes

**Routes Managed:**
- `/` → Index (Home page)
- `/builder` → Builder (Resume creation)
- `/about` → About (Project information)
- `/templates` → Templates (Template showcase)
- `/contact` → Contact (Contact information)
- `/privacy` → Privacy (Privacy Policy)
- `/terms` → Terms (Terms of Service)
- `*` → NotFound (404 page)

### 🎨 global.css
**Purpose:** Global styling, TailwindCSS imports, and cross-browser optimizations
**Key Features:**
- Google Fonts imports for typography
- TailwindCSS base, components, and utilities
- Cross-browser compatibility fixes
- Mobile optimization and touch-friendly utilities
- CSS custom properties for theming
- Performance optimizations for animations
- Accessibility enhancements

---

## Client Components

### 🎨 UI Components (client/components/ui/)

#### Base Input/Form Components
- **button.jsx:** Standard button with variants (primary, secondary, destructive)
- **enhanced-button.jsx:** Premium styled buttons with advanced animations
- **input.jsx:** Text input fields with validation styling
- **textarea.jsx:** Multi-line text input with auto-resize capabilities
- **label.jsx:** Form labels with proper accessibility attributes
- **select.jsx:** Dropdown selection with keyboard navigation
- **switch.jsx:** Toggle switches for boolean settings
- **form.jsx:** Form utilities with validation and error handling

#### Layout & Navigation Components
- **card.jsx:** Content containers with consistent styling
- **separator.jsx:** Visual dividers and section breaks
- **sheet.jsx:** Side panel overlays (mobile menus, settings)
- **sidebar.jsx:** Navigation sidebar with collapsible sections
- **dialog.jsx:** Modal dialog windows with backdrop
- **dropdown-menu.jsx:** Context menus and action dropdowns

#### Feedback & Status Components
- **alert.jsx:** Status messages (success, warning, error, info)
- **alert-dialog.jsx:** Confirmation dialogs with actions
- **toast.jsx & toaster.jsx:** Notification system with auto-dismiss
- **tooltip.jsx:** Contextual help and information overlays
- **skeleton.jsx:** Loading placeholders during data fetching

#### Utility Components
- **command.jsx:** Command palette for quick actions
- **toggle.jsx:** Toggle buttons for feature switching

### 📝 Resume Builder Components

#### Core Resume Building
- **BuiltInSectionEditor.jsx:** Editor for standard resume sections (experience, education, skills)
  - Form-based editing interface
  - Validation and error handling
  - Auto-save functionality
  - Rich text editing capabilities

- **CustomSectionEditor.jsx:** Editor for user-created custom sections
  - Dynamic field creation
  - Custom section templates
  - Drag-and-drop field ordering
  - Section styling options

- **CustomSectionRenderer.jsx:** Display component for custom sections
  - Dynamic rendering based on section type
  - Responsive layout adaptation
  - Print-optimized styling
  - Accessibility compliance

- **CustomSectionWizard.jsx:** Step-by-step custom section creation
  - Guided section creation process
  - Template selection and customization
  - Field type selection (text, list, date, etc.)
  - Preview and confirmation steps

#### Resume Templates
- **ResumeTemplate.jsx:** Basic resume template with standard formatting
  - Clean, professional layout
  - ATS-friendly structure
  - Print-optimized styling
  - Mobile-responsive design

- **EnhancedResumeTemplate.jsx:** Advanced template with additional features
  - Enhanced typography and spacing
  - Advanced section layouts
  - Custom styling options
  - Interactive elements for editing

#### Data Management
- **SectionManager.jsx:** Manager for resume section ordering and visibility
  - Drag-and-drop section reordering
  - Section visibility toggles
  - Section type management
  - Bulk operations on sections

- **ProfileManager.jsx:** Multiple resume profile management
  - Profile creation and deletion
  - Profile switching and comparison
  - Profile templates and cloning
  - Export/import functionality

- **ProfileCreationModal.jsx:** Modal interface for creating new profiles
  - Step-by-step profile setup
  - Template selection
  - Initial data input
  - Profile naming and organization

#### Export & Sharing
- **PDFExportDialog.jsx:** PDF export interface and configuration
  - Export settings and options
  - Preview before export
  - Multiple format support
  - Download progress tracking

### 🛠️ Utility Components

#### User Interface
- **Layout.jsx:** Main application layout wrapper
  - Header with navigation and branding
  - Responsive navigation menu
  - Footer with legal links
  - Mobile-optimized interactions

- **Logo.jsx:** PersonalBuilder logo and branding
  - Scalable logo component
  - Brand colors and styling
  - Multiple size variants
  - Text/icon combinations

- **LoadingSpinner.jsx:** Loading animation component
  - Smooth CSS animations
  - Multiple size variants
  - Accessibility compliance
  - Performance optimized

#### User Experience
- **OnboardingGuide.jsx:** User onboarding and tutorial system
  - Interactive walkthrough
  - Feature highlights
  - Progress tracking
  - Skip and resume functionality

- **HelpDialog.jsx:** Help documentation and support
  - Searchable help content
  - FAQ sections
  - Contact information
  - Feature documentation

- **KeyboardShortcuts.jsx:** Keyboard shortcut management
  - Shortcut registration and handling
  - Help overlay with shortcuts
  - Customizable key bindings
  - Accessibility support

#### System Components
- **ErrorBoundary.jsx:** React error boundary for error handling
  - Graceful error capture
  - User-friendly error messages
  - Error reporting functionality
  - Recovery mechanisms

- **ConfirmationDialog.jsx:** Generic confirmation dialogs
  - Reusable confirmation interface
  - Customizable messages and actions
  - Accessibility compliance
  - Keyboard navigation

- **StatusIndicator.jsx:** Status and progress indicators
  - Visual status representations
  - Progress bars and percentages
  - State change animations
  - Accessibility announcements

- **PreloadLink.jsx:** Performance optimization for navigation
  - Link prefetching and preloading
  - Performance monitoring
  - Resource prioritization
  - Bandwidth-aware loading

---

## Client Data & Configuration

### 📊 data/skills.js
**Purpose:** Predefined skill categories and suggestions for resume building
**Contains:**
- Technical skills database
- Skill categories and groupings
- Popular skills by industry
- Skill validation and suggestions

---

## Client Hooks

### 🪝 Custom React Hooks

#### UI/UX Hooks
- **use-lock-body-scroll.js:** Prevents body scrolling during modal interactions
  - Modal scroll prevention
  - Touch device optimization
  - Cleanup on unmount
  - Performance optimized

- **use-mobile.jsx:** Mobile device detection and responsive behavior
  - Screen size detection
  - Touch capability detection
  - Orientation change handling
  - Responsive hook triggers

#### System Hooks
- **use-toast.js:** Toast notification management and state
  - Toast creation and dismissal
  - Queue management
  - Auto-dismiss timers
  - Accessibility integration

---

## Client Libraries

### 🛠️ Utility Libraries (client/lib/)

#### Animation & Visual Effects
- **animations.js:** Animation configurations and utilities
  - GSAP animation presets
  - CSS animation helpers
  - Performance optimizations
  - Accessibility considerations

- **gsapUtils.js:** GSAP (GreenSock) animation library utilities
  - Complex animation sequences
  - Timeline management
  - Performance optimizations
  - Cross-browser compatibility

#### Navigation & Routing
- **navigation.js:** Navigation helpers and utilities
  - Route management
  - Navigation state tracking
  - Breadcrumb generation
  - History manipulation

#### Data Management
- **profileStorage.js:** Local storage management for resume profiles
  - Profile data persistence
  - Data encryption and security
  - Storage quota management
  - Backup and restore functionality

#### Performance & PWA
- **serviceWorker.js:** Progressive Web App service worker registration
  - Offline functionality
  - Caching strategies
  - Update notifications
  - Performance monitoring

- **viewport.js:** Viewport and responsive utilities
  - Viewport size detection
  - Responsive breakpoint management
  - Orientation change handling
  - Performance optimizations

#### General Utilities
- **utils.js:** General utility functions and helpers
  - String manipulation utilities
  - Date formatting functions
  - Validation helpers
  - Type checking utilities

- **utils.spec.js:** Unit tests for utility functions
  - Comprehensive test coverage
  - Edge case testing
  - Performance benchmarks
  - Cross-browser validation

---

## Client Pages

### 📄 Page Components (client/pages/)

#### Main Application Pages
- **Index.jsx:** Home/landing page with feature showcase
  - Hero section with value proposition
  - Feature highlights and benefits
  - Call-to-action buttons
  - Social proof and testimonials

- **Builder.jsx:** Main resume builder interface
  - Section-based resume editing
  - Real-time preview functionality
  - Auto-save and version control
  - Export and sharing options

- **Templates.jsx:** Resume template gallery and selection
  - Template previews and comparisons
  - Template customization options
  - Template switching functionality
  - Template recommendations

#### Information Pages
- **About.jsx:** Project information and team details
  - Project mission and vision
  - Team member profiles
  - Technology stack information
  - Company history and values

- **Contact.jsx:** Contact information and support
  - Contact form with validation
  - Multiple contact methods
  - Support information
  - Response time expectations

#### Legal Pages
- **Privacy.jsx:** Privacy Policy and data handling information
  - Data collection practices
  - User rights and controls
  - Security measures
  - Contact information for privacy concerns

- **Terms.jsx:** Terms of Service and usage agreements
  - Service usage guidelines
  - User responsibilities
  - Service limitations
  - Legal compliance information

#### Utility Pages
- **NotFound.jsx:** 404 error page with navigation help
  - User-friendly error message
  - Navigation suggestions
  - Search functionality
  - Return to home options

---

## Server Application

### 🖧 server/index.js
**Purpose:** Main Express.js server configuration and API routes
**Key Features:**
- Express server setup and middleware
- API route definitions
- Static file serving
- CORS configuration
- Error handling middleware
- Health check endpoints

**API Endpoints:**
- `GET /api/ping` - Health check and server status
- Static file serving for production builds

### 🏗️ server/node-build.js
**Purpose:** Production server build script and deployment preparation
**Key Features:**
- Production environment setup
- Build optimization
- Asset compression
- Environment variable handling

---

## Shared Resources

### 🔗 shared/api.js
**Purpose:** API interface definitions and shared types
**Contains:**
- API endpoint definitions
- Request/response type definitions
- Error handling interfaces
- Validation schemas

### 📋 shared/resume-types.js
**Purpose:** Resume data structure definitions and validation
**Contains:**
- Resume data models
- Section type definitions
- Validation rules and schemas
- Data transformation utilities

---

## Build & Deployment

### 🌐 public/ (Static Assets)
- **favicon.ico:** Website favicon for browser tabs
- **manifest.json:** PWA manifest with app metadata
- **placeholder.svg:** Placeholder image for missing assets
- **robots.txt:** Search engine crawler instructions
- **sw.js:** Service worker for offline functionality

### 🚀 netlify/functions/api.js
**Purpose:** Netlify serverless function for API endpoints
**Contains:**
- Serverless function configuration
- API route handling
- Environment variable access
- Response formatting

---

## Development Guidelines

### 🔧 Code Organization
- **Components:** Follow atomic design principles
- **Hooks:** Custom hooks for reusable logic
- **Utils:** Pure functions for data manipulation
- **Styles:** Component-based styling with TailwindCSS

### 📱 Responsive Design
- Mobile-first approach
- Breakpoint-based responsive design
- Touch-friendly interactions
- Cross-browser compatibility

### ♿ Accessibility
- WCAG 2.1 compliance
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML structure

### 🚀 Performance
- Code splitting and lazy loading
- Image optimization
- Bundle size monitoring
- Caching strategies

### 🔒 Security
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure data handling

### 🧪 Testing
- Unit tests for utilities
- Component testing
- Integration testing
- End-to-end testing

---

## Contact & Support

For technical questions or contributions:
- **Email:** kushwahaabhishek9981@gmail.com
- **Documentation:** This file and README.md
- **Issues:** Create GitHub issues for bugs and feature requests

---

*This documentation is maintained and updated with each major release.*
