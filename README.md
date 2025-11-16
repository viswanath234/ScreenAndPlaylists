Screens & Playlists System
A) Setup Steps

1. Clone the repo
   git clone <repo-url>
   cd project-folder

2. Backend setup
   cd backend
   npm install
   cp .env.example .env

# Edit .env to set MONGO_URI and JWT_SECRET

3. Seed database
   npx ts-node src/scripts/seed.ts

4. Start backend
   npm run dev

# Runs backend on PORT (default 4000)

5. Frontend setup
   cd frontend
   npm install
   npm run dev

# Runs frontend on http://localhost:5173 (Vite)

B) Data Model Diagram
User

- \_id: ObjectId
- email: string
- password: string (hashed)
- role: "ADMIN" | "EDITOR"

Screen

- \_id: ObjectId
- name: string
- isActive: boolean

Playlist

- \_id: ObjectId
- name: string
- itemUrls: string[]

C) API Shapes

1. Authentication

POST /auth/login

Request:
{
"email": "admin@example.com",
"password": "Admin123!"
}

Response 200:
{
"token": "<JWT_TOKEN>"
}

Response 401:
{
"message": "Invalid credentials"
}

2. Screens

GET /screens?search=&page=&limit=

Response 200:
{
"items": [
{ "_id": "123", "name": "Main Lobby", "isActive": true }
],
"total": 1
}

PUT /screens/:id

Toggle isActive

Requires role: EDITOR+

Request:
{
"isActive": true
}

Response 200:
{
"\_id": "123",
"name": "Main Lobby",
"isActive": true
}

3. Playlists

GET /playlists?search=&page=&limit=

Response 200:
{
"items": [
{ "_id": "p1", "name": "Morning Playlist", "itemCount": 5 }
],
"total": 1
}

POST /playlists

Request:
{
"name": "Evening Playlist",
"itemUrls": ["https://example.com/video1", "https://example.com/video2"]
}

Response 201:
{
"\_id": "p2",
"name": "Evening Playlist",
"itemUrls": ["https://example.com/video1", "https://example.com/video2"]
}

Error Shape
{
"message": "Error message here"
}

D) Validation & Security

Validation

Email/password required for login

Playlist itemUrls max 10 URLs, each validated with regex

Search & pagination query params validated

Security

Passwords hashed using bcrypt

JWT authentication

Role-based authorization (EDITOR or ADMIN)

Helmet & CORS headers for API protection

MongoDB indexes on name for efficient search

E) Decisions & Trade-offs

Skipped: Full frontend design (focus on functionality & clarity)

State management: Used React Query for caching + optimistic updates

Form validation: Simple, avoids heavy libraries for brevity

Seed script: Basic users and sample screens/playlists for testing

Trade-off: Did not implement real-time updates via sockets; could be added in future

F) How to Execute Seed Script

Ensure backend dependencies installed:

cd backend
npm install

Create .env file with:

MONGO_URI=mongodb://localhost:27017/screensdb
JWT_SECRET=<your-secret>
PORT=4000

Run seed script:

npx ts-node src/scripts/seed.ts

Creates one ADMIN user:
Email: admin@example.com
Password: Admin123!

Creates sample screens and playlists.
