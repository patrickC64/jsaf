jsaf.include('application/init/initGraphics.js');	
jsaf.include('application/init/initInputControl.js');	



function startApplication()
{
	new jsaf_application( new spriteFactory () ).start();	 
}


function spriteFactory()
{
	
}


spriteFactory.prototype.init =function ()
{
	this.initGraphics();
	this.initInputControl();
		
	this.appname ="spriteFactory";
	
	this.framecounter = new jsaf_graphics_frameCounter();
	
	this.font = this.graphics2d.loadImageFont(this.rootpath+"media/font.png",16,16,1);	
}

spriteFactory.prototype.update =function ()
{
	this.inputControl.update();

	this.ticker++;	
}


spriteFactory.prototype.render =function ()
{
	var g = this.graphics2d;
	
	g.cls();
	g.setColor(1,1,1);
	g.setAlpha(1);
	g.setScale(1,1);
	
	g.setFont(this.font);
	
	
	g.drawText("fps:"+this.framecounter.getFps(),10,20);
	
	g.render(); 
}