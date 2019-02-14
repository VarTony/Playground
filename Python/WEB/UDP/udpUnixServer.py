import socket
import os

sock_file = 'unix.sock'
sock = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)

if os.path.exists(sock_file):
    os.remove(sock_file)

sock.bind(sock_file)

while True:

    try:
        msg = sock.recv(512)

    except KeyboardInterrupt:
        sock.close()
        break

    else:
        print('Msg : ', msg.decode('utf-8'))


