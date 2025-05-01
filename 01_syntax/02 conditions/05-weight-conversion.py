weight = float(input("Enter a weight"))
unit = input("Enter a unit (kg, lb): ")

if unit == "kg":
    weight = weight * 2.20462
    print(f"{weight} lbs")
elif unit == "lb":
    weight = weight / 2.20462
    print(f"{weight} kgs")
else:
    print(f"{unit} is an INVALID")
