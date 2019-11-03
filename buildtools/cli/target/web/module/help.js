if ( typeof ( global.jsaf_cli ) == 'undefined')
	global.jsaf_cli = {};

global.jsaf_cli.help = function ()
{
	console.log("avaible commands ...\n");
 
	showCommands();
	
	console.log();
}

function showCommands()
{
	Object.keys( global.jsaf_cli ).forEach ( function ( cmd ) 
	{
		console.log ( cmd );
	});
}