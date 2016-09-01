
var moveArray = [];
var boardSize = {
	width: 600,
	height: 600
}
var initialPosX = 0;
var initialPosY = boardSize.width;
var step = boardSize.width/10;
var players = [];
var totalPlayers = 0;
var maxPlayers = 8;
var activePlayer = 0;
var diceValue = 0;
function iniialiseBoard () {
	for (var i = 0; i < 100; i++) {
		moveArray.push(0);
	}
	moveArray[0] = 37;
	moveArray[3] = 13;
	moveArray[8] = 31;
	moveArray[16] = 6; 
	moveArray[20] = 41; 
	moveArray[27] = 83;
	moveArray[50] = 66; 
	moveArray[53] = 33; 
	moveArray[61] = 18;
	moveArray[63] = 59;
	moveArray[70] = 90;
	moveArray[79] = 99;
	moveArray[86] = 23; 
	moveArray[92] = 72; 
	moveArray[94] = 74;
	moveArray[97] = 78; 
}

function createBoard(){ 
	var board = document.getElementById('snake-and-ladder-board');
	var boardContext = board.getContext("2d");
	var img = document.getElementById( 'game-board-image' );	
	boardContext.drawImage(img , 0 , 0 , boardSize.width , boardSize.height);
	for (var i = 0; i < players.length; i++) {
		var imgAvatar = new Image();
		imgAvatar.src = 'img/av-' + players[i].avatar + '.jpeg';
		boardContext.drawImage(imgAvatar, players[i].posX , players[i].posY, step, step );
	}
}

function presentAvatar() {
	var avatarChamber = document.getElementById('avatar-chamber');
	var playerList = document.getElementById( 'player-list' );
	players = [];
	playerList.innerHTML = '';
	avatarChamber.innerHTML = '';
	for (var i = 1; i <= maxPlayers; i++) {
		var img = document.createElement( 'img' );
		img.setAttribute( 'src' , 'img/av-' + i + '.jpeg');
		img.setAttribute( 'class' , 'avatar-item' );
		img.setAttribute( 'id' , 'avatar-face-' + i );
		img.setAttribute( 'data' , i );
		img.setAttribute( 'isSelected' , false );
		avatarChamber.appendChild( img );
	}
}

function selectAvatar(e){
	var avatar = document.getElementById( e );
	if(avatar.getAttribute( 'isSelected' ) != true) {
		var player = {
			name : 'player-' + (++totalPlayers),
			avatar : avatar.getAttribute( 'data' ),
			score : -1,
			posX : initialPosX,
			posY : initialPosY
		};
		players.push( player );
		avatar.setAttribute('isSelected', true);
		avatar.setAttribute('class', 'avatar-item selected-avatar');
	}
}

function presentPlayerList(){
	var avatarChamber = document.getElementById('avatar-chamber');
	var playerList = document.getElementById('player-list');
	playerList.innerHTML = '';
	avatarChamber.innerHTML = '';

	for (var i = 0; i < players.length; i++) {
		var img = document.createElement( 'img' );
		img.setAttribute('src', 'img/av-' + players[i].avatar + '.jpeg');
		img.setAttribute('class', 'avatar-player');
		img.setAttribute('id', 'avatar-player-' + i);
		if (i == activePlayer) {
			img.setAttribute('class', 'avatar-player active-player' );
		}
		playerList.appendChild( img );
	}
}


function goMove(moveStep, direction, playerIndex ) {
	var i = 1;
		var redraw = setInterval(function() {
		players[playerIndex].score += direction ;
		variation = direction > 0 ? 0 : 1;
		if ((players[playerIndex].score + variation ) % 10 == 0) {
			players[playerIndex].posY -= (direction*step); 
		} else if ( parseInt((players[playerIndex].score)/10) % 2 != 0) {
			players[playerIndex].posX -= (direction*step);
		} else {
			players[playerIndex].posX += (direction*step);
		}
		createBoard();
		if (players[playerIndex].score == 99) {
			winner(playerIndex);
		}
		i++;
		if (i > moveStep) {
			clearInterval(redraw);
		}
	}, 100);
}

