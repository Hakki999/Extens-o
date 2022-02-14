var socket = io();

var h, w, tm, px, py, vx, vy, trail;

tam();
function tam() {
     h = window.innerHeight/100;
     w = window.innerWidth/100;

     tm = h+w;
     px = tm*5;
     py = tm*5;
     vx = vy = 0;
     trail = [{x: px, y: py}];
}


const MyCanvas = document.getElementById("MyCanvas");
const ctx = MyCanvas.getContext('2d');

MyCanvas.width= w*100;
MyCanvas.height= h*100;

setInterval(()=>{
    px+=vx;
    py+=vy;

    if(px < 0)px = w*100;
    if(px > w*100)px = 0;
    if(py < 0)py = w*100;
    if(py > w*100)py = 0;

    trail.push({x: px, y: py});

    socket.emit("res", trail);
    trail.shift();
}, 100)

socket.on("resu", resu => {
    ctx.fillStyle= "black";
    ctx.fillRect(0, 0, w*100, h*100);

    for(let j = 0; j < trail.length; j++){
        ctx.fillStyle="white";
        ctx.fillRect(trail[j].x, trail[j].y, tm, tm)
    }
    console.log(resu)
    for(let i = 0; i < resu.length; i++){
        ctx.fillStyle= "blue";
        ctx.fillRect(resu[i].x, resu[i].y, tm, tm);
    }
})

document.addEventListener("resize", tam());

document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 87:
            //cima
            vx = 0;
            vy = -tm;
        break;
        case 83:
            //baixo
            vx = 0;
            vy = +tm;
        break;
        case 68:
            //direita
            vy = 0;
            vx = +tm;
        break;
        case 65:
            //esquerda
            vy = 0;
            vx = -tm;
        break;
        case 13:
            trail.push({x: px, y: py});
        break;
    }
})



socket.on("info", info => {
    console.log(info)
})

socket.on("n", n => {
    console.log(n)
})