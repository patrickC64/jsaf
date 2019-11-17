flocks.prototype = Object.create ( jsaf.application.prototype );

jsaf.include ("includes/board.js");
jsaf.include ("includes/gameMenue.js");

function flocks()
{
	jsaf.application.call(this);
		
	this.name ='flocks';

	this.gameState = 'mainmenue';
}


flocks.prototype.init = function()
{
	var fonts = [];
	
	fonts[ 0]='Roboto-Black.ttf';
	fonts[ 1]='FontAwesome.ttf';
	fonts[ 2]='badfont.otf';
	fonts[ 3]='source-gen.otf';
	fonts[ 4]= 'TestTracking3.ttf';	
	fonts[ 5]= 'AmaticSC-Regular.ttf';
	fonts[ 6]= 'Candara.ttf';
	
	this.appFonts = [];
	
	this.appFonts.push ( this.graphics2d.loadFont ( '../../shared/fonts/'+fonts[ 5] ,128 ) );
	this.appFonts.push ( this.graphics2d.loadFont ( '../../shared/fonts/'+fonts[ 5] ,32 ) );

	this.board = new board( this.graphics2d );
	
}


flocks.prototype.update = function()
{
	switch ( this.gameState )
	{
		case 'mainmenue':
		case 'gameOver':
			this.updateMainMenue();
		break;

		case 'startGame':
			this.startGame();
		break;

		case 'inGame':
			this.gameLoop();
		break;
		
	}
	
	
}

flocks.prototype.gameLoop = function ()
{
	this.board.update(this.deltaTime);

	var ipc = this.inputControl;
	
	if ( ipc.getKeystate(39)==1  )
	{	
		this.board.moveBlock ( 1,0 );
	}
	
	if ( ipc.getKeystate(37)==1 )
	{	
		this.board.moveBlock ( -1,0 );
	}
	
		
	if ( ipc.getKeystate(40)  )
	{	
		this.board.moveBlock ( 0,1 );
	}

	if ( ipc.getKeystate(65)==1 || ipc.getKeystate(38)==1 )
	{	
		this.board.rotateBlock ( -1 );
	}
	
	if ( ipc.getKeystate(83)==1  )
	{	
		this.board.rotateBlock ( 1 );
	}
	
	if (this.board.boardFull==true)
		this.gameState = "gameOver";
}

flocks.prototype.render = function()
{
	this.graphics2d.setClsColor (0,0,0);
	this.graphics2d.cls();

	switch ( this.gameState )
	{
		case 'gameOver':
			this.board.renderStats( 400, 100 );
		case 'mainmenue':
			this.renderMainMenue();
		break;

		case 'inGame':
			this.renderGame();
		break;		
	}

	this.graphics2d.render();
}


flocks.prototype.startGame = function ()
{
	this.board.reset();
	this.gameState = 'inGame';
}

flocks.prototype.renderGame = function ()
{
	this.board.render( 100, 100 );
	this.board.renderStats( 300, 100 );
}