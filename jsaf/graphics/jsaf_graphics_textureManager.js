function jsaf_graphics_textureManager(gl)
{
	this.gl = gl;
}


jsaf_graphics_textureManager.prototype.createTexture = function (w , h, settings )
{	
	var texture = new jsaf_graphics_texture( this, w, h, settings);
	
	texture.init();
 
	return texture;
}

jsaf_graphics_textureManager.prototype.loadTexture = function (texUrl, flags, onSuccess, onError)
{	
	var texture = new jsaf_graphics_texture ( this, 1, 1, flags );
	
	texture.init();
	
	var gl = this.gl;
	
	var image = new Image();
	
	image.src = texUrl;
	
	image.addEventListener('load', function ()
	{  
		gl.activeTexture(gl.TEXTURE0 );
		
		gl.bindTexture(gl.TEXTURE_2D, texture.glTexture );

		gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

		texture.width = image.width;
		texture.height = image.height;

		var isPowOf2=function(n) { return n && (n & (n - 1)) === 0; }
		var nextPowOf2=function(n) { return n } // TODO!!

		// if it's a power of 2 in both dimensions then
		// we can generate mips, otherwise we'd have to do other things
		if ( isPowOf2(texture.width) && isPowOf2(texture.height) )
		{
		 	gl.generateMipmap(gl.TEXTURE_2D);
		}

 
		if( typeof(onSuccess)!='undefined' && onSuccess !=null) 
			onSuccess()
	  
	}.bind( texture, gl, onSuccess ) );
	
	image.addEventListener('error', function() {
		if( typeof(onError)!='undefined' && onError !=null) 
			onError()
		else
			alert("fail!"+image.src);	  
	});
	
	return texture;
}