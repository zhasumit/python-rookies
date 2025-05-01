# default arguments: default value for certain params
# used when value is ommited while calling
# makes function more flexible, reduces #arguments
import time


def net_price(list_price, discount=0, sales_tax=0.05):
    return list_price * (1 - discount) * (1 + sales_tax)


print(net_price(100))
print(net_price(100, 0.1))
print(net_price(100, 0.1, 0.02))


# non-default arguments must be before default arguments
def count(end, start=0):
    for x in range(start, end + 1):
        print(end-x) if end-x > 0 else print("Get Set!")
        time.sleep(1)
    print("Go!")


count(5)
count(5, 2)