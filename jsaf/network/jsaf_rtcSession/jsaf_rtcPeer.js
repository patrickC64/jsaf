function jsaf_rtcPeer( iceServers )
{		
	//jsaf.log(iceServers);
	
	this.peer = new RTCPeerConnection( { 'iceServers':iceServers } )
	this.rolle = null;	

	
	this.peer.onlocaldescription			= function (e) { this.handleLocaldescriptionEvent(e) }.bind(this)
	this.peer.onicecandidate 				= function (e) { this.handleICECandidateEvent  (e) }.bind(this)

	this.peer.ondatachannel					= function (e) { this.handleDataChannelEvent(e);}.bind(this)
	this.peer.ontrack 						= function (e) { this.handleTrackEvent(e) }.bind(this)
	this.peer.onremovetrack					= function (e) { this.handleRemoveTrackEvent(e) }.bind(this)

	this.peer.onnegotiationneeded 			= function (e) { this.handleNegotiationNeededEvent (e) }.bind(this)
	
	this.peer.oniceconnectionstatechange 	= function (e) { this.handleICEConnectionStateChangeEvent (e) }.bind(this)
	
	this.peer.onicegatheringstatechange		= function (e) { this.handleICEGatheringStateChangeEvent (e) }.bind(this)
	
	this.peer.onsignalingstatechange 		= function (e) { this.handleSignalingStateChangeEvent (e) }.bind(this)	

	
	this.onConnect 		=	null;
	this.onDisconnect 	=	null;
		
	this.connected 		=	false;
	
	this.sendTrack = null; 
	this.recvTrack = null;
	
	this.onReceiveData	=	null;
	this.onReceiveTrack	=	null;
		
	this.sendNegotation = null;	
	
	this.localDescription = null;
	
	this.remoteDescription = null;
	
	this.remoteIceCanditates = [];
	
	this.sendChannel = this.peer.createDataChannel("dc");	

	this.sendChannel.onclose = function(e) {this.connected = false;}.bind(this)		
	this.sendChannel.onopen = function(e) {}.bind(this)		

	this.recvChannel = null
	this.mediaConstraints = null

	jsaf.log("jsaf_rtcPeer created!");
}


jsaf_rtcPeer.prototype.handleLocaldescriptionEvent = function (description)  
{
	jsaf.log("jsaf_rtcPeer handleLocaldescriptionEvent! "+description.type);
	
	this.localDescription = description;

	this.sendNegotation ( 
	{'ICE':null		
	, 'SDP': {'sdp':this.localDescription.sdp, 'type':this.localDescription.type }
	, 'MEDIA':this.mediaConstraints
	} );
		
	this.peer.setLocalDescription(description);	

	return description;
}


jsaf_rtcPeer.prototype.handleICECandidateEvent = function (event) 
{
	jsaf.log("handleICECandidateEvent:");

	if (event && event.candidate) 
	{ 
		this.peer.addIceCandidate(event.candidate);
										
		this.sendNegotation ( 
			{ 'ICE':event.candidate, 'SDP':null} 
		)		
	} 
}

 
jsaf_rtcPeer.prototype.handleNegotiationNeededEvent = function (event)
{	
	if (this.rolle == 'offerer')
	{
		if(this.connected == true)
		{				
			 this.createOffer()
 
		}
		return
	}
	
	if ( this.connected == false)
	{
		this.connected = true
		this.onConnect()
	}
	

	if(this.rolle =='answerer' && this.remoteDescription != null)
	{ 
		this.remoteDescription=null		
		this.acceptOffer ( null  )	

	}	

}

		

jsaf_rtcPeer.prototype.handleDataChannelEvent = function (event)
{
 
	var recvChannel = event.channel;
	
	recvChannel.onclose = function(e){
		//this.connected=false;
	}.bind(this)
	
	recvChannel.onmessage =  function (e) 
	{ 
		if(	this.onReceiveData !=null ) 
		{
			this.onReceiveData ( e.data ) 
		}
	}.bind(this);

	recvChannel.onopen = function()
	{		
	}.bind(this)
	
	this.recvChannel = recvChannel;
}

