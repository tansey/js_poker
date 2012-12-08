var game;
var server;
var targetSeat = 0;

testhand = {
  "PokerHand": {
    "Blinds": [
      {
        "Player": "TAP_OR_SNAP",
        "Type": "SmallBlind",
        "Amount": "5"
      },
      {
        "Player": "OsoWhisper",
        "Type": "BigBlind",
        "Amount": "10"
      }
    ],
    "HoleCards": [
      {
        "Rank": "King",
        "Suit": "Hearts"
      },
      {
        "Rank": "Jack",
        "Suit": "Clubs"
      }
    ],
    "Rounds": [
      {
        "Actions": [
          {
            "Player": "Sevillano720",
            "Type": "Fold"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "Dodenburg",
            "Type": "Fold"
          },
          {
            "Player": "TeeJay5",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "15"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": [
          {
            "Rank": "Ten",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Jack",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Eight",
            "Suit": "Clubs"
          }
        ],
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Bet",
            "Amount": "10"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "LC1492",
            "Type": "Fold"
          },
          {
            "Player": "TeeJay5",
            "Type": "Call",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TeeJay5",
            "Type": "Fold"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": {
          "Rank": "Five",
          "Suit": "Spades"
        },
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      },
      {
        "CommunityCards": {
          "Rank": "Nine",
          "Suit": "Clubs"
        },
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      }
    ],
    "Context": {
      "Site": "PartyPoker",
      "Currency": "USD",
      "ID": "2229799540",
      "Table": "Table  12551 ",
      "TimeStamp": "2005-06-19T04:15:10",
      "Format": "CashGame",
      "Button": "1",
      "BigBlind": "10",
      "SmallBlind": "5",
      "BettingType": "FixedLimit",
      "PokerVariant": "TexasHoldEm"
    },
    "Results": [
      {
        "Player": "OsoWhisper",
        "HoleCards": [
          {
            "Rank": "Nine",
            "Suit": "Spades"
          },
          {
            "Rank": "Queen",
            "Suit": "Spades"
          }
        ],
        "WonPots": { "Amount": "258" }
      },
      {
        "Player": "TAP_OR_SNAP",
        "HoleCards": [
          {
            "Rank": "Nine",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Ten",
            "Suit": "Hearts"
          }
        ]
      }
    ],
    "Players": [
      {
        "Name": "TeeJay5",
        "Stack": "526",
        "Seat": "1"
      },
      {
        "Name": "TAP_OR_SNAP",
        "Stack": "301",
        "Seat": "2"
      },
      {
        "Name": "OsoWhisper",
        "Stack": "177.77",
        "Seat": "3"
      },
      {
        "Name": "Sevillano720",
        "Stack": "742",
        "Seat": "4"
      },
      {
        "Name": "Dodenburg",
        "Stack": "458.5",
        "Seat": "6"
      },
      {
        "Name": "LC1492",
        "Stack": "641",
        "Seat": "5"
      }
    ],
    "Rake": "2.00",
    "Hero": "TeeJay5"
  }
};

function catchUp(){
    var round = testhand['PokerHand']['Rounds'].length - 1;

    setFlop(testhand['PokerHand']['Rounds'][1]['CommunityCards']);
    setTurn(testhand['PokerHand']['Rounds'][2]['CommunityCards']);
    setRiver(testhand['PokerHand']['Rounds'][3]['CommunityCards']);
    setHeroCards(testhand);
    setPlayerNames(testhand);

    curActions = testhand['PokerHand']['Rounds'][round]['Actions'];
    curBets = [0,0,0,0,0,0];
    for (var i = 0; i < curActions.length; i++){
        var amt = curActions[i]['Amount'];
        if (amt != null){
            var seat = findSeatNumber(curActions[i]['Player'], testhand);
            curBets[seat] += amt;
        }
    }
    for (var i = 0; i < curBets.length; i++)
        if(curBets[i] > 0)
            setBet(curBets[i], i+1);
        else
            setBet(null,i+1);

    moveButton(targetSeat + 1);
    targetSeat = (targetSeat + 1) % 6;
}

