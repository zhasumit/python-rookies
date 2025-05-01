# if : do something if condition is true
# else : do something if condition is false
# elif : do something if condition is true

age = int(input("Enter your age: "))

if age < 0:
    print("Not born yet?")
elif age > 60:
    print("Senior citizen.")
elif age > 120:
    print("Are you a vampire?")
elif age > 18:
    print("Adult.")
elif age > 10:
    print("Teenager.")
else:
    print("You are a child.")


# with strings
name = input("Enter your name: ")
if name == "":
    print("Yo bro, do you not have a name?")
else:
    print(f"Hello {name}.")


# with booleans
for_sale = True
if for_sale:
    print("For sale")
else:
    print("Not for sale")
