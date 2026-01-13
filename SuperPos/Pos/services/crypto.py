import math
import random
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
        if p % 2 == 0:
            p += 1
        if is_prime(p):
            return p


def generate_rsa_keypair():
    """Generate an RSA key pair."""
    bit_length = 16
    p = generate_prime(bit_length)
    q = generate_prime(bit_length)
    while q == p:
        q = generate_prime(bit_length)

    n = p * q
    phi = (p - 1) * (q - 1)
    e = 65537
    while math.gcd(e, phi) != 1:
        e += 1
    d = mod_inverse(e, phi)
    return n, e, d


def encrypt_message(message, e, n):
    """Encrypt the message using RSA."""
    chunk_size = (n.bit_length() - 1) // 8
    message_bytes = message.encode("utf-8")
    encrypted_chunks = []
    for i in range(0, len(message_bytes), chunk_size):
        chunk = message_bytes[i : i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder="big")
        encrypted_int = pow(chunk_int, e, n)
        block_size = (n.bit_length() + 7) // 8
        encrypted_bytes = encrypted_int.to_bytes(block_size, byteorder="big")
        encrypted_chunks.append(encrypted_bytes)
    combined_encrypted = b"".join(encrypted_chunks)
    return base64.b64encode(combined_encrypted).decode("utf-8")


def factor_n(n):
    """Factor n using trial division (simulating Shor's algorithm)."""
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return i, n // i
    return None, None


def decrypt_message(encrypted_base64, d, n):
    """Decrypt the RSA-encrypted Base64 message."""
    # print(type(encrypted_base64))
    encrypted_bytes = base64.b64decode(encrypted_base64)
    chunk_size = (n.bit_length() + 7) // 8
    decrypted_chunks = []
    for i in range(0, len(encrypted_bytes), chunk_size):
        chunk = encrypted_bytes[i : i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder="big")
        decrypted_int = pow(chunk_int, d, n)
        decrypted_bytes = decrypted_int.to_bytes(
            (decrypted_int.bit_length() + 7) // 8, byteorder="big"
        )
        decrypted_chunks.append(decrypted_bytes)
    return b"".join(decrypted_chunks).decode("utf-8")
