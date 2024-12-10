# Use Node.js LTS image as the base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose the port for the frontend
EXPOSE 3000

# Serve the built application
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
