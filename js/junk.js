// console.log("hey");

//honestly this document is just for planning out the logic without DOM manipulation.
//for the most part.
//most of this code will be used in the final product unless otherwise stated.

//===========================
// making the deck
//===========================

$(document).ready(function(){

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

// console.log(deck);

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
      addCard(currentPlayer);
      displayPlayerCards(currentPlayer.cards[currentPlayer.cards.length-1]);
      currentPlayer = dealer;
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

function displayPlayerCards(card){
    var imgname = card.name + "_of_" + card.suit;
    var playerCard = $("<img>").attr("src", "images/" + imgname + ".png").attr("display", "inline-block").attr("height", 250).attr("width", 172)
    $("#player-spot").append(playerCard)
}

function displayDealerCards(card){
  var imgname = card.name + "_of_" + card.suit;
  var dealerCard = $("<img>").attr("src", "images/" + imgname + ".png").attr("display", "inline-block").attr("height", 250).attr("width", 172)
  $("#dealer-spot").append(dealerCard)
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
    $("#instructions").text("player busts")
    loseMonies();
    console.log(player);
  }else{
    hitOrStayDisplay();
  }
}

function hitOrStayDisplay(){
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

function hitPlayer(){
  $("#menu").remove();
  $("#button-container").remove()
  addCard(player);
  displayPlayerCards(player.cards[player.cards.length-1]);
  getTotal(player);
  evaluatePlayerTotal();
}

function stayPlayer(){
  // console.log("no")
  $("#menu").remove();
  $("#button-container").remove()
  getTotal(dealer);
  evaluateDealerTotal();
}

function evaluateDealerTotal(){
  if (dealer.total > 21){
    $("#instructions").text("dealer busts")
    winMonies();
  }else if (dealer.total < 17){
    hitDealer();
  }else{
    compareTotals();
  }
}

function hitDealer(){
  addCard(dealer);
  displayDealerCards(dealer.cards[dealer.cards.length-1])
  getTotal(dealer);
  evaluateDealerTotal();
}


function compareTotals(){
  if (dealer.total > 21 && player.total > 21){
    neutralMonies();
    $("#instructions").text("you both suck")
  }else if (dealer.total === player.total){
    neutralMonies();
    $("#instructions").text("it's a tie")
  }else if (dealer.total > player.total){
    loseMonies();
    $("#instructions").text("dealer wins")
  }else{
    winMonies();
    $("#instructions").text("player wins")
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

})

