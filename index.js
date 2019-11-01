const fs = require("fs");

var contents = fs.readFileSync('input.txt', 'utf8');
var playlist_items = contents.split("\r\n");
var found_close_parenthesis = false;
var track_of_the_month = -1;
for(let i= 0; i < playlist_items.length; i++){
	found_close_parenthesis = false;
	playlist_items[i] = playlist_items[i].substring(0, 2) + "." + playlist_items[i].substring(2);
	playlist_items[i] = playlist_items[i].replace(" - ", " - \"");
	//"Track of The Month"! 
	if(track_of_the_month == -1 && !!playlist_items[i].match("TRACK OF THE MONTH")){
		track_of_the_month = i;
		playlist_items[i] = playlist_items[i].replace("[TRACK OF THE MONTH]", "");
	}
	
	if( playlist_items[i].match(/\(/gi) ){
		// Encontre (		
		let partes = playlist_items[i].split(' (')//.reverse()
		for(e = 0; e < partes.length; e++){
			if(partes[e].match(/\)/gi)){
				if(!found_close_parenthesis){
					partes[e] = "\" (" + partes[e];					
					found_close_parenthesis = true;
				} else {
					partes[e] = "(" + partes[e];
				}
			}
		}
		//playlist_items[i] = partes.reverse().join("");
		playlist_items[i] = partes.join("");
	}
	if(!found_close_parenthesis){
		playlist_items[i] = playlist_items[i].replace(" [", "\" [");
	}
	playlist_items[i] = playlist_items[i].replace(")(", ") (");
}
if(track_of_the_month !== -1){
	playlist_items[track_of_the_month] = "\r\n" + "[TRACK OF THE MONTH]" + "\r\n" + playlist_items[track_of_the_month] + "\r\n";
}
fs.writeFileSync('output.txt', playlist_items.join("\r\n"));