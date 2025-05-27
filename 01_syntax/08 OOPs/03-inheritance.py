# allows a cat to inherit from another class
# helps reusability of code and extensibility
# class Child(Parent)


class Animal:
    def __init__(self, name):
        self.name = name
        self.isalive = True

    def eat(self):
        print(f"{self.name} eats.")

    def sleep(self):
        print(f"{self.name} sleeps.")


class Dog(Animal):
    def bark(self):
        print(f"{self.name} WOOF!!!.")


class Cat(Animal):
    def meow(self):
        print(f"{self.name} MEOW!!!.")


class Dolphin(Animal):
    def squeak(self):
        print(f"{self.name} SQUEAK!!!.")


dog = Dog("Jaasi")
cat = Cat("Nier")
dolphin = Dolphin("Udon")

dog.sleep()

print(cat.isalive)
cat.eat()
cat.sleep()

dolphin.eat()


dog.bark()
cat.meow()
dolphin.squeak()

# child class is called subclass
# parent class is called superclass
