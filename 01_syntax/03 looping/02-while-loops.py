# cat meows 3 times
print("meow")
print("meow")
print("meow")

# just repeating the same function


# augment the vocabulary
# while some condn is true -> do something
i = 3
while i != 0:
    print("meow")
    i = i - 1  # some change is needed to stop loop eventually


# start with 0 (cause of general conventions)
i = 0
while i < 3:
    print("meow")
    i += 1  # another way to change values to initial value


# continue the loop while something is true
name = input("Enter your name: ")

while name == "":
    print("You didnot enter your name.")
    name = input("Enter your name: ")
print(f"Hello {name}.")


# infinite loop
# cannot get out of it (since no condition to break out)


# Example of infinite loop
# while True:
#     print("Hi")


# This has a condition where after entering q we get out of it
while True:
    print("Hello")
    # break
    quit = input("Enter q to quit: ")
    if quit == "q":
        print("Bye")
        break
    else:
        print("You didnot enter q.")
        # continues
