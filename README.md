FrontEnd : 
# Budget Tracker/Finance Manager App

A full-stack MERN application that allows users to manage financial transactions with an admin approval workflow.

## Tech Stack
**Frontend:** React, React Router, Context API  
**Backend:** Node, Express, MongoDB  
**Auth:** JWT, bcrypt  

## Features
- Authentication (Register/Login)
- Role based access (User/Admin)
- Full CRUD on transactions
- Admin approval dashboard
- Error handling middleware

## Approvals API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| GET    | `/api/approvals` | Get all approvals (for the logged-in user) | Yes |
| GET    | `/api/approvals/pending` | Get all pending approvals (admin only) | Yes |
| PUT    | `/api/approvals/:id/approve` | Approve a transaction by ID | Yes |
| PUT    | `/api/approvals/:id/reject` | Reject a transaction by ID | Yes |

## Transactions API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| POST   | `/api/transactions` | Create a new transaction | Yes |
| GET    | `/api/transactions` | Get all user transactions | Yes |
| GET    | `/api/transactions/:id` | Get one transaction by ID | Yes |
| PUT    | `/api/transactions/:id` | Update a transaction | Yes |
| DELETE | `/api/transactions/:id` | Delete a transaction | Yes |

## Users / Authentication API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| POST   | `/api/users/register` | Register a new user | No |
| POST   | `/api/users/login` | Login user | No |
| GET    | `/api/users/me` | Get logged-in user details | Yes |
| PUT    | `/api/users/me` | Update logged-in user info | Yes | 


[## Installation & Setup
```bash
git clone <repo>
cd project
npm install
npm run dev]

