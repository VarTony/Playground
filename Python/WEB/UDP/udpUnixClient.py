import socket

sock = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
sock.sendto(input('Your msg : ').encode('utf-8'), 'unix.sock')
