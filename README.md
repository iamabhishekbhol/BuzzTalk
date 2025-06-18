# 📡 BuzzTalk Backend

BuzzTalk is a real-time, bi-directional messaging app built with the MERN stack and Socket.IO.  
This folder contains the **Express + MongoDB** backend API.

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **MongoDB Atlas** + **Mongoose**
- **JWT Authentication**
- **bcryptjs** for password hashing
- **dotenv** for environment management
- **cors** to allow frontend requests

---

## 📁 Project Structure

```
/server
│
├── config/        # DB connection setup
├── controllers/   # Route handler functions
├── middleware/    # Auth middlewares (JWT)
├── models/        # Mongoose models
├── routes/        # Express route files
├── sockets/       # Socket.IO handlers (later)
├── .env           # Environment variables
├── server.js      # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/buzztalk?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

> Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

### 3. Run the server

```bash
node server.js
```

You should see:

```
MongoDB Connected: ...
Server running on port 5000
```

---

## ✅ Features Implemented

- [x] MongoDB Atlas connection
- [x] Express server with basic `/api/health` route
- [x] `.env` config support
- [x] User Model with:
  - Name, email, password (hashed), isOnline
  - Pre-save password hashing
  - Custom `matchPassword()` method
- [x] Register and Login routes with JWT token response
- [x] JWT authentication middleware (`protect`)
- [x] Get all users route (`GET /api/users`)
- [x] Send message (`POST /api/messages`)
- [x] Fetch messages (`GET /api/messages/:userId`)

---

## 🔐 Authentication API

### 🔸 POST `/api/auth/register`

Registers a new user. Returns user info and a JWT token.

**Request Body:**

```json
{
  "name": "Abhishek",
  "email": "abhi@example.com",
  "password": "secret123"
}
```

**Success Response:**

```json
{
  "_id": "userId",
  "name": "Abhishek",
  "email": "abhi@example.com",
  "token": "JWT_TOKEN"
}
```

---

### 🔸 POST `/api/auth/login`

Logs in an existing user.

**Request Body:**

```json
{
  "email": "abhi@example.com",
  "password": "secret123"
}
```

**Success Response:**

```json
{
  "_id": "userId",
  "name": "Abhishek",
  "email": "abhi@example.com",
  "token": "JWT_TOKEN"
}
```

**Error Responses:**

- 400: Missing fields or user already exists
- 401: Invalid credentials

---

## 👥 User API

### 🔸 GET `/api/users`

Fetches all registered users **except the logged-in user**.  
Requires authentication via JWT.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response:**

```json
[
  {
    "_id": "userId1",
    "name": "Trishy",
    "email": "trishy@example.com",
    "isOnline": false
  },
  {
    "_id": "userId2",
    "name": "Rahul",
    "email": "rahul@example.com",
    "isOnline": true
  }
]
```

**Error Responses:**

- 401: Missing or invalid token

---

## 💬 Message API

### 🔸 POST `/api/messages`

Send a new message from the logged-in user to another user.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**

```json
{
  "receiverId": "USER_ID_OF_RECEIVER",
  "content": "Hey there!"
}
```

**Success Response:**

```json
{
  "_id": "messageId",
  "sender": "loggedInUserId",
  "receiver": "USER_ID_OF_RECEIVER",
  "content": "Hey there!",
  "seen": false,
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}
```

---

### 🔸 GET `/api/messages/:userId`

Fetches all messages between the logged-in user and another user.

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response:**

```json
[
  {
    "_id": "msgId",
    "sender": {
      "_id": "senderId",
      "name": "Abhishek",
      "email": "abhi@example.com"
    },
    "receiver": {
      "_id": "receiverId",
      "name": "Trishy",
      "email": "trishy@example.com"
    },
    "content": "Hello!",
    "seen": false,
    "createdAt": "..."
  }
]
```

---

## 🛡️ Auth Middleware

The `protect` middleware verifies the JWT token and attaches the authenticated user's data to `req.user`.  
Used to protect private routes like `/api/users`, `/api/messages`.

```js
const { protect } = require('../middleware/authMiddleware')

router.get('/users', protect, getUsers)
```

---

## 🔜 Upcoming Features

- [ ] Real-time messaging with Socket.IO
- [ ] User online/offline status
- [ ] Chat history indicators
- [ ] Frontend React integration

---

## 🧠 Dev Tips

- Use [MongoDB Compass](https://www.mongodb.com/try/download/compass) to view local/Atlas documents
- Keep your `.env` out of GitHub (`.gitignore` included)
- Restart server on `.env` or config changes

---

Made with 💬 by Abhishek (BuzzTalk)
