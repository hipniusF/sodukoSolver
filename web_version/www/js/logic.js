function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

function gen_solution(m) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (m[i][j] == 0) {
				let found = false;
				const range_list = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

				for (const x of range_list) {
					m[i][j] = x;

					if (is_correct(m, i, j)) {
						gen_solution(m);
						if (all_correct(m)) {
							found = true;
							break;
						}
					}
				}
				if (!found) {
					m[i][j] = 0;

					return m;
				}
			}
		}
	}
	return m;
}

function genPuzzleMatrix() {
	const blank_matrix = [];

	for (let i = 0; i < 9; i++) {
		const row = [];
		for (let j = 0; j < 9; j++) {
			row.push(0);
		}
		blank_matrix.push(row);
	}
	const matrix = gen_solution(blank_matrix);

	for (let i = 0; i < 2; i++) {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (Math.random() < 0.4) {
					matrix[i][j] = 0;
				}
			}
		}
	}

	return matrix;
}

function all_correct(m) {
	for (const row of m) {
		for (const item of row) {
			if (item == 0) {
				return false;
			}
		}
	}
	return true;
}

function is_correct(m, I, J) {
	for (let i = 0; i < 9; i++) {
		if (m[i][J] == m[I][J] && i != I) {
			return false;
		}
	}
	for (let j = 0; j < 9; j++) {
		if (m[I][j] == m[I][J] && j != J) {
			return false;
		}
	}
	const i0 = Math.floor(I / 3) * 3;
	const j0 = Math.floor(J / 3) * 3;

	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			if (m[x + i0][y + j0] == m[I][J] && x + i0 != I && y + j0 != J) {
				return false;
			}
		}
	}

	if (m[I][J] > 10) {
		return false;
	}

	return true;
}

export { genPuzzleMatrix, is_correct, all_correct };
