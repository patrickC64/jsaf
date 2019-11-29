window.onerror = function (e) {alert(e)};



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
	
	this.keyRepeatBlock = 0;

	this.touchInput = new jsaf.inputControl.touchInput(this.inputControl, this.graphics2d );
	this.touchControl = new jsaf.inputControl.touchControl( this.touchInput );
	
	var ox = this.graphics2d.graphics.resolution[0]-200;
	var oy = this.graphics2d.graphics.resolution[1]-200;
											
	//UP
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox+50,oy+00,50,50] , keyCode: 38 } );
	//DOWN
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox+50,oy+100,50,50] , keyCode: 40 } );
	//LEFT
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox+00,oy+50,50,50] , keyCode: 37 } );
	//RIGHT
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox+100,oy+50,50,50] , keyCode: 39 } );
	
	// SPACE
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox-100,oy,100,25] , keyCode: 32 } );

	// TurnLeft (A)
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox-100,oy,100,25] , keyCode: 32 } );
	// TurnRight (S)
	this.touchControl.addTouchZone ( { type:'rect', coords:[ox-100,oy,100,25] , keyCode: 32 } );
		
	
	//this.startGame();
}


flocks.prototype.update = function()
{
	if ( this.isMobile )
	{
		this.touchInput.update();
		this.touchControl.update();
	}
	
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
	
	var state = 0;
	
	this.keyRepeatBlock-=2;//*parseInt(this.deltaTime);
			
	if ( state = ipc.getKeystate(39) )
	{	
		if ( this.keyRepeatBlock <= 0 || state == 1)
		{
			this.board.moveBlock ( 1,0 );
			this.keyRepeatBlock = 4;
			
			if (state == 1)
				this.keyRepeatBlock = 20;
		}
	}
	
	if ( state = ipc.getKeystate(37) )
	{	
		if ( this.keyRepeatBlock <= 0 || state == 1 )
		{
			this.board.moveBlock ( -1,0 );
			this.keyRepeatBlock = 4;

			if (state == 1)
				this.keyRepeatBlock = 20;

		}
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
	
	if ( this.isMobile ) 
		this.touchControl.render();
	
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