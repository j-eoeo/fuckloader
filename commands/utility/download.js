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
            var attachURL  = object["url"]                                                                // get file url
            var attachName = object["name"]                                                               // get file name
            var distdir    = `/www/assault/${interaction.options.getString("directory")}`      // set directory

            console.log(`command received;\nfile: ${attachName} \ndist: ${distdir} \nattachment URL: ${attachURL}`);

            // get file and place

            try {
                rq.get(attachURL)
                    .pipe(fs.createWriteStream(`${distdir}/${attachName}`));    // write molcar 
                await interaction.reply(`file fucked}`);
                
            } catch(err) {
                await interaction.reply(`download failed \n${err}`);
            }

        }
        
}