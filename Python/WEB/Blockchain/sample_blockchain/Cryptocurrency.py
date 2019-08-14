import os, time, _thread
from Blockchain import Blockchain

class Cryptocurrency(Blockchain):
    def __init__(self):
        print('Cryptocurrency')

    def start_generate_blocks(self):

        while True :
            _thread.start_new_thread (self.create_block, tuple())
            time.sleep(10)


    def transaction(self):
        return








def main():
    cryptocurrency = Cryptocurrency()
    cryptocurrency.start_generate_blocks()



if __name__ == '__main__':
    main()


