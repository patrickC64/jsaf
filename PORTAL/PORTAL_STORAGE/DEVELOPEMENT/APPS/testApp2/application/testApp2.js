testApp2.prototype = Object.create ( jsaf.application.prototype );
 
function testApp2()
{
	jsaf.application.call(this);
}


testApp2.prototype.init =function ()
{	
	this.font = this.graphics2d.loadFont ( "media/font.png",16,16,2);
}


testApp2.prototype.update =function ()
{
}


testApp2.prototype.render =function ()
{
	var g = this.graphics2d;
	
	this.graphics2d.setFont ( this.font );	
	this.graphics2d.setClsColor (0,0,0,0);
	
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
 
	g.drawText("fps:"+this.frameCounter.getFps(),10,20);
 	
	g.render(); 
}