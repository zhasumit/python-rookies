import random


rounds = 3

while rounds > 0:

    player = None
    options = ("rock", "paper", "scissor")
    option = random.choice(options)

    while player not in options:
        player = input("Enter rock, paper, or scissor: ")

    rounds -= 1
    print(f"Player: {player}")
    print(f"Computer: {option}")

    if player == option:
        print("It's a tie!")
    elif player == "rock" and option == "scissor":
        print("Player wins!")
    elif player == "paper" and option == "rock":
        print("Player wins!")
    elif player == "scissor" and option == "paper":
        print("Player wins!")
    else:
        print("Computer wins!")
