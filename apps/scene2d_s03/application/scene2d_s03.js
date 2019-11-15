jsaf.include('application/init/initScene2d.js');

scene2d_s03.prototype = Object.create ( jsaf.application.prototype );

function scene2d_s03()
{
	jsaf.application.call(this);
		
	this.name ='scene2d demo';	
}


scene2d_s03.prototype.init =function ()
{

	this.font = this.graphics2d.loadFont(this.rootpath+"media/font.png",16,16,1);	
	
	this.initScene2d();
	
	this.butterflyPool = new jsaf_objectPool( this.createButterfly, this );
 
	this.butterflyPool.maxObjects = 1000;
 
	this.jump = 0;
	this.isJump = 0;
}


scene2d_s03.prototype.update =function ()
{
 	this.scene2d.update(this.deltaTime);	
 
	var obj = this.player;

	obj.translate(8,0);
	obj.animate(.25);
		
	this.cam2d.position[0]=obj.position[0]-512;
	 
	this.cam2d.zoom=1;
	
	this.updateButterflys();
	
	if ( this.ticker % 2== 1) 
	{
		for (var c=0;c<1000;c+=1)
			this.initButterfly(this.butterflyPool.getObject()); 
	}

	
	if ( this.inputControl.getKeystate(32)==1 && this.jump < .5)
	{	
		this.jump=40;
	}
	
	
	this.player.translate ( 0, -this.jump);
	
	if(this.jump>1)
	{
		this.jump*=.955;
	} else
		this.jump = 0;

	var p = this.player.getPosition();

	if ( p[1] < 460 )
		this.player.translate ( 0, 20 );

	if ( p[1]+5 > 460 )
	{	this.player.setPosition ( p[0], p[1] );
		this.jump =0;
	}
}


scene2d_s03.prototype.render =function ()
{
	var g2d = this.graphics2d;	
	var s2d = this.scene2d;	

	
	s2d.render();

 	g2d.resetTransform();
 	
	g2d.setColor(1.0,1.0,1.0,1.0)
 

	g2d.setFont(this.font);
	
	g2d.drawText("fps:"+this.frameCounter.getFps(),10,20);
	g2d.drawText("delta:"+ Math.round(this.deltaTime*100)/100  ,10,45);
 	g2d.drawText("Butterflys:"+this.butterflyPool.objectList.nodes,10,65);
	g2d.drawText("BtrflyPool:"+this.butterflyPool.objectPool.nodes,10,90);
 
	g2d.render();
}


scene2d_s03.prototype.createButterfly = function ()
{
	butterfly =  new jsaf_scene2d_object(this.butterflyImage);
		
	butterfly.animated	= true; 
	
	this.layer[4].addObject(butterfly);

	return butterfly;
}

scene2d_s03.prototype.initButterfly = function (butterfly)
{	
	if ( butterfly==null)return;

	butterfly.spd	= 4+Math.random()*2;
	butterfly.frame = 1;
	butterfly.setPosition( this.cam2d.position[0]+1100+Math.random()*300,Math.random()*768);
	butterfly.show();
 
}


scene2d_s03.prototype.updateButterflys = function ()
{
	this.butterflyPool.forEach(function (butterfly)
	{ 			
		butterfly.translate(butterfly.spd, (Math.sin( butterfly.position[0]*.0025)*1));
		butterfly.frame+=(butterfly.spd*.075);
		
		if( (butterfly.position[0]-this.cam2d.position[0]) <  -60 )
		{				
			butterfly.hide();
			butterfly.back2pool();
		}
		
	}.bind(this));	
}




