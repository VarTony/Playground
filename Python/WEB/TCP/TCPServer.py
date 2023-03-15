import socket

# Создает принимающий сокет.
sockTCP = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Привязывается к порту 1835 на локальной машине.
sockTCP.bind(('localhost', 1835))
# Начинает прослушивание ( Максимум 3 соединения ).
sockTCP.listen(3)

while True:

    try:
        # Принимает запрос клиента.
        client, addr = sockTCP.accept()
        # Возвращает ответ, что запрос получен, в кодировке utf-8.
        client.send('Msg received'.encode('utf-8'))

    except KeyboardInterrupt:
        # Если срабатывает исключение, закрывает TCP соединение
        sockTCP.close()
        break

    else:
        # Если соединение прошло успешно, ждет пакет в 512 байт.
        msg = client.recv(512)
        # client.send('Msg received'.encode('utf-8'))
        # Закрывает соединение.
        client.close()
        # Выводит декодированное сообщение из принятого пакета.
        print('Msg : ', msg.decode('utf-8'))


