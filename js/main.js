document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;

    let word = "dairy";

    const keys = document.querySelectorAll('.keyboard-row button')

    function getCurrentWordArray() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArray();

        if (currentWordArray && currentWordArray.length < 5) {
            currentWordArray.push(letter);

            const availableSpaceEL = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEL.textContent = letter;
        }
    }

    function handleSubmitWord() {
        const currentWordArray = getCurrentWordArray();
        if (currentWordArray.length !== 5) {
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArray.join(""); 

        if (currentWord === word) {
            window.alert("Congragulations");
        }

        if (guessedWords.length === 6) {
            window.alert('Sorry, you have no more guesses! The word is ${word}.');
        }

        guessedWords.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let index = 0; index < keys.length; index++) {
        keys[index].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                handleSubmitWord();
                return;
            }

            updateGuessedWords(letter);
        };
    }


});