# Iterables:  An object/collection, return an element one at a time
#             if iterable, gets iterated in a loop

numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)


for num in reversed(numbers):
    print(num)


numbers = (1, 2, 3, 4, 5)
for num in numbers:
    print(num)


# sets
fruits = {"apple", "banana", "orange", "coconut", "mango"}
# sets are not reversible (so only the specific methods related to set would work)
for fruit in fruits:
    print(fruit)


# String
full_name = "Sumit Kumar Jha"
for character in full_name:
    print(character, end=" - ")
print()


# dictionary : key value pairs
my_dictionary = {"A": 1, "B": 2, "C": 3}

for key in my_dictionary:
    print(key)

for value in my_dictionary.values():
    print(value)

for key, value in my_dictionary.items():
    print(f"{key}: {value}")