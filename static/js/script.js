document.addEventListener('DOMContentLoaded', function() {
    const socket = io.connect("http://" + document.domain + ":" + location.port);

    // Função para adicionar uma mensagem ao chat
    socket.on('response', function(data) {
        console.log("Received message data:", data); // Debug para verificar os dados recebidos

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<span class="username" style="color:${data.color};">${data.username}:</span><span class="text">${data.message}</span>`;
        document.getElementById('messages').appendChild(messageElement);
    });

    window.sendMessage = function() {
        const message = document.getElementById('message').value;
        socket.send({ message: message, username: username, color: color });
        document.getElementById('message').value = '';
    }
});
