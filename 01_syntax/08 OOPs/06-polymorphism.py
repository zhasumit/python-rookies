# poly -> many, morph -> forms
# Polymorphism is having many forms or faces.

# Inheritance and duck typing are two ways to achieve polymorphism in Python.

from abc import ABC, abstractmethod


# An abstract class in Python is a class that can’t be instantiated directly
# some methods that must be implemented by any subclass. (only blueprint provided)
class Shape:
    def area(self):
        pass


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * (self.radius**2)


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side**2


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Pizza(Circle):
    def __init__(self, radius, toppings):
        super().__init__(radius)
        self.toppings = toppings

    # no need to implement area() method again (already in Parent, Circle)


# so like a circle is a circle and a shape
shapes = [Circle(4.5), Square(54), Rectangle(12, 5), Pizza(10, "pepperoni")]

for shape in shapes:
    # This is polymorphism in action
    print(f"Area: {shape.area()} cm^2")
