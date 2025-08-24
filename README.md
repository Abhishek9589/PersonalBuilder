# 🎯 PersonalBuilder — Professional Resume Builder

PersonalBuilder is a **modern, ATS-friendly resume builder** that helps users create professional resumes that pass applicant tracking systems. Built with **React + Tailwind CSS + Vite** on the frontend and **Node.js + Express** on the backend, PersonalBuilder delivers a sleek, responsive, and user-friendly experience.

---

## 📌 Table of Contents
1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Installation & Setup](#-installation--setup)
5. [Project Structure](#-project-structure)
6. [Usage Guide](#-usage-guide)
7. [Deployment](#-deployment)
8. [Contributing](#-contributing)
9. [License](#-license)

---

## 📖 Overview
PersonalBuilder empowers job seekers to create **professional, ATS-optimized resumes** without the complexity of traditional resume builders. Whether you're a student, professional, or career changer, PersonalBuilder helps you craft the perfect resume that passes through applicant tracking systems and impresses hiring managers.

---

## ✨ Features

### 🎨 Resume Building Features
- **ATS-Friendly Templates** - Optimized for applicant tracking systems
- **Real-time Preview** - See your resume as you build it
- **Drag & Drop Reordering** - Customize section order easily
- **PDF Export** - Download professional PDFs instantly
- **Auto-save** - Never lose your progress
- **Multiple Profiles** - Create resumes for different career paths

### 📱 User Experience
- **No Login Required** - Start building immediately
- **Mobile Responsive** - Build resumes on any device
- **Privacy Focused** - Your data stays in your browser (see Privacy Policy)
- **Free Forever** - No hidden fees or subscriptions
- **Legal Compliance** - Comprehensive Privacy Policy and Terms of Service

### 🛠 Technical Features
- **One-Page Layout** - Focused, professional format
- **Custom Sections** - Add personalized content blocks
- **Smart Suggestions** - Built-in resume improvement tips
- **Cross-browser Compatible** - Works everywhere

---

## 🖥 Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Vite
- Radix UI components
- React Router (SPA mode)

**Backend**
- Node.js
- Express.js

**Other Tools**
- Netlify (Deployment)
- React-to-Print (PDF generation)
- Context API for state management
- TypeScript support

---

## ⚙ Installation & Setup

> **Prerequisites:**  
> - Node.js ≥ 16  
> - npm or yarn

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/personalbuilder.git
cd personalbuilder

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the development server
npm run dev

# 4️⃣ Open your browser
# Visit http://localhost:8080
```

---

## 📂 Project Structure

```
PersonalBuilder/
│
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, inputs, etc.)
│   │   └── ...            # Feature-specific components
│   ├── pages/             # Page-level components
│   │   ├── Index.jsx      # Home page
│   │   ├── Builder.jsx    # Resume builder
│   │   ├── About.jsx      # About page
│   │   ├── Templates.jsx  # Templates showcase
│   │   ├── Contact.jsx    # Contact page
│   │   ├── Privacy.jsx    # Privacy Policy
│   │   ├── Terms.jsx      # Terms of Service
│   │   └── NotFound.jsx   # 404 page
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── contexts/          # Context API providers
│   ├── data/              # Static data and configurations
│   ├── global.css         # Global styles and Tailwind config
│   └── App.jsx            # App entry point with routing
│
├── server/                # Node.js backend
│   ├── routes/            # API route handlers
│   └── index.js           # Main server file
│
├── shared/                # Shared types and utilities
├── public/                # Static assets
├── package.json           # Dependencies & scripts
├── netlify.toml           # Netlify deployment config
└── tailwind.config.js     # Tailwind CSS configuration
```

---

## 🚀 Usage Guide

### For Job Seekers
1. **Visit PersonalBuilder** in your browser
2. **Fill in your information** step by step:
   - Personal details
   - Professional summary
   - Work experience
   - Education
   - Skills and certifications
3. **Preview your resume** in real-time
4. **Download as PDF** when ready
5. **Create multiple profiles** for different career paths

### Key Features to Explore
- **Drag sections** to reorder them
- **Toggle section visibility** to customize your resume
- **Add custom sections** for unique content
- **Use the preview mode** to see the final result
- **Export to PDF** with professional formatting

---

## 🌐 Deployment

**Frontend (Netlify)**
```bash
npm run build
# Deploy the /dist folder to Netlify
# Or connect your GitHub repo for automatic deployments
```

**Backend**
- Deploy on services like Render, Railway, or Heroku
- Update API base URLs if needed

**One-Click Deploy**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/personalbuilder)

---

## 🤝 Contributing
We welcome contributions to make PersonalBuilder even better!  

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

---

## 📄 License
This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments
- Built with love for job seekers everywhere
- Inspired by the need for truly ATS-friendly resumes
- Thanks to all contributors and users

---

## 📧 Support
For questions, bug reports, or feature requests:
- Create an issue on GitHub
- Email: kushwahaabhishek9981@gmail.com

**Happy resume building! 🚀**
