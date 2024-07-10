function createAccount(pin, amount=0) {
    let balance = amount;

    return {
        checkBalance: function(enteredPin){
            if(enteredPin === pin){
                return `$${balance}`;

            }else{
                return "Invalid PIN."
            }
        },
        deposit: function(enteredPin, depositAmt){
            if(enteredPin === pin){
                balance += depositAmt;
                return `Successfully deposited $${depositAmt}. Current balance: $${balance}.`;
            }else{
                return "Invalid PIN."
            }
        },
        withdraw: function(enteredPin, withdrawAmt){
            if(enteredPin === pin && withdrawAmt <= balance){
                balance -= withdrawAmt;
                return `Successfully withdrew $${withdrawAmt}. Current balance: $${balance}.`
            }else if(withdrawAmt > balance){
                return "Withdrawal amount exceeds account balance. Transaction cancelled."
            }
            else{
                return "Invalid PIN."
            }
        },
        changePin: function(oldPin, newPin){
            if(oldPin === pin){
                pin = newPin;
                return "PIN successfully changed!"
            } else{
                return "Invalid PIN."
            }
        }
    }
}

module.exports = { createAccount };
