# inherit from more than one parent class
# Child(Parent1, Parent2):


class Animal:
    def __init__(self, name):
        self.name = name
        self.isalive = True

    def eat(self):
        print(f"{self.name} eats.")

    def sleep(self):
        print(f"{self.name} sleeps.")


# Prey and Predator are both subclasses of Animal
class Prey(Animal):
    def flee(self):
        print(f"{self.name} flees.")


class Predator(Animal):
    def hunt(self):
        print(f"{self.name} hunts.")


class Rabbit(Prey):
    pass


class Hawk(Predator):
    pass


# since fish hunts smaller fishes and flees from larger fishes
class Fish(Prey, Predator):
    def swim(self):
        print("The fish swims.")


rabbit = Rabbit("Doli")
hawk = Hawk("Tami")
fish = Fish("Nemo")

hawk.hunt()
rabbit.flee()
# hawk.flee()  # doesnot have flee method

fish.hunt()  # hunts smaller fishes
fish.flee()  # flees from larger fishes
fish.swim()


# Animal    -> Prey     -> Rabbit
#                       -> Fish
#           -> Predator
#                       -> Fish
#                       -> Hawk


# multilevel : Animal -> Prey -> Rabbit
# multiple : Animal -> Prey, Predator
