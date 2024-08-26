from flask import Flask, render_template, session, request, redirect, url_for
from flask_sock import Sock

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
sock = Sock(app)

# Armazenar informações do servidor
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

# WebSocket route
@sock.route('/ws')
def websocket(ws):
    while True:
        data = ws.receive()
        if data:
            ws.send(data)

if __name__ == '__main__':
    app.run(debug=True)
