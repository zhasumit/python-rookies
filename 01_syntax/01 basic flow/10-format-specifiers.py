# format specifiers
# format the value based on some context
# {value:flags}, depends on the flag what values are there

price1 = 3.14159
price2 = -984.345
price3 = 12.435
print(f"price1: {price1}")  # 3.14
print(f"price2: {price2}")  # -984.35
print(f"price3: {price3}")  # 12.44


# .(number)f = round to that many decimal places
print(f"price1: {price1:.2f}")  # 3.14
print(f"price2: {price2:.4f}")  # -984.3450
print(f"price3: {price3:.1f}")  # 12.4


# :(number)f = allocate that many spaces
print(f"price1: {price1:10}")  # gets spaces before price
print(f"price2: {price2:10}")
print(f"price3: {price3:10}")


# :03 = allocate and zero pad that many spaces (zero before the number)
print(f"price1: {price1:010}")  # 0003.14159
print(f"price2: {price2:010}")  # -00984.345
print(f"price3: {price3:010}")  # 000012.435


# :< = left align
print(f"price1: {price1:<10}")  # left align with total 10 spaces
print(f"price2: {price2:<10}")
print(f"price3: {price3:<10}")


# :> = right align
print(f"price1: {price1:>10}")  # right align with total 10 spaces
print(f"price2: {price2:>10}")
print(f"price3: {price3:>10}")


# :^ = center align
print(f"price1: {price1:^10}")  # center align with total 10 spaces
print(f"price2: {price2:^10}")
print(f"price3: {price3:^10}")


# :+ = show + sign to show positive values
print(f"price1: {price1:+}")  # +3.14
print(f"price2: {price2:+}")  # -984.35
print(f"price3: {price3:+}")  # +12.44


# :- = show - sign to show negative values
print(f"price1: {price1:-}")  # 3.14
print(f"price2: {price2:-}")  # -984.35
print(f"price3: {price3:-}")  # 12.44


price1 = 1234567890.9876543210
# :, = show comma separator for thousands
print(f"price1: {price1:,}")  # 1,234,567,890.9876543210

# we can mix different flags
print(
    f"price1: {price1:>+25,.2f}"
)  # right align, show + sign, comma separator, 2 decimal places
