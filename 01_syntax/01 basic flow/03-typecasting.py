# Typecasting
# typecasting is converting one type to another
# str(), int(), float(), bool()
name = "Sumit Jha"
age = 24
gpa = 3.8
is_student = True

print(type(name))  # <class 'str'>
print(type(age))  # <class 'int'>
print(type(gpa))  # <class 'float'>
print(type(is_student))  # <class 'bool'>


gpa = int(gpa)  # converting float to int
print(type(gpa))  # <class 'int'>
print(gpa)  # 3


age = float(age)  # converting int to float
print(type(age))  # <class 'float'>
print(age)  # "24.0"


age = str(age)  # converting float to str
print(type(age))  # <class 'str'>
print(age)  # "24.0"


age += "1"
print(type(age))
print(age)  # "24.01"


# bool is simply true or false
# so if something is present -> 1 otherwise false
print(bool(name))  # name is present
print(bool(age))  # age is present
print(bool(gpa))  # gpa is present
print(bool(0))  # 0 is false
print(bool(""))  # empty string is false
print(bool(None))  # None is false
print(bool([]))  # empty list is false
print(bool({}))  # empty dictionary is false
print(bool(()))  # empty tuple is false
print(bool(set()))  # empty set is false
print(bool(True))  # True is true
print(bool(False))  # False is false
print(bool(1))  # 1 is true
print(bool(-1))  # -1 is true
print(bool(0.0))  # 0.0 is false
print(bool(0.1))  # 0.1 is true
print(bool(" "))  # empty string is false
print(bool("0"))  # "0" is true
print(bool("False"))  # "False" is true
print(bool("True"))  # "True" is true
print(bool(" "))  # empty string is false
