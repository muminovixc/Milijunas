// Game state
const gameState = {
    questions: [
        {
            pitanje: "koje godine je osnovan PMF?",
            odgovor: ["1960.", "1958.", "1948.", "1955."],
            tacanOdgovor: "1960."
        },
        {
            pitanje: "Kako se zove dekan PMF-a?",
            odgovor: ["Nusret Drešković", "Elmedin Selmanović", "Sead Delalić", "Adis Alihodžić"],
            tacanOdgovor: "Nusret Drešković"
        },
        {
            pitanje: "Koliko odsjeka ima na PMF-u?",
            odgovor: ["5", "4", "6", "7"],
            tacanOdgovor: "5"
        },
        {
            pitanje: "Koji se osnovni jezik koristi za nastavu na PMFU?",
            odgovor: ["Bosanski", "Engleski", "Njemacki", "Francuski"],
            tacanOdgovor: "Bosanski"
        },
        {
            pitanje: "Koji se predmeti najčešće predaju na Odsjeku za Informatiku na PMF-u?",
            odgovor: ["Biologija i hemija", "računarski sistemi i programiranje", "psihologija i pedagogija", "Arheologija i antropologija"],
            tacanOdgovor: "računarski sistemi i programiranje"
        },
        {
            pitanje: "Koji Odsjek na PMF-u u Sarajevu fokusira svoje studijske programe na matematičke discipline??",
            odgovor: ["odsjek za biologiju", "odsjek za matematiku", "odsjek za hemiju", "odsjek za fiziku"],
            tacanOdgovor: "odsjek za matematiku"
        },
        {
            pitanje: "Koji program na PMF-u u Sarajevu fokusira studijske programe na proučavanje živih organizama i njihovih ekosistema?",
            odgovor: ["Biologija", "Hemija", "fizika", "matematika"],
            tacanOdgovor: "Biologija"
        },
        {
            pitanje: "Koja oblast matematike se bavi proučavanjem brojeva i matematičkih struktura povezanih s brojevima?",
            odgovor: ["Teorija brojeva", "Geometrija", "Analiza", "Topologija"],
            tacanOdgovor: "Teorija brojeva"
        },
        {
            pitanje: "Kako se zove program na Odsjeku za informatiku PMF-a u Sarajevu koji se bavi razvojem softvera za specifične potrebe korisnika?",
            odgovor: [" Softversko inženjerstvo", "Razvoj informacijskih sistema", "Prilagođeni softveri", "Specifična informatika"],
            tacanOdgovor: " Softversko inženjerstvo"
        },
        {
            pitanje: "Kako se zove profesor Web-programiranja?",
            odgovor: ["Nusret Drešković", "Elmedin Selmanović", "Sead Delalić", "Adis Alihodžić"],
            tacanOdgovor: "Sead Delalić"
        },
        {
            pitanje: "Koji HTML element koristimo za označavanje naslova prvog nivoa?",
            odgovor: ["<h2>", "<head>", "<h1>", "<title>"],
            tacanOdgovor: "<h1>"
        },
        {
            pitanje: "Kako se postavlja boja teksta u CSS-u?",
            odgovor: ["font-color", "background-color", "color", "text-style"],
            tacanOdgovor: "color"
        },
        {
            pitanje: "Kako deklarirate funkciju u JavaScriptu?",
            odgovor: ["myFunction = function() {}", "declare function myFunction() {}", "function myFunction() {}", "new Function(myFunction) {}"],
            tacanOdgovor: "function myFunction() {}"
        },
        {
            pitanje: "Kako kreirate niz u JavaScriptu??",
            odgovor: ["var myArray = {}", "var myArray = new Array()", "var myArray = []", "array myArray = []"],
            tacanOdgovor: "var myArray = []"
        },
        {
            pitanje: "Kako postavljate razmak između elemenata u CSS-u bez korištenja margina?",
            odgovor: ["spacing", "margin", "gap", "padding"],
            tacanOdgovor: "gap"
        },
        {
            pitanje: "Kako izvršavate petlju for u JavaScriptu?",
            odgovor: ["for (var i = 0; i < 10; i++)", "loop (var i = 0; i < 10; i++)", "repeat (var i = 0; i < 10; i++)", "foreach (var i = 0; i < 10; i++)"],
            tacanOdgovor: "for (var i = 0; i < 10; i++)"
        }
    ],
    shownQuestions: [],
    currentQuestion: null,
    score: 0,
    helpUsed: { call: false, audience: false }
};

