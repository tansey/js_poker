var game;
var server;
var targetSeat = 0;


function catchUp(){
    setHoleCards(null, targetSeat + 1);
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

function setHoleCards(hc, seat){    
    var holecards = $('#seat' + seat).children('.holecards');
    var card1 = holecards.children('.holecard1');
    var card2 = holecards.children('.holecard2');

    card1.css('background-image', getCardSrc("jack", "hearts"));
    card2.css('background-image', getCardSrc("Eight", "Spades"));
}

function setBoardCards(board) {
    
}



function setBet(bet, seat){

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