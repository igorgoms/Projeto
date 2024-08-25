// Conectar ao servidor Socket.IO usando HTTPS
const socket = io("https://" + window.location.hostname + ":" + window.location.port);

// Função para adicionar uma mensagem ao chat
socket.on('response', function (data) {
    console.log("Received message data:", data); // Debug para verificar os dados recebidos

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username" style="color:${data.color};">${data.username}:</span><span class="text">${data.message}</span>`;
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
