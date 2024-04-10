const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("fuck you"),
    async execute(interaction) {
        await interaction.reply("fuck you");
    },
};