const socket = io.connect("http://" + document.domain + ":" + location.port);

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
