# Реализуйте функцию, которая делает заглавной первую букву каждого слова в предложении.

# solution('hello, world!'); // Hello, World!

def solution(string):
  l = string.split()
  l = list(map(lambda word: word[0].upper() + word[1:].lower(), l))

  return ' '.join(l)

print(solution('mr ai'))