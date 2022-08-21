function reply_click(clicked_id)
{
    let text_exp=document.getElementById("textexp")
    text_exp.placeholder="Ans="+ans
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
    if(clicked_id=="(" && !(['+','-','×','÷'].includes(input.value[input.value.length-1])) && input.value.length!=0)
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
    let text_exp=document.getElementById("textexp")
    text_exp.placeholder="Ans="+ans
    let input=document.getElementById("textinput")
    input.style.color='black'
    var input_str=input.value;
    var position=input.selectionStart;
    if(position==0)
    {
        position=input_str.length;
    }
    if(input_str.slice(position-1,position)=="(" && get_string("trignometry").includes(input_str.slice(position-4,position-1)))
    {
        input.value=input_str.slice(0,position-4)+input_str.slice(position,input_str.length);

    }
    else if(input.value=="Infinity" || input.value=="NaN" || input.value=="Ans")
    {
        input.value=""
    }
    else if(input_str.slice(position-3,position)=="Ans")
    {
        input.value=input_str.slice(0,position-3)+input_str.slice(position,input_str.length);
    }
    else
    {

        input.value=input_str.slice(0,position-1)+input_str.slice(position,input_str.length);
    }
    input.focus()
}
function clear_input()
{
    let input=document.getElementById("textinput")
    let text_exp=document.getElementById("textexp")
    input.value="";
    input.placeholder=0;
    text_exp.placeholder="Ans="+ans
    input.focus()
}