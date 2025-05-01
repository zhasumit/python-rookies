def main():
    n = get_Number()
    meow(n)


def get_Number():
    while True:
        n = int(input("n?: "))
        if n > 0:
            return n


def meow(num):
    for _ in range(num):
        print("woof")


main()
