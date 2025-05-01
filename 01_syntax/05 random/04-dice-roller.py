import random

dice_art = {
    1: ("┌─────────┐",
        "│         │",
        "│    ●    │",
        "│         │",
        "└─────────┘"),
    2: ("┌─────────┐",
        "│  ●      │",
        "│         │",
        "│      ●  │",
        "└─────────┘"),
    3: ("┌─────────┐",
        "│  ●      │",
        "│    ●    │",
        "│      ●  │",
        "└─────────┘"),
    4: ("┌─────────┐",
        "│  ●   ●  │",
        "│         │",
        "│  ●   ●  │",
        "└─────────┘"),
    5: ("┌─────────┐",
        "│  ●   ●  │",
        "│    ●    │",
        "│  ●   ●  │",
        "└─────────┘"),
    6: ("┌─────────┐",
        "│  ●   ●  │",
        "│  ●   ●  │",
        "│  ●   ●  │",
        "└─────────┘")
}

dice = []
total = 0
num_of_dice = int(input("How many dice do you want to roll? "))
for i in range(num_of_dice):
    die = random.randint(1,6)
    dice.append(die)
    total += die

print(f"Total: {total}")


for line in range(5): # print 5 rows
    for die in dice:
        print(dice_art.get(die)[line], end=" ") # line from respective dice
    print()
    
# for die in range(num_of_dice):
#     # since the dice is a 2d touple we loop through the lines
#     for line in dice_art.get(dice[die]):
#         print(line)
