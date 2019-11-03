function jsaf_rtcConnection( to, iceServersConfig , signalController)
{	
	jsaf.log("create jsaf_rtcConnection!");

	if(typeof(signalController)=='undefined' || signalController==null)
		alert("CON ERROR NO SIGNAL CONTROLLER SET!")
	
	this.iceServersConfig = iceServersConfig;

	this.id = to;
	
	this.connected = false;
	
	this.jsaf_rtcPeer = null;
 
	this.onReceiveData = null;
	this.onReceiveTrack = null;

	this.onConnect = null;
	this.onDisconnect = null;
	
	this.signalController = signalController;
}


jsaf_rtcConnection.prototype.connect = function ( onSuccess, onError)
{	
	if ( this.connected == true )
		return;
	
	this.jsaf_rtcPeer = new jsaf_rtcPeer(this.iceServersConfig.iceServers)
	
	this.onConnect =  onSuccess
	this.onError =  onError
	

	this.setupPeerConnectionHandler()
	
	this.setupPeerCommunicationHandler()
 	
	this.jsaf_rtcPeer.createOffer()
	
}

jsaf_rtcConnection.prototype.accept = function ( sdp, onSuccess, onError)
{
	if ( this.connected == true )
		return;
	
	this.jsaf_rtcPeer = new jsaf_rtcPeer(this.iceServersConfig.iceServers)

	this.onConnect = onSuccess 
	this.onError =  onError
	
	this.setupPeerConnectionHandler()
	
 	this.setupPeerCommunicationHandler()
 
	this.jsaf_rtcPeer.acceptOffer(sdp)
	
}


jsaf_rtcConnection.prototype.sendNegotation = function ( event ) 
{	
	jsaf.log("SEND NEGOTATION_EVENT TO "+ this.id);
 	//console.dir(event)
	this.signalController.sendSignal ('NEGOTATION_EVENT', this.id, event );
}

jsaf_rtcConnection.prototype.handleNegotation = function ( negotationArgs ) 
{	
	jsaf.log("RECV NEGOTATION_EVENT");

	this.jsaf_rtcPeer.bind ( negotationArgs );	
}

jsaf_rtcConnection.prototype.setupPeerConnectionHandler = function ()
{
	this.jsaf_rtcPeer.sendNegotation = function (e) { this.sendNegotation (e) }.bind(this)
	
	this.jsaf_rtcPeer.onConnect = function (){if(this.onConnect!=null)this.onConnect(this);this.connected=true;}.bind(this)
	this.jsaf_rtcPeer.onDisconnect = function (){if(this.onDisconnect!=null)this.onDisconnect(this);this.connected=false;}.bind(this)
}

jsaf_rtcConnection.prototype.setupPeerCommunicationHandler = function ()
{	
	this.jsaf_rtcPeer.onReceiveData	= function (data){if(this.onReceiveData!=null)this.onReceiveData(data)}.bind(this);
	this.jsaf_rtcPeer.onReceiveTrack = function(trackEvent){if(this.onReceiveTrack!=null)this.onReceiveTrack(trackEvent)}.bind(this);
}




// COMMUICATION PART
jsaf_rtcConnection.prototype.send = function (data)
{
	if ( this.jsaf_rtcPeer.sendChannel.readyState == 'open')
	{ 
		this.jsaf_rtcPeer.sendChannel.send(data);
	}
}

jsaf_rtcConnection.prototype.addTrack = function (track, stream)
{	
	// FIRST IMPLEMEMTATION FOR OFFERER SCENARIO !!!
	
	this.jsaf_rtcPeer.addTrack(track, stream);
}

