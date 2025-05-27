# Another way to acheive polymorphism in Python is through duck typing.
# object must have minimum required methods and attributes
# "if it looks like a duck and quacks like a duck, it is a duck"


class Animal:
    alive = True


class Dog(Animal):
    def speak(self):
        print("Woof!")


class Cat(Animal):
    def speak(self):
        print("Meow!")


class Car:
    alive = False

    def speak(self):
        print("Vroom!")


animals = [Dog(), Cat(), Car()]

for animal in animals:
    animal.speak()
    print(f"Is it alive? {animal.alive}")
