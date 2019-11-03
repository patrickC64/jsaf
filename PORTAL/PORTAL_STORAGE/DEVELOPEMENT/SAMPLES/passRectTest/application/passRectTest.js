// INCLUDES ------------------------------

// ---------------------------------------

// PORTAL APPLICATION --------------------
	
// ---------------------------------------
 
function passRectTest()
{
	this.appname ="passRectTest";
	this.rootpath = null;
}
 

passRectTest.prototype.init =function ()
{	
 
	this.font = this.graphics2d.loadImageFont( this.rootpath+"media/font.png",16,16,1);
	
	this.ticker =0;
}

passRectTest.prototype.update =function ()
{	
}


passRectTest.prototype.render =function ()
{
	var g = this.graphics2d;

	g.setAlpha(1);
	g.setScale(1,1)

	var r1 =[ 150,150,400,400 ];
	var r2 =[ this.gui2d.mouseX,this.gui2d.mouseY,300,300 ];
	var r3 =  jsaf_math_rectanglePassInto (  r2 , r1);
	
	g.setColor(1,1,1,1);
	g.drawRectV ( r1 );
			
	g.setColor ( .5,.7,.5,1);
	g.drawRectV ( r3 );
	
}