# Hangman in python
import random


words = (
    "elephant", "giraffe", "zebra", "penguin", "dolphin", "kangaroo", "alligator", "squirrel", "jaguar", "rhinoceros",
    "hedgehog", "flamingo", "octopus", "butterfly", "tortoise", "gorilla", "leopard", "porcupine", "platypus", "koala",
    "apple", "banana", "mango", "coconut", "pineapple", "strawberry", "blueberry", "watermelon", "kiwi", "peach",
    "apricot", "cherry", "lemon", "orange", "grapefruit", "pomegranate", "raspberry", "blackberry", "grape", "papaya",
    "canada", "brazil", "australia", "france", "japan", "sweden", "egypt", "mexico", "thailand", "russia",
    "spain", "ghana", "turkey", "chile", "portugal", "morocco", "kenya", "peru", "ireland", "croatia",
    "soccer", "tennis", "basketball", "baseball", "volleyball", "cricket", "hockey", "rugby", "swimming", "cycling",
    "boxing", "golf", "archery", "skiing", "sailing", "bowling", "gymnastics", "surfing", "wrestling", "badminton",
    "purple", "orange", "yellow", "green", "blue", "violet", "indigo", "maroon", "scarlet", "turquoise",
    "magenta", "beige", "lavender", "crimson", "amber", "coral", "navy", "teal", "bronze", "silver",
    "guitar", "piano", "violin", "trumpet", "flute", "saxophone", "clarinet", "harmonica", "accordion", "cello",
    "drums", "banjo", "ukulele", "bagpipes", "xylophone", "harp", "mandolin", "trombone", "oboe", "tambourine",
    "teacher", "doctor", "firefighter", "engineer", "chef", "plumber", "scientist", "architect", "photographer", "carpenter",
    "mechanic", "electrician", "journalist", "lawyer", "dentist", "baker", "farmer", "pilot", "surgeon", "astronaut",
    "pizza", "burger", "spaghetti", "taco", "sushi", "pancake", "cookie", "sandwich", "lasagna", "croissant",
    "burrito", "noodles", "chocolate", "popcorn", "waffle", "pretzel", "donut", "cupcake", "kebab", "omelette",
    "jacket", "sweater", "trousers", "sneakers", "scarf", "gloves", "hat", "sunglasses", "belt", "necklace",
    "earrings", "bracelet", "shorts", "sandals", "umbrella", "backpack", "wallet", "vest", "boots", "hoodie",
    "sofa", "chair", "table", "lamp", "mirror", "refrigerator", "television", "microwave", "bookshelf", "curtain",
    "pillow", "blanket", "window", "carpet", "painting", "bathtub", "clock", "vase", "doorbell", "staircase"
)


# DICTIONARY of key
hangman_art = {
    0: ("   ", "   ", "   "),
    1: (" o ", "   ", "   "),
    2: (" o ", " | ", "   "),
    3: (" o ", "/| ", "   "),
    4: (" o ", "/|\\", "   "),
    5: (" o ", "/|\\", "/  "),
    6: (" o ", "/|\\", "/ \\"),
}


def display_hangman(wrong_guesses):
    for line in hangman_art[wrong_guesses]:
        print(line)


def display_hint(hint):
    print(" ".join(hint))


def display_answer(answer):
    print(" ".join(answer))


def main():
    answer = random.choice(words)
    hint = ["_"] * len(answer)
    wrong_guesses = 0
    guessed_letters = set()
    is_running = True

    while is_running:
        display_hangman(wrong_guesses)
        display_hint(hint)
        guess = input("Enter a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Invalid input")
            continue

        if guess in guessed_letters:
            print(f"{guess} already guessed")
            continue

        guessed_letters.add(guess)

        if guess in answer:
            for i in range(len(answer)):
                if answer[i] == guess:
                    hint[i] = guess
        else:
            wrong_guesses += 1

        if "_" not in hint:
            display_hangman(wrong_guesses)
            display_answer(answer)
            print("You WIN!!!")
            is_running = False
        elif wrong_guesses >= len(hangman_art) - 1:
            display_hangman(wrong_guesses)
            display_answer(answer)
            print("you loose...")
            is_running = False


if __name__ == "__main__":
    main()
