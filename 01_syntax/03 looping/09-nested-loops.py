# loop inside of loop
# outer loop
#     inner loop
#         inner inner loop

for x in range(1, 3):
    for y in reversed(range(1, 11)):
        print(y, end=" ")
    print()


length = int(input("Enter length: "))
width = int(input("Enter width: "))

for wid in range(width):
    for len in range(length):
        print("▄", end=" ")
    print()



# Nested loop for each person each task or actions
names = ["Sumit", "Sumant", "Rohan"]
actions = ["eats", "codes", "sleeps"]
print()
for name in names:
    for action in actions:
        print(f"{name} {action}")

print()
for action in actions:
    for name in names:
        print(f"{name} {action}")
