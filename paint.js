const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d", { willReadFrequently: true });
toolsBtn = document.querySelectorAll(".tool");
fillColor=document.querySelector("#fill-color");
brushSlider=document.querySelector("#size-slider");
colorsBtn=document.querySelectorAll(".colors .option");
let prevMouseX,prevMouseY,snapshot;
isDrawing = false;
brushWidth=5;
selectedTool="brush";
selectedColor="#000";

window.addEventListener("load",()=>{
canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;
});


const drawRect = (e) => {
  
    if(!fillColor.checked) {

        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}


const drawCircle=(e)=>{
    ctx.beginPath();
    let radius=Math.sqrt(Math.pow((prevMouseX-e.offsetX),2)+Math.pow((prevMouseY-e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
    fillColor.checked?ctx.fill(): ctx.stroke();
}

const drawLine=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke()
}

const drawTriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);//first line
    ctx.lineTo(prevMouseX*2-e.offsetX,e.offsetY);//bottom path
    ctx.closePath();
    ctx.stroke()
    fillColor.checked?ctx.fill(): ctx.stroke();
}

const startDrawing =(e)=>{
    isDrawing =true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY;
    ctx.beginPath();
    ctx.lineWidth=brushWidth;
    ctx.strokeStyle = selectedColor; 
    ctx.fillStyle = selectedColor;
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawing =(e)=>{
    if(!isDrawing) return; 
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool=="brush"){
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }else if(selectedTool=="rectangle"){
        drawRect(e);
    } else if(selectedTool=="circle"){
        drawCircle(e);
    }
    else if(selectedTool=="line"){
        drawLine(e);
    }
    else if(selectedTool=="triangle"){
        drawTriangle(e);
    }

}
toolsBtn.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool=btn.id;
            console.log(selectedTool)
    });
});


colorsBtn.forEach(btn =>{
btn.addEventListener("click",()=>{
    document.querySelector(".options .selected").classList.remove("selected")
        btn.classList.add("selected")
selectedColor=(window.getComputedStyle(btn).getPropertyValue("background-color"));

});
});


brushSlider.addEventListener("change",()=>brushWidth=brushSlider.value)
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mousedown",startDrawing);
canvas.addEventListener("mouseup",()=>isDrawing=false);