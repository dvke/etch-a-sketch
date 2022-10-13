//default values
const DEFAULT_SIZE = 32;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'pen';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//elements
const grid = document.getElementById("grid");
const sizeSlider = document.getElementById('gridSlider');
// const sliderValue = document.getElementById('gridSlider-label')
const clearBtn = document.getElementById('clearGrid');
const options = document.querySelectorAll('.option');
const colorPicker = document.getElementById('colorPicker');


//Helper functions
function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function selectOption(e) {
    unselectOption();
    e.target.classList.add('selected');
}

function unselectOption() {
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
}

function changeSize(value) {
    setCurrentSize(value);
    // updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sliderValue.innerHTML = value;
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-item');
        gridElement.addEventListener('mouseover', Draw);
        gridElement.addEventListener('mousedown', Draw);
        grid.appendChild(gridElement);
    }
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function randomizeColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function Draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'pen') {
        e.target.style.backgroundColor = currentColor;
    }
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
    else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = randomizeColor();
    }

}


//event listeners?
sizeSlider.addEventListener('input', e => changeSize(e.target.value));
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
clearBtn.addEventListener('click', () => reloadGrid());
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", e => {
        selectOption(e);
        currentMode = e.target.id;
    });
}



window.onload = () => {
    setupGrid(DEFAULT_SIZE);
}
