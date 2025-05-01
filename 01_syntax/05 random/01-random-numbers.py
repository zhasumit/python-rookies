import random

for i in range(10):
    print(random.randint(1, 100))

low = 1
high = 100

number = random.randint(low, high)
print(f"Random number between {low} and {high}: {number}")


# between 0 and 1 the random number is returned by random.random()
print(random.random())  # number between 0 and 1


options = ("rock", "paper", "scissor")
option = random.choice(options)
print(option)


cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
random.shuffle(cards)
print(cards)
