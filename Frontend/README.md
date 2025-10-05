Description
This is a full stack Todo application built with the MERN stack: MongoDB, Express.js, React, and Node.js. It allows users to sign up, log in, and manage their todo tasks including adding, updating, deleting, and viewing tasks. User authentication is implemented using JWT secured with environment variables for enhanced security.

Features
User signup and login with JWT authentication

Create, view, update, and delete tasks

Delete multiple tasks at once

Secure API routes protected with JWT middleware

Environment variables to store secrets like MongoDB URL and JWT secret

CORS configured to allow frontend-backend communication

Cookie-based token storage with HTTP-only and secure flags

Tech Stack
Frontend: React, React Router, Tailwind CSS

Backend: Node.js, Express.js, MongoDB (native driver), JWT, dotenv

Tools: nodemon for backend development, Git for version control.

Project Structre

TodoFullStack/
│
├── Backend/
│   ├── index.js                  # Express server and API routes
│   ├── dbconfig.js               # MongoDB connection setup
│   ├── .env                      # Environment variables (not committed)
│   ├── package.json
│   └── node_modules/
│
├── Frontend/
│   ├── src/
│   │   ├── components/           # React components (AddTask, List, Login, SignUp, etc.)
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── node_modules/
│
├── .gitignore                    # To ignore node_modules, env files, build folders
└── README.md


Setup Instructions

Backend

1. Navigate to the backend folder: 
cd Backend

2. install dependencies  : 
 npm install

3. Create a .env file in the Backend folder and add : 
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
DB_NAME=node-project

4. Start the backend server : 
nodemon index.js


Frontend

1. Navigate to the frontend folder:
cd Frontend

2. Install dependencies:
npm install

3.Start the frontend server:
npm run dev


Important Notes
Make sure to keep th .env file secure and never commit it to version control.

Change the JWT secret and MongoDB connection string to your own credentials.

Update FRONTEND_URL accordingly for deployment.

Use nodemon for automatic backend restarts during development.

License
This project is open-source and available under the MIT License.

Made and created by Chaitanya.