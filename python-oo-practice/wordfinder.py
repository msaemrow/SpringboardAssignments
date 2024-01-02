"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """Machine for finding random words from dictionary.
    
    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """
        
    def __init__(self,path):
        """Creates a new WordFinder object that searches the file path passed in"""
        dictionary_file = open(path)
        self.word_list = self.get_dictionary(dictionary_file)
        print(f"Words found: {len(self.word_list)}")

    def get_dictionary(self, file):
        """Creates a list of words from the file at the file path in the WordFinder"""
        return [word.strip() for word in file]

    def random_word(self):
        """Selects a random word from the list of words in the dictionary"""
        return random.choice(self.word_list)
    

class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.
    
    >>> swf = SpecialWordFinder("complex.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def get_dictionary(self, file):
        return [word.strip() for word in file
                    if word.strip() and not word.startswith('#')]