var prva=document.getElementById("1")
var druga=document.getElementById("2")
var treca=document.getElementById("3")
var cetvrta=document.getElementById("4")
var peta=document.getElementById("5")
var sesta=document.getElementById("6")
var sedma=document.getElementById("7")
var osma=document.getElementById("8")
var deveta=document.getElementById("9")
var deseta=document.getElementById("10")

var roditelj=document.getElementById("prvi_box")
var zaUklonit=document.getElementById("b1")
var zaUklonit1=document.getElementById("b2")
var zaUklonit2=document.getElementById("b3")

var prikazanaPitanja = [];

var pitanja = [
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
    },
];

var brojac = 0;
var mjestoZaPitanje = document.getElementById("mjestoZaPitanje");
var mjestoZaIspis = document.getElementById("sretno");
var opcije = {
    A: document.getElementById("A"),
    B: document.getElementById("B"),
    C: document.getElementById("C"),
    D: document.getElementById("D"),
};

var randomPitanje;
var randomIndex;


var pred_odgovor=document.getElementById("pred_odgovor");
var tacan_odgovor=document.getElementById("tacan_odgovor");
var netacan_odgovor=document.getElementById("netacan_odgovor");
var za_osvojen_milion=document.getElementById("za_osvojen_milion");


document.addEventListener("DOMContentLoaded", function () {
    var start = document.getElementById("start-screen");
    var yesButton = document.getElementById("yesBtn");
    var noButton = document.getElementById("noBtn");

    yesButton.addEventListener("click", startGame);
    noButton.addEventListener("click", cancelGame);

    function startGame() {
        start.style.display = "none";
        prikazPitanja();
        function pocetni_sound(){
            var pocetni=new Audio("pocetni.mp3")
            pocetni.play();
        }

    }   
        
        function pitanjee(parametar) {
            const index = Math.floor(Math.random() * pitanja.length);
            if (parametar.includes(index)) {
                return pitanjee(parametar);
            }
            return pitanja[index];
        }
        
        function prikazPitanja() {
            if (pitanja.length === 0) {
                return;
            }
        
            randomPitanje = pitanjee(prikazanaPitanja);
            prikazanaPitanja.push(pitanja.indexOf(randomPitanje));
        
            mjestoZaPitanje.textContent = randomPitanje.pitanje;

            /*prekopirano sa chatgpta za ponudjenje odgovore*/
            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }
        
            var ponudjeniOdgovori = [
                randomPitanje.odgovor[0],
                randomPitanje.odgovor[1],
                randomPitanje.odgovor[2],
                randomPitanje.odgovor[3],
            ];
        
            ponudjeniOdgovori = shuffleArray(ponudjeniOdgovori);
        
            opcije.A.textContent = ponudjeniOdgovori[0];
            opcije.B.textContent = ponudjeniOdgovori[1];
            opcije.C.textContent = ponudjeniOdgovori[2];
            opcije.D.textContent = ponudjeniOdgovori[3];
        }

    function cancelGame() {
        window.location.href = "milioner.html";
    }

    function showStartScreen() {
        start.style.display = "block";
    }

    showStartScreen();
});

