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
			this.updateMainMenue();
		break;

		case 'startGame':
			this.startGame();
		break;

		case 'inGame':
			this.board.update();
		break;
		
	}
	
	
}


flocks.prototype.render = function()
{
	this.graphics2d.setClsColor (0,0,0);
	this.graphics2d.cls();

	switch ( this.gameState )
	{
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
	this.gameState = 'inGame';
}

flocks.prototype.renderGame = function ()
{
	console.log ( this.gameState);
	this.board.render( 100, 100 );
}