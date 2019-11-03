
function startApplication()
{
	new jsaf_application( new testApp2 () ).start();	 
}


function testApp2()
{
	this.ticker = 0;
}


testApp2.prototype.init =function ()
{
		
	this.appname ="testApp2";
	
	this.framecounter = new jsaf_graphics_frameCounter();
	
	this.font = this.graphics2d.loadImageFont(this.rootpath+"media/font.png",16,16,1);	
 /*
	var tw = this.gui2d.addChild.call ( this.gui2d, 
	new jsaf_gui2d_window ("testwindow", 100,300,100,26) );

	tw.addChild( new jsaf_gui2d_button ("TESTBUTTON2", 50,400,100,26) );

	var w2 = this.appWindow.addChild.call ( this.appWindow, 
	new jsaf_gui2d_button ("testwindow", 100,300,100,26) );
*/
	
	//console.dir (	jsaf_gui2d_button ("testApp2",200,200,300,300) )

	
}

testApp2.prototype.update =function ()
{
	this.inputControl.update();

	this.ticker++;	
}


testApp2.prototype.render =function ()
{
	var g = this.graphics2d;
	
 	g.cls();
	g.setColor(1,1,1);
	g.setAlpha(1);
	g.setScale(1,1);
		
	g.setFont(this.font);
	
	g.setRotation( this.ticker * .025);
	
	g.setAutoMidHandle(true);
	
	g.setVertexColor ( [ 1,0,0,1
						,0,1,0,1
						,0,0,1,1
						
						,0,0,1,1
						,1,1,1,1
						,1,0,0,1
						] );
						
	g.drawRect (300,300,200,200);

	g.setAutoMidHandle(false);

	g.drawRect (800,300,200,200);
	
	g.resetTransform();
	
	g.setColor(1,1,1);
	
	g.drawText("fps:"+this.framecounter.getFps(),10,20);
	
	g.render(); 
}