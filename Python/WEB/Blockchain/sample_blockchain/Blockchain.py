import hashlib, json, os, time, blockchain_helpers


class Blockchain:


    def __init__(self):
        print('blockchain created')


    def get_hash_block(self, prev_block):
        bytes_of_prev_block = json.dumps(prev_block)
        hash = hashlib.sha512(bytes(bytes_of_prev_block, encoding='utf-8')).hexdigest()
        return hash


    def get_hash_transaction(self, transaction):
        bytes_of_transaction = json.dumps(transaction)
        txid = hashlib.sha256(bytes(bytes_of_transaction, encoding='utf-8')).hexdigest()
        return txid




    def create_block(self):
        last_block = blockchain_helpers.get_last_block()
        last_slot = blockchain_helpers.get_last_slot()
        number_of_new_block = blockchain_helpers.get_number_of_new_block()
        new_block = open('./blocks/' + last_slot + '/' + 'block_' + number_of_new_block + '.json', 'w+')
        data = {
            "block_name": 'b_' + number_of_new_block,
            "hash_of_prev_block": self.get_hash_block(last_block),
            "create_time": time.time(),
            "transactions": {
            }
        }
        new_block.write(json.dumps(data, indent=4))
        new_block.close()


    def check_privat_key(self, private_key, public_key):
        return blockchain_helpers.get_hash_sha256_for_text(private_key) == public_key


    def create_transaction(self, data):
        print('transaction')
        if self.check_privat_key(data['private_key'], data['donor_public_key']): return 'Private key is not authenticated';
        path_of_last_block = './blocks/' + blockchain_helpers.get_last_slot() + '/' + blockchain_helpers.get_last_block()
        print(blockchain_helpers.get_last_block())
        transaction = {
          "donor" : data['donor_public_key'],
          "recipient" : data['repecient_public_key'],
          "amount" : data['transaction_ammount'],
          "fee" : data['transaction_fee'],
          "time_transaction" : time.time()
        }
        txid = self.get_hash_transaction(transaction)
        transaction['txid'] = txid

        with open(path_of_last_block, 'r', encoding='utf-8') as last_block:
            block_data = json.load(last_block)
            last_block.close()

        number_new_transaction = str(len(block_data['transactions']) + 1)
        block_data['transactions']['transaction_' + number_new_transaction] = transaction

        with open(path_of_last_block, 'w', encoding='utf-8') as last_block:
            last_block.write(json.dumps(block_data, indent=4))
            last_block.close()





def main():
    blockchain = Blockchain()
    # blockchain.create_block()
    blockchain.create_transaction({
        'private_key' :    '0u0fc7aa7fc6f166f9abd35a443a8bd0d215e7d2003eead6659b859709e535ace7',
        'donor_public_key' : '0de31bb726811d74166123c402b76af1d405df21ec00c67e663ba7d989b4e3a5e',
        'repecient_public_key':  'ef5a97d79acaf341ae75b00b9b7442ece474fcef1584851da2037b67cd7fd216',
        'transaction_ammount' : 0.0001,
        'transaction_fee' : 1,

    })



if __name__ ==  '__main__':
    main()


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
