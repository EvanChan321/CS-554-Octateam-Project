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

# Expose the port the backend will run on
EXPOSE 3001

# Command to run the backend
CMD ["npm", "run", "start"]
