# Object : a bundle of related attributes (variables) and methods (functions)
# Eg: phone, book, cup
# class is needed to create many objects (like blueprint of what attributes object has)
# object is like a variable of the different values but class is plan for making it
# class : blueprint(used to design the structure and layout of the object)


class Car:
    def __init__(self, model, year, color, for_sale):
        self.model = model
        self.year = year
        self.color = color
        self.for_sale = for_sale

    def drive(self):
        print(f"You are driving the {self.color} {self.model}")

    def stop(self):
        print(f"You stopped the {self.color} {self.model}")

    def describe(self):
        print(f"{self.year} {self.color} {self.model}")


car1 = Car("Mustang", 2024, "red", "False")
car2 = Car("Ferrari", 2021, "yellow", "True")
car3 = Car("Bolero", 2022, "silver", "True")

print(car1.model)
print(car1.year)
print(car1.color)
print(car1.for_sale)

car2.drive()
car2.stop()

car3.describe()
