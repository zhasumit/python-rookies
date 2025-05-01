# excel spreadsheet
# table

fruits = ["Mango", "Apple", "Grape"]
vegetables = ["Carrot", "Potato", "Tomato", "Onion"]
meats = ["Chicken", "Mutton", "Fish"]

groceries = [fruits, vegetables, meats]
print(groceries)
# list inside a list groceries contains the fruits, veges, meats

print(groceries[0])  # get the first list
print(groceries[0][0])  # get the first element of the first list
print(groceries[1][2])  # get the third element of the second list
print(groceries[2][1])  # get the second element of the third list


for category in groceries:
    print(category)


Players = [
    ["A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O"],
]

# so every list is kind of the team for playing
for team in Players:
    print("Team: ", team)

for team in Players:
    for player in team:
        print(player, end=" ")
print()


# we can make a list of touples
list_of_touples = [(), (), ()]
touple_of_touples = ((), (), ())
touple_of_sets = ({}, {}, {})


num_pad = ((1, 2, 3), (4, 5, 6), (7, 8, 9), ("*", 0, "#"))
for row in num_pad:
    for num in row:
        print(num, end=" ")
    print()
