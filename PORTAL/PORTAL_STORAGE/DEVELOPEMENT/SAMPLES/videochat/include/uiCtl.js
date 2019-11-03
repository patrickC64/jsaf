function initUICallbacks()
{
	var sendBtn = jsaf_documentElement ('btn_send');	
	sendBtn.onclick = function () {		
		send()		
	}
	

	var connectBtn = jsaf_documentElement ('btn_connect');
	connectBtn.onclick = function () {	
		connect();		
	}	
		
}