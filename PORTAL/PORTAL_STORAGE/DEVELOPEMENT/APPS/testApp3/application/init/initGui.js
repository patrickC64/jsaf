testApp3.prototype.initGui = function ()
{	
 	var g =  this.graphics2d;
	var defaultSkin = this.guiCreateSkin();
		
	var widget = null;
	var window = null;

	var gui = this.gui2d = new jsaf_gui2d (g, this.inputControl );

	gui.useSkin( defaultSkin );


 	var desktopBar = gui.addChild ( new jsaf_gui2d_stackPanel( 0,0, gui.position[2],72) );
	
	desktopBar.color=[1,1,1,.5]
	desktopBar.setType ('desktopBar');
	desktopBar.setOverflow ('visible');
	desktopBar.setAlign ('right');
	desktopBar.setMargin(8);

	
	widget = desktopBar.addChild ( new jsaf_gui2d_imageButton (
	g.loadImage('guiskin/default/icons/64x64/icons8-benutzer.png') , 0, 0, 64, 64));
	widget.setType ('desktopBarImageButton');
 			
	
 	var twin = gui.addChild ( new jsaf_gui2d_window( 'scrollbar test', 400, 300, 267,300 ) )
	var w2= twin.addChild ( new jsaf_gui2d_window( 'scrollbar test', 100, 100, 267,300 ) )
	w2.container.setOverflow('scroll');
	
    w2.addChild ( new jsaf_gui2d_window( 'scrollbar test', 100, 100, 267,300 ) )

	twin.container.setOverflow('scroll');
	
 	var cshemeWindow = gui.addChild ( new jsaf_gui2d_window( 'COLOR SCHEME', 100, 100, 277,18*3 ) )
	
	cshemeWindow.resizeable = false;

	var  initRGBSlider = function (slider)
	{
		slider.setRange(255);
		slider.setValue(255);
		
		slider.addEventHandler ( slider.ON_VALUE_CHANGED, function (v)
		{ 
			var nc = v/255;
			defaultSkin.color[this.name]=nc;
			console.log(v);
		})	
		
		return slider;
	}
	
	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,1,276,16) );		
	initRGBSlider(widget).name=0;
	
	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,18,276,16) );
	initRGBSlider(widget).name=1;

 	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,35,276,16) );
	initRGBSlider(widget).name=2;
  
}



testApp3.prototype.guiCreateSkin = function()
{

	var g =  this.graphics2d;
 
	var skinname = 'guiskin/default/widgets/gui/';
 
	var cborder	= g.loadAnimImage (skinname+'images/corners.png',2,2,2);	
	var hborder	= g.loadImage (skinname+'images/borderh.png',2);
	var vborder	= g.loadImage (skinname+'images/borderv.png',2);
	var background	= g.loadImage (skinname+'images/background.png',2);
	var imageFont	= g.loadImageFont ( skinname+'fonts/font00.png',16,16,2);
	
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
 
	return skin;
}