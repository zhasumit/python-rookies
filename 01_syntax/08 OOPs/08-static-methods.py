# static methods: method belongs to class and not instance
# usually used for utility functions


# Instance methods: Best for operations on instance of class (objects)
# static methods: Best for utility functions that don't need access to class data
# somewhat like class variables (belongs to class)


class Employee:
    def __init__(self, name, position):
        self.name = name
        self.position = position

    def getinfo(self):
        return f"{self.name} is a {self.position}"

    @staticmethod
    def is_valid_position(position):
        valid_positions = ["Manager", "Developer", "Designer", "Tester", "HR", "Admin"]
        return position in valid_positions


# without creating an object we can check the position (since belongs to class)
# static methods are not bound to instance of class
print(Employee.is_valid_position("Manager"))  # True
print(Employee.is_valid_position("Rocket scientist"))  # False


# instance methods are specifically bound to instance of class
employee1 = Employee("Sanjiv", "Manager")
employee2 = Employee("Ravi", "Developer")
employee3 = Employee("Amit", "Designer")

print(employee1.getinfo())  # Sanjiv is a Manager
print(employee2.getinfo())  # Ravi is a Developer
print(employee3.getinfo())  # Amit is a Designer
