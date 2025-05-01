# keyword arguments - arguments preceded by an identifier and an equal sign


# postional arguments - based on position what values are to be taken
def func(a, b, c):
    print(a, b, c)


func(1, 2, 3)  # 1 2 3


# keyword arguments - based on the name of the argument
def func(a, b, c):
    print(a, b, c)


func(c=3, a=1, b=2)  # 1 2 3


# keyword arguments - can be used to skip positional arguments
# positional arguments are always before keyword arguments
def func(a, b, c):
    print(a, b, c)


func(1, c=3, b=2)  # 1 2 3


for x in range(1, 11):
    print(x, end=" ")

print()
print("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", sep="--", end="\n")


def get_phone_numbers(country, area, first, last):
    return f"+{country}-{area}-{first}-{last}"

print(get_phone_numbers(1, 123, 456, 7890))