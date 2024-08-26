const socket = io("http://localhost:5000"); // URL para o servidor local

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

// Função para adicionar uma mensagem ao chat
socket.on('response', function (message) {
    console.log("Received message data:", message); // Debug para verificar os dados recebidos

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username" style="color:${message.color};">${message.username}:</span><span class="text">${message.message}</span>`;
    document.getElementById('messages').appendChild(messageElement);
});

// Função para enviar uma mensagem
function sendMessage() {
    const message = document.getElementById('message').value;
    // Use as variáveis definidas no HTML
    socket.send({ message: message, username: username, color: color });
    document.getElementById('message').value = '';
}
