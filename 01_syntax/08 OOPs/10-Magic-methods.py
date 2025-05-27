# magic methods
# dunder methods (double underscore methods), __int__, __str__, etc.
# define or customize the behavior of objects


# automatically called by Python in certain situations
class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa

    # dunder method to represent object as string
    def __str__(self):
        return f"Student: {self.name}, gpa: {self.gpa}"

    def __eq__(self, other):
        return self.name == other.name

    def __gt__(self, other):
        return self.gpa > other.gpa

    def __lt__(self, other):
        return self.gpa < other.gpa


student1 = Student("Abhishek", 3.8)
student2 = Student("Kunal", 3.6)
student3 = Student("Parshant", 3.9)

print(student1)  # Student: Abhishek, gpa: 3.8
print(student2)  # Student: Kunal, gpa: 3.6
print(student3)  # Student: Parshant, gpa: 3.9

print(student1 == student2)  # False
print(student1 > student2)  # True
print(student1 < student2)  # False


class Book:
    def __init__(self, title, author, num_pages):
        self.title = title
        self.author = author
        self.num_pages = num_pages

    def __str__(self):
        return f"{self.title} by {self.author}, {self.num_pages} pages"

    def __eq__(self, other):
        return self.title == other.title and self.author == other.author

    def __gt__(self, other):
        return self.num_pages > other.num_pages

    def __lt__(self, other):
        return self.num_pages < other.num_pages

    def __add__(self, other):
        return f"{self.num_pages + other.num_pages} pages"

    def __contains__(self, key):
        return key in self.title or key in self.author

    def __getitem__(self, key):
        if key == "title":
            return self.title
        elif key == "author":
            return self.author
        elif key == "num_pages":
            return self.num_pages
        else:
            return None


# __init__ is here customizing the obejct behavior
book1 = Book("The Alchemist", "Paulo Coelho", 208)
book2 = Book("The Hobbit", "J.R.R. Tolkien", 310)
book3 = Book("Harry Potter", "J.K. Rowling", 500)
book4 = Book("The subtle art of not giving a f*ck", "Mark Manson", 224)
book5 = Book("The Power of Now", "Eckhart Tolle", 236)
book6 = Book("The Hobbit", "J.R.R. Tolkien", 1000)

# <__main__.Book object at 0x78099b53fbf0>
print(book1)  # some memory address

# wanna cusomize the behavior of book object when printed
print(book3)
print(book4)
print(book5)


print(book1 == book2)  # False
print(book2 == book6)  # using __eq__ method


# cannot use <, > directly, so use gt, lt
print(book1 > book2)  # False
print(book1 < book4)  # True


print(book1 + book2)  # 518
print(book1 + book3)  # 708
print(book1 + book4)  # 432


print("The" in book1)  # True
print("Paulo" in book1)  # True
print("Jimmy" in book1)  # False

print("f*ck" in book4)  # True
print("Manson" in book1)  # False


print(book1["title"])  # The Alchemist
print(book4["author"])  # Mark Manson
print(book5["num_pages"])  # 236
print(book1["publisher"])  # None
