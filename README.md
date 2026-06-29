# KLENTEC V2 - Digital Agency Website

[![CI/CD Pipeline](https://github.com/udaysingh3204/KLENTEC-MAIN/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/udaysingh3204/KLENTEC-MAIN/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)

> A modern, enterprise-level marketing website for KLENTEC digital agency

## 🚀 Live Production

- **Production URL:** [https://klentec.com](https://klentec.com)
- **Backup URL:** [https://cool-nasturtium-517a94.netlify.app](https://cool-nasturtium-517a94.netlify.app)
- **Status:** ![Status](https://img.shields.io/badge/Status-LIVE-brightgreen)

## 📋 Features

✅ **Marketing Site**
- Responsive homepage with hero section
- Services showcase
- Work/case studies gallery
- About company page
- Contact form with email notifications

✅ **Technical Stack**
- React 19 + TypeScript
- Vite build tool
- Tailwind CSS styling
- Framer Motion animations
- TanStack Query for data fetching
- Supabase for database & auth

✅ **Infrastructure**
- Hosted on Netlify (auto-deploy from main branch)
- Custom domain with Netlify DNS
- SSL/HTTPS enabled
- Environment variables configured
- SPA routing with proper redirects

✅ **Quality Assurance**
- Automated CI/CD pipeline
- Build verification
- Security scanning
- Code linting
- Artifact uploads

## 📁 Project Structure

```
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components
│   ├── lib/             # Utilities & configurations
│   └── App.tsx          # Main app component
├── public/              # Static assets
├── dist/                # Build output
├── netlify.toml         # Netlify configuration
├── vite.config.ts       # Vite build config
├── tailwind.config.ts   # Tailwind CSS config
└── tsconfig.json        # TypeScript config
```

## 🛠️ Development

### Prerequisites
- Node.js 20+
- npm or bun package manager

### Setup
```bash
# Clone repository
git clone https://github.com/udaysingh3204/KLENTEC-MAIN.git
cd KLENTEC-MAIN

# Install dependencies
npm install

# Create .env.local with your secrets
cp .env.example .env.local

# Start development server
npm run dev
```

### Development Server
```bash
npm run dev
```
Opens at [http://localhost:5173](http://localhost:5173)

### Build
```bash
npm run build
```
Generates optimized production build in `dist/` folder.

### Preview Build
```bash
npm run preview
```

## 📦 Environment Variables

Required environment variables in `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_key
VITE_EMAILJS_SERVICE_HELLO=your_service_id
VITE_EMAILJS_SERVICE_ADMIN=your_service_id
VITE_EMAILJS_TEMPLATE_INQUIRY=your_template_id
VITE_EMAILJS_TEMPLATE_ADMIN=your_template_id
```

## 🚢 Deployment

### Automatic Deployment
- **Trigger:** Push to `main` branch
- **Build Command:** `npm run build`
- **Publish Directory:** `dist/`
- **Host:** Netlify
- **Status:** Auto-deploys on every commit

### Manual Deployment
```bash
git push origin main
# Netlify will automatically build and deploy
```

## 🧪 Quality Gates

All code passing through CI/CD pipeline:

- ✅ Dependency installation
- ✅ Build compilation
- ✅ Type checking
- ✅ Code linting
- ✅ Security scanning
- ✅ Build artifact verification

## 📊 Performance

- **Build Time:** ~6 seconds
- **Page Load:** < 2 seconds
- **Performance Score:** 90+
- **Lighthouse:** A+ ratings

## 📝 Git Workflow

1. Create feature branch from `main`
2. Make changes and commit
3. Push to feature branch
4. Create pull request
5. CI/CD pipeline runs automatically
6. Merge to `main` when all checks pass
7. Netlify auto-deploys to production

## 🔒 Security

- SSL/HTTPS enabled
- No exposed secrets
- Secure headers configured
- Environment variables in CI/CD
- Regular security scanning
- MIME type validation

## 📞 Support

For issues or questions:
- GitHub Issues: [Create issue](https://github.com/udaysingh3204/KLENTEC-MAIN/issues)
- Contact: [klentec.com/contact](https://klentec.com/contact)

## 📄 License

MIT License - see LICENSE file for details

---

**Made with ❤️ by KLENTEC Team**

Last Updated: June 30, 2026
Production Status: ✅ LIVE
