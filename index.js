const resetBtn = document.querySelector('#reset');


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

function createPlayer(name, display) {
    const picked = [];
    const playerName = name;
    const playerDisplay = display;
    const addRecord = val => picked.push(val);
    const resetPicked = () => {
        while(picked.length > 0) {
            picked.pop();
        }
    }

    return { addRecord, picked, playerDisplay, playerName, resetPicked };
}


const clickRecord = (function () {
    const record = [];
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
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
        }
    }

    return { record, addCellValue, resetRecord, playerOne, playerTwo }
})()


function whosTurn(cell){
    clickRecord.addCellValue(cell);
    const { record } = clickRecord
    return record.length % 2 === 0 ? 'O' : 'X';
}

function winner(player) {
    document.querySelector('main h1').textContent = `${player.playerName} Wins`
    // disable button
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
        }

        const { playerOne, playerTwo} = clickRecord;
        if (checkWinner(playerOne.picked)) {
            winner(playerOne)
        } else if (checkWinner(playerTwo.picked)) {
            winner(playerTwo)
        }
        

       
    });
    return button
}


function gameBoard() {
    const board = document.querySelector('#gameBoardContainer');
    board.replaceChildren();
    clickRecord.resetRecord();
    for (let i=1; i <= 9; i++) {
        const button = createButton(i);
        board.appendChild(button);
    }
}


gameBoard();
resetBtn.addEventListener('click', () => {gameBoard()})