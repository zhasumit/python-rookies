menu = {
    "Popcorn": 70,
    "Chips": 80,
    "Lemonade": 90,
    "Soda": 100,
    "Ice cream": 120,
    "Fries": 150,
    "Nachos": 180,
    "Burger": 200,
    "Hot dog": 250,
    "Pizza": 300,
}


cart = []
total = 0

print(" ------------ MENU -------------")
for key, value in menu.items():
    print(f"{key:13}: {value:.2f} Rs")
print(" --------------------------------")

print("Enter items to buy")
print("q / Q to quit ...")
while True:
    food = input("Item: ").capitalize()
    if food == "Q":
        break
    elif food in menu:
        price = menu[food]
        cart.append(food)
        total += price
    else:
        print(f"{food} is not available in the menu")


print("------------- Your Order ---------------")
print(cart)
print(f"Total: Rs{total}")
