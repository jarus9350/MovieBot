const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {list} = require('./search.js');
const axios = require('axios');
const { getEnvironmentData } = require('worker_threads');

module.exports = {
    data : new SlashCommandBuilder()
            .setName('show')
            .setDescription('gives more detailed for a movie from list above')
            .addNumberOption(option => 
                option.setName('number')
                    .setDescription('Number of the movie in the above list')
                    .setRequired(true)),
            
    async execute(interaction){  //code for command should be in  execute
        const number = interaction.options.getNumber('number');
        const id = list[number-1];
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {plot: 'short', r: 'json', i: `${id}`},
            headers: {
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
              'x-rapidapi-key': '3b94c90ee8msh7e4f81810b881d6p1e51f1jsnf19ed8b07385'
            }
        };
        await interaction.deferReply();
        const data = await axios.request(options).then(response => response.data).catch(function (error) {
            console.error(error);
        });        
        const link = 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80';

        var BoxOffice = data.BoxOffice;
        if (BoxOffice == undefined){
            BoxOffice = "not known";
        }
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`:film_frames::film_frames: ${data.Title} :film_frames::film_frames:`)
            // .setURL('https://discord.js.org/')
            // .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
            // .setDescription(`${data.Title}`)
            .setThumbnail(link)
            .addFields(
                { name: `:ticket: Rating`, value: `${data.Rated}` , inline : true },
                { name: `:spiral_calendar_pad: Released Date`, value: `${data.Released}`, inline: true },
                { name: `:clock1: Runtime`, value: `${data.Runtime}`, inline: true },
            )
            .addFields(
                //{ name: '\u200B', value: '\u200B' },
                { name: `:clapper: GENRE`, value: `${data.Genre}`}
            )
            .addField(':scroll: PLOT', `${data.Plot}`, false)
            .setImage(data.Poster)
            .addFields(
                { name: `:dollar: BoxOffice : ${BoxOffice}`, value: '\u200B' },
                { name: `:regional_indicator_i::regional_indicator_m::regional_indicator_d::regional_indicator_b: Rating `, value: `:star: ${data.imdbRating}`, inline: true },
                { name: `:ballot_box: IMDB Votes`, value: `${data.imdbVotes}`, inline: true },
            )
            .setTimestamp()
            .setFooter(`imdbId: ${id}`, link);
        
        interaction.editReply({ embeds: [exampleEmbed] });
    }
};