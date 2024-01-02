from triangle import Triangle

class ColoredTriangle(Triangle):
    
    def __init__(self,a,b,color):
        super().__init__(a,b)
        self.color = color
    
    def describe_self(self):
        msg = super().describe_self()
        return msg + f' I am {self.color}'