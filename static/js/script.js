// Verifique se você está usando HTTPS e ajuste a URL do Socket.IO
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const socket = io.connect("https://projeto-three-green.vercel.app");


// Função para adicionar uma mensagem ao chat
socket.on('response', function (data) {
    console.log("Received message data:", data); // Adicione isso para depuração

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username" style="color:${data.color};">${data.username}:</span><span class="text">${data.message}</span>`;
    document.getElementById('messages').appendChild(messageElement);
});

function sendMessage() {
    const message = document.getElementById('message').value;
    const username = document.getElementById('username').value; // Certifique-se de que este valor está sendo obtido corretamente
    const color = document.getElementById('color').value; // Certifique-se de que este valor está sendo obtido corretamente
    socket.send({ message: message, username: username, color: color });
    document.getElementById('message').value = '';
}
