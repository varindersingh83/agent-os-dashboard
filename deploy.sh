#!/bin/bash
set -e

echo "🚀 Booting Agent OS Stack..."

# 1. Setup Environment
if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Copying .env.example..."
  cp .env.example .env
fi

# 2. Database Migrations
echo "📦 Running Prisma Migrations (PostgreSQL)..."
cd frontend
npm install
npx prisma generate
npx prisma migrate dev --name init
cd ..

# 3. Frontend Build
echo "⚛️  Building Next.js Frontend..."
cd frontend
npm run build
# (Optional: Start PM2 or background process)
# nohup npm run start > frontend.log 2>&1 &
cd ..

# 4. Backend Setup
echo "🐍 Starting FastAPI Backend (Intelligence Engine)..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# (Optional: Start with Uvicorn)
# nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
cd ..

echo "✅ Deployment Successful! Access the Dashboard on port 3000 and the API on port 8000."
