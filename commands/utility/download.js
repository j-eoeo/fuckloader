const { SlashCommandBuilder } = require("discord.js");

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
            var attachmentURL = JSON.stringify(interaction.options.getAttachment("attachment"));
            var distdir = interaction.options.getString("directory");
            console.log(`dist: ${distdir}, attach: ${attachmentURL}`);
            await interaction.reply(`no u`);
        }
        
}