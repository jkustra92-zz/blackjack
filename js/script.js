$(document).ready(function(){
// console.log("hey, i'm working!")

//===========================
// making the deck
//===========================

  var suits = ["hearts", "clubs", "spades", "diamonds"];
  var names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "King", "Queen", "Jack", "Ace"];
  var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

// console.log(suits);
// console.log(names);
// console.log(values);


  var deck = [];

  function cardMaker(name, suit, value){
    this.name = name,
    this.suit = suit,
    this.value = value
  }

  suits.forEach(function(currentValue){
    // console.log(suits[currentValue])
    for(var i = 0; i < names.length; i++){
      var cards = new cardMaker(names[i], currentValue, values[i])
      deck.push(cards)
    }
  })

//===========================
// shuffling the deck
//===========================

  function shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          // console.log(j) //before i had an issue with numbers repeating themselves when i used "deck" as both argument and parameter
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
      return arr; //returning bc i want to ensure that the main deck variable is overwritten with this shuffled one.
  }

  shuffle(deck); ////////////

//===========================
// getting player info
//===========================

  $("#start").click(startGame);

  var player = {
    name: "",
    totalMonies: 200,
    bet: "",
    cards: [],
    total: ""
  }

  var dealer = {
    name: "dealer mcdealerface",
    cards: [],
    total: ""
  }

  function startGame(){
    $("#start").remove();
    $("#start-screen").append("<button>");
    $("button").attr("id", "reset").text("reset");                                                 
    $("#reset").click(restartGame);
    askForName();
  }

  function askForName(){
    addNameTextInput();
    addNameSubmitButton(); 
  }

  function addNameTextInput(){
    $("#start-screen").append("<p>");
    $("p").append("<input>")
    $("input").attr("id", "name-box")
    $("#name-box").attr("type","text");
    $("#name-box").attr("placeholder", "enter your name");
  }

  function addNameSubmitButton(){
    var $submitButton = $("<button>submit</button>");
    $submitButton.attr("id", "submit");
    $submitButton.attr("type", "submit")
    $("p").append($submitButton);
    $submitButton.click(obtainName) 
  }

  function obtainName(){
    player.name = $("#name-box").val();
    askForBet();
  }

  function askForBet(){
    addBetTextInput();
    addBetSubmitButton();
  }

  function addBetTextInput(){
    $("p").remove();
    $("#start-screen").append("<p>");
    $("p").append("<input>")
    $("input").attr("id", "bet-box")
    $("#bet-box").attr("type","text");
    $("#bet-box").attr("placeholder", "enter your bet");
  }

  function addBetSubmitButton(){
    var $submitButton2 = $("<button>submit</button>");
    $submitButton2.attr("id", "submit2");
    $submitButton2.attr("type", "submit")
    $("p").append($submitButton2);
    $submitButton2.click(obtainBet)
  }

  function obtainBet(){
    player.bet = $("#bet-box").val();
    player.totalMoney = player.totalMoney - player.bet;
    addPlayerInfo();
    $("#instructions").text("click on the deck to begin")
    addDeckImage();
  }

  function addPlayerInfo(){
    getPlayerName();
    getPlayerMonies();
    getPlayerBet();
  }

  function getPlayerName(){
    var $playerName = $("<p>")
    $playerName.attr("id", "player-name")
    $playerName.text("name: " + player.name)
    $("#player-info-box").append($playerName) 
  }

  function getPlayerMonies(){
    var $playerMonies = $("<p>")
    $playerMonies.attr("id", "player-monies")
    $playerMonies.text("total money: " + "$" + player.totalMonies)
    $("#player-info-box").append($playerMonies) 
  }

  function getPlayerBet(){
    var $playerBet = $("<p>")
    $playerBet.attr("id", "player-bet")
    $playerBet.text("current bet: " + "$" + player.bet)
    $("#player-info-box").append($playerBet)
  }

  function addDeckImage(){
    $("#deck").append("<img src=images/back_card.jpg>")
    $("img").attr("id", "deck-img")
    $("#bet-box").hide();
    $("#submit2").hide(); 
    $("#deck").click(gamePlay);
  }

//=============================================
// give the player and dealer their first card
//=============================================

  var currentPlayer = player;

