const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    Data : new SlashCommandBuilder()
            .setName('user')
            .setDescription('Replies with user info!'),

    async execute(interaction){  //code for command should be in  execute
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
};