function provjeriOdgovor(konacno) {
    
    if (konacno === randomPitanje.tacanOdgovor ) {
    
        mjestoZaIspis.textContent="Odgovor je:"
        setTimeout(function e12(){
        mjestoZaIspis.textContent = "TAČAN";
        mjestoZaIspis.style.color = "gold";
        brojac++;
        console.log(brojac)
        },1000)
    
      


        if (brojac===0){
            setTimeout(function e1(){
            prva.style.backgroundColor="gold";
            prva.style.color="black";
        },1000
            )
        }
        if (brojac===1){
            setTimeout(function e2(){
            druga.style.backgroundColor="gold";
            druga.style.color="black";
            prva.style.backgroundColor="transparent";
            prva.style.color="gold";
            },1000)
        }
        if (brojac===2){
            setTimeout(function e3(){
            treca.style.backgroundColor="gold";
            treca.style.color="black";
            druga.style.backgroundColor="transparent";
            druga.style.color="gold"
            },1000)
        }
        if (brojac===3){
            setTimeout(function e4(){
            cetvrta.style.backgroundColor="gold";
            cetvrta.style.color="black"
            treca.style.backgroundColor="transparent";
            treca.style.color="gold";
            },1000)
        }
        if (brojac===4){
            setTimeout(function e5(){
            peta.style.backgroundColor="gold";
            peta.style.color="black"
            cetvrta.style.backgroundColor="transparent";
            cetvrta.style.color="gold"
            },1000)
        }
        if (brojac===5){
            setTimeout(function e1(){
            sesta.style.backgroundColor="gold";
            sesta.style.color="black"
            peta.style.backgroundColor="transparent";
            peta.style.color="gold"
            },1000)
        }
        if (brojac===6){
            setTimeout(function e1(){
            sedma.style.backgroundColor="gold";
            sedma.style.color="black"
            sesta.style.backgroundColor="transparent";
            sesta.style.color="gold"
            },1000)
        }
        if (brojac===7){
            setTimeout(function e1(){
            osma.style.backgroundColor="gold";
            osma.style.color="black"
            sedma.style.backgroundColor="transparent";
            sedma.style.color="gold"
            },1000)
        }
        if (brojac===8){
            setTimeout(function e1(){
            deveta.style.backgroundColor="gold";
            deveta.style.color="black"
            osma.style.backgroundColor="transparent";
            osma.style.color="gold";
            },1000)
        }

        if (brojac===9){
            setTimeout(function e1(){
            deseta.style.backgroundColor="gold";
            deseta.style.color="black"
            deveta.style.backgroundColor="transparent";
            deveta.style.color="gold";
            },1000)
        }


        
            if (brojac===10){
                deseta.style.backgroundColor="gold";
                deseta.style.color="black"
                deveta.style.backgroundColor="transparent";
                deveta.style.color="gold";
                setTimeout(function ee(){mjestoZaPitanje.textContent = "ČESTITAMO UPRAVO STE POSTALI MILIONER"
            },1000)
                
                setTimeout(function e1(){
                    alert("čestitamo, Postali ste milioner!")
                
                window.location.href = "milioner.html";
                },3000)
                }
            
            
        function pitanjee(parametar) {
            const index = Math.floor(Math.random() * pitanja.length);
            if (parametar.includes(index)) {
                return pitanjee(parametar);
            }
            return pitanja[index];
        }
        if (brojac<10){
            setTimeout(
        function prikazPitanja() {
            setTimeout(
                function e52(){
                    if (brojac<10){
                        mjestoZaIspis.textContent="SRETNO"
                    }
                    
                },1000
            )
            
          
            
            if (pitanja.length === 0) {
                return;
            }
        
            randomPitanje = pitanjee(prikazanaPitanja);
            prikazanaPitanja.push(pitanja.indexOf(randomPitanje));
        
            mjestoZaPitanje.textContent = randomPitanje.pitanje;
        
            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }
        
            var ponudjeniOdgovori = [
                randomPitanje.odgovor[0],
                randomPitanje.odgovor[1],
                randomPitanje.odgovor[2],
                randomPitanje.odgovor[3],
            ];
        
            ponudjeniOdgovori = shuffleArray(ponudjeniOdgovori);
        
            opcije.A.textContent = ponudjeniOdgovori[0];
            opcije.B.textContent = ponudjeniOdgovori[1];
            opcije.C.textContent = ponudjeniOdgovori[2];
            opcije.D.textContent = ponudjeniOdgovori[3];
        },1000)

    }
    
        
}
else {
    mjestoZaIspis.textContent="odgovor je:"
    setTimeout(function e1(){
    mjestoZaIspis.textContent = "NETAČAN";
    mjestoZaIspis.style.color = "red";
    setTimeout(function () {
        window.location.href = "milioner.html";
    }, 2000);
    setTimeout(function(){
        console.log(brojac)
        alert(`Osvojili ste ${brojac*100000}$`)
    },2000);
},1000)
}

prikazPitanja()

}
brojac1=0
brojac2=0

function pomoc1(){
    if(brojac1<1){
    mjestoZaIspis.textContent="poziv prijatelja"
    brojac1++
}
}

function pomoc2(){
    if(brojac2<1){
    mjestoZaIspis.textContent="Pomoc publike"
    brojac2++
}
}