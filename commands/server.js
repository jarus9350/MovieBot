const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    Data : new SlashCommandBuilder()
            .setName('server')
            .setDescription('Replies with server info!'),

    async execute(interaction){  //code for command should be in  execute
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
};