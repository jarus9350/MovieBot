
const {SlashCommandBuilder} = require('@discordjs/builders');
const axios = require('axios');
  /*
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

  */

module.exports = {
    data : new SlashCommandBuilder()
            .setName('search')
            .setDescription('searches for movie/s with given name')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('name of the movie')
                    .setRequired(true)),
    async execute(interaction){  //code for command should be in  execute
        const name = interaction.options.getString('name');
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: `${name}`, page: '1', r: 'json'},
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': '3b94c90ee8msh7e4f81810b881d6p1e51f1jsnf19ed8b07385'
            }
        };
        await interaction.deferReply();
        const {totalResults} = await axios.request(options).then(response => response.data);
        //console.log({ files: [file] });
        interaction.editReply(totalResults);
        //await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
};

