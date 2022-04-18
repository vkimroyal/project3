// EXTRA FEATURES INCLUDED:
// 1. The ability to select from multiple images.
// 2. End-of-game notification (i.e. win screens)
// 3. Transitions and Animations for the main page and win screens.

var rowsize = 4;
var colsize = 4;
var count = 100;

var state;
var blankTile;
var board;

// Setup the board.
function setup() {
	state = "setup";
	blankTile = { row: 3, col: 3 };
	board = document.getElementById("board");
	tilesAmount();
	state = "play";
}


// Select an image.
function imgSelect(file) {
	document.documentElement.style.setProperty("--image-file", "url(" + file + ")")
}

// Check if the user won.
function checkWin() {
	for (let i = 0; i < rowsize; i++) {
		for (let j = 0; j < colsize; j++) {
			if (board.children[i].children[j].id != "tile-" + (i * rowsize + j)) {
				return false;
			}
		}
	}
	return true;
}

// Call the function to shuffle the board when the shuffle button is pressed.
function shuffleButton() {
	state = "setup";
	shuffleTiles(count);
	state = "play";
}

// Shuffle the tiles.
function shuffleTiles(n) {
	for (let i = 0; i < n; i++) {

		let row = blankTile["row"];
		let col = blankTile["col"];

		if (Math.random() < 0.5) {
			let offset = Math.floor(Math.random() * (rowsize - 1) + 1);
			clickTile((row + offset) % rowsize, col);
		} else {
			let offset = Math.floor(Math.random() * (colsize - 1) + 1);
			clickTile(row, (col + offset) % colsize);
		}
	}
	if (checkWin()) {
		shuffleTiles(n);
	}
}

// Click the tiles.
function clickTile(row, col) {
	let dir, count;

	if (row == blankTile["row"] && col != blankTile["col"]) {
		dir = (col > blankTile["col"]) ? "left" : "right";
		count = Math.abs(col - blankTile["col"]);
	} else if (col == blankTile["col"] && row != blankTile["row"]) {
		dir = (row > blankTile["row"]) ? "up" : "down";
		count = Math.abs(row - blankTile["row"]);
	} else {
		console.log("Admin: This tile should not be able to be clicked.");
		return;
	}

	tilesDisable();
	moveTile(row, col, dir, count);
	blankTile = { row: row, col: col };
	tilesAmount();
	tilesEnable(row, col);

	if (checkWin() && state == "play") {
		console.log("You did it!");
		winScrEnable();
	}
}

// Move the tiles.
function moveTile(row, col, dir, count) {
	let targetM, targetN;

	switch (dir) {
		case "left":
			targetM = row;
			targetN = col - 1;
			break;
		case "right":
			targetM = row;
			targetN = col + 1;
			break;
		case "up":
			targetM = row - 1;
			targetN = col;
			break;
		case "down":
			targetM = row + 1;
			targetN = col;
			break;
		default:
			console.log("Admin: This directiion is not defined.");
	}
	if (count != 1) {
		moveTile(targetM, targetN, dir, count - 1);
	}

	let targetTile = board.children[targetM].children[targetN];
	let currTile = board.children[row].children[col];
	let temp = targetTile.id;
	targetTile.id = currTile.id;
	currTile.id = temp;
}

// Disable the tiles.
function tilesDisable() {
	for (let i = 0; i < rowsize; i++) {
		for (let j = 0; j < colsize; j++) {
			board.children[i].children[j].children[0].disabled = true;
		}
	}
}

// Enable the tiles.
function tilesEnable(row, col) {
	for (let i = 0; i < rowsize; i++) {
		board.children[i].children[col].children[0].disabled = false;
	}
	for (let j = 0; j < colsize; j++) {
		board.children[row].children[j].children[0].disabled = false;
	}
	board.children[row].children[col].children[0].disabled = true;
}

// Define number of tiles.
function tilesAmount() {
	for (let i = 0; i < rowsize; i++) {
		for (let j = 0; j < colsize; j++) {
			let tileID = board.children[i].children[j].id;
			if (tileID == "tile-15") {
				tileID = "";
			} else {
				tileID = parseInt(tileID.replace("tile-", "")) + 1;
			}
			board.children[i].children[j].children[0].innerHTML = tileID;
		}
	}
}


// Turn on the Win Screen.
function winScrEnable() {
	document.getElementById("win-overlay").style.display = "block";
}

// Disable the Win Screen.
function winScrDisable() {
	document.getElementById("win-overlay").style.display = "none";
	state = "setup";
	shuffleTiles(count);
	state = "play";
}