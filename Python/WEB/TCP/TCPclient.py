import socket

# Создается сокет.
sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Подключается к ip 192.162.0.1 на порту 1835.
sockTCP.connect(('localhost', 1835))
# Отправляет введеное сообщение в кодеровке utf-8.
sockTCP.send(input('Your msg : ').encode('utf-8'))

# Ожидает ответ размером до 512 байт.
answer = sockTCP.recv(512)
# Декодирует ответ в utf-8.
answer = answer.decode('utf-8')
# Закрываеет соединение.
sockTCP.close()
# Выводит декодированный ответ.
print(answer)
