import {jigsawSide, getScale} from './jigsawSide.js';

// get puzzle scale
const scale = getScale();

// set offset position
const offset = [10, 10];

const run = function () {
    // set number of rows and columns
    const rows = document.getElementById("nrows").value|0;
    const columns = document.getElementById("ncols").value|0;
    console.log(`Making a puzzle with ${nrows} rows and ${ncols} columns`);

    // randomness factor
    const rand = parseFloat(document.getElementById("rand").value);

    // draw the border
    document.getElementById("view").innerHTML = `<path fill="none" stroke="white" d="
    M${scale*offset[0]},${scale*offset[1]}
    h${scale*25*columns}
    v${scale*25*rows}
    h-${scale*25*columns}
    v-${scale*25*rows}" />`;

    // compute the grid of corners of all pieces
    const arr = [];
    for(let a = 0; a<=columns; a++) {
        arr[a] = [];
        for(let b = 0;b<=rows; b++) {
            const x = offset[0] + 25*a + (a>0 && a<columns-1)*Math.random()*rand;
            const y = offset[1] + 25*b + (b>0 && b<rows-1)*Math.random()*rand;
            arr[a][b] = [x, y];
        }
    }

    // draw the horizontal jigsaw sides
    for(let a = 0; a < arr.length-1; a++) {
        for(let b = 1; b<arr[a].length-1; b++) {
            const [x0, y0] = arr[a][b];
            const [x1, y1]= arr[a+1][b];
            const flip = (Math.random()>0.5)?1:(-1);
            document.getElementById("view").innerHTML += jigsawSide({x0:x0, y0:y0, x1:x1, y1:y1, flip:flip});
        }
    }

    // draw the vertical jigsaw sides
    for(let a = 1; a < arr.length-1; a++) {
        for(let b = 0; b<arr[a].length-1; b++) {
            const [x0, y0] = arr[a][b];
            const [x1, y1]= arr[a][b+1];
            const flip = (Math.random()>0.5)?1:(-1);
            document.getElementById("view").innerHTML += jigsawSide({x0:x0, y0:y0, x1:x1, y1:y1, flip:flip});
        }
    }

}

const download = function () {
    const svgData = document.getElementById("view").outerHTML;
    const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "puzzle.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

window.download = download;
window.run = run;

run();