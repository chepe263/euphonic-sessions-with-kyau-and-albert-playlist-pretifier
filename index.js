const pretty = require("./playlist-pretifier")
const fs = require("fs");

try {
	if(fs.existsSync('input.txt')) {
		var contents = fs.readFileSync('input.txt', 'utf8');
		
		var new_playlist = pretty(contents);
		console.log(new_playlist);
		fs.writeFileSync('output.txt', new_playlist);
		console.log("\r\n");
    } else {
		console.log('The file [input.txt] does not exist.');
	}
} catch (err) {
    console.error(err);
}