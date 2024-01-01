def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factor = []
    number = 1
    
    # my first attempt
    # ----------------------------------------
    # options = range(1, num + 1)

    # for number in options:
    #     if num % number == 0:
    #         factor.append(number)
    #     number = number + 1 
    # return factor    

    while number <= num:
        if num % number == 0:
            factor.append(number)
        number += 1
    return factor
