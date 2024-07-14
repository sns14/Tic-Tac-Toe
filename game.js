let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msgcont = document.querySelector(".msgcont");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBox();
    msgcont.classList.add("hide");
};

const disableBox= () => {
    for(box of boxes){
        box.disabled = true;
    }  
};

const enableBox = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }  
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true; 
        }
        box.disabled = true;
        count++;

        let isWin = checkWin();

        if(count == 9 & !isWin){
            draw();
        }
    });
});

const draw = () => {
    msg.innerText = `Game Draw`;
    msgcont.classList.remove("hide");
    disableBox();
};

const checkWin = () => {
    for(let pattern of winningPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                displayWinner(pos1);
                disableBox();
            }
        }
    }
};

const displayWinner = (winner) => {
    msg.innerText = `Hurray!!! Winner is Player ${winner}`;
    msgcont.classList.remove("hide"); 
    disableBox();
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);