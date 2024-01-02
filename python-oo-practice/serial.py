"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=1):
        """Creates a new serial number generator starting at the number passed in. Default start is 1"""
        self.start = start
        self.next = start
    
    def __repr__(self):
        return f"<SerialGenerator start={self.start}, next={self.next}>"
    
    def reset(self):
        """Resets serial number to the original start number passed in"""
        self.next = self.start
    
    def generate(self):
        """Generates the next serial number. Increments by 1"""
        self.next += 1
        return self.next -1


