let operator=[]
let operation=[]
let ans=0;
let division_by_zero=false

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
function check_input(clicked_id,input_value){
    const add=get_string("add");
    const multiply=get_string("multiply");
    if((multiply.includes(input_value.slice(input_value.length-1,input_value.length)) && multiply.includes(clicked_id)))
    {
        return input_value.slice(0,input_value.length-1)

    }
    if((add.includes(input_value.slice(input_value.length-1,input_value.length)) && add.includes(clicked_id)))
    {
        return input_value.slice(0,input_value.length-1)
    }
    if((input_value.slice(input_value.length-1,input_value.length)=="." && clicked_id=="."))
    {
        return input_value.slice(0,input_value.length-1)
    }
    if((multiply.includes(input_value.slice(input_value.length-1,input_value.length)) && clicked_id=="+"))
    {
        return input_value.slice(0,input_value.length-1)
    }
    if((add.includes(input_value.slice(input_value.length-1,input_value.length)) && multiply.includes(clicked_id)))
    {
        return input_value.slice(0,input_value.length-1)
    }
    return input_value
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
                var index=variables.map(e=>e[0]).indexOf(cont)
                if(cont=="Ans")
                {
                    arr.push(ans)
                }
                else if(index>-1)
                {
                    arr.push(variables[index][1])
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
        var index=variables.map(e=>e[0]).indexOf(cont)
        if(cont=="Ans")
        {
            arr.push(ans)
        }
        else if(index>-1)
        {
            arr.push(variables[index][1])
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
                a==0?division_by_zero=true:
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
    let text_exp=document.getElementById("textexp")
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
            if(result=="Infinity" && division_by_zero )
            {
                text_exp.placeholder=input.value+"="
                input.value=result
            }
            else if(isNaN(result))
            {
                text_exp.placeholder=input.value+"="
                input.value=""
                input.placeholder="Syntax Error"
                input.focus()
            }
            else{
                result=parseFloat(result.toFixed(4));
                $("document").ready(function(){
                    var v='<div class="his">'+'<i onclick="del(this.parentNode)" class="bi bi-trash3 historyicon"></i><h class="historytext">'+input.value+'='+result+'</h>'+'</div>'
                //    $('<p onclick:this.hide()>' +input.value+"="+result + '</p>').appendTo('.historyblock');
                    $(".historyblock").prepend(v)

                })
                text_exp.placeholder=input.value+"="
                input.value=result;
                ans=result;
                input.focus()
            }
        }
        else{
            text_exp.placeholder=input.value+"="
            input.value=""
            input.placeholder="Division by zero is impossible"
            input.focus()
        }

    }
    else{
        do_red()
    }

}




