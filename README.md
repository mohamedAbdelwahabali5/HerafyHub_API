
# 🛍️ HerafyHub - E-commerce API Backend

>   HerafyHub is an e-commerce platform backend built using Node.js, Express, and MongoDB. It provides APIs for managing products, users, orders, and categories.


## Team Member

- [@Omar Araby](https://github.com/OmarAraby)
- [@Mohamed Abd Elwahab](https://github.com/mohamedAbdelwahabali5)
- [@Mostafa Bolbol](https://github.com/MBolbol)
- [@Sama Ibrahim]()
- [@Nehad Ashraf](https://github.com/nehadashraf)
## Table of Content
- [🔍 Overview](#-overview)
- [🎯 Key Features](#-key-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Project Structure](#%EF%B8%8F-project-structure)
- [📚 API Documentation](#-api-documentation)
- [🚂 Railway.app Deployment](#-railwayapp-deployment)
- [🤝 How to Contribute](#-how-to-contribute)

## 🔍 Overview

> A robust Node.js backend powering HerafyHub's e-commerce platform with:
- Secure user authentication 🔒
- Comprehensive product management 📦  
- Efficient order processing 🚚
- Scalable architecture ⚡

## 🎯 Key Features
- 🔐 **Authentication & Authorization**
	- JWT-based authentication
	- Role-based access control
	- Secure password hashing

- 📦 **Product Management**
	  - CRUD operations for products
	  - Category management
	  - Product search and filtering
	  - Rating system

- 👥 **User Management**
	- User registration and login
	- Profile management
	- Password reset functionality

  

- 🛒 **Order Management**
	- Order creation and tracking
	- Order history
	- Status updates

## 🛠️ Tech Stack


### Core Components
```mermaid
graph TD
  A[Node.js] --> B[Express]
  B --> C[MongoDB]
  C --> D[Mongoose]
  B --> E[JWT Auth]
  E --> F[bcryptjs]
  B --> G[Multer]
  G --> H[Cloudinary]
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/mohamedAbdelwahabali5/HerafyHub_API.git
cd HerafyHub_API
npm install
```

### 2. Environment Setup
Create `.env` file:
```ini
# ======================
# 🛡️ Server Configuration
# ======================
PORT=5555
NODE_ENV=development # (development|production|staging)
BASE_URL=http://localhost:5555
FRONTEND_URL=http://localhost:4200 # Your Angular app URL

# ======================
# 🔐 Authentication
# ======================
JWT_SECRET=your_ultra_secure_secret_here # Min 32 chars, mix of letters, numbers, symbols
JWT_EXPIRATION=30d # (e.g., 1h, 24h, 7d, 30d)

# ======================
# 🗃️ Database
# ======================
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/herafyhub?retryWrites=true&w=majority

# ======================
# 📧 Email Service
# ======================
EMAIL_USER=your.email@gmail.com # SMTP username
EMAIL_PASS=your_app_specific_password # For Gmail, use App Password
CONTACT_EMAIL=support@herafyhub.com # For system notifications
EMAIL_SERVICE=gmail # (gmail|sendgrid|mailgun)
EMAIL_PORT=587
EMAIL_HOST=smtp.gmail.com

# ======================
# 💳 Payment Gateway (Paymob)
# ======================
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_INTEGRATION_ID=your_integration_id
PAYMOB_HMAC_SECRET=your_hmac_secret # For payment verification

# ======================
# ☁️ Cloudinary Storage
# ======================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=herafyhub # Optional folder organization

# ======================
# ⚙️ Rate Limiting
# ======================
RATE_LIMIT_WINDOW=15 # minutes
RATE_LIMIT_MAX=100 # requests per window

# ======================
# 🔍 Debugging
# ======================
DEBUG_MODE=true # Enable detailed error logs
REQUEST_LOGGING=true # Log all incoming requests
```

### 3. Run the Server
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

## 📚 API Documentation

### Authentication Endpoints
```plaintext
POST   /api/auth/register   - Register new user
POST   /api/auth/login      - User login
POST   /api/auth/logout     - User logout
```
### Product Endpoints
```plaintext
GET    /api/products        - Get all products
POST   /api/products        - Create product
GET    /api/products/:id    - Get product by ID
PUT    /api/products/:id    - Update product
DELETE /api/products/:id    - Delete product
```
### Category Endpoints
```plaintext
GET    /api/categories      - Get all categories
POST   /api/categories      - Create category
GET    /api/categories/:id  - Get category by ID
PUT    /api/categories/:id  - Update category
DELETE /api/categories/:id  - Delete category
```
### Order Endpoints
```plaintext
GET    /api/orders/user         - Get all orders
POST   /api/orders         - Create order
GET    /api/orders/:id     - Get order by ID
PUT    /api/orders/:id     - Update order status
```


## 🏗️Project Structure

```bash
HerafyHub/
│── /DB
│   │── /Models
│   │   │── category.model.js      # Category schema definition
│   │   │── order.model.js         # Order schema with status tracking
│   │   │── product.model.js       # Product schema with image uploads
│   │   │── user.model.js          # User schema with auth fields
│   │── connection.js              # MongoDB connection config
│
│── /src
│   │── /middlewares
│   │   │── authMiddleware.js      # JWT verification & role checks
│   │   │── errorHandler.js        # Custom error responses
│   │
│   │── /Modules
│   │   │── /Categories            # Category management
│   │   │   │── category.controller.js # CRUD operations
│   │   │   │── category.routes.js     # REST endpoints
│   │   │
│   │   │── /Orders                # Order processing
│   │   │   │── order.controller.js    # Checkout logic
│   │   │   │── order.routes.js        # Order routes
│   │   │
│   │   │── /Products              # Product catalog
│   │   │   │── product.controller.js  # Inventory management
│   │   │   │── product.routes.js      # Product API
│   │   │
│   │   │── /Users                 # User management
│   │   │   │── user.controller.js     # Auth handlers
│   │   │   │── user.routes.js         # User routes
│   │
│   │── /services                  # Business logic
│   │   │── category.service.js    # Category DB operations  
│   │   │── order.service.js       # Order processing
│   │   │── product.service.js     # Product inventory
│   │   │── user.service.js        # User management
│   │
│   │── /utils
│   │   │── emailSender.js         # Transactional emails
│   │   │── errorHandler.js        # Error formatting
│
│── index.js                       # Server entry point
│── package.json                   # Dependency management
```

## 🚂 Railway.app Deployment


[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FmohamedAbdelwahabali5%2FHerafyHub_API)
### Step-by-Step Guide:

1. **Click the "Deploy on Railway" button** above or:
   - Go to [Railway.app](https://railway.app)
   - Select "New Project" → "Deploy from GitHub repo"

2. **Configure your deployment**:
   - Connect your GitHub account
   - Select the `HerafyHub_API` repository
   - Choose the branch to deploy (usually `main` or `master`)

3. **Set up environment variables**:
```bash
   # Required variables (copy from your .env):
   PORT=5555
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   .....
   .....
   .....
   ```

## 🤝 How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-payment`)
3. Commit changes (`git commit -m 'Add PayPal integration'`)
4. Push to branch (`git push origin feature/new-payment`)
5. Open a Pull Request


---

<div align="center">
  Developed with ❤️ by HerafyHub Team | 
  <a href="mailto:mohamedAbdelwahabali5@example.com">Contact</a> | 
  <a href="https://github.com/mohamedAbdelwahabali5">GitHub</a>
</div>




