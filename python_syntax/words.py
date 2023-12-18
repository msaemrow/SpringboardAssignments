
def print_upper_words(words, must_start_with):
    """Take in a list of words and return only the words that start with the select letter(s)
    -   input case does not matter
    -   the words will be return in all caps
    """

    for word in words:
        for char in must_start_with:
            if(word.lower().startswith(char)):
                print(word.upper())



print_upper_words(["hello", "Hey", "goodbye", "yo", "yes"],
                   must_start_with={'a', 'h', 'y'})
