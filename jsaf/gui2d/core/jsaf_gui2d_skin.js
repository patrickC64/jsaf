jsaf_gui2d_skin = function ( renderContext )
{
	this.renderContext = renderContext;	
	this.widgets = {};
	
	this.currentFont = null;
	this.defaultSkin = null;
	var frc = [1,1,1,1]; // full color range
	this.colors	 = { 'background': frc, 'border': frc, 'font': frc};
	
	this.color = [1,1,1,1];
}


jsaf_gui2d_skin.prototype.getWidgetSkin = function (type)
{	
	return this.widgets[type];
}

jsaf_gui2d_skin.prototype.createSkin = function ( type )
{
	
	var nskin = new jsaf_gui2d_widgetSkin(type);

	nskin.skin = this;
	
	if ( !type )
	{ 
		this.defaultSkin = nskin
		this.defaultSkin.type = 'defaultSkin';
	}
	
	return this.widgets[type] = nskin;
}


jsaf_gui2d_skin.prototype.getSkin = function ( type )
{
	var skin = this.widgets[type];
	
	if ( !skin ) 
		skin = this.defaultSkin;
	
	return skin;
	
}

jsaf_gui2d_skin.prototype.setColorV = function ( color )
{ 
	this.color = color;
}

jsaf_gui2d_skin.prototype.useColor = function ( color )
{
	this.renderContext.setColorV (
		[ color[0]*this.color[0]
		 ,color[1]*this.color[1]
		 ,color[2]*this.color[2]
		 ,color[3]*this.color[3] ]
	);
}

jsaf_gui2d_skin.prototype.useFont = function ( font )
{
	var g = this.renderContext;
 
	g.setScaleV ( font.scale );
	this.useColor  ( font.color );
	g.setFont 	( font.font ) ;
}

 
jsaf_gui2d_skin.prototype.drawTextV = function ( skinFont, text, v)
{
	var g = this.renderContext;
 
	this.useFont ( skinFont );
	this.renderContext.drawTextV( text, v );
}

jsaf_gui2d_skin.prototype.drawImageV = function ( skinImage, v )
{
	var g = this.renderContext;
	g.resetTransform();

	if (!skinImage )
	{	//	console.log(+v);
		g.setColor ( 1, 0, 0);
		g.drawRectV( v);	
		return;
	}	


	//if ( skinImage.color )
		this.useColor  ( skinImage.color );

	var flip = skinImage.flip;

	if (flip)
	{
		g.setScale ( 1*flip[0], 1*flip[1]);
		
		if ( flip[0] <1 )
			v[0]-=flip[0]*v[2];

		if ( flip[1] <1 )
			v[1]-=flip[1]*v[3];
	}
	
	if ( skinImage.animImage )
	{
		g.drawAnimImageRectV( skinImage.image, v,skinImage.frame);	
	}
	else
		g.drawImageRectV( skinImage.image, v);		

}