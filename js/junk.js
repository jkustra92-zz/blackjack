// console.log("hey");


//===========================
// making the deck
//===========================


// var suits = ["hearts", "clubs", "spades", "diamonds"];
// var names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "King", "Queen", "Jack"];
// var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// console.log(suits);
// console.log(names);
// console.log(values);


// var deck = []

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

// suits.forEach(function(index, currentValue){
//   // console.log(suits[currentValue])
//   for(var i = 0; i < names.length; i++){
//     var cards = new cardMaker(names[i], suits[currentValue], values[i])
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

var player = {
  name: "",
  totalMoney: 1000,
  bet: ""
}

function askForName(){
  var playerName = prompt("what is your name?");
  player.name = playerName;
}
askForName();
console.log(player);