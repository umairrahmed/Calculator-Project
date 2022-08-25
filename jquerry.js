$(document).ready(function(){
        var input=document.getElementById("textinput")
        input.focus()
    $(document).keydown(function(e){
        if(e.which==13)
        {
            solve_expression();
            $(".historybox").hide()
            $(".variablebox").hide()

        }

    })
    $(".inp, .exp").click(function(){
        reply_click(this.value);
        $(".historybox").hide()
        $(".variablebox").hide()

    });
    $(".ac").click(function(){
        clear_input();
        $(".historybox").hide()
        $(".variablebox").hide()


    });
    $(".ce").click(function(){
        remove_input();
        $(".historybox").hide()
        $(".variablebox").hide()



    });
    $(".equal").click(function(){
        solve_expression();
        $(".historybox").hide()
        $(".variablebox").hide()
    });
    $(".leftclock").click(function(){
        $(".variablebox").hide()
        $(".historybox").animate({
        height: 'toggle'
        });
    });
    $(".save").click(function(){
        $(".historybox").hide()
        $(".variablebox").animate({
        height: 'toggle'
        });
    });
    $(".keybord, .input, .ans").click(function(){
        $(".historybox").hide()
        $(".variablebox").hide()
    });
    $(".add").click(function(){
        addvariable()
    });
});