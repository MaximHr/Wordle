let col = 0, row = 0;
let grid = [];
let guess = '';
let word = 'penis';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
		'X-RapidAPI-Key': '666273b238mshd9b8bf50cdf1f96p1d66c3jsne88a930fe929'
	}
};

// fetch('https://random-words5.p.rapidapi.com/getRandom?wordLength=5', options)
// 	.then(response => response.text())
// 	.then(data => word = data)
// 	.catch(err => console.error(err));

    
function createGrid() {
    for(let i = 0; i < 6;i++) {
        grid[i] = [];
        for(let j = 0;j < 5;j++) {
            grid[i][j] = document.createElement('div');
            grid[i][j].setAttribute('class', 'square');  
            document.querySelector('.grid').appendChild(grid[i][j]);      
        }
    }
}
createGrid();

function compareWords(guess) {
    if(guess.toLowerCase() == word) {
        const alert = document.createElement('div');
        alert.className = 'alert';
        alert.innerHTML = 'Congrats, you guessed the word !';
        document.body.appendChild(alert);
    }
    for(let i = 0;i < guess.length;i++) {
        if(word.includes(guess[i])) {
                grid[row][i].setAttribute('class', 'square yellow');
            if(word[i] === guess[i]) {
                grid[row][i].setAttribute('class', 'square green');
            }
        } else {
            grid[row][i].setAttribute('class', 'square grey');
        }
    }
}
function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char);
}

document.addEventListener('keyup', (e) => {
    if(e.key.length === 1 && isCharacterALetter(e.key) === true && col < 5) {
        // it is a letter
        grid[row][col].innerHTML = e.key;
        guess += e.key;
        col++;
    } else {
        if(e.key === 'Enter' && row < 6 && col == 5) {
            compareWords(guess);
            guess = '';
            col = 0;
            row++;
        }
        if(e.key === 'Backspace' && col > 0) {
            col--;   
            guess = guess.slice(0, -1); 
            grid[row][col].innerHTML = '';
        }
    }
})