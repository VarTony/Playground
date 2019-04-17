# Шифр Цезаря


#--------------------------Bubble sort----------------------------------------



# Процедурный

def caesars_cipher(open_text, key=3, code=True):
    alphabet = {'en': list('abcdefghijklmnopqrstuvwxyz'), 'ru': list('абвгдеёжзийклмнопрстуфхцчшщъыьэюя')}
    list_close_text = list(open_text.lower())
    i = 0

    if list_close_text[0] in alphabet['en']:
        language = 'en'
    elif list_close_text[0] in alphabet['ru']:
        language = 'ru'
    else:
        print('This language is not supported.\n Support english or russian language')
        return open_text

    if key > len(alphabet[language]):
        return 'Сдвиг не может быть, больше длины алфавита. Максимально допустимое значение : ' + str(
            len(alphabet[language]))

    while i < len(list_close_text):
        j = 0
        while j < len(alphabet[language]):

            if list_close_text[i] == alphabet[language][j]:

                if code:
                    shift = j - key
                    if shift < 0:
                        shift = len(alphabet[language]) + shift
                    list_close_text[i] = alphabet[language][shift]
                    break

                else:
                    shift = j + key
                    if shift >= (len(alphabet[language])):
                        shift = (len(alphabet[language]) - shift) * -1
                    list_close_text[i] = alphabet[language][shift]
                    break

            j += 1
        i += 1
    return {'Your_key': key, 'Your_close_text': ''.join(list_close_text)}


print(caesars_cipher('lbfl op xfcel wp nzxalclep', 27, False))





# ООП


class Caesars_cipher(object):

    def __init__(self, open_text, key=3, code=True):
        self.list_close_text = list(open_text.lower())
        self.key = key
        self.code = code
        self.alphabet = {'en': list('abcdefghijklmnopqrstuvwxyz'), 'ru': list('абвгдеёжзийклмнопрстуфхцчшщъыьэюя')}
        if self.list_close_text[0] in self.alphabet['en']:
            self.language = 'en'
        elif self.list_close_text[0] in self.alphabet['ru']:
            self.language = 'ru'
        else:
            print('This language is not supported.\n Support english or russian language')
            return open_text

    def __validator(self):
        if self.key > len(self.alphabet[self.language]):
            return {'validate': False,
                    'msg': 'Shift can not be more than the size of the alphabet. Maximum allowed value: ' + str(
                        len(self.alphabet[self.language]))}
        elif self.key < 0:
            return {'validate': False, 'msg': 'Shift cannot be less than 0. Minimum allowed value : 0'}
        else:
            return {'validate': True, 'msg': 'Validated'}

    def __cipher(self, injection, word):
        validate = self.__validator()
        if not validate['validate']: return validate['msg']
        i = 0
        while i < len(self.list_close_text):
            j = 0
            while j < len(self.alphabet[self.language]):
                if self.list_close_text[i] == self.alphabet[self.language][j]:
                    injection(i, j)
                    j += 1
                    break
                j += 1
            i += 1
        return {'Your_key': self.key, 'Your_' + word + '_text': ''.join(self.list_close_text)}

    def coder(self):
        word = 'close'

        def helper(i, j):
            shift = j - self.key
            if shift < 0:
                shift = len(self.alphabet[self.language]) + shift
            self.list_close_text[i] = self.alphabet[self.language][shift]

        return self.__cipher(helper, word)

    def decoder(self):
        word = 'open'

        def helper(i, j):
            shift = j + self.key
            if shift >= (len(self.alphabet[self.language])):
                shift = (len(self.alphabet[self.language]) - shift) * -1
            self.list_close_text[i] = self.alphabet[self.language][shift]

        return self.__cipher(helper, word)


codeMsg = Caesars_cipher(
    'The Dynamic Host Configuration Protocol (DHCP) provides configurationparameters to Internet hosts.')
decodeMsg = Caesars_cipher(
    'qeb avkxjfz elpq zlkcfdroxqflk molqlzli (aezm) molsfabp zlkcfdroxqflkmxoxjbqbop ql fkqbokbq elpqp.')
print(codeMsg.coder())
print(decodeMsg.decoder())
# --------------------------------------------------------------------------------------------------