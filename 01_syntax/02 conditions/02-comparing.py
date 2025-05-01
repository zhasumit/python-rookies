x = int(input("x : "))
y = int(input("y : "))


# paranthesis is not important
# indentation is the brackets in python
if x < y:
    print(x, "is less than", y)
if x > y:
    print(x, "is greater than", y)
if x == y:
    print(x, "is greater than", y)


# poor design : since checks all the possibilities
# it is repetitive (once figure one dont figure other part)


# elif : else if -> check otherwise
# improvements for longer term
if x < y:
    print(x, "is less than", y)
elif x > y:
    print(x, "is greater than", y)
elif x == y:
    print(x, "is greater than", y)


# else is for if only one possibility is left for the cases
if x < y:
    print(x, "is less than", y)
elif x > y:
    print(x, "is greater than", y)
else:
    print(x, "is greater than", y)
