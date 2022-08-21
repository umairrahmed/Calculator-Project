$(document).ready(function(){
        var input=document.getElementById("textinput")
        input.focus()
    $(document).keydown(function(e){
        if(e.which==13)
        {
            solve_expression();
            $(".historybox").hide()
        }

    })
    $(".inp, .exp").click(function(){
        reply_click(this.value);
        $(".historybox").hide()
    });
    $(".ac").click(function(){
        clear_input();
        $(".historybox").hide()

    });
    $(".ce").click(function(){
        remove_input();
        $(".historybox").hide()

    });
    $(".equal").click(function(){
        solve_expression();
        $(".historybox").hide()

    });
    $(".leftclock").click(function(){
        $(".historybox").animate({
        height: 'toggle'
        });
    });
    $(".keybord, .input, .ans").click(function(){
        $(".historybox").hide()
        });
});