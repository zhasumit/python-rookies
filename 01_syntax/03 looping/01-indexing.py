# accessing in the range using []
# [start:end:step]

credit_card = "1234-5678-9012-3456"

print(credit_card[0])  # 1
print(credit_card[1])  # 2
print(credit_card[2])  # 3

print(credit_card[0:4])  # 1234
# ending number is exclusive (not included)


# also can omit the first digit or last digit if starting or ending
print(credit_card[:4])  # 1234
print(credit_card[4:])  # 5678-9012-3456
print(credit_card[:]) # 1234-5678-9012-3456 (entire string)  


print(credit_card[5:9])


# negative index starts from the 
print(credit_card[-1]) # last digit
print(credit_card[-4]) # fourth last digit (-1 indexing)
print(credit_card[-4:]) # last four digits


# step hopping for iterations 
print(credit_card[::2])  # hops by one digits (alternate digits)
print(credit_card[::3])  # hops by two digits (every third digit)
print(credit_card[::-1])  # reverses the string (negative stepping)
print(credit_card[::-2])  # reverses the string and hops by one digit



# show the last four digits of the credit card number
print(f"xxxx-xxxx-xxxx-{credit_card[-4:]}")
