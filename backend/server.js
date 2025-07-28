const express = require('express');
const http = require('http');
const port = 5000;
const cors = require('cors');
const app = express();
const upload = require('./file');
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

const mdnsService = require('./services/mdnService');
mdnsService.advertiseService({ name: 'LocalNet Backend', type: 'http', port: port });
mdnsService.startDiscovery('http');

const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.10.8:3000"], // frontend URL
        methods: ["GET", "POST"]
    }
});

// Store registered devices
let registeredDevices = [];

app.get('/api/devices', (req, res) => {
    try {
        const discoveredDevices = mdnsService.getDiscoveredDevices();
        // Combine discovered devices with registered devices
        const allDevices = [...discoveredDevices, ...registeredDevices];
        res.json(allDevices);
    } catch (error) {
        console.log(error + 'sdasjdas');
        res.json(registeredDevices); // Fallback to just registered devices
    }
});

app.post('/api/register-device', (req, res) => {
    try {
        const deviceInfo = req.body;

        // Check if device already exists
        const existingIndex = registeredDevices.findIndex(d => d.id === deviceInfo.id);

        if (existingIndex >= 0) {
            // Update existing device
            registeredDevices[existingIndex] = { ...registeredDevices[existingIndex], ...deviceInfo, lastSeen: new Date() };
        } else {
            // Add new device
            registeredDevices.push({ ...deviceInfo, lastSeen: new Date() });
        }

        console.log('Device registered:', deviceInfo.name);
        res.json({ success: true, deviceId: deviceInfo.id, message: 'Device registered successfully' });
    } catch (error) {
        console.error('Error registering device:', error);
        res.status(500).json({ success: false, error: 'Failed to register device' });
    }
});

app.post('/api/upload', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        console.log('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: req.file
    });
  });
  













let clients = [];

try {
    // Handle socket connections
    io.on('connection', (socket) => {
        clients.push(socket);
        console.log(`New client connected: ${socket.id}`);

        // Handle receiving a message
        socket.on('send_message', (data) => {
            console.log("Message received:", data);
            // Broadcast message to all clients
            io.emit('receive_message', data);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

} catch (error) {
    console.error("Error connecting to socket.io server:", error);
}

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

console.log("WebSocket server running on ws://localhost:5000");
