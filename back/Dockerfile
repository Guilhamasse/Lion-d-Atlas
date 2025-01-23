# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if exists) into the container
COPY package*.json ./

# Step 4: Install the dependencies (including node_modules)
RUN npm install --production

# Step 5: Copy the rest of your application files into the container
COPY . .

# Step 6: Expose the port your app will run on
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
