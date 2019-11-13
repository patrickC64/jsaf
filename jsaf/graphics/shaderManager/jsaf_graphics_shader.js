jsaf_graphics_shader.VERTEX_SHADER = 0;
jsaf_graphics_shader.FRAGMENT_SHADER = 1;

 
 
function jsaf_graphics_shader(shaderManager, name)
{	
	this.name = name;
	this.useTextures = false;
	this.shaderManager = shaderManager;
	this.buffers = [];
	this.buffer = {};

	this.shaderSource = '';
	this.program = '';
	this.vertexShaderSource = null;
	this.fragmentShaderSource = null;
	
	this.precision = 'mediump';
	//this.precision = 'highp';

	this.dataIndex=0;
}


jsaf_graphics_shader.prototype.createVertexAttribute = function (name, decl )
{	
	var shaderBuffer =  new jsaf_graphics_shaderBuffer ( this
	, jsaf_graphics_shader.VERTEX_SHADER
	, jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER
	, name, decl );
	
	this.buffer[shaderBuffer.getName()] = shaderBuffer;
	
	this.buffers.push(shaderBuffer);
	
	return shaderBuffer;
}


jsaf_graphics_shader.prototype.createFragmentAttribute = function (name, decl )
{	
	var shaderBuffer =  new jsaf_graphics_shaderBuffer ( this
	, jsaf_graphics_shader.FRAGMENT_SHADER
	, jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER
	, name, decl);

	this.buffer[shaderBuffer.getName()] = shaderBuffer;
		
	this.buffers.push(shaderBuffer);
	
	return shaderBuffer;
}


jsaf_graphics_shader.prototype.createVertexUniform = function (name, decl )
{	
	var shaderBuffer =  new jsaf_graphics_shaderBuffer ( this
	, jsaf_graphics_shader.VERTEX_SHADER
	, jsaf_graphics_shaderBuffer.UNIFORM_BUFFER
	, name, decl );

	this.buffer[shaderBuffer.getName()] = shaderBuffer;
		
	this.buffers.push(shaderBuffer);
	
	return shaderBuffer;
}


jsaf_graphics_shader.prototype.createFragmentUniform = function (name, decl )
{	
	var shaderBuffer =  new jsaf_graphics_shaderBuffer ( this
	, jsaf_graphics_shader.FRAGMENT_SHADER
	, jsaf_graphics_shaderBuffer.UNIFORM_BUFFER
	, name, decl );

	this.buffer[shaderBuffer.getName()] = shaderBuffer;
		
	this.buffers.push(shaderBuffer);
	
	return shaderBuffer;
}


jsaf_graphics_shader.prototype.loadVertexShader = function (file)
{	
//	this.vertexShaderSource = jsaf.loadTextFileSync ( file );
	this.vertexShaderSource = await jsaf.loadFile ( file );
}


jsaf_graphics_shader.prototype.loadFragmentShader = function (file)
{
	this.fragmentShaderSource = jsaf.loadTextFileSync ( file );
}


jsaf_graphics_shader.prototype.use = function ()
{
	this.shaderManager.useShader( this );
}


jsaf_graphics_shader.prototype.compile = function ()
{
	
	var gl = this.shaderManager.graphics.gl;
	
	var vsp = this.compileShader( gl.VERTEX_SHADER, this.getVertexShaderSource());
	var fsp = this.compileShader( gl.FRAGMENT_SHADER,this.getFragmentShaderSource());

	//console.log(this.shaderSource);
	
	var program =  gl.createProgram();
	
	this.program = program;
	
	// Attach a vertex shader
	gl.attachShader(program, vsp); 

	// Attach a fragment shader
	gl.attachShader(program, fsp);

	// Link both programs
	gl.linkProgram(program);
	
 	this.bindBuffersLocaction();	
 
}


jsaf_graphics_shader.prototype.bindBuffersData = function (vertices)
{
	this.buffers.forEach ( function ( buffer )
	{	
		buffer.bindBufferData(vertices);		 
	});

}

jsaf_graphics_shader.prototype.bindBuffersLocaction = function ( )
{
	this.buffers.forEach ( function ( buffer )
	{
		buffer.bindLocation();
	});
}

				
jsaf_graphics_shader.prototype.getVertexShaderSource = function ( )
{
	var source = this.vertexShaderSource;
	
	source = source.replace ('##PRECISION', 'precision ' + this.precision+ ' float;' );
	
	this.shaderSource +=source+'\n';
	
	return source;
}


jsaf_graphics_shader.prototype.getFragmentShaderSource = function ( )
{
	var source = this.fragmentShaderSource;
	
	source = source.replace ('##PRECISION', 'precision ' + this.precision+ ' float;' );

	if ( this.useTextures )
	{
		source = source.replace ('##getFragmentColor', this.getTexUnitSource() );
	}

	this.shaderSource +=source+'\n';

	return source;
}


jsaf_graphics_shader.prototype.getTexUnitSource = function()
{	
	var begin = 
	 'uniform sampler2D textures['+this.shaderManager.graphics.textureUnits+'];\n'
	+'vec4 getFragmentColor( ) {'+'\n'
	+'  int id = int(fragmentshader_textureid);'
	+'   vec4 fcolor;'+'\n'
	+'    if (id == 0) {'+'\n'
	+'      fcolor = texture2D(textures[0], fragmentshader_texuv);'+'\n'
	+'    }';
	
	var end ='  else    {'+'\n'
	+'      fcolor = fragmentshader_color;'+'\n'
	+'   }'+'\n'
	+'    return fcolor*fragmentshader_color; \n}'+'\n';
	
	var texUnits = '';
	
	for ( var texunit = 1; texunit < this.shaderManager.graphics.textureUnits ; texunit++)
	{
		texUnits+=	'else if (id == '+ texunit +') {'+'\n'
					+'      fcolor = texture2D( textures['+ texunit +'], fragmentshader_texuv);'+'\n'
					+'    }'; 		
	}
	
	return begin+texUnits+'\n'+end;
}


jsaf_graphics_shader.prototype.compileShader = function ( type, source )
{
	var gl = this.shaderManager.graphics.gl;

	// Create a vertex shader object
	var shader = gl.createShader(type);

	// Attach shader source code
	gl.shaderSource(shader, source);

	// Compile the shader
	var comp = gl.compileShader(shader);
	
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
 	
	var compilationLog = gl.getShaderInfoLog(shader);
		
	if( compiled == 0 )
	{
		console.log(compilationLog);
	}
	
	return shader;	
}

