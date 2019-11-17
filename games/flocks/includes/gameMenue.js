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

	g.drawText ( "FLOCKS", 100 , 120 ) ;

	g.setFont ( this.appFonts[1] );
	
	g.drawText ( "(Tetris-Clone)", 150 , 40 );
	g.drawText ( "(Falling Blocks)", 140 ,75 );


	g.drawText ( "Start Game", 160 , 260 );
	g.drawText ( "- hit space -", 155 , 290 );

	g.drawText ( "Arrowkeys to Control & A or S to rotate!", 25 , 360 );


	
}

