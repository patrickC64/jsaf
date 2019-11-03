function startRtcSession(onSuccess, onError)
{
	var signalServer = {https:true, url:'frese-it.de',port:443}
	
	var iceServers = { 'iceServers': [

	{'urls': 'stun:stun.frese-it.de:3478'},

	{
		urls: 'turn:turn.frese-it.de:5349',
		credential: 'turnpwd',
		username: 'turnusr'
	}

	] }
	
	var rtcSession = new jsaf_rtcSession( signalServer, iceServers );

	
	// OWN MESSAGE HANDLER ( rtcSession CAN HANDLE THIS ALL AUTOMATCLY )	
	rtcSession.onReceiveSystemMessage = function (msgObj)
	{
 
		if(msgObj.SYSTEMMESSAGE=='UUID')
		{
			jsaf_documentElement('localid').innerHTML = msgObj.UUID;
			
			uuid = msgObj.UUID
			
			rtcSession.getPublicClients();	
			
		}
		
		if(msgObj.SYSTEMMESSAGE=='PUBLICCLIENTS')
		{
			showAvaibleClients(msgObj.LIST);			
		}		
	}

	
	rtcSession.onConnectionRequest = function (id)
	{
		callerid = id;

		document.getElementById('callerid').value=id;

		for(i=0;i<10;i++)
		{
			//setTimeout( function() { jsaf_documentElement('callerid').style.backgroundColor="#0f0"; } , 100  +i*200);
			//setTimeout( function() { jsaf_documentElement('callerid').style.backgroundColor="#ddd"; } , 200  +i*200);
		}
		
		accept()
	}			
	
	// -----------------

	rtcSession.start(onSuccess, onError );
		
	return rtcSession;
}


function showAvaibleClients(list)
{
	function insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
	
	var clientIDdiv = document.createElement("div"); 

	document.getElementById("callid").value=list[0]; 
		
	var txt = '';
	list.forEach( (id) =>
	{	if(uuid!=id)
		txt+=id+",";
	})

	var txt = document.createTextNode(txt); 
	clientIDdiv.appendChild(txt); 
 

	var currentDiv = document.getElementById("clientlist"); 
	insertAfter(clientIDdiv, currentDiv); 
}

