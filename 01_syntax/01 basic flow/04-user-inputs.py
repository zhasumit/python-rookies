# User input
# input()
# takes the user input and do something with that
# user input is always taken as string

name = input("Enter your name: ")
age = int(input("Enter your age: "))

print(f"Hello {name}, you are {age} years old.")
if age > 18:
    print("You are an adult.")
else:
    print("You are a minor.")


length = float(input("Enter the length of the rectangle: "))
width = float(input("Enter the width of the rectangle: "))
area = length * width
print(f"The area of the rectangle is {area}sq cm.")


# User input
# seperator changes to "___"
userName = input("Name ?: ")
print("Hello,", userName, sep="___")

# positional paramters -> depends on posn


