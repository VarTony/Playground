import os, time, _thread, blockchain_helpers
from Blockchain import Blockchain

class Cryptocurrency(Blockchain):
    def __init__(self):
        print('Cryptocurrency')

    def start_generate_blocks(self):
        while True :
            _thread.start_new_thread (self.create_block, tuple())
            time.sleep(5)


    def transaction(self, data_of_transaction):
        data_of_transaction.donor = blockchain_helpers.get_hash_sha512_for_text(data_of_transaction.donor)
        data_of_transaction.recipient = blockchain_helpers.get_hash_sha512_for_text(data_of_transaction.recipien)
        self.create_transaction(data_of_transaction)




def main():
    cryptocurrency = Cryptocurrency()
    cryptocurrency.start_generate_blocks()



if __name__ == '__main__':
    main()


