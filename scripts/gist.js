//var last_message = "";
//var last_poster = "";

//var code_things = "(){}[]<>";//!@#%^&*-=_+;:'\"/?|\\";
var code_things = /[^\(\)\{\}\[\]\<\>\!\@\#\%\^\&\*\-\+_=;:'"\?\|\\]/g;
var last_poster = "";
var last_sum = 0;

module.exports = function(act) {
    act.on_message(function(msg, reply, info) {
	//return;
	// try and figure out if this message should be posted in a gist
	var code_things_count = msg.join('').replace(code_things, "").length;
	//console.log(code_things_count, msg.count('('), JSON.stringify(msg));
	if(info.nick == last_poster && code_things_count > 15)
	    reply(true, "Please post all code at https://gist.github.com and post the link to this channel");
	last_poster = info.nick;
    });
};

String.prototype.count = Array.prototype.count = function(what) {
    var count = 0;
    var place = -1;
    while((place = this.indexOf(what, place+1)) != -1) count++;
    return count;
};
