jsaf_gui2d_widgetSkin = function (widgetType)
{
	this.widgetType = widgetType;
	
	this.skin = null;
 	
	var frc = [1,1,1,1]; // full color range

	this.colors	= { 'background': frc, 'border': frc, 'font': frc ,'cursor': [0,0,0,1]};
	this.images = {};
	this.fonts	= [];
}


jsaf_gui2d_widgetSkin.prototype.setImage = function ( target, image )
{
	image.target = target;
	
	this.images[target] = image;
}

 
jsaf_gui2d_widgetSkin.prototype.setColor = function ( target, color )
{
	this.colors[target] = color;
}

jsaf_gui2d_widgetSkin.prototype.setColors = function ( colors )
{
	this.colors = colors;
}

jsaf_gui2d_widgetSkin.prototype.setFont = function ( fontid, font )
{								
	this.fonts[fontid]=font;
}


jsaf_gui2d_widgetSkin.prototype.useColor = function (target, multiply)
{
	
	if ( typeof(multiply)!='undefined' )
	{ 	var color = this.colors[target];
		this.skin.useColor(
			[ color[0]*multiply[0]
			 ,color[1]*multiply[1]
			 ,color[2]*multiply[2]
			 ,color[3]*multiply[3] ]
		);	
		return;
	}
	
	this.skin.useColor ( this.colors[target] );
}

jsaf_gui2d_widgetSkin.prototype.useDefaultColor = function (target, multiply)
{
	this.skin.useColor ( [ 1, 1, 1, 1] );
}


jsaf_gui2d_widgetSkin.prototype.useColorIfExists = function (target , multiply)
{
	if ( this.colors[target] )
		this.useColor (  target , multiply);
}

jsaf_gui2d_widgetSkin.prototype.useFont = function (fontid)
{
	this.skin.useFont( this.fonts[fontid] );
}
 
jsaf_gui2d_widgetSkin.prototype.drawTextV = function ( fontid, text, v)
{
	this.skin.drawTextV( this.fonts[fontid], text, v );
}

jsaf_gui2d_widgetSkin.prototype.drawImageV = function ( name, v )
{
	this.skin.drawImageV( this.images[name], v );	
}