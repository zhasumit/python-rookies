# set = {}
# unordered, unchnagable, unindexed, no duplicates

fruits = {"Apple", "Coconut", "Grape", "Coconut", "Grape"}
print(fruits)


print(fruits)
# not ordered everytime the index will be different
# print(fruits[0])  # cannot do this since no indexing
# dir(fruits), help(fruits) to get the list of methods

print("Pineapple" in fruits)  # returns False
print("Apple" in fruits)  # returns True


# we cannot grab using indexing but can add, remove, find
fruits.add("Pomogranate")

print(fruits)

print(fruits.pop())  # remove a random element
print(fruits)


print(fruits.clear())  # remove all elements
print(fruits)  # empty set
