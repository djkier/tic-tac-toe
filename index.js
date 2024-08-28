const reset = document.querySelector('#reset');


function createPlayer(name, display) {
    const picked = [];
    const playerName = name;
    const playerDisplay = display;
    const addRecord = val => picked.push(val);

    return { addRecord, picked, playerDisplay, playerName };
}


const clickRecord = (function () {
    const record = [];
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
    const turn = 'A'

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
            addRecord(cell)
        }
    };


    const resetRecord = () => {
        while (record.length > 0) {
            record.pop;
        }
    }

    return { addCellValue, resetRecord, turn, playerOne, playerTwo }
})()


function whosTurn(cell){
    clickRecord.addCellValue(cell);
    const { turn, playerOne, playerTwo } = clickRecord;
    console.log(`PLAYER 1: ${playerOne.picked}
PLAYER 2: ${playerTwo.picked}`);

    return turn;
}

function createButton(val){
    const button = document.createElement('button');
    button.className = 'x-or-o';
    button.type = 'button';
    button.name = val;
    button.addEventListener('click', () => {
        const turn = whosTurn(button.name)
        button.textContent = turn;
    });
    return button
}


function gameBoard() {
    const board = document.querySelector('#gameBoardContainer');
    board.replaceChildren();
    clickRecord.resetRecord();
    for (let i=1; i <= 9; i++) {
        const button = createButton(i);
        board.appendChild(button)
    }
}


gameBoard();
reset.addEventListener('click', () => {gameBoard()})