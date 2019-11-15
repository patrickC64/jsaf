function board(g)
{
	this.currentBlock = null;
	this.nextBlock = null;
	
	this.graphics2d = g;

	this.boardData = [];
	
	for ( x = 0; x < 12; x++ )
	{		
		this.boardData[x]=[];
	}
	
}


board.prototype.update = function ()
{
	if ( this.currentBlock == null )
	{
		this.generateBlock();
	}
}


board.prototype.generateBlock = function ()
{
	this.currentBlock = 1;
	console.log ( "New Block");
}


board.prototype.render = function (ox, oy)
{
	var g = this. graphics2d;
	
	for ( x = 0; x < 12; x++ )
	{		
		for ( y = 0; y < 32 ; y++ )
		{	
			if ( this.boardData[x][y] )
			{
				g.drawRect ( ox+x*16+1,oy+y*16+1,15,15);
			}
		}
	}
}
