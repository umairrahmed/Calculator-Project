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
function do_red(){
    let input=document.getElementById("textinput")
    input.style.color='red'
}
function del(node)
{  
    node.remove()
}