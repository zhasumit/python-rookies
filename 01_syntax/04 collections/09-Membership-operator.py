# Membership operaor:
# used to test whether a value or a sequence is found in the iterables
# Iterables: (String, list, tuple, set, dictionary)
# 1. in
# 2. not in


def find_word(word, sentence):
    if word in sentence:
        print("YO !!!")
    else:
        print("Nope")


sentence = "An Apple a day keeps the doctor away"
find_word("apple", sentence)


sentence = "An apple a day keeps the doctor away"
find_word("apple", sentence)


set_of_students = {
    "Sameer",
    "Amit",
    "Anand",
    "Abhishek",
    "Kaushal",
    "Sumit",
    "Sumant",
    "Sushma",
}


def find_student(student):
    return True if student in set_of_students else False


print(find_student("Sumit"))
print(find_student("Arnab"))
print(find_student("Kaushal"))
print(find_student("Himanshu"))
print(find_student("Sumant"))


# not in : simply negates the situation as commonly understandable
student_with_marks = {
    "Sameer": 98,
    "Amit": 94,
    "Anand": 53,
    "Abhishek": 88,
    "Kaushal": 68,
    "Sumit": 83,
    "Sumant": 100,
    "Sushma": 53,
}


def find_marks(student):
    if student in student_with_marks:
        return student_with_marks[student]
    else:
        return "Not Found"


print(find_marks("Sumit"))
print(find_marks("Arnab"))
print(find_marks("Kaushal"))
print(find_marks("Himanshu"))
print(find_marks("Sumant"))


def check_valid_email(email):
    return True if "@" in email and "." in email else False


print(check_valid_email("sudo.coder@fakemail.com"))
print(check_valid_email("sudo.coder#fakemail.com"))
