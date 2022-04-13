var rowsize = 4;
var colsize = 4;
var count = 100;

var state, blankTile, board;

// Setup the game board.
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

// Display image to the board.
function imgDisplay(event) {
	event.preventDefault();

	let file = event.dataTransfer.items[0].getAsFile();
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		console.log(reader.result);
		console.log(reader.readyState);
		console.log(reader.error);
		document.documentElement.style.setProperty("--image-file", "url(" + reader.result + ")");
	}
	document.getElementById("imgdrop").style.zIndex = -1;
}

// Setting up the tiles in the board.
function tilesAmount() {
	for (let i = 0; i < rowsize; i++) {
		for (let j = 0; j < colsize; j++) {
			let tile_id = board.children[i].children[j].id;
			if (tile_id == "tile_15") {
				tile_id = "";
			} else {
				tile_id = parseInt(tile_id.replace("tile_", "")) + 1;
			}
			board.children[i].children[j].children[0].innerHTML = tile_id;
		}
	}
}

/*


To-Do:
- shuffle(): Shuffle the titles.
- Move the pieces.
- Implement a solvable algorithm.

Extra Features (Select 4 for Undergrad, 5 for Grad):
- Select from multiple images. (DONE)

- End-of-game notification
- Tile Animations/Transitions
- Timer (w/ audio file)
- Different Puzzle Sizes
- Extra Animation (i.e. for win screen, etc.)
- Ability to slide multiple squares at once (might be difficult)
- Cheat button

*/