flocks.prototype.updateMainMenue = function ()
{
	var ipc = this.inputControl;

	
	if ( ipc.getKeystate(32)==1 )
	{	
		this.gameState = "startGame";
	}

}

flocks.prototype.renderMainMenue = function ()
{
	var g = this.graphics2d;
	
	g.setFont ( this.appFonts[0] );

	g.drawText ( "FLOCKS", 100 , 100 ) ;

	g.setFont ( this.appFonts[1] );

	g.drawText ( "Start Game", 150 , 250 );
	g.drawText ( "(Tetris-Clone)", 150 , 50 );
	
}
