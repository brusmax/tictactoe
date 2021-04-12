
Player = {
  name: "Guess"
}

Gameboard = {
  "a": ["", "", ""],
  "b": ["", "", ""],
  "c": ["", "", ""],
}

class Game {
  constructor(player, gameboard){
    this.player = player;
    this.gameboard = gameboard;
    this.turn = 0;
    this.winner = false;
    this.rows = ['a', 'b', 'c'];
    this.cols = [0, 1, 2];
  }

  noPlayerName() {
    if(this.player.name === "Guess")
      return false; 
    else
      return true;
  }

  askPlayerName() {
    this.reset();
    this.player.name =  "hola";//prompt("Intro your player name:");
    $('.player-name').text(this.player.name);
  }

  reset() {
    this.turn = 0;
    this.winner = false;
    this.gameboard = {
      "a": ["", "", ""],
      "b": ["", "", ""],
      "c": ["", "", ""],
    };
    $('.table-board tr td').text("");
    $('.table-board tr td').each( (i,td) => {
      $(td).removeClass('free bg-success').addClass('free');
    });
  }

  newMove(element){
    if(element.text().length > 0)
      return false;

    this.turn += 1;
    let marker = "X";
    element.text(marker);
    
    let x = element.data('x');
    let y = element.data('y');
    this.gameboard[x][y] = marker;
    console.log(this.gameboard);
    this.validatePlay();
  }

  computerMove(){
    if( this.winner === true )
     return false;
     console.log("computer turn...")
     let random_row = 0;
     let random_col = 0;

    let marker = "O";
     for (let i = 0; i < 100; i++) {
      random_row = Math.floor(Math.random() * this.rows.length);
      random_col = Math.floor(Math.random() * this.cols.length);

      // found an empty random space
      if( this.gameboard[this.rows[random_row]][this.cols[random_col]].length === 0 ){
        console.log("--->"+ this.rows[random_row] + "--> "+this.cols[random_col]);
        console.log(":"+this.gameboard[this.rows[random_row]][random_col]);
        break;
      }
     }
     console.log(random_row);
     console.log(random_col);

     this.turn += 1;
     console.log('.'+this.rows[random_row]+this.cols[random_col]);
     console.log(this.gameboard);
     $('.'+this.rows[random_row]+this.cols[random_col]).text(marker);
     this.gameboard[this.rows[random_row]][this.cols[random_col]] = marker;
     console.log("next move... "+this.rows[random_row]+":"+this.cols[random_col]);
     this.validatePlay();
  }

  validatePlay(){
    // validate rows for a winner
    this.rows.forEach( (crow) => {
      if( this.gameboard[crow][0] !== "" && this.gameboard[crow][0] === this.gameboard[crow][1] && this.gameboard[crow][0] === this.gameboard[crow][2]){
        this.winner = true;
        this.drawWinnerBoard([crow+'0', crow+'1', crow+'2']);
        return false;
      }
    });
    // validate cols for a winner
    this.cols.forEach( (col) => {
      if( this.gameboard['a'][col] !== "" && this.gameboard['a'][col] === this.gameboard['b'][col] && this.gameboard['a'][col] === this.gameboard['c'][col]){
        this.winner = true;
        let num_col = col;
        this.drawWinnerBoard(['a'+num_col, 'b'+num_col, 'c'+num_col]);
        return false;
      }
    });

    // validate cross for a winner
    this.cols.forEach( (col) => {
      if( this.gameboard['a'][0] !== "" && this.gameboard['a'][0] === this.gameboard['b'][1] && this.gameboard['c'][2] === this.gameboard['a'][0]){
        this.winner = true;
        this.drawWinnerBoard(['a0', 'b1', 'c2']);
        return false;
      }
      if( this.gameboard['c'][0] !== "" && this.gameboard['c'][0] === this.gameboard['b'][1] && this.gameboard['b'][1] === this.gameboard['a'][2]){
        this.winner = true;
        this.drawWinnerBoard(['c0', 'b1', 'a2']);
        return false;
      }
    });
    // if winner
    if(this.winner === true){
      this.whoWins();
    }
  }

  whoWins(){
    // Alert Winner
    if ( this.turn % 2 == 0) {
      alert("You lose! ");
    }else{
      alert("You win : "+ this.player.name+"!!!");
    }
  }

  drawWinnerBoard(aclass){
    aclass.forEach( (c) => {
      console.log("===> "+c);
      $('.'+c).addClass('bg-success');
    });
  }
}

$(function() {
  const game = new Game(Player, Gameboard);

  $('#start').on('click', (event) => {
    event.preventDefault();
    game.reset();
    $('.hide').removeClass('hide');
    $('.img-board').addClass('hide');
    // Start player name
    if(game.noPlayerName() === false)
      game.askPlayerName();
  })
  
  $('.free').on('click', newPosition);

  function newPosition(){
    game.newMove($(this));
    game.computerMove();
  }
});