jsaf.use("3thdParty/opentypejs/dist/opentype.min.js");
jsaf.use("3thdParty/earcut/earcut.js");

jsaf_graphics2d_ttfFont.prototype = Object.create ( jsaf_graphics2d_font.prototype );

function jsaf_graphics2d_ttfFont( graphics2d )
{
	jsaf_graphics2d_font.call ( this, graphics2d );
	
	this.letterSpacing = 6;
	
	this.isload = false;

	this.glyphs = [];
	
	// glyph scale factor (unitsPerPM to Pixel)
	this.gscale = 0;
}

jsaf_graphics2d_ttfFont.prototype.loadFont = function ( url, fontSize  )
{
	fontSize = fontSize ? fontSize : 32;
	
	this.fontSize = fontSize;

    opentype.load( url, function (err, font) {
 		
        if (err) {
            console.log("LOAD TTFFONT ERROR :"+err);
        }else {
			this.buildFont(font);
			this.isload = true;
		}
		
	}.bind(this)); 

}

jsaf_graphics2d_ttfFont.prototype.xloadFont = async function ( url, fontSize  )
{ 
	
	fontSize = fontSize ? fontSize : 32;
	
	this.fontSize = fontSize;
		
	var font = await opentype.load(url);
	
	if (font)
	{ 
		this.buildFont(font);
		this.isload = true;
	}
}


jsaf_graphics2d_ttfFont.prototype.buildFont = function ( font )
{

		this.gscale = this.fontSize/font.unitsPerEm;
		var fontSize = this.fontSize;
		var x;
		var y;
		var path,cPoly,unicode, offset;

		for (var gi = 0; gi < font.glyphs.length; gi++) {
			
			glyph = font.glyphs.get(gi);

			path = glyph.getPath( 0 ,  fontSize , fontSize, {kerning: false } );
			
			cPoly = new jsaf_graphics2d_polygonPath();

			for (let i = 0; i < path.commands.length; i += 1) 
			{
				const cmd = path.commands[i];
 	
				switch ( cmd.type )
				{
					case 'M':
						cPoly.beginPath();
						cPoly.moveTo ( { x:cmd.x, y:cmd.y } );	 
						break;
					case 'L':
						cPoly.lineTo ( { x:cmd.x , y:cmd.y  } );
						break;
					case 'C':
					 	cPoly.bezierCurveTo( { x:cmd.x2, y:cmd.y2 } ,  { x:cmd.x1 , y:cmd.y1  }, { x:cmd.x  , y:cmd.y    } );
						break;
					case 'Q':
					 	cPoly.quadraticCurveTo( { x:cmd.x , y:cmd.y  } ,  { x:cmd.x1  , y:cmd.y1   } );

						break;
					case 'Z':
						cPoly.closePath();	
						break;
				}
							
		
			}
			
			cPoly.closePath();
			
			if (gi<10 && false)
			{
				console.log(glyph);
				console.log(glyph.getMetrics());
			}
			if ( cPoly.triangles.length )
				this.glyphs[glyph.unicode] = { 'polygon': cPoly, 'metrics':glyph.getMetrics(), 'width': glyph.advanceWidth * this.gscale, 'glyph':glyph };
		}	
		
}


jsaf_graphics2d_ttfFont.prototype.drawText = function ( text, x, y, center)
{
	if( this.isload == false )
		return;

	text+='';
 
	let xoff = x;
	let yoff = y;
	let scale = this.graphics2d.getScale();//[ 1.0, 1.0];
	let glyph = null;	
	// draw each glyph seperate
	for(c=0;c<text.length;c++)
	{	
		if (text.charCodeAt(c) == 10)
		{
			yoff += this.fontSize;
			xoff = x;			
			continue;
		}

		if (text.charCodeAt(c) == 32)
		{
			xoff += this.fontSize*.33;			
			continue;
		}
	
		if ( glyph = this.glyphs[text.charCodeAt(c)] )
		{	
			this.drawGlyph( glyph , xoff , yoff);			
//			xoff += (glyph.metrics.xMax-glyph.metrics.xMin )/(this.fontSize*2) * scale[0];
			xoff += glyph.width * scale[0];
		}
						
		//if (this.letterSpacing !=0 )
		//	xoff += this.letterSpacing * scale[0];		
	}
 
}


jsaf_graphics2d_ttfFont.prototype.drawGlyph = function ( glyph, x, y)
{
	this.graphics2d.drawPolygon ( glyph.polygon.triangles, x, y); 
}


jsaf_graphics2d_ttfFont.prototype.convertToImageFont = function ()
{
		var g = this.graphics2d;
 
		var gl = this.graphics2d.gl;

		var settings = {   
						//  'wrap_s':gl.CLAMP_TO_EDGE, 'wrap_t':gl.CLAMP_TO_EDGE,
					       'filter':gl.NEAREST	 ,
					     //  'filter':gl.LINEAR	 ,
					   } ;
	
		var image = this.graphics2d.createImage( this.fontSize*16   , this.fontSize*16  , settings );
		
	  
		g.setRenderTarget( image );
		g.graphics.yflip = 1.0;
		
		g.setColor (0,0,.5);
		
		this.renderFontAtlas(0,000);
	//	g.drawRect ( 0,0,300,300);
		g.setRenderTarget( null );
	
		var imageFont = new jsaf_graphics2d_imageFont();
		
		imageFont.graphics2d = g;
		
		image.texture.createTextureAtlas ( 16, 16 );
				
		imageFont.image = image;
		imageFont.fontSize = this.fontSize;
		
		return imageFont;
}



jsaf_graphics2d_ttfFont.prototype.renderFontAtlas = function ( ox, oy )
{
		var g = this.graphics2d;
 
		var gl = this.graphics2d.gl;
	
		var dx,dy;
		
		g.setFont ( this );
		
		for (chr = 0; chr < 128; chr++)
		{
			dx = ox+(chr%16)*this.fontSize
			dy = oy+parseInt((chr)/16)*this.fontSize;

			var gly = this.glyphs[chr];
			
			if ( gly )
			{	
				var tx = (this.fontSize-gly.width)*.5;
				this.drawGlyph(gly,dx+tx-6,dy);
			}
		}
}
