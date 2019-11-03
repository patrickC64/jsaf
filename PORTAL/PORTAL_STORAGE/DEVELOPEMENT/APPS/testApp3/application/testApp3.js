testApp3.prototype = Object.create ( jsaf.application.prototype );
 
function testApp3()
{
	jsaf.application.call(this);
}


testApp3.prototype.init =function ()
{	

 	this.font = this.graphics2d.loadFont ( "media/fonts/font.png",16,16,2);

 	var fontname = 'Roboto-Black.ttf';

  fontname = 'FontAwesome.ttf';
 //fontname = 'badfont.otf';
 //	fontname = 'source-gen.otf';

  	fontname= 'TestTracking3.ttf';
	
//	fontname= 'AmaticSC-Regular.ttf';
	//  fontname= 'Candara.ttf';

	this.ttfFont =  this.graphics2d.loadFont ( 'media/fonts/'+fontname );

}

 
testApp3.prototype.update =function ()
{
}


testApp3.prototype.render =function ()
{
	var g = this.graphics2d;
 
	g.setClsColor (1,1,1,1.0);	
 	g.cls();
 	
	g.setColor(1,1,1);
	g.setAlpha(1);
	g.setScale(1,   1);
	
// 	g.drawAnimImage  (this.ttfFont.image ,400, 100 ,66  );
 	g.drawImage   (this.ttfFont.image ,400, 100  );

	g.setScale(1,1);
		
	g.setRotation( this.ticker * .025);
	
	g.setAutoMidHandle(true);
	
	g.setVertexColor ( [ 1,0,0,1
						,0,1,0,1
						,0,0,1,1
						
						,0,0,1,1
						,1,1,1,1
						,1,0,0,1
						] );
						
//	g.drawRect (300,300,200,200);

	g.setAutoMidHandle(false);

	//g.drawRect (800,300,200,200);
	
	g.resetTransform();

	//g.drawOval (800,300,200,200);

	var p = [10,10,50,50,10,50 
			,115,115,150,110,150,150];

	 g.setColor(0,0,0);
	 var mx = this.inputControl.mouseX;
	 var my = this.inputControl.mouseY;
	 
 	 if(this.ttfFont.polygons[30])
	 {  

 	//	g.drawLines	( this.ttfFont.polygons[54].outlines ,280, 280 );
 if(this.ttfFont.polygons[mx%99])
	  	g.drawPolygon 	(this.ttfFont.polygons[mx%99].triangles  ,360, 360 );
 
	 }
	g.setFont(	this.ttfFont);
	
	g.setColor(0,0,0);
	 g.drawText("ABCDEFG HIJKLMNOPQRSTUVW" ,10,50);



	g.drawText("HELLO WORLD!" ,mx ,my );
	g.drawText("hello world!!" ,mx ,my +30);
	
	g.setFont(this.font);

	g.setColor(1,1,1);	
	g.drawText("fps:"+this.frameCounter.getFps(),10,20);	
	g.render(); 
}