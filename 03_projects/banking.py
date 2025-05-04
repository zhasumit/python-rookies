# python banking program


def show_balance(balance):
    print(f"Balance: ${balance:.2f}")


def deposit():
    amount = float(input("Enter an amount to deposit: "))

    if amount < 0:
        print("Not a valid amount")
        return 0
    else:
        return amount


def withdraw(balance):
    amount = float(input("Enter an amount to withdraw: "))

    if amount > balance:
        print("Insufficient balance")
        print(f"Current balance {balance}")
        return 0
    elif amount < 0:
        print("Amount must be more than 0")
    else:
        return amount


def main():
    balance = 0
    is_running = True

    print("Banking program")
    print("1> show balance")
    print("2> Deposit")
    print("3> Withdraw")
    print("4> Exit")

    while is_running:
        choice = int(input("Enter choice (1..4): "))
        if choice == 1:
            show_balance(balance)
        elif choice == 2:
            balance += deposit()
        elif choice == 3:
            balance -= withdraw(balance)
        elif choice == 4:
            is_running = False
        else:
            print("Not a valid choice")

    print("Thank you! Have a nice day!")


if __name__ == "__main__":
    main()
