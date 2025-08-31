# LocalNet - Multicast DNS Chat Application

![LocalNet Interface](screenshot.png)

## Overview

LocalNet is a multicast DNS (mDNS)-based local area network chat application that enables seamless communication between devices on the same network without requiring a centralized server or manual IP configuration. Built with modern web technologies, it provides real-time messaging, automatic device discovery, and file sharing capabilities within your local network.

## Features

- ** Automatic Device Discovery**: Uses mDNS/Bonjour protocol for automatic device detection on LAN
- ** Real-time Messaging**: Instant communication via WebSockets (Socket.io)
- ** File Upload & Sharing**: Support for images, PDFs, text files, and documents (Max 10MB)
- ** Cross-Platform**: Works on desktop, mobile, and web browsers
- ** Local Network Only**: Secure communication within your local network
- ** Modern UI**: Clean, responsive interface built with React/Next.js
- ** Zero Configuration**: No manual IP setup required


## Project Structure

```
LocalNet/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── uploads/            # File upload directory
│   ├── package.json        # Backend dependencies
│   └── ...
├── frontend/               # Next.js/React frontend
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── styles/           # CSS/styling
│   ├── package.json      # Frontend dependencies
│   └── ...
├── README.md
└── screenshot.png
```

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time WebSocket communication
- **Multer** - File upload handling
- **mDNS/Bonjour** - Service discovery protocol
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js** - React framework
- **React** - UI library
- **Socket.io-client** - WebSocket client
- **Modern CSS** - Responsive styling

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the backend server:**
```bash
node server.js
```

The backend will start on `http://localhost:5000` and begin advertising the service via mDNS.

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Usage

1. **Start both backend and frontend servers** as described above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Device Discovery**: The app will automatically discover other LocalNet instances on your network
4. **Join Chat**: Connect to the network chat to start messaging
5. **File Sharing**: Use the file upload area to share files with other connected devices
6. **Real-time Communication**: Send messages that appear instantly on all connected devices

### Supported File Types
- Images: JPG, PNG, GIF, WebP
- Documents: PDF, TXT, DOC, DOCX
- Maximum file size: 10MB

## Network Requirements

- All devices must be on the same local area network (LAN)
- Multicast must be enabled on your network (most home routers support this by default)
- Firewall should allow traffic on the application ports (5000 for backend, 3000 for frontend)

## API Endpoints

### REST API
- `GET /api/devices` - Get list of discovered devices
- `POST /api/upload` - Upload files
- `GET /api/files/:filename` - Download files

### WebSocket Events
- `connection` - New client connected
- `message` - Send/receive chat messages
- `device-update` - Device status updates
- `file-shared` - File sharing notifications

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
SERVICE_NAME=LocalNet
```

### Frontend Configuration

Update `frontend/config.js`:

```javascript
export const config = {
  backendUrl: 'http://localhost:5000',
  socketUrl: 'ws://localhost:5000',
  maxFileSize: 10 * 1024 * 1024, // 10MB
};
```

## Development

### Adding New Features

1. **Backend**: Add routes in `backend/server.js` or create separate route modules
2. **Frontend**: Create new React components in `frontend/components/`
3. **Real-time Features**: Use Socket.io events for instant updates

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Troubleshooting

### Common Issues

1. **Devices not discovered**:
   - Ensure all devices are on the same network
   - Check if multicast is enabled on your router
   - Verify firewall settings

2. **File upload failures**:
   - Check file size (max 10MB)
   - Verify file type is supported
   - Ensure uploads directory has write permissions

3. **Connection issues**:
   - Confirm backend is running on port 5000
   - Check if ports are blocked by firewall
   - Verify network connectivity



## Security Considerations

- Communication is limited to local network only
- No built-in encryption (relies on network security)
- File uploads should be scanned for malicious content in production
- Consider implementing user authentication for sensitive environments


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by the need for simple, local network communication
- Thanks to the open-source community for the amazing tools and libraries

---

**Made for local networks, by developers who value privacy and simplicity.**
