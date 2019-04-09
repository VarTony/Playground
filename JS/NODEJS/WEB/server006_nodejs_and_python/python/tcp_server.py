import socket
import programm

sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockTCP.bind(('localhost', 1835))
sockTCP.listen(3)

while True:

    try:
        client, addr = sockTCP.accept()
        msg = client.recv(512)
        msg = msg.decode('utf-8')
        client.send(str(programm.smallestDivisor(int(msg))).encode('utf-8'))

    except KeyboardInterrupt:
        sockTCP.close()
        break

    else:
       
        client.close()
        print('Msg : ', msg) #.decode('utf-8')

