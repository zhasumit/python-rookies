# execute a block of code for a number of times

for x in range(1, 10):
    print(x)  # 1 to 9 (second number is exclusive)
print("------------------")


for counter in reversed(range(1, 11)):
    print(counter)
print("Happy New Year")
print("------------------")


for x in range(1, 10, 2):
    print(x)  # 1, 3, 5, 7, 9 (step of 2)
print("------------------")


credit_card = "1234-5678-9012-3456"
for digit in credit_card:
    print(digit)  # prints each digit of the credit card number
print("xxxx-xxxx-xxxx-" + credit_card[-4:])  # prints the last four digits


# continue and break
# continue goes to the next iteration
# break exits the loop
print("------------------")
for x in range(1, 10):
    if x == 5:
        continue
    print(x)  # prints all numbers except 5

print("------------------")
for x in range(1, 100):
    if x == 13:
        print("Found 13")
        break  # exits the loop when x is 13
    print(x)


