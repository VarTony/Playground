import socket

sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockTCP.bind(('localhost', 1981))
sockTCP.listen(3)
hosts = open('HOSTS.txt')
hosts = hosts.read()
hosts = hosts.split('\n')
ldn = {}
i = 1
dn = ''
ip = ''
while i < len(hosts) - 1:
    ldn[hosts[i].split(':')[1]] = hosts[i].split(':')[0]
    i += 1

print(ldn)

while True:

    try:
        client, addr = sockTCP.accept()

    except KeyboardInterrupt:
        sockTCP.close()
        break

    else:
        req = client.recv(512)
        req = req.decode('utf-8')

        if req in ldn :
            client.send(ldn[req].encode('utf-8'))
            client.close()
            print('request : ', req, ' successfully processed')

        else :
            answer = req+' that domain name is not exist'
            client.send(answer.encode('utf-8'))
            client.close()
            print('That domain name is not exist')

