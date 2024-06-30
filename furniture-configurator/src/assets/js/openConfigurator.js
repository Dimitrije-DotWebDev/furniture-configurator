let arrow = document.getElementById("arrows");
let configurator = document.getElementById("configurator");

let isClosed = true;

function toggleConfigurator(){
    if(isClosed){
        arrow.className = "open";
        configurator.className = "configurator-displayed";
    }
    else{
        arrow.className = "close";
        configurator.className = "configurator-non-displayed";
    }
    isClosed=!isClosed;
}

arrow.addEventListener("click", ()=>{
    toggleConfigurator();
})