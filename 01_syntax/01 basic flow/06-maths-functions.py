import math

x = 2.56
y = 4
z = 10

print(round(x))  # round to nearest integer (3)
print(round(x, 1))  # round to 1 decimal place (2.6)
print(round(x, 2))  # round to 2 decimal places (2.56)
print(round(x, 3))  # round to 3 decimal places (2.56)
print(round(x, 0))  # round to 0 decimal places (3)
print(round(x, -1))  # round to -1 decimal places (0)


print(max(x, y, z))  # maximum value (10)
print(min(x, y, z))  # minimum value (2.56)
print(pow(x, y))  # power (2.56^4 = 42.94967295)


print(math.pi)
print(math.e)
print(math.sqrt(16))  # square root (4.0)
print(math.factorial(5))  # factorial (120)
print(math.floor(x))  # floor (2)
print(math.ceil(x))  # ceil (3)
print(math.log(x))  # natural logarithm (0.940)
print(math.log10(x))  # base 10 logarithm (0.408)


print(math.gcd(z, y))  # greatest common divisor (1)
print(math.lcm(z, y))  # least common multiple (8)


print(math.trunc(x))  # truncate (2)
print(math.remainder(x, y))  # remainder (2.56)


# calculate the area of a circle
radius = float(input("Enter the radius of O: "))
print("Area", round(math.pi * radius**2, 2), "sq units")
print("Perimeter", round(2 * math.pi * radius, 2), "units")
