var match = /(ak-(test|prod)-[a-zA-Z0-9]+)/;

var balanced = require('balanced-official')

module.exports = function (act) {
		act.on_message(function (msg, reply, info) {
				var key = match.exec(msg);
				if(key) {
						console.log(key);
						// omfg they did it again
						balanced.configure(key[1]);
						balanced.api_key.create().then(function (new_key) {
								act.msg(info.nick, 'Here is your new api key, please do not publicly share it again: '+new_key.secret);
								balanced.api_key.query.then(function (k) {
										k.all().then(function(keys) {
												for(var a=0; a<keys.length; a++) {
														if(keys[a].secret) { // secret only comes back for the current api key
																keys[a].unstore();
																reply(true, 'your api key '+keys[a].secret+' has been deleted for your protection, a new api has been sent to you in a private message, please do not shared your marketplace secret key in irc as this channel is publicly logged');
														}
												}
										});
								});
						}, function () {
								console.log('api key was already invalid');
						});
				}
		});
};
