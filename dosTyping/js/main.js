(function () {
  let startBtn = $(".startBtn");
  let mainInput = $(".main-input");
  let allLines = $(".line");
  let allText = [];
  let score = 0;
  let displayResult = $(".display-result");

  startBtn.on("click", startGame);

  function startGame() {
    $(this).hide();
    mainInput.focus();
    //setup
    let speed = 1; // brzina kojom zelimo da se pomeraju rijeci, to je u stvari 1px, po 1px ce se pomerati npr. na svakih 100ms
    let textLength = 3;
    let typingWordst = words.filter((word) => word.length == textLength); // da se vrate rijeci sa tri slova
    let lvl = 6; //level od npr. 1-20, level 1 je za korisnike koji ne znaju da kucaju i to je ultra sporo. Mi smo izabrali 6

    let speedUp = setInterval(function () {
      textLength++;
      typingWordst = words.filter((word) => word.length == textLength);
    }, 20000);

    mainInput.on("keyup", checkInputTyping);
    function checkInputTyping() {
      let inputVal = $(this).val();
      let self = $(this);
      if (allText.includes(inputVal)) {
        let index = allText.indexOf(inputVal);
        allText.splice(index, 1);
        $("span")
          .filter(function () {
            return $(this).text() == inputVal; //vrati mi taj span koji ima text koji je jednak inputu, tj. onome sto je korisnik kucao
          })
          .css("background", "blue")
          .fadeOut(100, function () {
            $(this).remove();
          });
        self.val("");
        score++;
        displayResult.html(score);
      }
    }
    //insert spans

    function insertSpans() {
      for (let i = 0; i < allLines.length; i++) {
        let rand = Math.floor(Math.random() * 20); //zelimo da smanjimo mogucnost da se u svakoj liniji ispise po jedan span i zbog toga smo stavili * 20
        if (rand <= lvl) {
          let text = chooseText();
          allText.push(text);
          $(allLines[i]).append(`<span>${text}</span>`);
        }
      }
      setTimeout(insertSpans, 7000);
    }
    insertSpans();

    function chooseText() {
      //zelimo da izaberemo jednu rijec
      let rand = Math.floor(Math.random() * typingWordst.length); //treba da vrati random odabrana rijec
      let savedText = typingWordst[rand];
      typingWordst.splice(rand, 1); //ovdje izbacujemo rijec koju smo izabrali iz ovog array, da se ne bi ponavljala ta ista rijec
      return savedText;
    }

    //animacija spanova

    let moveAll = setInterval(function () {
      let allSpans = $("span");
      allSpans.css({
        left: "+=" + speed,
      });
      //testiranje svih pozicija spanova
      $.each(allSpans, (index, el) => {
        let position = $(el).position().left;
        if (position > 850) {
          clearAllIntervals();
        } else if (position > 700 && position < 710) {
          $(el).addClass("danger");
        }
      });
    }, 10);

    function clearAllIntervals() {
      clearInterval(moveAll);
    }
  }
})();
