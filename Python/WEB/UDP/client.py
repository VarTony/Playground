import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
msg = input("Your msg: ")
sock.sendto(msg.encode('utf-8'), ('localhost', 1838))
