import random

lowest_num = 1
highest_num = 100

answer = random.randint(lowest_num, highest_num)

guesses = 5
print(f"Enter a number between {lowest_num} and {highest_num}\n")
while guesses >= 0:
    # check if number and then convert
    guess = input(f"Number: ")
    if guess.isdigit():
        guess = int(guess)
        guesses -= 1
        if guess < answer:
            print("Too low!")
        elif guess > answer:
            print("Too high!")
        else:
            print("Correct!")
            break

    else:
        print("NOT a number, NUMBER PLEASE")
        print(guesses, "guesses left")


print("The correct number was", answer)
if guesses < 0:
    print("You lose!")
else:
    print("You win!")
