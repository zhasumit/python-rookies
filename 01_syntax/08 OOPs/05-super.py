# super()
# function used in child class to call parent class methods
# temprorary object of parent class is created
# allows to extend the functionality of inherited methods


class Shape:
    def __init__(self, color, filled):
        self.color = color
        self.filled = filled

    def describe(self):
        print(f"It is {self.color} and {"filled" if self.filled else "not filled"}.")


# color and filled are common attributes
# if any other method is common, it can be called in child class using super()
class Circle(Shape):
    def __init__(self, color, filled, radius):
        # call the constructor of the parent class
        super().__init__(color, filled)
        self.radius = radius
        self.area = 3.14 * radius * radius

    # if a child contains the same method as parent, it overrides the parent method
    def describe(self):
        super().describe()  # call the parent class method
        print(f"It has a circule of area {self.area} unit^2")


class Square(Shape):
    def __init__(self, color, filled, width):
        super().__init__(color, filled)
        self.width = width
        self.area = width * width

    def describe(self):
        super().describe()
        print(f"It has a square of area {self.area} unit^2")


class Rectangle(Shape):
    def __init__(self, color, filled, width, length):
        super().__init__(color, filled)
        self.width = width
        self.length = length
        self.area = width * length

    def describe(self):
        super().describe()
        print(f"It has a rectangle of area {self.area} unit^2")


circle = Circle("red", True, 5)
print(circle.color)
print(circle.filled)
print(circle.radius)


square = Square(color="blue", filled=False, width=10)
print(square.color)


rectangle = Rectangle(color="green", filled=True, width=5, length=10)
print(rectangle.color)
print(rectangle.filled)
print(rectangle.width)
print(rectangle.length)


circle.describe()
square.describe()
rectangle.describe()
