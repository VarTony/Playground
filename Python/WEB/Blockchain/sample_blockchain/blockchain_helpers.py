import os, hashlib


def get_path_to_dir_blocks():
    return os.path.abspath(os.curdir) + '/blocks'


def get_slot_list():
    return os.listdir(get_path_to_dir_blocks())



def get_last_slot():
    slot_list = get_slot_list()
    return 'slot_' + str((len(slot_list)))


def get_last_block():
    last_slot = get_last_slot()
    block_list = os.listdir(get_path_to_dir_blocks() + '/' + last_slot) #slot_list[len(slot_list)-1]
    print(block_list)
    return block_list[len(block_list) - 1]


def get_number_of_new_block():
     return str(len(os.listdir(get_path_to_dir_blocks() + '/' + get_last_slot())))



def get_hash_sha256_for_text(text):
        return hashlib.sha256().update(bytes(text, encoding='utf-8'))
            # hashlib.sha256(bytes(text)).hexdigest()


def get_hash_sha512_for_text(text):
    return hashlib.sha512().update(bytes(text, encoding='utf-8'))
        # hashlib.sha256(bytes(text)).hexdigest()