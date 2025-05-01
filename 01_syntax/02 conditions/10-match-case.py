# match case : switch case in other languages
# alternatives for elif statements, execute for matching some values
# clearer and more readable syntax


def day_of_week(day):
    if day == 1:
        return "Sunday"
    elif day == 2:
        return "Monday"
    elif day == 3:
        return "Tuesday"
    elif day == 4:
        return "Wednesday"
    elif day == 5:
        return "Thursday"
    elif day == 6:
        return "Friday"
    elif day == 7:
        return "Saturday"
    else:
        return "No day like that"


print(day_of_week(4))
print(day_of_week("Pizza"))


# we simply close within a match case
def match_day_of_week(day):
    match day:
        case 1:
            return "Sunday"
        case 2:
            return "Monday"
        case 3:
            return "Tuesday"
        case 4:
            return "Wednesday"
        case 5:
            return "Thursday"
        case 6:
            return "Friday"
        case 7:
            return "Saturday"
        case _:
            return "No day like that"


print(match_day_of_week(3))
print(match_day_of_week(5))
print(match_day_of_week(7))
print(match_day_of_week(0))
print(match_day_of_week("Pizza"))


def is_weekend(day):
    match day:
        case "Saturday" | "Sunday":
            return True
        case "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday":
            return False
        case _:
            return "Invalid day"


print("Monday : ", is_weekend("Monday"))
print("Friday : ", is_weekend("Friday"))
print("Sunday : ", is_weekend("Sunday"))
print("Saturday : ", is_weekend("Saturday"))
print("Somwar : ", is_weekend("Somwar"))


# match is the word similar to switch in other languages
# implement house using name

name = input("Name?: ")
if name == "Harry":
    print("Gryffindor")
elif name == "Hermione":
    print("Gryffindor")
elif name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who... ?")


# putting multiple things in one check
if name == "Harry" or name == "Hermione" or name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who... ?")


# match and case is used to check the cases
match name:
    case "Harry":
        print("Gryffindor")
    case "Hermione":
        print("Gryffindor")
    case "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who... ?")
# not explicitly specified single underscore _


# tighening things with multiple match checks
# we do this using pipe symbol
match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who... ?")
