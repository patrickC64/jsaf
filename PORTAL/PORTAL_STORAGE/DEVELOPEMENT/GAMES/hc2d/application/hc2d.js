jsaf.include('application/init/initGraphics.js');	
//jsaf.include('application/init/initInputControl.js');	
//jsaf.include('application/init/initScene2d.js');


function startApplication()
{
	new jsaf_application( new hc2d () ).start();	 
}


function hc2d()
{
	this.appname ="hc2d";
	
	this.ticker = 0;
}


hc2d.prototype.init =function ()
{
		
	this.initGraphics();
	//this.initInputControl();
	
	this.framecounter = new jsaf_graphics_frameCounter();
	
	this.font = this.graphics2d.loadImageFont(this.rootpath+"media/font.png",16,16,1);	
		
}

hc2d.prototype.update =function ()
{
 

	this.ticker++;	
}


hc2d.prototype.render =function ()
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