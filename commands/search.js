
const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

var res = {};

module.exports = {
    data : new SlashCommandBuilder()
            .setName('search')
            .setDescription('searches for movie/s with given name')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('name of the movie')
                    .setRequired(true))
            .addNumberOption(option => 
                option.setName('page')
                    .setDescription('page no. of the results')
                    .setRequired(false)),
            
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
        const {totalResults,Response,Search} = await axios.request(options).then(response => response.data).catch(function (error) {
            console.error(error);
        });        
        res = Search;
        const link = 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80';

        const objList = [];
        Search.forEach((element,i) => {
            let obj = {
                name: `${i+1}.)  ${element.Title} | ${element.Year}`,
                value: '-------------------------------------------',
                inline: false
            }
            objList.push(obj);
            // console.log(obj);
            // console.log(i++);
        });
        const exampleEmbed = new MessageEmbed()
	        .setTitle(`List of Movies , search word : "${name}"`)
            .setColor('#0099ff')
	        .setDescription('top 10 best results based on your search')
	        .setThumbnail(link)
	        .addField('NO.       MOVIE       RELEASED YEAR','-------------------------------------------',false )
	        .addFields(
                objList,
                // { name: 'Inline field title', value: '-------------------------------------------', inline: false },
		        // { name: 'Inline field title', value: '-------------------------------------------', inline: false },
                // { name: 'Inline field title', value: '-------------------------------------------', inline: false},
            )
	        //.setImage('https://i.imgur.com/AfFp7pu.png')
	        .setTimestamp()
	        .setFooter(`total results : ${totalResults}`, link);

       // interaction.editReply(`name : ${Search[0].Title} , released in ${Search[0].Year}`);
        interaction.editReply({ embeds: [exampleEmbed] });
        //await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    },
    response : res
};

