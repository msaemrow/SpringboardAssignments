
def find_frequency(number_list):
    digits = {}
    for num in str(number_list):
        digits[num] = digits.get(num, 0) + 1
    return digits


def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    if find_frequency(str(num1))== find_frequency(str(num2)):
        return True
    else:
        return False
    
