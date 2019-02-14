import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('127.0.0.1', 1838))

while True :

    try:
        msg = sock.recv(512)

    except KeyboardInterrupt:
        sock.close()
        break

    else:
        print('Msg : ', msg.decode('utf-8'))

