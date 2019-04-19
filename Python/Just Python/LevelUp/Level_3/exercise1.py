# Реализуйте функцию, которая принимает на вход список параметров и возвращает сформированный query string из этих параметров:


# buildQueryString(['per' : 10, 'page' : 1 ]);
# // → page=1&per=10
# Имена параметров в выходной строке должны располагаться в алфавитном порядке (то есть их нужно отсортировать).



def buildQueryString(params):
  keys = sorted(params)
  result = ''
  for key in keys:
    if result != '': result += '&'
    result +=  key+'='+ str(params[key])

  return result

print(buildQueryString({'per' : 10, 'page' : 1}))

