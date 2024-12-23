# User Registration and Authentication API

This is a **Node.js RESTful API** for user management, including registration, login, profile management, and authentication using **JWT (JSON Web Token)**. The project uses **MongoDB** as the database and follows a modular structure with **Mongoose**.

---

## Features

- **User Registration**: Register new users with details such as name, NID number, phone number, password, and blood group.
- **User Login**: Authenticate users with JWT tokens and cookies.
- **Authentication**: Protect routes using JWT middleware.
- **Profile Management**:
    - Retrieve single user profiles.
    - Update user profiles.
    - Delete user accounts.
- **Fetch All Users**: Retrieve a list of all registered users (requires authentication).
- **Secure Passwords**: Passwords are hashed using `bcryptjs`.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Error Handling](#error-handling)
8. [License](#license)

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM library for MongoDB.
- **JWT (jsonwebtoken)**: Secure authentication using tokens.
- **bcryptjs**: Hashing and comparing passwords.
- **dotenv**: Manage environment variables.
- **cookie-parser**: Parse cookies for token management.

---

## Project Structure

```
user-registration-backend/
├── app/
│   ├── config/
│   │   └── db.js                # MongoDB connection setup
│   ├── controllers/
│   │   └── userController.js    # User-related controllers
│   ├── middlewares/
│   │   └── authMiddleware.js    # JWT authentication middleware
│   ├── models/
│   │   └── user.js              # Mongoose User schema
├── routes/
│   └── userRoutes.js            # User-related routes
├── .env                         # Environment variables
├── .gitignore                   # Ignore node_modules and sensitive files
├── package.json                 # Project dependencies
└── server.js                    # Entry point of the app
```

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MongoDB**:
    - Install MongoDB locally or use MongoDB Atlas.
    - Copy your MongoDB connection string.

4. **Create `.env` File**:
   Add environment variables to configure the app (see below).

5. **Start the Server**:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`.

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

---

## API Endpoints

| **Method** | **Endpoint**            | **Description**                   | **Protected** |
|------------|-------------------------|-----------------------------------|---------------|
| `POST`     | `/api/users/register`   | Register a new user               | No            |
| `POST`     | `/api/users/login`      | Login and get a JWT token         | No            |
| `GET`      | `/api/users/profile/:id`| Get user profile by ID            | Yes           |
| `PUT`      | `/api/users/profile/:id`| Update user profile by ID         | Yes           |
| `DELETE`   | `/api/users/delete`     | Delete the authenticated user     | Yes           |
| `GET`      | `/api/users/getAllUsers`| Retrieve all users                | Yes           |

---

## Usage

1. **Register a User**:
    - Endpoint: `POST /api/users/register`
    - Body:
      ```json
      {
        "firstName": "John",
        "lastName": "Doe",
        "NIDNumber": "123456789",
        "phoneNumber": "1234567890",
        "password": "password123",
        "bloodGroup": "A+"
      }
      ```

2. **Login User**:
    - Endpoint: `POST /api/users/login`
    - Body:
      ```json
      {
        "NIDNumber": "123456789",
        "password": "password123"
      }
      ```

    - Response:
      ```json
      {
        "message": "Login successfully",
        "token": "your-jwt-token"
      }
      ```

3. **Access Protected Routes**:
    - Add this header to authenticated requests:
      ```
      Authorization: Bearer <your-jwt-token>
      ```

4. **Fetch All Users**:
    - Endpoint: `GET /api/users/getAllUsers`
    - Requires a valid token.

---

## Error Handling

- **401 Unauthorized**: Returned when authentication fails.
- **404 Not Found**: Returned when a user or resource is not found.
- **500 Internal Server Error**: Generic error for server issues.

Example Error Response:
```json
{
  "message": "Please use a valid login token or log in again."
}
```


## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author

👤 **Shohrab Hossain**
- GitHub: [@enegsiam](https://github.com/engsiam)

---
