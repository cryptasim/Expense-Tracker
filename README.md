<div align="center">
  <h1>💰 ExpenseTracker</h1>
  <p><strong>Take control of your finances with smart expense tracking</strong></p>

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://expensetracker-ctan.onrender.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-blue.svg)](https://github.com/cryptasim/Expense-Tracker)

</div>

## Overview

ExpenseTracker is a modern web application that helps you manage your personal finances with ease. Track expenses, visualize spending patterns, and make informed financial decisions.

## Key Features

🔐 **Secure Authentication**

- JWT-based user authentication
- Protected routes and API endpoints
- Secure password hashing

📊 **Smart Dashboard**

- Real-time expense tracking
- Interactive charts and graphs
- Category-wise expense breakdown
- Monthly spending analysis

💡 **Intuitive Design**

- Clean, modern interface
- Mobile-responsive layout
- Dark/light mode support
- Seamless user experience

## Tech Stack

**Frontend:**

- React 18
- TailwindCSS
- React Router 6
- Recharts
- Axios

**Backend:**

- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Cookie-based sessions

## Quick Start

1. **Clone & Install**

```bash
git clone https://github.com/asimkumarhansda/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install   # Install server dependencies
cd client && npm install   # Install client dependencies
```

2. **Environment Setup**

```bash
# /server/.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development

# /client/.env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Run Application**

```bash
# Start server (from root directory)
npm run dev

# Start client (from client directory)
npm start
```

## API Routes

### Auth Endpoints

```http
POST /api/auth/register - Create new account
POST /api/auth/login    - User login
POST /api/auth/logout   - User logout
GET  /api/auth/me       - Get user profile
```

### Expense Endpoints

```http
GET    /api/expenses     - Get all expenses
POST   /api/expenses     - Create expense
PUT    /api/expenses/:id - Update expense
DELETE /api/expenses/:id - Delete expense
```

## Project Structure

```
expense-tracker/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── context/     # React context
│   │   ├── pages/       # Page components
│   │   └── utils/       # Helper functions
│   └── public/           # Static assets
└── server/               # Express backend
    ├── middleware/      # Custom middleware
    ├── models/         # Database models
    └── routes/         # API routes
```

## Screenshots

<div align="center">
  <img src="./client/public/Screenshot 2025-05-27 at 4.03.43 AM.png" alt="Dashboard" width="100%">
</div>

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Connect

- Author: Asim Kumar Hansda
- Email: asimkumarhansda@mail.com
- LinkedIn: [@asimkumarhansda](https://linkedin.com/in/asimkumarhansda)

## License

This project is Open Source.
