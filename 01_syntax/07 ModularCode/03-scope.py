# variable scope : where is the variable accessible
# scope resolution: (LEGB) -> Local -> Enclosed -> Global -> Built in


def func1():
    a = 1
    print(a)


def func2():
    b = 2
    print(b)


func1()
func2()

# variable inside the block the indentation are only visible in that
# NameError
# print(a)  # out of scope of function1
# print(b)  # out of scope of function2


# functions can look inside their home not in other function's home
# for this reason we pass arguments that make them familiar to variables


# Enclosed function within the function
def func3():
    c = 3
    print(c)

    def func4():
        c = 300
        d = 4
        print(c)  # first look inside func4 if not present then in func3
        print(d)

    func4()


func3()


def func5():
    e = 5

    def func6():
        print(e)  # LOCAL -> ENCLOSED

    func6()


func5()


# Global -> outside of the function in the program itself
x = 999


def func7():
    x = 1
    print(x)  # since Locally x present LOCAL

    def func8():
        x = 2
        print(x)  # since Locally x present LOCAL

    func8()


func7()


def func9():
    print(x)  # goes to global since no LOCAL or enclosed value present

    def func10():
        x = -10  # since Locally x present LOCAL
        print(x)

    func10()


func9()


def func11():
    x = -222

    def func12():
        print(x)  # even if global present takes parents variable (ENCLOSED)

    func12()


func11()


from math import e


def func13():
    e = 100  # since (locally present => LOCAL)
    print(e)


func13()


def func14():
    e = 101

    def func15():
        print(e)  # since not local -> goes for enclosed

    func15()


func14()

E = 103


def func16():
    def func17():
        print(E)  # since not in local or enclosed => Global

    func17()


func16()


def func18():
    print(e)  # local -> enclosed -> Global -> built-in (math import)

    def func19():
        print(e)  # local -> enclosed -> Global -> built-in (math import)

    func19()


func18()
