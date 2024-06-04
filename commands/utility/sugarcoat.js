const { SlashCommandBuilder } = require("discord.js");
// const fs = require("fs");
// const ytdl = require("ytdl-core");
const { execSync } = require("child_process");

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

        console.log("starting donwlaod");
        execSync(`yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" --windows-filenames -o "%(title)s_%(id)s.%(ext)s" ${url}`)

        console.log("downloa dcomplete\n")

        interaction.editReply(`damn\nhttps://assault1892.boats/sugarcoat/${title}.mp4`)
    }

}