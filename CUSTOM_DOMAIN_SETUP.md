# 🌐 Custom Domain Setup: demo.houndr.ai

This guide will help you configure the custom domain `demo.houndr.ai` for your Houndr AI Sales Intelligence Demo on Render.

## 📋 Prerequisites

- ✅ GitHub repository deployed to Render
- ✅ Access to your domain DNS management (houndr.ai)
- ✅ Render account with the deployed static site

## 🚀 Step-by-Step Setup

### Step 1: Deploy to Render First

1. **Create Static Site on Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Static Site"
   - Connect GitHub repository: `KyaniteSolutions/Houndr_Click_Through_Demo`
   - Configure:
     - **Name:** `houndr-demo`
     - **Branch:** `main`
     - **Build Command:** `npm ci && npm run build`
     - **Publish Directory:** `build`

2. **Wait for Initial Deployment:**
   - Let Render complete the first deployment
   - Note your temporary URL: `https://houndr-demo.onrender.com`

### Step 2: Add Custom Domain in Render

1. **Navigate to Custom Domains:**
   - Go to your Render service dashboard
   - Click on "Settings" in the left sidebar
   - Scroll down to "Custom Domains" section

2. **Add Domain:**
   - Click "Add Custom Domain"
   - Enter: `demo.houndr.ai`
   - Click "Save"

3. **Get DNS Instructions:**
   - Render will provide specific DNS configuration
   - Note the CNAME target (usually: `houndr-demo.onrender.com`)

### Step 3: Configure DNS

#### Option A: Using Cloudflare (Recommended)
```
Type: CNAME
Name: demo
Target: houndr-demo.onrender.com
Proxy Status: DNS only (gray cloud)
TTL: Auto
```

#### Option B: Using Other DNS Providers
```
Type: CNAME
Name: demo
Value: houndr-demo.onrender.com
TTL: 300 seconds (5 minutes)
```

#### Option C: Using Root Domain Provider
If your DNS provider supports ALIAS/ANAME records:
```
Type: ALIAS (or ANAME)
Name: demo
Target: houndr-demo.onrender.com
TTL: 300 seconds
```

### Step 4: Verification & SSL

1. **DNS Propagation:**
   - Wait 5-60 minutes for DNS to propagate
   - Check propagation: `dig demo.houndr.ai` or use online tools

2. **SSL Certificate:**
   - Render automatically issues SSL certificates
   - This process takes 5-15 minutes after DNS verification
   - You'll see "SSL Certificate: Active" in your dashboard

3. **Test the Domain:**
   - Visit `https://demo.houndr.ai`
   - Verify SSL certificate is valid (green lock icon)

## 🔧 DNS Configuration Examples

### Cloudflare DNS
```
demo.houndr.ai    CNAME    houndr-demo.onrender.com    Auto    DNS only
```

### AWS Route 53
```
Name: demo.houndr.ai
Type: CNAME
Value: houndr-demo.onrender.com
TTL: 300
```

### Google Cloud DNS
```
DNS Name: demo.houndr.ai.
Resource Record Type: CNAME
TTL: 300
Data: houndr-demo.onrender.com.
```

### Namecheap
```
Type: CNAME Record
Host: demo
Value: houndr-demo.onrender.com
TTL: Automatic
```

## 🛠 Troubleshooting

### Common Issues

**DNS Not Resolving:**
```bash
# Check DNS propagation
dig demo.houndr.ai
nslookup demo.houndr.ai

# Expected result should show CNAME pointing to Render
```

**SSL Certificate Issues:**
- Ensure DNS is properly configured first
- Wait for full DNS propagation (up to 24 hours in rare cases)
- Contact Render support if SSL doesn't activate after 24 hours

**Mixed Content Warnings:**
- Ensure all resources use HTTPS
- Check browser console for HTTP resource loads

**404 Errors on Refresh:**
- Verify `routes` configuration in `render.yaml`
- Ensure SPA fallback is configured: `/* → /index.html`

### Verification Commands

```bash
# Check DNS resolution
dig demo.houndr.ai

# Check SSL certificate
curl -I https://demo.houndr.ai

# Test HTTP redirect to HTTPS
curl -I http://demo.houndr.ai
```

## 📊 Expected Timeline

- **DNS Configuration:** 2-5 minutes
- **DNS Propagation:** 5-60 minutes (typically 15 minutes)
- **SSL Certificate Issuance:** 5-15 minutes after DNS verification
- **Total Setup Time:** 15-90 minutes

## 🔄 Automatic Redirects

Render automatically handles:
- ✅ HTTP → HTTPS redirects
- ✅ www → non-www redirects (if configured)
- ✅ Trailing slash normalization

## 📞 Support

**If you encounter issues:**

1. **Check Render Status:**
   - Visit [status.render.com](https://status.render.com)
   - Verify no ongoing incidents

2. **DNS Tools:**
   - [DNS Checker](https://dnschecker.org)
   - [What's My DNS](https://whatsmydns.net)

3. **Contact Support:**
   - Render Support: [render.com/support](https://render.com/support)
   - Include your service name and domain details

## ✅ Final Verification Checklist

- [ ] DNS CNAME record configured correctly
- [ ] DNS propagation completed (dig command shows correct target)
- [ ] Custom domain added in Render dashboard
- [ ] SSL certificate shows as "Active" in Render
- [ ] Site loads correctly at `https://demo.houndr.ai`
- [ ] HTTP redirects to HTTPS automatically
- [ ] All pages and assets load without mixed content warnings

---

**Live Demo:** https://demo.houndr.ai

**Fallback URL:** https://houndr-demo.onrender.com

**Last Updated:** December 2024
