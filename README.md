# multicastDNS based chatapp

## Overview
This project is a machine learning-based load balancer with a web interface. It consists of a backend (Node.js/Express) and a frontend (Next.js/React). The backend supports device registration, file uploads, and real-time communication via WebSockets. The frontend provides a user-friendly interface for interacting with the backend.

## Features
- Device registration and discovery (using mDNS/Bonjour for LAN)
- File upload support (with Multer)
- Real-time messaging via WebSockets (Socket.io)
- Modern React/Next.js frontend
- Modular backend and frontend structure

## Project Structure
```
ML based load balancer/
  backend/      # Node.js/Express backend
  frontend/     # Next.js/React frontend
```

## Backend Setup
1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Run the backend server:**
   ```bash
   node server.js
   ```
   The backend will start on `http://localhost:5000`.

### Notes:
- Device discovery via mDNS/Bonjour only works on the local network (LAN).
- File uploads are stored in the `backend/uploads/` directory.
- WebSockets are available at `ws://localhost:5000`.

## Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Run the frontend app:**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`.

## Usage
- Access the frontend in your browser at `http://localhost:3000`.
- Register devices, upload files, and use real-time features.
- The frontend communicates with the backend at `http://localhost:5000`.



## Limitations
- mDNS/Bonjour device discovery does not work over the internet/cloud.
- WebSockets require a persistent backend (not supported by serverless/cloud functions).
- File uploads are stored locally unless refactored for cloud storage.

## License
MIT 