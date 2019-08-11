import hashlib, json, os, time


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
        path_to_dir_blocks = os.path.abspath(os.curdir) + '/blocks'
        block_list = os.listdir(path_to_dir_blocks)
        last_block = block_list[len(block_list) - 1]
        last_slot = 'slot_' + str((len(block_list)))
        number_of_new_block = str(len(os.listdir(path_to_dir_blocks + '/' + last_slot)))
        # new_block = open(path_to_dir_blocks + '/' + last_slot + 'block_' + number_of_new_block + '.json', 'w') #.close()
        new_block = open('./blocks/' + last_slot + '/' + 'block_' + number_of_new_block + '.json', 'w+')
        data = {
            "block_name": 'b_' + number_of_new_block,
            "hash_of_prev_block": self.get_hash_block(last_block),
            "crate_time": time.time(),
            "transactions": {
            }
        }
        new_block.write(json.dumps(data, indent=4))
        # new_block.read()
        new_block.close()


def main():
    blockchain = Blockchain()
    blockchain.create_block()



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
