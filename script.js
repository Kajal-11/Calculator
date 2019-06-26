let display = document.getElementById("display");
let buttons = document.getElementsByClassName("btn");

let operations="0";
let mr = "0";

for(let i = 0; i < buttons.length; i++)
{
    let button = buttons[i];

    button.addEventListener("click", function(){operation(button)});
}

document.addEventListener("keydown", function(event){
    if(event.key == "0")
        operation(buttons[20]);
    else if(event.key == "1")
        operation(buttons[16]);
    else if(event.key == "2")
        operation(buttons[17]);
    else if(event.key == "3")
        operation(buttons[18]);
    else if(event.key == "4")
        operation(buttons[12]);
    else if(event.key == "5")
        operation(buttons[13]);
    else if(event.key == "6")
        operation(buttons[14]);
    else if(event.key == "7")
        operation(buttons[8]);
    else if(event.key == "8")
        operation(buttons[9]);
    else if(event.key == "9")
        operation(buttons[10]);
    else if(event.key == "Backspace")
        operation(buttons[5]);
    else if(event.key == "/")
        operation(buttons[6]);
    else if(event.key == "*")
        operation(buttons[7]);
    else if(event.key == "-")
        operation(buttons[11]);
    else if(event.key == "+")
        operation(buttons[15]);
    else if(event.key == "=" || event.key == "Enter")
        operation(buttons[22]);
    else if(event.key == ".")
        operation(buttons[21]);
        
});

function operation(button){
    switch(button.classList.contains("number")){
        case true:
            if(typeof(operations) == "number")
                operations = "0";
            
            if(button.dataset.value === "."){
                for(let j = operations.length -1; j>=0 ; j-- )
                    switch(operations[j]){
                        case "+":
                        case "-":
                        case "*":
                        case "/":
                            for(let k = j+1; k < operations.length; k++){
                                if(operations[k] == "."){
                                    return
                                }
                            }
                        concatOperation(button);
                        display.innerHTML = operations;
                        return;
                    }
                for(let l = operations.length -1; l >= 0 ; l--)
                    if(operations[l] == ".")
                        return;
                    concatOperation(button);
            }
            
            else{
                concatOperation(button);
            }
            display.innerHTML = operations;
            break;


        case false:
            if(button.classList.contains("operator")){
                switch(operations[operations.length - 1]){
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                        callAction(buttons[5]); 
                    default:
                        concatOperation(button);
                }
                
                display.innerHTML = operations;
            }
            else if(button.classList.contains("action")){
                callAction(button);
                display.innerHTML = operations;
            }
            else{
                callMemory(button);
            }
    }



function concatOperation(button){
    if(operations === "0" && button.classList.contains("number") && !(button.classList.contains("dot"))){
        operations = button.dataset.value;
        return;
    }
        
    operations += button.dataset.value;
}



function callAction(button){
    if(button.dataset.value == "backspace"){
        if(operations == 0)
            return;
        else if(typeof(operations) == "number"){
            operations = "0";
            return;
        }
        else if(operations.length == 1){
            operations = "0";
            return;
        }
            
        operations = operations.slice(0, -1);
    }
    else if(button.dataset.value == "clear"){
        operations = "0";
    }
    else{
        switch(operations[operations.length - 1]){
            case "+":
            case "-":
            case "*":
            case "/":
                return;
        }
        operations = eval(operations);
    }
}



function callMemory(button){
    if(button.dataset.value == "mem-display"){
        display.innerHTML = mr;
        operations = "0";
    }

    else if(button.dataset.value == "mem-clear"){
        mr = "0";
    }
   
    else if(button.dataset.value == "mem-add"){
        mr = operations + "+" + mr;
        mr = eval(mr);
    }
   
    else{
        mr = operations + "-" + mr;
        mr = eval(mr);
    }
}

}