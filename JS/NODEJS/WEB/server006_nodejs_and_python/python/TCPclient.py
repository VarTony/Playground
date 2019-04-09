import socket

sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockTCP.connect(('localhost', 1835))
sockTCP.send(input('Your msg : ').encode('utf-8'))
answer = sockTCP.recv(512)
answer = answer.decode('utf-8')
sockTCP.close()
print(answer)
