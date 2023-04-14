# Running Matchmaking Frontend
This guide will help you set up, run, and build a Next.js app using the T3 stack. Follow the steps below to get started.

## 📦 Step 1: Install Dependencies
Install all the necessary dependencies for your project by running the following command:

```bash
yarn install
```
## 🚀 Step 2: Launch the Development Server
Start the development server by executing the following command:

```bash
yarn run dev
```

## 🌐 Step 3: Access the App in Your Browser
Open your browser and navigate to localhost:3000 to see your app in action.

## 🏗 Step 4: Build the App for Production 🐳
To create a production-ready build of your app, run the following command:

```bash
docker build -f Dockerfile.prod -t <your-image-name> .
```

## :sunglasses: Step 5: Launch the App for Production 🐳
To create a production-ready build of your app, run the following command:

```bash
docker run -p 3000:3000 -d <your-image-name>
```