# get the values in set, lists and touples use then and solve the cart problem
foods = []
prices = []
total = 0

print("Enter Items to buy")
print("q / Q to quit adding ...")
while True:
    food = input("item: ")
    if food == "q" or food == "Q":
        break
    else:
        price = float(input(f"{food} price: "))
        prices.append(price)
        foods.append(food)

print("------------- cart ---------------")
for food, price in zip(foods, prices):
    print(f"{food}: {price}")

for price in prices:
    total += price

print(f"\nTotal price is {total}")
