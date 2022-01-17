
/**
 * @description Scale of the drawings: all dimensions are multiplied by this factor
 */
let SCALE = 4;

/**
 * @description Size of the head of each puzzle size: The round bit that locks
 * the pieces together. This value can't be changed.
 */
const HEAD = 5;

/**
 * @function getScale
 * @description Get the global scale of the drawings
 * @param none
 * @returns {number} The scale
 */
export const getScale = () => SCALE;

/**
 * @function setScale
 * @description Set the global scale
 * @param {number} scale The new global scale
 * @returns {none}
 */
export const setScale = (scale) => {SCALE = scale};

/**
 * @function jigsawSide
 * @description Creates an SVG path string drawing a jigsaw side from the start point
 * to the end point, eventually flipping the position of the head.
 * @param {number} x0 Start point, x coordinate
 * @param {number} y0 Start point, y coordinate
 * @param {number} x1 End point, x coordinate
 * @param {number} y1 End point, y coordinate
 * @param {number} flip Whether to flip or not the position of the head, values are -1 or 1.
 * @returns {string} An SVG path element for the jigsaw side
 */
export const jigsawSide =({x0, y0, x1, y1, flip}) => {
    const fx = (j) => px+dx[3*i + j];
    const fy = (j) => py+dy[3*i + j]*flip;
    const width = Math.sqrt((x1-x0)**2 + (y1-y0)**2);
    const angle = Math.atan2(y1-y0,x1-x0)*180/Math.PI;
    const arm = (width-HEAD)/2;
    const dx = [3,arm-1,arm, 1,-2,-2, 0,9,9, 0,-3,-2, 1,arm-3,arm];
    const dy = [1,3,1, -2,-3,-6, -3,-3,0, 3,4,6, 2,0,-1];
    let i, px = 0, py = 0;
    let [x, y] = [x0, y0];

    let str = `<path transform="scale(${SCALE}) translate(${x},${y}) rotate(${angle})" stroke-width=${1/SCALE} fill="none" stroke="white" `;
    str += `d="M ${px},${py} C`;
    for(i=0;i<5;i++) {
        str += `${fx(0)},${fy(0)} ${fx(1)},${fy(1)} ${fx(2)},${fy(2)} `;
        px += dx[3*i + 2];
        py += dy[3*i + 2] * flip;
    }
    str += `"/>\n`;

    return str;
};
