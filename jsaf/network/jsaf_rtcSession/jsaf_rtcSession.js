// signalingServerConfig as object 			   {url: remote-url/ip, port: remotePort}
// iceServerConfig 		 as array of objects [ {url: remote-url/ip, port: remotePort, credentials: crd, usrname: usrname } ]
function jsaf_rtcSession( signalingServerConfig , iceServersConfig )
{
	this.uuid			 	= null; // comes from signaling server	
	this.connections		= new dynamicList();
	
	this.signalingServerConfig	= signalingServerConfig;
	this.signalController		= null;
	this.iceServersConfig 		= iceServersConfig;
	
	// SIGNALSERVER CALLBACKS
	this.onReceiveSystemMessage	= null;	
	this.onReceiveSignal		= null;
	
	this.onConnectionRequest	= null;
	this.onConnectionReady		= null;
}


jsaf_rtcSession.prototype.start  = function (onSuccess, onError)
{	
	this.signalController = new jsaf_rtcSignalingController( this.signalingServerConfig )
	
	this.signalController.onReceiveSystemMessage = function (e) { this.onReceiveSystemMessageHandler (e) }.bind(this)
	this.signalController.onReceiveSignal = function (e) { this.onReceiveSignalHandler (e) }.bind(this)
	
 	this.signalController.connect(onSuccess, onError)
}


jsaf_rtcSession.prototype.addConnectionNode = function(to, onSuccess, onError )
{	
	var connNode = this.connections.getNodeById (to)
	
	if ( connNode != null ) return;
	
	connNode = this.connections.addData ( {'id':to, 'offererSDP': null, 'jsaf_rtcConnection': null, 'onSuccess':onSuccess, 'onError':onError} );
	
	connNode.id = to;
	
	return connNode;
}


jsaf_rtcSession.prototype.getPublicClients = function (onReceive)
{	
 	this.signalController.getPublicClients(onReceive);
}


jsaf_rtcSession.prototype.sendSignal = function( signal, to) 
{
	this.signalController.sendSignal( signal, to);
}


jsaf_rtcSession.prototype.sendConnectionRequest = function  (to, onSuccess, onError )
{
	var connNode = this.connections.getNodeById(to);
	
	if (connNode != null && connNode.data.jsaf_rtcConnection != null && connNode.jsaf_rtcConnection.connected == true )	
		return;
	
	this.addConnectionNode(to, onSuccess, onError )
	
	this.signalController.sendSignal('CONN_REQUEST', to)
}


jsaf_rtcSession.prototype.connect = function ( to , onSuccess, onError)
{
	var connNode = this.connections.getNodeById(to)

	if (connNode == null )	
	{
		connNode = this.addConnectionNode(to, onSuccess, onError )
	}

	var connObject = connNode.data
	
	if ( connObject.jsaf_rtcConnection == null )
	{				
		connObject.jsaf_rtcConnection =  new jsaf_rtcConnection( to, this.iceServersConfig , this.signalController );
	}
	
	if ( connObject.jsaf_rtcConnection.connected == true)
		return;
	
	jsaf.log ("SESSION CONNECT CLIENT:"+to);
	
	connObject.jsaf_rtcConnection.connect ( connObject.onSuccess, connObject.onError );	
}



jsaf_rtcSession.prototype.acceptConnection = function (from, onSuccess, onError )
{
	var connNode = this.connections.getNodeById(from);
	
	if(connNode == null)
	{	
		if(typeof (onError) != 'undefined' && onError !=null)
			onError()
		else
			alert("ILLEGAL CONNECTION ACCEPT!")
	}
	
	var connObject = connNode.data
	
	connObject.onSuccess = onSuccess 
	connObject.onError = onError
	
	this.signalController.sendSignal('CONN_ACCEPT', from);	

}

jsaf_rtcSession.prototype.establishConnection = function ( connNode )
{	
	var connObject = connNode.data
	
	connObject.jsaf_rtcConnection  = new jsaf_rtcConnection( connNode.id , this.iceServersConfig , this.signalController );
 
	jsaf.log ("SESSION ACCEPT :"+ connNode.id );	
	
	connObject.jsaf_rtcConnection.accept ( connObject.offererSDP , connObject.onSuccess, connObject.onError );	
}



jsaf_rtcSession.prototype.onReceiveSignalHandler = function (signalObject)
{ 	 		
	switch (signalObject.SIGNAL)
	{						
		case 'CONN_REQUEST':
		
			this.addConnectionNode (signalObject.FROM)		
			
			if(this.onConnectionRequest != null)
			{
				this.onConnectionRequest (signalObject.FROM);
				return;
			}
			
			break
			
		case 'CONN_ACCEPT': // CONNECTION REQUEST WAS ACCEPTED SEND OFFER
				
			var connNode = this.connections.getNodeById(signalObject.FROM);		
			
			if (connNode == null)
				alert("UNKNOWN CONNECTION!")
			
			if(this.onConnectionAccept != null)
			{		
				this.onConnectionAccept ( signalObject.FROM )
				
				return
			}		
			
			var connObject = connNode.data
			
			this.connect( signalObject.FROM  )
			
			break
			
			
		case 'NEGOTATION_EVENT':	
			
			jsaf.log("SESSION -> recv NEGOTATION_EVENT from:"+signalObject.FROM);
			
			var connNode = this.connections.getNodeById(signalObject.FROM);		
			
			if (connNode == null)
				alert("UNKNOWN CONNECTION!")
			
			var connObject = connNode.data
			
			if ( connObject.jsaf_rtcConnection == null)
			{
				connObject.offererSDP = signalObject.ARGS.SDP
	
				jsaf.log("HANDLE ACCEPT OBJECT ->"+signalObject);
				//alert ("SDP !!"+connObject.offererSDP)

				this.establishConnection( connNode )
				
				return;
				
			}
			
			connObject.jsaf_rtcConnection.handleNegotation (signalObject.ARGS)
						
			break;
			
		default:
			if(this.onReceiveSignal != null)
				this.onReceiveSignal(signalObject);
	}  		
			
}

	
	
jsaf_rtcSession.prototype.onReceiveSystemMessageHandler = function (msgObj)  
{ 
	switch (msgObj.SYSTEMMESSAGE)
	{		
		case 'UUID':
			this.uuid = msgObj.UUID;
 
			if(this.onReceiveSystemMessage!= null)
				this.onReceiveSystemMessage(msgObj);	
			break;
	
		default:
			if(this.onReceiveSystemMessage!= null)
				this.onReceiveSystemMessage(msgObj);	
	}  		

}

jsaf_rtcSession.prototype.onReceiveDataHandler = function (msgObj)   
{
	if(this.onReceiveData!= null)
		this.onReceiveData( {FROM:msgObj.FROM, DATA:msgObj.DATA} );		
}

jsaf_rtcSession.prototype.onReceiveTrackHandler = function (msgObj)   
{
	if(this.onReceiveTrack!= null)
		this.onReceiveTrack( {FROM:msgObj.FROM, STREAM:msgObj.STREAM} );				
}

