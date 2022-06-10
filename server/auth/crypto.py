import jwt
from hashlib import sha256


CRYPTO_SECRET_KEY = 'shfi2w35E@#$%efa234asdfawq435d'

def jwt_encode(payload: dict):
    return jwt.encode(payload, CRYPTO_SECRET_KEY, algorithm='HS256')

def jwt_decode(token: str):
    return jwt.decode(token, CRYPTO_SECRET_KEY, algorithms=['HS256'])

def pswd(raw_password: str) -> str:
    """ Convert raw password to SHA256 hash string """
    return sha256(raw_password.encode()).hexdigest()