testApp3.prototype = Object.create ( jsaf.application.prototype );
 
function testApp3()
{
	jsaf.application.call(this);
}


testApp3.prototype.init =function ()
{	

 	this.font = this.graphics2d.loadFont ( "media/fonts/font.png",16,16,2);

 	var fontname = 'Roboto-Black.ttf';

 // fontname = 'FontAwesome.ttf';
 //fontname = 'badfont.otf';
fonts[  ]='source-gen.otf';

 // 	fontname= 'TestTracking3.ttf';
	
	fontname= 'AmaticSC-Regular.ttf';
//	  fontname= 'Candara.ttf';

	this.ttfFont =  this.graphics2d.loadFont ( 'media/fonts/'+fontname ,16 );

}

 
testApp3.prototype.update =function ()
{
}


testApp3.prototype.render =function ()
{ 
	var g = this.graphics2d;
 
	g.setClsColor (1,1,1,0.0);	
 	g.cls();
 	

	g.setAlpha(1);
	g.setScale(1,   1);
 
	g.setColor(0,0,0);
	var mx = this.inputControl.mouseX;
	var my = this.inputControl.mouseY;

	g.setFont(	this.ttfFont);
	
	g.setColor(0,0,1);

	g.drawText(" ABCDEFGHIJKLMNOPQRSTUVWXYZ" ,10,50);

	g.drawText("HELLO WORLD!" ,mx ,my );

	g.setFont(this.font);

	g.setColor(1,1,1);	
	g.drawText("fps:"+this.frameCounter.getFps(),10,20);	
	g.render(); 
}