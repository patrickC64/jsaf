 spriteFactory.prototype.initGui = function ()
{	
	var g =  this.graphics2d;

	if ( this.gui2d == null)
		this.gui2d = new jsaf_gui2d (g, this.inputControl );

	var gui = this.gui2d;
	
	var defaultSkin = this.guiCreateSkin();
 
	if(gui.skin == null)
		gui.useSkin( defaultSkin );

}


spriteFactory.prototype.guiCreateSkin = function()
{	
	var g =  this.graphics2d;
 
	var skinname = 'guiskin/default/widgets/gui/';
 
	var cborder	= g.loadAnimImage (skinname+'images/corners.png',2,2,2);	
	var hborder	= g.loadImage (skinname+'images/borderh.png',2);
	var vborder	= g.loadImage (skinname+'images/borderv.png',2);
	var background	= g.loadImage (skinname+'images/background.png',2);
	var imageFont	= g.loadFont ( skinname+'fonts/font00.png',16,16,2);
	
	var cursorImg	= g.loadImage ( 'guiskin/default/cursor/default.png',2);
	
	var skin = new jsaf_gui2d_skin ( g );
	
	this.guiSkin = skin;
	
	skin.setColorV ( [ 1, 1, 1, 1] );	
	
	
	var wskin = skin.createSkin	(  );
 
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	
	wskin.setImage	( 'background', { 'image': background,'color': [.65,.65,.65,1]} );

	var bordercolor =[ .75, .75, .75, .6];
	
	wskin.setImage	( 'border_ul', { 'image': cborder, 'flip' : [1,1], 'frame': 0, 'color': bordercolor, 'animImage':true } );
	wskin.setImage	( 'border_ur', { 'image': cborder, 'flip' : [1,1], 'frame': 1, 'color': bordercolor, 'animImage':true } );
	wskin.setImage	( 'border_dl', { 'image': cborder, 'flip' : [1,1], 'frame': 2, 'color': bordercolor, 'animImage':true  } );
	wskin.setImage	( 'border_dr', { 'image': cborder, 'flip' : [1,1], 'frame': 3, 'color': bordercolor, 'animImage':true  } );

	wskin.setImage	( 'border_r',  { 'image': vborder, 'flip' : [ 1, 1], 'frame': 0, 'color': bordercolor } );
	wskin.setImage	( 'border_l',  { 'image': vborder, 'flip' : [-1, 1], 'frame': 0, 'color': bordercolor } );
	wskin.setImage	( 'border_u',  { 'image': hborder, 'flip' : [ 1, 1], 'frame': 0, 'color': bordercolor } );
	wskin.setImage	( 'border_d',  { 'image': hborder, 'flip' : [ 1,-1], 'frame': 0, 'color': bordercolor } );

	
	var shadow = [.3,.3,.3,.075];
 
	wskin.setImage	( 'border:shadow', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color':shadow} );
	
	wskin.setImage	( 'border_ul:shadow', { 'image': cborder, 'flip' : [1,1], 'frame': 0, 'color': shadow , 'animImage':true } );
	wskin.setImage	( 'border_ur:shadow', { 'image': cborder, 'flip' : [1,1], 'frame': 1, 'color': shadow, 'animImage':true } );
	wskin.setImage	( 'border_dl:shadow', { 'image': cborder, 'flip' : [1,1], 'frame': 2, 'color': shadow, 'animImage':true  } );
	wskin.setImage	( 'border_dr:shadow', { 'image': cborder, 'flip' : [1,1], 'frame': 3, 'color': shadow, 'animImage':true  } );

	wskin.setImage	( 'border_r:shadow',  { 'image': vborder, 'flip' : [ 1, 1], 'frame': 0, 'color': shadow } );
	wskin.setImage	( 'border_l:shadow',  { 'image': vborder, 'flip' : [-1, 1], 'frame': 0, 'color': shadow } );
	wskin.setImage	( 'border_u:shadow',  { 'image': hborder, 'flip' : [ 1, 1], 'frame': 0, 'color': shadow } );
	wskin.setImage	( 'border_d:shadow',  { 'image': hborder, 'flip' : [ 1,-1], 'frame': 0, 'color': shadow } );
	
	
	var guiBackground	= g.loadImage (skinname+'images/bg01.jpeg',2);
	var wskin = skin.createSkin	( 'gui' );
	wskin.setImage	( 'background', { 'image': guiBackground, 'flip' : [1,1], 'frame': 0 ,'color': [ 1,1,1,1]} );
	wskin.setImage	( 'cursor', { 'image': cursorImg, 'color': [1,1,1,1]} );

	var colPreview = skin.createSkin	( 'colorPreview' );
	colPreview.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ 1.0,1.0,1.0,1.0]} );

	
	var wskin = skin.createSkin	( 'desktopBar' );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .5,.5,.5,.3]} );
	
	var wskin = skin.createSkin	( 'window' );


	var wskin = skin.createSkin	( 'titleBar' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .4, .4, .45,.5]} );
	wskin.setImage	( 'border', { 'image': hborder, 'flip' : [1,1], 'frame': 0 ,'color': bordercolor } );

		
	var wskin = skin.createSkin	( 'slider' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .35, .35, .35,1]} );
	wskin.setImage	( 'border', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .3, .3, .3,1] } );
	
	var wskin = skin.createSkin	( 'horizontalSliderButton' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .45, .45, .45,1]} );
	wskin.setImage	( 'border', { 'image': hborder, 'flip' : [1,1], 'frame': 0 ,'color': bordercolor } );

	var wskin = skin.createSkin	( 'verticalSliderButton' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .45, .45, .45,1]} );
	wskin.setImage	( 'border', { 'image': hborder, 'flip' : [1,1], 'frame': 0 ,'color': bordercolor } );


	var wskin = skin.createSkin	( 'button' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .55, .55, .55,1]} );
	wskin.setImage	( 'border', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .4, .4, .4,1] } );

	var wskin = skin.createSkin	( 'inputBox' );
	wskin.setFont	(  0, { 'font' : imageFont, 'letterSpacing':4, 'scale':[ .75, .75], 'color':[ 1, 1, 1, 1]} );
	wskin.setColor	(  'cursor', [.1,.1,.1,1] );
	wskin.setImage	( 'background', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .45, .45, .45,1]} );
	wskin.setImage	( 'border', { 'image': background, 'flip' : [1,1], 'frame': 0 ,'color': [ .3, .3, .3,1] } );
 
 	var wskin = skin.createSkin	( 'desktopBarImageButton' );
	wskin.setColor( 'image', [1,1,1,1] );
	//wskin.setColor( 'mouseOver', [1,1,1,1] );
 
 
 	var wskin = skin.createSkin	( 'colorPreview' );
	wskin.setImage	( 'background', { 'image': background, 'color': [ 1,1,1,1]} );
 
	return skin;
}

