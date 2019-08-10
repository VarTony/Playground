import hashlib, json


class Blockchain:
    # def __init__(self, amount):
    #     self.amount : amount

    def get_hash_block(prevBlock):
        bytes_of_prevBlock = json.dumps(prevBlock)
        hash = hashlib.sha512(bytes(bytes_of_prevBlock, encoding='utf-8')).hexdigest()
        return hash

    def get_hash_transaction(transaction):
        bytes_of_transaction = json.dumps(transaction)
        txid = hashlib.sha256(bytes(bytes_of_transaction, encoding='utf-8')).hexdigest()
        return txid










#     # hashlib.sha512().update(b'test')
# variables = {
#           "donor" : "0u0fc7aa7fc6f166f9abd35a443a8bd0d215e7d2003eead6659b859709e535ace7",
#           "recipient" : "0u3e988097a8d5cfc66d66a09b20a1baeabdaec3a7fe9bcf3e87b5dff43fcf2992",
#           "amount" : "0.027124193",
#           "fee" : "0.000000021",
#           "time_transaction" : "0000000000"
#       }

#
# bytes_of_variables = json.dumps(variables)
# print(hashlib.sha256(bytes(bytes_of_variables, encoding = 'utf-8')).hexdigest() )
# print(hashlib.sha512(bytes_of_variables).hexdigest())
