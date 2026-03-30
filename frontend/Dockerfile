FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# Use --legacy-peer-deps to handle NextAuth/Next.js 14 version mismatch
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
