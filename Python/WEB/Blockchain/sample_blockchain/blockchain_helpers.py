import os, hashlib


def get_path_to_dir_blocks():
    return os.path.abspath(os.curdir) + '/blocks'


def get_slot_list():
    return sorted(os.listdir(get_path_to_dir_blocks()))



def get_last_slot():
    slot_list = get_slot_list()
    return 'slot_' + str((len(slot_list)))


def get_block_list():
    last_slot = get_last_slot()
    return os.listdir(get_path_to_dir_blocks() + '/' + last_slot)


def get_last_block():
    block_list = get_block_list()
    block_list = sorted(block_list, key=lambda block_i: int(block_i[0:-5][-1]))
    return  block_list[len(block_list) - 1] if (len(block_list) - 1) >= 0 else 0


def get_number_of_new_block():
     return str(len(os.listdir(get_path_to_dir_blocks() + '/' + get_last_slot())))



def get_hash_sha256_for_text(text):
        return hashlib.sha256().update(bytes(text, encoding='utf-8'))
            # hashlib.sha256(bytes(text)).hexdigest()


def get_hash_sha512_for_text(text):
    return hashlib.sha512().update(bytes(text, encoding='utf-8'))
        # hashlib.sha256(bytes(text)).hexdigest()