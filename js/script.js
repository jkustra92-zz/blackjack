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

shuffle(deck);

function startGame(){  //this could be where the player and dealer get their first cards?
                      //pop elements from deck array and push it into a player/dealer array, respectively??
}

function checkTotal(){ //from my understanding, 

}

function hit(){       //pop off ONE array element from the deck. yes ma'am. also should make this generic and just
                      //pass through the object so the player and dealer don't have two separate ones? just a thought! :D
}

function restartGame(){ //when restart button is clicked, do the thing.

}

function blackJack(){ //overall encompassing function? maybe?

}



});