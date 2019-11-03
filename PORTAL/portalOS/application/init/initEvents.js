function initNetwork()
{	
	var onError = function () {jsaf.error('COULDN`T CONNECT SIGNAL SERVER')};
	
	myApp.global.rtcSession = startRtcSession( onSuccess, onError) 
}