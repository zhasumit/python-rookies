students = ["Hermione", "Harry", "Ron"]

print(students)


# indexing into the list
print(students[0])
print(students[1])
print(students[2])


# iterate over a list ()
for student in students:
    print(student)


# len gives length of list
for i in range(len(students)):
    print(i + 1, students[i])


# list is a data-type (list of things)
# contains diff things in a bucket

for i in [0, 20, 3, 40]:
    print(i, "meow")


for i in range(3):
    print("meow")
# for a million meows do it for the range in 1 million

# pythonic things
# if count is nothing to do with the logic
# if count is only for the update -> we use single underscore _
for _ in range(5):
    print("wooof")


# real pythonic things to do looping with printing things (prints --Woof 3 times)
print("-- Woof\n" * 3, end="")


# loops are sometime used to take values unless a specific unit
# like take the positive value and prompt unless u get it
while True:
    n = int(input("Enter n?: "))
    if n > 0:
        break

for _ in range(n):
    print("bhaw ")
# This is something to do when and only user gives the value


# range with start, end, increment
for x in range(10, 104, 5):
    print(x)
# else happens if not for
else:
    print("Loop over")
