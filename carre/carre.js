const square =document.createElement("div");
const reset = document.querySelector("#reset");

const show=()=> reset.style.visibility="visible";
const hide=()=> reset.style.visibility="hidden";
const resetSquare=function(){
    let size = 150;
    square.style.width=size +"px";
    square.style.height=size +"px";
    square.style.background="grey";
    let marginWidth = document.querySelector("div").scrollWidth/2 - parseInt(square.style.width)/2+"px";
    console.log(marginWidth)
    square.style.marginLeft=marginWidth;
    show();
}

resetSquare();


const squareDiv = document.querySelector("div");
squareDiv.append(square);

const grow=function(){
    size=parseInt(square.style.width)+10
    square.style.width=size +"px";
    square.style.height=size +"px";
    show()
};



document.querySelector("#augmenter").addEventListener("click",grow)  
document.querySelector("#vert").addEventListener("click",()=>{square.style.background="green"; show}) 
document.querySelector("#disparaitre").addEventListener("click",()=>{square.style.visibility="hidden";show})
document.querySelector("#reapparaitre").addEventListener("click",()=>{square.style.visibility="visible";show})
reset.addEventListener("click",()=>{resetSquare(); hide()})

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key==="ArrowLeft")
        {square.style.marginLeft=parseInt(square.style.marginLeft)-10+"px";
        show()}
        else if (event.key==="ArrowRight")
        {square.style.marginLeft=parseInt(square.style.marginLeft)+10+"px";
        show()}
    
    }
    );
    
    
    
    
    
    