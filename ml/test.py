# ##
# import pickle
# import os
#
# ##
# dict = {
#     '버락 오바마': '오바마',
#     '도널드 트럼프': '트럼프'
# }
# with open('data.pkl', 'wb') as f:
#     pickle.dump(dict, f)
#
# ##
# with open('data.pkl', 'rb') as f:
#     my_dict = pickle.load(f)
#
# ##
# print(os.path.isfile('data.pkl'))
#
# ##
# a = {1,2,3}
# b = {2,3,4}
# a.union(b)
#
# ##
# a = {'a': 'b', 'c': 'd'}
# s = 'ac'
# print(list(map(lambda x: a[x], s)))