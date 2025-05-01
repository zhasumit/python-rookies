import time

timer = int(input("Enter a time in seconds: "))
print("Timer started")
for counter in range(timer, 0, -1):
    seconds = counter % 60
    minutes = (counter // 60) % 60
    hours = (counter // 3600) % 24

    print(f"{hours:02}:{minutes:02}:{seconds:02}")
    time.sleep(1)
