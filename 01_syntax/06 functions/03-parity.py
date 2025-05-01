# modulo symbol (remainder)
# we can return True and False depending on condition

def main():
    x = int(input("x : "))
    if is_even(x):
        print(x, "is Even")
    else:
        print(x, "is Odd")

    # pythonic function
    if isEven(x):
        print(x, "is Even")
    else:
        print(x, "is Odd")

    # elegant function
    if isItEven(x):
        print(x, "is Even")
    else:
        print(x, "is Odd")


def is_even(num):
    if num % 2 == 0:
        return True
    else:
        return False


# address cannot be passed
# everythin is passed as object

# based on return type of function
# we can apply methods on return values

# pythonic : way to do things in pythonic
# pythonic way to find isEven


def isEven(num):
    return True if num % 2 == 0 else False


# elegant ans organised idea
def isItEven(num):
    return num % 2 == 0


# ========================================


main()
