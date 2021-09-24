const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args, queue}) => {

    const serverQueue = queue.get(message.guild.id);

    let values = [];
    if(serverQueue && serverQueue.songs) {
      values = serverQueue.songs.map( (song, index) => "`" + (index + 1) + ": " + song.title + "`");
    }

    const embed = new Discord.MessageEmbed()
    .setTitle('Playlist')
    .setColor('#DAF7A6')
    .addFields(
        {
          name: `Tocando agora`,
          value: values.length > 0 ? values.filter( (v, index) => index == 0).join("\n") : "..."
        }
    )
    .addFields(
        {
          name: `Próximas`,
          value: values.length > 0 ? values.filter( (v, index) => index > 0).join("\n") : "..."
        }
    );


    message.channel.send(embed);
        
  }
}