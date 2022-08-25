 function precedence(symbol){
    switch(symbol){
        case '+':
        case '-':
            return 1
        case '×':
        case '÷':
            return 2
        case '^':
            return 3
        case 'sin':
        case 'cos':
        case 'tan':
            return 4
        case '√':
            return 5
        case '!':
        case '%':
            return 6
    }
    return 6
}


