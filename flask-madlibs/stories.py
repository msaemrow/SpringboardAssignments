"""Madlibs Stories."""



class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, code, title, words, text):
        """Create story with words and template text."""

        self.code = code
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story1 = Story(
    "adventure",
    "Travel to a new place",
    ["place", "noun", "verb", "adjective", "noun_2", "noun3", "person_name", "verb_2"],
    """Have you ever wanted to visit {place}? If you go there, you will find a large {adjective} {noun}. Otherwise you can {verb} to the {noun_2} where you can buy {noun3}. Don't get to close to {person_name}, sometimes they {verb_2}."""
)

story2 = Story(
    "poem",
    "Create your own poem!",
    ["adjective", "plural_noun", "plural_noun_2", "adjective_2"],
    """Roses are {adjective}. {plural_noun} are blue. {plural_noun_2} are {adjective_2}. And so are you!"""
)

story3 = Story(
    "fishing",
    "Create a fishing story!",
    ["person_name", "plural_noun", "shape_name", "number", "type_of_fish", "adjective", "noun_2"],
    """One day I went fishing with {person_name}. There were lots of {plural_noun} at {shape_name} Lake. We decided to fish anyways. We caught {number} {type_of_fish}. They were very {adjective}. Right as we were about to leave I dropped my {noun_2} in the lake."""
)

stories = {s.code: s for s in [story1, story2, story3]}