# Product API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

A lightweight and fast product management API built with Fastify and JWT authentication.

## 🚀 Features

- **Fast Performance**: Built on Fastify for optimal speed
- **Secure Authentication**: JWT token-based auth system
- **Product Management**: Full CRUD operations for products
- **PostgreSQL Integration**: Reliable data persistence

## 📋 Prerequisites

- Node.js 16+
- PostgreSQL
- npm or yarn

## ⚙️ Installation

1. Clone the repository
   ```bash
   git clone https://github.com/henrittp/product-service-api.git
   cd product-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the server
   ```bash
   npm start
   ```

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | /login   | Authenticate user and get token | No |
| GET    | /produtos | Get all products | Yes |
| POST   | /produtos | Create a new product | Yes |

## 🛠️ Tech Stack

- **Fastify**: Web framework
- **PostgreSQL**: Database
- **JWT**: Authentication
- **ESLint**: Code quality

## 📄 License

MIT

---

Made with ❤️ by [Henri](https://github.com/henrittp)