# List comprehension
# concise way to create lists in python
# compact and easy to read than traditional loop
# [expression for value in iterable if condition]


doubles = []
for x in range(1, 11):
    doubles.append(x * 2)

print(doubles)


tripled = [x * 3 for x in range(1, 11)]
print(tripled)


squared = [x * x for x in range(1, 11)]
print(squared)


fruits = ["apple", "orange", "banana", "mango", "coconut"]
fruits = [fruit.upper() for fruit in fruits]
print(fruits)


numbers = [16, -4, 3, 5, -54, 3, 23, -9, 10, 34]
positive_numbers = [num for num in numbers if num >= 0]
negative_numbers = [num for num in numbers if num < 0]
even_numbers = [num for num in numbers if num % 2 == 0]
odd_numbers = [num for num in numbers if num % 2 != 0]

print(positive_numbers)
print(negative_numbers)
print(even_numbers)
print(odd_numbers)
