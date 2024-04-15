const net = require('net');

// Create a TCP socket for connecting to the server
const socket = new net.Socket();

// Connect to the server
const PORT = 12345;
const SERVER_ADDRESS = '127.0.0.1'; // Replace 'server_ip_address' with the actual IP address of the server
socket.connect(PORT, SERVER_ADDRESS, () => {
    console.log('Connected to server');

    // Prompt user to enter city name
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter city name: ', (city) => {
        // Send city name to server
        socket.write(city);

        // Handle server response
        socket.on('data', (data) => {
            console.log(`Weather in ${city}: ${data}`);
            socket.end(); // Close connection after receiving response
            readline.close(); // Close readline interface
        });
    });
});
