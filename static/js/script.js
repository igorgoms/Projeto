const socket = io('https://web-production-865c.up.railway.app/');  // Atualize a URL para o seu URL de produção

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
    // Use as variáveis passadas pelo HTML
    socket.send({ message: message, username: username, color: color });
    document.getElementById('message').value = '';
}

// Adiciona o evento para enviar a mensagem ao pressionar "Enter"
document.getElementById('message').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que a tecla "Enter" insira uma nova linha no input
        sendMessage(); // Envia a mensagem
    }
});
