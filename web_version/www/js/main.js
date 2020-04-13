"use strict";
import { genPuzzleMatrix, isCorrect, allCorrect, sleep } from "/js/logic.js";

const solveButton = document.querySelector(".solve");
const resetButton = document.querySelector(".reset");
const generateButton = document.querySelector(".generate");
const quickButton = document.querySelector(".quick");
const grid = document.querySelector("ul");
const solvingLabel = document.querySelector(".solvingLabel");

function genBlankGrid() {
	quickButton.classList.add("hide");
	solvingLabel.classList.add("hide");
	window.slowSolve = true;

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

async function solve() {
	quickButton.classList.remove("hide");
	solvingLabel.classList.remove("hide");

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

						if (slowSolve) {
							await sleep(100);
						}

						window.matrix[i][j] = x;

						if (isCorrect(window.matrix, i, j)) {
							await solve();
							if (allCorrect(window.matrix)) {
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

	quickButton.classList.add("hide");
	solvingLabel.classList.add("hide");
}

genBlankGrid();

generateButton.addEventListener("click", writePuzzle);
resetButton.addEventListener("click", genBlankGrid);
solveButton.addEventListener("click", solve);
quickButton.addEventListener("click", () => (slowSolve = false));
