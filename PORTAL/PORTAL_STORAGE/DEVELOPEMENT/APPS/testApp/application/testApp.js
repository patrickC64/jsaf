jsaf.include('application/init/initGraphics.js');	
jsaf.include('application/init/initInputControl.js');	



function startApplication()
{
	new jsaf_application( new testApp () ).start();	 
}


function testApp()
{
	
}


testApp.prototype.init =function ()
{
	this.initGraphics();
	this.initInputControl();
		
	this.appname ="testApp";
	
	this.framecounter = new jsaf_graphics_frameCounter();
	
	this.font = this.graphics2d.loadImageFont(this.rootpath+"media/font.png",16,16,1);	
	
	//var win = this.gui2d.addChild();

	//console.dir (	jsaf_gui2d_button ("testApp",200,200,300,300) )

}

testApp.prototype.update =function ()
{
	this.inputControl.update();

	this.ticker++;	
}


testApp.prototype.render =function ()
{
	var g = this.graphics2d;
	
	g.cls();
	g.setColor(1,1,1);
	g.setAlpha(1);
	g.setScale(1,1);
	
	g.setFont(this.font);
	
	
//	g.drawText("fps:"+this.framecounter.getFps(),10,20);
	this.appWindow.titleBar.text = portalOS.fps;
	
	g.render(); 
}