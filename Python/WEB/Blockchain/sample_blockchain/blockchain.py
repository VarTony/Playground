import hashlib, json

# hashlib.sha512().update(b'test')
variables = {'lalal': 1, 'user1': 1.085, 'user2' : 121}
bytes_of_variables = json.dumps(variables)
print(hashlib.sha512(bytes(bytes_of_variables, encoding = 'utf-8')).hexdigest() )
# print(hashlib.sha512(bytes_of_variables).hexdigest())

