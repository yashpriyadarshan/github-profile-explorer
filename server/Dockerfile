# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the server files
COPY . .

# Expose port 5000 (the port on which our server.js listens)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
