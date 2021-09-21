const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

    const testFolder = './commands';
    const fs = require('fs');

     const embed = new Discord.MessageEmbed()
        .setTitle('Commands list')
        .setColor('#DAF7A6')
        .addFields(
            {name: 'Música',
            value:"`!play <youtube_link>`\n`!play <nome da musica>`\n`!skip`"}
        );

    let value = "";
    fs.readdirSync(testFolder).forEach(file => {
      const fileName = file.split(".js")[0]

      if([ 'play', 'skip'].includes(fileName) == false) {
        value += "`!"+ fileName +"`\n";
      }
    });

    embed.addFields({name: 'Outros',  value:value});
    message.channel.send(embed);
        
  }
}