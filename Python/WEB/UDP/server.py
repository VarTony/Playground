import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('127.0.0.1', 1838))
print(sock)
msg = sock.recv(512)
print('Msg : ', msg.decode('utf-8'))
sock.close()


