// Conectar ao servidor WebSocket
const socket = new WebSocket("wss://" + window.location.hostname + ":" + window.location.port + "/ws");

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username" style="color:${data.color};">${data.username}:</span><span class="text">${data.message}</span>`;
    document.getElementById('messages').appendChild(messageElement);
};

function sendMessage() {
    const message = document.getElementById('message').value;
    const username = "{{ session['username'] }}";
    const color = "{{ session['color'] }}";
    socket.send(JSON.stringify({ message: message, username: username, color: color }));
    document.getElementById('message').value = '';
}
