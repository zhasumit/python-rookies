# Basic score checking only using and for checking range
# and operator
score = int(input("score : "))

if score >= 90 and score <= 100:
    print("Grade: A")
elif score >= 80 and score < 90:
    print("Grade: B")
elif score >= 70 and score < 80:
    print("Grade: C")
elif score >= 60 and score < 70:
    print("Grade: D")
elif score >= 50 and score < 60:
    print("Grade: E")
else:
    print("Grade: F")










# refining questions : asking lesser operators
# we can flip the signs in python
# 90 <= score, score >= 90 is the same
if 90 <= score and score <= 100:
    print("Grade: A")
elif 80 <= score and score < 90:
    print("Grade: B")
elif 70 <= score and score < 80:
    print("Grade: C")
elif 60 <= score and score < 70:
    print("Grade: D")
elif 50 <= score and score < 60:
    print("Grade: E")
else:
    print("Grade: F")









# TIGHTENING code
# lower <= x and x <= upper can be tightened to lower <= x < upper
# also we chain the things in python like we done on paper
# 90 <= x and x <= 95 so we can write 90 <= x <= 95 (just like paper)
if 90 <= score <= 100:
    print("Grade: A")
elif 80 <= score < 90:
    print("Grade: B")
elif 70 <= score < 80:
    print("Grade: C")
elif 60 <= score < 70:
    print("Grade: D")
elif 50 <= score < 60:
    print("Grade: E")
else:
    print("Grade: F")











# simplifying the logic more
# not ask multiple ask one if not then go to other question
# since the bigger number was already checked once why to check again
# get the ans so return the ans
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
elif score >= 50:
    print("Grade: E")
else:
    print("Grade: F")


# ask questions more mutual exclusive otherwise non-correct is executed



