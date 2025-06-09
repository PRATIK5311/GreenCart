# GreenCart

> **Live Project**: [https://greencart-frontend-kohl.vercel.app](https://greencart-frontend-kohl.vercel.app)

GreenCart is a modern e-commerce platform for organic and eco-friendly grocery shopping. Built with the **MERN stack (MongoDB, Express.js, React, Node.js)**, it delivers a smooth, secure, and scalable shopping experience with intuitive cart management, fast checkout, and real-time order tracking.

---

## 🚀 Tech Stack

### Frontend:
- React (Hooks, Context API)
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

### Deployment:
- Frontend: Vercel
- Backend: Vercel Serverless / Render

---

## 🎯 Core Features

- 🥦 Browse and filter organic grocery products
- 🔐 User Authentication (JWT)
- 🛒 Add to Cart, Quantity Control, and Delete
- 💳 Checkout with COD
- 📦 Track Past Orders
- 🖼️ Product Images & Clean UI
- 📱 Mobile Friendly Design

---

## 🏗️ Project Structure (Frontend)

├── public/
├── src/
│ ├── api/ # Axios calls
│ ├── assets/ # Product images, banners
│ ├── components/ # Header, Footer, Product Cards
│ ├── context/ # User & Cart contexts
│ ├── pages/ # Home, Products, Cart, Orders
│ ├── App.jsx
│ └── main.jsx


---

## 📸 Screenshots

![Homepage](./screenshots/homepage.png)  
![Cart Page](./screenshots/cart.png)  
![Order Confirmation](./screenshots/order-confirmation.png)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 14  
- MongoDB Atlas URI

### Installation

```bash
git clone https://github.com/<your-username>/greencart.git
cd greencart
npm install

Environment Setup
Frontend .env:
REACT_APP_API_URL=https://your-backend-url/api
Backend .env:
 PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Scripts
 # Run frontend
npm run dev

# Build frontend
npm run build
API Endpoints (Overview)
POST /auth/register - Create new user

POST /auth/login - Authenticate user

GET /products - Get product list

POST /cart - Add/update cart

POST /orders - Place order

GET /orders/:userId - Get order history

🔮 Planned Features
Razorpay/Stripe Integration

Admin Dashboard

Search & Category Filters

Inventory Management

Email Notifications


