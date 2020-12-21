const Discord = require('discord.js');
const config = require('./config.json');
const axios = require('axios');

const client = new Discord.Client();

const prefix = '!';

client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }

    if (!message.content.startsWith(prefix)) {
        return;
    }

    const commandBody = message.content.slice(prefix.length);  
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'analyze') {
        const filter = (text) => (text.author.id === message.author.id);
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        
        message.reply('Enter the text to be analyzed.');

        collector.on('collect', async(text) => {
            let sentiment = await axios.post(`http://127.0.0.1:5000/sentiment`, {
                text: text
            });
            sentiment = sentiment.data;
            message.reply(sentiment);
            collector.stop();
        });
    }
});

client.login(config.TOKEN);

