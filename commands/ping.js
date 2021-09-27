const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    Data : new SlashCommandBuilder()
            .setName('ping')
            .setDescription('replies with pong!'),

    async execute(interaction){  //code for command should be in  execute
        await interaction.reply('Pong!');
    }
};