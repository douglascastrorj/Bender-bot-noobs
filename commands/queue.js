const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args, queue}) => {

    const serverQueue = queue.get(message.guild.id);

    let values = [];
    if(serverQueue && serverQueue.songs) {
      values = serverQueue.songs.map( song => "`" + song.title + "`");
    }

    const embed = new Discord.MessageEmbed()
    .setTitle('Playlist')
    .setColor('#DAF7A6')
    .addFields(
        {
          name: `${values.length} Música(s) na Playlist`,
          value: values.length > 0 ? values.join("\n") : "..."
        }
    );


    message.channel.send(embed);
        
  }
}