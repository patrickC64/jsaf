portalOS.prototype.checkIncludeState = function (portalOSApplication)
{

	for ( var i = 0; i < portalOSApplication.includes.length; i++)
	{ 
		if ( portalOSApplication.includes[i].load != true )
			return false;
	}		
	
	return true;
}

portalOS.prototype.checkLoadState = function (portalOSApplication)
{
	if ( portalOSApplication.application && this.checkIncludeState(portalOSApplication) )
	{	
		return 'ready';
	}

	if ( !portalOSApplication.application   && typeof window[portalOSApplication.name] === 'function' )
	{
		portalOSApplication.application = window[portalOSApplication.name];
	
	} 
 
	return false;
}


portalOS.prototype.checkApplicationState = function (portalOSApplication)
{
	var app = portalOSApplication;

	switch ( app.state )
	{
		case 'bind':
			this.loadApplication ( portalOSApplication );			
			break;

		case 'load':			
			if ( this.checkLoadState (app) == 'ready' )
			{
				app.state = 'loadsuccess';
			 
				this.loadInProgress = false;
			}			
			break;

		case 'loadsuccess':
			
			if (app.autostart)
				this.startApplication (app)


			break;

		case 'running':
 

			
			break;
					
	}

}


portalOS.prototype.bindApplication = function ( storage, appname )
{
	this.isLoading = true;
	
	console.log ("portalOS > bind application:" + appname );
			
	var rootpath = storage+'/'+appname+'/';

	var portalOSApplication = { 
		 'rootpath': rootpath
		,'program': null
		,'application': null
		,'name':appname
		,'state': 'bind'
		,'active':false 
		,'includes':[]
		};
	
	this.portalApplications.addData ( portalOSApplication ).id=appname;
	
	this.loadApplication ( portalOSApplication );
	
	return portalOSApplication;

}

portalOS.prototype.loadApplication = function ( portalOSApplication )
{
	if ( this.loadInProgress == true )
		return;
	
	this.loadInProgress = true;
	
	portalOSApplication.state = 'load';
	
	this.currentIncludePath = portalOSApplication.rootpath;
	
	console.log ("portalOS > load application :" + portalOSApplication.name);
	
	jsaf.include = function (url)
	{ 	
	
		url=portalOSApplication.rootpath + url +"?"+( new Date()/1000);

		var s = document.createElement("script");
		
		s.type = "text/javascript";
		
		s.src = url;
		
		var include = {'url':url, 'load':false };
		
		s.onload = function (){ include.load = true; };
		
		document.getElementsByTagName("head")[0].appendChild(s);

		portalOSApplication.includes.push( include );

		jsaf.log("portalOS load file >"+url); 
		
	}.bind(portalOSApplication);
		
	jsaf.include( 'application/' + portalOSApplication.name +'.js');	

}	

portalOS.prototype.startApplication = function ( portalOSApplication )
{
	var posApp = portalOSApplication;
				
	posApp.program = new posApp.application();
 
	posApp.program.rootpath = portalOSApplication.rootpath;

	var dummyFunc = function () { };
	
	var dummyModul = function () { return { 'update': function () { }, 'render': dummyFunc }; }.bind(dummyFunc);
	
	posApp.program.graphics = this.graphics;
	posApp.program.graphics2d = this.graphics2d;
	posApp.program.inputControl = this.inputControl;
	posApp.program.gui2d = this.gui2d;
	posApp.program.frameCounter = new jsaf.frameCounter();
	
	if ( typeof (posApp.guiApplication) == 'undefined' || posApp.guiApplication == false)
	{
		var appWindow = this.gui2d.addChild (new jsaf_gui2d_applicationWindow (posApp.name , 200,200,420,300));
		
		if ( typeof(posApp.startPos)!='undefined' )
			appWindow.setPosition ( posApp.startPos[0], posApp.startPos[1]);
		
		appWindow.setApplication ( posApp );
		
		posApp.program.appWindow=appWindow;
	}
	
	posApp.program.init();
	
	posApp.program.state ='running';
	
	posApp.active = true;
}