// console.log(player["cards"].length);
// player["cards"].push(1, 2, 3);
// console.log(player["cards"].length);

  function initialCards(){
    while(player["cards"].length !== 2 || dealer["cards"].length !== 2){
      if (currentPlayer === player){
        addCard(currentPlayer);
        displayPlayerCards(currentPlayer.cards[currentPlayer.cards.length-1])
        // displayPlayerCards(currentPlayer.cards[currentPlayer.cards.length-1]); //originally, did currentPlayer.cards and ended up with all the cards. which is not right.
        currentPlayer = dealer;                                                 //hence the whole inception situation ocurring here. wanted the card at the index one less than the length.
      }else{
        addCard(currentPlayer);
        displayDealerCards(currentPlayer.cards[currentPlayer.cards.length-1]);
        currentPlayer = player;
      }
    }
  }

  function addCard(currentPlayer){ //can use this as the generic "get a card from the deck" function
    var card = deck.pop();
    currentPlayer["cards"].push(card)
    // console.log(currentPlayer["cards"])
  }

  function displayPlayerCards(card){            //probably an unorthodox way to do this, but using the name and suit to correlate with the image names and set them as attributes to 
      var imgname = card.name + "_of_" + card.suit; //the images that will be appended to both dealer and player divs.
      var playerCard = $("<img>").attr("src", "images/" + imgname + ".png").attr("display", "inline-block").attr("height", 250).attr("width", 172)
      $("#player-spot").append(playerCard)
  }

  function displayDealerCards(card){
    // console.log(dealer["cards"].length)
    if (dealer["cards"].length === 1){  //expression that makes the first card display the back of the card
      var imgname = "back_card_vertical"
      var $dealerCard = $("<img>").attr("src", "images/" + imgname + ".jpg").attr("display", "inline-block").attr("height", 250).attr("width", 172).attr("id", "dealerfirst")
      $("#dealer-spot").append($dealerCard)
    }else{
      var imgname = card.name + "_of_" + card.suit;
      var $dealerCard = $("<img>").attr("src", "images/" + imgname + ".png").attr("display", "inline-block").attr("height", 250).attr("width", 172)
      $("#dealer-spot").append($dealerCard)
    }
  }

  function displayDealerFirstCard(index){
      console.log(dealer["cards"][0].name)
      var imgname = dealer["cards"][0].name + "_of_" + dealer["cards"][0].suit;
      var $dealerCard = $("<img>").attr("src", "images/" + imgname + ".png").attr("display", "inline-block").attr("height", 250).attr("width", 172)
      $("#dealerfirst").replaceWith($dealerCard)
  }

  // initialCards();
  // console.log(player["cards"][0]["value"])
  // console.log(player["cards"][1]["value"])
  // console.log(player["cards"][2]["value"]) //this should return undefined bc it's out of the array bounds

//=============================================
// total the cards and adjust for ace value
//=============================================

  function getTotal(currentPlayer){                       //taking the value properties of the objects in each player's card array bc you can't use                     
    var totalArray = [];                                  //array.reduce with objects. only arrays!!!
    for(var i = 0; i < currentPlayer["cards"].length; i++){
      totalArray.push(currentPlayer["cards"][i]["value"])
      // console.log(totalArray);
    }
    var total = totalArray.reduce(function(previous, current) {return previous + current}) //i honestly can't believe i used this right. yay!
    // console.log(total);
    aceCheck(currentPlayer, total)
  }

  // getTotal(player);
  // getTotal(dealer);

  function aceCheck(currentPlayer, total){
    if (total > 21 && (currentPlayer["cards"][0]["suit"] === "ace" || currentPlayer["cards"][1]["suit"] === "ace")){
      var finalTotal = total - 10 //make the ace act as a one instead of an eleven.
      console.log(finalTotal)
      currentPlayer.total = finalTotal    //needed a way to assign each player's total to themselves for later comparison purposes.
    }else{                                //easiest to just store them inside the dealer and player objects and access them when needed.
      var finalTotal = total;
      // console.log(finalTotal)
      currentPlayer.total = finalTotal
    }
  }

