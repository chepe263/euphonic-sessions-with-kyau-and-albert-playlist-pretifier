require('dotenv').config()
import Soundcloud from "soundcloud.ts"
import * as fs from "node:fs"
import * as path from "node:path"
import axios from "axios";
import downloadFile from "./utils/download-file";

const soundcloud = new Soundcloud({ clientId: process.env.SOUNDCLOUD_CLIENT_ID, oauthToken: process.env.SOUNDCLOUD_OAUTH_TOKEN })

// function download_url(trackId : string) : string {
//     const app_version : string = "1706267623";
//     const clientId : string = process.env.SOUNDCLOUD_CLIENT_ID;
//     return `https://api-v2.soundcloud.com/tracks/${trackId}/download?client_id=${clientId}&app_version=${app_version}&app_locale=en`;
// }
async function download_url(trackId : string) : Promise<string>{
    const app_version : string = "1706267623";
    const clientId : string = process.env.SOUNDCLOUD_CLIENT_ID;
    const request_url : string = `https://api-v2.soundcloud.com/tracks/${trackId}/download?client_id=${clientId}&app_version=${app_version}&app_locale=en`;
    return await axios.get(request_url)
        .then(response => {
            // console.log(response)
            return response.data.redirectUri
        })
}

async function main() {

    // const tracks = await soundcloud.users.tracksV2("kyauandalbert")
    const playlist = await soundcloud.playlists.getV2("https://soundcloud.com/kyauandalbert/sets/euphonic-sessions")
    // await soundcloud.util.downloadTrack(
    //     playlist.tracks[0].permalink_url.replace("https://soundcloud.com/", ""), 
    //     "./")
    const track_index = 0;
    console.log(`${playlist.tracks[track_index].title}.mp3`);
    const real_download_url : string = await download_url(playlist.tracks[track_index].id.toString())
    downloadFile(real_download_url, path.resolve(path.dirname('.'), `${playlist.tracks[track_index].title}.mp3`) )
    fs.writeFileSync(path.resolve(__dirname, "./kyauandalbert-url.json"),  real_download_url)
    // fs.writeFileSync(path.resolve(__dirname, "./kyauandalbert-tracks.json"), JSON.stringify(tracks, null, 2))
    fs.writeFileSync(path.resolve(__dirname, "./kyauandalbert-playlist.json"), JSON.stringify(playlist, null, 2))
}

main();

// let message: string = 'Hello Wor

/**
 * @todo 
 * usar fastify como el server, https://fastify.dev/
 * usar pm2 para ese server, 
 * la imagen de node tambien https://github.com/nodejs/docker-node
 * 
 * 1. conseguir el playlist, el episodio mas reciente
 * 2. descargarlo
 * 3. ponerle los datos correctos al mp3, incluyendo el pretty playlist
 */