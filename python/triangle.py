from math import sqrt
from random import randint

class Triangle:
    def __init__(self, a,b):
        self.a = a
        self.b = b
    
    @classmethod
    def random(cls):
        return cls(randint(1,20),randint(1,20))

    def get_hypotenuse(self):
        return sqrt(self.a ** 2 + self.b ** 2)
    
    def get_area(self):
        return self    
    
    def describe_self(self):
        return f"I am a triangle with sides: {self.a}, {self.b}."