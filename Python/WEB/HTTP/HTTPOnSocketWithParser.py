import socket


def parser(res):
    lines = res.split('\n')
    status_raw, lines = lines[0], lines[1:]
    protocol,status_code, message = status_raw.split(' ')
    empty_index = 1
    headers = {}
    for index, line in enumerate(lines):
        line = line.strip()
        line = line.strip('\n')
        if line == '':
            empty_index = index
            break
        print(line)
        k, _, v =line.partition(':')
        headers.setdefault(k.strip(), v.strip())
    content = ''.join(lines[empty_index + 1:])
    return int(status_code), headers, content



sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(('government.ru', 80))
req = open('req')
writer = open('res', 'w')
sock.send(req.read().encode('utf-8'))
res = sock.recv(2 ** 15)
res = res.decode('utf-8')
status_code, headers, content = parser(res)
print('Status code : {}'.format(status_code))
print('Headers : {}'.format(headers))
print('Content :')
print(content)
writer.write(res)
writer.close()

