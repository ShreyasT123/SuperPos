import random
import math
import base64
from sympy import mod_inverse

def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def generate_prime(bit_length):
    """Generate a random prime number with the specified bit length."""
    while True:
        p = random.getrandbits(bit_length)
        # Ensure the number is odd.
        if p % 2 == 0:
            p += 1
        if is_prime(p):
            return p

def generate_rsa_keypair():
    """
    Generate a custom RSA key pair.
    Here, two 16-bit primes are used to produce a 32-bit modulus (n).
    Returns: modulus n, public exponent e, private exponent d.
    """
    bit_length = 16  # Each prime is 16 bits to get a 32-bit key (n)
    p = generate_prime(bit_length)
    q = generate_prime(bit_length)
    while q == p:
        q = generate_prime(bit_length)
    
    n = p * q
    phi = (p - 1) * (q - 1)
    
    # Use a common public exponent; adjust if necessary
    e = 65537
    while math.gcd(e, phi) != 1:
        e += 1

    d = mod_inverse(e, phi)
    return n, e, d

def encrypt_message(message, e, n):
    """
    Encrypt the given message using RSA.
    The message is broken into chunks that fit within the modulus.
    Returns the encrypted message as a Base64 string.
    """
    # Determine maximum bytes per chunk (n has to be larger than the integer value)
    chunk_size = (n.bit_length() - 1) // 8
    message_bytes = message.encode('utf-8')
    encrypted_chunks = []

    for i in range(0, len(message_bytes), chunk_size):
        chunk = message_bytes[i:i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder='big')
        encrypted_int = pow(chunk_int, e, n)
        
        # Ensure each encrypted block is of fixed size based on modulus
        block_size = (n.bit_length() + 7) // 8
        encrypted_bytes = encrypted_int.to_bytes(block_size, byteorder='big')
        encrypted_chunks.append(encrypted_bytes)
    
    combined_encrypted = b''.join(encrypted_chunks)
    return base64.b64encode(combined_encrypted).decode('utf-8')

def main():
    print("==============================================")
    print("      RSA Encryption Program")
    print("==============================================\n")
    
    message = input("Enter the message to encrypt: ")
    
    # Generate a new RSA key pair (32-bit key)
    n, e, d = generate_rsa_keypair()
    
    # Encrypt the message (supports messages larger than one block)
    encrypted_message = encrypt_message(message, e, n)
    
    print("\n--------- Encryption Results ---------")
    print(f"Modulus (n): {n}")
    print(f"Public Exponent (e): {e}")
    print(f"Private Exponent (d): {d}")
    print(f"Encrypted Message (Base64):\n{encrypted_message}")
    print("--------------------------------------")

if __name__ == "__main__":
    main()