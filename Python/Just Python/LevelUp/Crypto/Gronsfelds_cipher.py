
# Шифр Гронсфольда

class Gronsfelds_cipher(object):

    def __init__(self, open_text, key='48152342'):
        self.list_close_text = list(open_text.lower())
        self.key = list(key)
        self.key_position = 0
        self.alphabet = {'en': list('abcdefghijklmnopqrstuvwxyz'), 'ru': list('абвгдеёжзийклмнопрстуфхцчшщъыьэюя')}
        if self.list_close_text[0] in self.alphabet['en']:
            self.language = 'en'
        elif self.list_close_text[0] in self.alphabet['ru']:
            self.language = 'ru'
        else:
            print('This language is not supported.\n Support english or russian language')
            return open_text

    def __key_iterator(self):
      self.key_position = self.key_position + 1 if self.key_position < (len(self.key) -1) else 0

    def __cipher(self, injection, word):
        i = 0
        while i < len(self.list_close_text):
            j = 0
            while j < len(self.alphabet[self.language]):
                if self.list_close_text[i] == self.alphabet[self.language][j]:
                  injection(i, j)
                  j += 1
                  break
                j += 1
            self.__key_iterator()
            i += 1
        return {'Your_key': ''.join(self.key), 'Your_' + word + '_text': ''.join(self.list_close_text)}


    def coder(self):
        word = 'close'
        def helper(i, j):
          shift = j - int(self.key[self.key_position])
          if shift < 0:
              shift = len(self.alphabet[self.language]) + shift
          self.list_close_text[i] = self.alphabet[self.language][shift]

        return self.__cipher(helper, word)

    def decoder(self):
        word = 'open'
        def helper(i, j):
          shift = j + int(self.key[self.key_position])
          if shift >= (len(self.alphabet[self.language])):
              shift = (len(self.alphabet[self.language]) - shift) * -1
          self.list_close_text[i] = self.alphabet[self.language][shift]

        return self.__cipher(helper, word)


codeMsg = Gronsfelds_cipher('Yukkiiiiii!!!')
decodeMsg = Gronsfelds_cipher('umjfgfegea!!!')
print(codeMsg.coder())
print(decodeMsg.decoder())

