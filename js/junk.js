// console.log("hey");

//honestly this document is just for planning out the logic without DOM manipulation.
//for the most part.
//most of this code will be used in the final product unless otherwise stated.

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

// var card1 = new cardMaker("queen", "hearts", 10)
// var card2 = new cardMaker("jack", "hearts", 10)

// console.log(card1)
// console.log(card2)

// deck.push(card1, card2);

// console.log(deck);

suits.forEach(function(currentValue){
  // console.log(suits[currentValue])
  for(var i = 0; i < names.length; i++){
    var cards = new cardMaker(names[i], currentValue, values[i])
    deck.push(cards)
  }
})

// console.log(deck.length);

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

shuffle(deck);

// console.log(shuffle(deck));

//===========================
// getting player info
//===========================

var player = {
  name: "",
  totalMonies: 1000,
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
  // $("#reset").click(restartGame);
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
  addDeckImage();
}

function addDeckImage(){
  $("#deck").append("<img src=images/back_card.jpg>")
  $("img").attr("id", "deck-img")
}

$("#deck-img").click(gamePlay);



function begin(){
  $("#start").click(startGame);
}

begin();

//=============================================
// give the player and dealer their first card
//=============================================

//dealer gets card, player gets a card. dealer gets card,
//player gets card----- if dealer has less than 17, has to keep
//playing. player plays as they wish until they reach 21 or over.

//if player < 21, then give them option to hit or pass. 
// hit function to get one card.

//make an object for the dealer
//make properties for both dealer and player that are empty arrays to
//push cards into. that way, i can use array.reduce();

var currentPlayer = player;

// console.log(player["cards"].length);
// player["cards"].push(1, 2, 3);
// console.log(player["cards"].length);

function initialCards(){
  while(player["cards"].length !== 2 || dealer["cards"].length !== 2){
    if (currentPlayer === player){
      addCard(currentPlayer)
      currentPlayer = dealer;
    }else{
      addCard(currentPlayer);
      currentPlayer = player;
    }
  }
}

function addCard(currentPlayer){ //can use this as the generic "get a card from the deck" function
  var card = deck.pop();
  currentPlayer["cards"].push(card)
  // console.log(currentPlayer["cards"])
}

// initialCards();
// console.log(player["cards"][0]["value"])
// console.log(player["cards"][1]["value"])
// console.log(player["cards"][2]["value"]) //this should return undefined bc it's out of the array bounds

//=============================================
// total the cards and adjust for ace value
//=============================================

function getTotal(currentPlayer){
  var totalArray = [];
  for(var i = 0; i < currentPlayer["cards"].length; i++){
    totalArray.push(currentPlayer["cards"][i]["value"])
    // console.log(totalArray);
  }
  var total = totalArray.reduce(function(previous, current) {return previous + current})
  // console.log(total);
  aceCheck(currentPlayer, total)
}

// getTotal(player);
// getTotal(dealer);

function aceCheck(currentPlayer, total){
  if (total > 21 && (currentPlayer["cards"][0]["suit"] === "ace" || currentPlayer["cards"][1]["suit"] === "ace")){
    var finalTotal = total - 10 //make the ace act as a one instead of an eleven
    console.log(finalTotal)
    currentPlayer.total = finalTotal
  }else{
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
    console.log("bust")
  }else{
    hitOrStay();
  }
}

function hitOrStay(){
  //something to ask the player what they would like to do (front end?)
  //front end function adding prompt and two buttons
  //depending on which one is clicked, something different will happen
}

function hitPlayer(){
  addCard(player);
  getTotal(player);
}

function passPlayer(){
  getTotal(dealer);
  evaluateDealerTotal();
}

function evaluateDealerTotal(){
  if (dealer.total > 21){
    console.log("bust")
  }else if (dealer.total < 17){
    hitDealer();
  }else{
    compareTotals();
  }
}

function hitDealer(){
  addCard(dealer);
  getTotal(dealer);
  evaluateDealerTotal();
}


function compareTotals(){
  if (dealer.total === player.total){
    console.log("tie");
    neutralMonies();
  }else if (dealer.total > player.total){
    console.log("dealer wins");
    loseMonies();
  }else{
    console.log("player wins")
    winMonies();
  }
}

//=================
// money functions
//=================

function winMonies(){
  player.totalMonies = player.totalMonies + (player.bet * 2)
}

function loseMonies(){
  player.totalMonies = player.totalMonies - player.bet
}

function neutralMonies(){
  player.totalMonies = player.totalMonies + player.bet
}

function gamePlay(){
  initialCards();
  getTotal(player);
  evaluatePlayerTotal();
}

