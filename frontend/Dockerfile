# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port 4173 (default port for `vite preview`)
EXPOSE 4173

# Serve the app using Vite's preview command
CMD ["npm", "run", "preview"]
