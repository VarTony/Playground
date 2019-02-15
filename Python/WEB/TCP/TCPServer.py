import socket

sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockTCP.bind(('localhost', 1835))
sockTCP.listen(3)

while True:

    try:
        client, addr = sockTCP.accept()
        client.send('Msg received'.encode('utf-8'))

    except KeyboardInterrupt:
        sockTCP.close()
        break

    else:
        msg = client.recv(512)
        # client.send('Msg received'.encode('utf-8'))
        client.close()
        print('Msg : ', msg.decode('utf-8'))


