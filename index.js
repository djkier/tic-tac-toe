const resetBtn = document.querySelector('#reset');
const board = document.querySelector('#gameBoardContainer');
const playAgainBtn = document.querySelector('#play-again');
const head = document.querySelector('main h1');
const playerOneName = document.querySelector('#player-one-name');
const playerTwoName = document.querySelector('#player-two-name');



function checkWinner(player){
    const winningCombo = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7] 
    ];

    let win = false;
    winningCombo.forEach(list => {
        let combo = 0
        player.forEach(num => {
            (list.includes(Number(num))) && combo++;

            if (combo === 3 ) return win = true ;
        })
    })
   
    return win

}

function createPlayer(name) {
    const picked = [];
    const playerName = name;
    const playerScore = [];
    const addRecord = val => picked.push(val);
    const addPlayerScore = () => playerScore.push(1);
    const displayScore = () => {
        document.querySelector(`#player-${playerName}-score`).textContent = playerScore.length;
    }
    const resetScore = () => {
        while(playerScore.length > 0) {
            playerScore.pop();

        }
    }
    const resetPicked = () => {
        while(picked.length > 0) {
            picked.pop();
        }
    }

    return { addRecord, picked, playerName, resetPicked, playerScore, addPlayerScore, resetScore, displayScore };
}



function winner(player) {
    if (player.playerName === 'one') {
        head.textContent = `${playerOneName.value} Wins`;
    } else {
        head.textContent = `${playerTwoName.value} Wins`;
    }

    
    player.addPlayerScore();
    player.displayScore();

    board.style.pointerEvents = 'none'
    playAgainBtn.style.visibility = 'visible';

}


const clickRecord = (function () {
    const record = [];
    const playerOne = createPlayer('one');
    const playerTwo = createPlayer('two');
    const addRecord = (cell) => {
        if (record.length % 2 === 0) {
            playerTwo.addRecord(cell);
        } else {
            playerOne.addRecord(cell);
        }
    };

    const addCellValue = (cell) => {
        if (!record.includes(cell) && record.length <= 9) {
            record.push(cell);
            addRecord(cell);
        }
    };


    const resetRecord = () => {
        while (record.length > 0) {
            record.pop();
            playerOne.resetPicked();
            playerTwo.resetPicked();
            board.style.pointerEvents = 'all'
            playAgainBtn.style.visibility = 'hidden';
        }
    }

    return { record, addCellValue, resetRecord, playerOne, playerTwo }
})()


function whosTurn(cell){
    clickRecord.addCellValue(cell);
    const { record } = clickRecord
    return record.length % 2 === 0 ? 'O' : 'X';
}


function buttonEffects(button) {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    })

    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1.00)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1.00)';
    })
}

function createButton(val){
    const button = document.createElement('button');
    button.className = 'x-or-o';
    button.type = 'button';
    button.name = val;
   

    button.addEventListener('click', () => {
        const turn = whosTurn(button.name)
       
        if (button.textContent === '') {
            button.textContent = turn;
            head.textContent = turn === 'O' ? `${playerTwoName.value} turn` : `${playerOneName.value} turn`; 
        }

        const { playerOne, playerTwo} = clickRecord;
        if (checkWinner(playerOne.picked)) {
            winner(playerOne)
        } else if (checkWinner(playerTwo.picked)) {
            winner(playerTwo)
        }else if(playerOne.picked.length + playerTwo.picked.length === 9) {
            playAgainBtn.style.visibility = 'visible';
        }


    });

    buttonEffects(button);

    return button
}


function gameBoard() {
    head.textContent = 'Play';
    board.replaceChildren();
    for (let i=1; i <= 9; i++) {
        const button = createButton(i);
        board.appendChild(button);
    }
}

function reset() {
    const { playerOne, playerTwo } = clickRecord;
    playerOne.resetScore();
    playerOne.displayScore();

    playerTwo.resetScore();
    playerTwo.displayScore();

    clickRecord.resetRecord();
    gameBoard();
}

function playAgain(){
    clickRecord.resetRecord();
    gameBoard();
    
}


gameBoard();

resetBtn.addEventListener('click', reset)

playAgainBtn.addEventListener('click', playAgain);