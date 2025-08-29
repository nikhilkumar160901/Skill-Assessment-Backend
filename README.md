# Skill Assessment Backend

An Express.js + Node.js + MySQL + Redis + JWT backend for a skill assessment platform.
It handles authentication, skills, questions, test attempts, and reporting APIs. Swagger documentation is included.

---

## 🚀 Features

- Authentication – Register, login, JWT-based auth, role-based access control
- Users Management – Admin and user endpoints (/users)
- Skills Management – CRUD APIs for skills (/skills)
- Questions Bank – Manage and fetch skill-based questions (/questions)
- Test Attempts – Start, submit, and view test history (/attempts)
- Reports – User performance, skill gap, and time-based reports (/reports)
- Caching – Redis integration for performance
- Database – MySQL 
- API Documentation – Swagger (OpenAPI 3) at /api-docs
- Docker Support – Run app + MySQL + Redis with Docker Compose

---

## 🛠️ Tech Stack

- Node.js + Express.js (server)
- MySQL (database)
- Redis (caching)
- JWT (authentication)
- Swagger (API docs)
- Jest + Supertest (testing)
- Docker & Docker Compose (containerized setup)

--- 

## 📂 Project Structure
```
backend/
│── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # App entry point
│   ├── routes/             # All route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── middlewares/        # Auth & error handling
│   ├── models/             # Helper functions (cache, paginator, etc.)
│   ├── migrations/         # Swagger docs
│   ├── utils/              
│   └── docs/               
│
│── tests/                  # Jest + Supertest test files
│── docker-compose.yml      # Docker setup (Node + MySQL + Redis)
│── Dockerfile              # Backend container config
│── .env                    # Environment variables (not committed)
│── .gitignore
│── package.json
│── README.md
```

---

## ⚙️ Setup & Installation

- Clone repository
- Setup environment variables
- Run with Docker (recommended)

---

## 📖 API Documentation

- http://localhost:5000/api-docs

 Example APIs

 Auth
```
POST /api/auth/register → Register new user
POST /api/auth/login → Login & get JWT token
```

---

## 🧪 Running Tests

- npm test

