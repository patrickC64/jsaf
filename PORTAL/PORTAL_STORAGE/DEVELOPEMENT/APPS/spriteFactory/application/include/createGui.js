spriteFactory.prototype.createGui = function ()
{	
	this.initGui();
	
	var gui = this.gui2d;
	var g = this.graphics2d;

 	var toolWindow = gui.addChild ( new jsaf_gui2d_window( 'Project', 720, 20,128,32) )
 	toolWindow.resizeable = false;
	
 	var toolWindow = gui.addChild ( new jsaf_gui2d_window( 'Tools', 440, 20,128,32) )
 	toolWindow.resizeable = false;
		
	var paletteWindow = gui.addChild ( new jsaf_gui2d_window( 'Palette', 440, 120, 100,257) )
	
	paletteWindow.dimensionMin = [100,24];
	 
	paletteWindow.setDimension(100,299);
					
	paletteWindow.resizeable = false;
	
	this.colorPreview =  paletteWindow.addChild( new jsaf_gui2d_control ( 33,1,67,67 ) );
	
	this.colorPreview.color= [1,1,1,1.0];
	this.colorPreview.type = 'colorPreview';
	this.colorPreview.addEventHandler(this.colorPreview.ON_RENDER_END , this.colorPreview.render);
 
	
	this.colorPreview.render = function()
	{ 	
		g.setColor  ( this.color[0], this.color[1], this.color[2] );
		g.drawRect( this.parent.renderCoords[0]+34, this.parent.renderCoords[1]+2,66-2,60-2);	
	};

	var  initRGBSlider = function (slider)
	{		
		slider.addEventHandler ( slider.ON_VALUE_CHANGED, function (v)
		{ 
			var nc = (v/255);
			this.colorPreview.color[slider.name] = 1.0-nc;	
		
		}.bind(this)  );
		
		return slider;
		
	}.bind(this);

	
	widget = paletteWindow.addChild ( new jsaf_gui2d_slider( 'vertical',0,1,10,271) );		
	initRGBSlider(widget).name=0;
	widget.setRange(255);
	widget.setValue(0);

	widget = paletteWindow.addChild ( new jsaf_gui2d_slider( 'vertical',11,1,10,271 ) );
	initRGBSlider(widget).name=1;
	widget.setRange(255);
	widget.setValue(0);
	
 	widget = paletteWindow.addChild ( new jsaf_gui2d_slider( 'vertical',22,1,10,271) );
	initRGBSlider(widget).name=2;
	widget.setRange(255);
	widget.setValue(0);
/*
 	widget = paletteWindow.addChild ( new jsaf_gui2d_numSelect( 22,1,10,271) );
	widget.name=0;
	widget.setRange(255);
	widget.setValue(0);	
*/
 	var editWindow = gui.addChild ( new spriteFactory_spriteEditor( 'Editor', 40 , 20,64*6,64*8) )
	editWindow.resizeable = false;
	editWindow.drawColor = this.colorPreview.color;
	
	var imageSelectWindow = gui.addChild ( new spriteFactory_spriteSelect( 'Image', 40 , 580,128*6 ,128+16 ) )
 
 	var msgBox = gui.addChild ( new jsaf_gui2d_messageBox( 'DSVGO','TEST\nABCDEF', 300 , 300 ) )
 	var msgBox2 = gui.addChild ( new jsaf_gui2d_loginBox( 'LOGIN', 600 , 330 ) )
 
}

spriteFactory_spriteSelect.prototype = Object.create (jsaf_gui2d_window.prototype);

function spriteFactory_spriteSelect( title, x, y, w, h )
{	
	jsaf_gui2d_window.call( this, title, x, y, w, h );
}

spriteFactory_spriteEditor.prototype = Object.create (jsaf_gui2d_window.prototype);

function spriteFactory_spriteEditor( title, x, y, w, h )
{	
	jsaf_gui2d_window.call( this, title, x, y, w, h );
	
	this.drawColor = [1,0,0,1];
	this.pxlSize = [ 6 ,8 ];
	
	this.rawEdit = [ ];
	
	for ( var i=1;i <= (64*64);i++ )
	{	
		var offset = (x/64)-1+(x%64)*4;
		
		this.rawEdit[offset	 ]=0;
		this.rawEdit[offset+1]=0;
		this.rawEdit[offset+2]=0;
		this.rawEdit[offset+3]=0;
	}
}


