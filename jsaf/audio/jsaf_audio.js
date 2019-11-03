function jsaf_audio ()
{	
	this.context = null;
	
	window.AudioContext = window.AudioContext||window.webkitAudioContext;

 
	if ( typeof(window.AudioContext) != 'undefined' )
	{	

		this.context = new AudioContext();


	}
}


jsaf_audio.prototype.loadSound = function (url, flags)
{
	if (this.context == null) return;

	var soundObj = {'buffer':null};
		
	var onError = function (){alert("SOUND NOT FOUND!")};

	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {

		this.context.decodeAudioData(request.response, function(buffer) {
		soundObj.buffer = buffer;



		}, onError);

	}.bind(this)
	request.send();
	
	return soundObj;

}


jsaf_audio.prototype.playSound = function (sound, vol)
{
	
	if (this.context == null || sound.buffer == null) return;
	
 
	if(typeof(vol)=='undefined')
		vol =1.0;
  

	var source = this.context.createBufferSource();	// creates a sound source


	source.buffer = sound.buffer;					// tell the source which sound to play
	//source.connect(this.context.destination);		// connect the source to the context's destination (the speakers)
							// play the source now
  
	// Create a gain node.
	var gainNode = this.context.createGain();
	// Connect the source to the gain node.
	source.connect(gainNode);
	// Connect the gain node to the destination.
	gainNode.connect(this.context.destination);  

	gainNode.gain.value=0.1;  

	source.start(0);	                   
}

