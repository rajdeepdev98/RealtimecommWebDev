// server.js
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
let clients = [];

// Broadcast message to all connected clients
function broadcast(data, sender) {
    clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        broadcast(message, ws); // Broadcast to other clients
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws); // Remove from client list
    });

    // Handle errors
    ws.on('error', (err) => {
        console.error('Error: ', err);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');