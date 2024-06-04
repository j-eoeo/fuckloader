const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sugarcoat")
        .setDescription("im not gonna sugarcoat it")
        .addStringOption(option =>
            option.setName("url")
            .setDescription("im not gonna sugarcoat it (maybe youtube only)")
            .setRequired(true)
        ),

    async execute(interaction) {
        
        var distdir = `/srv/www/assault1892.boats/sugarcoat`
        var url     = interaction.options.getString("url");

        console.log("get movieiee " + url);
        interaction.deferReply();

        console.log("get movie ifnfo");
        var info    = await ytdl.getInfo(url);
        console.log("get moie title");
        var titlerg = /[!"#$%&'\(\)\^\\=~\|@\`\[\]\{\};:\+\*,.<>/\?\_\s]/g;
        var title   = info.player_response.videoDetails.title.replace(titlerg, "_");
        var video_option  = {
            quality: "highestvideo",
            filter: format => format.container === "mp4"
        };

        var audio_option  = {
            quality: "highestaudio"
        };

        console.log("starting video donwlaod");
        ytdl(url, video_option).pipe(fs.createWriteStream(`${distdir}/${title}_video.mp4`));

        console.log("starting audio downlaod");
        ytdl(url, audio_option).pipe(fs.createWriteStream(`${distdir}/${title}_audio.wav`));

        console.log("comninbe things");
        exec(`ffmpeg -y -i ${distdir}/${title}_video.mp4 -i ${distdir}/${title}_audio.wav -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${distdir}/${title}.mp4`), (err, stdout, stderr) => {
            interaction.editReply("https://assault1892.boats/sugarcoat/Theyre_Not_Gonna_Sugarcoat_It.png");
        };

        console.log("downloa dcomplete\n")

        interaction.editReply(`damn\nhttps://assault1892.boats/sugarcoat/${title}.mp4`)
    }

}