let operator=[]
let operation=[]
let ans=0;
let history=[]
function factorial(num)
{
    if(num==0)
    {
        return 0
    }
    else if(num==1)
    {
        return 1
    }
    return num*factorial(num-1)
}
function get_string(what){
    if(what=="trignometry")
    {
        return ['sin','cos','tan']
    }
    else if(what=="add")
    {
        return ['+','-']
    }
    else if(what=="algebric")
    {
        return ['+','-','×','÷','sin','cos','tan','(',')','^','√','%','!']
    }
    else
    {
        return ['×','÷']
    }
}
function do_red(){
    let input=document.getElementById("textinput")
    input.style.color='red'
}
function check_input(clicked_id,inputvalue)
{
    const add=get_string("add");
    const multiply=get_string("multiply");
    if(!(multiply.includes(inputvalue.slice(inputvalue.length-1,inputvalue.length)) && multiply.includes(clicked_id)))
    {
        if(!(add.includes(inputvalue.slice(inputvalue.length-1,inputvalue.length)) && add.includes(clicked_id)))
        {
            if(!(inputvalue.slice(inputvalue.length-1,inputvalue.length)=="." && clicked_id=="."))
            {
                if(!(multiply.includes(inputvalue.slice(inputvalue.length-1,inputvalue.length)) && clicked_id=="+"))
                {
                    if(!(add.includes(inputvalue.slice(inputvalue.length-1,inputvalue.length)) && multiply.includes(clicked_id)))
                    {
                        return inputvalue
                    }
                    else{
                        return inputvalue.slice(0,inputvalue.length-1)
                    }
                }
                else{
                    return inputvalue.slice(0,inputvalue.length-1)
                }
            }
            else{
                return inputvalue.slice(0,inputvalue.length-1)
            }
        }
        else{
            return inputvalue.slice(0,inputvalue.length-1)
        }
    }
    else{
        return inputvalue.slice(0,inputvalue.length-1)

    }
}
function reply_click(clicked_id)
{
    let textexp=document.getElementById("textexp")
    textexp.placeholder="Ans="+ans
    const trignometry=get_string("trignometry");
    var input=document.getElementById("textinput")

    input.style.color='black'
    
    if(get_string("algebric").includes(clicked_id) && input.value==ans && input.value.length!=0)
    {
        input.value="Ans"
    }
    var position=input.selectionStart;
    if(position==0)
    {
        position=input.value.length;
    }
    if(clicked_id=="(" && !(get_string("algebric").includes(input.value[input.value.length-1])) && input.value.length!=0)
    {
        var previous_input=check_input(clicked_id,input.value)
        input.value=previous_input.slice(0,position)+"×"+clicked_id+previous_input.slice(position)
    } 
    else if(trignometry.includes(clicked_id))
    {
        // input.value=check_input(clicked_id,input.value)+clicked_id+"("
        var previous_input=check_input(clicked_id,input.value)
        input.value=previous_input.slice(0,position)+clicked_id+"("+previous_input.slice(position)
    }
    else{
        if(!(check_input(clicked_id,input.value).length==0 && ['+','÷','×'].includes(clicked_id)))
        {
            var previous_input=check_input(clicked_id,input.value)
            input.value=previous_input.slice(0,position)+clicked_id+previous_input.slice(position)
            // input.value=check_input(clicked_id,input.value)+clicked_id
        }
        else{
            input.value=""
        }

    }
    input.focus();
}
function remove_input(){
    let textexp=document.getElementById("textexp")
    textexp.placeholder="Ans="+ans
    let input=document.getElementById("textinput")
    input.style.color='black'
    var inputstr=input.value;
    var position=input.selectionStart;
    if(position==0)
    {
        position=inputstr.length;
    }
    if(inputstr.slice(position-1,position)=="(" && get_string("trignometry").includes(inputstr.slice(position-4,position-1)))
    {
        input.value=inputstr.slice(0,position-4)+inputstr.slice(position,inputstr.length);

    }
    else if(input.value=="Infinity" || input.value=="NaN" || input.value=="Ans")
    {
        input.value=""
    }
    else if(inputstr.slice(position-3,position)=="Ans")
    {
        input.value=inputstr.slice(0,position-3)+inputstr.slice(position,inputstr.length);
    }
    else
    {

        input.value=inputstr.slice(0,position-1)+inputstr.slice(position,inputstr.length);
    }
}
function clear_input()
{
    let input=document.getElementById("textinput")
    let textexp=document.getElementById("textexp")
    input.value="";
    input.placeholder=0;
    textexp.placeholder="Ans="+ans
    input.focus()
}
function evaluateinput(input){
    let stack=new Array()
    for(const element of input) {
        if(element=="("){
            stack.push(element)
        }
        else if(element==")" && stack.length!=0)
        {
            stack.pop()
        }
    };
    if(stack.length==0)
    {
        return true
    }
    else{
        return false
    }
}
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
function split_input(input){
    let arr=[]
    let cont=""
    for(let element of input){
        if(element=="*")
        {
            element="×"
        }
        else if(element=="/")
        {
            element="÷"
        }
        // else if(element=="e")
        // {
        //     element="2.7182"
        // }
        else if(element=="π")
        {
            element="3.1415"
        }
        if(get_string("algebric").includes(element))
        {
            if(element=="-" && arr.length==0 && cont=="")
            {
                cont+=element
            }
            else if(get_string("algebric").includes(arr[arr.length-1]) && arr[arr.length-1]!=")" && element=="-" && cont=="")
            {
                cont+=element
            }
            else if(cont!=""){
                if(cont=="Ans")
                {
                    arr.push(ans)
                }
                else if(cont=="e")
                {
                    arr.push("2.7182")
                }
                else
                {
                    arr.push(cont)
                }
                arr.push(element)
                cont=""
            }
            else{
                arr.push(element)
            }
        }
        else
        {
            cont+=element
        }
    }
    if(cont!="")
    {
        if(cont=="Ans")
        {
            arr.push(ans)
        }
        else if(cont=="e")
        {
            arr.push("2.7182")
        }
        else
        {
            arr.push(cont)
        }
    }
    return arr
}
function performcalculation(){
    let expresssion=operation.pop()
    if(get_string("trignometry").includes(expresssion))
    {
        let a=operator.pop()
        switch(expresssion){
            case "sin":
                operator.push(Math.sin(a))
                break;
            case "cos":
                operator.push(Math.cos(a))
                break;
            case "tan":
                operator.push(Math.tan(a))
                break;
        }
    }
    else if(expresssion=="(")
    {
        operation.push(expresssion)
    }
    else if(expresssion==='√')
    {
        let a=operator.pop()
        operator.push(Math.sqrt(a));
    }
    else if(expresssion=="%")
    {
        let a=operator.pop()
        operator.push(a/100)
    }
    else if(expresssion=="!")
    {
        let a=operator.pop()
        if(a<0)
        {
            operator.push(factorial(a*-1)*-1)
        }
        else{
            operator.push(factorial(a))
        }
    }
    else{
        let a=operator.pop()
        let b=operator.pop()
        switch(expresssion)
        {
            case '+':
                operator.push( parseFloat(a)+parseFloat(b))
                break;
            case '-':
                operator.push( b-a)
                break;
            case '×':
                operator.push( a*b)
                break;
            case '^':
                operator.push(Math.pow(b,a))
                break;
            case '÷':
                operator.push( b/a)
                break;



        }
    }
}

