from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Configurar CORS para Flask
CORS(app, resources={r"*": {"origins": "https://projeto-three-green.vercel.app"}})

# Configurar SocketIO para permitir CORS
socketio = SocketIO(app, cors_allowed_origins="https://projeto-three-green.vercel.app")

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
            session['username'] = request.form.get('username')
            session['color'] = request.form.get('color')
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

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@socketio.on('connect')
def on_connect():
    print('Client connected')

@socketio.on('disconnect')
def on_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    # Remover ou comentar a linha abaixo para implantar no Railway
    # socketio.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
    pass
