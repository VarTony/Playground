# Реализуйте функцию genDiff, которая возвращает ассоциативный массив, в котором каждому ключу из исходных массивов соответствует одно из четырех значений: added, deleted, changed или unchanged. Аргументы:

# Ассоциативный массив
# Ассоциативный массив
# Расшифровка:

# Added - ключ отсутствовал в первом массиве, но был добавлен во второй
# Deleted - ключ был в первом массиве, но отсутствует во втором
# Changed - ключ присутствовал и в первом и во втором массиве, но значения отличаются
# Unchanged - ключ присутствовал и в первом и во втором массиве с одинаковыми значениями


# $result = genDiff(
#     {'one' : 'eon', 'two' : 'two', 'four' : True},
#     {'two' : 'own', 'zero' : 4, 'four' : True}
# )
# // => {
# //     'one' : 'deleted',
# //     'two' : 'changed'
# //     'zero' : 'added',
# //     'four' : 'unchanged',
# // }


# ----------------------data----------------------------
dict1 = {'one': 'eon', 'two': 'two', 'four': True}
dict2 = {'two': 'own', 'zero': 4, 'four': True}


# -------------------------------------------------------


def genDiff(dict1, dict2):
    result = {}
    for key1 in dict1:
        for key2 in dict2:

            if key1 == key2 and dict1[key1] == dict2[key2]:
                result[key2] = 'unchanged'

            elif not key2 in dict1:
                result[key2] = 'added'

            elif key1 == key2 and dict1[key1] != dict2[key2]:
                result[key1] = 'changed'
            elif (not key2 in dict1):

                result[key1] = 'deleted'

    return result


print(genDiff(dict1, dict2))


