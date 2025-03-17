import math
import base64
import time
from sympy import mod_inverse

def factor_n(n):
    """
    Factor the modulus n using a simple trial division.
    This simulates Shor's algorithm's key step of factoring.
    Returns the two prime factors p and q.
    """
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return i, n // i
    return None, None

def decrypt_message(encrypted_base64, d, n):
    """
    Decrypt the RSA-encrypted Base64 message using private exponent d and modulus n.
    Returns the original message as a UTF-8 string.
    """
    encrypted_bytes = base64.b64decode(encrypted_base64)
    # Determine the size of each encrypted block (in bytes)
    chunk_size = (n.bit_length() + 7) // 8  
    decrypted_chunks = []

    for i in range(0, len(encrypted_bytes), chunk_size):
        chunk = encrypted_bytes[i:i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder='big')
        decrypted_int = pow(chunk_int, d, n)
        # Convert decrypted integer back to bytes
        decrypted_bytes = decrypted_int.to_bytes((decrypted_int.bit_length() + 7) // 8, byteorder='big')
        decrypted_chunks.append(decrypted_bytes)
    
    combined_decrypted = b''.join(decrypted_chunks)
    return combined_decrypted.decode('utf-8')

def main():
    print("==============================================")
    print(" RSA Decryption via Simulated Shor's Algorithm")
    print("==============================================\n")
    
    encrypted_message = input("Enter the Base64 encoded encrypted message: ")
    n = int(input("Enter the modulus (n): "))
    e = int(input("Enter the public exponent (e): "))
    
    # Start timing the simulated Shor's algorithm approach
    start = time.perf_counter()
    
    # Factor n to get p and q (simulating the quantum factoring step)
    p, q = factor_n(n)
    if p is None:
        print("Error: Failed to factor the modulus n.")
        return
    
    # Compute phi(n) and derive the private exponent d
    phi = (p - 1) * (q - 1)
    d = mod_inverse(e, phi)
    
    # Use the derived private key to decrypt the message
    decrypted_message = decrypt_message(encrypted_message, d, n)
    end = time.perf_counter()
    time_taken = end - start

    print("\n--------- Decryption Results ---------")
    print("Decrypted Message:", decrypted_message)
    print(f"Time Taken for Decryption using simulated Shor's algorithm: {time_taken:.8f} seconds")
    print("--------------------------------------")

if __name__ == "__main__":
    main()