function updateGameState() {
    var sidebar = $('#poker_table');
    var requestData = {
        url: sidebar.data('uid')
    };
    catchUp();

    // $.ajax({
    //     url: '/Games/GetState',
    //     type: 'POST',
    //     data: JSON.stringify(requestData),
    //     dataType: 'json',
    //     contentType: 'application/json; charset=utf-8',
    //     success: function (msg) {
    //         var history = msg.State;
    //         var prevHand = msg.Previous;

    //         if(history.Context.ID != game.Context.ID)
    //                 resetTable();
            
    //         game = history;

    //         // Update the GUI with any 
    //         catchUp();

    //         // Set the timer, or hide it if it's not our turn
    //         if (msg.Timer != null)
    //             setTimer(msg.Timer.Value);
    //         else 
    //             hideTimer();
    //     },
    //     error: function (msg) {
    //         $("#error-results").prepend(msg.responseText);
    //         $("#error-results").prepend(prettyPrint(msg));
    //         $("#error-results").show();
    //     }
    // });
}

function setTimer(val) {
    var timer = $('#game-timer');
    timer.removeClass();
    if (val < 10)
        timer.addClass("timer-warning");
    else
        timer.addClass("timer-normal");
    
    if (val < 0)
        val = 0;

    timer.text(val + " seconds remaining.");
    timer.show();
}
function hideTimer() {
    $('#game-timer').hide();
}

function setPlayerNames(hand){
    players = hand['PokerHand']['Players'];
    for(var i = 0; i < players.length; i++)
        setPlayerName(players[i]['Name'], players[i]['Seat']);
}

function setPlayerName(name, seat){
    var namediv = $('#seat' + seat).children('.name-chips').children('.player-name');
    namediv.text(name);
}

function getCardSrc(rank, suit) {
    rank = rank.toLowerCase();
    if(rank == "two")
        rank = 2;
    else if (rank == "three")
        rank = 3;
    else if (rank == "four")
        rank = 4;
    else if (rank == "five")
        rank = 5;
    else if (rank == "six")
        rank = 6;
    else if (rank == "seven")
        rank = 7;
    else if (rank == "eight")
        rank = 8;
    else if (rank == "nine")
        rank = 9;
    else if (rank == "ten")
        rank = 10;
    return "url('static/images/" + rank + "_of_" + suit.toLowerCase() + ".png')";
}

function setHeroCards(hand) {
    var hero = hand['PokerHand']['Hero'];
    var seat = findSeatNumber(hero, hand);
    var hc = hand['PokerHand']['HoleCards'];
    setHoleCards(hc, seat);
}

function findSeatNumber(player, hand){
    seats = hand['PokerHand']['Players']
    for (var i = 0; i < seats.length; i++){
        if (seats[i]['Name'] == player)
            return seats[i]['Seat']
    }
    return -1;
}

function setHoleCards(hc, seat){    
    var holecards = $('#seat' + seat).children('.holecards');
    var card1 = holecards.children('.holecard1');
    var card2 = holecards.children('.holecard2');

    setCard(card1, hc[0]);
    setCard(card2, hc[1]);
}

function setFlop(flop) {
    setCard($('#flop1'), flop[0]);
    setCard($('#flop2'), flop[1]);
    setCard($('#flop3'), flop[2]);
}

function setTurn(turn) {
    setCard($('#turn'), turn);
}

function setRiver(river) {
    setCard($('#river'), river);
}

function setCard(div, card){
    div.css('background-image', getCardSrc(card['Rank'], card['Suit']))
}

function setBet(bet, seat){
    var betdiv = $('#seat' + seat).children('.bet');
    if (bet == null)
        betdiv.text('');
    else
        betdiv.text('$' + bet);
}

function getChipSrc(chipValue){
    
}

function foldClicked(){
    
}

function callClicked(){
    
}

function raiseClicked(){
    
}

function resetTable(){
    
}

function moveButton(seat){
    var button = $('#button');
    button.removeClass();
    button.addClass('seat' + seat + '-button');
}

$(document).everyTime(1000,
function (i) {
    updateGameState();
}, 0);