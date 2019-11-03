scene2d_s03.prototype.initScene2d = function (rootpath)
{	
	var graphics2d = this.graphics2d;
	var scene2d = new jsaf_scene2d(graphics2d);	
 
	this.scene2d = scene2d;
		
	var layer0	= scene2d.createLayer(2,1,1024,2);

	var layer1	= scene2d.createLayer(12,6,128,128);
	var layer2	= scene2d.createLayer(12,6,128,128);
 	var layer3	= scene2d.createLayer(12,6,128,128);
 	var layer4	= scene2d.createLayer(12,6,128,128);
								
	layer0.repeatX = true;
	layer1.repeatX = true;
	layer2.repeatX = true;
	layer4.repeatX = true;

	var cam2d	= this.cam2d = scene2d.createCam();
	
	
	
	var imgPL = graphics2d.loadImage( rootpath +'map/Tiles/13.png',1);
	var imgPC = graphics2d.loadImage( rootpath +'map/Tiles/14.png',1);
	var imgPR = graphics2d.loadImage( rootpath +'map/Tiles/15.png',1);

	var bgImg = graphics2d.loadImage( rootpath +'map/BG/BG4.png',1);
	var img2 = graphics2d.loadImage( rootpath +'map/Tiles/2.png',1);
	var img3 = graphics2d.loadImage( rootpath +'map/Object/Bush1.png',1);
 
	var ptileL = new jsaf_scene2d_tile(imgPL);
	var ptileC = new jsaf_scene2d_tile(imgPC);
	var ptileR = new jsaf_scene2d_tile(imgPR);
		
	var bgTile = new jsaf_scene2d_tile(bgImg);
	var bdTile = new jsaf_scene2d_tile(img2);
	var bdTile2 = new jsaf_scene2d_tile(img2);
 

	bgTile.scale=[1,1.3];
	bdTile2.scale=[1,-1];
	bdTile2.offset=[0,-150];
			
	var bush = new jsaf_scene2d_tile(img3);
	var bush2 = new jsaf_scene2d_tile(img3);

	bush.offset=[64,32];
	bush.offset=[64,32];
	bush2.offset=[64,48];

	bush.blendmode = graphics2d.MASK_BLEND;
	bush2.blendmode = graphics2d.MASK_BLEND;

 	ptileL.blendmode = graphics2d.MASK_BLEND;
 	ptileC.blendmode = graphics2d.MASK_BLEND;
 	ptileR.blendmode = graphics2d.MASK_BLEND;
	
	bgTile.blendmode = graphics2d.MASK_BLEND;
	bdTile.blendmode = graphics2d.MASK_BLEND;
	bdTile2.blendmode = graphics2d.MASK_BLEND;
 
	layer0.addTile(bgTile,0,0);
	layer0.addTile(bgTile,1,0);

	layer0.enableParallax( .5, .5);
	layer1.enableParallax( .6, .6);
	layer2.enableParallax( .7, .7);
	layer3.enableParallax( .8, .8);
			
 	layer2.addTiles(bdTile,0,5,layer2.tilesX,1);
 	layer2.addTiles(bdTile2,0,0,layer2.tilesX,1);
 

 	layer2.addTile (bush,5,4);
 	layer2.addTile (bush,11,4);
 
	layer2.addTile (bush,2,4);
 	layer2.addTile (bush,9,4);

	layer1.addTile (bush2,5,3);


 	layer1.addTile (ptileL,4,4);
 	layer1.addTile (ptileC,5,4);
 	layer1.addTile (ptileR,6,4);
		
 	layer2.addTile (ptileL,9,3);
 	layer2.addTile (ptileC,10,3);
 	layer2.addTile (ptileR,11,3);

 	layer3.addTile (ptileL,3,3);
 	layer3.addTile (ptileC,4,3);
 	layer3.addTile (ptileC,5,3);
 	layer3.addTile (ptileR,6,3);

	layer3.addTile (bush2,5,2);

 	layer4.addTile (ptileL,8,2);
 	layer4.addTile (ptileC,9,2);
 	layer4.addTile (ptileR,10,2);

	this.butterflyImage = graphics2d.loadAnimImage( rootpath +'media/anim02.png',14,6,1);

	var playerImg = graphics2d.loadAnimImage( rootpath +'media/run1.png',10,1,1);
	//var playerImg = graphics2d.loadImage( rootpath +'media/obj01.png');

	var obj = new jsaf_scene2d_object(playerImg);
	
	obj.blendmode=graphics2d.MASK_BLEND;
	
	obj.animated=true;
 
	obj.setPosition(600,610);
	layer4.addObject(obj)
	obj.scale =[-2,3];
		
	this.player = obj;

	this.layer = [layer0,layer1,layer2,layer3,layer4];
}