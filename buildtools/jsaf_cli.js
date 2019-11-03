// JSAF_CLI
var fs = require("fs");

const cli = {};

const config = loadConfig();

require ('./cli/target/'+config.target+'/module/help.js');
 
const cutline = '--------------------------------------------------------------------------------';



console.log (cutline);
console.log ("\njsaf cli v 0.01a ( 3.01.2019 ) @target: "+config.target+"\n");
console.log (cutline);

var call = '';

process.argv.forEach ( function (val, index, array) 
{
	if ( index > 1 )
	{
		call+=val+' ';
	}
})

	try 
	{
		// PARSE COMMAND AND CALL
		var hasArgs =  call.indexOf('(');
		var job;

		if ( hasArgs !==-1 )
			job = call.substr ( 0 , call.indexOf('(') );
		else
			job = call.trim();
		
		
		console.log ("WILL GIVE MY BEST FOR THE JOB: " );
		
		console.log ( cutline );

		console.log ('JOB START>');
 
		if ( global.jsaf_cli[job] )
		{		
			global.jsaf_cli[job]();
		}
		else
		{
			console.log ("unknown command:"+call);
		}
		
		console.log ('JOB END>');
		
	} 
	catch (e)
	{
		console.log ("sorry something wrong with cli!");		
		console.log (">"+call);
		console.log ("... don't understand :\n"+ e.message);
	}

console.log ( cutline );
console.log ("done ...");


function loadConfig()
{
	var json = fs.readFileSync("config.json");

	var config = JSON.parse (json);

	return config;
}