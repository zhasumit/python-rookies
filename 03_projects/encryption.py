# substitution cypher
# using the same key we can decrypt the message

import random
import string

chars = string.punctuation + string.digits + string.ascii_letters + " "
chars = list(chars)
key = chars.copy()

# every time the key is shuffled
random.shuffle(key)

# print(f"chars: {chars}")
# print(f"key: {key}")


# Encryption
plain_text = input("Input your message: ")
cipher_text = ""

for letter in plain_text:
    index = chars.index(letter)
    cipher_text += key[index]

print(f"Original Message:  {plain_text}")
print(f"Encrypted Message: {cipher_text}")


# Decryption
cipher_text = input("Input your message: ")
plain_text = ""

for letter in cipher_text:
    index = key.index(letter)
    plain_text += chars[index]

print(f"Encrypted Message: {cipher_text}")
print(f"Original Message:  {plain_text}")