function sart_solving(data)
{
    operation=[]
    operator=[]
    for(const element of data){
        if(get_string("algebric").includes(element))
        {
            if(element!=")")
            {
                if(operation.length!=0 && precedence(element)<=precedence(operation[operation.length-1]) && (operation[operation.length-1]=='!' || operation[operation.length-1]=='%'))
                {
                    performcalculation()
                }
                if(operation.length!=0 && precedence(element)<=precedence(operation[operation.length-1]))
                {
                    performcalculation()
                }
                operation.push(element)
            }
            else{
                while(operation[operation.length-1]!="(")
                {
                    performcalculation();
                }
                operation.pop();
            }
        }
        else{
            if(parseFloat(element)!=NaN)
            {
                operator.push(element)
            }
            else{
                return "Error"
            }
        }
    }

    while(operation.length!=0)
    {
        performcalculation()
    }
    return operator[0]
}
function solve_expression()
{
    let input=document.getElementById("textinput")
    let textexp=document.getElementById("textexp")
    if(input.value=="")
    {
        return 0
    }
    else if(input.value==ans)
    {
        input.value="Ans"
    }
    if(evaluateinput(input.value))
    {
        let split_data=split_input(input.value)
        let result=sart_solving(split_data)
        if(operation.length==0 && operator.length==1)
        {
            if(result=="Infinity"  )
            {
                textexp.placeholder=input.value+"="
                input.value=result
            }
            else if(isNaN(result))
            {
                textexp.placeholder=input.value+"="
                input.value=""
                input.placeholder="Error"
            }
            else{
                result=parseFloat(result.toFixed(4));
                $("document").ready(function(){
                    var v='<div class="his">'+'<i onclick="del(this.parentNode)" class="bi bi-trash3 historyicon"></i><h class="historytext">'+input.value+'='+result+'</h>'+'</div>'
                //    $('<p onclick:this.hide()>' +input.value+"="+result + '</p>').appendTo('.historyblock');
                    $(".historyblock").prepend(v)

                })
                textexp.placeholder=input.value+"="
                input.value=result;
                ans=result;
                input.focus()
            }
        }
        else{
            textexp.placeholder=input.value+"="
            input.value=""
            input.placeholder="Error"
        }

    }
    else{
        do_red()
    }

}
function del(node)
{  
    node.remove()
}



