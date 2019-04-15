# Реализуйте функцию reverse, которая переворачивает строку.
# reverse('hello, world!'); // !dlrow ,olleh

def reverse(str):
    result = ''
    i = len(str) - 1
    palindrome = ' palindrome'

    while i >= 0:
        result += str[i]
        i -= 1

    i = len(result) - 1

    while i >= 0:
        if (str[i] != result[i]):
            palindrome = ' not' + palindrome
            break
        i -= 1

    result += ' is' + palindrome
    return result


print(reverse('strange'))