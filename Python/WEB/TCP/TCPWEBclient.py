import socket

sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockTCP.connect(('kremlin.ru', 80))
req = open('req')
res = open('res', 'w')
req = req.read()
print(res)
sockTCP.send(req.encode('utf-8'))
answer = sockTCP.recv(32024)
answer = answer.decode('utf-8')
res.write(answer)
res.close()
sockTCP.close()
print(answer)