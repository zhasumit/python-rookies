# float (decimal-type)
x = float(input("x : "))
y = float(input("y : "))
print(x+y)


# methods (round) -> get to the nearest integer
# round(number[, ndigits]) giving num of digits
z = round(x+y)
print(z)


# big numbers
# adding seperators to the number while printing
x = 999999
y = 1
z = (x+y)
print(f"{z:,}") # this is simply formatting after : (later)
# floats cannot be representing things infinitely correctly
# gives rounded value once ina while


x = 2
y = 3
print(x / y)

# rounds up upto 3 dec digits
z = round(x / y, 3)
print(z)


# another way to round things up
z = x / y
print(f"{z:.4f}")


# ------------------------------------------
# complex data-type
# real and imaginary values
complex_value = 5+3j

print(complex_value)

print(complex_value.real)
print(complex_value.imag)

print(type(complex_value))
