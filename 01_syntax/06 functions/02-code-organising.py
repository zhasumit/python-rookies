def main():
    name = input("Name?: ")
    hello(name)
    hello()


def hello(username="world ..."):
    username = username.capitalize()
    print(f"hello, {username}")


main()


# even after putting down main calls the other function
# so order and organization of code is much nicer
# simply put the main part in main and call whatever function we want
# logic flows top -> bottom


# variables inside one func can be used there itself
# destroyed after function exectution
