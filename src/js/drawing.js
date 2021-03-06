const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let color = "#000000";
let width = 50;
let drawing = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 150;
}

function change_color(element) {
    color = element;
}

function change_pen_size() {
    width = document.querySelector(".pen-size").value;
}

function change_custom_color() {
    color = document.querySelector(".custom-color").value;
}

function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function start(e) {
    drawing = true;
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.beginPath();
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

function start_touch(e) {
    drawing = true;
    ctx.moveTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    ctx.beginPath();
}

function draw(e) {
    if (drawing == true) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
}

function draw_touch(e) {
    if (drawing == true) {
        ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
}

function erase() {
    color = "white";
}

function stop(e) {
    drawing = false;
    ctx.closePath();
}

function save() {
    let image = canvas.toDataURL();
    let tmpLink = document.createElement('a');
    tmpLink.download = 'image.png';
    tmpLink.href = image;
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

resizeCanvas();

window.addEventListener("resize", function(e) {
    resizeCanvas();
});

clear()

window.addEventListener("mousedown" , start);
window.addEventListener("touchstart", start_touch);
window.addEventListener("mousemove" , draw);
window.addEventListener("touchmove" , draw_touch);
window.addEventListener("mouseup" , stop);
window.addEventListener("touchend" , stop);

document.querySelector(".clear").onclick = clear;
document.querySelector(".erase").onclick = erase;
document.querySelector(".save").onclick = save;