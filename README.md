# Forever – MERN Stack E-Commerce Website

Forever is a full-stack e-commerce web application built using the MERN stack. It provides a modern shopping experience where users can explore products, add items to their cart, place orders, and make secure online payments.

The project also includes an admin dashboard for managing products and orders.

## 🌐 Live Demo

**Frontend:** https://forever-frontend-peach-six.vercel.app/

**Backend:** https://forever-backend-wine-kappa.vercel.app/

**Admin Panel:** https://forever-admin-one-rho.vercel.app/

## ✨ Features

### Customer Features
- Browse and explore products.
- View detailed product information.
- Add products to the shopping cart.
- Update product quantities.
- Place orders.
- Secure online payments.
- User authentication and authorization.
- Responsive user interface.

### Admin Features
- Admin dashboard.
- Add new products.
- Update existing products.
- Delete products.
- View and manage customer orders.
- Manage the store's product inventory.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- Multer
- Cloudinary
- Validator

### Payment Integration
- Stripe
- Razorpay

### Deployment
- Vercel

## 📁 Project Structure

```text
Forever-website/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── package.json
│
└── admin/
    ├── src/
    ├── public/
    └── package.json
```

*Note: This is a conceptual overview of the project structure.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/muhammedzamil38-wq/Forever-website.git
```

### 2. Navigate to the Project

```bash
cd Forever-website
```

### 3. Install Dependencies

Install dependencies separately inside the frontend, backend, and admin directories.

```bash
cd frontend
npm install

cd ../backend
npm install

cd ../admin
npm install
```

### 4. Configure Environment Variables

Create `.env` files in the appropriate directories and configure the required environment variables.

These may include:
- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Stripe API keys
- Razorpay API keys

Never commit private credentials or API secrets to GitHub.

### 5. Run the Application

Start each application from its respective directory:

```bash
npm run dev
```

Check each directory's `package.json` for the available scripts.

## 🎯 Project Purpose

Forever was developed as a practical full-stack development project to explore real-world e-commerce functionality, REST API development, database management, authentication, payment gateway integration, and frontend-backend communication.

## 👨‍💻 Developer

**Muhammed Zamil**

Aspiring Full Stack Developer | MERN Stack Developer | Flutter Learner

- GitHub: https://github.com/muhammedzamil38-wq
- Portfolio: https://muhammed-zamil-portfolio-website.vercel.app/

---

⭐ If you find this project interesting, consider giving the repository a star!

**Built with passion using the MERN Stack.**
