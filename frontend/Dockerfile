FROM node:18-alpine
WORKDIR /app
# Explicitly copy from the current directory (which is ./frontend)
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
