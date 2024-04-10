const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("fuck off this user"),
    async execute(interaction) {
        await interaction.reply(`this command was run by ${interaction.user.username} and his want fuck himself`)
    }
}