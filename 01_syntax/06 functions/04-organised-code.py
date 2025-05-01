def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b


def power(a, b):
    return a**b


def calculator(a, b, operation):
    if operation == "+":
        return add(a, b)
    elif operation == "-":
        return subtract(a, b)
    elif operation == "*":
        return multiply(a, b)
    elif operation == "/":
        return divide(a, b)
    elif operation == "^":
        return power(a, b)
    else:
        return "Invalid operation"


def main():
    a = float(input("a?: "))
    b = float(input("b?: "))
    print("In operations: +, -, *, /, ^")
    operation = input("operation?: ")

    result = calculator(a, b, operation)
    print(f"Result: {result}")


if __name__ == "__main__":
    main()
