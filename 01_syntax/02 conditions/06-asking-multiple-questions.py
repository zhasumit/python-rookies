x = int(input("x : "))
y = int(input("y : "))


# or and are used to connect multiple logics
if x < y or x > y:
    print(x, "NOT equal to", y)
else:
    print(x, "IS equal to", y)


# refining the design to a simpler question
if x == y:
    print(x, "IS equal to", y)
else:
    print(x, "NOT equal to", y)


# other way is
if x != y:
    print(x, "NOT equal to", y)
else:
    print(x, "IS equal to", y)


# indentations and colon are NECESSARY
