#!/bin/bash
set -e

echo "Building backend..."
cd backend
npm install
npx prisma generate
npm run build

echo "Build completed!"
