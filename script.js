document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', draw);
window.addEventListener('resize', resize);

const colorSelector = document.getElementById('colorSelector');
const weightSlider = document.getElementById('weightSlider');
const clearButton = document.getElementById('clearButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let color = 'green';
let weight = 5;

document.addEventListener('wheel', e => {
    if (e.deltaY > 0) {
        if (weight + 5 > 40) return;
        weight += 5;
    } else {
        if (weight - 5 <= 0) return;
        weight -= 5;
    }

    weightSlider.value = weight;
})

clearButton.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
weightSlider.addEventListener('change', e => weight = e.target.value)
colorSelector.addEventListener('change', e => color = e.target.value)
resize();

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

let lastPos = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    lastPos.x = event.clientX - canvas.offsetLeft;
    lastPos.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
    paint = true;
    getPosition(event);
}

function stopPainting() {
    paint = false;
}

function draw(event) {
    if (!paint) return;

    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.lineCap = 'round';

    ctx.strokeStyle = color;
    ctx.moveTo(lastPos.x, lastPos.y);
    getPosition(event);

    ctx.lineTo(lastPos.x, lastPos.y);
    ctx.stroke();
}