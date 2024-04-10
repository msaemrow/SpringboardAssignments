// Challenge 1
    // 2 stacks
        // forwardStack to store websites for forward navigation
        // backStack to store websites for backward navigation

    //function to navigate to a new site
    //function visitSite(url):
        //clear forwardStack
        //push url to backStack

    //function goBack():
        //if isEmpty(backStack):
            //alert("there are no previous website")
            //return

        //currentSite = pop(backStack)
        //push(currentSite, forwardStack)
        //visit(currentSite)

    //function goForward():
        //if isEmpty(forwardStack):
            //alert("there are no forward sites")
            //return
        //nextSite = pop(forwardStack)
        //push(nextSite, backStack)
        //visit(nextSite)

// Challenge 2 -------------------------------------------------------------
    // function reverseString(str)
        //charStack = new Stack
        
        //for each char c in str:
            //stack.push(str.chartAt(i))


        //let reverseStr = ''
        //while !charStack.isEmpty())
            //reverseStr += charStack.pop()

        //return reverseStr;

// Challenge 3 --------------------------------------------------------
    // function isBalanced(str):
    // stack = new Stack
    
    //for each char c in str:
        // if c is an opening bracket
            //push c onto stack
        // else if c is a closing bracket
            //if stack is empty:
            //     return unmatched bracket
            // else:
            //     top = stack.pop()
            //     if top does not match corresponding opening bracket for c:
            //         return mismatched bracket
    // if stack is not empty:
    //     return false (unbalance brackets)
    // else:
    //     return true (balance brackets)


//Challenge 4 ------------------------------------------------------------
//function josephusSurvivor(num, skip)
    //queue = create a new queue with elements from 1 to num

    //while queue has more than one element:
        //for i from 1 to skip:
            //dequeue an element from front of the queue and enuqueue it at the back
        // dequeue the from element from the queue
    // return the last element in the queue

//Challenge 5 ------------------------------------------------------------
// function evaluateExpression(expression):
//    - Initialize an empty stack to store operands.
//    - Reverse the expression and split the expression into elements using spaces as delimiters.
//    - Iterate through each elements in the expression:
//      - If the elements is an operand (a number), push it onto the stack.
//      - If the elements is an operator (+, -, *, /), pop the top two elements from the stack, perform the operation in the order of removal, and push the result back onto the stack.
//    - When there is only element left in the stack. Pop and return it.

// function isOperator(token):
//    - Check if the elements is one of the supported operators (+, -, *, /).

// function isOperand(token):
//    - Check if the elements is a numeric value.

// function polishNotationCalculator(expression):
//    - Call the evaluateExpression() function with the given expression as input.