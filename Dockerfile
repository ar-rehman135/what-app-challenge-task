# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

ENV PORT=7035

# Expose the application port
EXPOSE 7035

# Command to run your application
CMD ["npm", "run", "start", "--", "-p", "7035"]
