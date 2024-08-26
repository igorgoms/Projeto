const socket = io("https://projeto-lylkzwhat-igorgoms-projects.vercel.app");

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
    const username = "{{ session['username'] }}"; // Usar o nome de usuário da sessão
    const color = "{{ session['color'] }}"; // Usar a cor da sessão
    socket.send({ message: message, username: username, color: color });
    document.getElementById('message').value = '';
}
