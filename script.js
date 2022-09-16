const container = document.getElementById("container");

// function to create 16*16 grid
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";

    //change color of cell when mouse is over it
    cell.addEventListener('mouseover', e=>setBgColor(cell));

    function setBgColor(element){
        element.style.backgroundColor = "blueviolet";
    }
  };

  

};

makeRows(16, 16);

