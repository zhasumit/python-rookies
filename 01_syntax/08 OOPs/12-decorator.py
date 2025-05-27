# decorator: function that takes another function as an argument
# and extends its behavior without modifying it
# doesnot modify the base function


def add_sprinkles(func):
    def wrapper():  # wrapper function
        print("Adding sprinkles")

        func()

    # we are returning the entire function (not variable)
    return wrapper


def add_chocolate(basefunc):
    def wrapper():
        print("Adding chocolate")
        basefunc()

    return wrapper


# add the decorator before the function
@add_sprinkles
@add_chocolate
def get_icecream(flavor):
    print(f"Here is your {flavor} Ice cream")


get_icecream("vanilla")  # Here is your Ice cream


# wrapper function
# it helps to execute function when called
# if removed, it will immediately execute the function
