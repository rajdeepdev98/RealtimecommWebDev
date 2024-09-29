// client.js
const WebSocket = require('ws');
const readline = require('readline');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Handle incoming messages
ws.on('message', (message) => {
    console.log(`\nMessage from server: ${message}`);
});

// Handle connection open event
ws.on('open', () => {
    console.log('Connected to server. Type a message:');

    // Setup user input interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Send messages typed by the user
    rl.on('line', (input) => {
        ws.send(input);
    });
});

// Handle connection close
ws.on('close', () => {
    console.log('Disconnected from server');
});

// Handle errors
ws.on('error', (err) => {
    console.error('Error: ', err);
});