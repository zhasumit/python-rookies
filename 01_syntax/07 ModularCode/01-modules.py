# module:
# file containing code to be included in program
# use import to include module (built in or your own)
# useful to break up a large program reusable separate files


# get information about the module functions
# print(help("math"))
# print(help("random"))


import math as m  # for renaming the module

print(m.pi)


from math import pi  # now pi can be directly accessible

print(pi)
