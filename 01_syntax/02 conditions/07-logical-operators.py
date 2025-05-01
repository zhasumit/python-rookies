# logical operator
# evaluate multiple conditions
# or  at least one of the conditions are true
# and both the conditions must be true
# not negate the condition (not False => True)

temp = 25
is_raining = False

if temp > 30 or is_raining:
    print("Event cancelled")
else:
    print("Event on")


username = "admin"
password = "admin"
if username == "admin" and password == "admin":
    print("Welcome admin")
else:
    print("Access denied")


# not operator
if not is_raining:
    print("Lets go for sunbathing")

if username != "admin":
    print("Access denied")
