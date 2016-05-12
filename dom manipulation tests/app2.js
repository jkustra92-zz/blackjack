
function cardMaker(name, suit, value){
  this.name = name,
  this.suit = suit,
  this.value = value
}

function makecard(){
  return new cardMaker('jack', 'clubs', '10')
}

function addcard() {
  var card = makecard();
  var imgname = card.name + "_of_" + card.suit;
  var yomama = $("<img>").attr('src', 'images/' + imgname + '.png').attr('height', 100).attr('width', 50)
  $('#foo').append(yomama)
}

