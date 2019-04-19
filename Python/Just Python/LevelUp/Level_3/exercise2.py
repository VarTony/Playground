# Реализуйте функцию getIn, которая извлекает из массива, с любой глубиной вложенности, значение по указанным ключам. Аргументы:

# Исходный массив
# Массив ключей, по которым ведется поиск значения
# В случае, когда добраться до значения невозможно, то возвращается None


# data = {
#     'user' : 'ubuntu',
#     'hosts' : [
#         {'name' : 'web1'},
#         {'name' : 'web2'}
#     ]
# }

# getIn(data, ['undefined']) // => None
# getIn(data, ['user']) // => 'ubuntu'
# getIn(data, ['user', 'ubuntu']) // => None
# getIn(data, ['hosts', 1, 'name']) // => 'web2'
# getIn(data, ['hosts', 0]) // => ['name' => 'web1'].

data = {
    'user' : 'ubuntu',
    'hosts' : [
        {'name' : 'web1'},  
        {'name' : 'web2'}
    ]
}


def getIn(data, keys):
  ht = data
  for key in keys:
    try: ht = ht[key]
    except: return None
  return ht

print(getIn(data, ['user']))


