//Clear local storage
localStorage.clear()

//Get the play area
const playArea = document.querySelector(".game-area");

//Get the buttons
const btnRollDice = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNewGame = document.querySelector(".btn-new");

//Get the input field
const inputWinAmount = document.querySelector(".final-score")

//Get player 0 stats
const player0Name = document.querySelector("#name-0");
const player0Score = document.querySelector("#score-0");
const player0Held = document.querySelector("#current-0");

//Get player 1 stats
const player1Name = document.querySelector("#name-1");
const player1Score = document.querySelector("#score-1");
const player1Held = document.querySelector("#current-1");

//Set the total variable to 0
let total = 0;

//Default current player
let currentPlayerScore = player0Score;
let currentPlayerHeld = player0Held;
let currentPlayerName = player0Name;

//Roll the dice, then display the dice 
function rollDice() {
    //Disable the input field
    inputWinAmount.setAttribute("disabled", "disabled")

    //Store two random moments
    let roll1 = Math.ceil(Math.random() * 6);
    let roll2 = Math.ceil(Math.random() * 6);
    //console.log("Roll 1:", roll1);
    //console.log("Roll 2:", roll2);

    //Get the two dice
    const dice1 = document.querySelector("#dice-1");
    const dice2 = document.querySelector("#dice-2");

    //Change the picture to match the number rolled
    dice1.setAttribute("src", "img/dice-" + roll1 + ".png");
    dice2.setAttribute("src", "img/dice-" + roll2 + ".png");

    //Run the addRoll function
    addRoll(roll1, roll2);
}

function addRoll(num1, num2) {
    let numberRolled = num1 + num2;
    if (num1 == 1 || num2 == 1 || numberRolled == parseFloat(localStorage.getItem("last num rolled"))) {
        //Set current player's score to 0
        total = 0;
        currentPlayerScore.textContent = total;

        //Clear last num rolled
        localStorage.removeItem("last num rolled")

        //Toggle active class between the two players
        player1Name.classList.toggle("active")
        player0Name.classList.toggle("active")

        //Switch the current player
        if (currentPlayerScore == player0Score) {
            //Change to player 1
            currentPlayerScore = player1Score
            currentPlayerHeld = player1Held
            currentPlayerName = player1Name


        } else {
            //Change to player 0
            currentPlayerScore = player0Score
            currentPlayerHeld = player0Held
            currentPlayerName = player0Name
        }
    } else {
        //Add total to the new numbers rolled
        total += numberRolled;

        //Display new total to current player
        currentPlayerScore.textContent = total;

        //Store currentPlayerScore in localStorage
        localStorage.setItem("Current player score", currentPlayerScore.textContent)

        //Store the last two numbers in localStorage
        localStorage.setItem("last num rolled", numberRolled)
    }
}

function holdPoints() {
    if (isNaN(parseFloat(localStorage.getItem("Current player score"))) == true) {
        alert("You need to roll before holding your points")
    } else {
        //Check if current held number is 0
        if (currentPlayerHeld.textContent == 0) {
            currentPlayerHeld.textContent = localStorage.getItem("Current player score");
        } else {
            //Add Current player score to held score
            let totalHeld = parseInt(localStorage.getItem("Current player score")) + parseInt(currentPlayerHeld.textContent)
    
    
            //Add current score to currentPlayerHeld
            currentPlayerHeld.textContent = totalHeld
        }

        //Set current player's score to 0
        total = 0;
        currentPlayerScore.textContent = total;

        if (currentPlayerHeld.textContent >= inputWinAmount.value) {
            setTimeout(() => {
                currentPlayerName.textContent = "WINNER!"
            }, 100);
        } else {
            //Clear local storage item
            localStorage.removeItem("Current player score");
        
        
            //Toggle active class between the two players
            player1Name.classList.toggle("active")
            player0Name.classList.toggle("active")
        
            //Switch the current player
            if (currentPlayerScore == player0Score) {
                currentPlayerScore = player1Score
                currentPlayerHeld = player1Held
                currentPlayerName = player1Name
        
        
            } else {
                currentPlayerScore = player0Score
                currentPlayerHeld = player0Held
                currentPlayerName = player0Name
            } 
            
        }
    
    }
}

//Add eventlistener to the "roll dice" button
btnRollDice.addEventListener("click", rollDice);

//Add eventlistener to the "hold points" button
btnHold.addEventListener("click", holdPoints)

//Add eventlistener to the "new game" button
btnNewGame.addEventListener("click", () => {
    location.reload()
})