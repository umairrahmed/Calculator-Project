variables=[]
function addvariable()
{
    $("document").ready(function(){
        var c='<form ><input class="name" type="text"  id="name" placeholder="VariableName">=<input class="value" type="text" id="value" placeholder="Value"><input onclick="savevariable(this.parentNode)" type="button" value="Add"></form>'
        $(".variableblock").prepend(c)
    })

}

function savevariable(parent){
    var name=document.getElementById("name").value
    var value=document.getElementById("value").value
    if(name!="" && parseFloat(value))
    {
        variables.push([name,value])
        parent.remove()
        showvariable(name,value)
    }
    else{
        alert("InvalidVariable Declaration")
        parent.remove()
    }
}
function showvariable(name,value){
    var v='<div class="his">'+'<i onclick="deletevariable(this.parentNode)" class="bi bi-trash3 historyicon"></i><h class="historytext">'+name+'='+value+'</h>'+'</div>'
    $(".variableblock").prepend(v)
}
function deletevariable(node){
    var text=node.textContent
    var data=text.split("=")
    var index=variables.map(e=>e[0]).indexOf(data[0])
    variables.splice(index,1)
    node.remove()
}
