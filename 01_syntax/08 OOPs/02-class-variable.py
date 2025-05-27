# class variables : Shared among all instances of the class
#                   Defined outside the constructor
#                   Allows to share data among all objects created from that class


class Student:
    graduating_year = 2024
    num_students = 0

    # self is used for current object but we are working with class
    # constructor initiates when object is made
    def __init__(self, name, age):
        Student.num_students += 1
        self.name = name
        self.age = age
    

student1 = Student("Abhishek", 25)
student2 = Student("Kunal", 23)
student3 = Student("Parshant", 22)


print(student1.name)
print(student1.age)


# class variables can be accessed using objects since shared
print(student1.graduating_year)
print(student2.graduating_year)
print(student3.graduating_year)


# but it is actually belonging to class (do not try it using object)
print(student2.num_students)  # here it does not make sense


print(Student.num_students)

print(
    f"The {Student.graduating_year} batch has {Student.num_students} students graduating"
)


# pass and ... are same (meant to define later)
# Here it means that it will come later for definition (pass)
class Hero:
    ...
