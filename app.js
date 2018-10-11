// Definiuję zmienne

let cardsContainer = document.getElementById("cardsContainer");
let cards = cardsContainer.getElementsByClassName("card");
let play = document.getElementById("play");
let moves = document.getElementById("movesCountId");
let ul = document.querySelector("ul");
let winner = document.getElementById("winner");
let movesCount = 0;
let points = 0;
let specificMoves = [];

playAgain();
  play.addEventListener("click", playAgain);

  function playAgain() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", makeClick);
    }

    // Wyzerowanie wszystkich zmiennych
    moves.textContent = "0";
    movesCount = 0;
    points = 0;
    winner.textContent = "";

    // Wyczyszczenie kart z klas
    for (let y = 0; y < cards.length; y++) {
      cards[y].classList.remove("clicked");
      cards[y].classList.remove("correct");
    }

    // Przetasowanie macierzy z kartami
    for (var z = ul.children.length; z >= 0; z--) {
      ul.appendChild(ul.children[Math.random() * z | 0]); // | 0 oznacza zaokrąglanie
    }
    console.log(ul.children);

  }

    
    // Funkcja wywoływana podczas kliknięcia na kartę
    function makeClick() {
      this.className += " clicked";
      var thisMove = this.id;
      console.log(thisMove);
      checkIfCorrect();
      movesCount++
      moves.textContent = parseInt(movesCount);

      
      // Funkcja zagnieżdżona, aby zapewnić dostęp do zmiennych
      function checkIfCorrect() {

        // Pushuję aktualny "ruch" jeżeli jest to ruch nr 0 lub ruch nr 1
        if (specificMoves.length < 2) {
          specificMoves.push(thisMove);
          if (specificMoves.length == 2) {
            // Jeżeli użytkownik wykonał dwa ruchy, blokuję na chwile eventListenery
            for (let i = 0; i < cards.length; i++) {
              cards[i].removeEventListener("click", makeClick);
            }
            setTimeout(function() { for (let i = 0; i < cards.length; i++) {

              if (!cards[i].classList.contains("correct")) {
                cards[i].addEventListener("click", makeClick);
              }
             
              
            } }, 700);

            /* 
            Dodaję dwójkę ponieważ druga taka sama karta ma w id dwójkę, tj. power - power2
            Warunek sprawdzajacy czy pierwsza zaznaczona karta jest TAKA SAMA jak karta druga
            */
            if ((specificMoves[0] == specificMoves[1] + 2) || specificMoves[0] + 2 == specificMoves[1]) {
              
              // Zaznaczam poprawne karty
              document.getElementById(specificMoves[0]).setAttribute("class", "card correct animated tada");
              document.getElementById(specificMoves[1]).setAttribute("class", "card correct animated tada");
        
              // Usuwam listenery z odznaczonych kart
              document.getElementById(specificMoves[0]).removeEventListener("click", makeClick, true);
              document.getElementById(specificMoves[1]).removeEventListener("click", makeClick, true);

              // Dodaję punkty i zeruję zapamiętane ruchy
              points++;
              specificMoves = [];

              // Zwycięstwo!
              if (points == 8) {
                winner.textContent = "Winner";
              } else {

              }

              // Warunek sprawdzający, czy pierwsza zaznaczona karta jest INNA niż karta druga
            } else if (((specificMoves[0] != specificMoves[1] + 2) || specificMoves[0] + 2 != specificMoves[1]) && specificMoves[0] != specificMoves[1]) {

              console.log(this);
              setTimeout(function() { 
              document.getElementById(specificMoves[0]).setAttribute("class", "card");
              document.getElementById(specificMoves[1]).setAttribute("class", "card");
              specificMoves = [];
            }, 700);
              
              
            }
            
          } else {
            
          }
        } else {
          specificMoves = [];
        }
        
      }
    }