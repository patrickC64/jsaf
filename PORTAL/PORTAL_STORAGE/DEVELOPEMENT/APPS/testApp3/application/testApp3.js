testApp3.prototype = Object.create ( jsaf.application.prototype );
 
function testApp3()
{
	jsaf.application.call(this);
}


testApp3.prototype.init = function ()
{	
	var fonts = [];
	
	fonts[ 0]='Roboto-Black.ttf';
	fonts[ 1]='FontAwesome.ttf';
	fonts[ 2]='badfont.otf';
	fonts[ 3]='source-gen.otf';
	fonts[ 4]= 'TestTracking3.ttf';	
	fonts[ 5]= 'AmaticSC-Regular.ttf';
	fonts[ 6]= 'Candara.ttf';

	this.ttfFont = this.graphics2d.loadFont ( 'media/fonts/'+fonts[ 4] ,64 ) 

 	this.font = this.graphics2d.loadFont ( "media/fonts/font.png",16,16,2);
 
	this.convFont = this.ttfFont.convertToImageFont();
}

 
testApp3.prototype.update = function ()
{
}


testApp3.prototype.render = function ()
{ 
	var g = this.graphics2d;
	var gl = g.gl;
	g.setClsColor (1,1,1,0.0);	
 	g.cls();

	g.setAlpha(1);
	g.setScale(1,1);
 
	g.setColor(0,0,0);
	var mx = this.inputControl.mouseX;
	var my = this.inputControl.mouseY;

	g.setFont(	this.ttfFont);
	
	g.setColor(0,0,0);

	g.drawText("ABCDEFGHIJKLMNOPQRSTUVWXYZ" ,10,450);

	g.drawText("Hello World!" ,mx ,my );

	//this.ttfFont.renderFontAtlas( 300, 150 );
	if ( this.convFont )
	g.setFont(this.convFont);
	g.drawText("ABCDEFGHIJKL M N OPQRSTUVWXYZ" ,10,200);
	
	g.setColor(.4,1,1);	
	if ( this.convFont )
	g.drawImage (this.convFont.image, 300,00);

	g.setFont(this.font);
	
	
	
	g.setColor ( 0,0,0);
	for ( x=0; x< 800; x++)
	{
		g.setColor ( 0,0,0);

		for ( y=0; y< 600; y++)
		{
			g.setColor ( y*.001,.2,x*.001);
			g.drawPoint ( x,y );
		}
	}
	g.drawText("fps:"+this.frameCounter.getFps(),10,20);	
	g.render(); 
}