// DOM Elements
const elements = {
    questionDisplay: document.getElementById("mjestoZaPitanje"),
    resultDisplay: document.getElementById("sretno"),
    options: {
        A: document.getElementById("A"),
        B: document.getElementById("B"),
        C: document.getElementById("C"),
        D: document.getElementById("D")
    },
    scoreDisplays: Array.from({length: 10}, (_, i) => document.getElementById((i + 1).toString())),
    startScreen: document.getElementById("start-screen"),
    yesButton: document.getElementById("yesBtn"),
    noButton: document.getElementById("noBtn")
};

// Audio elements
const sounds = {
    start: new Audio("pocetni.mp3"),
    correct: new Audio("tacan_odgovor.mp3"),
    wrong: new Audio("netacan_odgovor.mp3"),
    million: new Audio("za_osvojen_milion.mp3")
};

// Utility functions
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getRandomQuestion = () => {
    const availableQuestions = gameState.questions.filter((_, index) => !gameState.shownQuestions.includes(index));
    if (availableQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    gameState.shownQuestions.push(gameState.questions.indexOf(question));
    return question;
};

const updateScoreDisplay = () => {
    if (gameState.score > 0) {
        elements.scoreDisplays[gameState.score - 1].style.backgroundColor = "transparent";
        elements.scoreDisplays[gameState.score - 1].style.color = "gold";
    }
    elements.scoreDisplays[gameState.score].style.backgroundColor = "gold";
    elements.scoreDisplays[gameState.score].style.color = "black";
};

const displayQuestion = () => {
    gameState.currentQuestion = getRandomQuestion();
    if (!gameState.currentQuestion) return;

    elements.questionDisplay.textContent = gameState.currentQuestion.pitanje;
    const shuffledAnswers = shuffleArray([...gameState.currentQuestion.odgovor]);
    
    Object.keys(elements.options).forEach((key, index) => {
        elements.options[key].textContent = shuffledAnswers[index];
    });
};

const handleCorrectAnswer = () => {
    elements.resultDisplay.textContent = "TAČAN";
    elements.resultDisplay.style.color = "gold";
    gameState.score++;
    sounds.correct.play();
    updateScoreDisplay();

    if (gameState.score === 10) {
        setTimeout(() => {
            elements.questionDisplay.textContent = "ČESTITAMO UPRAVO STE POSTALI MILIONER";
            sounds.million.play();
            setTimeout(() => {
                alert("Čestitamo, postali ste milioner!");
                window.location.href = "index.html";
            }, 3000);
        }, 1000);
    } else {
        setTimeout(displayQuestion, 1000);
    }
};

const handleWrongAnswer = () => {
    elements.resultDisplay.textContent = "NETAČAN";
    elements.resultDisplay.style.color = "red";
    sounds.wrong.play();
    
    setTimeout(() => {
        alert(`Osvojili ste ${gameState.score * 100000}$`);
        window.location.href = "milioner.html";
    }, 2000);
};

// Event handlers
const startGame = () => {
    elements.startScreen.style.display = "none";
    sounds.start.play();
    displayQuestion();
};

const cancelGame = () => {
    window.location.href = "milioner.html";
};

const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === gameState.currentQuestion.tacanOdgovor) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
};

const useHelp = (type) => {
    if (type === 'call' && !gameState.helpUsed.call) {
        elements.resultDisplay.textContent = "poziv prijatelja";
        gameState.helpUsed.call = true;
    } else if (type === 'audience' && !gameState.helpUsed.audience) {
        elements.resultDisplay.textContent = "Pomoc publike";
        gameState.helpUsed.audience = true;
    }
};

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
    elements.startScreen.style.display = "block";
    elements.yesButton.addEventListener("click", startGame);
    elements.noButton.addEventListener("click", cancelGame);
    
    // Add event listeners to answer options
    Object.keys(elements.options).forEach(key => {
        elements.options[key].addEventListener("click", () => checkAnswer(elements.options[key].textContent));
    });
});