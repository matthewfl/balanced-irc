
var fs = require('fs');
var spawn = require('child_process').spawn;


module.exports = function(act) {
//    var api_files = {};
/*    function load_file(path, name) {
	fs.readFile(path, function(err, result) {
	    console.log("api load file:", path);
	    api_files[name] = result.toString();

	});
    }
    for(var a =0; a < config.api_path.length; a++) {
	var list = fs.readdirSync(config.api_path[a]);
	for(var b = 0; b < list.length; b++) {
	    load_file(config.api_path[a] + '/' + list[b], list[b]);
	}
    }

    var api_indexs = {};
    function build_index(name) {
	var regex = /\n(.*)\n-*\n/g;

	//api_files
    }
*/
    var api_scenarios = [];
    var grep = spawn('grep', ['-r', 'Scenario:', 'resources/balanced-api'])
    grep.stdout.on('data', function (msg) {
	msg = msg.toString().split('\n');
	for(var a=0; a < msg.length; a++) {
	    var d = /resources\/balanced-api\/([^:]+):\W+Scenario:\W+(.+)$/.exec(msg[a]);
	    if(d)
		api_scenarios.push([d[2].toLowerCase().split(' '), d[1]]);
		//api_scenarios[d[2]] = d[1];
	    console.log(d);
	}
	console.log(api_scenarios);
    });

    function indexs(from, looking) {
	var ret = [];
	for(var a = 0; a < looking.length; a++) {
	    var i = from.indexOf(looking[a]);
	    if(i != -1) ret.push(i);
	}
	return ret;
    }

    function process(msg, reply) {
	msg = msg.toLowerCase().split(' ');
	api_scenarios.sort(function (a, b) {
	    var a_indexs = indexs(a, msg),
	    b_indexs = indexs(b, msg);
	    
	});
    }
    
    act.command("api", process);

};
