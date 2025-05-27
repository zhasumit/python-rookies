# @property
# decorator -> define a method as a property
# accessed like an attribute
# add additional logic while Read, write, delete
# Gives getter and setter functionality


class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height

    # for getter we need _width.getter
    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        if value > 0:
            self._width = value
        else:
            print("Width must be positive")

    @property
    def height(self):
        return self._height

    @height.setter
    def height(self, value):
        if value > 0:
            self._height = value
        else:
            print("Height must be positive")

    @property
    def area(self):
        return self._width * self._height

    @property
    def perimeter(self):
        return 2 * (self._width + self._height)

    @width.deleter
    def width(self):
        del self._width
        print("Width deleted")

    @height.deleter
    def height(self):
        del self._height
        print("Height deleted")


rectangle = Rectangle(10, 20)
# _variable -> protected variable, not to be accessed directly, but can be
print(rectangle._width)  # 10
print(rectangle._height)  # 20

# Methods that are accessed like attributes
rectangle.width = 15
rectangle.height = 25

# But _variable should not be accessed directly
print(rectangle.width)  # 15
print(rectangle.height)  # 25

print(rectangle.area)  # 375
print(rectangle.perimeter)  # 80

del rectangle.width  # Width deleted
del rectangle.height  # Height deleted
