#!/bin/bash

# Render build script for Houndr Demo
echo "🚀 Starting Render build process..."

# Set Node.js version (Render uses Node 18 by default)
echo "📦 Node.js version:"
node --version
npm --version

# Clean any existing builds
echo "🧹 Cleaning previous builds..."
rm -rf build/
rm -rf node_modules/.cache/

# Install dependencies with clean cache
echo "📥 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Build the application
echo "🔨 Building application..."
npm run build

# Verify build output
echo "✅ Build verification..."
if [ -d "build" ]; then
    echo "✅ Build directory created successfully"
    ls -la build/
    
    # Check if index.html exists
    if [ -f "build/index.html" ]; then
        echo "✅ index.html found"
    else
        echo "❌ index.html not found in build directory"
        exit 1
    fi
    
    # Check build size
    BUILD_SIZE=$(du -sh build/ | cut -f1)
    echo "📊 Build size: $BUILD_SIZE"
    
else
    echo "❌ Build directory not found"
    exit 1
fi

echo "🎉 Render build completed successfully!"
