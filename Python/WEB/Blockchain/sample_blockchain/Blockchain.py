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


    def create_slot(self):
        number_new_slot = str(len(blockchain_helpers.get_slot_list()) + 1)
        os.makedirs('./blocks/slot_' + number_new_slot)
        self.create_block()


    def create_list_wallets(self):
            wallets_list = tuple()
            block_list = blockchain_helpers.get_block_list()
            map(lambda: print('...'),    block_list)



    def create_block(self):
        slot_list = blockchain_helpers.get_block_list()
        if len(slot_list) >= 10: self.create_slot()
        last_block = blockchain_helpers.get_last_block()
        last_slot = blockchain_helpers.get_last_slot()
        number_of_new_block = blockchain_helpers.get_number_of_new_block()
        new_block = open('./blocks/' + last_slot + '/' + 'block_' + number_of_new_block + '.json', 'w+')
        print(last_block)
        block_list = blockchain_helpers.get_block_list()
        p_it_is_last_block_in_slot = len(block_list) == 10
        data = {
            "block_name": 'b_' + number_of_new_block,
            "hash_of_prev_block": self.get_hash_block(last_block) if last_block else self.get_hash_block('./blocks/' +  'slot_' + str(int(last_slot[-1]) - 1) + '/block_9'),
            "create_time": time.time(),
            "transactions": {
            }
        }
        new_block.write(json.dumps(data, indent=4))
        new_block.close()
        if p_it_is_last_block_in_slot: self.create_list_wallets()


    def check_privat_key(self, private_key, public_key):
        return blockchain_helpers.get_hash_sha512_for_text(private_key) == public_key


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
        'donor_public_key' : 'b2ea882c1a568c965251cf5daaaf7d1d42f1787549519bec184f02b81e71240267e77fd1103518733032c0b52a992598832fcf88d679426655d68d5a074df005',
        'repecient_public_key':  '7edcac46ae8edeb1ec2126e0f8dfb83e374e09d1d1b65a390cf0cf811bb2a2522d70edb9f9ad33d64305ea200bfccc799f29579b1cc2d90ebde0fb5ed93847ba',
        'transaction_ammount' : 1,
        'transaction_fee' : 0.00000002,

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
