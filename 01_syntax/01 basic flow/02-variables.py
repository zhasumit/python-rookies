# VARIABLES
# variable: a container for a value
# integer, float, string, boolean
# contains the values and gives values when called

# Strings
first_name = "Sumit"
last_name = "Jha"
full_name = first_name + " " + last_name
print(full_name)  # concatenation

food = "Pizza"

# so f"" is formatted string
# can put variables inside the string
# f"{variable_name}"
print(f"Hello {first_name} {last_name}")
print(f"you like {food}, great choice!")


# taking multiline in string
multiline = '''
Hey, how are you?
            I was just checking in...
    All good?

'''
print(multiline)


# Integers
age = 24
quantity = 5
num_of_friends = 10
print(f"you are {age} years old")
print(f"you have {quantity} {food} in your fridge")
print(f"you have {num_of_friends} friends")


# Float
# float is a decimal number
price = 19.99
print(f"the price of {quantity} {food}s is {price}")

gpa = 3.8
distance = 10.5
print(f"You ran {distance} miles")


# Boolean
is_cool = True
is_tall = False
is_online = True
print(type(is_cool))  # to check the type of variable

if is_online:
    print("online")
else:
    print("offline")
