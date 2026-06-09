#!/bin/bash

echo "🔍 KLENTEC V2 — Verification Checklist"
echo "======================================"
echo ""

# Check Node/npm
echo "✓ Node/npm installed:"
node --version
npm --version
echo ""

# Check if dev server is running
echo "✓ Dev server status:"
if lsof -i :8083 > /dev/null 2>&1; then
  echo "  ✅ Running on http://localhost:8083"
else
  echo "  ⚠️  Not running. Run: npm run dev"
fi
echo ""

# Check critical files
echo "✓ Critical files present:"
files=(
  "SUPABASE_SETUP.sql"
  "SUPABASE_SAMPLE_DATA.sql"
  "FINAL_DEPLOYMENT_GUIDE.md"
  "README_FINAL_STATUS.md"
  ".env.local"
  "src/contexts/AuthContext.tsx"
  "src/pages/client/ClientDashboard.tsx"
  "src/pages/admin/AdminLayout.tsx"
  "src/pages/admin/AdminDeliverablesPage.tsx"
  "src/components/home/MetricsSection.tsx"
  "src/components/home/LogoMarquee.tsx"
  "src/components/home/GrowthAuditSection.tsx"
  "src/pages/WorkPage.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done
echo ""

# Check environment variables
echo "✓ Environment variables (.env.local):"
if grep -q "VITE_SUPABASE_URL" .env.local; then
  echo "  ✅ VITE_SUPABASE_URL configured"
else
  echo "  ❌ VITE_SUPABASE_URL missing"
fi

if grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
  echo "  ✅ VITE_SUPABASE_ANON_KEY configured"
else
  echo "  ❌ VITE_SUPABASE_ANON_KEY missing"
fi

if grep -q "VITE_EMAILJS" .env.local; then
  echo "  ✅ EmailJS variables configured"
else
  echo "  ⚠️  EmailJS not configured (optional)"
fi
echo ""

# Check build status
echo "✓ Build status:"
if npm run build > /dev/null 2>&1; then
  echo "  ✅ Production build succeeds"
  echo "  📦 Output: dist/ folder created"
else
  echo "  ❌ Build failed. Run: npm run build"
fi
echo ""

# Summary
echo "======================================"
echo "📋 Next Steps:"
echo "======================================"
echo "1. ✅ Run SUPABASE_SETUP.sql in Supabase SQL Editor"
echo "2. ✅ Test signup at http://localhost:8083/login"
echo "3. ✅ Deploy with: vercel --prod"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - README_FINAL_STATUS.md"
echo "   - FINAL_DEPLOYMENT_GUIDE.md"
echo ""
