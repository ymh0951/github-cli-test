# DocTalk - Health Consultation Messenger

DocTalk is a B2B health consultation messenger service that enables real-time communication between doctors and patients.

## Project Structure

```
doctalk-reservation/
├── backend/          # Express + Socket.io + MongoDB backend
├── frontend/         # Nuxt.js frontend
├── docs/            # Project documentation
└── docker-compose.yml
```

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- MongoDB (Mongoose ODM)
- Socket.io (WebSocket)
- JWT Authentication
- Multer (File uploads)

### Frontend
- Nuxt.js 3
- Pinia (State management)
- Socket.io-client
- SASS (Styling)
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose (for MongoDB)
- npm

### 1. Start MongoDB

```bash
docker-compose up -d
```

This will start MongoDB on `localhost:27017` with:
- Username: `admin`
- Password: `admin123`
- Database: `doctalk`

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file if needed (default values should work for local development).

Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` file if needed (default values should work for local development).

Start the frontend dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Testing Phase 1 (Authentication)

### Registration
1. Open `http://localhost:3000/register`
2. Fill in the form:
   - Name: Your name
   - Email: test@example.com
   - Password: password123
   - Role: Patient or Doctor
3. Click "Register"
4. You should be logged in and redirected to the home page

### Login
1. Open `http://localhost:3000/login`
2. Enter your credentials
3. Click "Login"
4. You should be redirected to the home page

### Logout
1. On the home page, click "Logout"
2. You should be redirected to the login page

### Protected Routes
1. Try accessing `http://localhost:3000/chat` without logging in
2. You should be redirected to the login page
3. Log in and try again
4. You should be able to access the page

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Health Check
- `GET /health` - Server health check

## Development Status

### ✅ Phase 1: Authentication (Completed)
- [x] Project setup
- [x] MongoDB connection
- [x] User model
- [x] JWT authentication
- [x] Register/Login/Logout API
- [x] Frontend authentication pages
- [x] Route protection

### 🚧 Phase 2: Basic Chat (Next)
- [ ] ChatRoom and Message models
- [ ] Socket.io setup
- [ ] Real-time messaging
- [ ] Chat UI components

### 📋 Phase 3-6: Upcoming
- File/image sharing
- Doctor profiles
- Reservation system
- UX improvements
- Testing and deployment

## Project Rules

This project follows strict development rules defined in:
- `docs/CLAUDE.md` - Repository-wide rules
- `docs/CONTEXT.md` - Product context
- `docs/FE/CLAUDE.md` - Frontend-specific rules

Key principles:
- Safety and reproducibility
- No token/secret logging
- Minimal changes
- Verification before deployment

## License

ISC
