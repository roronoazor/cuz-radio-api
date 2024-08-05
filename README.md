# CuzRadio Inventory API

This project is a NestJS-based API for a simple inventory platform with role-based access control. It includes functionality for admin, primary, and secondary users to manage items in their respective stores.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **Node.js**: The runtime environment for executing JavaScript code server-side.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

SQLite was chosen as the database because it's a file-based database that doesn't require installation of additional dependencies. This means that with just Node.js and npm, you can run this application without setting up a separate database server.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/roronoazor/cuz-radio-api.git
   cd cuz-radio-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables:

   - Copy the `.env.example` file to `.env`
   - Update the `.env` file with your JWT secret and other necessary configurations
   - For convenience my local `.env` has been pushed to this repo for your use

4. Set up the database:
   ```
   npx prisma migrate dev
   ```
   This will create the SQLite database file and run the migrations.

## Running the Application

To run the application in development mode:

```
npm run start:dev
```

The API will be available at `http://localhost:8000` by default.

## API Documentation

### Authentication Endpoints

- `POST /auth/signup` - Create a new user account
  - During signup, users can select their role: ADMIN, PRIMARY, or SECONDARY
- `POST /auth/login` - Login and receive a JWT token

### Access Rules

- **Admin users** can access all routes (admin_store, primary_store, secondary_store)
- **Primary users** can only access primary_store routes
- **Secondary users** can only access secondary_store routes

### Admin Store Endpoints

- `POST /admin_store/items` - Create a new item
- `GET /admin_store/items` - Get all items (paginated)
- `GET /admin_store/items/:id` - Get a specific item
- `PUT /admin_store/items/:id` - Update an item
- `DELETE /admin_store/items/:id` - Delete an item

### Primary Store Endpoints

- `POST /primary_store/items` - Create a new item
- `GET /primary_store/items` - Get all items (paginated)
- `GET /primary_store/items/:id` - Get a specific item
- `PUT /primary_store/items/:id` - Update an item
- `DELETE /primary_store/items/:id` - Delete an item

### Secondary Store Endpoints

- `POST /secondary_store/items` - Create a new item
- `GET /secondary_store/items` - Get all items (paginated)
- `GET /secondary_store/items/:id` - Get a specific item
- `PUT /secondary_store/items/:id` - Update an item
- `DELETE /secondary_store/items/:id` - Delete an item

## User Roles and Access

When signing up, users can choose their role:

1. **ADMIN**: Has full access to all routes and can perform any operation.
2. **PRIMARY**: Can only access and perform operations on the primary_store routes.
3. **SECONDARY**: Can only access and perform operations on the secondary_store routes.

The role chosen during signup determines which API endpoints the user can access and use. This role-based access control ensures that users only interact with the parts of the system they're authorized to use.

## Contact

Name - ugoodumegwu@gmail.com

Project Link: [https://github.com/roronoazor/cuz-radio-api.git](https://github.com/roronoazor/cuz-radio-api.git)