spriteFactory_spriteEditor.prototype.onInit = function ()
{ 
	jsaf_gui2d_window.prototype.onInit.call(this);
 
	this.container.addEventHandler (this.container.ON_RENDER, this.onRender , this ); 

	this.addEventHandler (this.ON_UPDATE, this.onUpdate,this  ); 
	this.addEventHandler (this.ON_MOUSE_DOWN, this.onMouseDown,this  ); 
	this.addEventHandler (this.ON_MOUSE_UP, this.onMouseUp,this  ); 

	this.imageWidth = 64;
	this.imageHeight = 64;
					
	this.initEdit();
}

spriteFactory_spriteEditor.prototype.initEdit  = function()
{
	var g = this.gui.getRenderContext();
		
	var settings = { 'filter_mag': g.gl.NEAREST };
	
	this.editBackground  = g.createImage(this.imageWidth,this.imageHeight , settings);
	this.editImage		 = g.createImage(this.imageWidth,this.imageHeight , settings);
	this.editPreview	 = g.createImage(this.imageWidth,this.imageHeight , settings);				
}

spriteFactory_spriteEditor.prototype.onMouseDown  = function()
{

}

spriteFactory_spriteEditor.prototype.onMouseUp  = function()
{

}
 
spriteFactory_spriteEditor.prototype.onUpdate  = function()
{	
	var up = this.getInputControl();
 
 	if ( this.gui.mouseOverWidget == this.container && this.gui.focusWidget == this.container )
	{
		var mousex = this.getInputControl().mouseX;
		var mousey = this.getInputControl().mouseY;

		var mx = mousex-this.position[0];
		var my = mousey-this.position[1]-this.container.position[1];
				
		mx-=(this.pxlSize[0]/2);
		my-=(this.pxlSize[1]/2);
		
		var dx =Math.round(mx/this.pxlSize[0]);
		var dy =Math.round(my/this.pxlSize[1]);
		
		var offset = (dy*64+dx)*4;

		if ( up.getKeystate(300)==2 )  
		{	
			var rgba = [ 255 * this.drawColor[0]
					  , 255 * this.drawColor[1]
					  , 255 * this.drawColor[2]
					  , 255 * 1 ];
			 
			var gl =this.gui.getRenderContext().gl 
			
			gl.bindTexture(gl.TEXTURE_2D, this.editImage.texture.glTexture );
			
			gl.texSubImage2D(gl.TEXTURE_2D, 0, dx, dy, 1, 1, gl.RGBA,  gl.UNSIGNED_BYTE, new Uint8Array(rgba));
	
		}

		if ( up.getKeystate(302)==2 )  
		{
			var gl =this.gui.getRenderContext().gl 
			
			gl.bindTexture(gl.TEXTURE_2D, this.editImage.texture.glTexture );
			
			gl.texSubImage2D(gl.TEXTURE_2D, 0, dx, dy, 1, 1, gl.RGBA,  gl.UNSIGNED_BYTE, new Uint8Array( [ 0, 0, 0, 255 ] ) );
		}
	}
}


spriteFactory_spriteEditor.prototype.onRender  = function()
{
	
	//prepare viewport
	var g = this.getRenderContext()
		
	var corigin = g.getOrigin();

	var rorigin = this.container.getRenderCoords()
 	
	g.setOrigin (rorigin[0] , rorigin[1])
	
	var mousex = this.getInputControl().mouseX;
	var mousey = this.getInputControl().mouseY;

	g.setScale( this.pxlSize[0], this.pxlSize[1] );
	
	g.setColor(1,1,1);
	
	g.drawImage ( this.editImage,0,0);

	g.setScale(1,1);

	var mx = mousex-this.position[0];
	var my = mousey-this.position[1]-this.container.position[1];

	var dx = Math.round(mx / this.pxlSize[0]) ;
	var dy = Math.round(my / this.pxlSize[1]) ;
 
	if ( this.gui.mouseOverWidget == this.container  && this.gui.focusWidget == this.container  )
	{	
		g.setAlpha(.25);
		g.setColor(.9,.9,.9);
		
	 	g.drawRect(0,my,64*this.pxlSize[0] ,1);
	 	g.drawRect(mx,0,1, 64*this.pxlSize[1] );
	}
 
	g.setOrigin (corigin[0], corigin[1]);
}
