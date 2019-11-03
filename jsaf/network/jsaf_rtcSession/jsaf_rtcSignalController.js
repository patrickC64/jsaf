function jsaf_rtcSignalingController( signalingServerConfig )
{
	var protocol ='ws://';	
	
	if ( typeof( signalingServerConfig.https ) !='undefined' )
		protocol="wss://";
 
	this.connectionString = protocol+signalingServerConfig.url+':'+signalingServerConfig.port;	
	
	this.signalingServerConnection= null;

	// rtc 
	
	this.uuid = null;
	
	//--------------------------------------
	
	var onSignalingServerConnected 		= false;
	var onSignalingServerDisconnected 	= false;
	
	//--------------------------------------

	this.onReceiveSystemMessage	= null;
	this.onReceiveSignal		= null;

}


jsaf_rtcSignalingController.prototype.connect = function (onSuccess, onError)
{
	this.signalingServerConnection = new WebSocket (this.connectionString);
	
	this.signalingServerConnection.onopen = function (event) {
		jsaf.log("signaling server connected ...!");
		if(this.onSignalingServerConnected !=null)
			this.onSignalingServerConnected();
		
		if( jsaf_isDefined( onSuccess ) == true ) 
			onSuccess();
	}.bind(this); 
	
	
	this.signalingServerConnection.onclose =  function (event) {
		jsaf.log("signaling server disconnected ...!");
		if(this.onSignalingServerDisconnected !=null)
			this.onSignalingServerDisconnected();
		
		if( jsaf_isDefined( onError ) == true ) 
			onError();
	}.bind(this)
	
	
	this.signalingServerConnection.onmessage = function (msg)
	{
		var msgObj = null;

		try 
		{
			msgObj = JSON.parse(msg.data);		
		}
		catch(e)
			{alert("FAIL"+msg.data+"  /"+e);return;}

			
		// SYSTEM MESSAGE
		if( typeof( msgObj.SYSTEMMESSAGE ) != 'undefined' )
		{
			if(msgObj.SYSTEMMESSAGE=="UUID" && msgObj.UUID && this.uuid==null)
			{	
				this.uuid = msgObj.UUID;
			}

			this.onReceiveSystemMessage(msgObj);
		} 

		
		// SIGNAL MESSAGE
		else if( typeof( msgObj.SIGNAL ) != 'undefined' )
		{	
			this.onReceiveSignalCallback(msgObj);		
		}
		
	}.bind(this)

}


jsaf_rtcSignalingController.prototype.onReceiveSignalCallback = function (msgObj) 
{ 
	//console.dir(msgObj);

	if(this.onReceiveSignal != null)
		this.onReceiveSignal(msgObj);			
}


jsaf_rtcSignalingController.prototype.onReceiveSystemMessageCallback = function (msgobj) 
{  
	if(this.onReceiveSystemMessage!= null)
		this.onReceiveSystemMessage(msgObj);		
}


jsaf_rtcSignalingController.prototype.getPublicClients = function ()
{
	var msgObj = {SYSTEMMESSAGE:'GETPUBLICCLIENTS', FROM: this.uuid };

	this.signalingServerConnection.send ( JSON.stringify (msgObj) );
}


jsaf_rtcSignalingController.prototype.sendSignal = function (signal, to , args)
{
	var msgObj = {'SIGNAL':signal, 'TO': to, 'FROM':this.uuid };

	if(typeof (args)!='undefined')
		msgObj.ARGS = args;
	
	//alert("SEND:"+JSON.stringify (msgObj));
	this.signalingServerConnection.send ( JSON.stringify (msgObj) );
}
