from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Configure o SocketIO para permitir conexões de HTTPS
socketio = SocketIO(app, cors_allowed_origins=["https://projeto-three-green.vercel.app"])

# Definir a variável servers
servers = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_server', methods=['GET', 'POST'])
def create_server():
    if request.method == 'POST':
        server_name = request.form.get('server_name')
        password = request.form.get('password')
        servers[server_name] = password
        return redirect(url_for('index'))
    return render_template('create_server.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        admin_name = request.form.get('admin_name')
        admin_password = request.form.get('admin_password')
        # Adicionar lógica de autenticação do administrador
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/configure', methods=['GET', 'POST'])
def configure():
    if request.method == 'POST':
        server_name = request.form.get('server_name')
        password = request.form.get('password')
        if servers.get(server_name) == password:
            session['username'] = request.form.get('username')  # Armazenar o nome de usuário
            session['color'] = request.form.get('color')        # Armazenar a cor do usuário
            return redirect(url_for('chat'))
        else:
            return "Invalid credentials", 403
    return render_template('configure.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@socketio.on('message')
def handle_message(message):
    emit('response', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
