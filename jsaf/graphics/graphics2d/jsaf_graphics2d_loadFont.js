jsaf_graphics2d.prototype.loadFont = function ( url )
{
	var len = url.length;
	var ext = url.substr( len-( len-url.lastIndexOf('.')-1 ) );
	
	var font = null;
 
	switch ( ext.toLowerCase() )
	{
		case 'png':
		case 'gif':
		case 'bmp':
		case 'jpg':
		case 'jpeg':
 
			var cellsx = arguments[1];
			var cellsy = arguments[2];
			var flags  = arguments[3];
			
			font = new jsaf_graphics2d_imageFont( this );
			font.loadFont ( url, cellsx, cellsy, flags);
			
			break;
			
		case 'ttf':
		case 'otf':
		case 'woff':
		
			var flags  = arguments[1];
			
			font = new jsaf_graphics2d_ttfFont( this );
			font.loadFont ( url, flags );
			
			break;

		default:
			alert('UNKNOWN EXTENSION (FONT) :'+ext);
	}
	//console.log ("load "+ext+"Font: "+url);		
	return font;
}
