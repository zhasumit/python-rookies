# collections: single variable holding multiple values
# List = [] ordered, changable, allows duplicates
# set = {} unordered, unchnagable, unindexed, no duplicates
# tuple = () ordered, unchangable, allows duplicates

fruit = "apple"
print(fruit)


fruits = ["Apple", "Banana", "Coconut", "Grape"]
print(fruits)
print(fruits[0])  # first element
print(len(fruits))  # length of the list


print("---------------")
for fruit in range(len(fruits)):
    print(fruits[fruit])  # prints all elements in the list


print("---------------")
for fruit in fruits:
    print(fruit)  # prints all elements in the list

print(fruits[::-1])  # prints reverse order


# Find if present using (in)
print("Pineapple" in fruits)  # returns False
print("Apple" in fruits)  # returns True


fruits[0] = "Mango"  # change first element
print("Apple" in fruits)  # returns False


# different methods for the collection
# print(dir(fruits)) # shows all the methods available for the list
# print(help(fruits)) # shows all the methods available for the list


print("---------------")
fruits.append("Kiwi")  # add to the end of the list
print(fruits)


fruits.insert(1, "Orange")  # add to the index 1
fruits.remove("Banana")  # remove the first occurrence of the value
print(fruits)


fruits.pop()  # remove the last element
print(fruits)


fruits.reverse()  # reverse the list
print(fruits)


fruits.sort()  # sort the list
print(fruits)


print(fruits.index("Orange"))  # find the index of the value
print(fruits.count("Grape"))  # count the number of occurrences of the value


fruits.clear()  # clear the list
print(fruits)  # prints []
