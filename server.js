const net = require('net');

// Weather information (for demonstration purposes)
const weatherInfo = {
    "Paris": "Sunny",
    "Berlin": "Cloudy",
    "London": "Rainy",
};

// Create a TCP server
const server = net.createServer((socket) => {
    console.log('Client connected');

    // Handle incoming data from the client
    socket.on('data', (data) => {
        const city = data.toString().trim();
        if (weatherInfo[city]) {
            socket.write(weatherInfo[city]);
        } else {
            socket.write('City not found');
        }
    });

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

// Listen for connections on port 12345
const PORT = 12345;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