//=====================
// evaluate the player
//=====================

  function evaluatePlayerTotal(){
    if (player.total > 21){
      displayDealerFirstCard(); 
      $("#instructions").text(player.name + " busts")
      loseMonies();
      // console.log(player);
    }else{
      hitOrStayDisplay();
    }
  }

  function hitOrStayDisplay(){                    //makes the buttons.
    var $menu = $("<div>")
    $menu.attr("id", "menu")
    $menu.text("would you like to hit or stay?")
    $("#player-spot").append($menu)
    var $buttonContainer = $("<p>")
    // console.log($buttonContainer)
    $buttonContainer.attr("id", "button-container")
    // console.log($buttonContainer)
    $("#menu").append($buttonContainer)
    addHitButton();
    addStayButton();
    $("#hit-button").click(hitPlayer)
    $("#stay-button").click(stayPlayer)
  }
  function addHitButton (){
    var $hitButton = $("<button>hit</button>")
    $hitButton.attr("id", "hit-button")
    $hitButton.attr("display", "inline-block")
    $("#button-container").append($hitButton)
  }

  function addStayButton (){
    var $stayButton = $("<button>stay</button>")
    $stayButton.attr("id", "stay-button")
    $stayButton.attr("display", "inline-block")
    $("#button-container").append($stayButton)
  }

  function hitPlayer(){                             //if the player hits the button, another card is added and displayed
    $("#menu").remove();                            //following the pattern of each player getting their initial cards, but
    $("#button-container").remove()                 //no while loop.
    addCard(player);
    displayPlayerCards(player.cards[player.cards.length-1]);
    getTotal(player);                               //have to get the new total and evaluate it again. 
    evaluatePlayerTotal();
  }

  function stayPlayer(){
    // console.log("no")                          //if the player decides to stay, get rid of the buttons and move on to evaluating
    $("#menu").remove();                          //the dealer. making blackjack is hard when you don't really get it, but this was much
    $("#button-container").remove()               //easier than whatever i was attempting before i read the actual rules.
    getTotal(dealer);
    evaluateDealerTotal();
  }

//=====================
// evaluate the dealer
//=====================

  function evaluateDealerTotal(){  
    displayDealerFirstCard();          
    if (dealer.total > 21){
      $("#instructions").text(dealer.name + " busts")
      winMonies();
    }else if (dealer.total < 17){                 //if the dealer's total is under 17, they have to take cards until they are over 17. right??? i think??
      hitDealer();
    }else{
      compareTotals();
    }
  }

  function hitDealer(){
    addCard(dealer);                                //once again, same as above. thank you, past me, for making one "add card" function. it has been so helpful.
    displayDealerCards(dealer.cards[0])
    getTotal(dealer);
    evaluateDealerTotal();
  }

//====================
// comparing the two
//====================

  function compareTotals(){
    displayDealerFirstCard(); 
    if (dealer.total > 21 && player.total > 21){      //so neither player busted and we have some comparing to do. that happens here.
      neutralMonies();
      $("#instructions").text("you both suck")
    }else if (dealer.total === player.total){
      neutralMonies();
      $("#instructions").text("it's a tie")
    }else if (dealer.total > player.total){
      loseMonies();
      $("#instructions").text(dealer.name + " wins");
    }else{
      winMonies();
      $("#instructions").text(player.name + " wins");
    }
  }
//=================
// money functions
//=================

  function winMonies(){
    player.totalMonies = player.totalMonies + (player.bet * 2)
    window.setTimeout(function(){newHand()}, 4000);
  }

  function loseMonies(){
    player.totalMonies = player.totalMonies - player.bet
    window.setTimeout(function(){newHand()}, 4000);
  }

  function neutralMonies(){
    player.totalMonies = player.totalMonies + player.bet
    window.setTimeout(function(){newHand()}, 4000);
  }

  function gamePlay(){
    // console.log("whyyyyy")
    $("#deck").off();
    $("#instructions").text("")
    initialCards();
    getTotal(player);
    evaluatePlayerTotal();
  }

//==================
// replay functions
//==================

  function newHand(){
    $("#instructions").text("play again?")
    $("#reset").remove()
    var $yes = $("<button>yes</button>")
    $yes.attr("id", "yes")
    $("#start-screen").append($yes)
    $("#player-bet").remove();
    $("#player-monies").text("total money: " + "$" + player.totalMonies)
    $("#yes").click(putCardsBack)
  }

  function putCardsBack(){
    dealer["cards"] = []
    player["cards"] = []
    // console.log(dealer["cards"].length)
    // console.log(player["cards"].length)
    clearBoard();
  }

  function clearBoard(){
    $("#bet-box").show();
    $("#submit2").show();
    $("#deck-img").remove();
    $("#player-spot").empty();
    $("#dealer-spot").empty();
    $("#player-info-box").text("")
    $("#instructions").text("enter your bet to continue");
    $("#yes").attr("id", "reset")
    $("#reset").text("reset")
  }

  function restartGame(){
    location.reload();
  }

});