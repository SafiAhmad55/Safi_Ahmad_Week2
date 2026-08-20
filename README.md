# Safi Ahmad - Full-Stack Web Development

## Project Description

A full-stack authentication and user access system built using React,
Node.js, Express.js, MongoDB Atlas, Mongoose, bcrypt, and JWT.

The project builds on the Week 1 registration system and adds secure
user login, JWT authentication, protected routes, role-based access
control, Admin and Employee roles, and logout functionality.

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose
- bcrypt
- CORS
- dotenv

### Database
- MongoDB Atlas

### API Testing
- Postman

## Project Structure

```text
Safi_Ahmad_Week2/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   └── ...
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── ...
│
├── Safi_Ahmad_Week2.postman_collection.json
├── .gitignore
├── package.json
└── README.md

# Week 1-User registration

## Features Implemented

-User registration using a React frontend
- Frontend form validation
- Required-field validation
- Username validation
- Password length validation
- Confirm password matching
- Registration API using Node.js and Express.js
- MongoDB Atlas database integration
- Mongoose User model
- Duplicate username checking
- Password hashing using bcrypt
- Secure storage of hashed passwords
- RESTful API implementation
- CORS configuration
- Environment variables using dotenv
- API testing using Postman
- Registered users successfully stored in MongoDB Atlas

## Registration Flow

1. User enters registration information in the React frontend.
2. Frontend validates the submitted information.
3. Registration data is sent to the Express backend.
4. Backend validates the required fields.
5. Backend checks whether the username already exists.
6. Password is hashed using bcrypt.
7. The new user is stored in MongoDB Atlas using Mongoose.
8. A successful registration response is returned to the frontend.

# Week 2 - Authentication & User Access

## Features Implemented

- User Login
- JWT Authentication
- Protected API Routes
- Role-Based Access Control (RBAC)
- Admin and Employee roles
- Admin-only API route
- Login and Registration interface
- Logout functionality
- JWT stored in browser Local Storage
- Password verification using bcrypt
- Authentication error handling

### Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Backend verifies the password using bcrypt.
4. Backend generates a JWT token.
5. JWT contains the user's ID and role.
6. Token is returned to the React frontend.
7. Frontend stores the token in Local Storage.
8. Protected routes verify the JWT before allowing access.
9. Admin routes additionally verify the user's role.

### API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/auth/profile` | Access protected profile | Authenticated |
| GET | `/api/auth/admin` | Access Admin-only route | Admin |

### User Roles

#### Employee

- Default role for newly registered users
- Can access authenticated routes
- Cannot access Admin-only routes

#### Admin

- Can access authenticated routes
- Can access Admin-only routes

### Authentication Middleware

The application uses JWT middleware to:

- Verify the JWT token
- Reject missing tokens
- Reject invalid tokens
- Reject expired tokens
- Attach authenticated user information to the request

### Role-Based Access Control

Admin middleware checks the authenticated user's role.

### Error Handling

The application handles the following authentication errors:

- Missing email or password
- Invalid email
- Incorrect password
- Missing JWT token
- Invalid JWT token
- Expired JWT token
- Unauthorized Employee access to Admin-only routes

## Postman API Testing

The Postman collection is included in the repository and is used to test
the authentication APIs.

The collection includes:

- Register User
- Login User
- Protected Profile Route
- Admin-only Route
- Invalid email
- Incorrect password
- Missing token
- Invalid token
- Expired token
- Unauthorized role access

```text
Admin → Admin route → Access granted
Employee → Admin route → Access denied