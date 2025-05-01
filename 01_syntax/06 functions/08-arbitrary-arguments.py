# *args : arguments               touple
# **kwargs : keyword arguments    dictionary


# * : unpacking operator
def simpleadd(a, b):
    return a + b


print(simpleadd(1, 3))


def add(*nums):
    print(type(nums))
    total = 0
    for num in nums:
        total += num
    return total


print(add(1, 4, 5, 2, 5, 6, 7))


def display_name(*args):
    for arg in args:
        print(arg, end=" ")
    print()


display_name("Sumit", "Sumant", "Prashant", "Nishant")


# for keyword arguments
def print_address(**kwargs):
    print(type(kwargs))
    # for key in kwargs.keys():
    #     print(key)
    # for value in kwargs.values():
    #     print(value)

    for key, value in kwargs.items():
        print(f"{key}: {value}")


print_address(street="123 Fake Street", city="Ramgarh", state="Jharkhand", zip="54321")


def shipping_label(*args, **kwargs):
    for arg in args:
        print(arg, end=" ")
    print()
    for value in kwargs.values():
        print(value, end=" ")
    print()


shipping_label(
    "Sumit",
    "Kumar",
    "Jha",
    street="123 Fake Street",
    city="Ramgarh",
    state="Jharkhand",
    zip="54321",
)
