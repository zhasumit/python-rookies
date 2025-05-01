# Tuple = () 
# ordered, unchangable, duplicates allowed, faster than lists

fruits = ('Mango', 'Apple', 'Grape', 'Coconut', 'Grape', 'Apple')
print(fruits)

print(len(fruits))

# only count and index are there 
print(fruits.count("Apple"))
print(fruits.count("Grape"))


print(fruits.index("Grape"))
print(fruits.index("Grape", 3)) # look after the third index

