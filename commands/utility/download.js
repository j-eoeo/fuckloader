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
            var attachJSON = JSON.parse(JSON.stringify(interaction.options.getAttachment("attachment")));
            var distdir = interaction.options.getString("directory");

            var attachURL = attachJSON["url"]

            console.log(`dist: ${distdir} \nattach: ${attachJSON} \nattachURL: ${attachURL}`);
            await interaction.reply(`no u`);
        }
        
}