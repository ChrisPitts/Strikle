var boxes = [];
var curGuess = 0;
var victoryAudio = new Audio("solidarity_forever.mp3");
const word = "SCABS";

function check_if_word_exists(word) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    let exists = 1;

    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            console.log("Success");
            processGuess(word.toUpperCase());
        },
        error: function(){
            console.log("error");
            error(word + " is an invalid word");
        }
    })

    // return exists;
}

function loadPage(){
    let container = document.getElementById("guesscontainer");
    for(let r = 0; r < 6; r++)
    {
        let row = [];
        for(let c = 0; c < 5; c++)
        {
            let element = document.createElement("div");
            element.className = "letter";
            container.appendChild(element);
            row.push(element);
        }
        boxes.push(row);
    }
}

function submit(){
    if(curGuess > 5) return;
    let guess = document.getElementById("guess").value.toLowerCase();
    document.getElementById("guess").value = "";
    //check the length
    if(guess.length != 5)
    {
        error("Invalid length")
        return;
    }
    check_if_word_exists(guess);
}

function error(message){
    alert(message);
}

function processGuess(guess)
{
    console.log("Processing " + guess);
    let tempWord = word;
    let correctCount = 0;
    for(let i = 0; i < guess.length; i++)
    {
        box = boxes[curGuess][i];
        box.innerHTML = "<h1>" + guess[i] + "</h1>"
        if(guess[i] == word[i])
        {
            box.classList.add("green");
            tempWord = tempWord.replace(guess[i], "");
            correctCount++;
        }
        else if(tempWord.includes(guess[i]))
        {
            console.log(tempWord);
            for(let k = 0; k < word.length; k++)
            {
                if(word[k] == guess[i] && word[k] != guess[k])
                {
                    console.log("Entered second loop " + guess[i]);
                    box.classList.add("yellow");
                    tempWord = tempWord.replace(guess[i], "");
                    console.log(tempWord);
                    break;
                }
            }
            if(!box.classList.contains("yellow"))
                box.classList.add("gray");
        }
        else
            box.classList.add("gray");
    }
    curGuess++;
    if(correctCount == 5)
    {
        victoryAudio.pause();
        victoryAudio.play();
        curGuess = 6;
        document.getElementById("answer").innerHTML = "<p>Thats right! The word was SCABS. We hate them! Thank you for not being one!</p>";
        //alert("Thats right! The word was SCABS. We hate them! Thank you for not being one!")
    }
    else if(curGuess > 5)
    document.getElementById("answer").innerHTML = "<p>The word was SCABS. We hate them! Thank you for not being one!</p>";
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        submit();
    }
});

loadPage();