# def is used to define the things


# () means no argument : is for some indentation
# indentation means everythin is inside the function
def hello():
    print("Hello ")


name = input("Name?: ")
hello()
print(name)


# parametrized function
# argument passed by user goes as copy to the parameter in function


def Hello(givenName="world ..."):
    givenName = givenName.capitalize()
    print(f"Hello, {givenName}")


# variables are destroyed after exit from function
# default value : if nothing is given -> use that default

Hello(name)
Hello()


# DRY - dont repeat yourself
# interpreter takes literally line by line
# define above where u wanna use it
