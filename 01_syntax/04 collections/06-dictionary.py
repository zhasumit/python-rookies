# dictionary : collection of key-value pairs
# unordered, mutable, indexed, no duplicates

# dictionary = {}
# dictionary = dict() # empty dictionary (with no initial key-value pairs)
# dictionary = { key : value }

capitals = {
    "USA": "Washington",
    "India": "New Delhi",
    "Japan": "Tokyo",
    "China": "Beijing",
    "Russia": "Moscow",
}

# print(dir(dict))


# Getting values of the dictionary
print(capitals.get("USA"))  # get the value of the key
print(capitals["India"])

print(capitals.get("Nepal"))  # for ["Nepal"] it will return error


# add new key-value pair
capitals.update({"Nepal": "Kathmandu"})
capitals.update({"Germany": "Berlin"})


# remove the key-value pair
capitals.pop("Japan")
capitals.popitem()  # remove the last key-value pair (Germany here)


# update the value of the key
capitals.update({"USA": "Washington DC"})
print(capitals)


keys = capitals.keys()  # get all the keys
print(keys)  # it is a list (iterable)
for key in keys:
    print(key)


values = capitals.values()  # get all the values
print(values)


items = capitals.items() # get all the key-value pairs
print(items) # list of touples

for key, value in items:
    print(f"{key}: {value}")  # it is a tuple (key, value)

capitals.clear()  # remove all key-value pairs


# Usage
# contains keys and values
# list is set of values with index : 0, 1, 2, 3 ...

students = ["Harry", "Hermione", "Ron", "Drake"]
houses = ["Gryffindor", "Gryffindor", "Gryffindor", "Slytherin"]


# empty dictionary is {}
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Drake": "Slytherin",
}

# printing dictionaries
# allows to use key for indexing not 01234
print(students["Hermione"])
print(students["Harry"])
print(students["Ron"])
print(students["Drake"])


print()
# by design the loop iterates over the keys
for student in students:
    print(student, students[student], sep=" --> ")


print()
# adding more data to the dictionary
# list of dictionaries
# dictionaries contains words and meanings
# i.e. key and value pair of the words
students_list = [
    {"name": "Hermione", "house": "Gryffindor", "patronous": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronous": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronous": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronous": None},
    # None is used to signify absence of value (we can do "")
]

# same key (standard for data handling) for dict but diff values
for student in students_list:
    print(student["name"], student["house"], student["patronous"], sep=" ---> ")

# dict uses diff functions to handle the data
# abstraction : simplification of ideas
