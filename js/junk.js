// console.log("hey");

//honestly this document is just for planning out the logic without DOM manipulation.
//for the most part.
//most of this code will be used in the final product unless otherwise stated.

//===========================
// making the deck
//===========================


// var suits = ["hearts", "clubs", "spades", "diamonds"];
// var names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "King", "Queen", "Jack", "Ace"];
// var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

// console.log(suits);
// console.log(names);
// console.log(values);


// var deck = [];

// function cardMaker(name, suit, value){
// 	this.name = name,
// 	this.suit = suit,
// 	this.value = value
// }

// // var card1 = new cardMaker("queen", "hearts", 10)
// // var card2 = new cardMaker("jack", "hearts", 10)

// // console.log(card1)
// // console.log(card2)

// // deck.push(card1, card2);

// console.log(deck);

// suits.forEach(function(currentValue){
//   // console.log(suits[currentValue])
//   for(var i = 0; i < names.length; i++){
//     var cards = new cardMaker(names[i], currentValue, values[i])
//     deck.push(cards)
//   }
// })

// console.log(deck.length);

//===========================
// shuffling the deck
//===========================

// function shuffle(arr) {
//     for (var i = arr.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         console.log(j) //before i had an issue with numbers repeating themselves when i used "deck" as both argument and parameter
//         var temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//     }
//     return arr; //returning bc i want to ensure that the main deck variable is overwritten with this shuffled one.
// }

// console.log(shuffle(deck));

//===========================
// getting player info
//===========================

// var player = {
//   name: "",
//   totalMoney: 1000,
//   bet: ""
// }

// function startGame(){
//   $("#start").remove();
//   $("#start-screen").append("<button>");
//   $("button").attr("id", "reset").text("reset");                                                 
//   // $("#reset").click(restartGame);
//   askForName();
// }

// function askForName(){
//   addNameTextInput();
//   addNameSubmitButton(); 
// }

// function addNameTextInput(){
//   $("#start-screen").append("<p>");
//   $("p").append("<input>")
//   $("input").attr("id", "name-box")
//   $("#name-box").attr("type","text");
//   $("#name-box").attr("placeholder", "enter your name");
// }

// function addNameSubmitButton(){
//   var $submitButton = $("<button>submit</button>");
//   $submitButton.attr("id", "submit");
//   $submitButton.attr("type", "submit")
//   $("p").append($submitButton);
//   $submitButton.click(obtainName) 
// }

// function obtainName(){
//   player.name = $("#name-box").val();
//   askForBet();
// }

// function askForBet(){
//   addBetTextInput();
//   addBetSubmitButton();
// }

// function addBetTextInput(){
//   $("p").remove();
//   $("#start-screen").append("<p>");
//   $("p").append("<input>")
//   $("input").attr("id", "bet-box")
//   $("#bet-box").attr("type","text");
//   $("#bet-box").attr("placeholder", "enter your bet");
// }

// function addBetSubmitButton(){
//   var $submitButton2 = $("<button>submit</button>");
//   $submitButton2.attr("id", "submit2");
//   $submitButton2.attr("type", "submit")
//   $("p").append($submitButton2);
//   $submitButton2.click(obtainBet)
// }

// function obtainBet(){
//   player.bet = $("#bet-box").val();
//   player.totalMoney = player.totalMoney - player.bet;
//   console.log(player);
// }

// function begin(){
//   $("#start").click(startGame);
// }

// begin();

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

var currentPlayer = "player";
var playerX = 0;
var dealerX = 0;
function initialCards(){
  while(playerX !== 2 || dealerX !== 2){
    if (currentPlayer === "player"){
      ++playerX
      currentPlayer = "dealer";
    }else{
      currentPlayer = "player";
      ++dealerX;
    }
  }
}
