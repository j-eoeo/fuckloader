const { SlashCommandBuilder } = require("discord.js");
const rq = require("request");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("download")
        .setDescription("download attached file")
        .addStringOption(option => 
            option.setName("directory")
                    .setDescription("choose a download location")
                    .setRequired(true)
                    .addChoices(
                        { name: "shit", value: "shit" }, // assault1892.boats/shit
                        { name: "fuck", value: "fuck" }  // assault1892.boats/fuck
                    )
        )
        .addAttachmentOption(option => 
            option.setName("attachment")
                    .setDescription("file")
                    .setRequired(true)
        ),
    
        async execute(interaction) {
            var object     = JSON.parse(JSON.stringify(interaction.options.getAttachment("attachment"))); // parse json
            var distdir    = interaction.options.getString("directory");                                  // get directory
            var attachURL  = object["url"]                                                                // get file url
            var attachName = object["name"]                                                               // get file name

            console.log(`command received; dist: ${distdir} \nattachment URL: ${attachURL}`);

            // get file

            try {
                rq.get(attachURL)
                    .pipe(fs.createWriteStream(`/www/assault/${distdir}/${attachName}`));    // write file 
                await interaction.reply("fucked");
                
            } catch(err) {
                await interaction.reply(`download failed \n${err}`);
            }

        }
        
}