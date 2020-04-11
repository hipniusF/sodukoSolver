"use strict";
import { genPuzzleMatrix, is_correct, all_correct } from "/js/logic.js";

const solveButton = document.querySelector(".solve");
const resetButton = document.querySelector(".reset");
const generateButton = document.querySelector(".generate");
const grid = document.querySelector("ul");

function genBlankGrid() {
	grid.innerHTML = "";
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const li = document.createElement("li");
			li.className = `i${i}_j${j}`;

			if ((i + 1) % 3 === 0) {
				li.classList.add("borderBottom");
			}
			if ((j + 1) % 3 === 0) {
				li.classList.add("borderRight");
			}

			fragment.appendChild(li);
		}
	}
	window.matrix = undefined;
	grid.append(fragment);
}

function writeMatrix(matrix) {
	genBlankGrid();

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] !== 0) {
				const li = grid.querySelector(`.i${i}_j${j}`);
				li.classList.add("default");
				li.textContent = matrix[i][j];
			}
		}
	}
}

function writePuzzle() {
	const mat = genPuzzleMatrix();
	writeMatrix(mat);
	window.matrix = mat;
}

function solve() {
	if (window.matrix == undefined) {
		alert("Generate a puzzle first!");
	} else {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				const box = document.querySelector(`.i${i}_j${j}`);

				if (window.matrix[i][j] == 0) {
					let found = false;
					for (let x = 1; x < 10; x++) {
						box.textContent = x;
						window.matrix[i][j] = x;

						if (is_correct(window.matrix, i, j)) {
							solve();
							if (all_correct(window.matrix)) {
								found = true;
								break;
							}
						}
					}
					if (!found) {
						box.textContent = 0;
						window.matrix[i][j] = 0;

						return;
					}
				}
			}
		}
	}
}

genBlankGrid();

generateButton.addEventListener("click", writePuzzle);
resetButton.addEventListener("click", genBlankGrid);
solveButton.addEventListener("click", solve);
