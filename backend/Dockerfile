# Dockerfile

FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# If using tsconfig.json or .env
COPY tsconfig.json ./
COPY .env ./

# Start with nodemon
CMD ["npm", "run", "start:dev"]
