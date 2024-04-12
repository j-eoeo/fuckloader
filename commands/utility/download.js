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
                        { name: "shit", value: "shit" },
                        { name: "fuck", value: "fuck" }
                    )
        )
        .addAttachmentOption(option => 
            option.setName("attachment")
                    .setDescription("file")
                    .setRequired(true)
        ),
    
        async execute(interaction) {
            var object    = JSON.parse(JSON.stringify(interaction.options.getAttachment("attachment")));
            var distdir   = interaction.options.getString("directory");
            var attachURL = object["url"]

            // rq.get

            console.log(`dist: ${distdir} \nattachment URL: ${attachURL}`);
            await interaction.reply(`no u`);
        }
        
}