"use strict";
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-negated-condition */
let column = 20;
let row = 20;
const sides = 20;
let photography = [];
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    switch (e.key) {
        case 'ArrowRight':
            nextStatus();
            break;
        default:
            break;
    }
});
const generateTable = (row, column) => {
    let html = '<table class="table">';
    for (let y = 0; y < row; y++) {
        html += '<tr>';
        for (let x = 0; x < column; x++) {
            html += `<td class="position-${x + '-' + y}" onmouseup="changeCellStatus(${x}, ${y})">`;
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    let container = document.querySelector('.table-container');
    container.innerHTML = html;
    let table = document.querySelector('.table');
    table.style.width = sides * column + 'px';
    table.style.height = sides * row + 'px';
};
const changeCellStatus = (x, y) => {
    let cell = document.querySelector(`.position-${x + '-' + y}`);
    if (cell.style.background != 'black') {
        cell.style.background = 'black';
    }
    else {
        cell.style.background = '';
    }
};
const toPhotography = () => {
    photography = [];
    for (let x = 0; x < column; x++) {
        photography.push([]);
        for (let y = 0; y < column; y++) {
            let cell = document.querySelector(`.position-${x + '-' + y}`);
            photography[x][y] = cell.style.background == 'black';
        }
    }
};
const countLives = (x, y) => {
    let lives = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
                continue;
            try {
                if (photography[x + i][y + j])
                    lives++;
            }
            catch (e) { }
            if (lives > 3) {
                return lives;
            }
        }
    }
    return lives;
};
const nextStatus = () => {
    toPhotography();
    for (let x = 0; x < column; x++) {
        for (let y = 0; y < column; y++) {
            let lives = countLives(x, y);
            let cell = document.querySelector(`.position-${x + '-' + y}`);
            if (photography[x][y]) {
                if (lives < 2 || lives > 3) {
                    cell.style.background = '';
                }
                else if (lives == 3) {
                    cell.style.background = 'black';
                }
            }
        }
    }
};
generateTable(row, column);
