# class methods : bound to class
# allow operations related to class
# Takes (cls) as first argument, objects take self as first argument


class Student:
    count = 0
    total_gpa = 0

    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
        Student.count += 1
        Student.total_gpa += gpa

    # Instance method (since self is passed)
    def get_info(self):
        return f"{self.name} has a GPA of {self.gpa}"

    # class method
    @classmethod
    def get_count(cls):
        return f"Total number of students: {cls.count}"

    @classmethod
    def get_average_gpa(cls):
        if cls.count == 0:
            return 0
        return f"Avg GPA: {cls.total_gpa / cls.count:.2f}"

    # in case of objects it used to be self.radius (remember?)
    # well incase of class method it is cls.total_gpa here


student1 = Student("Abhishek", 3.8)
student2 = Student("Kunal", 3.6)
student3 = Student("Parshant", 3.9)

print(Student.get_count())
print(Student.get_average_gpa())

# Instance method : operations on instance (objects) (self as first argument)
# Static method : utility functions (no need to access class or instance data)
# class method : operations related to class itself (cls as first argument)
