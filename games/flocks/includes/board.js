var blocks = [];

blocks.push ( 
[ 0,0,0,0
, 0,1,1,0
, 0,0,1,1
, 0,0,0,0 ]  );

blocks.push ( 
[ 0,0,0,0
, 0,1,1,1
, 0,0,1,0
, 0,0,0,0 ]  );

blocks.push ( 
[ 0,0,1,0
, 0,0,1,0
, 0,0,1,0
, 0,0,1,0 ]  );

blocks.push ( 
[ 0,0,0,0
, 0,1,1,0
, 0,1,1,0
, 0,0,0,0 ]  );

blocks.push ( 
[ 0,1,1,0
, 0,1,0,0
, 0,1,0,0
, 0,0,0,0 ]  );


function board(g)
{
	this.graphics2d = g;
	this.startLevel = 1;
	
	this.reset();
}


board.prototype.update = function (dTime)
{	

	if (this.addPoints>0)
	{
		this.addPoints-=5;
		this.points+=5;				
	}
	
	this.ticker+=((3+(this.level*2))*dTime);

	if ( this.boardFull )
		return;
	
	if ( this.currentBlock == null )
	{
		this.generateBlock();
	}
	
	
	if ( parseInt(this.ticker) > 100 )
	{	this.ticker=0;
		var hasMoved =  this.moveBlock(0,1);
		
		if ( !hasMoved )
		{
			//if ( this.blockDown==true )
			{
				this.blockToBoard ();

				if ( this.blockPosition[1] <-1 )
				{
					this.boardFull = true;
				}
				
				this.currentBlock=null;
				
				this.blockPosition[0]= 4;
				this.blockPosition[1]= -2;
				
				this.checkBoard();

				this.blockDown = false;
			
			} //else
			//	this.blockDown = true;
		}
		
	}
}


board.prototype.blockToBoard = function ()
{
	if ( this.currentBlock )
	{	
		this.addPoints += this.level*25;

		var cols = this.currentBlock.length/4;
		
		for ( blockIndex = 0; blockIndex < this.currentBlock.length; blockIndex++ )
		{	
			if ( this.currentBlock[blockIndex] )
			{
				x = (blockIndex%cols);
				y = parseInt(blockIndex/cols);
				
				x+= this.blockPosition[0];
				y+= this.blockPosition[1];
				
				if ( x>-1 && x <12 && y<33)
				{
					this.boardData[x][y]=1;
				}
			}
		}
	}

}

board.prototype.moveBlock = function (x,y)
{
	if ( this.currentBlock )
	{
		this.blockPosition[0]+=x;
		this.blockPosition[1]+=y;	
			
		if (this.checkColission() == true)
		{
			this.blockPosition[0]-=x;
			this.blockPosition[1]-=y;
			
			return false;
			
		} else
		{
		
		}
	}
	
	return true;
}

function rotateBlock (tblock ,dir)
{
	var rblock = tblock.slice();

	var cols = tblock.length/4;
	
	for ( blockIndex = 0; blockIndex < tblock.length-1; blockIndex++ )
	{			
			if ( dir == 1)	
			{
				x = ( (tblock.length-1-blockIndex)%cols);
				y = parseInt( (blockIndex)/cols);	

				rblock[(x)*cols+(y)]=tblock[(tblock.length-1)-blockIndex];
			}
			else
			{
				x = (blockIndex%cols);
				y = parseInt(((tblock.length-1)-blockIndex)/cols);	
				rblock[(x)*cols+(y)]=tblock[(tblock.length-1)-blockIndex];
			}
	}
 
	return rblock;
}

board.prototype.rotateBlock = function ( dir )
{
	if ( this.currentBlock )
	{
		var tBlock = this.currentBlock;
		
		this.currentBlock=rotateBlock( this.currentBlock, dir );
				
		if (this.checkColission() == true)
		{
			
			this.currentBlock=tBlock;
			
			return false;			
		}
	}
	
	return true;
}

board.prototype.checkColission = function (  )
{
	if ( this.currentBlock )
	{	
		var cols = this.currentBlock.length/4;
		
		for ( blockIndex = 0; blockIndex < this.currentBlock.length; blockIndex++ )
		{	
			if ( this.currentBlock[blockIndex] )
			{
				x = (blockIndex%cols);
				y = parseInt(blockIndex/cols);
				
				x+= this.blockPosition[0];
				y+= this.blockPosition[1];
				
				if ( x>-1 && x <12 && y<32)
				{
					if (this.boardData[x][y])
						return true;
				}
				
				if (x<0 || x > 11)
					return true;
				
				if (y>31)
					return true;
			}
		}
	}
	
	return false;
}


board.prototype.generateBlock = function ()
{
	this.currentBlock = blocks[this.nextBlock].slice();
	
	this.blocks[this.nextBlock]++;
	
//	this.currentBlock = blocks[3].slice();
	this.nextBlock = parseInt(Math.random()*100)%5;
	
}


