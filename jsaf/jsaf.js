var jsaf;

//window.onerror = function(message, source, lineno, colno, error)
// { alert(message+","+source+","+lineno);return false; }

var framework = ( function ()
{	
	function jsaf()
	{
		this.version = '0.01a';
		this.path = this.getPath();
		this.loglevel  = -1;
		this.loadIncludes = 0;
		this.onApplicationLoad = null;
		console.log ("JSAF "+this.version);
	}

	
	jsaf.prototype.getPath = function ()
	{
		var s = document.getElementsByTagName('script');
		for(var lu=0;lu<s.length;lu++)
		{
			if(s[lu].src.indexOf('jsaf.js')!=-1)
			{	
				var path=s[lu].getAttribute('src');
				return path.replace('jsaf.js','');
			}
		}
	}

	
	jsaf.prototype.error = function (text, type)
	{	
		// handle type
		if( typeof (text) == 'undefined')
		{
			text='no error text!';
		}
		
		// handle type
		if( typeof (type) == 'undefined')
			var type = "break";
	
		switch ( type )
		{
			case 'critical':
				alert('[JSAF CRITICAL ERROR] EXECUTION ABORT!'+'\n\n'+text);
				break;

			case 'break':
				throw new Error('[program break] EXECUTION ABORT!\n'+text);
				debugger;
				break;
				
			default:
				throw new Error('[ERROR]\n'+text);
			
		} 
	}

	
	jsaf.prototype.log = function (text,level)
	{ 	
		// handle type
		if( typeof (level) != 'undefined')
		{
			switch ( level )
			{
			}		
		}
		
		if(this.loglevel!=-1)
			console.log('JSAF> ' + text);
	}
	
	
	jsaf.prototype.loadFile = async function (url, onSuccess  )
	{	
		var request = new XMLHttpRequest();
		
		request.responseType ='blob';
		
 		request.onreadystatechange = function () 
		{	
			if (request.readyState == 4) 
			{
				switch (request.status)
				{
					case 200:
						if (onSuccess)
							onSuccess ( request.response );
						
						break;
					case 404:
						jsaf.error("file not found! :"+url);
						break;

				}
				
			}

		};

		request.open('GET', url);
		request.send();
	}
	
	jsaf.prototype.loadTextFileSync = function (file)
	{	
		var xhttp = new XMLHttpRequest();

		xhttp.open("GET", file, false); 
		xhttp.send();

		if ( xhttp.status === 200)
			return xhttp.responseText;
		else
			return null;  
	}	
	

	jsaf.prototype.requestScript = function (url, onLoad )
	{		
		this.log("request script>"+url); 	
		
		var s = document.createElement("script");
		
		s.type = "text/javascript";
		s.src = url;
		
		s.onload = onLoad;
		
		s.async=false
			
		document.getElementsByTagName("head")[0].appendChild(s);		
	}
	
	
	jsaf.prototype.use = function (file, onLoad )
	{		
		var url = this.path+file+"?"+(new Date()/1000);
	
		this.requestScript (url, onLoad );

		this.log("request use>"+file); 		

	}


	jsaf.prototype.include = function (file)
	{
		this.loadIncludes++;
	
		var onLoad = function (onLoad)
		{ 	  
			this.loadIncludes--;
			
			if ( this.loadIncludes>0 || this.onApplicationLoad == null)
				return;
			
			this.onApplicationLoad();
			
			this.onApplicationLoad = null;
			
		}.bind(this);
		
		var url = file+"?"+(new Date()/1000);
	
		this.requestScript (url, onLoad);

		this.log("request include>"+file); 				
	}


	jsaf.prototype.alertErrors = function ()
	{
		window.onerror = function myErrorHandler(message, file, line, col, error) {
	 
		var msg =  "ERROR!\n"
				  +"in :"+file+" @line:"+line+"\n"+message;
				  
		alert(msg);
		
		return true;
		
		}
	}
	
	

	jsaf.prototype.runApplication = function ( appname, renderContext, resx, resy )
	{
		this.appname = appname;
		this.renderContext = renderContext;
		this.resolution = [ resx, resy ];		
	}
	
	
	
	jsaf.prototype.loadApplication = function ( )
	{ 		
		
		this.onApplicationLoad = function(   ){

			//var app = ( Function (this.appname+'.prototype = Object.create ( jsaf.application.prototype );return new ' + this.appname  ))();
			//var app = ( Function (this.appname+'.prototype = Object.create ( jsaf.application.prototype );return new ' + this.appname  ))();
	 	 
			var app = ( Function ('return new ' + this.appname  ))();
 
	
			app.graphics 	 = new this.graphics	 ( this.renderContext , this.resolution[0], this.resolution[1] );
 
		 	app.graphics2d	 = new this.graphics.graphics2d   ( app.graphics );

		 	app.graphics3d	 = new this.graphics.graphics3d   ( app.graphics );
		
			app.inputControl = new this.inputControl ( app.graphics );

			app.frameCounter = new this.frameCounter (  );
						
			app.start();
			
			this.onApplicationLoad = null;	
			
		}.bind(this);
		
//		this.include('../'+this.appname +'/application/'+this.appname +'.js');
		this.include('application/'+this.appname +'.js');
	}	
	
	return jsaf;

})();
 
jsaf = new framework();

jsaf.use('application/jsaf_bootstrap.js');

if (  window.location.toString().indexOf ('?secenv') != -1 )
{	
	jsaf.use('secenv.js');
	
	const SECENV = true;
}
else
{
	( function () 
	{			 
		window.onload = function(){
			
			if ( typeof(jsaf.appname) != 'undefined' )
		 	jsaf.loadApplication();
		};
		
	} )();
} 


