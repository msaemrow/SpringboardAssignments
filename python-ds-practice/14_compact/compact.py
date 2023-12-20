def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    # truthy_vals = []
    # for val in lst:
    #     if val:
    #         truthy_vals.append(val)
    # return truthy_vals

    return [val for val in lst if val]