board.prototype.render = function (ox, oy)
{
	var g = this. graphics2d;
	 
	for ( x = 0; x < 12; x++ )
	{		
		for ( y = 0; y < 32 ; y++ )
		{	
			g.setColor (.2,.2,.2);
			
			g.drawRect ( ox+x*16+1,oy+y*16+1,15,15);
			
			if ( this.boardData[x][y] )
			{
				g.setColor (1,1,1);
	
				g.drawRect ( ox+x*16+1,oy+y*16+1,15,15);
			}
		}
	}
	
	if ( this.currentBlock )
	{	
		var cols = this.currentBlock.length/4;
		
		for ( blockIndex = 0; blockIndex < this.currentBlock.length; blockIndex++ )
		{	
			if ( this.currentBlock[blockIndex] )
			{
				g.setColor (1,1,1);

				x = (blockIndex%cols);
				y = parseInt(blockIndex/cols);
				
				x+= this.blockPosition[0];
				y+= this.blockPosition[1];
				
				if ( (y+1)*16+oy > oy)
				g.drawRect ( ox+x*16+1,oy+y*16+1,15,15);
			
			}
		}
	}

}

board.prototype.renderStats = function ( ox, oy)
{
	var g = this.graphics2d;

	var cols = blocks[this.nextBlock].length/4;
	
	for ( blockIndex = 0; blockIndex < blocks[this.nextBlock].length; blockIndex++ )
	{	
		if ( blocks[this.nextBlock][blockIndex] )
		{
			g.setColor (1,1,1);

			x = (blockIndex%cols);
			y = parseInt(blockIndex/cols);
	
			g.drawRect ( ox+x*16+1+16,oy+y*16+1+16,15,15);
		}
	}

	g.drawText ( "POINTS "+this.points, ox +20, oy+100);	
	g.drawText ( "LEVEL ", ox +20, oy+140);	
	g.drawText ( this.level, ox +86, oy+140);	

	g.drawText ( "LINES ", ox +20, oy+180);	
	g.drawText ( this.destroyedRows, ox +86, oy+180);	
					
	oy+=140;
	
	for (block = 0; block < 5; block++)
	{
		var cols = blocks[this.nextBlock].length/4;
		
		var dx,dy;
		
		for ( blockIndex = 0; blockIndex < blocks[this.nextBlock].length; blockIndex++ )
		{	
			
			if ( blocks[block][blockIndex] )
			{
				g.setColor (1,1,1);

				x = (blockIndex%cols);
				y = parseInt(blockIndex/cols);
				
				dx = ox+x*8+12;
				dy = 90+(block*30)+oy+y*8;
				
				g.drawRect ( dx, dy, 8, 8);											
			}
		}	
	}
	
	for (block = 0; block < 5; block++)
	{		
		g.drawText ( " x  "+this.blocks[block], ox+50, oy+90-8+(30*block));	
	}	

	for ( hit = 0; hit < 4; hit++)
	{		
		g.drawText ( (hit+1)+" lines hit x"+this.hits[hit], ox +20, oy+80-8+(30*hit)+170);	
	}	

	
	
}

board.prototype.checkBoard = function ()
{
	var destroyedRows = 0;
	
	for ( y = 31; y > 0; y-- )
	{		
		var check = 0;
		for ( x = 0; x < 12 ; x++ )
		{						
			if ( this.boardData[x][y] )
			{
				check++;
			}
		}

		if (check == 12)
		{
			for ( x = 0; x < 12 ; x++ )
			{						
				this.boardData[x][y] = 0;

			}
			
			destroyedRows++;
			this.deleteRow (y);
			y=32;

		}

		if (check == 0)
			break;
	}		
	
	if ( destroyedRows )
	{
		this.hits[destroyedRows-1]++;
		this.addPoints += ((destroyedRows*(destroyedRows+this.level))*25);
		this.destroyedRows+=destroyedRows;
		var tlevel = this.level;
		this.level = this.startLevel+parseInt(this.destroyedRows/10);
		
		if ( this.level > tlevel)
		{
			// LEVEL UP ACTION
		}
	}
}

board.prototype.deleteRow = function (row)
{
	for ( y = row; y > 1; y-- )
	{		
		var check = 0;
		for ( x = 0; x < 12 ; x++ )
		{						
			this.boardData[x][y]=this.boardData[x][y-1]; 
		}
	}	
}

board.prototype.reset = function ()
{
	this.currentBlock = null;
	this.nextBlock = parseInt(Math.random()*10)%5;
	this.ticker = 0;
	
	this.blockPosition = [4,-4];
	this.boardFull = false;

	this.boardData = [];
	this.blockDown = false;
	
	this.blocks = [0,0,0,0,0];
	this.hits = [0,0,0,0];
	this.points = 0;
	this.addPoints = 0;
	this.level = this.startLevel;
	this.destroyedRows = 0;
	
	for ( x = 0; x < 12; x++ )
	{		
		this.boardData[x]=[];
	}
}	