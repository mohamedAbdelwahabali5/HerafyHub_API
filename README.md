# HerafyHub API

HerafyHub is an e-commerce platform backend built using Node.js, Express, and MongoDB. It provides APIs for managing products, users, orders, and categories.

## Project Structure
```
HerafyHub/
│── /DB
│   │── /Models
│   │   │── category.model.js      # Mongoose model for Category
│   │   │── order.model.js         # Mongoose model for Order
│   │   │── product.model.js       # Mongoose model for Product
│   │   │── user.model.js          # Mongoose model for User
│   │── connection.js              # Database connection setup
│── /src
│   │── /middlewares
│   │   │── authMiddleware.js      # Authentication & Authorization Middleware
│   │   │── errorHandler.js        # Global Error Handling Middleware
│   │── /Modules
│   │   │── /Categories
│   │   │   │── category.controller.js # Business logic for categories
│   │   │   │── category.routes.js     # API routes for categories
│   │   │── /Orders
│   │   │   │── order.controller.js    # Business logic for orders
│   │   │   │── order.routes.js        # API routes for orders
│   │   │── /Products
│   │   │   │── product.controller.js  # Business logic for products
│   │   │   │── product.routes.js      # API routes for products
│   │   │── /Users
│   │   │   │── user.controller.js     # Business logic for users
│   │   │   │── user.routes.js         # API routes for users
│   │── /services
│   │   │── category.service.js        # Handles database queries for categories
│   │   │── order.service.js           # Handles database queries for orders
│   │   │── product.service.js         # Handles database queries for products
│   │   │── user.service.js            # Handles database queries for users
│   │── /utils
│   │   │── emailSender.js             # Utility to send emails
│   │   │── errorHandler.js            # Utility for better error responses
│── index.js                           # Entry point of the server
│── package.json                        # Project dependencies and metadata
│── package-lock.json                    # Locks dependency versions
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/HerafyHub.git
   cd HerafyHub
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

