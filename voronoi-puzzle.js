// import {Delaunay} from "./node_modules/d3-delaunay/dist/d3-delaunay.js";
import {Delaunay} from "https://cdn.skypack.dev/d3-delaunay@6";
console.log(Delaunay);
import {jigsawSide, getScale, setScale} from './jigsawSide.js';
const scale = 1;//getScale();

setScale(1);
// generate random points
const npoints = 20;
const points = [];
for(let i = 0; i<npoints; i++) {
    const x = 20 + 10*parseInt(Math.random()*40);
    const y = 20 + 10*parseInt(Math.random()*40);
    points.push([x, y]);
}

let mouseDown = false;
let nodeIndex = 0;
function nodeMouseDown(e) {
    nodeIndex = e;
    mouseDown = true;
}
function up(e) {
    mouseDown = false;
}
function move(e) {
    if(mouseDown) {
        const pos1 = [e.clientX, e.clientY];
        points[nodeIndex] = pos1;
        draw();
    }
}
window.nodeMouseDown = nodeMouseDown;

document.addEventListener('mousemove', move);
document.addEventListener('mouseup', up);

function draw() {
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([20, 20, 500, 500]);

    // clear
    document.getElementById("view").innerHTML = "";

    // draw circles
    for(let i=0; i<points.length; i++) {
        document.getElementById("view").innerHTML += `<circle 
            onmousedown="nodeMouseDown(${i})" 
            cx=${points[i][0]} cy=${points[i][1]} r=5 fill="white" />`;
    }

    // draw voronoi cells
    // combine all edges
    const edges = new Set();
    for(let i=0; i<points.length; i++) {
        if(!voronoi.cellPolygon(i)) {
            continue;
        }
        const cell = voronoi.cellPolygon(i);
        for(let j=0; j<cell.length; j++) {
            let start = cell[j].map((o)=>o|0);
            let end = cell[(j+1)%cell.length].map((o)=>o|0);
            if(start[0]==end[0] && start[1]==end[1]) {
                continue;
            }
            if(start[0]>end[0]) {
                const tmp = [...start];
                start = end;
                end = tmp;
            }
            if(start[1]>end[1]) {
                const tmp = [...start];
                start = end;
                end = tmp;
            }
            edges.add([...start, ...end].join(' '));
        }
    }

    let str = "";
    const items = [...edges];
    for(let edge of items) {
        const [x0,y0,x1,y1] = edge.split(" ").map((o)=>parseFloat(o));
        const flip = (Math.random()>0.5)?1:(-1);
        str += jigsawSide({x0:x0/scale,y0:y0/scale,x1:x1/scale,y1:y1/scale,flip});
    }
    document.getElementById("view").innerHTML += str;
}

draw();
