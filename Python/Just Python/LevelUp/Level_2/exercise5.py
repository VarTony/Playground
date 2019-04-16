# Реализуйте функцию countUniqChars, которая считает количество уникальных символов в переданной строке.
# Если передана пустая строка, то функция должна вернуть 0, т.к. пустая строка вообще не содержит символов.

# Задание необходимо выполнить без использования функции array_unique.

# text1 = 'yy';
# countUniqChars(text1); // => 1

# text2 = 'yyab';
# countUniqChars(text2); // => 3

# text3 = 'You know nothing Jon Snow';
# countUniqChars(text3); // => 13

# text4 = '';
# countUniqChars(text4); // => 0



countUniqChars = lambda s : len(set(list(s)))

print(countUniqChars('yy'))
print(countUniqChars('yyab'))
print(countUniqChars('You know nothing Jon Snow'))
print(countUniqChars(''))

