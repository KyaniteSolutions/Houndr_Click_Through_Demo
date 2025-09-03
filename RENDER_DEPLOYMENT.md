# Houndr Demo - Render Deployment Guide

This guide will help you deploy the Houndr AI Sales Intelligence Demo to Render.

## 🚀 Quick Deploy to Render

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" → "Static Site"
   - Connect your forked repository

3. **Configure the deployment:**
   - **Name:** `houndr-demo` (or your preferred name)
   - **Branch:** `main`
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `build`

4. **Deploy:** Click "Create Static Site"

### Option 2: Using render.yaml (Infrastructure as Code)

The repository includes a `render.yaml` file for automated deployment:

1. **Push to GitHub:** Ensure your code is in a GitHub repository
2. **Connect to Render:** Link your GitHub account to Render
3. **Create Blueprint:** In Render dashboard, go to "Blueprints" → "New Blueprint"
4. **Select Repository:** Choose your repository with the `render.yaml` file
5. **Deploy:** Render will automatically configure and deploy based on the YAML file

## 📋 Deployment Configuration

### Environment Variables (Optional)
```bash
NODE_ENV=production
GENERATE_SOURCEMAP=false
VITE_APP_TITLE=Houndr AI Demo
VITE_DEMO_MODE=true
```

### Build Settings
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `build`
- **Node Version:** 18.x (default)

## 🔧 Pre-Deployment Checklist

- [ ] Repository is pushed to GitHub
- [ ] All dependencies are listed in `package.json`
- [ ] Build command works locally (`npm run build`)
- [ ] No sensitive data in environment variables
- [ ] Static assets are properly referenced

## 🌐 Post-Deployment

### Custom Domain Setup (demo.houndr.ai)
1. **In Render Dashboard:**
   - Go to your service dashboard
   - Navigate to "Settings" → "Custom Domains"
   - Add `demo.houndr.ai`
   - Render will provide DNS instructions

2. **DNS Configuration:**
   - Add a CNAME record in your DNS provider:
   - **Type:** CNAME
   - **Name:** demo
   - **Value:** [provided by Render, typically: your-app-name.onrender.com]
   - **TTL:** 300 (or default)

3. **Verification:**
   - DNS propagation can take 5-60 minutes
   - Render will automatically verify and issue SSL certificate

### SSL Certificate
- Render automatically provides SSL certificates for custom domains
- Your site will be available at `https://demo.houndr.ai`
- Fallback URL: `https://houndr-demo.onrender.com`

## 🛠 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check build locally first
npm ci
npm run build

# If successful locally, check Render build logs
```

**404 on Refresh:**
- Ensure `routes` configuration in `render.yaml` includes SPA fallback
- Current config redirects all routes to `/index.html`

**Slow Build Times:**
- Render free tier has limited resources
- Consider upgrading to paid tier for faster builds

**Environment Variables Not Working:**
- Vite requires `VITE_` prefix for client-side variables
- Server-side variables don't need the prefix

### Build Optimization

The deployment includes several optimizations:
- **Code Splitting:** Vendor, UI, and icon chunks
- **Minification:** Enabled for production
- **Source Maps:** Disabled for smaller bundle size
- **Chunk Size Warnings:** Set to 1000kb limit

## 📊 Performance

Expected build metrics:
- **Build Time:** 2-4 minutes (free tier)
- **Bundle Size:** ~2-3 MB (gzipped)
- **Load Time:** <3 seconds (first visit)

## 🔄 Continuous Deployment

Render automatically redeploys when you push to the connected branch:

1. **Make changes** to your code
2. **Commit and push** to GitHub
3. **Render automatically builds** and deploys
4. **Live in ~3-5 minutes**

## 📞 Support

If you encounter issues:
1. Check Render build logs in the dashboard
2. Verify the build works locally
3. Review this deployment guide
4. Contact Render support for platform-specific issues

## 🎯 Demo Features

The deployed demo includes:
- **AI Sales Intelligence Dashboard**
- **Real-time Agent Activity**
- **Interactive Prospect Management**
- **Campaign Builder**
- **Market Research Tools**
- **Workflow Automation**

---

**Live Demo:** Your app will be available at `https://your-app-name.onrender.com`

**Repository:** [GitHub Repository Link]

**Last Updated:** December 2024
