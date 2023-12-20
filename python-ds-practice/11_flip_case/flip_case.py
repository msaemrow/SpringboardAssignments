def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    # return phrase.replace('to_swap', 'to_swap'.upper())
    flipped_phrase = ''
    for letter in phrase:
        if letter.lower() == to_swap.lower():
            flipped_phrase += letter.swapcase()
        else:
            flipped_phrase += letter
    return flipped_phrase 