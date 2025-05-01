name = input("Enter your name: ")

print(len(name))
print(name.find("o"))
print(name.rfind("u"))
print(name.count("s"))
print(name.index("i"))

print(name.upper())
print(name.lower())
print(name.capitalize())
print(name.title())
print(name.strip())


print(name.replace("t", "T"))
print(name.startswith("t"))
print(name.endswith("t"))


phone_number = "1-234-567-890"
print(phone_number.split("-"))
print(phone_number.count("-"))
print(phone_number.replace("-", "_"))


print(name.islower())
print(name.isupper())
print(name.isnumeric())
print(name.isdecimal())


print(name.isalpha())
print(name.isdigit())
print(name.isalnum())
print(name.isnumeric())
print(name.isdecimal())
print(name.isidentifier())
print(name.isascii())


# Validate a username
# not more than 12 characters
# no spaces
# no digits
username = input("Enter a username: ")

if len(username) > 12:
    print("Username is too long")
elif username.find(" ") != -1:
    print("Cannot contain spaces")
elif username.isalpha():
    print("Valid username")
else:
    print("VALID username")


name = "        sumit            "
print(f"Hey, {name}!! wassup")

# remove extra characters of str data-type
# this is a method . helps access methods
# methods are built in functions upon the DT
# = stores the right part to the left part (updation)
name = name.strip()
print(f"Hey, {name}!! wassup")
# removes from left and right not in between

# simply capitalizes the first initial of the str
name = name.capitalize()
print(f"Hey, {name}!! wassup")


name = "     sumit jha      "
print(f"Hey, {name}!! wassup")
# capitalizes the initial of the word
# methods are accessed from left to right
# methods can be chained (one after another)
name = name.strip().title()
print(f"Hey, {name}!! wassup")


# capitalise first letter every word
multiline = """
Hey, how are you?
            I was just checking in...
    All good?

"""

print(multiline.title())
print(multiline.replace("good", "ok"))

print("---------------------\n", multiline)


# length the string
print(len(multiline))


# concatenations
multiline += "                                "
multiline = "                                        " + multiline
print(len(multiline))


# remove whitespace from beg and end of the string
print("Original multiline  :", len(multiline))
print("Striping left side  :", len(multiline.lstrip()))
print("Striping right side :", len(multiline.rstrip()))
print("Striping both sides :", len(multiline.strip()))


# fill on the left or right for making even spacing

# left / right justify
# fill whatever is left or right with .
print("Coffee".ljust(20, ".") + "$1".rjust(5))
print("Cookies".ljust(20, ".") + "$1".rjust(5))
print("Muffin".ljust(20, ".") + "$2".rjust(5))
print("CheeseCake".ljust(20, ".") + "$4".rjust(5))