function winner(playerIndex) {
	var img = players[playerIndex].avatar;
	var board = document.getElementById('snake-and-ladder-board');
	var boardContext = board.getContext("2d");
	var image = new Image();
	image.src = 'img/av-' + img + '.jpeg';
	boardContext.drawImage(image, 0, 0, boardSize.width, boardSize.height);	
	boardContext.textAlign = 'center';
	boardContext.font = " 40px verdana ";
	boardContext.fillStyle = 'green';
	boardContext.fillText(" WINNER ", board.width/2 , 550);

	presentAvatar();
	avatarResetButton.setAttribute('class', '');
	startGameButton.setAttribute('class', '');
	endGameButton.setAttribute('class', 'hidden');
	rollDice.setAttribute('class', 'hidden');
}



window.onload = function ( e ) {
	createBoard();
	iniialiseBoard();
	presentAvatar();

	var board = document.getElementById('snake-and-ladder-board');
	var boardContext = board.getContext("2d");
	var startGameButton = document.getElementById('start-game-button');
	var endGameButton = document.getElementById('end-game-button');
	var avatarChamber = document.getElementById('avatar-chamber');
	var avatarResetButton = document.getElementById('reset-avatar-button');
	var rollDice = document.getElementById('roll-dice');
	var diceRollValue = document.getElementById('dice-roll-value');


	board.style.height = boardSize.height + 'px';
	board.style.width = boardSize.width + 'px';

	//handle avatar selection
	avatarChamber.onclick = function() {
		if(event.srcElement.getAttribute('class') === 'avatar-item')
			selectAvatar(event.srcElement.getAttribute('id'));
	}
	//handle avatar reset
	avatarResetButton.onclick = function() {
		presentAvatar();
		startGameButton.setAttribute('class', '');
		endGameButton.setAttribute('class', 'hidden');
		rollDice.setAttribute('class', 'hidden');
		document.querySelector('#user-message').innerHTML = "";
	}
	//handle game starter
	startGameButton.onclick = function() {
		if(players.length == 0) {
			document.querySelector('#user-message').innerHTML = "please select player's avatar";
			return;
		} else {
			document.querySelector('#user-message').innerHTML = "";
		}
		activePlayer = 0;
		presentPlayerList();
		startGameButton.setAttribute('class', 'hidden');
		endGameButton.setAttribute('class', '');
		rollDice.setAttribute('class', '');
		avatarResetButton.setAttribute('class', 'hidden');
	}
	//handle game ender
	endGameButton.onclick = function() {
		players = [];
		createBoard();
		presentAvatar();
		startGameButton.setAttribute('class', '');
		endGameButton.setAttribute('class', 'hidden');
		rollDice.setAttribute('class', 'hidden');
		avatarResetButton.setAttribute('class', '');
		document.querySelector('#user-message').innerHTML = "";

	}

	//handle the dice rolling
	rollDice.onclick = function() {
		document.querySelector('#user-message').innerHTML = "";
		rollDice.setAttribute('class', 'hidden');
		var trials = 0;
		var val = 1;
		var roll = setInterval(function() {
			if (trials == 20) {
				diceValue = val;
				clearInterval(roll);
				var profile = document.getElementById('avatar-player-' + activePlayer);
				if (diceValue + players[activePlayer].score > 99 ) {
					return;
				}
				activePlayerInstance = activePlayer;
				scoreInstance = players[activePlayerInstance].score;
				goMove(diceValue , 1, activePlayerInstance);

				var luckyNumber = moveArray[diceValue + scoreInstance];
				if (luckyNumber != 0){
					if (luckyNumber - scoreInstance > 0) {
						goMove(luckyNumber - scoreInstance - diceValue, 1, activePlayerInstance);
						document.querySelector('#user-message').innerHTML = "got a ladder";

					} else {
						goMove((scoreInstance + diceValue) - luckyNumber, -1, activePlayerInstance);
						document.querySelector('#user-message').innerHTML = "bitten by snake";

					}
				}	
				activePlayer++;
				if(activePlayer > (players.length - 1))
					activePlayer = 0;
				presentPlayerList();
				rollDice.setAttribute('class', '');
				return;
			}
			// setting the random value between 1 to 6;
			val = ((Math.floor((Math.random() * 100))) % 6 ) + 1;
			document.querySelector('#dice-dummy').setAttribute('src', 'img/dice-' + val + '.png');
			trials++;
		}, 100);
	}
} 
