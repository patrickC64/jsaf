jsaf.use('data/structures/jsaf_objectPool.js');

jsaf.include(portal.applicationRoot+'application/init/initScene2d.js');
jsaf.include(portal.applicationRoot+'application/portalApplication.js');
	
function scene2d_s03()
{
}
 

scene2d_s03.prototype.init =function ()
{	
	this.appname ="scene2d demo";

 	this.initScene2d(portal.applicationRoot);
	
	this.font = this.graphics2d.loadImageFont("media/Berlin_sans32.png",16,16,1);
	
	this.ticker =0;
	
	this.butterflyPool = new jsaf_objectPool( this.createButterfly, this.initButterfly, this );
	this.butterflyPool.maxObjects=100;
}

scene2d_s03.prototype.update =function ()
{	
	this.ticker++;
	
	var obj = this.player;

	obj.translate(8,0);
	obj.frame+=.025;
		
	this.cam2d.position[0]=obj.position[0]-512 ;

	this.cam2d.zoom=1;

	if ( this.ticker % 2== 1) 
	{
		for (var c=0;c<50;c++)
		this.butterflyPool.getObject(); 

		
	}
	
	this.updateButterflys();
}


scene2d_s03.prototype.render =function ()
{
 	//if (r%3 !=1) return;
	var g2d = this.graphics2d;	
	var s2d = this.scene2d;	
 
	s2d.render();
	return;
	g2d.setColor(1,1,1);
//	g2d.setBlendmode ( this.graphics2d.MASK_BLEND );
	g2d.setAlpha(1);
	g2d.setScale(1,1);
	
	g2d.setFont(this.font);
	
	//g2d.drawText("fps:"+getFps(),10,20);
 	g2d.drawText("Butterflys:"+this.butterflyPool.objectList.nodes,10,45);
	g2d.drawText("BtrflyPool:"+this.butterflyPool.objectPool.nodes,10,70);
 
}


scene2d_s03.prototype.createButterfly = function ()
{
	butterfly =  new jsaf_scene2d_object(this.butterflyImage);
	
	butterfly.animated	= true; 
	this.layer[4].addObject(butterfly);
	
	this.initButterfly(butterfly);
	
	return butterfly;
}

scene2d_s03.prototype.initButterfly = function (butterfly)
{	
	butterfly.spd	=4+Math.random()*2;
	butterfly.frame = 0;
	butterfly.setPosition( this.cam2d.position[0]+1100+Math.random()*300,(Math.random()*768));
	butterfly.show();
}


scene2d_s03.prototype.updateButterflys = function ()
{
	this.butterflyPool.forEach(function (butterfly)
	{ 			
		butterfly.translate(butterfly.spd,Math.sin( butterfly.position[0]*.1)*butterfly.spd*.01);
		butterfly.frame+=butterfly.spd*.05;
		
		if( (butterfly.position[0]-this.cam2d.position[0]) <  -60 )
		{				
			butterfly.hide();
			this.butterflyPool.returnObject(butterfly);
		}
		
	}.bind(this));	

}