jsaf_rtcPeer.prototype.addTrack = function (track, stream)
{	

	this.peer.addTrack(track, stream)

	//if(this.rolle =='answerer')		
	//	this.peer.onnegotiationneeded()
 	
}
	
	
	
jsaf_rtcPeer.prototype.handleTrackEvent = function (event)
{  

//	alert("RT")
	if( this.onReceiveTrack !=null) 
		this.onReceiveTrack (  event ) 
	
//	if (this.rolle=='offerer')
//		this.peer.onnegotiationneeded()
	
}

	
jsaf_rtcPeer.prototype.handleRemoveTrackEvent = function (event)
{
}

	
jsaf_rtcPeer.prototype.handleICEConnectionStateChangeEvent = function (event)
{
		alert(this.peer.iceGatheringState)
}
	
jsaf_rtcPeer.prototype.handleICEGatheringStateChangeEvent = function (event)
{

}

	
jsaf_rtcPeer.prototype.handleSignalingStateChangeEvent = function (event)
{
//	alert(this.peer.signalingState)
}

jsaf_rtcPeer.prototype.createOffer = function()
{
	jsaf.log("CREATE OFFER!");
	
	this.rolle='offerer'
	
	this.peer.createOffer( { offerToReceiveVideo: true, offerToReceiveAudio: true, mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true }     })
		.then( function(description) 
		{	
			this.handleLocaldescriptionEvent ( description )	
			
		}.bind(this) )	
		.then( function( event ) 
		{		 	
			this.handleICECandidateEvent (event)	
			
		}.bind(this) )	
	.catch( function (e) {alert('jsaf_rtcPeer.prototype.createOffer:'+e)} );	
}


jsaf_rtcPeer.prototype.acceptOffer = function (sdp)
{
	this.rolle='answerer'
 	
	console.dir("CREATE ANSWER!")
	
	if (sdp!=null)
		this.peer.setRemoteDescription( new RTCSessionDescription( sdp ) ) 

		this.peer.createAnswer( { offerToReceiveVideo: true, offerToReceiveAudio: true, mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true }  } )	
			.then( function(description) 
			{	
				this.handleLocaldescriptionEvent ( description )	
				
			}.bind(this) )	
			.then( function( event ) 
			{		 	
				this.handleICECandidateEvent (event)	
				
			}.bind(this) )	
		.catch( function (e) {alert('jsaf_rtcPeer.prototype.createAnswer:'+e)} )
 

}


jsaf_rtcPeer.prototype.bind = function ( bind ) 
{
	if (this.rolle == 'offerer')
	{
		this.bindAnswer(bind)
		
		return
	}

	if (this.rolle == 'answerer')
	{
		this.bindOffer(bind)
	}
}


// IS ANSWERER
jsaf_rtcPeer.prototype.bindOffer = function ( bind ) 
{	
	if (bind.SDP != null)
	{	
	 	this.remoteDescription = bind.SDP

		this.peer.setRemoteDescription( new RTCSessionDescription( bind.SDP ) ) 
	
	}
	
	if (bind.ICE != null )  // store ICE while not answered offer
	{
			this.bindIceCandidate(bind.ICE)	
	}
}




// IS OFFERER
jsaf_rtcPeer.prototype.bindAnswer = function ( bind ) 
{
	if (bind.SDP != null)
	{
		this.peer.setRemoteDescription( new RTCSessionDescription( bind.SDP ) ) 
 		
		if ( this.connected == false)
		{ 
			this.connected = true
			this.onConnect()
		}	
	}
	
	if (bind.ICE != null)	
		this.bindIceCandidate(bind.ICE)
}


jsaf_rtcPeer.prototype.bindIceCandidate = function ( iceCandidate ) 
{	
	console.dir("BIND ICE:")
		
 	this.peer.addIceCandidate(new RTCIceCandidate( iceCandidate ))
		.catch( function (e){alert('jsaf_rtcPeer.prototype.bindIce:'+e)}  );	
		
}
