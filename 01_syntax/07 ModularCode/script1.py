# if __name__ == '__main__':
# means only if the current code is there being executed
# Functions and modules can be taken somewhere else
# execute without executing the main body of the code

# if is imported in some module then does not execute the function


def fav_food(food):
    print(f"My favorite food is {food}")


def main():
    print("This is main")
    fav_food("pizza")
    print("Bye")


if __name__ == "__main__":
    main()
